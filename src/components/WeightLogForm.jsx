import React, { useState } from 'react';

/**
 * Componente: WeightLogForm
 * 
 * Input: Semana y Peso en ese momento
 */
const WeightLogForm = ({ onLogWeight, startData }) => {
    const [semana, setSemana] = useState('');
    const [peso, setPeso] = useState('');

    const handleLog = (e) => {
        e.preventDefault();

        const semanaNum = parseInt(semana);
        const pesoNum = parseFloat(peso);

        if (!semanaNum || !pesoNum) return;
        if (semanaNum < 10 || semanaNum > 42) {
            alert("La guía solo valora desde la semana 10 hasta la 42.");
            return;
        }

        // Para evitar problemas de línea de tiempo hacia atrás, solo alertamos
        if (startData && semanaNum <= startData.semana) {
            alert(`Debes registrar semanas mayores a tu control inicial (Semana ${startData.semana}).`);
            return;
        }

        onLogWeight({
            semana: semanaNum,
            peso: pesoNum
        });

        // Limpiar el form
        setSemana('');
        setPeso('');
    };

    return (
        <div className="weight-log-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <h3>📝 Registrar Control Semanal</h3>
            <form onSubmit={handleLog} className="log-form-grid">
                <div className="log-form-input">
                    <label>Semana Ej: 27</label>
                    <input
                        type="number"
                        value={semana}
                        onChange={(e) => setSemana(e.target.value)}
                        placeholder="Ej. 24"
                        min="11"
                        max="42"
                        required
                    />
                </div>
                <div className="log-form-input">
                    <label>Peso (kg)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="Ej. 70.5"
                        required
                    />
                </div>
                <button type="submit" className="log-form-btn">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default WeightLogForm;
