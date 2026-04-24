import React from 'react';

function UpsellModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    const checkoutUrl = "https://pay.hotmart.com/V105113924C?off=pr0eg058&checkoutMode=10";

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <div style={{ fontSize: '3em', marginBottom: '15px' }}>🔒</div>
                <h2 style={{ color: 'var(--color-primary)', margin: '0 0 15px 0' }}>¡Llegaste al límite!</h2>
                <p style={{ color: '#555', fontSize: '1.1em', marginBottom: '25px', lineHeight: '1.5' }}>
                    {message || "Has alcanzado el límite de la versión gratuita."}
                </p>
                <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '30px' }}>
                    Adquiere la versión premium para desbloquear todos los capítulos, herramientas de peso y tu reto diario ilimitado.
                </p>

                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'block',
                    backgroundColor: 'var(--color-success)',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '15px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                    marginBottom: '15px',
                    boxShadow: '0 4px 15px rgba(139, 195, 74, 0.4)'
                }}>
                    ⭐️ Desbloquear Todo Ahora
                </a>

                <button onClick={onClose} style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    fontSize: '1em',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}>
                    Quizás más tarde
                </button>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default UpsellModal;
