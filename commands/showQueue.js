import GlobalState from "../client/globalState";

export default class ShowQueue {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (!queue) {
            return message.channel.send(`There are no songs in queue 😔`);
        }

        let queueMessage = "```\n";

        for (let i = 0; i < queue.songs.length; i++) {
            queueMessage += `${i + 1}. ${queue.songs[i].title} \n`
        }

        queueMessage += "```";

        return message.channel.send(queueMessage);
    }
}