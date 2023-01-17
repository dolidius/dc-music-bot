import GlobalState from "../client/globalState";

export default class Leave {
    execute = (message, args) => {
        const state = new GlobalState();
        const queue = state.getCurrentUserQueue(message.guild.id);
        queue.voice_channel.leave();
        state.removeCurrentUserFromQueue(message.guild.id)
        console.log('kappa')
        console.log('keepo');
    }
}