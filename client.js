import { Client, Intents } from 'discord.js'
import config from './config/config.js'

const { token, prefix, commands } = config;

const partials = ['MESSAGE', 'CHANNEL', 'REACTION']
const intents = ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']

export default class MusicClient {
    client = new Client({ intents, partials });

    startClient = () => {
        this.client.login(token);
        this.client.once("ready", () => {
            console.log("Ready!");
        });

        this.client.once("reconnecting", () => {
            console.log("Reconnecting!");
        });

        this.client.once("disconnect", () => {
            console.log("Disconnect!");
        });

        this.client.on("messageCreate", async(message) => {
            console.log("ELO")
            if (message.content.startsWith(`${prefix}`)) {
                const messageArr = message.content.split(" ");
                const command = messageArr[0].substring(1);
                const args = messageArr.slice(1);
                this.executeCommand(command, args);
            };
        });
    }

    executeCommand = (command, args) => {
        const foundCommand = this.findCommand(command);
        if (!foundCommand) {
            console.log("NO COMMAND FOUND");
            return;
        };

        foundCommand.handler.execute.apply(args);
    }

    findCommand = (commandToFind) => {
        for (const command of commands) {
            if (command.name == commandToFind) {
                return command;
            }
        }

        return null;
    }
}