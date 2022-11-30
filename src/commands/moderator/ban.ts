import { settings } from "../../config/config";
import { Command } from "../../structures/Command";
import { GuildMember } from "discord.js";
import { client } from "../..";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "ban",
    description: "Pour bannir un utilisateur",
    options: [
        {
            name: "user_id",
            description: "Identifiant discord de l'utilisateur à bannir",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "mention",
            description:
                "Mention de l'utilisateur à bannir si il se trouve sur le serveur",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
        {
            name: "reason",
            description:
                "Raison personnalisée que vous souhaitez afficher dans les logs",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        if (!settings.ban_allowed.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permission de faire cela."
            );
        const userId = interaction.options.getString("user_id");
        const target = interaction.options.getMember("mention") as GuildMember;
        const reason = interaction.options.getString("reason");

        if (!target && !userId)
            return interaction.followUp(
                "Veuillez mentionner un utilisateur ou un identifiant discord à bannir."
            );
        if (target && userId)
            return interaction.followUp(
                "Veuillez ne séléctionner soit une mention, soit un identifiant discord et non les deux en même temps."
            );

        if (target) {
            if (!target.bannable)
                return interaction.followUp(
                    "Cet utilisateur ne peut pas être banni."
                );
            if (!reason) {
                target.ban({ reason: ` banni par ${interaction.user.tag}` });
                interaction.followUp(
                    `L'utilisateur ${target} a bien été banni de façon permanente.`
                );
            }
            if (reason) {
                target.ban({
                    reason: `${reason} banni par ${interaction.user.tag}`,
                });
                interaction.followUp(
                    `L'utilisateur ${target} a bien été banni de façon permanente avec comme raison : ${reason}.`
                );
            }
        }
        if (userId) {
            const user = await client.users.fetch(userId);
            if (!user) return interaction.followUp("Utilisateur introuvable.");
            if (!reason) {
                interaction.guild.members
                    .ban(user, { reason: ` banni par ${interaction.user.tag}` })
                    .then(() => {
                        interaction.followUp(
                            "L'utilisateur <@" +
                                userId +
                                "> a bien été banni de façon permanente."
                        );
                    })
                    .catch(() => {
                        interaction.followUp(
                            "Cet utilisateur ne peut pas être banni."
                        );
                    });
            }
            if (reason) {
                interaction.guild.members
                    .ban(user, {
                        reason: `${reason} banni par ${interaction.user.tag}`,
                    })
                    .then(() => {
                        interaction.followUp(
                            "L'utilisateur <@" +
                                userId +
                                `> a bien été banni de façon permanente avec comme raison : ${reason}.`
                        );
                    })
                    .catch(() => {
                        interaction.followUp(
                            "Cet utilisateur ne peut pas être banni."
                        );
                    });
            }
        }
    },
});
