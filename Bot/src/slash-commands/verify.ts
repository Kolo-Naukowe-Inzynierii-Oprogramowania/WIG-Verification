import {Client, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {SlashCommand} from "../bot";
import Student from "../models/Student";
import SendVerificationMail from "../utils/mail";

const Command = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify your account.')
        .addStringOption(option => option.setName('minecraft_username').setDescription('Your Minecraft username.').setRequired(true))
        .addStringOption(option => option.setName('email').setDescription('Your email address.').setRequired(true)),
    execute: async (client: Client, interaction: CommandInteraction) => {
        const { options } = interaction;
        const minecraft_username = options.get('minecraft_username');
        const email = options.get('email');

        if(!minecraft_username || !email) return await interaction.reply({
            content: `Wystąpił błąd. Spróbuj ponownie.`,
            ephemeral: true
        });

        const student = await Student.findOne({ discord_uid: interaction.user.id });
        if (student && !student.verified) {
            return await interaction.reply({
                content: `Już wysłałeś prośbę o weryfikację (e-mail: ${student.email}, minecraft_username: ${student.minecraft_username}). Sprawdź swoją skrzynkę pocztową.`,
                ephemeral: true
            });
        }

        if (student && student.verified) {
            return await interaction.reply({
                content: `Już zweryfikowałeś swoje konto.`,
                ephemeral: true
            });
        }

        const alreadyExists = await Student.findOne({
            $or: [
                { minecraft_username: minecraft_username.value as string },
                { email: email.value as string },
            ]
        });

        if (alreadyExists) {
            return await interaction.reply({
                content: `Użytkownik o podanym nicku lub adresie e-mail już istnieje.`,
                ephemeral: true
            });
        }

        try {
            const code = Math.random().toString(36).substring(7);
            const newStudent = new Student({
                discord_uid: interaction.user.id,
                minecraft_username: minecraft_username.value as string,
                email: email.value as string,
                verified: false,
                verification_code: code,
            });

            await newStudent.save();

            try {
                await SendVerificationMail(email.value as string, code);
            } catch(err) {
                return await interaction.reply({
                    content: `Wystąpił błąd przy wysyłaniu e-maila. Skontaktuj się z Administratorem.`,
                    ephemeral: true
                });
            }

            await interaction.reply({
                content: `Wysłano prośbę o weryfikację. Sprawdź swoją skrzynkę pocztową.`,
                ephemeral: true
            });
        } catch (error) {
            return await interaction.reply({
                content: `Wystąpił błąd. Upewnij się, że podane przez Ciebie dane są poprawne i spróbuj ponownie.`,
                ephemeral: true
            });
        }
    }
} as SlashCommand;

export default Command;