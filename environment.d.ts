declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            DATABASE_URI?: string;
            guildId: string;
            clientId: string;
            environment: "dev" | "prod" | "debug";
        }
    }
}

export {};
