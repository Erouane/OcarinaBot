import * as admin from "firebase-admin";
import { db } from "./firestore";

const initData = {
	points: 0,
	timesPlayed: 0,
	maxPoints: 0,
	timeouts: 0,
	lastPlayed: 0,
};

export const createDocument = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const documentSnapshot = await ref.get();

	if (!documentSnapshot.exists) {
		await ref.set(initData);
	}
};

export const getLastPlayedDuration = async (username: string) => {
	const currentDate = Date.now();

	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.get();

	return currentDate - res.data()?.lastPlayed;
};

export const updateLastPlayed = async (username: string) => {
	const currentDate = Date.now();

	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.update({
		lastPlayed: currentDate,
	});
};

export const addPoint = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const points = await getPoints(username);
	console.log("points : " + points);
	const maxPoints = await getMaxPoints(username);
	console.log("maxPoints : " + maxPoints);

	if (points === maxPoints) {
		const res = await ref.update({
			points: admin.firestore.FieldValue.increment(1),
			timesPlayed: admin.firestore.FieldValue.increment(1),
			maxPoints: admin.firestore.FieldValue.increment(1),
		});
	} else {
		const res = await ref.update({
			points: admin.firestore.FieldValue.increment(1),
			timesPlayed: admin.firestore.FieldValue.increment(1),
		});
	}
};

export const resetPoints = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.update({
		points: 0,
		timeouts: admin.firestore.FieldValue.increment(1),
	});
};

export const getPoints = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.get();

	return res.data()?.points;
};

export const getMaxPoints = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.get();

	return res.data()?.maxPoints;
};

export const getTimeouts = async (username: string) => {
	const ref = db.collection("rouletteUsers").doc(username);

	const res = await ref.get();

	return res.data()?.timeouts;
};
