import { Command } from "../../structures/Command";
import { settings } from "../../config/config";
import { client } from "../..";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "emit",
    description: "Emettre un événement",
    options: [
        {
            name: "event",
            description: "Choisir un événement à emettre",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "guildCreate",
                    value: "guildCreate",
                },
            ],
        },
    ],
    run: async ({ interaction }) => {
        if (!settings.owner_bot.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permission de faire cela."
            );

        const evtChoices = interaction.options.getString("event");

        if (evtChoices == "guildCreate") {
            client.emit("guildCreate", interaction.guild);
            interaction.followUp("Event guildCreate émit !");
        }
    },
});
