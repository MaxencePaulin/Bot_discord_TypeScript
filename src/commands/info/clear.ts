import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

export default new Command({
    name: "clear",
    description: "Supprimer plusieurs messages",
    options: [
        {
            name: "integer",
            description: "nombres de messages à supprimer",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (
            interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ) {
            var integer = interaction.options.getInteger("integer");
            if (integer >= 1 && integer < 100) {
                await interaction.channel.bulkDelete(integer + 1);
                interaction.channel.send(
                    `${integer} message(s) ont été correctement supprimé(s) par <@` +
                        interaction.member.id +
                        `>.`
                );
            } else {
                interaction.followUp(
                    "Le nombre de message supprimés doit être compris entre 1 et 99."
                );
            }
        } else {
            interaction.followUp(
                "Vous n'avez pas la permissions de faire ceci."
            );
        }
    },
});
