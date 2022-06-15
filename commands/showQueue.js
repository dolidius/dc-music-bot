import GlobalState from "../client/globalState";

export default class ShowQueue {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (!queue) {
            return message.channel.send(`There are no songs in queue 😔`);
        }

        let queueMessage = "```\n";

        const iterator = queue.songs.length > 10 ? 10 : queue.songs.length;

        for (let i = 0; i < iterator; i++) {
            queueMessage += `${i + 1}. ${queue.songs[i].title} \n`
        }

        queueMessage += "```";

        return message.channel.send(queueMessage);
    }
}