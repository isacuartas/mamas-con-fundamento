import React, { useState } from 'react';

/**
 * Componente: WeightGoalManager
 * 
 * Lógica: Según la clasificación anterior (IMC pregestacional), setear el 'Target de Ganancia':
 *  - Delgadez: 12.5 a 18.0 kg.
 *  - Normal: 11.5 a 16.0 kg.
 *  - Sobrepeso: 7.0 a 11.5 kg.
 *  - Obesidad: 5.0 a 9.0 kg.
 * 
 * Extra: Booleano para isMultiplePregnancy (si son gemelos, los rangos suben, ej. Normal: 17-25 kg).
 */
const WeightGoalManager = ({ clasificacionIMC }) => {
    const [isMultiplePregnancy, setIsMultiplePregnancy] = useState(false);

    // Derivar la meta dinámicamente en vez de usar useEffect
    let minGoal = 0;
    let maxGoal = 0;

    if (clasificacionIMC) {
        if (!isMultiplePregnancy) {
            // Rangos embarazo único (MINSA)
            switch (clasificacionIMC) {
                case 'Delgadez':
                    minGoal = 12.5; maxGoal = 18.0;
                    break;
                case 'Normal':
                    minGoal = 11.5; maxGoal = 16.0;
                    break;
                case 'Sobrepeso':
                    minGoal = 7.0; maxGoal = 11.5;
                    break;
                case 'Obesidad':
                    minGoal = 5.0; maxGoal = 9.0;
                    break;
                default:
                    break;
            }
        } else {
            // Rangos embarazo múltiple (Ejemplo, la experta puede afinar esto luego)
            switch (clasificacionIMC) {
                case 'Normal':
                    minGoal = 17.0; maxGoal = 25.0;
                    break;
                default:
                    minGoal = 0; maxGoal = 0;
                    break;
            }
        }
    }

    return (
        <div className="weight-goal-card form-card">
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-bg-lavender)', paddingBottom: '10px' }}>🎯 Tu Meta de Salud</h2>

            {!clasificacionIMC ? (
                <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Por favor, calcule primero el IMC pregestacional.</p>
            ) : (
                <>
                    <div className="pregnancy-type-toggle" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-text-main)', fontWeight: '500' }}>
                            <input
                                type="checkbox"
                                checked={isMultiplePregnancy}
                                onChange={(e) => setIsMultiplePregnancy(e.target.checked)}
                                style={{ transform: 'scale(1.2)', accentColor: 'var(--color-primary)' }}
                            />
                            Embarazo Múltiple (Gemelar)
                        </label>
                    </div>

                    <div className="goal-result" style={{ background: 'var(--color-bg-lavender)', padding: '20px', borderRadius: 'var(--radius-app)', borderLeft: '5px solid var(--color-success)', marginTop: '20px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-success)' }}>Rango Recomendado:</h3>
                        <p className="goal-range" style={{ margin: 0, fontSize: '1.4em', color: 'var(--color-primary)' }}>
                            <strong>{minGoal} kg - {maxGoal} kg</strong>
                        </p>
                        <p className="goal-notes" style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: 'var(--color-text-muted)' }}>
                            (Basado en clasificación inicial "{clasificacionIMC}")
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeightGoalManager;
