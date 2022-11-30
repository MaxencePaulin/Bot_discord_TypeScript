import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "resume",
    description: "Retire la pause de la lecture actuelle",
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
        if(!queue?.connection.paused) {
            return interaction.followUp("La lecture n'est pas en pause");
        }

        queue.setPaused(false);

        return interaction.followUp(
            "La lecture actuelle n'est plus en pause !"
        );
    },
});
