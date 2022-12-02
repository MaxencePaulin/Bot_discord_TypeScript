import { player } from "../../config/player";
import { Command } from "../../structures/Command";
import { EmbedBuilder } from "discord.js";
import { button } from "./play";
import { client } from "../..";

export default new Command({
    name: "np",
    description: "Montre les informations de la lecture en cours",
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

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        let embed = new EmbedBuilder();

        embed
            .setColor("#6f5ef7")
            .setTitle("__Commande /np :__")
            .setAuthor({
                name: client.user.username,
                iconURL:
                    interaction.guild.iconURL() || client.user.avatarURL(),
            })
            .setDescription(
                `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`) de ${queue.current.author}`
            )
            .addFields({ name: "\u200b", value: progress })
            .setFooter({ text: `Queued by ${queue.current.requestedBy.tag}` })
            .setTimestamp();

        interaction.followUp({ embeds: [embed], components: [button] });
    },
});
