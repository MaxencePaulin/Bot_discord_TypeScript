import { Command } from "../../structures/Command";
import { settings } from "../../config/config";
import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from "discord.js";
import { client } from "../..";

export default new Command({
    name: "dm",
    description: "Pour envoyer un message privée",
    options: [
        {
            name: "mention",
            description: "Mention de la cible",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "content",
            description: "Contenu à envoyer",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (!settings.dm_commands_allowed.includes(interaction.user.id.toString())) {
            return interaction.followUp(
                "Tu ne peux pas utiliser cette fonctionnalitée."
            );
        }
        const mention = interaction.options.getUser("mention");
        const content = interaction.options.getString("content");
        try {
            await mention.send(content);
        } catch(e) {
            console.log("error while sending dm");
            return interaction.followUp("Impossible d'envoyer un dm à cette personne");
        }
        const channel = client.channels.cache.get("1045336355883991130") as TextChannel;
        let embed = new EmbedBuilder();
        embed
            .setColor("#6f5ef7")
            .setTitle(`Message de ${interaction.user.tag} (${interaction.user.id}) envoyé à ${mention.tag} (${mention.id})`)
            .setDescription(content)
            .setTimestamp();
        channel.send({ embeds: [embed] });
        client.emit("senddm", interaction.user, mention, content);
        return interaction.followUp("Message envoyé !");
    },
});
