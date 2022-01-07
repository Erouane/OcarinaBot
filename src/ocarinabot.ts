import { ChatUserstate } from "tmi.js";
import { Timer } from "./utils/timer";

import { client } from "./clientConfig";

import { onTimeoutHandler } from "./handlers/onTimeoutHandler";
import { onConnectedHandler } from "./handlers/onConnectedHandler";
import { onSubscriptionHandler } from "./handlers/onSubscriptionHandler";
import { onMessageHandler } from "./handlers/onMessageHandler";

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on("timeout", onTimeoutHandler);
client.on("subscription", onSubscriptionHandler);
client.on("resub", onSubscriptionHandler);

// Connect to Twitch:
client.connect().catch(console.error);

export const timer = new Timer();
