import Discord from 'discord.js'
import config from '../config/config.js'

const { token, prefix, commands } = config;

export default class MusicClient {
    client = new Discord.Client()

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

        this.client.on("message", async(message) => {
            if (message.content.startsWith(`${prefix}`)) {
                const messageArr = message.content.split(" ");
                const command = messageArr[0].substring(1);
                const args = messageArr.slice(1);
                await this.executeCommand(message, command, args);
            };
        });
    }

    executeCommand = async(message, command, args) => {
        if (!this.checkPermissionsForChannel(message)) return;
        const foundCommand = this.findCommand(command);
        if (!foundCommand) {
            console.log("NO COMMAND FOUND");
            return;
        };

        await foundCommand.handler.execute(message, args);
    }

    findCommand = (commandToFind) => {
        for (const command of commands) {
            if (command.name == commandToFind) {
                return command;
            }
        }

        return null;
    }

    checkPermissionsForChannel = (message) => {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) {
            message.channel.send(
                "You need to be in a channel to execute this command!"
            );
            return false;
        }

        const permissions = voice_channel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT")) {
            message.channel.send("You dont have the correct permissins");
            return false;
        }

        if (!permissions.has("SPEAK")) {
            message.channel.send("You dont have the correct permissions");
            return false;
        }

        return true;

    }
}