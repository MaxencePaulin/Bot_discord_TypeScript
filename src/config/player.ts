import { Player } from "discord-player";
import { Client } from "discord.js";

const client = new Client({
    intents: 3276799,
});

export const player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
});
