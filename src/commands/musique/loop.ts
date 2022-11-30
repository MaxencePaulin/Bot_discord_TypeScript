import { QueueRepeatMode } from "discord-player";
import { ApplicationCommandOptionType } from "discord.js";
import { player } from "../../config/player";
import { Command } from "../../structures/Command";

export default new Command({
    name: "loop",
    description: "Différents modes de répétition",
    options: [
        {
            name: "value",
            description: "Modes de répétition",
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                {
                    name: "Désactivé",
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: "Son",
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: `Queue`,
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: "Autoplay",
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ],
        },
    ],
    run: async ({ interaction }) => {
        const value = interaction.options.getInteger("value");
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

        const success = queue.setRepeatMode(value);
        const mode =
            value === QueueRepeatMode.TRACK
                ? "🔂"
                : value === QueueRepeatMode.QUEUE
                ? "🔁"
                : "▶";
        return void interaction.followUp({
            content: success
                ? `${mode} | Répétition mise à jour !`
                : "❌ | Ce mode est déjà activé ou tu ne peux pas mettre à jour la répétition !",
        });
    },
});
