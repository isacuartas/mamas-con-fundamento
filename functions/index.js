const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// ─── CREDENCIALES MERCADO PAGO ───────────────────────────────────────────────
const MP_ACCESS_TOKEN = "APP_USR-619498063025356-080610-3369129f800291f9894a5752bc725fb3-247242922";
const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });

// ─── 1. CREAR PREFERENCIA DE PAGO ───────────────────────────────────────────
// Esta función genera el link de pago de MercadoPago con redirect automático a la app
exports.crearPago = onRequest({ cors: true }, async (request, response) => {
    if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [{
                    title: "Mamás con Fundamento: El Método para Nutrir tu Embarazo y monitorear tu peso",
                    quantity: 1,
                    unit_price: 89900,
                    currency_id: "COP",
                }],
                back_urls: {
                    success: "https://mamasconfundamento.netlify.app/login?pago=exitoso",
                    failure: "https://mamasconfundamento.netlify.app/login?pago=fallido",
                    pending: "https://mamasconfundamento.netlify.app/login?pago=pendiente",
                },
                auto_return: "approved",
                notification_url: "https://mercadopagowwebhook-g4xj4xnreq-uc.a.run.app",
                statement_descriptor: "Mamás con Fundamento",
            }
        });

        response.status(200).json({ checkoutUrl: result.init_point });
    } catch (error) {
        console.error("Error creando preferencia:", error);
        response.status(500).json({ error: error.message });
    }
});

// ─── 2. WEBHOOK DE MERCADO PAGO ──────────────────────────────────────────────
// Esta función recibe la notificación de MercadoPago cuando alguien paga
exports.mercadopagoWebhook = onRequest(async (request, response) => {
    console.log("Webhook MercadoPago recibido:", JSON.stringify(request.body));

    try {
        const { type, data } = request.body;

        // Solo procesamos pagos aprobados
        if (type !== "payment") {
            response.status(200).send("Evento ignorado");
            return;
        }

        const paymentId = data?.id;
        if (!paymentId) {
            response.status(200).send("Sin ID de pago");
            return;
        }

        // Consultar detalles del pago a MercadoPago
        const payment = new Payment(client);
        const paymentData = await payment.get({ id: paymentId });

        console.log("Datos del pago:", JSON.stringify(paymentData));

        // Solo procesamos pagos aprobados
        if (paymentData.status !== "approved") {
            response.status(200).send("Pago no aprobado, ignorado");
            return;
        }

        const email = paymentData.payer?.email?.toLowerCase().trim();
        const name = paymentData.payer?.first_name || "";

        if (!email) {
            console.error("No se encontró email en el pago");
            response.status(200).send("Sin email");
            return;
        }

        console.log(`Procesando acceso premium para: ${email}`);

        // 1. Crear o buscar usuario en Firebase Auth
        let userRecord;
        try {
            userRecord = await auth.getUserByEmail(email);
            console.log("Usuario ya existía:", userRecord.uid);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                userRecord = await auth.createUser({ email, displayName: name });
                console.log("Usuario creado:", userRecord.uid);
            } else {
                throw error;
            }
        }

        // 2. Guardar acceso premium en Firestore
        await db.collection("users_premium").doc(userRecord.uid).set({
            email,
            name,
            hasPremiumAccess: true,
            mercadopagoPaymentId: String(paymentId),
            purchaseDate: new Date().toISOString(),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        console.log(`✅ Acceso premium otorgado a: ${email}`);
        response.status(200).json({ message: "Acceso premium otorgado", email });

    } catch (error) {
        console.error("Error procesando webhook MercadoPago:", error);
        response.status(500).json({ error: error.message });
    }
});

// ─── 3. WEBHOOK DE HOTMART (se mantiene por si acaso) ───────────────────────
exports.hotmartWebhook = onRequest(async (request, response) => {
    if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const payload = request.body;
        console.log('Webhook Hotmart Recibido:', JSON.stringify(payload));

        const eventType = payload.event;
        if (eventType !== 'PURCHASE_APPROVED') {
            response.status(200).send(JSON.stringify({ message: 'Evento ignorado.' }));
            return;
        }

        const { data } = payload;
        const { buyer, purchase } = data;
        const email = buyer.email.toLowerCase().trim();
        const name = buyer.name;
        const transactionId = purchase.transaction;

        let userRecord;
        try {
            userRecord = await auth.getUserByEmail(email);
            console.log('El usuario ya existía en Firebase Auth:', userRecord.uid);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                userRecord = await auth.createUser({ email, displayName: name });
                console.log('Usuario creado exitosamente:', userRecord.uid);
            } else {
                throw error;
            }
        }

        const userRef = db.collection('users_premium').doc(userRecord.uid);
        await userRef.set({
            email,
            name,
            hasPremiumAccess: true,
            hotmartTransaction: transactionId,
            purchaseDate: new Date().toISOString(),
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        response.status(200).send(JSON.stringify({ message: 'Usuario premium guardado.' }));
    } catch (error) {
        console.error('Error procesando webhook:', error);
        response.status(500).send(JSON.stringify({ error: error.message }));
    }
});
