# Steam Discord Widget

A configurable Node.js widget updater that pulls data from Steam and patches a Discord widget profile with it.

This project is built for real people, not just developers. If you want a Steam widget on your Discord profile and do not want to hardcode values by hand every time, this gives you a cleaner way to do it:

- design your widget in Discord
- choose the widget key names you want to use
- map those keys to Steam variables in `config.json`
- run the updater once or keep it polling automatically

---

## Table of Contents

- [What This Project Does](#what-this-project-does)
- [Who This Is For](#who-this-is-for)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [How the Mapping System Works](#how-the-mapping-system-works)
- [Supported Field Types](#supported-field-types)
- [Common Use Cases](#common-use-cases)
- [Project Files](#project-files)
- [Security](#security)
- [Useful Links](#useful-links)

---

## What This Project Does

This script reads Steam account/profile data and pushes it into a Discord widget profile.

That includes things like:

- total playtime
- playtime in the past 2 weeks
- game count
- friend count
- Steam level
- badge count
- account age / member since
- most played game
- profile URLs
- avatar image links
- Steam profile background media links

You can send these values as:

- text fields
- number-friendly values
- image URLs for image fields

---

## Who This Is For

This repo is meant for two groups:

### 1. People who just want it working

If you do not really code and just want a clean Steam widget:

- use the simple setup guide
- copy the provided config pattern
- edit a few values
- run the script

### 2. People who want full control

If you want to customize the layout, field names, formatting, image fields, or custom variables:

- use the advanced docs
- edit `dynamicFields`
- map your own widget keys however you want

---

## Features

- Config-driven widget field mapping
- Supports custom widget key names
- Supports text fields and image fields
- Supports simple formatting with variable strings
- Supports one-time mode and polling mode
- Supports Steam profile URLs and simplified URLs
- Supports Steam avatars and profile background links
- Backward-compatible with older configs that used `template`

---

## Quick Start

If you want the shortest path:

1. Read [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
2. Fill out [`config.json`](./config.json)
3. Run:

```bash
npm start
```

If you want to understand the Discord widget side too, read [WIDGET-SETUP.md](./WIDGET-SETUP.md).

If you want the full configuration system, read [ADVANCED-SETUP.md](./ADVANCED-SETUP.md).

---

## Documentation

This repo is split into multiple docs on purpose, so people can go straight to the level they need.

### Start here

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)  
  Best for most people. Fast, clear, minimal setup.

### Widget-side setup

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)  
  Explains how the Discord widget keys relate to the script and how to think about field names.

### Advanced config

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)  
  Full variable reference, formatting options, image fields, number-friendly fields, and custom mappings.

### Quick onboarding

- [SETUP.MD](./SETUP.MD)  
  Step-by-step setup from zero, with examples.

---

## How the Mapping System Works

The script does not force a widget design on you.

Instead:

1. You create widget keys on the Discord side
2. You choose those same key names in `config.json`
3. You attach each key to a Steam variable
4. The script resolves the variable and pushes the result

Example:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

That means:

- widget key name = `playtime`
- Steam variable = `{{playtimeHoursMinutes}}`

The updater handles the rest.

You can also use your own custom key names:

```json
{
  "name": "mycustomfield",
  "variable": "{{displayName}} | {{steamLevel}}"
}
```

As long as your widget supports the key name, the script can send it.

---

## Supported Field Types

### Text fields

Default type:

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Image fields

Set `"type": 3`:

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

Example with Steam background art:

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

---

## Common Use Cases

### Show total Steam playtime

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

### Show playtime in the past 2 weeks

```json
{
  "name": "playtimepast2w",
  "variable": "{{playtimePast2WHoursMinutes}}"
}
```

### Show most played game

```json
{
  "name": "mostplayedgame",
  "variable": "{{mostPlayedGameDisplay}}"
}
```

### Show the full Steam profile link

```json
{
  "name": "profileurl",
  "variable": "{{profileUrl}}"
}
```

### Show the simplified Steam profile link

```json
{
  "name": "simpleurl",
  "variable": "{{simpleUrl}}"
}
```

### Use a number-friendly field

```json
{
  "name": "steamlevel",
  "variable": "{{steamLevelNumber}}"
}
```

### Use an image field

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

---

## Project Files

- [`index.mjs`](./index.mjs) - main updater script
- [`config.json`](./config.json) - local configuration
- [`README.md`](./README.md) - main project page
- [`SETUP.MD`](./SETUP.MD) - step-by-step full setup
- [`SIMPLE-SETUP.md`](./SIMPLE-SETUP.md) - easiest setup path
- [`WIDGET-SETUP.md`](./WIDGET-SETUP.md) - Discord-side widget mapping guide
- [`ADVANCED-SETUP.md`](./ADVANCED-SETUP.md) - advanced config and variable reference

---

## Security

Before publishing or sharing this project:

1. Remove any real values from [`config.json`](./config.json)
2. Replace them with placeholders
3. Rotate anything that was exposed before

Never commit:

- real bot tokens
- real Steam API keys
- real private configuration values

This repo is now set up to use one simple public-safe config format, so keep your local secrets out of version control.

---

## Useful Links

- [Node.js](https://nodejs.org/)
- [Steam Web API Key Page](https://steamcommunity.com/dev/apikey)
- [Steam Web API Overview](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Discord Developer Portal](https://discord.com/developers/applications)

---

## Final Note

If you are brand new to this, start with:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)

If you already understand the basics and want to customize everything, jump to:

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)
