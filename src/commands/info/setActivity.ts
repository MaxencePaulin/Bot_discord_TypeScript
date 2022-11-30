import { ActivityType, ApplicationCommandOptionType } from "discord.js";
import { settings } from "../../config/config";
import { Command } from "../../structures/Command";

export default new Command({
    name: "set-activity", 
    description: "Change l'activité du bot",
    options: [
        {
            name: "type",
            description: "Le type d'activité",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                {
                    name: "Joue à",
                    value: 0,
                },
                {
                    name: "Écoute",
                    value: 2,
                },
                {
                    name: "Regarde",
                    value: 3,
                },
                {
                    name: "Participant à :",
                    value: 5,
                }
            ],
        },
        {
            name: "activité",
            description: "L'activité",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (!settings.change_activity_allowed.includes(interaction.user.id)) {
            return interaction.followUp(`<@${interaction.user.id}> Vous n'avez pas la permission d'utiliser cette commande`);
        }
        let type = interaction.options.getInteger("type");
        const activity = interaction.options.getString("activité"); 
        interaction.client.user.setActivity(activity, { type: type });
        return interaction.followUp("Activité mise à jour");
    }
});