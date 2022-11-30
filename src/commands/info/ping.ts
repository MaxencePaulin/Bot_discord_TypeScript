import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "répond avec pong",
    options: [
        {
            name: "mention",
            description: "pour ping un utilisateur",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        const mention = interaction.options.getUser("mention");
        if (!mention) interaction.followUp("Pong !");
        else {
            interaction.followUp("Commande reçu !");
            interaction.channel.send(`<@${mention.id}> reçoit pong !`);
        }
    },
});
