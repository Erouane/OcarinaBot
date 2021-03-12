import * as tmi from "tmi.js";
import * as dotenv from "dotenv";

dotenv.config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
export const client = tmi.client(opts);
