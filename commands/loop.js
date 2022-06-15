import GlobalState from "../client/globalState";

export default class Loop {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (args[0] === "queue") {
            this.toggleLoopQueue(queue, message);
        }

        this.toggleLoop(queue, message);

    }

    toggleLoopQueue = (queue, message) => {
        if (queue.loopQueue) {
            queue.loopQueue = false;
            return message.channel.send('🔁 Loop queue disabled');
        }

        queue.loopQueue = true;
        return message.channel.send('🔁 Loop queue enabled');
    }

    toggleLoop = (queue, message) => {
        if (queue.loop) {
            queue.loop = false;
            return message.channel.send('🔁 Loop disabled');
        }

        queue.loop = true;
        return message.channel.send('🔁 Loop enabled');
    }
}