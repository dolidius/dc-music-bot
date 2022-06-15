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
        }
    ]
}