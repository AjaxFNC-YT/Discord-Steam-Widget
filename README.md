# Steam Discord Widget

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Steam Web API](https://img.shields.io/badge/Steam-Web%20API-171A21?logo=steam&logoColor=white)](https://developer.valvesoftware.com/wiki/Steam_Web_API)
[![Discord Widget](https://img.shields.io/badge/Discord-Widget-5865F2?logo=discord&logoColor=white)](https://discord.com/developers/applications)

A configurable Node.js script that updates a Discord widget profile with Steam account data.

This repo is made for people who want a Steam widget that looks good, is easy to set up, and is still customizable if they want to go deeper later.

## What it does

This project can push Steam data like:

- total playtime
- playtime in the past 2 weeks
- games owned
- friends count
- Steam level
- badge count
- member since
- most played game
- profile links
- avatar URLs
- profile background image / video URLs

You can use those as:

- text fields
- number-style fields
- image fields

## Table of Contents

- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [How It Works](#how-it-works)
- [Who This Is For](#who-this-is-for)
- [Features](#features)
- [Project Files](#project-files)
- [Security](#security)
- [Useful Links](#useful-links)

## Quick Start

If you just want the easiest path:

1. Open [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
2. Fill out [`config.json`](./config.json)
3. Run:

```bash
npm start
```

## Documentation

This repo uses multiple guides on purpose, so beginners do not get slammed by a giant wall of documentation.

### Start here

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)  
  Fastest setup path for most people.

### Full setup guide

- [SETUP.MD](./SETUP.MD)  
  Step-by-step setup, from Steam key to Discord widget patching.

### Discord widget-side guide

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)  
  Covers creating widget keys, publishing, authing the widget, and using image fields.

### Advanced config guide

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)  
  Covers variables, formatting, image links, number-style values, and custom field mappings.

### Troubleshooting guide

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)  
  Common errors, why they happen, and how to fix them.

## How It Works

The system has two sides:

### 1. Discord side

You create widget keys in your Discord widget profile.

Examples:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `avataricon`
- `backgroundimage`

### 2. Script side

In [`config.json`](./config.json), you map those keys to Steam variables.

Example:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

That means:

- widget key name = `playtime`
- value source = `{{playtimeHoursMinutes}}`

The script resolves that variable automatically and pushes it to the widget.

You can also use your own custom key names:

```json
{
  "name": "mycustomfield",
  "variable": "{{displayName}} | {{steamLevel}}"
}
```

## Who This Is For

### If you do not code much

Use:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
- [SETUP.MD](./SETUP.MD)

### If you want more control

Use:

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Features

- Config-driven field mapping
- Supports text and image fields
- Supports custom widget key names
- Supports one-time mode and polling mode
- Supports formatted variable strings
- Supports Steam profile links and simplified links
- Supports avatar image URLs
- Supports profile background image / video URLs
- Backward-compatible with older `template` configs

## Project Files

- [`index.mjs`](./index.mjs) - main updater
- [`config.json`](./config.json) - simple public-safe config template
- [`README.md`](./README.md) - project landing page
- [`SIMPLE-SETUP.md`](./SIMPLE-SETUP.md) - easiest path
- [`SETUP.MD`](./SETUP.MD) - full step-by-step setup
- [`WIDGET-SETUP.md`](./WIDGET-SETUP.md) - Discord widget-side guide
- [`ADVANCED-SETUP.md`](./ADVANCED-SETUP.md) - advanced config + variables
- [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - common problems and fixes

## Security

Before publishing or sharing:

1. Keep real secrets out of `config.json`
2. Use placeholder values in the public repo
3. Rotate anything that was previously exposed

Do not commit:

- real `widgetBotToken`
- real `steamApiKey`
- real personal private config values

## Useful Links

- [Node.js](https://nodejs.org/)
- [Steam Web API Key Page](https://steamcommunity.com/dev/apikey)
- [Steam Web API Overview](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Discord Developer Portal](https://discord.com/developers/applications)

If you are brand new, start with [SIMPLE-SETUP.md](./SIMPLE-SETUP.md). If you want full control, jump to [ADVANCED-SETUP.md](./ADVANCED-SETUP.md).
