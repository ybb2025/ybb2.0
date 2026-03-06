import { initializeApp, cert, getApps, App, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // CRITICAL: Vercel env vars often escape the \n in the private key
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let app: App;

// Validate essential fields exist before initializing
const isConfigValid = !!(serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey);

if (getApps().length === 0) {
    if (isConfigValid) {
        app = initializeApp({
            credential: cert(serviceAccount),
        });
    } else {
        // Log a warning instead of crashing the build if env vars aren't available yet
        console.warn("Firebase Admin: Configuration missing. Initialization skipped.");
        app = {} as App;
    }
} else {
    app = getApps()[0];
}

// Export instances (Defensive defaults if config is missing)
export const db: Firestore = isConfigValid ? getFirestore(app) : ({} as Firestore);
export const auth: Auth = isConfigValid ? getAuth(app) : ({} as Auth);
export default app;

