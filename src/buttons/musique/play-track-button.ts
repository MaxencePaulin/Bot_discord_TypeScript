import { player } from "../../config/player";
import { Button } from "../../structures/Button";

export default new Button({
    name: "play-track-button",
    run: async (client, interaction) => {
        try {
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
                    .channelId !=
                interaction.guild.voiceStates.valueOf().get(interaction.user.id)
                    .channelId
            ) {
                interaction.followUp(
                    "Le bot est déjà en voc, seul les personnes étant dans son voc peuvent le controler :)"
                );
                return;
            }
            if(!queue?.connection.paused) {
                interaction.followUp("La lecture n'est pas en pause");
                return;
            }

            await queue.setPaused(false);
            interaction.followUp("Lecture actuelle remise en marche !");
        } catch (e) {
            interaction.followUp("whoops il y a eu un petit soucis :3");
            console.log(e);
            return;
        }
    },
});
