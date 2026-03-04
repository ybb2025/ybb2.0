import * as admin from "firebase-admin";

// Prevent multiple initializations in dev (Next.js hot reload)
const app =
    admin.apps.length > 0
        ? admin.apps[0]!
        : admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Replace escaped newlines so the key is valid
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        });

export const db = admin.firestore(app);
export const auth = admin.auth(app);
export default app;
