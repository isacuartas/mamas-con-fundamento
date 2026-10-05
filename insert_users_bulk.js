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

// Llenar esta lista con los correos de las clientas que compraron
const emailsToAdd = [
    "juliana.ogonaga@hotmail.com",
];

async function run() {
    console.log(`Iniciando el registro manual de ${emailsToAdd.length} usuarias...`);

    for (const email of emailsToAdd) {
        const emailLower = email.toLowerCase().trim();
        if (!emailLower) continue;

        let userRecord;
        try {
            userRecord = await auth.getUserByEmail(emailLower);
            console.log(`[OK] Usuario ya existe en Auth: ${emailLower} (${userRecord.uid})`);
        } catch (error) {
            try {
                userRecord = await auth.createUser({
                    email: emailLower,
                });
                console.log(`[NUEVO] Usuario creado en Auth: ${emailLower} (${userRecord.uid})`);
            } catch (err) {
                console.error(`[ERROR] No se pudo crear a ${emailLower}:`, err.message);
                continue;
            }
        }

        const userRef = db.collection('users_premium').doc(userRecord.uid);
        await userRef.set({
            email: emailLower,
            hasPremiumAccess: true,
            hotmartTransaction: "MANUAL_RECOVERY",
            purchaseDate: new Date().toISOString(),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`[ÉXITO] Acceso premium otorgado a: ${emailLower}`);
    }

    console.log("\n¡Proceso de recuperación terminado!");
    process.exit(0);
}

run().catch(console.error);
