import { ChannelType, EmbedBuilder } from "discord.js";
import { client } from "../..";
import { settings } from "../../config/config";
import { Event } from "../../structures/Event";

const usersMap = new Map();
const LIMIT = 5;
const DIFF = 3000;

export default new Event("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;
    // !help init
    if (message.content.startsWith(settings.prefix + "help")) {
        const embed = new EmbedBuilder()
            .setColor("#6f5ef7")
            .setTitle("__Liste des commandes__")
            // .setURL("https://discord.js.org/")
            .setAuthor({
                name: client.user.username,
                iconURL:
                    message.guild.iconURL() || client.user.avatarURL(),
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

        await message.channel.send({ embeds: [embed] });
        await message.channel.send({ embeds: [embed2] });
        await message.channel.send({ embeds: [embed3] });
    }

    // Ping
    if (message.content.startsWith(settings.prefix + "ping")) {
        message.reply("pong !");
    }

    // Temporaire pour join
    // if (message.content) {
    //     try {
    //         const invite = await message.guild.invites.create(
    //             message.channelId,
    //             {maxAge: 0}
    //         );
    //         console.log(
    //             `invitation generé : https://discord.gg/${invite.code} pour ${message.guild.name}`
    //         );
    //         console.log(invite.code);
    //     } catch (e) {
    //         return console.log(
    //             "Le bot a essayé de creer une invitation mais il semblerait qu'il n'ai pas la permission..."
    //         );
    //     }
    // }

    // init randomGen
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Auto reply
    if (
        message.content.toLowerCase().includes(" Titiloum ".toLowerCase()) ||
        message.content.toLowerCase().startsWith("Titiloum ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" Titiloum".toLowerCase())
    ) {
        var randomInt = getRandomInt(0, 5);
        if (randomInt == 0) message.reply("Tu parles de MA copine ?");
        if (randomInt == 1) message.reply("cc");
        if (randomInt == 2) message.reply("bjr");
        if (randomInt == 3) message.reply("parle pas d'elle");
        if (randomInt == 4) message.reply("parle mieux d'elle");
        if (randomInt == 5) message.reply("tu parles de l'amour de ma vie ?");
    }

    if (message.content.toLowerCase() == "Parle moi".toLowerCase()) {
        message.author.send("coucou");
        console.log(message.author);
    }

    if (
        message.content.toLowerCase() == "Je t'aime".toLowerCase() ||
        message.content.toLowerCase().startsWith("Je t'aime ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" Je t'aime".toLowerCase()) ||
        message.content.toLowerCase() == "jtm".toLowerCase() ||
        message.content.toLowerCase().startsWith("jtm ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" jtm".toLowerCase()) ||
        message.content.toLowerCase() == "je taime".toLowerCase() ||
        message.content.toLowerCase().startsWith("je taime ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" je taime".toLowerCase()) ||
        message.content.toLowerCase() == "je t aime".toLowerCase() ||
        message.content.toLowerCase().startsWith("je t aime ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" je t aime".toLowerCase()) ||
        message.content.toLowerCase().includes(" Je t'aime ".toLowerCase()) ||
        message.content.toLowerCase().includes(" jtm ".toLowerCase()) ||
        message.content.toLowerCase().includes(" je taime ".toLowerCase()) ||
        message.content.toLowerCase().includes(" je t aime ".toLowerCase())
    ) {
        var randomInt = getRandomInt(0, 5);
        if (randomInt == 0)
            message.reply("Ca va je vous dérange pas les tourteraux ?");
        if (randomInt == 1) message.reply("Pas de ca ici !");
        if (randomInt == 2) message.reply("Je vous réserve l'hotel ?");
        if (randomInt == 3) message.reply("moi aussi je t'aime tqt");
        if (randomInt == 4) message.reply("Si seulement c'était réciproque...");
        if (randomInt == 5) message.reply("Trop de mignonitude la stop !");
    }

    if (
        message.content.toLowerCase().endsWith("quoi".toLowerCase()) ||
        message.content.toLowerCase().endsWith("quoi ?".toLowerCase())
    ) {
        message.reply("feur");
    }

    if (
        message.content.toLowerCase() == "allo".toLowerCase() ||
        message.content.toLowerCase() == "allo ?".toLowerCase() ||
        message.content.toLowerCase().endsWith(" allo".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" allo ?".toLowerCase())
    ) {
        message.reply(`à l'huile`);
    }

    if (
        message.content.toLowerCase() == "ok".toLowerCase() ||
        message.content.toLowerCase() == "ok.".toLowerCase() ||
        message.content.toLowerCase() == "ok .".toLowerCase() ||
        message.content.toLowerCase() == "ok ?".toLowerCase() ||
        message.content.toLowerCase() == "ok?".toLowerCase() ||
        message.content.toLowerCase() == "ok !".toLowerCase() ||
        message.content.toLowerCase() == "ok!".toLowerCase() ||
        message.content.toLowerCase().endsWith(" ok".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok.".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok .".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok ?".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok?".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok !".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" ok!".toLowerCase())
    ) {
        message.reply(`sur glace`);
    }

    if (
        message.content.toLowerCase() == "oh".toLowerCase() ||
        message.content.toLowerCase() == "oh.".toLowerCase() ||
        message.content.toLowerCase() == "oh .".toLowerCase() ||
        message.content.toLowerCase() == "oh ?".toLowerCase() ||
        message.content.toLowerCase() == "oh?".toLowerCase() ||
        message.content.toLowerCase() == "oh!".toLowerCase() ||
        message.content.toLowerCase() == "oh !".toLowerCase() ||
        message.content.toLowerCase().endsWith(" oh".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh.".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh .".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh ?".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh?".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh !".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" oh!".toLowerCase())
    ) {
        message.reply(`macarena`);
    }

    if (
        message.content.toLowerCase() == "un".toLowerCase() ||
        message.content.toLowerCase() == "un ?".toLowerCase() ||
        message.content.toLowerCase() == "hein".toLowerCase() ||
        message.content.toLowerCase() == "hein ?".toLowerCase() ||
        message.content.toLowerCase().endsWith(" un".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" un ?".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" hein".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" hein ?".toLowerCase())
    ) {
        message.reply(`deux`);
    }

    if (
        message.content.toLowerCase().includes(" lola ".toLowerCase()) ||
        message.content.toLowerCase().startsWith("lola ".toLowerCase()) ||
        message.content.toLowerCase().endsWith(" lola".toLowerCase())
    ) {
        message.reply(
            "Elle a dit qu'elle aimait pas, c'est la dernère fois que tu l'appelles comme ca !"
        );
    }

    // Anti spam
    if (message.author.bot) return;

    if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference =
            message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if (difference > DIFF) {
            clearTimeout(timer);
            console.log("Cleared Timeout");
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log("Removed from map.");
            }, 5000);
            usersMap.set(message.author.id, userData);
        } else {
            ++msgCount;
            if (parseInt(msgCount) === LIMIT) {
                message.reply(
                    "Attention: tu spam encore t'es ban fdp. (tu as le role mute pendant 30 secondes ducoup :p)"
                );
                message.channel.bulkDelete(LIMIT);
                message.member.roles.add("967071757636894811");
                setTimeout(() => {
                    message.member.roles.remove("967071757636894811");
                    message.channel.send(
                        "<@" +
                            message.member.id +
                            "> c'est bon tu n'as plus le role mute bg."
                    );
                }, 30000);
                let fn = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    console.log("Removed from map.");
                }, 5000);
                usersMap.set(message.author.id, {
                    msgCount: 1,
                    lastMessage: message,
                    timer: fn,
                });
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    } else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log("Removed from map.");
        }, 5000);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn,
        });
    }
});
