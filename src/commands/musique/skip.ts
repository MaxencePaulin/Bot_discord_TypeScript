import { EmbedBuilder } from "discord.js";
import { client } from "../..";
import { player } from "../../config/player";
import { Command } from "../../structures/Command";
import { button } from "./play";

export default new Command({
    name: "skip",
    description: "Skip la lecture actuelle",
    run: async ({ interaction }) => {
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
                    .channelId != interaction.member.voice.channelId
            ) {
                return interaction.followUp(
                    "Le bot est déjà en voc, seul les personnes étant dans son voc peuvent le controler :)"
                );
            }
            if(!queue.tracks[0]) {
                return interaction.followUp("Pas de prochaine musique dans la file d'attente");
            }
            let embed = new EmbedBuilder();

            interaction.followUp("skip en cours...");

            await queue.skip();
            setTimeout(async () => {
                if (!queue?.playing) await queue.play();
                const queueC = player.getQueue(interaction.guild);
                if (!queueC) {
                    interaction.channel.send({
                        content: "Pas de son en file d'attente."
                    });
                    return;
                }
                if (!queueC.playing) await queueC.play();
                // ou erreur du chargement de l'embed (cliquez sur le bouton vert une fois le son lancé pour charger l'embed) ?.playing
                try {
                    embed
                        .setColor("#6f5ef7")
                        .setTitle("__Bouton skip :__")
                        .setAuthor({
                            name: client.user.username,
                            iconURL:
                                interaction.guild.iconURL() || client.user.avatarURL(),
                        })
                        .setDescription(
                            `**[${queue.current.title}](${queue.current.url})** va commencer`
                        )
                        .setThumbnail(queue.current.thumbnail)
                        .setFooter({ text: `Durée: ${queue.current.duration}` })
                        .setTimestamp();
                } catch (e) {
                    interaction.followUp({
                        content:
                            "Erreur du chargement de l'embed (cliquez sur le bouton vert une fois le son lancé pour charger l'embed)",
                        components: [button],
                    });
                    console.log(e);
                    return;
                }
                interaction.channel.send({
                    content: "skip réussi",
                    embeds: [embed],
                    components: [button],
                });
            }, 5000);
        } catch (e) {
            interaction.followUp("whoops il y a eu un petit soucis :3");
            console.log(e);
            return;
        }
    },
});
