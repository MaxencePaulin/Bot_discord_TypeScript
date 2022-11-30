import { EmbedBuilder } from "discord.js";
import { button } from "../../commands/musique/play";
import { player } from "../../config/player";
import { Button } from "../../structures/Button";

export default new Button({
    name: "resend-track-button",
    run: async (client, interaction) => {
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

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        let embed = new EmbedBuilder();

        embed
            .setColor("#6f5ef7")
            .setTitle("__Bouton renvoyer :__")
            .setAuthor({
                name: "Lobot",
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
    }
});