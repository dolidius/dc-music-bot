import commands from '../commands/index';

export default {
    token: process.env.DISCORD_TOKEN,
    prefix: "!",
    commands: [
        {
            name: "test",
            handler: commands.TestCommand
        },
        {
            name: "play",
            handler: commands.PlayCommand
        },
        {
            name: "skip",
            handler: commands.SkipCommand
        },
        {
            name: "queue",
            handler: commands.ShowQueueCommand
        },
        {
            name: "remove",
            handler: commands.RemoveAtCommand
        },
        {
            name: "clear",
            handler: commands.ClearCommand
        },
        {
            name: "leave",
            handler: commands.LeaveCommand
        },
        {
            name: "loop",
            handler: commands.LoopCommand
        },
        {
            name: "random",
            handler: commands.RandomCommand
        },
        {
            name: "ooo",
            handler: commands.OOOCommand
        },
        {
            name: "help",
            handler: commands.HelpCommand
        },
    ]
}