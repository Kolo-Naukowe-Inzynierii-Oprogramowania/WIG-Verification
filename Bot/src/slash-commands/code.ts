import {Client, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../bot";
import Student from "../models/Student";

const Command = {
    data: new SlashCommandBuilder()
        .setName('code')
        .setDescription('Submit your verification code.')
        .addStringOption(option => option.setName('code').setDescription('Your verification code.').setRequired(true)),
    execute: async (client: Client, interaction: CommandInteraction) => {
        const { options } = interaction;
        const code = options.get('code');

        if(!code) return await interaction.reply({
            content: `Wystąpił błąd. Spróbuj ponownie.`,
            ephemeral: true
        });

        const student = await Student.findOne({ discord_uid: interaction.user.id });
        if (!student) {
            return await interaction.reply({
                content: `Nie wysłałeś prośby o weryfikację.`,
                ephemeral: true
            });
        }

        if (student.verified) {
            return await interaction.reply({
                content: `Już zweryfikowałeś swoje konto.`,
                ephemeral: true
            });
        }

        if (student.verification_code !== code.value) {
            return await interaction.reply({
                content: `Podany kod jest nieprawidłowy.`,
                ephemeral: true
            });
        }

        student.verified = true;
        await student.save();

        await interaction.reply({
            content: `Zweryfikowałeś swoje konto. Możesz teraz dołączyć na serwer WIG.`,
            ephemeral: true
        });
    }
} as SlashCommand;

export default Command;