# Steam Discord Widget

<p align="center">
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
  A configurable Node.js script that updates a Discord widget profile with Steam account data.
</p>

<p align="center">
  <a href="./SIMPLE-SETUP.md"><strong>Simple Setup</strong></a>
  ·
  <a href="./SETUP.MD"><strong>Full Setup</strong></a>
  ·
  <a href="./WIDGET-SETUP.md"><strong>Widget Setup</strong></a>
  ·
  <a href="./ADVANCED-SETUP.md"><strong>Advanced Setup</strong></a>
  ·
  <a href="./TROUBLESHOOTING.md"><strong>Troubleshooting</strong></a>
</p>

---

## What it does

This project pulls Steam profile data and patches it into a Discord widget profile.

It can expose things like:

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

You can use those values as:

- text fields
- number-style fields
- image fields

---

## Quick Start

If you want the fastest path:

1. Open [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
2. Fill out [`config.json`](./config.json)
3. Run:

```bash
npm start
```

If you want the full walkthrough instead, go to [SETUP.MD](./SETUP.MD).

---

## Documentation

This repo is split into multiple guides so beginners are not forced through advanced config docs just to get a widget working.

### Start here

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)  
  Fastest setup path for most people.

### Full step-by-step guide

- [SETUP.MD](./SETUP.MD)  
  Full walkthrough from Steam key to running updater.

### Discord-side widget guide

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)  
  Covers widget keys, publishing, authing the widget, and image usage.

### Advanced config guide

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)  
  Covers variables, formatting, image links, number-style values, and custom mappings.

### Troubleshooting guide

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)  
  Common issues, likely causes, and fixes.

---

## How it works

There are two sides to the system:

### Discord side

You create widget keys in your Discord widget profile.

Examples:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `avataricon`
- `backgroundimage`

### Script side

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

---

## Who this is for

### If you do not code much

Use:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)
- [SETUP.MD](./SETUP.MD)

### If you want full control

Use:

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Features

- Config-driven field mapping
- Supports text fields and image fields
- Supports custom widget key names
- Supports one-time mode and polling mode
- Supports formatted variable strings
- Supports Steam profile links and simplified links
- Supports avatar image URLs
- Supports profile background image / video URLs
- Backward-compatible with older `template` configs

---

## Project Files

- [`index.mjs`](./index.mjs) - main updater
- [`config.json`](./config.json) - simple public-safe config template
- [`README.md`](./README.md) - landing page
- [`SIMPLE-SETUP.md`](./SIMPLE-SETUP.md) - easiest setup path
- [`SETUP.MD`](./SETUP.MD) - full setup walkthrough
- [`WIDGET-SETUP.md`](./WIDGET-SETUP.md) - Discord widget-side guide
- [`ADVANCED-SETUP.md`](./ADVANCED-SETUP.md) - advanced config and variable reference
- [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - common problems and fixes

---

## Security

Before publishing or sharing:

1. Keep real secrets out of `config.json`
2. Use placeholder values in the public repo
3. Rotate anything that was previously exposed

Do not commit:

- real `widgetBotToken`
- real `steamApiKey`
- real personal private config values

---

## Useful Links

- [Node.js](https://nodejs.org/)
- [Steam Web API Key Page](https://steamcommunity.com/dev/apikey)
- [Steam Web API Overview](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Discord Developer Portal](https://discord.com/developers/applications)

If you are brand new, start with [SIMPLE-SETUP.md](./SIMPLE-SETUP.md). If you want full control, jump to [ADVANCED-SETUP.md](./ADVANCED-SETUP.md).
