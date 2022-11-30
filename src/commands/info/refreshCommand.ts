import { client } from "../..";
import { settings } from "../../config/config";
import { Command } from "../../structures/Command";

export default new Command({
    name: "refresh-command",
    description:
        "Met à zéro toutes les commandes depuis le cache et l'application.",
    run: async ({ interaction }) => {
        if (!settings.owner_bot.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "Vous n'avez pas la permissions de faire cela."
            );
        client.guilds.cache.get("787364460518965279").commands.set([]);
        console.log("Guild cache command has been reset.");
        client.application.commands.set([]);
        console.log("Application command has been reset.");
        interaction.followUp("Les commandes ont bien été mises à zéro.");
    },
});
