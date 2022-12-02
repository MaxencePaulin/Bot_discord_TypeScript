import { EmbedBuilder } from "discord.js";
import { client } from "../..";
import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "queue",
    description: "Montre les sons dans la queue",
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
        if (!queue?.playing)
            return interaction.followUp("Aucune lecture en cours.");

        if (queue.tracks.length < 1)
            return interaction.followUp(
                "Une seule vidéo en attente, utilise la commande /np !"
            );

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. [**${m.title}**](${m.url}) - ${
                m.requestedBy.tag
            }`;
        });

        let embed = new EmbedBuilder();

        embed
            .setColor("#6f5ef7")
            .setTitle("__Commande /queue :__")
            .setAuthor({
                name: client.user.username,
                iconURL:
                    interaction.guild.iconURL() || client.user.avatarURL(),
            })
            .setDescription(
                `${tracks.join("\n")}${
                    queue.tracks.length > tracks.length
                        ? `\n...${
                              queue.tracks.length - tracks.length === 1
                                  ? `${
                                        queue.tracks.length - tracks.length
                                    } sons de plus`
                                  : `${
                                        queue.tracks.length - tracks.length
                                    } sons de plus`
                          }`
                        : ""
                }`
            )
            .addFields([
                {
                    name: "Lecture en cours",
                    value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
                },
            ])
            .setTimestamp();
        return interaction.followUp({ embeds: [embed] });
    },
});
