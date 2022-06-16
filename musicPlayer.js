import ytdl from "ytdl-core";
import getRandom from "./helpers/getRandom";

export default class MusicPlayer {
    static playSong = async(guild, state) => {
        const queue = state.getCurrentUserQueue(guild.id);
        if (queue.songs.length == 0) {
            state.removeCurrentUserFromQueue(guild.id)
            return;
        }

        const songToPlay = queue.songs[0];
        
        let stream;

        switch (songToPlay.provider) {
            case "youtube":
                stream = ytdl(songToPlay.url, { filter: "audioonly" });
                break;
        }

        queue.connection
            .play(stream, { seek: 0, volume: 0.5 })
            .on("finish", () => {
                console.log("FINISHED");
                manageQueue(queue);
                MusicPlayer.playSong(guild, state);
            })
        
        await queue.text_channel.send(`🎶 Now playing **${songToPlay.title}**`);

        const manageQueue = (queue) => {
            if (queue.loopQueue && !queue.loop) {
                queue.songs.push(queue.songs[0]);
            }

            if (!queue.loop) {
                queue.songs.shift();
            }

            if (queue.random && !queue.loop) {
                const next = getRandom(1, queue.songs.length);
                const nextSong = queue.songs.splice(next - 1, 1);
                queue.songs.unshift(...nextSong);
            }
        }
    }

   
}