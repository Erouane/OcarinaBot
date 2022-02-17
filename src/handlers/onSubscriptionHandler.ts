import { client } from "../clientConfig";

export const onSubscriptionHandler = (channel: string, username: string) => {
	client.say(
		channel,
		`Merci ${username} pour le sub, ne donnez pas de vrai argent je n'en ai pas besoin ! wanrolLisa `
	);
};
