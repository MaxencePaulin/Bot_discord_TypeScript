import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "disconnect",
    description: "Déconnecte le bot d'un vocal.",
    run: async ({ interaction }) => {
        const queue = player.getQueue(interaction.guild);
        if (queue) {
            if (
                queue.guild.voiceStates.valueOf().get("995456528473661451")
                    .channelId == null
            ) {
                queue.destroy(false);
                console.log("queue cache destroyed");
                interaction.followUp({
                    content: "Aucune lecture en cours.",
                });
                return;
            }
        }
        if (!queue)
            return interaction.followUp("Aucun son dans la file d'attente.");

        queue.destroy();
        interaction.followUp("Bon on m'a mit à la porte super...");
    },
});
