import React, { useState } from 'react';
import bloquesData from '../data/bloquesBienestar.json';

const WellnessBlocks = ({ currentWeek }) => {
    // Determinar qué bloque le corresponde a la mamá según su semana actual
    const determineInitialBlockId = (week) => {
        if (!week || week < 1) return 1; // Fallback

        // Bloques son de 4 semanas en 4 semanas
        const calculatedId = Math.ceil(week / 4);

        // Si se pasa de la sem 40, dar el ultimo bloque
        if (calculatedId > 10) return 10;

        return calculatedId;
    };

    const targetBlockId = determineInitialBlockId(currentWeek);
    const [viewingBlockId, setViewingBlockId] = useState(targetBlockId);
    const [prevCurrentWeek, setPrevCurrentWeek] = useState(currentWeek);

    // Si cambian la semana (añaden nuevo registro), actualizar la vista principal sincrónicamente
    if (currentWeek !== prevCurrentWeek) {
        setPrevCurrentWeek(currentWeek);
        setViewingBlockId(targetBlockId);
    }

    const activeBlock = bloquesData.find(b => b.id === viewingBlockId);

    if (!activeBlock) return null;

    return (
        <div className="wellness-blocks-container form-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--color-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2em' }}>🌱</span>
                    Bloques de Desarrollo Nutricional
                </h2>
                {viewingBlockId === targetBlockId && (
                    <span style={{ backgroundColor: 'var(--color-success)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85em', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(139,195,74,0.3)' }}>
                        TU BLOQUE ACTUAL 🌸
                    </span>
                )}
            </div>

            {viewingBlockId !== targetBlockId && (
                <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '8px', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9em' }}>
                    Estás revisando un bloque anterior. ¡Tu bloque actual es el #{targetBlockId}!
                </div>
            )}

            <div className="block-content" style={{ background: 'var(--color-bg-lavender)', padding: '25px', borderRadius: 'var(--radius-app)', borderLeft: '4px solid var(--color-primary)' }}>
                <h3 style={{ color: 'var(--color-primary)', marginTop: 0, fontSize: '1.4em' }}>
                    {activeBlock.rangoStr}: {activeBlock.titulo}
                </h3>

                <div style={{ marginBottom: '15px' }}>
                    <strong style={{ color: 'var(--color-primary)', fontSize: '1.1em' }}>💡 Lo más importante: </strong>
                    <p style={{ margin: '8px 0', lineHeight: '1.6' }}>{activeBlock.importante}</p>
                </div>

                <div>
                    <strong style={{ color: 'var(--color-success)', fontSize: '1.1em' }}>🎯 Tu meta: </strong>
                    <p style={{ margin: '8px 0', lineHeight: '1.6' }}>{activeBlock.meta}</p>
                </div>
            </div>

            <div className="block-navigation" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
                <button
                    onClick={() => setViewingBlockId(prev => Math.max(1, prev - 1))}
                    disabled={viewingBlockId === 1}
                    style={{
                        backgroundColor: viewingBlockId === 1 ? '#ccc' : 'var(--color-primary)',
                        cursor: viewingBlockId === 1 ? 'not-allowed' : 'pointer',
                        boxShadow: viewingBlockId === 1 ? 'none' : 'var(--shadow-app)'
                    }}
                >
                    ⬅️ Semana Anterior
                </button>

                {viewingBlockId !== targetBlockId && (
                    <button
                        onClick={() => setViewingBlockId(targetBlockId)}
                        style={{ backgroundColor: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', boxShadow: 'none' }}
                    >
                        Volver a Mi Semana
                    </button>
                )}

                <button
                    onClick={() => setViewingBlockId(prev => Math.min(targetBlockId, prev + 1))}
                    disabled={viewingBlockId === targetBlockId}
                    style={{
                        backgroundColor: viewingBlockId === targetBlockId ? '#ccc' : 'var(--color-primary)',
                        cursor: viewingBlockId === targetBlockId ? 'not-allowed' : 'pointer',
                        boxShadow: viewingBlockId === targetBlockId ? 'none' : 'var(--shadow-app)'
                    }}
                    title="No te apresures, vive tu etapa actual"
                >
                    Siguiente Bloque ➡️
                </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.85em', color: '#666', marginTop: '15px' }}>
                Navega hacia atrás para releer consejos importantes que fortalecieron a tu bebé.
            </p>
        </div>
    );
};

export default WellnessBlocks;
