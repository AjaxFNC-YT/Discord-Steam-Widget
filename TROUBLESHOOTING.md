# Troubleshooting

This guide covers the most common problems people hit while setting up the Steam Discord Widget.

## Table of Contents

- [Nothing updates at all](#nothing-updates-at-all)
- [The script runs once and exits](#the-script-runs-once-and-exits)
- [Text fields are blank](#text-fields-are-blank)
- [Image fields are blank](#image-fields-are-blank)
- [Steam values look wrong](#steam-values-look-wrong)
- [Widget exists but does not appear on profile](#widget-exists-but-does-not-appear-on-profile)
- [Automatic profile add says 401 Unauthorized](#automatic-profile-add-says-401-unauthorized)
- [This Application Is Still Syncing](#this-application-is-still-syncing)
- [Common error causes](#common-error-causes)

## Nothing updates at all

Check:

- `applicationId`
- `userId`
- `widgetBotToken`
- `steamApiKey`
- `steamId64`

Also make sure:

- the widget has been created
- the widget has been published
- your account has actually authed the widget flow
- the widget was added to the correct Discord profile

Read:

- [WIDGET-SETUP.md](./WIDGET-SETUP.md)
- [SETUP.MD](./SETUP.MD)

## The script runs once and exits

Check:

```json
"pollingEnabled": true
```

If it is `false`, that is expected behavior.

## Text fields are blank

Make sure:

- the widget key name matches `name`
- the `variable` is spelled correctly
- the Steam value you are trying to use actually exists

Example:

```json
{
  "name": "membersince",
  "variable": "{{memberSinceAgo}}"
}
```

If `name` does not match the widget key on the Discord side, the field will not fill.

## Image fields are blank

Make sure:

- the field uses `"type": 3`
- the variable resolves to an actual image URL
- the widget key is meant to be an image field

Example:

```json
{
  "name": "avataricon",
  "type": 3,
  "variable": "{{avatarFull}}"
}
```

## Steam values look wrong

Usually this means you picked the wrong variable for the display style you want.

Examples:

- use `{{playtimeHoursMinutes}}` for `58h 16m`
- use `{{playtimeHoursOnly}}` for `58h`
- use `{{playtimeHoursDecimal}}` for `58.3h`
- use `{{memberSinceYear}}` for `2020`
- use `{{memberSinceAgo}}` for `6 years ago`

Read:

- [ADVANCED-SETUP.md](./ADVANCED-SETUP.md)

## Widget exists but does not appear on profile

Make sure:

- the widget was created on the Discord side
- the widget was published
- your account has the widget attached and authed correctly
- the updater is targeting the correct application and user IDs

This is usually a Discord-side setup problem, not a Steam API problem.

## Automatic profile add says 401 Unauthorized

If the helper script fails on:

```text
PUT /users/@me/widgets
401 Unauthorized
```

that does not usually mean the whole widget setup failed.

It usually means:

- the app was created successfully
- the widget was created successfully
- the publish/auth steps worked
- Discord rejected the automatic profile widget write for your current session

What to do:

1. keep the generated app and widget
2. use the copied `config.json` starter
3. run `npm start`
4. add the widget to your profile manually in Discord if it did not appear automatically

The helper script now continues even if this specific auto-add step fails.

Common causes:

1. your profile board still references a widget from an app you deleted
2. you do not own the application you are trying to save to your profile
3. your account is not in Discord's widget rollout / experiment

If you deleted an older widget app, clear the profile board first in the normal Discord client console:

```js
let wpRequire = webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_app.pop();
let api = Object.values(wpRequire.c).find(x => x?.exports?.Bo?.get).exports.Bo;
api.put({url: `/users/@me/widgets`, body: {widgets: []}})
```

## This Application Is Still Syncing

If the widget shows `This Application Is Still Syncing`, the setup usually is not fully finished yet.

Most often, this means:

- the widget exists but the updater has not pushed real Steam data yet
- the app or widget was set up on the wrong application
- the widget auth or profile attachment flow was not completed correctly

Fix:

1. make sure the widget was created and published correctly
2. make sure the app is authed to your account
3. paste the copied starter into [`config.json`](./config.json)
4. add your Steam values
5. run the updater:

```bash
npm start
```

The updater is what finishes widget setup by pushing your real Steam data into the widget profile identity.

If it still happens after that, re-check:

- `applicationId`
- `userId`
- `widgetBotToken`
- that the widget was created on the same app you put in `config.json`
- that you copied the newest config if you recreated the widget app or reset the bot token

## Common error causes

### Bad Steam API key

Symptoms:

- Steam values never load
- Steam requests fail

Fix:

- generate a valid key again from <https://steamcommunity.com/dev/apikey>

### Wrong Steam ID64

Symptoms:

- wrong account data
- missing data

Fix:

- use the full numeric Steam profile ID

### Wrong widget token or wrong app values

Symptoms:

- script runs but widget does not update

Fix:

- re-check `applicationId`
- re-check `userId`
- re-check `widgetBotToken`

### Wrong field type

Symptoms:

- image keys do not render
- text keys behave strangely

Fix:

- use text fields normally
- use `"type": 3` for image fields only
