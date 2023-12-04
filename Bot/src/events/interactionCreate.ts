import { Client, Interaction, Events, CommandInteraction } from "discord.js";

const Event = {
    name: Events.InteractionCreate,
    execute: async (client: Client, interaction: Interaction) => {
        if (!interaction.isCommand()) return;
        if (interaction.user.bot) return;

        const command = interaction.client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(client, interaction as CommandInteraction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Przy wykonywaniu komendy wystąpił błąd. Skontaktuj się z Administratorem.', ephemeral: true });
        }
    }
}

export default Event;