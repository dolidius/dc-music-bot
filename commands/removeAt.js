import checkIfNum from "../helpers/checkIfNum";
import Skip from "./skip";
import GlobalState from "../client/globalState";

export default class RemoveAt {
    execute = (message, args) => {
        const queue = new GlobalState().getCurrentUserQueue(message.guild.id);

        if (args.length === 1 && checkIfNum(args[0])) {
            const position = parseInt(args[0]) - 1;
            if (position < 0 || position > queue.songs.length) {
                return message.channel.send('You picked wrong song position');
            }
    
            if (position === 0) {
                new Skip().execute(message, []);
                return message.channel.send(`Removed current song`);
            }
    
            const songToRemove = queue.songs[position];
            queue.songs.splice(position, 1);
            return message.channel.send(`Removed ${songToRemove.title}`);
        }
    
        return message.channel.send('You picked wrong song position');
    }
}