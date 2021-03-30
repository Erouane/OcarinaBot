import * as tmi from "tmi.js";
import * as dotenv from "dotenv";

dotenv.config();

const channels = process.env.CHANNEL_NAME ? [process.env.CHANNEL_NAME] : [];

// Define configuration options
const opts: tmi.Options = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN,
	},
	channels: channels,
};

// Create a client with our options
export const client = tmi.Client(opts);
