import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UpsellModal from '../components/UpsellModal';

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
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const mainRef = React.useRef(null);
    const isPremium = localStorage.getItem('isPremium') === 'true';

    // Allowed free chapters
    const freeChapters = ['historia', 'calidad', 'metodo'];

    // Scroll to top on chapter change
    useEffect(() => {
        window.scrollTo(0, 0);
        if (mainRef.current) {
            mainRef.current.scrollTo(0, 0);
        }
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

    const handleNavigation = (path) => {
        if (!isPremium && !freeChapters.includes(path)) {
            setIsUpsellOpen(true);
            setIsMenuOpen(false);
            return;
        }
        navigate(`/book/read/${path}`);
    };

    return (
        <div className="ebook-app">
            <nav className="ebook-navbar">
                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰ Índice'}
                </button>
                <span className="ebook-title">Mamás con Fundamento</span>
                <button className="exit-button" onClick={() => navigate('/book')}>Salir</button>
            </nav>

            <div className="ebook-layout">
                <aside className={`ebook-sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <h3>Índice de Contenidos</h3>
                    <ul className="chapter-list">
                        {chapters.map((chapter) => {
                            const isLocked = !isPremium && !freeChapters.includes(chapter.path);
                            return (
                                <li key={chapter.id}>
                                    <button
                                        className={`chapter-link ${location.pathname.includes(chapter.path) ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                                        onClick={() => handleNavigation(chapter.path)}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <span>{chapter.title}</span>
                                        {isLocked && <span style={{ fontSize: '0.9em', opacity: 0.6 }}>🔒</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

                <main className="reading-area" ref={mainRef}>
                    <Routes>
                        <Route path="/" element={<div className="chapter-content">
                            <h1>Bienvenida a la Guía ✨</h1>
                            <p>Abre el índice para empezar a leer o haz clic en continuar.</p>
                            <button onClick={() => handleNavigation('historia')} className="btn-primary">Empezar Lectura</button>
                        </div>} />
                        <Route path="historia" element={<Chapter0 />} />
                        <Route path="calidad" element={<Chapter1 />} />
                        <Route path="pilares" element={isPremium ? <Chapter2 /> : null} />
                        <Route path="dha" element={isPremium ? <Chapter3 /> : null} />
                        <Route path="microbiota" element={isPremium ? <Chapter4 /> : null} />
                        <Route path="plato" element={isPremium ? <Chapter5 /> : null} />
                        <Route path="peso" element={isPremium ? <Chapter6 /> : null} />
                        <Route path="seguridad" element={isPremium ? <Chapter7 /> : null} />
                        <Route path="metodo" element={<Chapter8 />} />
                        <Route path="recetario" element={isPremium ? <Chapter9 /> : null} />
                    </Routes>

                    {currentChapterIndex >= 0 && (
                        <div className="chapter-navigation">
                            <button
                                disabled={currentChapterIndex === 0}
                                onClick={() => handleNavigation(chapters[currentChapterIndex - 1]?.path)}
                            >
                                ← Anterior
                            </button>
                            <button
                                disabled={currentChapterIndex === chapters.length - 1}
                                onClick={() => handleNavigation(chapters[currentChapterIndex + 1]?.path)}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </main>
            </div>
            
            <UpsellModal 
                isOpen={isUpsellOpen} 
                onClose={() => setIsUpsellOpen(false)} 
                message="Este capítulo es exclusivo de la versión completa. ¡Adquiérela para seguir leyendo!"
            />
        </div>
    );
}

export default EbookReader;
