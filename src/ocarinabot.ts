import { ChatUserstate } from "tmi.js";
import { Timer } from "./utils/timer";
import { roulette } from "./roulette";
import { client } from "./clientConfig";
import * as commands from "./data/commands.json";

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on("timeout", onTimeoutHandler);

// Connect to Twitch:
client.connect().catch(console.error);

const timer = new Timer();

// Called every time a message comes in
async function onMessageHandler(
	channel: string,
	userstate: ChatUserstate,
	message: string,
	self: boolean
) {
	// Ignore messages from the bot
	if (self) {
		return;
	}

	// Remove whitespace from chat message
	const commandName = message.trim();

	// If the command is known, let's execute it

	const commandsList = commands.commands;

	if (timer.isTimerElapsed()) {
		client.say(channel, commandsList[0]["content"]);
	}

	for (let key in commandsList) {
		if (commandName === commandsList[key]["command"]) {
			client.say(channel, commandsList[key]["content"]);
		}
	}

	switch (commandName) {
		case "!roulette":
			if (userstate.username) {
				roulette(channel, userstate.username);
			}
			break;
		default:
			break;
	}
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: any, port: any) {
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
