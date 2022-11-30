import { settings } from "../../config/config";
import { Command } from "../../structures/Command";

export default new Command({
    name: "invite",
    description: "test to invite",
    run: async ({ interaction }) => {
        if (!settings.owner_bot.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "Vous n'avez pas la permission de faire cela."
            );
        try {
            const invite = await interaction.guild.invites.create(
                interaction.channelId,
                { maxAge: 0 }
            );
            console.log(
                `invitation generé : https://discord.gg/${invite.code} pour ${interaction.guild.name}`
            );
            console.log(invite.code);
            interaction.followUp("OK");
        } catch (e) {
            interaction.followUp("Le bot n'a pas la permission de faire cela.");
        }
    },
});
