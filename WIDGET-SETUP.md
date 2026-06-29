# Widget Setup

This guide explains the Discord side of the project.

## Table of Contents

- [What this guide covers](#what-this-guide-covers)
- [Create the Discord application](#create-the-discord-application)
- [Enable widget access](#enable-widget-access)
- [Create and publish the widget](#create-and-publish-the-widget)
- [Auth the widget to your account](#auth-the-widget-to-your-account)
- [How the widget system works](#how-the-widget-system-works)
- [You can rename keys](#you-can-rename-keys)
- [Text vs image fields](#text-vs-image-fields)
- [Recommended starter keys](#recommended-starter-keys)
- [Image ideas](#image-ideas)
- [Next step](#next-step)

The important idea:

The widget design lives on Discord.

The Steam script only sends values into the keys you decide to use.

## What this guide covers

This guide is about the Discord side only:

- making the app
- enabling widget access
- creating widget keys
- publishing the widget
- making sure your account is actually authed to use it

## Create the Discord application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Copy the `applicationId`
4. Put that into [`config.json`](./config.json)

You will also need your `userId` and the widget bot token for the script.

## Enable widget access

If your app needs the widget flow unlocked, do that before expecting anything to render correctly in the profile widget flow.

If you are following a current widget method from the Discord widget community/dev server, make sure:

- the widget editor access is enabled for the app
- the widget renderer is enabled where needed
- your application is using the current widget flow

## Create and publish the widget

Make sure your widget is actually created and published on the Discord side.

That means:

- create the widget layout
- add the field names you want to use
- save your changes
- publish the widget

If it is not published, the updater may push data but you still will not see a usable result on the profile.

## Auth the widget to your account

The widget also needs to be linked/authed to the account that will display it.

Depending on the method you are using, this usually means:

- authorizing the application for your account
- making sure the widget/profile identity exists
- making sure the widget is actually attached to your profile

If the updater is running but nothing appears, this is one of the first things to re-check.

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

## Image ideas

If you are making image fields in the widget, the script can provide things like:

- `{{avatarSmall}}`
- `{{avatarMedium}}`
- `{{avatarFull}}`
- `{{profileBackgroundImage}}`
- `{{profileBackgroundPoster}}`
- `{{profileBackgroundWebm}}`
- `{{profileBackgroundMp4}}`

Example image field:

```json
{
  "name": "backgroundimage",
  "type": 3,
  "variable": "{{profileBackgroundImage}}"
}
```

## Next step

Once your widget keys exist, go back to:

- [SIMPLE-SETUP.md](./SIMPLE-SETUP.md) if you want the easy path
- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) if you want full control
