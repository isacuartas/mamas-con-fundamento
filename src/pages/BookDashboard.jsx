```javascript
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import EbookReader from './EbookReader';

function DashboardMenu() {
  const navigate = useNavigate();
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <header className="App-header" style={{ padding: '20px', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className="brand-logo-text" style={{ fontSize: '1.2em' }}>
          Mamás con <span>Fundamento</span>
        </div>
        <div style={{ fontSize: '0.9em', color: 'var(--color-bg-lavender)' }}>
          📚 Área Premium
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>Nutrición con Fundamento: El E-book</h1>
        <p style={{ fontSize: '1.2em', color: '#555' }}>
          Bienvenida a tu guía definitiva. Aquí encontrarás toda la ciencia detrás de tu nutrición explicada de forma sencilla.
        </p>
        
        <div style={{ 
          marginTop: '40px', 
          padding: '40px', 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(106, 90, 205, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
           <div style={{
             width: '120px',
             height: '160px',
             backgroundColor: 'var(--color-primary)',
             borderRadius: '8px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: 'white',
             fontSize: '3em',
             marginBottom: '20px',
             boxShadow: '5px 5px 15px rgba(0,0,0,0.2)'
           }}>
              📖
           </div>

           <button 
             onClick={() => navigate('/book/read')}
             style={{
               backgroundColor: 'var(--color-success)',
               color: 'white',
               border: 'none',
               padding: '15px 40px',
               borderRadius: '30px',
               fontSize: '1.2em',
               fontWeight: 'bold',
               cursor: 'pointer',
               boxShadow: '0 4px 15px rgba(139, 195, 74, 0.4)',
               transition: 'transform 0.2s'
             }}
           >
             Comenzar Lectura
           </button>

           <Link to="/" style={{ display: 'inline-block', marginTop: '30px', color: '#666', textDecoration: 'none' }}>
             ← Volver a Herramientas Gratuitas
           </Link>
        </div>
      </main>
    </div>
  );
}

function BookDashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardMenu />} />
      <Route path="/read/*" element={<EbookReader />} />
    </Routes>
  );
}

export default BookDashboard;
```
