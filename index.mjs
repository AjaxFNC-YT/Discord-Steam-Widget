import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.resolve(SCRIPT_DIR, "config.json");
const config = JSON.parse(await readFile(CONFIG_PATH, "utf8"));

const APPLICATION_ID = String(config.applicationId || "");
const USER_ID = String(config.userId || "");
const WIDGET_BOT_TOKEN = String(config.widgetBotToken || "");
const STEAM_API_KEY = String(config.steamApiKey || "");
const STEAM_ID_64 = String(config.steamId64 || "");
const POLLING_ENABLED = config.pollingEnabled !== false;
const POLL_INTERVAL_MS = Number(config.pollIntervalMs || 90000);
const USERNAME_TEMPLATE = String(config.usernameTemplate || "{{displayName}}");
const DYNAMIC_FIELDS = Array.isArray(config.dynamicFields) ? config.dynamicFields : [];

if (!APPLICATION_ID || !USER_ID || !WIDGET_BOT_TOKEN || !STEAM_API_KEY || !STEAM_ID_64) {
  console.error(`Missing required values in ${CONFIG_PATH}`);
  process.exit(1);
}

let lastSignature = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "User-Agent": "steam-widget-updater/1.0",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}) for ${url}: ${text}`);
  }

  const text = await response.text();
  if (!text.trim()) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function steamApiUrl(interfaceName, methodName, version, params) {
  const url = new URL(`https://api.steampowered.com/${interfaceName}/${methodName}/${version}/`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function fetchSteamSnapshot() {
  const summariesUrl = steamApiUrl("ISteamUser", "GetPlayerSummaries", "v0002", {
    key: STEAM_API_KEY,
    steamids: STEAM_ID_64,
  });
  const friendsUrl = steamApiUrl("ISteamUser", "GetFriendList", "v0001", {
    key: STEAM_API_KEY,
    steamid: STEAM_ID_64,
    relationship: "friend",
  });
  const ownedGamesUrl = steamApiUrl("IPlayerService", "GetOwnedGames", "v0001", {
    key: STEAM_API_KEY,
    steamid: STEAM_ID_64,
    include_played_free_games: 1,
    include_appinfo: 1,
  });
  const levelUrl = steamApiUrl("IPlayerService", "GetSteamLevel", "v0001", {
    key: STEAM_API_KEY,
    steamid: STEAM_ID_64,
  });
  const badgesUrl = steamApiUrl("IPlayerService", "GetBadges", "v0001", {
    key: STEAM_API_KEY,
    steamid: STEAM_ID_64,
  });

  const [summaries, friends, ownedGames, level, badges] = await Promise.all([
    fetchJson(summariesUrl),
    fetchJson(friendsUrl),
    fetchJson(ownedGamesUrl),
    fetchJson(levelUrl),
    fetchJson(badgesUrl),
  ]);

  const player = summaries?.response?.players?.[0] || {};
  const profileUrl = String(player.profileurl || `https://steamcommunity.com/profiles/${STEAM_ID_64}`);
  const profilePageHtml = await fetch(profileUrl, {
    headers: {
      Accept: "text/html",
      "User-Agent": "steam-widget-updater/1.0",
    },
  }).then(async (response) => {
    if (!response.ok) {
      return "";
    }
    return response.text();
  }).catch(() => "");

  return { summaries, friends, ownedGames, level, badges, profilePageHtml };
}

