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
                            name="P97 (Límite Obesidad)"
                            dot={false}
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="p85"
                            stroke="#ffe4b5"
                            name="P85 (Límite Sobrepeso)"
                            dot={false}
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="p10"
                            stroke="#b3d4ff"
                            name="P10 (Límite Normal/Bajo Peso)"
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
            <div className="chart-legend-info">
                <small>Zonas: Por debajo de P10 = Bajo Peso | Entre P10 y P85 = Normal | Entre P85 y P97 = Sobrepeso | Por encima de P97 = Obesidad</small>
            </div>
        </div>
    );
};

export default AtalahChart;
