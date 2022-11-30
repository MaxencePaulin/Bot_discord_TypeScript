import { settings } from "../../config/config";
import { Command } from "../../structures/Command";

export default new Command({
    name: "test",
    description: "juste pour test",
    run: async ({ interaction }) => {
        if (!settings.test.includes(interaction.user.id.toString())) {
            interaction.followUp(
                "<@" +
                    interaction.member.id +
                    "> Vous n'avez pas la permission de faire cela."
            );
            return;
        }
        interaction.followUp("test réussi !");
        return;
    },
});
