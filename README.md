# Steam Discord Widget

<p align="center">
  <a href="https://github.com/AjaxFNC-YT/Discord-Steam-Widget">
    <img src="https://img.shields.io/badge/GitHub-Discord--Steam--Widget-181717?logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" alt="Node.js 18+" />
  </a>
  <a href="https://developer.valvesoftware.com/wiki/Steam_Web_API">
    <img src="https://img.shields.io/badge/Steam-Web%20API-171A21?logo=steam&logoColor=white" alt="Steam Web API" />
  </a>
  <a href="https://discord.com/developers/applications">
    <img src="https://img.shields.io/badge/Discord-Widget-5865F2?logo=discord&logoColor=white" alt="Discord Widget" />
  </a>
</p>

<p align="center">
  Update a Discord widget with live Steam profile data using a simple Node.js config.
</p>

<p align="center">
  <a href="./SIMPLE-SETUP.md">Simple Setup</a> |
  <a href="./SETUP.MD">Full Setup</a> |
  <a href="./WIDGET-SETUP.md">Widget Setup</a> |
  <a href="./ADVANCED-SETUP.md">Advanced Setup</a> |
  <a href="./TROUBLESHOOTING.md">Troubleshooting</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Guides](#guides)
- [What You Can Show](#what-you-can-show)
- [How It Works](#how-it-works)
- [Config Example](#config-example)
- [Project Files](#project-files)
- [Security](#security)
- [Links](#links)

## Overview

This project reads Steam account data, formats it, and sends it into your Discord widget fields.

It is built for people who want:

- a simple config
- custom widget field names
- text fields
- number-style fields
- image fields
- one-time updates or automatic polling

## Quick Start

If you want the shortest path:

1. Follow [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
2. Fill out [`config.json`](./config.json)
3. Run:

```bash
npm install
npm start
```

If you want the full walkthrough, use [SETUP.MD](./SETUP.MD).

## Guides

### Start here

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)  
  Easiest guide for beginners.

### Full walkthrough

- [SETUP.MD](./SETUP.MD)  
  End-to-end setup from Steam key to working widget updates.

### Discord-side setup

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)  
  How to create the widget, publish it, auth it, and choose field names.

### Advanced config

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)  
  Variables, formatting, images, custom field names, and number-ready values.

### Common fixes

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)  
  Common errors and what to do about them.

## What You Can Show

You can map Steam data like:

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
- Steam profile background image or video URLs

## How It Works

There are two parts:

### 1. Discord widget keys

You create field names on the Discord side, like:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `avataricon`
- `backgroundimage`

### 2. Config mappings

In [`config.json`](./config.json), you map those names to variables:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

The script resolves the variable and sends the result to the widget field with that name.

You can also use your own custom key names:

```json
{
  "name": "mycustomfield",
  "variable": "{{displayName}} | Level {{steamLevel}}"
}
```

## Config Example

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
      "name": "mostplayedgame",
      "variable": "{{mostPlayedGameDisplay}}"
    },
    {
      "name": "backgroundimage",
      "type": 3,
      "variable": "{{profileBackgroundImage}}"
    },
    {
      "name": "avataricon",
      "type": 3,
      "variable": "{{avatarFull}}"
    }
  ]
}
```

## Project Files

- [`index.mjs`](./index.mjs) - main updater
- [`config.json`](./config.json) - public-safe starter config
- [`SIMPLE-SETUP.md`](./SIMPLE-SETUP.md) - easier setup guide
- [`SETUP.MD`](./SETUP.MD) - full setup guide
- [`WIDGET-SETUP.md`](./WIDGET-SETUP.md) - Discord widget guide
- [`ADVANCED-SETUP.md`](./ADVANCED-SETUP.md) - config reference
- [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - common fixes

## Security

Before pushing this repo anywhere public:

1. remove real secrets from [`config.json`](./config.json)
2. keep placeholder values in the repo
3. rotate anything that was exposed before

Never commit:

- real `widgetBotToken`
- real `steamApiKey`
- personal private config values

## Links

- [GitHub Repo](https://github.com/AjaxFNC-YT/Discord-Steam-Widget)
- [Node.js 18+](https://nodejs.org/)
- [Steam Web API Key](https://steamcommunity.com/dev/apikey)
- [Steam ID Lookup](https://steamid.io/)
- [Discord Developer Portal](https://discord.com/developers/applications)
