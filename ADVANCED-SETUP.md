# Advanced Setup

This guide covers the deeper configuration system for the Steam Discord Widget.

If you only want the easiest setup, read:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md)

## Contents

- [Top-level config options](#top-level-config-options)
- [Dynamic field schema](#dynamic-field-schema)
- [Username formatting](#username-formatting)
- [Variable reference](#variable-reference)
- [Number-friendly variables](#number-friendly-variables)
- [Image-link variables](#image-link-variables)
- [Formatting examples](#formatting-examples)
- [Image field examples](#image-field-examples)
- [Backward compatibility](#backward-compatibility)

## Top-level config options

| Key | Type | Description |
| --- | --- | --- |
| `applicationId` | string | Discord application ID |
| `userId` | string | Discord user ID for the widget profile |
| `widgetBotToken` | string | Bot token used to patch the widget |
| `steamApiKey` | string | Steam Web API key |
| `steamId64` | string | Numeric Steam ID |
| `pollingEnabled` | boolean | `true` = keep updating, `false` = run once |
| `pollIntervalMs` | number | Polling interval in milliseconds |
| `usernameTemplate` | string | Widget username format |
| `dynamicFields` | array | List of fields to push |

## Dynamic field schema

Each entry in `dynamicFields` supports:

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Widget key name |
| `variable` | string | Yes | Variable string to resolve |
| `type` | number | No | `1` for text, `3` for image |
| `enabled` | boolean | No | If `false`, skip the field |

Example text field:

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

Example image field:

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

Another image field:

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

## Username formatting

The widget username uses:

```json
"usernameTemplate": "{{displayName}}"
```

Examples:

```json
"usernameTemplate": "{{displayName}} | Level {{steamLevel}}"
```

```json
"usernameTemplate": "{{displayName}} - {{mostPlayedGame}}"
```

## Variable reference

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

## Number-friendly variables

These are usually the best choices for number-style fields on the Discord side.

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

## Image-link variables

These are meant for image fields (`"type": 3`) or anywhere you want a direct media URL.

- `{{avatarSmall}}`
- `{{avatarMedium}}`
- `{{avatarFull}}`
- `{{profileBackgroundImage}}`
- `{{profileBackgroundPoster}}`
- `{{profileBackgroundWebm}}`
- `{{profileBackgroundMp4}}`

## Formatting examples

### Total playtime as `58h 16m`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

### Total playtime as `58h`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursOnly}}"
}
```

### Total playtime as `58.3h`

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursDecimal}}"
}
```

### Member since as a year

```json
{
  "name": "membersince",
  "variable": "{{memberSinceYear}}"
}
```

### Member since as relative text

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

### Full profile URL

```json
{
  "name": "profileurl",
  "variable": "{{profileUrl}}"
}
```

### Simplified profile URL

```json
{
  "name": "simpleurl",
  "variable": "{{simpleUrl}}"
}
```

### Most played game with hours

```json
{
  "name": "mostplayedgame",
  "variable": "{{mostPlayedGameDisplay}}"
}
```

## Image field examples

### Avatar

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

### Steam profile background image

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

### Steam profile background video

```json
{
  "name": "backgroundvideo",
  "type": 3,
  "variable": "{{profileBackgroundMp4}}"
}
```

## Backward compatibility

Older configs using:

```json
"template": "{{playtimeHoursMinutes}}"
```

still work.

New configs should use:

```json
"variable": "{{playtimeHoursMinutes}}"
```
