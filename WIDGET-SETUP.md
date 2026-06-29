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
- [Manual profile add fallback](#manual-profile-add-fallback)
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
- the Steam updater script is what actually pushes your live Steam data into the widget

---

## Choose a method

There are two ways to do this.

### Method 1 - Simple script setup

Recommended for most people.

Use this if you want the fastest and easiest path.

It uses the helper script below to:

- create the app
- upload the Steam app icon
- enable Social SDK
- create a base widget
- publish it
- auth the widget flow
- try to add the widget to your profile
- reset the bot token
- copy a ready `config.json` starter with the Discord values already filled in
- open the widget page for final checking

### Method 2 - Manual widget setup

Use this only if you want to build the widget yourself in the editor and control every step manually.

---

## Method 1 - Simple script setup

This is the easiest way to get a base Steam widget made.

This is the recommended setup method for this project.

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

1. create a new app named `Steam Profile`
2. upload the Steam logo as the app icon
3. enable Social SDK for it
4. create a widget named `Steam Profile`
5. build a simple base layout using this repo's field names
6. publish the widget
7. auth the widget flow
8. try to add the widget to your profile
9. reset the widget bot token
10. copy a ready `config.json` starter to your clipboard
11. open the widget page so you can tweak it

### After the script finishes

The helper script copies a starter [`config.json`](./config.json) to your clipboard.

That copied config already includes:

- `applicationId`
- `userId`
- `widgetBotToken`

You only need to replace:

- `steamApiKey`
- `steamId64`

Then run the updater from this repo:

```bash
npm start
```

That step pushes your real Steam data into the widget and finishes the setup.

### Manual profile add fallback

If the helper script creates the app and widget but does not add it to your profile, you can run this fallback snippet manually.

Run it in the Discord Developer Portal console after your widget app has already been created:

```js
let wpRequire = webpackChunkdiscord_developers.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_developers.pop();

let UserStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.getCurrentUser).exports.A;
let api = Object.values(wpRequire.c).find(x => x?.exports?.Bo?.get).exports.Bo;

const appId = "PASTE_YOUR_APPLICATION_ID_HERE";
const userId = UserStore.getCurrentUser().id;

console.log("[Steam Widget Creator] Manually adding the widget to your profile...");
await api.patch({ url: `/applications/${appId}`, body: { redirect_uris: ["https://discord.com"] } });
await api.post({ url: `/oauth2/authorize?client_id=${appId}&response_type=token&scope=sdk.social_layer_presence`, body: { authorize: true } });
const profileRes = await api.get({ url: `/users/${userId}/profile` });
const existingWidgets = profileRes.body.widgets || [];
existingWidgets.unshift({ data: { type: "application", application_id: appId } });
await api.put({ url: `/users/@me/widgets`, body: { widgets: existingWidgets } });
console.log("[Steam Widget Creator] Widget added to your profile.");
```

Replace `PASTE_YOUR_APPLICATION_ID_HERE` with your real application ID first.

### Script used by the simple method

<details>
  <summary>Click to expand the Steam widget setup script</summary>

```js
let wpRequire = webpackChunkdiscord_developers.push([[Symbol()], {}, r => r]);
webpackChunkdiscord_developers.pop();

let UserStore = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.getCurrentUser).exports.A;
let FluxDispatcher = Object.values(wpRequire.c).find(x => x?.exports?.A?.__proto__?.flushWaitQueue).exports.A;
let api = Object.values(wpRequire.c).find(x => x?.exports?.Bo?.get).exports.Bo;
let globalCopy = navigator.userAgent.includes("Firefox") ? navigator.clipboard.writeText.bind(navigator.clipboard) : copy;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const appIconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/3840px-Steam_icon_logo.svg.png";
let _mods = wpRequire.c;
let findByProps = (...props) => {
  for (let mod of Object.values(_mods)) {
    try {
      if (!mod.exports || mod.exports === window) continue;
      if (props.every(prop => mod.exports?.[prop])) return mod.exports;
      for (let key in mod.exports) {
        if (props.every(prop => mod.exports?.[key]?.[prop]) && mod.exports[key][Symbol.toStringTag] !== "IntlMessagesProxy") {
          return mod.exports[key];
        }
      }
    } catch {}
  }
};

const appName = "Steam Profile";
const widgetName = "Steam Profile";
const userId = UserStore.getCurrentUser().id;

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

console.log("[Steam Widget Creator] Adding the widget to your profile...");
let widgetAddedToProfile = false;

try {
  await api.patch({ url: `/applications/${appId}`, body: { redirect_uris: ["https://discord.com"] } });
  await api.post({ url: `/oauth2/authorize?client_id=${appId}&response_type=token&scope=sdk.social_layer_presence`, body: { authorize: true } });
  const profileRes = await api.get({ url: `/users/${userId}/profile` });
  const existingWidgets = profileRes.body.widgets || [];
  existingWidgets.unshift({ data: { type: "application", application_id: appId } });
  await api.put({ url: `/users/@me/widgets`, body: { widgets: existingWidgets } });
  widgetAddedToProfile = true;
} catch (error) {
  console.warn("[Steam Widget Creator] Failed to add the widget to your profile automatically. You may need to add it manually.");
  console.warn(error);
}

console.log("[Steam Widget Creator] Getting the bot token... Please solve 2FA if Discord asks.");
const botTokenRes = await api.post({ url: `/applications/${appId}/bot/reset` });
const botToken = botTokenRes.body.token;

const starterConfig = {
  applicationId: appId,
  userId,
  widgetBotToken: botToken,
  steamApiKey: "YOUR_STEAM_API_KEY",
  steamId64: "YOUR_STEAM_ID64",
  pollingEnabled: true,
  pollIntervalMs: 300000,
  usernameTemplate: "{{displayName}}",
  dynamicFields: [
    { name: "playtime", variable: "{{playtimeHoursMinutes}}" },
    { name: "gamesowned", variable: "{{gamesOwned}}" },
    { name: "friends", variable: "{{friends}}" },
    { name: "steamlevel", variable: "{{steamLevel}}" },
    { name: "membersince", variable: "{{memberSinceYear}}" },
    { name: "badgecount", variable: "{{badgeCount}}" },
    { name: "playtimepast2w", variable: "{{playtimePast2WHoursMinutes}}" },
    { name: "mostplayedgame", variable: "{{mostPlayedGameDisplay}}" },
    { name: "simpleurl", variable: "{{simpleUrl}}" },
    { name: "backgroundimage", type: 3, variable: "{{profileBackgroundImage}}" },
    { name: "avataricon", type: 3, variable: "{{avatarFull}}", enabled: false }
  ]
};

await globalCopy(JSON.stringify(starterConfig, null, 2));

console.log("[Steam Widget Creator] Widget created and published.");
console.log("[Steam Widget Creator] A starter config.json was copied to your clipboard.");
console.log("[Steam Widget Creator] Replace YOUR_STEAM_API_KEY and YOUR_STEAM_ID64, then run npm start.");
if (!widgetAddedToProfile) {
  console.log("[Steam Widget Creator] If the widget is not on your profile yet, add it manually after the page opens.");
}
console.log(`[Steam Widget Creator] App ID: ${appId}`);
console.log(`[Steam Widget Creator] User ID: ${userId}`);
console.log("[Steam Widget Creator] Opening widget editor...");

findByProps("getAll").getAll().find(entry => entry.getName() === "ApexExperimentStore").createOverride("2026-03-widget-config-editor", 1);
document.querySelector(`a[href="/developers/applications/${appId}"]`)?.click();
await sleep(300);
history.pushState({}, "", `/developers/applications/${appId}/widget`);
window.dispatchEvent(new PopStateEvent("popstate"));
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

That matches the default config in [`config.json`](./config.json), and the helper script now copies that starter config for you with the Discord-side values already filled in.

---

## Method 2 - Manual widget setup

Use this if you want to do it yourself in the editor.

---

## Part 1 - Create the Discord application

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Name it something like `Steam Profile`
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

If the helper script logs a `401 Unauthorized` when trying to add the widget automatically, that usually means Discord accepted the app and widget actions but rejected the profile widget write for your current session. In that case, just add the widget manually and continue.

### Open the app in Discord manually

If you want Discord to surface the widget app in the client first, you can run this in the normal `discord.com/app` console or the Discord desktop client console:

```js
const APP_ID = "PASTE_YOUR_APPLICATION_ID_HERE";

let _mods = webpackChunkdiscord_app.push([[Symbol()], {}, e => e.c]);
webpackChunkdiscord_app.pop();
let findByProps = (...props) => {
  for (let mod of Object.values(_mods)) {
    try {
      if (!mod.exports || mod.exports === window) continue;
      if (props.every(prop => mod.exports?.[prop])) return mod.exports;
      for (let key in mod.exports) {
        if (props.every(prop => mod.exports?.[key]?.[prop]) && "IntlMessagesProxy" !== mod.exports[key][Symbol.toStringTag]) {
          return mod.exports[key];
        }
      }
    } catch {}
  }
};

findByProps("getFeaturedApplicationIds").getFeaturedApplicationIds().push(APP_ID);
console.log("[Steam Widget Creator] Added app ID to the Discord app list:", APP_ID);
```

Replace `PASTE_YOUR_APPLICATION_ID_HERE` first, then reload Discord if needed.

After that, run the Node updater from this repo so the widget actually receives your Steam data.

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
<!-- minor refresh -->
