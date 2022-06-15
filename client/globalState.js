export default class GlobalState {
    queue = new Map();

    constructor() {
        if (GlobalState._instance) {
            return GlobalState._instance
        }

        GlobalState._instance = this;
    }

    getCurrentUserQueue = (guildId) => this.queue.get(guildId);

    setCurrentUserQueue = (guildId, voice_channel, text_channel, songs = []) => {
        const queue_constructor = {
            voice_channel,
            text_channel,
            connection: null,
            loop: false,
            loopQueue: false,
            random: false,
            songs,
        };
        this.queue.set(guildId, queue_constructor);
    }

    setQueueConnection = (guildId, connection) => {
        this.queue.set(guildId, {
            ...this.queue.get(guildId),
            connection
        })
    }

    removeCurrentUserFromQueue = (guildId) => this.queue.delete(guildId);

    // addSongsToQueue = (guildId) => {

    // }

}