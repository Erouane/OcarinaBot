import { ChatUserstate } from "tmi.js";
import {
  discordLink,
  opgg2Link,
  opggLink,
  youtubeLInk,
  youtubeSecondLink,
} from "./data/links";
import { Timer } from "./utils/timer";
import { roulette } from "./roulette";
import { client } from "./clientConfig";

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on("timeout", onTimeoutHandler);

// Connect to Twitch:
client.connect();

const timer = new Timer();

// Called every time a message comes in
async function onMessageHandler(
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = message.trim();

  // If the command is known, let's execute it

  const reseaux = `Suis-moi sur mes réseaux ! chaîne youtube avec Flrt : ${youtubeLInk} chaîne secondaire : ${youtubeSecondLink} discord : ${discordLink}`;

  const discord = `Informations sur les streams, conseils en code, coaching sur LoL : n'attends plus un minute et rejoins mon discord ${discordLink}`;

  if (timer.isTimerElapsed()) {
    client.say(channel, discord);
  }

  switch (commandName) {
    case "!youtube":
      client.say(
        channel,
        `Suis ma chaîne youtube avec Flrt : ${youtubeLInk} ainsi que notre chaîne de VODs : ${youtubeSecondLink}`
      );
      break;
    case "!reseaux":
      client.say(channel, reseaux);
      break;
    case "!discord":
      client.say(channel, discord);
      break;
    case "!opgg":
      client.say(channel, `main : ${opggLink} smurf : ${opgg2Link}`);
      break;
    case "!roulette":
      roulette(channel, userstate.username);
      break;
    default:
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function onTimeoutHandler(
  channel: string,
  username: string,
  reason: string,
  duration: number
) {
  client.say(
    channel,
    `${username} vient de se faire timeout pour ${duration} secondes haha bien fait !`
  );
}
