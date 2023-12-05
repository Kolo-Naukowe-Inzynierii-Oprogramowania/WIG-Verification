import {Client, Collection, Events, GatewayIntentBits, CommandInteraction, Partials, SlashCommandBuilder} from "discord.js";
import {readdirSync} from "fs";
import * as path from "path";
import Config from "./config";

interface SlashCommand {
    data: SlashCommandBuilder;
    execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

declare module "discord.js" {
    interface Client {
        slashCommands: Collection<string, SlashCommand>;
        slashDatas: any[];
    }
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.User],
    shards: "auto"
});

client.slashCommands = new Collection();
client.slashDatas = [];

const prepareSlashCommands = async () => {
    for (const file of readdirSync(path.join(__dirname, `./slash-commands`))) {
        if(file.endsWith(".d.ts")) continue;
        const command = await import(path.join(__dirname, `./slash-commands/${file}`));
        client.slashDatas.push(command.default.data.toJSON());
        client.slashCommands.set(command.default.data.name, command);
    }
}

const prepareEvents = async () => {
    for (const file of readdirSync(path.join(__dirname, `./events`))) {
        if(file.endsWith(".d.ts")) continue;
        const event = await import(path.join(__dirname, `./events/${file}`));
        client.on(event.default.name, (...args) => event.execute(client, ...args));
    }
}

const registerSlashCommands = async () => {
    try {
        await client.application?.commands.set(client.slashDatas);
        console.log('Slash commands registered globally!');
      } catch (error) {
        console.error('Error registering slash commands globally:', error);
      }
}

const start = async () => {
    await prepareSlashCommands();
    await prepareEvents();
    await registerSlashCommands();
    await client.login(Config.DISCORD_BOT_TOKEN);
}

export default start;
export {
    SlashCommand,
};