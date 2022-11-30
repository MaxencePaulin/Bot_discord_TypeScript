import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    REST,
    Routes,
} from "discord.js";
import { ButtonType, CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import { ajouterGuild, supprimerGuild } from "../config/jsonManip";

const globPromise = promisify(glob);
export const rest = new REST({ version: "10" }).setToken(process.env.botToken);
export let slashCommands: ApplicationCommandDataResolvable[];

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    buttons: Collection<string, ButtonType> = new Collection();

    constructor() {
        super({ intents: 3276799 });
    }

    start() {
        this.registerModules();
        this.login(process.env.botToken);
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ clientId, commands }: RegisterCommandsOptions) {
        try {
            await rest.put(Routes.applicationCommands(clientId), {
                body: commands,
            });
            console.log("Registering commands to REST API");
        } catch (e) {
            console.log("error registering api");
            console.log(e);
        }
        // if (guildId) {
        //     this.guilds.cache.get(guildId)?.commands.set(commands);
        //     console.log(`Registering commands to ${guildId}`);
        // } else {
        //     this.application?.commands.set(commands);
        //     console.log("Registering global commands");
        // }

        this.guilds.cache.forEach((guild) => {
            supprimerGuild(guild.id);
        });
        setTimeout(() => {
            this.guilds.cache.forEach((guild) => {
                ajouterGuild(guild.id, guild.name);
            });
        }, 1000);
    }

    async registerModules() {
        // Commands
        slashCommands = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            // console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            setTimeout(() => {
                this.registerCommands({
                    clientId: process.env.clientId,
                    commands: slashCommands,
                });
            }, 1000);
        });

        // Button
        const btnFiles = await globPromise(
            `${__dirname}/../buttons/*/*{.ts,.js}`
        );
        btnFiles.forEach(async (filePath) => {
            const button = await this.importFile(filePath);
            if (!button.name) return;
        
            this.buttons.set(button.name, button);
        });

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }
}
