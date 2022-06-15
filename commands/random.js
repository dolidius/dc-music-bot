import GlobalState from "../client/globalState"

export default class Random {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (queue.random) {
            queue.random = false;
            return message.channel.send('🔁 Random order disabled');
        }

        queue.random = true;
        return message.channel.send('🔁 Random order enabled');
    }
}