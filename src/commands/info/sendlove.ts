import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "sendlove",
    description: "Pour envoyer de l'amour",
    options: [
        {
            name: "mention",
            description: "Mention de la cible",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "number",
            description: "nombre à envoyer",
            type: ApplicationCommandOptionType.Number,
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        const mention = interaction.options.getUser("mention");
        const number = interaction.options.getNumber("number");
        if (!number) {
            if (interaction.member.id == "620695199751864320") {
                interaction.followUp(`Tu viens de spam d'amour ${mention}`);
                return;
            }
            if (interaction.member.id == "413347024285728786") {
                interaction.followUp(`love love love love love ${mention}`);
                return;
            }
            interaction.followUp(`Tu viens d'envoyer de l'amour à ${mention}`);
        } else {
            if (interaction.member.id == "620695199751864320") {
                interaction.followUp(
                    `Tu viens de spam ${number} fois d'amour ${mention}`
                );
                return;
            }
            if (interaction.member.id == "413347024285728786") {
                interaction.followUp(
                    `Voila dit lui champion ! ${number} d'amour envoyée à ${mention}`
                );
                console.log(`la cible est ${mention}`);
                return;
            }
            interaction.followUp(
                `Tu viens d'envoyer ${number} d'amour à ${mention}`
            );
        }
    },
});
