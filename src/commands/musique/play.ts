import { Command } from "../../structures/Command";
import { QueryType } from "discord-player";
import {
    EmbedBuilder,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";
import { player } from "../../config/player";
import { client } from "../..";

export var button = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("previous-track-button")
            .setDisabled(false)
            .setLabel("⏮")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("pause-track-button")
            .setDisabled(false)
            .setLabel("⏸")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("play-track-button")
            .setDisabled(false)
            .setLabel("▶")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("next-track-button")
            .setDisabled(false)
            .setLabel("⏭")
            .setStyle(ButtonStyle.Primary),
        
        new ButtonBuilder()
            .setCustomId("resend-track-button")
            .setDisabled(false)
            .setLabel("🔄")
            .setStyle(ButtonStyle.Success)
    )

export default new Command({
    name: "play",
    description: "Lit un son ou une playlist",
    options: [
        {
            name: "audio",
            description:
                "Charge un audio ou une playlist via une url ou un mot clé",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (!interaction.member.voice.channel)
            return interaction.followUp(
                "Veuillez d'abord rejoindre un channel vocal."
            );

        const audio = interaction.options.getString("audio");
        const queueCache = player.getQueue(interaction.guild);
        if (queueCache) {
            /**
             * For check if a queue existing and the bot isn't in a channel and destroy if it's return true
             */
            if (
                queueCache.guild.voiceStates.valueOf().get("995456528473661451")
                    .channelId == null
            ) {
                queueCache.destroy(false);
                console.log("queue cache destroyed");
            }
            /**
             * For move the bot if he is not on your channel without destroy the queue
             */
            // else if (queueCache.guild.voiceStates.valueOf().get("995456528473661451").channelId != interaction.member.voice.channelId) {
            //     player.voiceUtils.join(interaction.member.voice.channel, {deaf: true});
            //     console.log("Lobot joined the channel");
            // }
            /**
             * For can't control the bot if you aren't in the channel
             */
            else if (
                queueCache.guild.voiceStates.valueOf().get("995456528473661451")
                    .channelId != interaction.member.voice.channelId
            ) {
                return interaction.followUp(
                    "Le bot est déjà en voc, seul les personnes étant dans son voc peuvent le controler :)"
                );
            }
        }
        const queue = await player.createQueue(interaction.guild);

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);
        let embed = new EmbedBuilder();
        const result = await player.search(audio, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });
        console.log(result);
        if (result.tracks.length === 0)
            return interaction.followUp("Aucun résultats");

        await interaction.followUp({
            content: `⏱ | Chargement de votre ${
                result.playlist ? "playlist" : "son"
            }...`,
        });
        if (result.playlist) {
            queue.addTracks(result.tracks);
        } else queue.addTrack(result.tracks[0]);

        result.playlist
            ? embed
                  .setColor("#6f5ef7")
                  .setTitle("__Commande /play :__")
                  .setAuthor({
                      name: client.user.username,
                      iconURL:
                        interaction.guild.iconURL() || client.user.avatarURL(),
                  })
                  .setDescription(
                      `**${result.tracks.length} sons depuis [${result.playlist.title}](${result.playlist.url})** à été ajouté à la Queue`
                  )
                  .setThumbnail(result.tracks[0].thumbnail)
                  .setFooter({ text: `Durée: ${result.tracks[0].duration}` })
                  .setTimestamp()
            : embed
                  .setColor("#6f5ef7")
                  .setTitle("__Commande /play :__")
                  .setAuthor({
                      name: client.user.username,
                      iconURL:
                        interaction.guild.iconURL() || client.user.avatarURL(),
                  })
                  .setDescription(
                      `**[${result.tracks[0].title}](${result.tracks[0].url})** à été ajouté à la Queue`
                  )
                  .setThumbnail(result.tracks[0].thumbnail)
                  .setFooter({ text: `Durée: ${result.tracks[0].duration}` })
                  .setTimestamp();

        if (!queue.playing) await queue.play();
        await interaction.editReply({
            content: "",
            embeds: [embed],
            components: [button]
        });
    },
});
