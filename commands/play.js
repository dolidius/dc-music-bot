import ytdl from "ytdl-core";
import GlobalState from "../client/globalState";
import ytSearch from 'yt-search';
import MusicPlayer from "../musicPlayer";

export default class Play {
    execute = async(message, args) => {
        const song = args[0];
        const state = new GlobalState();
        let songs = [];

        if (ytdl.validateURL(song)) {
            //ytlink
            let song_info;
            try {
                song_info = await ytdl.getInfo(song);
            } catch (e) {
                message.channel.send("There was an error getting details about the song, retrying...");
                this.execute(message, args);
            }
            
            songs.push({
                title: song_info.videoDetails.title,
                url: song_info.videoDetails.video_url,
                provider: "youtube"
            })
        } else {
            //no link - keywords
            let video;
            try {
                video = await this.findSongByKeywords(song);
            } catch (e) {
                message.channel.send("There was an error getting details about the song, retrying...");
                this.execute(message, args);
            }
            if (video) {
                songs.push({
                    title: video.title,
                    url: video.url,
                    provider: "youtube"
                })
            } else {
                message.channel.send("Error finding video.");
                return
            }
        }

        const guildId = message.guild.id;

        if (!state.getCurrentUserQueue(guildId)) {
            const voiceChannel = message.member.voice.channel;
            state.setCurrentUserQueue(guildId, voiceChannel, message.channel, songs)

            try {
                const connection = await voiceChannel.join();
                state.setQueueConnection(guildId, connection);
                await MusicPlayer.playSong(message.guild, state);
            } catch (err) {
                state.removeCurrentUserFromQueue(guildId);
                message.channel.send("There was an error connecting!");
                throw err;
            }
        } else {
            const queue = state.getCurrentUserQueue(guildId);
            queue.songs.push(...songs);
            return message.channel.send(`👍 **${songs[0].title}** added to queue!`);
        }
    }


    findSongByKeywords = async (song) => {
        const video_finder = async(query) => {
            const video_result = await ytSearch(query);
            return video_result.videos.length > 1 ?
                video_result.videos[0] :
                null;
        };

        const video = await video_finder(song);

        return video;
    }
}