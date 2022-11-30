import { ApplicationCommandDataResolvable, GuildMember } from "discord.js";

export interface RegisterCommandsOptions {
    clientId?: string;
    guildId?: string;
    commands: ApplicationCommandDataResolvable[];
}

export interface BotSettings {
    member?: GuildMember;
    prefix?: string;
    ban_allowed?: string[];
    unban_allowed?: string[];
    kick_allowed?: string[];
    info_player_allowed?: string[];
    dm_commands_allowed?: string[];
    change_activity_allowed?: string[];
    addrole_commands_allowed?: string[];
    removerole_commands_allowed?: string[];
    owner_bot?: string[];
    test?: string[];
}
