# Troubleshooting

This guide lists the most common problems people hit while setting up the Steam Discord Widget.

## Table of Contents

- [Nothing updates at all](#nothing-updates-at-all)
- [The script runs once and exits](#the-script-runs-once-and-exits)
- [Text fields are blank](#text-fields-are-blank)
- [Image fields are blank](#image-fields-are-blank)
- [Steam values look wrong](#steam-values-look-wrong)
- [Widget exists but does not appear on profile](#widget-exists-but-does-not-appear-on-profile)
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
- your account has actually authed / linked the widget flow
- the widget/profile identity is attached to the profile you expect

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

Usually this comes from using the wrong variable for the kind of display you want.

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
- your account has the widget attached / authed correctly
- the updater is targeting the correct application and user IDs

This is usually a Discord-side setup problem, not a Steam API problem.

## Common error causes

### Bad Steam API key

Symptoms:

- Steam values never load
- Steam requests fail

Fix:

- generate a valid key again from:
  - <https://steamcommunity.com/dev/apikey>

### Wrong Steam ID64

Symptoms:

- wrong account data
- missing data

Fix:

- use the full numeric Steam profile ID

### Wrong widget token / wrong app values

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
