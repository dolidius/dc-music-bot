import GlobalState from "../client/globalState";

export default class Clear {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);
        if (!queue) return;
        queue.songs = [];
        queue.connection.dispatcher.end()
    }
}