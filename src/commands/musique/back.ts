import { EmbedBuilder } from 'discord.js';
import { client } from '../..';
import { player } from '../../config/player';
import { Command } from '../../structures/Command';
import { button } from './play';

export default new Command({
    name: "back",
    description: "Rejoue le son d'avant si la file d'attente n'est pas finie",
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

            let embed = new EmbedBuilder();

            interaction.followUp("Tentative de remettre le son d'avant...");
            const song = queue.current;
            try {
                await queue.back();
            } catch (e) {
                setTimeout(() => {
                    interaction.channel.send(
                        "Pas d'ancien son dans la file d'attente"
                    );
                }, 500);
                return;
            }
            queue.insert(song, 0);

            setTimeout(() => {
                embed
                    .setColor("#6f5ef7")
                    .setTitle("__Commande back :__")
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
                interaction.channel.send({
                    content:
                        "Retour au son précédent effectué ! (patientez un petit peu)",
                    embeds: [embed],
                    components: [button],
                });
            }, 5000);
        } catch (e) {
            interaction.followUp("whoops il y a eu un petit soucis :3");
            console.log(e);
            return;
        }
    }
});