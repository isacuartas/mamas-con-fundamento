import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Chapter0 from './chapters/Chapter0';
import Chapter1 from './chapters/Chapter1';

import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';
import Chapter6 from './chapters/Chapter6';
import Chapter7 from './chapters/Chapter7';
import Chapter8 from './chapters/Chapter8';
import Chapter9 from './chapters/Chapter9';

function EbookReader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll to top on chapter change
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
    }, [location.pathname]);

    const chapters = [
        { id: 'cap0', title: 'Mi Historia', path: 'historia' },
        { id: 'cap1', title: 'Calidad vs. Cantidad', path: 'calidad' },
        { id: 'cap2', title: 'Pilares Nutricionales', path: 'pilares' },
        { id: 'cap3', title: 'Universo del DHA', path: 'dha' },
        { id: 'cap4', title: 'Microbiota Intestinal', path: 'microbiota' },
        { id: 'cap5', title: 'Traduciendo al Plato', path: 'plato' },
        { id: 'cap6', title: 'Progreso y Peso', path: 'peso' },
        { id: 'cap7', title: 'Seguridad Alimentaria', path: 'seguridad' },
        { id: 'cap8', title: 'Método del Plato', path: 'metodo' },
        { id: 'cap9', title: 'Recetario', path: 'recetario' },
    ];

    const currentChapterIndex = chapters.findIndex(ch => location.pathname.includes(ch.path));

    return (
        <div className="ebook-app">
            {/* Top Navbar */}
            <nav className="ebook-navbar">
                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰ Índice'}
                </button>
                <span className="ebook-title">Mamás con Fundamento</span>
                <button className="exit-button" onClick={() => navigate('/book')}>Salir</button>
            </nav>

            <div className="ebook-layout">
                {/* Sidebar Menu (Hidden on mobile unless toggled) */}
                <aside className={`ebook-sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <h3>Índice de Contenidos</h3>
                    <ul className="chapter-list">
                        {chapters.map((chapter) => (
                            <li key={chapter.id}>
                                <button
                                    className={`chapter-link ${location.pathname.includes(chapter.path) ? 'active' : ''}`}
                                    onClick={() => navigate(`/book/read/${chapter.path}`)}
                                >
                                    {chapter.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Shadow overlay for mobile menu */}
                {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

                {/* Main Reading Area */}
                <main className="reading-area">
                    <Routes>
                        <Route path="/" element={<div className="chapter-content">
                            <h1>Bienvenida a la Guía ✨</h1>
                            <p>Abre el índice para empezar a leer o haz clic en continuar.</p>
                            <button onClick={() => navigate('/book/read/historia')} className="btn-primary">Empezar Lectura</button>
                        </div>} />
                        <Route path="historia" element={<Chapter0 />} />
                        <Route path="calidad" element={<Chapter1 />} />
                        <Route path="pilares" element={<Chapter2 />} />
                        <Route path="dha" element={<Chapter3 />} />
                        <Route path="microbiota" element={<Chapter4 />} />
                        <Route path="plato" element={<Chapter5 />} />
                        <Route path="peso" element={<Chapter6 />} />
                        <Route path="seguridad" element={<Chapter7 />} />
                        <Route path="metodo" element={<Chapter8 />} />
                        <Route path="recetario" element={<Chapter9 />} />
                    </Routes>

                    {/* Bottom Navigation */}
                    {currentChapterIndex >= 0 && (
                        <div className="chapter-navigation">
                            <button
                                disabled={currentChapterIndex === 0}
                                onClick={() => navigate(`/book/read/${chapters[currentChapterIndex - 1]?.path}`)}
                            >
                                ← Anterior
                            </button>
                            <button
                                disabled={currentChapterIndex === chapters.length - 1}
                                onClick={() => navigate(`/book/read/${chapters[currentChapterIndex + 1]?.path}`)}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default EbookReader;
