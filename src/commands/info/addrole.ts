import { GuildMember } from "discord.js";
import { settings } from "../../config/config";
import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "addrole",
    description: "Ajouter un rôle à un membre",
    options: [
        {
            name: "mention",
            description: "Choisis le membre",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "role",
            description: "Choisis le role",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
    ],
    run: async ({ interaction }) => {
        if (
            !settings.addrole_commands_allowed.includes(
                interaction.user.id.toString()
            )
        )
            return interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permission de faire cela."
            );
        const mention = interaction.options.getMember("mention");
        const role = interaction.options.getRole("role");
        if (
            role.position >= interaction.guild.members.me.roles.highest.position
        )
            return interaction.followUp(
                `Vous ne pouvez pas mettre le role ${role} car il est au dessus ou au même niveau que de celui du bot.`
            );
        if ((mention as GuildMember).roles.cache.has(role.id))
            return interaction.followUp(
                `${mention} possède déjà le role ${role}.`
            );
        (mention as GuildMember).roles.add(role.id);
        interaction.followUp(`Le role ${role} à bien été mit à ${mention}.`);
    },
});
