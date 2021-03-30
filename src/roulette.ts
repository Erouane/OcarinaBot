import { client } from "./clientConfig";
import {
	addPoint,
	createDocument,
	getLastPlayedDuration,
	getMaxPoints,
	getPoints,
	getTimeouts,
	resetPoints,
	updateLastPlayed,
} from "./database/roulette";
import { randomFloat } from "./utils/randomFloat";

export const roulette = async (channel: string, username: string) => {
	await createDocument(username);

	const rouletteDelay = 1000 * 60 * 10;

	const lastPlayedDuration = await getLastPlayedDuration(username);

	console.log(lastPlayedDuration);

	if (lastPlayedDuration > rouletteDelay) {
		await updateLastPlayed(username);

		const points = await getPoints(username);

		if (rouletteWin(points)) {
			await addPoint(username);
			const pointsUpdated = await getPoints(username);
			const maxPointsUpdated = await getMaxPoints(username);
			const timeoutsUpdated = await getTimeouts(username);
			client.say(
				channel,
				`${username} a ${pointsUpdated} points ! Maximum : ${maxPointsUpdated} nombre de tos : ${timeoutsUpdated}`
			);
		} else {
			client.say(channel, `/timeout ${username} ${rouletteTimeout(points)}`);
			await resetPoints(username);
			client.say(channel, `mdr victime ${username} retombe à 0 points`);
		}
	} else {
		const minutesLeftWaiting =
			Math.floor((rouletteDelay - lastPlayedDuration) / 1000 / 60) + 1;
		client.say(
			channel,
			`${username} tu dois encore attendre ${minutesLeftWaiting} minutes avant de rejouer`
		);
	}
};

const rouletteTimeout = (points: number) => {
	const time = Math.floor(points > 20 ? 86400 : 60 * Math.exp(points * 0.3636));
	return time;
};

const rouletteWin = (points: number) => {
	const probability = points > 20 ? 50 : 5 * Math.exp(0.115 * points);

	console.log("probabilité : " + probability);

	const randomFLoat = randomFloat(0, 100);

	console.log("random : " + randomFLoat);

	if (randomFLoat < probability) {
		return false;
	}
	return true;
};
