import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Fix newline encoding issue from .env parsing
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

let app: App;
if (!getApps().length) {
    app = initializeApp({
        credential: cert(firebaseAdminConfig as any),
    });
} else {
    app = getApps()[0];
}

const db: Firestore = getFirestore(app);

async function clearInquiries() {
    console.log("Starting Firebase cleanup using Admin SDK...");
    const ref = db.collection("inquiries");
    const snap = await ref.get();
    let batch = db.batch();
    let count = 0;

    snap.forEach((doc) => {
        batch.delete(doc.ref);
        count++;
    });

    if (count > 0) {
        await batch.commit();
        console.log(`Successfully deleted ${count} documents from the 'inquiries' collection.`);
    } else {
        console.log("No documents found in the 'inquiries' collection.");
    }
}

clearInquiries().catch(console.error).finally(() => process.exit(0));
