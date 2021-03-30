import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const db = admin.firestore();
