import { Event } from "../../structures/Event";
import { ajouterGuild } from "../../config/jsonManip";

export default new Event("guildCreate", async (guild) => {
    console.log(
        "Le bot se trouve dans un nouveau serveur :" +
            guild.id +
            ", nom: " +
            guild.name
    );
    ajouterGuild(guild.id, guild.name);
});
