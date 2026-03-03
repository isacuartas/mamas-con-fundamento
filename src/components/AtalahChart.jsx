import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

/**
 * Componente: AtalahChart (Gráfica de Control)
 * 
 * Librería: Recharts
 * Estructura: Eje X (Semanas 10 a 42). Eje Y (IMC).
 * Zonas: Mapear líneas de los percentiles P10, P85 y P97 (Bajo Peso, Normal, Sobrepeso, Obesidad).
 * 
 * TODO: La experta facilitará el JSON con los puntos exactos de la curva.
 * Este esqueleto utiliza un mock inicial para que la gráfica renderice.
 */

import atalahData from '../data/atalahData.json';
import { getAtalahLimitsForWeek } from '../utils/atalahUtils';

const AtalahChart = ({ patientData = [] }) => {
    // Para que la gráfica dibuje correctamente los puntos del paciente en semanas "impares" (ej. 15, 27)
    // necesitamos combinar las semanas oficiales del MINSA con las semanas registradas por el paciente.

    // 1. Obtener todas las semanas únicas (del JSON maestro + del historial de la paciente)
    const officialWeeks = atalahData.map(p => p.week);
    const patientWeeks = patientData.map(p => p.semana);
    const allWeeks = Array.from(new Set([...officialWeeks, ...patientWeeks])).sort((a, b) => a - b);

    // 2. Construir el dataToRender evaluando cada semana
    const dataToRender = allWeeks.map(week => {
        // Encontrar los datos de la paciente si existen en esta semana
        const patientPoint = patientData.find(pd => pd.semana === week);

        // Obtener los límites del MINSA para esa semana (ya sea exacto o interpolado)
        const minsaLimits = getAtalahLimitsForWeek(week);

        return {
            week,
            p10: minsaLimits ? minsaLimits.p10 : null,
            p85: minsaLimits ? minsaLimits.p85 : null,
            p97: minsaLimits ? minsaLimits.p97 : null,
            imcPaciente: patientPoint ? patientPoint.imcPaciente : null
        };
    });
    return (
        <div id="atalah-chart-capture-area" className="atalah-chart-card form-card" style={{ backgroundColor: 'white' }}>
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-bg-lavender)', paddingBottom: '10px' }}>📈 Gráfica de Monitoreo (Curva de Atalah)</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '15px' }}>Compara tu IMC con las franjas saludables para tus Semanas de Gestación</p>

            <div style={{ width: '100%', height: '400px', minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={dataToRender}
                        margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        {/* Eje X: Semanas de gestación (10 a 42) */}
                        <XAxis
                            dataKey="week"
                            type="number"
                            domain={[10, 42]}
                            ticks={[10, 15, 20, 25, 30, 35, 40, 42]}
                            label={{ value: 'Semanas de Gestación', position: 'insideBottom', offset: -10 }}
                        />

                        {/* Eje Y: IMC */}
                        <YAxis
                            domain={['auto', 'auto']}
                            label={{ value: 'IMC', angle: -90, position: 'insideLeft', offset: 10 }}
                        />

                        <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px' }} />

                        {/* Zonas / Percentiles de la Guía MINSA (Colores pastel suaves) */}
                        <Line
                            type="monotone"
                            dataKey="p97"
                            stroke="#ffcccc"
                            name="Línea Superior (Obesidad)"
                            dot={false}
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="p85"
                            stroke="#ffe4b5"
                            name="Línea Media Alta (Sobrepeso)"
                            dot={false}
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="p10"
                            stroke="#b3d4ff"
                            name="Línea Inferior (Bajo Peso)"
                            dot={false}
                            strokeWidth={2}
                            isAnimationActive={false}
                        />

                        {/* Trayectoria de la Paciente (Branding Full) */}
                        <Line
                            type="monotone"
                            dataKey="imcPaciente"
                            stroke="var(--color-primary)"
                            name="Tú (IMC Actual)"
                            strokeWidth={4}
                            activeDot={{ r: 8, fill: 'var(--color-success)', stroke: '#fff', strokeWidth: 2 }}
                            connectNulls={true}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-legend-info" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--color-bg-lavender)', borderRadius: '8px', border: '1px solid #e0d9fc' }}>
                <h4 style={{ color: 'var(--color-primary)', margin: '0 0 10px 0', fontSize: '1.1rem' }}>💡 ¿Cómo leer mi gráfica?</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.9rem', color: '#4a4a4a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '16px', height: '16px', backgroundColor: '#ffcccc', borderRadius: '50%', border: '1px solid #ff9999', display: 'inline-block' }}></span>
                        <span><strong>Por encima de la fila roja:</strong> Obesidad</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '16px', height: '16px', backgroundColor: '#ffe4b5', borderRadius: '50%', border: '1px solid #ffcc66', display: 'inline-block' }}></span>
                        <span><strong>Entre amarilla y roja:</strong> Sobrepeso</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '16px', height: '16px', backgroundColor: '#b3d4ff', borderRadius: '50%', border: '1px solid #66a3ff', display: 'inline-block' }}></span>
                        <span><strong>Entre azul y amarilla:</strong> Normal</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', border: '1px solid #b3d4ff', display: 'inline-block' }}></span>
                        <span><strong>Por debajo de la fila azul:</strong> Bajo Peso</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtalahChart;
