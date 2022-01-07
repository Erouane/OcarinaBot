import { ChatUserstate } from "tmi.js";
import { client } from "../clientConfig";
import * as commands from "../commands/commands.json";
import { timer } from "../ocarinabot";
import { roulette } from "../roulette";

export const onMessageHandler = async (
	channel: string,
	userstate: ChatUserstate,
	message: string,
	self: boolean
) => {
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
};
