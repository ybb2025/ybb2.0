import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import fs from "fs";

const firebaseAdminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
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

async function checkInquiries() {
    const ref = db.collection("inquiries");
    const snap = await ref.get();

    let results: any[] = [];
    snap.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
    });

    fs.writeFileSync("db-dump.json", JSON.stringify(results, null, 2));
    console.log("Wrote " + results.length + " to db-dump.json");
}

checkInquiries().catch(console.error).finally(() => process.exit(0));
