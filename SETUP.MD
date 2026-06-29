# Steam Discord Widget Setup

This is the step-by-step setup guide for the Steam widget updater in this folder.

If you want the full project documentation, supported variables, formatting examples, and config reference, read:

- [README.md](./README.md)

This file is focused on getting the widget working from zero.

## What this script does

The updater reads Steam profile data and pushes it into a Discord widget profile.

You control:

- which widget keys exist on Discord
- which Steam values get sent
- how those values are formatted
- whether the script runs once or keeps polling

## Before you start

You need:

- [Node.js 18+](https://nodejs.org/)
- A [Steam Web API key](https://steamcommunity.com/dev/apikey)
- Your Steam `steamId64`
- A Discord widget setup that gives you:
  - `applicationId`
  - `userId`
  - `widgetBotToken`

## Step 1 — Get your Steam API key

Open:

- <https://steamcommunity.com/dev/apikey>

Sign in and create a key if you do not already have one.

Notes:

- many people use `localhost` as the domain
- keep the key private
- do not commit it to GitHub

## Step 2 — Get your Steam ID64

You need the numeric 64-bit Steam ID, not your vanity name.

If your profile URL already looks like:

```text
https://steamcommunity.com/profiles/7656119...
```

then that full number is your `steamId64`.

If your profile uses:

```text
https://steamcommunity.com/id/yourname
```

you will need to resolve it to the numeric ID first.

## Step 3 — Fill out `config.json`

Open:

- [`config.json`](./config.json)

and fill in:

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
    }
  ]
}
```

## Step 4 — Understand the Discord side

The script does not invent your widget layout.

You build the widget in Discord first, then map its keys to Steam values here.

Example:

If your widget profile has a text key named:

```text
playtime
```

then this config entry:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

means:

- Discord key name = `playtime`
- Steam variable = `{{playtimeHoursMinutes}}`

The script resolves that variable and patches the key automatically.

## Step 5 — Add or rename your widget keys

In the Discord Developer Portal, create the keys you want your widget to use.

Examples:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `badgecount`
- `playtimepast2w`
- `mostplayedgame`
- `simpleurl`
- `avataricon`
- `backgroundimage`

You are not limited to those names.

If your widget uses a custom key like:

```text
mysteamfield
```

you can map that too:

```json
{
  "name": "mysteamfield",
  "variable": "{{displayName}} | {{steamLevel}}"
}
```

## Step 6 — Text fields vs image fields

### Text field

Use the default type or explicitly set `type` to `1`.

Example:

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Image field

Set:

```json
"type": 3
```

Example:

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

Example using Steam profile background:

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

## Step 7 — Run the updater

Open a terminal in the `steam` folder and run:

```bash
npm start
```

## Step 8 — Choose polling or one-time mode

### Keep updating

```json
"pollingEnabled": true,
"pollIntervalMs": 300000
```

This refreshes every 5 minutes.

### Run once and exit

```json
"pollingEnabled": false
```

This is useful for:

- manual runs
- cron
- Task Scheduler
- serverless / scheduled runners

## Common setup examples

### Minimal profile

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

### Use relative member since

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Use simplified profile link

```json
{
  "name": "simpleurl",
  "variable": "{{simpleUrl}}"
}
```

### Use the full Steam profile link

```json
{
  "name": "profileurl",
  "variable": "{{profileUrl}}"
}
```

### Show most played game with total hours

```json
{
  "name": "mostplayedgame",
  "variable": "{{mostPlayedGameDisplay}}"
}
```

## Where to find the full variable list

For every supported variable and formatting option, read:

- [README.md](./README.md#variable-reference)

Important sections:

- [Config Reference](./README.md#config-reference)
- [Dynamic Fields](./README.md#dynamic-fields)
- [Variable Reference](./README.md#variable-reference)
- [Common Examples](./README.md#common-examples)

## Troubleshooting

### Nothing updates

Check:

- `applicationId`
- `userId`
- `widgetBotToken`
- `steamApiKey`
- `steamId64`

### The script runs once and exits

Check:

```json
"pollingEnabled": true
```

### An image field is blank

Make sure:

- the field uses `"type": 3`
- the variable resolves to a real image URL
- the widget key on Discord expects an image field

### A text field is blank

Make sure:

- the widget key name matches `name`
- the variable is spelled correctly
- the Steam data actually exists for that account

## Security

Before publishing this project or sharing your config:

1. remove real tokens and keys from `config.json`
2. replace them with placeholders
3. rotate anything that was already exposed

Good public repos should never contain live:

- `widgetBotToken`
- `steamApiKey`
- personal IDs tied to a real private setup

## Recommended repo structure

For a public GitHub repo, it is a good idea to keep:

- `README.md` for the main project page
- `SIMPLE-SETUP.md` for the fastest path
- `WIDGET-SETUP.md` for Discord-side widget mapping
- `ADVANCED-SETUP.md` for full config and variable docs
- `SETUP.MD` for the step-by-step walkthrough
