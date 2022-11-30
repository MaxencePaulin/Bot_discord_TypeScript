import { Command } from "../../structures/Command";
import { ApplicationCommandOptionType } from "discord.js";

export default new Command({
    name: "ploufplouf",
    description: "Fait un choix aléatoire",
    options: [
        {
            name: "choix1",
            description: "choix numéro 1",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix2",
            description: "choix numéro 2",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix3",
            description: "choix numéro 3",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix4",
            description: "choix numéro 4",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix5",
            description: "choix numéro 5",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix6",
            description: "choix numéro 6",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix7",
            description: "choix numéro 7",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix8",
            description: "choix numéro 8",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix9",
            description: "choix numéro 9",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "choix10",
            description: "choix numéro 10",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async ({ interaction }) => {
        const choice1 = interaction.options.getString("choix1");
        const choice2 = interaction.options.getString("choix2");
        const choice3 = interaction.options.getString("choix3");
        const choice4 = interaction.options.getString("choix4");
        const choice5 = interaction.options.getString("choix5");
        const choice6 = interaction.options.getString("choix6");
        const choice7 = interaction.options.getString("choix7");
        const choice8 = interaction.options.getString("choix8");
        const choice9 = interaction.options.getString("choix9");
        const choice10 = interaction.options.getString("choix10");
        const optionsTab = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10];
        let finalTab = []; let j = 0;
        const answer = [
            "Personnellement je choisis ",
            "Je suis d'avis de faire le choix de ",
            "Choisis ça ou je te bute : ",
            "Je suis le meilleur bot donc crois moi, choisis ",
            "T'es la reine des putes si tu choisis pas ",
        ]
        for (let i = 0; i < optionsTab.length; i++) {
            if (optionsTab[i] != null) {
                finalTab[j] = optionsTab[i];
                j++;
            }
        }
        if (finalTab.length == 0) {
            return interaction.followUp("Sans préciser les choix je peux pas choisir gogole...");
        }
        if (finalTab.length == 1) {
            return interaction.followUp("Il faut au moins deux choix sinon la réponse est évidente pfff...");
        }
        const randomAnswer = Math.floor(Math.random() * answer.length);
        const randomResult = Math.floor(Math.random() * finalTab.length);
        interaction.followUp(answer[randomAnswer]+finalTab[randomResult]);
    },
});
