import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Read .env.local manually
const envPath = path.resolve('.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let key = match[1];
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        env[key] = value;
    }
});

const privateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "minsa-gestante-app",
            clientEmail: env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

const db = admin.firestore();
const auth = admin.auth();

async function run() {
    const email = "tatiana.erazom@hotmail.com";
    const name = "Tatiana Erazo";
    
    let userRecord;
    try {
        userRecord = await auth.getUserByEmail(email);
        console.log('User already exists in Auth:', userRecord.uid);
    } catch (error) {
        userRecord = await auth.createUser({
            email: email,
            displayName: name,
        });
        console.log('Created user in Auth:', userRecord.uid);
    }

    const userRef = db.collection('users_premium').doc(userRecord.uid);
    await userRef.set({
        email: email,
        name: name,
        hasPremiumAccess: true,
        hotmartTransaction: "TEST_HOTMART_LOCAL",
        purchaseDate: new Date().toISOString(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log("Successfully added user to users_premium!");
    process.exit(0);
}

run().catch(console.error);
