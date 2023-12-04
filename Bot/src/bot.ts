import {Client, Collection, Events, GatewayIntentBits, CommandInteraction, Partials, SlashCommandBuilder} from "discord.js";
import {readdirSync} from "fs";

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
    intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
    shards: "auto"
});

client.slashCommands = new Collection();
client.slashDatas = [];

const prepareSlashCommands = async () => {
    for (const file of readdirSync(`./slash-commands`)) {
        const command = await require(`./slash-commands/${file}`) as SlashCommand;
        client.slashDatas.push(command.data.toJSON());
        client.slashCommands.set(command.data.name, command);
    }
}

const prepareEvents = async () => {
    for (const file of readdirSync(`./events`)) {
        const event = await require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

const registerSlashCommands = async () => {
    await client.application?.commands.set(client.slashDatas);
}

const start = async () => {
    await prepareSlashCommands();
    await prepareEvents();
    await registerSlashCommands();
    await client.login(process.env.DISCORD_BOT_TOKEN);
}

export default start;
export {
    SlashCommand,
};