# Widget Setup

This guide explains the Discord side of the project.

The important idea:

The widget design lives on Discord.

The Steam script only sends values into the keys you decide to use.

## How the widget system works

You have two layers:

### 1. Discord widget keys

These are the names your widget expects.

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

### 2. Steam variable mappings

These live in `config.json`.

Example:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

That means:

- Discord key = `playtime`
- script value = `{{playtimeHoursMinutes}}`

## You can rename keys

You are not locked to the example names.

If your widget uses:

```json
{
  "name": "mycustomfield",
  "variable": "{{displayName}} | {{steamLevel}}"
}
```

the script will send to `mycustomfield` instead.

## Text vs image fields

### Text field

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Image field

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

## Recommended starter keys

If you want a simple clean Steam widget, start with:

- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `membersince`
- `badgecount`
- `playtimepast2w`
- `mostplayedgame`
- `simpleurl`

Optional image fields:

- `avataricon`
- `backgroundimage`

## Next step

Once your widget keys exist, go back to:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md) if you want the easy path
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) if you want full control
