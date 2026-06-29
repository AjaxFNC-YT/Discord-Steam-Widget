# Steam Discord Widget

A configurable Node.js script for updating a Discord widget profile with Steam account data.

This project is built for people who want to design their widget in the Discord Developer Portal, then map those widget keys to Steam-derived values in a clean config file.

## Overview

With this script, you:

1. Create or rename keys in your Discord widget profile
2. Choose which Steam values you want to send
3. Map each widget key to a variable in `config.json`
4. Run the updater once, or keep it polling automatically

The script resolves the variables for you and patches the widget profile.

## Highlights

- Config-driven field mapping
- Supports text fields and image fields
- One-time mode or polling mode
- Supports custom formatting with variable strings
- Supports custom widget key names
- Exposes Steam profile links, avatars, counts, playtime, and profile background media
- Backward-compatible with older configs that used `template`

## Requirements

- [Node.js 18+](https://nodejs.org/)
- A [Steam Web API key](https://steamcommunity.com/dev/apikey)
- Your Steam `steamId64`
- A Discord widget setup that provides:
  - `applicationId`
  - `userId`
  - `widgetBotToken`

## Project Files

- [`index.mjs`](./index.mjs) - main updater
- [`config.json`](./config.json) - local configuration
- [`README.md`](./README.md) - full documentation

## Quick Start

### 1. Clone or download the folder

Open a terminal in the `steam` directory.

### 2. Edit `config.json`

Fill in your real values:

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

### 3. Run the script

```bash
npm start
```

## How It Works

The Discord side and the script side are separate:

### Discord side

You set up your widget keys in the Discord Developer Portal.

Examples:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `backgroundimage`
- `avataricon`

### Script side

You map those keys to Steam variables in `config.json`.

Example:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

Example with a custom key:

```json
{
  "name": "mycustomfield",
  "variable": "{{displayName}} | {{steamLevel}}"
}
```

As long as the widget supports the key name, the script can send it.

## Config Reference

### Top-level options

| Key | Type | Description |
| --- | --- | --- |
| `applicationId` | string | Discord application ID |
| `userId` | string | Discord user ID for the widget profile |
| `widgetBotToken` | string | Bot token used to patch the widget profile |
| `steamApiKey` | string | Steam Web API key |
| `steamId64` | string | Steam 64-bit ID |
| `pollingEnabled` | boolean | `true` to keep updating, `false` to run once and exit |
| `pollIntervalMs` | number | Poll interval in milliseconds |
| `usernameTemplate` | string | Widget username format |
| `dynamicFields` | array | List of widget fields to send |

### Polling modes

#### Keep polling

```json
"pollingEnabled": true,
"pollIntervalMs": 300000
```

This updates the widget every 5 minutes.

#### Run once and exit

```json
"pollingEnabled": false
```

This is useful for scheduled tasks, cron jobs, Task Scheduler, or manual refreshes.

## Dynamic Fields

Each entry in `dynamicFields` creates one widget field.

### Field schema

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Widget key name |
| `variable` | string | Yes | Value template to resolve |
| `type` | number | No | `1` for text, `3` for image |
| `enabled` | boolean | No | Set `false` to skip the field |

### Text field example

```json
{
  "name": "membersince",
  "variable": "Member since {{memberSinceYear}}"
}
```

### Image field example

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

### Custom mixed text

```json
{
  "name": "profile",
  "variable": "{{displayName}} • {{simpleUrl}}"
}
```

## Username Formatting

The widget username is controlled by:

```json
"usernameTemplate": "{{displayName}}"
```

Examples:

```json
"usernameTemplate": "{{displayName}}"
```

```json
"usernameTemplate": "{{displayName}} | Level {{steamLevel}}"
```

```json
"usernameTemplate": "{{displayName}} - {{mostPlayedGame}}"
```

## Variable Reference

You can use variables inside `{{doubleBraces}}`.

### Profile text

- `{{displayName}}`
- `{{realName}}`
- `{{profileUrl}}`
- `{{simpleUrl}}`
- `{{personaState}}`
- `{{personaStateCode}}`
- `{{profileState}}`
- `{{communityVisibilityState}}`
- `{{commentPermission}}`
- `{{countryCode}}`
- `{{stateCode}}`
- `{{cityId}}`

### Date and time text

- `{{memberSinceYear}}`
- `{{memberSinceAgo}}`
- `{{memberSinceUnix}}`
- `{{memberSinceIso}}`
- `{{lastLogoffUnix}}`
- `{{lastLogoffIso}}`

### Display-friendly playtime text

- `{{playtimeHoursMinutes}}`
- `{{playtimeHoursOnly}}`
- `{{playtimeHoursDecimal}}`
- `{{playtimePast2WHoursMinutes}}`
- `{{playtimePast2WHoursOnly}}`
- `{{playtimePast2WHoursDecimal}}`

### Most played game text

- `{{mostPlayedGame}}`
- `{{mostPlayedGameDisplay}}`
- `{{mostPlayedGameHoursMinutes}}`
- `{{mostPlayedGameHoursDecimal}}`

### Number-friendly variables

These are usually the easiest choices for number-style fields in the Developer Portal.

- `{{gamesOwned}}`
- `{{gamesOwnedNumber}}`
- `{{friends}}`
- `{{friendsNumber}}`
- `{{steamLevel}}`
- `{{steamLevelNumber}}`
- `{{badgeCount}}`
- `{{badgeCountNumber}}`
- `{{playtimeMinutes}}`
- `{{playtimePast2WMinutes}}`
- `{{mostPlayedGameMinutes}}`
- `{{mostPlayedGameAppId}}`

### Image-link variables

Use these with image fields (`"type": 3`) or anywhere you want a direct media URL.

- `{{avatarSmall}}`
- `{{avatarMedium}}`
- `{{avatarFull}}`
- `{{profileBackgroundImage}}`
- `{{profileBackgroundPoster}}`
- `{{profileBackgroundWebm}}`
- `{{profileBackgroundMp4}}`

## Common Examples

### Show total playtime as `58h 16m`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

### Show total playtime as `58h`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursOnly}}"
}
```

### Show total playtime as `58.3h`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursDecimal}}"
}
```

### Show member since as a year

```json
{
  "name": "membersince",
  "variable": "{{memberSinceYear}}"
}
```

### Show member since as relative text

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Show the normal full Steam profile URL

```json
{
  "name": "profileurl",
  "variable": "{{profileUrl}}"
}
```

### Show the simplified Steam profile URL

```json
{
  "name": "simpleurl",
  "variable": "{{simpleUrl}}"
}
```

### Show most played game with total hours

```json
{
  "name": "mostplayedgame",
  "variable": "{{mostPlayedGameDisplay}}"
}
```

### Use avatar as an image field

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

### Use Steam profile background as an image field

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

## Backward Compatibility

Older configs using:

```json
"template": "{{playtimeHoursMinutes}}"
```

still work.

New configs should use:

```json
"variable": "{{playtimeHoursMinutes}}"
```

## Notes

- Unknown variables resolve to empty text
- Fields default to text unless `type` is set to `3`
- `simpleUrl` removes `https://` and trailing `/`
- `profileUrl` is the full Steam profile link
- Profile background links are scraped from the public Steam profile page when available
- If Steam does not expose a value, the script falls back safely

## Publishing This Publicly

Before pushing to GitHub:

1. Remove all real credentials from `config.json`
2. Replace them with placeholders
3. Rotate any token or API key that was already exposed

Example safe public config:

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
  "dynamicFields": []
}
```

## Troubleshooting

### Nothing updates

- Check `applicationId`
- Check `userId`
- Check `widgetBotToken`
- Check that the widget endpoint is valid

### Steam fields are blank

- Check `steamApiKey`
- Check `steamId64`
- Make sure the profile is exposing the expected data

### It only runs once

- Check `pollingEnabled`

### It does not keep updating

- Check `pollIntervalMs`

### I want a different display format

Use a custom `variable` string in `dynamicFields`.

If the raw value you need is already exposed, you can format it directly in config. If not, add a new variable in [`index.mjs`](./index.mjs) and document it here.

## Useful Links

- [Node.js](https://nodejs.org/)
- [Steam Web API Key Page](https://steamcommunity.com/dev/apikey)
- [Steam Web API Overview](https://developer.valvesoftware.com/wiki/Steam_Web_API)
