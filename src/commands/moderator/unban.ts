import { CommandInteraction } from "discord.js";
import { settings } from "../../config/config";
import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "unban",
    description: "Unban un utilisateur banni",
    options: [
        {
            name: "user_id",
            description: "Identifiant discord de l'utilisateur à débannir",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (!settings.unban_allowed.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permission de faire cela."
            );
        const userId = interaction.options.getString("user_id");
        (interaction as CommandInteraction).guild.members
            .unban(userId, ` débanni par ${interaction.user.tag}`)
            .then(() => {
                interaction.followUp("<@" + userId + "> a bien été débanni.");
            })
            .catch(() => {
                interaction.followUp(
                    "Cet identifiant discord n'est pas banni ou est invalide."
                );
            });
    },
});
