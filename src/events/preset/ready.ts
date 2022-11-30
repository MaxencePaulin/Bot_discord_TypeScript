import { ActivityType } from "discord.js";
import { client } from "../..";
import { Event } from "../../structures/Event";

export default new Event("ready", () => {
    console.log("Bot is online");
    client.user.setStatus("online");
    setTimeout(() => {
        client.user.setActivity("le bot typescript performer", {
            type: ActivityType.Watching,
        });
    }, 100);
});
