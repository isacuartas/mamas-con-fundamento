import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function Login() {
    const [email, setEmail] = useState('');
    const [statusText, setStatusText] = useState('');
    const [statusType, setStatusType] = useState(''); // 'error', 'success', 'loading'
    const navigate = useNavigate();

    // Comprobar si llegamos a esta página haciendo clic en un Magic Link
    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            setStatusType('loading');
            setStatusText('Verificando tu acceso...');
            
            let emailForSignIn = window.localStorage.getItem('emailForSignIn');
            
            if (!emailForSignIn) {
                emailForSignIn = window.prompt('Por favor, confirma tu correo electrónico por seguridad:');
            }

            signInWithEmailLink(auth, emailForSignIn, window.location.href)
                .then(async (result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    
                    // Verificar si en la base de datos tiene acceso premium
                    const userRef = doc(db, 'users_premium', result.user.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists() && docSnap.data().hasPremiumAccess) {
                        localStorage.setItem('isAuthenticated', 'true');
                        navigate('/book');
                    } else {
                        // Usuario entró pero no tiene acceso premium comprado registrado
                        setStatusType('error');
                        setStatusText('Ingresaste correctamente, pero no encontramos una compra activa asociada a este correo. Asegúrate de haber usado el correo con el que compraste en Hotmart.');
                        auth.signOut();
                    }
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión con link", error);
                    setStatusType('error');
                    setStatusText('El enlace mágico es inválido o ha expirado. Por favor, solicita uno nuevo.');
                });
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setStatusText('');
        
        if (!email) return;

        // Bypass especial para revisores de Hotmart y para la creadora (Isabela)
        const emailLower = email.toLowerCase();
        if (emailLower === 'revisor@hotmart.com' || emailLower === 'isabela.cuartasr@gmail.com') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/book');
            return;
        }

        setStatusType('loading');
        setStatusText('Enviando enlace mágico...');

        const actionCodeSettings = {
            url: window.location.origin + '/login',
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                setStatusType('success');
                setStatusText('¡Listo! Revisa tu bandeja de entrada o spam. Te hemos enviado un correo mágico con un botón que al presionarlo te dará acceso directo.');
            })
            .catch((error) => {
                console.error("Error al enviar email", error);
                setStatusType('error');
                setStatusText('Hubo un error enviando el correo. Inténtalo de nuevo.');
            });
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-lavender)',
            padding: '20px'
        }}>
            <div className="form-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--color-primary)', marginTop: 0 }}>Acceso Exclusivo</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>Ingresa tu correo para leer el libro <strong>Mamás con Fundamento</strong>. Recibirás un enlace sin contraseña.</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Correo Electrónico (El mismo de Hotmart)</label>
                        <input
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px',
                                marginTop: '5px', fontSize: '1em'
                            }}
                        />
                    </div>

                    <button type="submit" disabled={statusType === 'loading' || statusType === 'success'} style={{
                        backgroundColor: (statusType === 'loading' || statusType === 'success') ? '#ccc' : 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '1em',
                        marginTop: '10px',
                        cursor: (statusType === 'loading' || statusType === 'success') ? 'not-allowed' : 'pointer'
                    }}>
                        Quiero mi Acceso
                    </button>
                </form>

                {statusText && (
                    <div style={{ 
                        marginTop: '20px', 
                        padding: '15px', 
                        borderRadius: '8px',
                        backgroundColor: statusType === 'error' ? '#ffeeee' : statusType === 'success' ? '#eeffee' : '#f0f0f0',
                        color: statusType === 'error' ? 'red' : statusType === 'success' ? 'green' : '#666',
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                    }}>
                        {statusText}
                    </div>
                )}

                <div style={{ marginTop: '20px', fontSize: '0.9em' }}>
                    ¿Aún no tienes el libro? <br />
                    <a href="#" style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>Adquiérelo aquí</a>
                </div>
            </div>

            <Link to="/" style={{ marginTop: '20px', color: '#666', textDecoration: 'none' }}>
                ← Volver a Página Principal
            </Link>
        </div>
    );
}

export default Login;
