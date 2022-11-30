import { Event } from "../../structures/Event";
import { supprimerGuild } from '../../config/jsonManip';

export default new Event("guildDelete", async (guild) => {
    console.log(
        "Le bot n'est plus dans ce serveur : " +
            guild.id +
            ", nom: " +
            guild.name
    );
    supprimerGuild(guild.id);
});
