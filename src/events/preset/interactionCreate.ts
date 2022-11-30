import {
    CommandInteractionOptionResolver,
} from "discord.js";
import { client } from "../..";
import { Event } from "../../structures/Event";
import { ExtendedInteraction } from "../../typings/Command";
import { InteractionType } from "discord.js";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.type === InteractionType.ApplicationCommand) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp("Slash command invalide");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    } else if (interaction.isButton()) {
        await interaction.deferReply();
        const btn = client.buttons.get(interaction.customId);
        if (!btn) return interaction.followUp("Bouton invalide");

        btn.run(client, interaction);
    }
});
