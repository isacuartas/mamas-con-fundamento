import admin from 'firebase-admin';

// Reemplazar saltos de línea literales por escapados para que la clave privada se analice correctamente
const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : '';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body);
    console.log('Webhook Hotmart Recibido:', payload);

    // Evento de Hotmart para compra aprobada
    const eventType = payload.event;
    
    // Si no es una compra aprobada, ignoramos de forma segura
    if (eventType !== 'PURCHASE_APPROVED') {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Evento ignorado. Solo procesamos PURCHASE_APPROVED.' })
        };
    }

    const { data } = payload;
    const { buyer, purchase } = data;

    const email = buyer.email;
    const name = buyer.name;
    const transactionId = purchase.transaction;

    // 1. Crear el usuario en Firebase Authentication (sin contraseña, ideal para Magic Link)
    let userRecord;
    
    try {
        userRecord = await auth.getUserByEmail(email);
        console.log('El usuario ya existía en Firebase Auth:', userRecord.uid);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            userRecord = await auth.createUser({
                email: email,
                displayName: name,
            });
            console.log('Usuario creado exitosamente:', userRecord.uid);
        } else {
            throw error;
        }
    }

    // 2. Registrar la compra y el acceso premium en Firestore
    const userRef = db.collection('users_premium').doc(userRecord.uid);
    await userRef.set({
        email: email,
        name: name,
        hasPremiumAccess: true,
        hotmartTransaction: transactionId,
        purchaseDate: new Date().toISOString(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario premium guardado. Listo para login por Magic Link.' }),
    };

  } catch (error) {
    console.error('Error procesando webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
