# Widget Setup

<p align="center">
  Build the Discord side of the Steam widget with either a simple helper script or a full manual setup.
</p>

<p align="center">
  <a href="./README.md">Home</a> |
  <a href="./SIMPLE-SETUP.md">Simple Setup</a> |
  <a href="./SETUP.MD">Full Setup</a> |
  <a href="./ADVANCED-SETUP.md">Advanced Setup</a> |
  <a href="./TROUBLESHOOTING.md">Troubleshooting</a>
</p>

---

## Table of Contents

- [What this guide is for](#what-this-guide-is-for)
- [Choose a method](#choose-a-method)
- [Method 1 - Simple script setup](#method-1---simple-script-setup)
- [What the simple script creates](#what-the-simple-script-creates)
- [Method 2 - Manual widget setup](#method-2---manual-widget-setup)
- [Part 1 - Create the Discord application](#part-1---create-the-discord-application)
- [Part 2 - Enable widget access](#part-2---enable-widget-access)
- [Part 3 - Open the widget editor](#part-3---open-the-widget-editor)
- [Part 4 - Build the widget layout](#part-4---build-the-widget-layout)
- [Part 5 - Create the Add Widget Preview](#part-5---create-the-add-widget-preview)
- [Part 6 - Save and publish the widget](#part-6---save-and-publish-the-widget)
- [Part 7 - Auth the widget to your account](#part-7---auth-the-widget-to-your-account)
- [Part 8 - Add the widget to your profile](#part-8---add-the-widget-to-your-profile)
- [Base widget field names](#base-widget-field-names)
- [Simple recommended layout](#simple-recommended-layout)
- [Next step](#next-step)

---

## What this guide is for

This guide is only for the Discord side of the setup.

It shows you how to:

- make the Discord application
- enable widget access
- create the widget
- publish it
- auth it to your account
- add it to your profile

The important idea is:

- Discord controls the widget layout
- the Steam script only fills the field names you created there

---

## Choose a method

There are two ways to do this.

### Method 1 - Simple script setup

Use this if you want the fastest path.

It uses the helper script below to:

- create the app
- enable Social SDK
- create a base widget
- publish it
- add it to your profile
- copy a starter PATCH command for issuing the widget identity

### Method 2 - Manual widget setup

Use this if you want to build the widget yourself in the editor and understand every step.

---

## Method 1 - Simple script setup

This is the easiest way to get a base Steam widget made.

### How to use it

1. Open the Discord Developer Portal while logged into your account
2. Open DevTools on that page
3. Open the **Console**
4. Expand the script dropdown below
5. Copy the full script
6. Paste it into the console
7. Run it
8. Solve any captcha or 2FA prompt if Discord asks

### What happens next

The script will:

1. create a new app named `Steam Widget`
2. enable Social SDK for it
3. create a widget named `Steam Profile`
4. build a simple base layout using this repo's field names
5. publish the widget
6. add the widget to your profile
7. reset and show the bot token
8. copy a PowerShell PATCH command to your clipboard
9. open the widget page so you can tweak it

### After the script finishes

Paste the copied PowerShell command into a terminal once.

That creates the starter widget identity with sample values.

Then copy these values into [`config.json`](./config.json):

- `applicationId`
- `userId`
- `widgetBotToken`

You can get:

- `applicationId` from the newly created app
- `userId` from your Discord account
- `widgetBotToken` from the script output or the app's Bot page

### Script used by the simple method

<details>
  <summary>Click to expand the Steam widget setup script</summary>

```js
let wpRequire = webpackChunkdiscord_developers.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_developers.pop();

let ApexStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.createOverride).exports.A;
let UserStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.getCurrentUser).exports.A;
let FluxDispatcher = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.flushWaitQueue).exports.A;
let api = Object.values(wpRequire.c).find(x => x?.exports?.Bo?.get).exports.Bo;
let globalCopy = navigator.userAgent.includes("Firefox") ? navigator.clipboard.writeText.bind(navigator.clipboard) : copy;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const appIconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/3840px-Steam_icon_logo.svg.png";

const userId = UserStore.getCurrentUser().id;
const appName = "Steam Profile";
const widgetName = "Steam Profile";

const starterDynamic = [
  { type: 3, name: "backgroundimage", value: { url: "https://cdn.discordapp.com/embed/avatars/0.png" } },
  { type: 3, name: "avataricon", value: { url: "https://cdn.discordapp.com/embed/avatars/0.png" } },
  { type: 1, name: "mostplayedgame", value: "Most Played Game" },
  { type: 1, name: "playtime", value: "0h 0m" },
  { type: 1, name: "gamesowned", value: "0" },
  { type: 1, name: "friends", value: "0" },
  { type: 1, name: "steamlevel", value: "0" },
  { type: 1, name: "badgecount", value: "0" },
  { type: 1, name: "membersince", value: "2020" },
  { type: 1, name: "playtimepast2w", value: "0h 0m" },
  { type: 1, name: "simpleurl", value: "steamcommunity.com/id/example" }
];

console.log("[Steam Widget Creator] Creating a new app... Please solve the captcha if prompted.");
const appRes = await api.post({ url: "/applications", body: { name: appName, team_id: null } });
FluxDispatcher.dispatch({ type: "APPLICATION_CREATE_SUCCESS", application: appRes.body });
const appId = appRes.body.id;

console.log("[Steam Widget Creator] Uploading the app icon...");
const iconResponse = await fetch(appIconUrl);
const iconBlob = await iconResponse.blob();
const iconBuffer = await iconBlob.arrayBuffer();
const iconBase64 = btoa(String.fromCharCode(...new Uint8Array(iconBuffer)));
const iconDataUri = `data:${iconBlob.type || "image/png"};base64,${iconBase64}`;
await api.patch({ url: `/applications/${appId}`, body: { name: appName, icon: iconDataUri } });

console.log("[Steam Widget Creator] Enabling Social SDK...");
await api.post({
  url: `/applications/${appId}/social-sdk/enable`,
  body: {
    name: "Steam Profile",
    business_email: "example@example.com",
    game_or_studio_name: "Steam Profile",
    game_or_studio_url: "",
    email_updates_consent: false,
    country_or_region: "United States",
    title_role: "Founder",
    target_platforms: [],
    form_type: "Dev Solutions",
    sfdc_leadsource: "Dev Portal",
    utm_campaign: "SDK Enable Form"
  }
});

console.log("[Steam Widget Creator] Creating a new widget...");
const configRes = await api.post({ url: `/applications/${appId}/widget-configs`, body: { display_name: widgetName } });
const configId = configRes.body.config_id;

await api.patch({
  url: `/applications/${appId}/widget-configs/${configId}`,
  body: {
    surfaces: {
      widget_top: {
        layout: "widget_top_hero",
        components: {
          title: {
            fields: {
              text: {
                value_type: "data",
                presentation_type: "text",
                value: "username",
                fallback: {
                  value_type: "custom_string",
                  presentation_type: "text",
                  value: "N/A"
                }
              }
            }
          },
          subtitle_1: {
            fields: {
              text: {
                value_type: "data",
                presentation_type: "text",
                value: "simpleurl",
                fallback: {
                  value_type: "custom_string",
                  presentation_type: "text",
                  value: "steamcommunity.com/you"
                }
              }
            }
          },
          subtitle_2: {
            fields: {
              text: {
                value_type: "data",
                presentation_type: "text",
                value: "mostplayedgame",
                fallback: {
                  value_type: "custom_string",
                  presentation_type: "text",
                  value: "N/A"
                }
              },
              label: {
                value_type: "custom_string",
                presentation_type: "text",
                value: "Most Played"
              }
            }
          },
          subtitle_3: {
            fields: {
              text: {
                value_type: "data",
                presentation_type: "text",
                value: "steamlevel",
                fallback: {
                  value_type: "custom_string",
                  presentation_type: "text",
                  value: "0"
                }
              },
              label: {
                value_type: "custom_string",
                presentation_type: "text",
                value: "Steam Level"
              }
            }
          },
          hero_image: {
            fields: {
              image: {
                value_type: "data",
                presentation_type: "image",
                value: "backgroundimage"
              }
            }
          }
        }
      },
      widget_bottom: {
        layout: "widget_bottom_stats",
        components: {
          stat_1: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "gamesowned", fallback: { value_type: "custom_string", presentation_type: "text", value: "0" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Games Owned" }
            }
          },
          stat_2: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "playtime", fallback: { value_type: "custom_string", presentation_type: "text", value: "0h 0m" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Total Playtime" }
            }
          },
          stat_3: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "friends", fallback: { value_type: "custom_string", presentation_type: "text", value: "0" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Friends" }
            }
          },
          stat_4: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "badgecount", fallback: { value_type: "custom_string", presentation_type: "text", value: "0" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Badges" }
            }
          },
          stat_5: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "playtimepast2w", fallback: { value_type: "custom_string", presentation_type: "text", value: "0" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Past 2 Weeks" }
            }
          },
          stat_6: {
            fields: {
              value: { value_type: "data", presentation_type: "text", value: "membersince", fallback: { value_type: "custom_string", presentation_type: "text", value: "2026" } },
              label: { value_type: "custom_string", presentation_type: "text", value: "Member Since" }
            }
          }
        }
      },
      add_widget_preview: {
        layout: "add_widget_preview_hero",
        components: {
          hero_image: {
            fields: {
              image: {
                presentation_type: "image",
                value_type: "data",
                value: "backgroundimage"
              }
            }
          }
        }
      }
    }
  }
});

await api.post({ url: `/applications/${appId}/widget-configs/${configId}/publish` });

console.log("[Steam Widget Creator] Adding redirect URI and authing the widget...");
await api.patch({ url: `/applications/${appId}`, body: { name: appName, redirect_uris: ["https://discord.com"] } });
await api.post({ url: `/oauth2/authorize?client_id=${appId}&response_type=token&scope=sdk.social_layer_presence`, body: { authorize: true } });

console.log("[Steam Widget Creator] Adding the widget to your profile...");
const profileRes = await api.get({ url: `/users/${userId}/profile` });
const existingWidgets = profileRes.body.widgets || [];
if (!existingWidgets.some(widget => widget?.data?.application_id === appId)) {
  existingWidgets.unshift({ data: { type: "application", application_id: appId } });
  await api.put({ url: `/users/@me/widgets`, body: { widgets: existingWidgets } });
}

console.log("[Steam Widget Creator] Getting the bot token... Please enter your 2FA if prompted.");
const botTokenRes = await api.post({ url: `/applications/${appId}/bot/reset` });
const botToken = botTokenRes.body.token;

const patchCommand = `Invoke-RestMethod -Method PATCH -Headers @{"Content-Type"="application/json"; "Authorization"="Bot ${botToken}"; "User-Agent"="DiscordBot (https://github.com/discord/discord-api-docs, 1.0.0)"} -Uri https://discord.com/api/v9/applications/${appId}/users/${userId}/identities/0/profile -Body '${JSON.stringify({ username: "Steam Profile", data: { dynamic: starterDynamic } })}'`;
globalCopy(patchCommand);

console.log("[Steam Widget Creator] Copied a starter PATCH command to your clipboard.");
console.log("[Steam Widget Creator] Paste it into PowerShell once to create the base identity.");
console.log(`[Steam Widget Creator] App ID: ${appId}`);
console.log(`[Steam Widget Creator] User ID: ${userId}`);
console.log(`[Steam Widget Creator] Bot Token: ${botToken}`);

ApexStore.createOverride("2026-03-widget-config-editor", 1);
document.querySelector(`a[href="/developers/applications/${appId}"]`).click();
while (!document.querySelector(`a[href="/developers/applications/${appId}/widget"]`)) {
  await sleep(100);
}
document.querySelector(`a[href="/developers/applications/${appId}/widget"]`).click();
console.log("[Steam Widget Creator] The widget page should now be open so you can tweak the layout.");
```

</details>

---

## What the simple script creates

The simple method creates a base widget using these fields:

- `backgroundimage`
- `avataricon`
- `mostplayedgame`
- `playtime`
- `gamesowned`
- `friends`
- `steamlevel`
- `badgecount`
- `membersince`
- `playtimepast2w`
- `simpleurl`

That matches the default config in [`config.json`](./config.json).

---

## Method 2 - Manual widget setup

Use this if you want to do it yourself in the editor.

---

## Part 1 - Create the Discord application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Name it something like `Steam Widget`
4. Create the app
5. Copy the **Application ID**
6. Put that value into [`config.json`](./config.json) as `applicationId`

You will also need this app later for:

- the widget editor
- the widget bot token
- adding the widget to your profile

---

## Part 2 - Enable widget access

Widgets use Discord's Social SDK / widget flow.

In your application:

1. Open the app in the Developer Portal
2. Go to the section Discord currently uses for **Social SDK** or widget-related access
3. Fill out the access form if Discord asks for it
4. Submit it

Without widget access, the app may exist but the editor flow will not work properly.

---

## Part 3 - Open the widget editor

Depending on Discord's current rollout, the widget editor may not always be visible by default.

If the editor is already visible in your application sidebar, just open it.

If it is not visible, the current community method is usually:

1. Open your application page in the Developer Portal
2. Open browser DevTools
3. Run the current widget editor enable snippet for the Developer Portal
4. Re-open the application page
5. Open the **Widget** section

If you do not want to deal with that manually, go back to [Method 1 - Simple script setup](#method-1---simple-script-setup).

---

## Part 4 - Build the widget layout

Once the widget editor is open, create the actual widget.

For a simple Steam widget, the easiest structure is:

- a top hero section
- a bottom stats grid
- an add-widget preview

### How the field names work

Every dynamic field in the widget needs a field name.

That field name must match what the updater sends from [`config.json`](./config.json).

Example:

```json
{
  "name": "playtime",
  "variable": "{{playtimeHoursMinutes}}"
}
```

That means the widget must contain a field named `playtime` somewhere in its layout.

### Use these field names

This repo's default config already expects:

- `backgroundimage`
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

You can rename them if you want, but if you do, update `config.json` to match.

### Recommended top section

Use a hero-style top section with:

- **Image** -> `backgroundimage`
- **Title** -> `username`
- **Subtitle 1** -> `simpleurl`
- **Subtitle 2** -> `mostplayedgame`
- **Subtitle 3** -> `steamlevel`

That gives you:

- Steam profile background as the main image
- your widget username as the main title
- profile URL, most played game, and Steam level in the supporting rows

### Recommended bottom stats grid

Use six stat cells:

1. `gamesowned`
2. `playtime`
3. `friends`
4. `badgecount`
5. `playtimepast2w`
6. `membersince`

Good labels for those:

- `Games Owned`
- `Total Playtime`
- `Friends`
- `Badges`
- `Past 2 Weeks`
- `Member Since`

### Optional extra text field

If your chosen layout allows another text field, use:

- `simpleurl`

That gives you the simplified Steam profile link.

---

## Part 5 - Create the Add Widget Preview

The Add Widget Preview is the static card people see before live data loads.

This part is just presentation.

It does not need live Steam data.

For the hero preview layout, keep it simple.

The helper script only uses the preview image component there, because Discord rejects extra text components on that specific preview surface layout.

If you are building it manually, start with just the preview image first, publish it, then only add extra preview fields if your current widget layout clearly supports them.

---

## Part 6 - Save and publish the widget

When the layout looks right:

1. Save the widget
2. Publish it

Publishing matters.

If you skip publishing, the updater can still run but the widget usually will not behave like a finished live widget on your profile.

---

## Part 7 - Auth the widget to your account

After publishing, the widget still needs to be attached to your Discord account.

That usually means:

1. Opening the app's OAuth2 page
2. Using the required widget / social scope for the current widget flow
3. Authorizing the application with your own account

If the app is not authed to your account, the updater may run but nothing useful will appear on your profile.

---

## Part 8 - Add the widget to your profile

After the widget exists and is authed, it still has to be added to your profile.

Depending on Discord's current flow, this is often done through:

- the Discord client
- a community snippet
- an internal client-side widget add flow

If the widget is published and authed but still does not appear on your profile, this is the next thing to check.

---

## Base widget field names

These are the default field names this repo already supports out of the box:

| Widget field name | What it shows |
| --- | --- |
| `backgroundimage` | Steam profile background image URL |
| `playtime` | Total playtime |
| `gamesowned` | Number of owned games |
| `friends` | Number of Steam friends |
| `steamlevel` | Steam level |
| `membersince` | Account creation year or relative age |
| `badgecount` | Badge count |
| `playtimepast2w` | Playtime in the last 2 weeks |
| `mostplayedgame` | Most played game with hours |
| `simpleurl` | Simplified Steam profile URL |
| `avataricon` | Steam avatar image URL |

---

## Simple recommended layout

If you want the easiest clean-looking base widget:

### Top

- image -> `backgroundimage`
- title -> `username`
- subtitle 1 -> `simpleurl`
- subtitle 2 -> `mostplayedgame`
- subtitle 3 -> `steamlevel`

### Bottom

- stat 1 -> `gamesowned`
- stat 2 -> `playtime`
- stat 3 -> `friends`
- stat 4 -> `badgecount`
- stat 5 -> `playtimepast2w`
- stat 6 -> `membersince`

---

## Next step

Once the widget exists and is attached to your profile:

- go to [SETUP.MD](./SETUP.MD) for the full end-to-end guide
- go to [SIMPLE-SETUP.md](./SIMPLE-SETUP.md) for the easier setup path
- go to [ADVANCED-SETUP.md](./ADVANCED-SETUP.md) if you want custom variables and formatting
- go to [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if something is not showing up
