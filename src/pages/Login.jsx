import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate auth for now, we will wire Supabase here later
        if (email && password) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/book');
        }
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
                <p style={{ color: '#666', marginBottom: '30px' }}>Ingresa tus datos para leer el libro <strong>Mamás con Fundamento</strong>.</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Correo Electrónico</label>
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

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px',
                                marginTop: '5px', fontSize: '1em'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '1em',
                        marginTop: '10px',
                        cursor: 'pointer'
                    }}>
                        Entrar al Web-Book
                    </button>
                </form>

                <div style={{ marginTop: '20px', fontSize: '0.9em' }}>
                    ¿Aún no tienes el libro? <br />
                    <a href="#" style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>Adquiérelo aquí</a>
                </div>
            </div>

            <Link to="/" style={{ marginTop: '20px', color: '#666', textDecoration: 'none' }}>
                ← Volver a Herramientas Gratuitas
            </Link>
        </div>
    );
}

export default Login;
