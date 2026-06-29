# Simple Setup

This is the easiest setup path for the Steam Discord Widget.

If you do not care about deep customization yet, start here.

## Table of Contents

- [What you need](#what-you-need)
- [Step 1 - Open config.json](#step-1---open-configjson)
- [Step 2 - Run it](#step-2---run-it)
- [Step 3 - Done](#step-3---done)
- [If something is wrong](#if-something-is-wrong)

## What you need

- [Node.js 18+](https://nodejs.org/)
- A [Steam Web API key](https://steamcommunity.com/dev/apikey)
- Your Steam `steamId64`
- Your Discord widget values:
  - `applicationId`
  - `userId`
  - `widgetBotToken`

## Step 1 - Open `config.json`

Edit:

- [`config.json`](./config.json)

Fill in:

```json
{
  "applicationId": "YOUR_APPLICATION_ID",
  "userId": "YOUR_USER_ID",
  "widgetBotToken": "YOUR_WIDGET_BOT_TOKEN",
  "steamApiKey": "YOUR_STEAM_API_KEY",
  "steamId64": "YOUR_STEAM_ID64"
}
```

Leave the rest alone for now if you want the default setup.

## Step 2 - Run it

```bash
npm start
```

## Step 3 - Done

The default config already includes useful fields like:

- playtime
- games owned
- friends
- Steam level
- member since
- badge count
- playtime past 2 weeks
- most played game
- simple profile URL

## If something is wrong

Go to:

- [SETUP.MD](./SETUP.MD) for the full walkthrough
- [WIDGET-SETUP.md](./WIDGET-SETUP.md) if you are confused about widget key names
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) if you want to customize formatting or field mappings
