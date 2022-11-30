import { settings } from "../../config/config";
import { Command } from "../../structures/Command";
import { GuildMember } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "kick",
    description: "Exclu un membre du serveur",
    options: [
        {
            name: "user_mention",
            description: "Mentionne l'utilisateur à exclure",
            type: ApplicationCommandOptionType.User,
            required: true,
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
        if (!settings.kick_allowed.includes(interaction.user.id.toString()))
            return interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permissions de faire cela."
            );
        const target = interaction.options.getMember(
            "user_mention"
        ) as GuildMember;
        if (!target.kickable)
            return interaction.followUp(
                "Cet utilisateur ne peut pas être kick."
            );
        const reason = interaction.options.getString("reason");
        if (!reason) {
            target.kick(` kick par ${interaction.user.tag}`);
            interaction.followUp(`L'utilisateur ${target} a bien été kick.`);
        } else {
            target.kick(`${reason} kick par ${interaction.user.tag}`);
            interaction.followUp(
                `L'utilisateur ${target} a bien été kick avec comme raison : ${reason}.`
            );
        }
    },
});
