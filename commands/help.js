export default class Help {
    execute = (message, args) => {
        const helpMess = 
            "```\n !play [link/keyword] - plays music from given argument \n !skip - skip current song \n !leave - bot leaves the server \n !remove [position] - removes song on [position] \n !queue - shows current queue \n !clear - clears the queue \n !random - plays queue in random order \n !loop - loops the song \n !loop queue - loops the queue \n !ooo - plays the ooo```";
        return message.channel.send(helpMess);
    }
}