# Simple Setup

This guide is for people who just want to get the Steam widget working without digging through all the advanced docs first.

It still covers the important setup steps. It just avoids the deeper customization stuff unless you need it later.

## Table of Contents

- [What you need](#what-you-need)
- [Step 1 - Install Node.js](#step-1---install-nodejs)
- [Step 2 - Get your Steam Web API key](#step-2---get-your-steam-web-api-key)
- [Step 3 - Get your Steam ID64](#step-3---get-your-steam-id64)
- [Step 4 - Get your Discord widget values](#step-4---get-your-discord-widget-values)
- [Step 5 - Fill out config.json](#step-5---fill-out-configjson)
- [Step 6 - Run the script](#step-6---run-the-script)
- [What the default config already gives you](#what-the-default-config-already-gives-you)
- [If you get stuck](#if-you-get-stuck)

## What you need

You need five things:

1. [Node.js 18+](https://nodejs.org/)
2. A [Steam Web API key](https://steamcommunity.com/dev/apikey)
3. Your Steam `steamId64`
4. Your Discord `applicationId`
5. Your Discord `userId` and `widgetBotToken`

## Step 1 - Install Node.js

Download Node.js here:

- [Node.js](https://nodejs.org/)

You want version 18 or newer.

After installing it, you should be able to run:

```bash
node -v
```

and:

```bash
npm -v
```

If those work, you are good.

## Step 2 - Get your Steam Web API key

Open:

- [Steam Web API key page](https://steamcommunity.com/dev/apikey)

Log into Steam and create a key if you do not already have one.

Notes:

- most people use `localhost` as the domain
- keep the key private
- never post it publicly

## Step 3 - Get your Steam ID64

Do this:

1. Open [steamid.io](https://steamid.io/)
2. Paste your Steam username or profile link
3. Copy the value labeled `steamID64`
4. Paste it into `config.json`

## Step 4 - Get your Discord widget values

You need:

- `applicationId`
- `userId`
- `widgetBotToken`

If you do not already have those, read:

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)

That guide covers the Discord side:

- the recommended helper script setup
- app creation
- widget creation
- publishing
- authing the widget to your account

Recommended:

- use the helper script in `WIDGET-SETUP.md`
- then come back here and finish `config.json`

## Step 5 - Fill out `config.json`

Open:

- [`config.json`](./config.json)

Replace the placeholder values:

```json
{
  "applicationId": "YOUR_APPLICATION_ID",
  "userId": "YOUR_USER_ID",
  "widgetBotToken": "YOUR_WIDGET_BOT_TOKEN",
  "steamApiKey": "YOUR_STEAM_API_KEY",
  "steamId64": "YOUR_STEAM_ID64"
}
```

You can leave the rest of the config alone if you want the default starter layout.

## Step 6 - Run the script

Open a terminal in the `steam` folder and run:

```bash
npm start
```

If everything is set up properly, the script will patch the widget using your current config.

## What the default config already gives you

The included config already maps useful fields like:

- playtime
- games owned
- friends
- Steam level
- member since
- badge count
- playtime past 2 weeks
- most played game
- simple profile URL

So most people do not need to edit the field mappings right away.

## If you get stuck

Use these guides:

- [SETUP.MD](./SETUP.MD) for the full walkthrough
- [WIDGET-SETUP.md](./WIDGET-SETUP.md) for the Discord widget side
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) for custom fields, variables, and formatting
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common problems and fixes
