import { Command } from "../../structures/Command";
import { player } from "../../config/player";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { URL } from "url";
import axios from "axios";

const getLyrics = (title) =>
    new Promise(async (ful, rej) => {
        const url = new URL("https://some-random-api.ml/lyrics");
        url.searchParams.append("title", title);
        try {
            const { data } = await axios.get(url.href);
            ful(data);
        } catch (error) {
            rej(error);
        }
    });

const substring = (length, value) => {
    const replaced = value.replace(/\n/g, "--");
    const regex = `.{1,${length}}`;
    const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

    return lines;
};

const createResponse = async (title) => {
    try {
        const data: any = await getLyrics(title);

        const embeds = substring(4096, data.lyrics).map((value, index) => {
            const isFirst = index === 0;

            return new EmbedBuilder()
                .setTitle(isFirst ? `${data.title} - ${data.author}` : null)
                .setThumbnail(isFirst ? data.thumbnail.genius : null)
                .setDescription(value)
                .setColor("#6f5ef7")
                .setTimestamp();
        });
        return { embeds };
    } catch (error) {
        return "Je n'arrive pas à trouver de lyrics pour ce son :(";
    }
};

export default new Command({
    name: "lyrics",
    description: "Affiche les paroles du son actuel ou d'un son spécifique.",
    options: [
        {
            name: "lyrics_title",
            description: "Son spécifique pour les lyrics",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        const lyrics_title = interaction.options.getString("lyrics_title");
        const sendLyrics = (audio) => {
            return createResponse(audio)
                .then((res) => {
                    console.log({ res });
                    interaction.followUp(res);
                })
                .catch((err) => console.log({ err }));
        };

        if (lyrics_title) return sendLyrics(lyrics_title);

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

        return sendLyrics(queue.current.title);
    },
});
