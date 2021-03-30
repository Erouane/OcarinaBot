import * as tmi from "tmi.js";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

console.log(process.env.BOT_USERNAME);

// Define configuration options
const opts = {
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
export const client = tmi.Client(opts);
