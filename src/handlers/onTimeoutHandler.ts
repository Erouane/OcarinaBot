import { client } from "../clientConfig";

export const onTimeoutHandler = (
	channel: string,
	username: string,
	reason: string,
	duration: number
) => {
	client.say(
		channel,
		`${username} vient de se faire timeout pour ${duration} secondes haha bien fait !`
	);
};