function formatHoursMinutes(minutes) {
  const totalMinutes = Number(minutes || 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins}m`;
}

function formatHoursOnly(minutes) {
  const totalMinutes = Number(minutes || 0);
  return `${Math.floor(totalMinutes / 60)}h`;
}

function formatHoursDecimal(minutes) {
  const totalMinutes = Number(minutes || 0);
  return `${(totalMinutes / 60).toFixed(1)}h`;
}

function formatMemberSinceYear(unixSeconds) {
  const timestamp = Number(unixSeconds || 0);
  if (!timestamp) {
    return "Unknown";
  }
  return String(new Date(timestamp * 1000).getUTCFullYear());
}

function formatMemberSinceAgo(unixSeconds) {
  const timestamp = Number(unixSeconds || 0);
  if (!timestamp) {
    return "Unknown";
  }

  const created = new Date(timestamp * 1000);
  const now = new Date();
  let years = now.getUTCFullYear() - created.getUTCFullYear();
  const monthDelta = now.getUTCMonth() - created.getUTCMonth();
  const dayDelta = now.getUTCDate() - created.getUTCDate();
  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    years -= 1;
  }

  if (years <= 0) {
    return "Less than 1 year ago";
  }
  if (years === 1) {
    return "1 year ago";
  }
  return `${years} years ago`;
}

function toSimpleUrl(profileUrl) {
  return String(profileUrl || "")
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/g, "");
}

function extractFirstMatch(text, regex) {
  const match = String(text || "").match(regex);
  return match?.[1] || "";
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function steamStateLabel(personaState) {
  const labels = {
    0: "Offline",
    1: "Online",
    2: "Busy",
    3: "Away",
    4: "Snooze",
    5: "Looking to trade",
    6: "Looking to play",
  };
  return labels[Number(personaState)] || "Unknown";
}

function unixToIso(unixSeconds) {
  const timestamp = Number(unixSeconds || 0);
  if (!timestamp) {
    return "";
  }
  return new Date(timestamp * 1000).toISOString();
}

function buildContext(snapshot) {
  const player = snapshot.summaries?.response?.players?.[0] || {};
  const friends = Array.isArray(snapshot.friends?.friendslist?.friends) ? snapshot.friends.friendslist.friends : [];
  const ownedGamesResponse = snapshot.ownedGames?.response || {};
  const ownedGames = Array.isArray(ownedGamesResponse.games) ? ownedGamesResponse.games : [];
  const badgesResponse = snapshot.badges?.response || {};
  const badges = Array.isArray(badgesResponse.badges) ? badgesResponse.badges : [];
  const steamLevel = Number(snapshot.level?.response?.player_level || 0);

  const totalMinutes = ownedGames.reduce((sum, game) => sum + Number(game?.playtime_forever || 0), 0);
  const totalMinutesPast2W = ownedGames.reduce((sum, game) => sum + Number(game?.playtime_2weeks || 0), 0);
  const mostPlayedGame = [...ownedGames].sort(
    (a, b) => Number(b?.playtime_forever || 0) - Number(a?.playtime_forever || 0),
  )[0];

  const badgeCount =
    typeof badges.length === "number"
      ? badges.length
      : Number(badgesResponse.player_level || 0);
  const profilePageHtml = String(snapshot.profilePageHtml || "");
  const backgroundPoster = decodeHtml(
    extractFirstMatch(profilePageHtml, /<video[^>]*poster="([^"]+)"/i),
  );
  const backgroundWebm = decodeHtml(
    extractFirstMatch(profilePageHtml, /<source[^>]*src="([^"]+\.webm[^"]*)"[^>]*type="video\/webm"/i),
  );
  const backgroundMp4 = decodeHtml(
    extractFirstMatch(profilePageHtml, /<source[^>]*src="([^"]+\.mp4[^"]*)"[^>]*type="video\/mp4"/i),
  );

  return {
    steamId64: STEAM_ID_64,
    displayName: String(player.personaname || STEAM_ID_64),
    realName: String(player.realname || ""),
    profileUrl: String(player.profileurl || ""),
    simpleUrl: toSimpleUrl(player.profileurl),
    avatarSmall: String(player.avatar || ""),
    avatarMedium: String(player.avatarmedium || ""),
    avatarFull: String(player.avatarfull || ""),
    profileBackgroundImage: backgroundPoster,
    profileBackgroundPoster: backgroundPoster,
    profileBackgroundWebm: backgroundWebm,
    profileBackgroundMp4: backgroundMp4,
    personaStateCode: String(Number(player.personastate ?? 0)),
    personaState: steamStateLabel(player.personastate),
    profileState: String(Number(player.profilestate ?? 0)),
    communityVisibilityState: String(Number(player.communityvisibilitystate ?? 0)),
    commentPermission: String(Number(player.commentpermission ?? 0)),
    countryCode: String(player.loccountrycode || ""),
    stateCode: String(player.locstatecode || ""),
    cityId: String(player.loccityid || ""),
    memberSinceYear: formatMemberSinceYear(player.timecreated),
    memberSinceAgo: formatMemberSinceAgo(player.timecreated),
    memberSinceUnix: String(Number(player.timecreated || 0)),
    memberSinceIso: unixToIso(player.timecreated),
    lastLogoffUnix: String(Number(player.lastlogoff || 0)),
    lastLogoffIso: unixToIso(player.lastlogoff),
    gamesOwned: String(ownedGamesResponse.game_count || ownedGames.length || 0),
    gamesOwnedNumber: String(Number(ownedGamesResponse.game_count || ownedGames.length || 0)),
    friends: String(friends.length),
    friendsNumber: String(friends.length),
    steamLevel: String(steamLevel),
    steamLevelNumber: String(steamLevel),
    badgeCount: String(badgeCount),
    badgeCountNumber: String(badgeCount),
    playtimeMinutes: String(totalMinutes),
    playtimeHoursMinutes: formatHoursMinutes(totalMinutes),
    playtimeHoursOnly: formatHoursOnly(totalMinutes),
    playtimeHoursDecimal: formatHoursDecimal(totalMinutes),
    playtimePast2WMinutes: String(totalMinutesPast2W),
    playtimePast2WHoursMinutes: formatHoursMinutes(totalMinutesPast2W),
    playtimePast2WHoursOnly: formatHoursOnly(totalMinutesPast2W),
    playtimePast2WHoursDecimal: formatHoursDecimal(totalMinutesPast2W),
    mostPlayedGame: String(mostPlayedGame?.name || "Unknown"),
    mostPlayedGameAppId: String(mostPlayedGame?.appid || ""),
    mostPlayedGameMinutes: String(Number(mostPlayedGame?.playtime_forever || 0)),
    mostPlayedGameHoursDecimal: formatHoursDecimal(mostPlayedGame?.playtime_forever || 0),
    mostPlayedGameHoursMinutes: formatHoursMinutes(mostPlayedGame?.playtime_forever || 0),
    mostPlayedGameDisplay: mostPlayedGame?.name
      ? `${mostPlayedGame.name} (${formatHoursDecimal(mostPlayedGame.playtime_forever)})`
      : "Unknown",
  };
}

function renderTemplate(template, context) {
  return String(template || "").replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key) => {
    return Object.prototype.hasOwnProperty.call(context, key) ? String(context[key] ?? "") : "";
  });
}

function dynamicText(name, value) {
  return {
    type: 1,
    name,
    value: String(value),
  };
}

function dynamicImage(name, url) {
  return {
    type: 3,
    name,
    value: {
      url: String(url),
    },
  };
}

function buildDynamicFields(context) {
  if (DYNAMIC_FIELDS.length === 0) {
    return [
      dynamicText("playtime", context.playtimeHoursMinutes),
      dynamicText("gamesowned", context.gamesOwned),
      dynamicText("friends", context.friends),
      dynamicText("steamlevel", context.steamLevel),
      dynamicText("membersince", context.memberSinceYear),
      dynamicText("badgecount", context.badgeCount),
      dynamicText("playtimepast2w", context.playtimePast2WHoursMinutes),
      dynamicText("mostplayedgame", context.mostPlayedGameDisplay),
      dynamicText("simpleurl", context.simpleUrl),
    ];
  }

  return DYNAMIC_FIELDS
    .filter((field) => field && field.enabled !== false && field.name)
    .map((field) => {
      const variable = field.variable ?? field.template ?? "";
      const rendered = renderTemplate(variable, context);
      const fieldType = Number(field.type || 1);
      return fieldType === 3
        ? dynamicImage(field.name, rendered)
        : dynamicText(field.name, rendered);
    })
    .filter((field) => {
      if (field.type === 3) {
        return Boolean(field.value?.url);
      }
      return true;
    });
}

function buildWidgetPayload(context) {
  return {
    data: {
      dynamic: buildDynamicFields(context),
    },
    username: renderTemplate(USERNAME_TEMPLATE, context),
  };
}

async function patchWidget(payload) {
  const url = `https://discord.com/api/v9/applications/${APPLICATION_ID}/users/${USER_ID}/identities/0/profile`;
  return fetchJson(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bot ${WIDGET_BOT_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "DiscordBot",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function updateWidget() {
  const snapshot = await fetchSteamSnapshot();
  const context = buildContext(snapshot);
  const payload = buildWidgetPayload(context);
  const signature = JSON.stringify(payload);

  if (signature === lastSignature) {
    console.log(`[${new Date().toISOString()}] No widget change; skipping patch.`);
    return;
  }

  await patchWidget(payload);
  lastSignature = signature;
  console.log(
    `[${new Date().toISOString()}] Widget updated: ${payload.username} | ${context.playtimeHoursMinutes} | ${context.gamesOwned} games`,
  );
}

async function runLoop() {
  try {
    await updateWidget();
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Widget update failed:`, error);
  }

  if (!POLLING_ENABLED) {
    console.log(`[${new Date().toISOString()}] One-time mode complete; exiting.`);
    return;
  }

  while (true) {
    await sleep(POLL_INTERVAL_MS);
    try {
      await updateWidget();
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Widget update failed:`, error);
    }
  }
}

await runLoop();
// Minor refresh.
