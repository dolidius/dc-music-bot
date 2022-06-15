import ytdl from "ytdl-core";

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
                console.log("SIEMA");
            })
    }
}