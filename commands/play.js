import ytdl from "ytdl-core";
import GlobalState from "../client/globalState";
import ytSearch from 'yt-search';
import MusicPlayer from "../musicPlayer";
import ytpl from 'ytpl';

export default class Play {
    execute = async(message, args) => {
        const song = args.join(" ");
        const state = new GlobalState();
        let songs = [];

        let newSong;
        if (ytdl.validateURL(song)) {
            newSong = await this.getSongFromYTLink(message, song);
        } else if (ytpl.validateID(song)){
            newSong = await this.getPlaylistFromYTLink(message, song);
        } else {
            newSong = await this.getPlaylistFromYTKeywords(message, song);
        }

        songs.push(...newSong);

        const guildId = message.guild.id;

        if (!state.getCurrentUserQueue(guildId)) {
            await this.establishConnection(message, guildId, state, songs);
        } else {
            this.addSongsToQueue(message, guildId, state, songs)
        }
    }

    addSongsToQueue = (message, guildId, state, songs) => {
        const queue = state.getCurrentUserQueue(guildId);
        queue.songs.push(...songs);
        return message.channel.send(`👍 **${songs[0].title}** added to queue!`);
    }

    establishConnection = async (message, guildId, state, songs) => {
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
    }

    getSongFromYTLink = async (message, link) => {
        let song_info;
        try {
            song_info = await ytdl.getInfo(link);
        } catch (e) {
            message.channel.send("There was an error getting details about the song, retrying...");
            return false;
        }
            
        return [{
            title: song_info.videoDetails.title,
            url: song_info.videoDetails.video_url,
            provider: "youtube"
        }];
    }

    getPlaylistFromYTLink = async (message, link) => {
        let playlist;
        try {
            playlist = await ytpl(link);
        } catch (e) {
            message.channel.send("There was an error getting details about the song, retrying...");
            return false;
        }

        const songs = [];
        playlist.items.forEach(item => {
            songs.push({
                title: item.title,
                url: item.url,
                provider: "youtube"
            })
        })
            
        return songs;
    }

    getPlaylistFromYTKeywords = async (message, keywords) => {
        let video;
        try {
            video = await this.findSongByKeywords(keywords);
        } catch (e) {
            message.channel.send("There was an error getting details about the song, retrying...");
            return false;
        }
        if (video) {
            return [{
                title: video.title,
                url: video.url,
                provider: "youtube"
            }];
        } else {
            message.channel.send("Error finding video.");
            return false;
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