import GlobalState from "../client/globalState"

export default class Skip {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (!queue) {
            return message.channel.send(`There are no songs in queue 😔`);
        }

        queue.connection.dispatcher.end();
    }
}