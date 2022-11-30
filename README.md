# TypeScriptBot

Projet personnel de bot Discord en TypeScript.

Open source, libre d'utilisation et de modification.

## Installation

```bash
npm install

touch .env
```

## Configuration

```bash
# .env
botToken={votre token de bot discord}
guildId={Votre discord principal où sera le bot (vous en mettez qu'un seul et ça fonctionnera)}
clientId={l'id discord du bot (pas le token)}
environment=debug (si vous souhaitez le modifier)
```

## Lancement

```bash
npm run start
```

Et maintenant regardez tout simplement votre bot sur discord !

Vous pouvez aussi tout simplement utiliser le mien, fait avec amour, pour l'ajouter à votre serveur discord :

https://discord.com/api/oauth2/authorize?client_id=995456528473661451&permissions=8&scope=bot%20applications.commands

Je précise que le bot est hébergé gratuitement et qu'il peut être éteint, ce n'est qu'un projet personnel, pas une production.

Pour plus d'informations sur les commandes, utilisez la commande `/help` sur votre serveur discord !

ps : vous pouvez aussi le build en JavaScript à l'aide de la commande `npm run build` et lancer le bot avec `npm run start:prod`

## Enjoy !
