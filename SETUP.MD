# Steam Discord Widget Setup

<p align="center">
  Full setup guide for getting the Steam widget updater working from start to finish.
</p>

<p align="center">
  <a href="./README.md">Home</a> |
  <a href="./SIMPLE-SETUP.md">Simple Setup</a> |
  <a href="./WIDGET-SETUP.md">Widget Setup</a> |
  <a href="./ADVANCED-SETUP.md">Advanced Setup</a> |
  <a href="./TROUBLESHOOTING.md">Troubleshooting</a>
</p>

---

## Table of Contents

- [What this guide covers](#what-this-guide-covers)
- [Pick your path](#pick-your-path)
- [What you need before starting](#what-you-need-before-starting)
- [Step 1 - Install Node.js](#step-1---install-nodejs)
- [Step 2 - Get your Steam Web API key](#step-2---get-your-steam-web-api-key)
- [Step 3 - Get your Steam ID64](#step-3---get-your-steam-id64)
- [Path A - Setup Discord Widget](#path-a---setup-discord-widget)
- [Path B - I already have a widget](#path-b---i-already-have-a-widget)
- [Step 4 - Fill out config.json](#step-4---fill-out-configjson)
- [Step 5 - Install packages and run it](#step-5---install-packages-and-run-it)
- [Polling or one-time mode](#polling-or-one-time-mode)
- [Starter field ideas](#starter-field-ideas)
- [What to do next](#what-to-do-next)
- [Security note](#security-note)

---

## What this guide covers

This is the full guide for people who want everything in one place.

It walks through:

- Steam setup
- Discord widget setup
- filling in `config.json`
- running the updater
- choosing between one-time mode and auto polling

If you want the shorter beginner version instead, use [SIMPLE-SETUP.md](./SIMPLE-SETUP.md).

---

## Pick your path

There are two common starting points.

### Path A - You still need the Discord widget

Use this if you:

- do not have the widget set up yet
- still need to create it
- still need to publish it
- still need to auth it to your account

Jump to [Path A - Setup Discord Widget](#path-a---setup-discord-widget).

### Path B - You already have a widget

Use this if you:

- already made the widget
- already published it
- already have your `applicationId`, `userId`, and `widgetBotToken`
- just want to fill in the Steam config and run the script

Jump to [Path B - I already have a widget](#path-b---i-already-have-a-widget).

---

## What you need before starting

You need:

- [Node.js 18+](https://nodejs.org/)
- a [Steam Web API key](https://steamcommunity.com/dev/apikey)
- your Steam `steamId64`
- your Discord widget values:
  - `applicationId`
  - `userId`
  - `widgetBotToken`

---

## Step 1 - Install Node.js

Download Node.js here:

- [Node.js 18+](https://nodejs.org/)

After installing it, open a terminal and run:

```bash
node -v
npm -v
```

If both commands return a version, you are good.

---

## Step 2 - Get your Steam Web API key

Open:

- [Steam Web API key page](https://steamcommunity.com/dev/apikey)

Then:

1. Sign into Steam
2. Create an API key if you do not already have one
3. Copy the key
4. Paste it into `config.json`

Most people use `localhost` as the domain when creating the key.

Keep that key private.

---

## Step 3 - Get your Steam ID64

The easy way:

1. Open [steamid.io](https://steamid.io/)
2. Paste your Steam username or profile link
3. Copy the value labeled `steamID64`
4. Paste it into `config.json`

That is it.

---

## Path A - Setup Discord Widget

If you do not have the widget side finished yet, do this now.

### What to do

1. Open [WIDGET-SETUP.md](./WIDGET-SETUP.md)
2. Use the recommended helper script method there
3. Let it create and publish the base widget for you
4. Come back here and continue with `config.json`

If you want to build everything manually instead, the same guide also includes the full manual path.

### Good starter field names

If you want a clean default setup, use these text keys:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `badgecount`
- `playtimepast2w`
- `mostplayedgame`
- `simpleurl`

Optional image keys:

- `avataricon`
- `backgroundimage`

### When you are done

Make sure you have:

- `applicationId`
- `userId`
- `widgetBotToken`

Then continue to [Step 4 - Fill out config.json](#step-4---fill-out-configjson).

---

## Path B - I already have a widget

If your widget already exists, you can skip most of the Discord-side setup.

You just need these three values from your current widget setup:

- `applicationId`
- `userId`
- `widgetBotToken`

Then continue to [Step 4 - Fill out config.json](#step-4---fill-out-configjson).

### Using your own field names

You do not have to use the example field names from this repo.

If your widget already uses custom names, keep them and map them in `config.json`.

Example:

```json
{
  "name": "profilehours",
  "variable": "{{playtimeHoursMinutes}}"
}
```

That means the widget key named `profilehours` will receive the formatted total playtime.

---

## Step 4 - Fill out `config.json`

Open:

- [`config.json`](./config.json)

Replace the placeholders with your real values:

```json
{
  "applicationId": "YOUR_APPLICATION_ID",
  "userId": "YOUR_USER_ID",
  "widgetBotToken": "YOUR_WIDGET_BOT_TOKEN",
  "steamApiKey": "YOUR_STEAM_API_KEY",
  "steamId64": "YOUR_STEAM_ID64",
  "pollingEnabled": true,
  "pollIntervalMs": 300000,
  "usernameTemplate": "{{displayName}}",
  "dynamicFields": [
    {
      "name": "playtime",
      "variable": "{{playtimeHoursMinutes}}"
    },
    {
      "name": "gamesowned",
      "variable": "{{gamesOwned}}"
    },
    {
      "name": "friends",
      "variable": "{{friends}}"
    },
    {
      "name": "backgroundimage",
      "type": 3,
      "variable": "{{profileBackgroundImage}}"
    }
  ]
}
```

If you want the default widget layout, you can usually leave the included field mappings alone.

If you want to customize formatting, field names, image fields, or variables, use [ADVANCED-SETUP.md](./ADVANCED-SETUP.md).

---

## Step 5 - Install packages and run it

Open a terminal in the `steam` folder and run:

```bash
npm install
npm start
```

If everything is set up properly, the script will update the widget using your Steam data.

---

## Polling or one-time mode

You can choose whether the script keeps updating or runs once and exits.

### Auto update mode

```json
"pollingEnabled": true,
"pollIntervalMs": 300000
```

That updates every 5 minutes.

### Run once mode

```json
"pollingEnabled": false
```

This is useful if you want to:

- run it manually
- use Windows Task Scheduler
- use a cron job
- run it from another automation system

---

## Starter field ideas

### Minimal setup

```json
"dynamicFields": [
  {
    "name": "playtime",
    "variable": "{{playtimeHoursMinutes}}"
  },
  {
    "name": "gamesowned",
    "variable": "{{gamesOwned}}"
  },
  {
    "name": "friends",
    "variable": "{{friends}}"
  }
]
```

### Use a simpler profile link

```json
{
  "name": "simpleurl",
  "variable": "{{simpleUrl}}"
}
```

### Use the full Steam profile URL

```json
{
  "name": "profileurl",
  "variable": "{{profileUrl}}"
}
```

### Show when the account was created

```json
{
  "name": "membersince",
  "variable": "{{memberSinceYear}}"
}
```

### Show the relative age of the account

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Show most played game with hours

```json
{
  "name": "mostplayedgame",
  "variable": "{{mostPlayedGameDisplay}}"
}
```

---

## What to do next

Use the guide that matches what you need next:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md) for the shortest walkthrough
- [WIDGET-SETUP.md](./WIDGET-SETUP.md) for the Discord side
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) for variables, formatting, and image fields
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if something is not working

---

## Security note

Before you publish the repo or share your files:

1. remove real secrets from [`config.json`](./config.json)
2. put the placeholder values back
3. rotate anything that was exposed before

Do not commit:

- real `widgetBotToken`
- real `steamApiKey`
- private personal values
<!-- minor refresh -->
