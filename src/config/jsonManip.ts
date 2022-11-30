import fs from "fs";

export const ajouterGuild = (id, name) => {
    const guildRead = lireGuild();
    const duplicateGuild = guildRead.find((guild) => guild.id === id);

    if (!duplicateGuild) {
        guildRead.push({
            id: id,
            name: name,
        });
        saveGuilds(guildRead);
        console.log("Nouvelle guild ajoutée! : "+id);
    } else {
        console.log("Guild déjà recensée !");
        // error, results
    }
};

const saveGuilds = (guildRead) => {
    const dataSTRING = JSON.stringify(guildRead);
    fs.writeFileSync("./src/config/guild.json", dataSTRING);
};

const lireGuild = () => {
    try {
        const dataBuff = fs.readFileSync("./src/config/guild.json")
        const dataJSON = dataBuff.toString();
        return JSON.parse(dataJSON);
    }catch (e) {
        return [];
    }
}

export const listerGuild = () => {
    fs.readFile("./src/config/guild.json", (error, data) => {
        if (error) {
            return [];
        } else {
            const dataJSON = data.toString();
            let guilds = JSON.parse(dataJSON);
            console.log("MES GUILDS");
            guilds.forEach((guild) => {
                console.log(guild.id);
            });
        }
    });
};

export const supprimerGuild = (id) => {
    try {
        const guildRead = lireGuild();
        const guildRead2 = [];
        const exist = guildRead.find((guild) => guild.id === id);
        if (!exist) {
            return console.log("ERROR/GUILD DON'T EXIST");
        }
        guildRead.forEach((guild) => {
            if (guild.id !== id) guildRead2.push(guild);
        });
        saveGuilds(guildRead2);
        console.log("Delete Success !");
    } catch (e) {
        console.log(e);
    }
};

export const lireOneGuild = (id) => {
    try {
        const guildRead = lireGuild();
        const exist = guildRead.find((guild) => guild.id === id);
        if (!exist) {
            return console.log("ERROR/GUILD DON'T EXIST");
        }
        guildRead.forEach((guild) => {
            if (guild.id === id) {
                console.log(`Id: ${guild.id}, name: ${guild.name}`);
            }
        });
    } catch (e) {
        console.log(e);
    }
};