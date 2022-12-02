import { EmbedBuilder } from "discord.js";
import { client } from "../..";
import { Command } from "../../structures/Command";

export default new Command({
    name: "help",
    description: "Obtenir la liste des commandes.",
    run: async ({ interaction }) => {
        console.log(interaction.guild.iconURL());
        console.log(client.user.bot);
        
        const embed = new EmbedBuilder()
            .setColor("#6f5ef7")
            .setTitle("__Liste des commandes__")
            // .setURL("https://discord.js.org/")
            .setAuthor({
                name: client.user.username,
                iconURL:
                    interaction.guild.iconURL() || client.user.avatarURL(),
            })
            .setDescription("Vous y trouverez la liste des commandes du bot")
            // .setThumbnail("https://i.imgur.com/z0Zrlnt.jpeg")
            .addFields({
                name: "- !help",
                value: "Affiche la liste des commandes.",
            })
            .addFields({ name: "- !ping", value: "Vous renvoie pong !" })
            .addFields({
                name: "- /help",
                value: "Affiche la liste des commandes.",
            })
            .addFields({ name: "- /ping", value: "Vous renvoie Pong" })
            .addFields({
                name: "- /sendlove + mention (+nombre)",
                value: "envoi de l'amour.",
            })
            .addFields({
                name: "- /ploufplouf + choix1 + choix2 (+..+choix10)",
                value: "Permet de tiré au sort parmis les différents choix, jusqu'a 10 possibilitées.",
            });

        const embed2 = new EmbedBuilder()
            .setColor("#6f5ef7")
            .addFields({
                name: "__Commandes Musiques :__",
                value: "Pour controler la fonctionnalitée de musique",
            })
            .addFields({
                name: "- /play + audio",
                value: "Pour jouer un son ou une playlist ou le mettre en file d'attente si il joue déjà !",
            })
            .addFields({
                name: "- /shuffle",
                value: "Permet de mélanger les sons en file d'attente si elle contient plus de 3 sons.",
            })
            .addFields({
                name: "- /loop",
                value: "Met en répétition le titre / la file d'attente / ou en lecture aléatoire selon la dernière écoute d'après votre choix.",
            })
            .addFields({
                name: "- /pause",
                value: "Met en pause le son en cours.",
            })
            .addFields({
                name: "- /resume",
                value: "Remet en route la lecture du son.",
            })
            .addFields({
                name: "- /disconnect",
                value: "Déconnecte le bot d'un channel vocal.",
            })
            .addFields({
                name: "- /np",
                value: "Donne des informations sur le son en cours.",
            })
            .addFields({
                name: "- /skip",
                value: "Permet de skip le son en cours.",
            })
            .addFields({
                name: "- /lyrics (+titre avec auteur)",
                value: "Affiche les paroles du son en cours ou d'un son spécifique (précisez le titre et l'auteur pour avoir plus de précision).",
            })
            .addFields({
                name: "- /queue",
                value: "Permet de voir les 10 prochains sons en file d'attente et le nombre total de sons en attente.",
            });

        const embed3 = new EmbedBuilder()
            .setColor("#6f5ef7")
            .addFields({
                name: "__Commandes Administrateur :__",
                value: "Seulement pour ceux qui ont certaines perms",
            })
            .addFields({
                name: "- /clear + number",
                value: "Supprime le nombre de message que vous saisissez. (permissions de gerer les messages pour utiliser cette commande.",
            })
            .addFields({
                name: "__Commandes WL :__",
                value: "Seulement pour ceux qui sont WL",
            })
            .addFields({
                name: "- /dm + mention + contenu",
                value: "Envoi un message privé personnalisé avec le bot !",
            })
            .addFields({
                name: "- /addrole + mention + role",
                value: "Ajoute à un membre le rôle mentionner !",
            })
            .addFields({
                name: "- /removerole + mention + role",
                value: "Retire à un membre le rôle mentionné !",
            })
            .addFields({
                name: "- /ban + (user_id / mention) (+raison + temps si c'est pas permanent)",
                value: "Permet de bannir un utilisateur avec un motif personnalisé si besoin.",
            })
            .addFields({
                name: "- /unban + user_id",
                value: "Permet de débannir un utilisateur grâce à son identifiant discord.",
            })
            .addFields({
                name: "- /kick + mention (+raison)",
                value: "Permet de kick un utilisateur présent dans le discord en le mentionnant, raison personnalisé si souhaitée.",
            })
            // .setImage("https://i.imgur.com/z0Zrlnt.jpeg");
            .setTimestamp();
        // .setFooter({text: "Ce bot appartient à son créateur", iconURL: "https://i.imgur.com/z0Zrlnt.jpeg"})

        await interaction.followUp({ embeds: [embed] });
        await interaction.channel.send({ embeds: [embed2] });
        return interaction.channel.send({ embeds: [embed3] });
    },
});
