import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "shuffle",
    description: "mélange les titres dans la queue",
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
        if (!queue?.playing) {
            interaction.followUp({
                content: "Aucune lecture en cours.",
            });
            return;
        }
        if (
            queue.guild.voiceStates.valueOf().get("995456528473661451")
                .channelId != interaction.member.voice.channelId
        ) {
            return interaction.followUp(
                "Le bot est déjà en voc, seul les personnes étant dans son voc peuvent le controler :)"
            );
        }

        if (queue.tracks.length < 2)
            return interaction.followUp(
                "Il te faut minimum 2 sons dans la file d'attente pour pouvoir la mélanger."
            );

        queue.shuffle();
        interaction.followUp("La file d'attente à bien été mélangée !");
    },
});
