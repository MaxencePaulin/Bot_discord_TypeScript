import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "pause",
    description: "Met en pause la lecture en cours",
    run: async ({ interaction }) => {
        const queue = player.getQueue(interaction.guild);
        if (queue) {
            if (
                queue.guild.voiceStates.valueOf().get("995456528473661451")
                    .channelId == null
            ) {
                queue.destroy(false);
                console.log("queue cache destroyed");
                return interaction.followUp({
                    content: "Aucune lecture en cours.",
                });       
            }
        }
        if (!queue?.playing) {
            return interaction.followUp({
                content: "Aucune lecture en cours.",
            });
        }
        if (
            queue.guild.voiceStates.valueOf().get("995456528473661451")
                .channelId != interaction.member.voice.channelId
        ) {
            return interaction.followUp(
                "Le bot est déjà en voc, seul les personnes étant dans son voc peuvent le controler :)"
            );
        }
        if(queue?.connection.paused) {
            return interaction.followUp("La lecture est déjà en pause");
        }

        queue.setPaused(true);

        return interaction.followUp("Lecture actuelle mise en pause !");
    },
});
