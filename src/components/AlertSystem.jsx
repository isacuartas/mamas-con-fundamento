import React from 'react';
import messages from '../data/interfaceMessages.json';

/**
 * Componente: AlertSystem
 * 
 * Flags de riesgo y Mensajes Humanos
 */
const AlertSystem = ({ patientData, historialMonitoreo }) => {
    if (!patientData) return null;

    let alerts = [];
    let statusCard = null;

    // Set status card based on calculation
    let statusKey = "";

    // El mensaje debe reaccionar al estado actual del embarazo si ya hay registros
    if (historialMonitoreo && historialMonitoreo.length > 0) {
        const ultimoControl = historialMonitoreo[historialMonitoreo.length - 1];
        statusKey = String(ultimoControl.zonaIMC).toUpperCase();
        // Fallbacks de formato 
        if (statusKey === 'BAJO PESO' || statusKey === 'BAJOPESO') statusKey = 'BAJO_PESO';
    }
    // Si no hay controles aún, basarse en el IMC pregestacional inicial
    else if (patientData.clasificacion) {
        if (patientData.clasificacion === "Delgadez") statusKey = "BAJO_PESO";
        if (patientData.clasificacion === "Normal") statusKey = "NORMAL";
        if (patientData.clasificacion === "Sobrepeso") statusKey = "SOBREPESO";
        if (patientData.clasificacion === "Obesidad") statusKey = "OBESIDAD";
    }

    // SOLO mostrar la tarjeta de estado principal (Morada) si NO existen alertas más específicas en `alerts`
    // (Esta lógica se aplica más abajo durante el renderizado)
    if (statusKey && messages.statusMessages[statusKey]) {
        statusCard = messages.statusMessages[statusKey];
    }

    // 1. Alerta: Talla Baja
    if (patientData.talla && patientData.talla < 1.45) {
        alerts.push({
            id: 'talla_baja',
            type: 'warning',
            message: messages.alerts.TALLA_BAJA,
        });
    }

    // 2. Alertas basadas en la ganancia de peso (si hay historial para comparar)
    if (historialMonitoreo && historialMonitoreo.length >= 2) {
        const ultimoControl = historialMonitoreo[historialMonitoreo.length - 1];
        const penultimoControl = historialMonitoreo[historialMonitoreo.length - 2];

        const semanasTranscurridas = ultimoControl.semana - penultimoControl.semana;
        const pesoGanado = ultimoControl.peso - penultimoControl.peso;
        let gananciaSemanal = 0;

        if (semanasTranscurridas > 0) {
            gananciaSemanal = pesoGanado / semanasTranscurridas;
        }

        // El segundo y tercer trimestre comienzan en la semana 14
        if (semanasTranscurridas > 0 && ultimoControl.semana >= 14) {
            // Criterio Experta (pág 21 MINSA): > 500g/sem en 2do/3er trimestre es riesgo preeclampsia
            if (gananciaSemanal > 0.5) {
                alerts.push({
                    id: 'ganancia_excesiva',
                    type: 'danger',
                    message: messages.alerts.GANANCIA_BRUSCA,
                });
            }
        }

        // 3. Alerta y Mensajes Fundamento: Seguimiento Nutricional
        const zonaBase = penultimoControl.zonaIMC ? String(penultimoControl.zonaIMC).toUpperCase() : '';
        const zonaNueva = ultimoControl.zonaIMC ? String(ultimoControl.zonaIMC).toUpperCase() : '';

        if (zonaBase && zonaNueva) {
            // Estado 1: ÉXITO (Entra a NORMAL o se mantiene en NORMAL)
            if (zonaNueva === 'NORMAL') {
                if (gananciaSemanal > 0.5) {
                    // Previene mostrar felicitación verde y alerta roja al mismo tiempo
                    alerts.push({
                        id: 'ganancia_rapida_precaucion',
                        type: 'info',
                        message: 'Aunque sigues en tu zona Normal, aumentaste de peso muy rápido esta semana. Intenta mantener un ritmo más suave la próxima semana.'
                    });
                } else {
                    alerts.push({
                        id: 'cambio_positivo',
                        type: 'success', // Verde
                        message: messages.alerts.ZONA_FELICITACION
                    });
                }
            }
            // Transiciones en zonas de cuidado (Sobrepeso / Obesidad)
            else if (zonaNueva === 'SOBREPESO' || zonaNueva === 'OBESIDAD') {

                // Si viene de Normal, o si gana más de 500g a la semana, es PREVENTIVO
                if (zonaBase === 'NORMAL' || gananciaSemanal > 0.5) {
                    alerts.push({
                        id: 'cambio_preventivo',
                        type: 'info', // Celeste / Morado Suave
                        message: messages.alerts.ZONA_MEJORA
                    });
                }
                // Estado 3: ESTABILIDAD (Se mantiene en zona de cuidado pero aumenta menos de 500g)
                else if (zonaBase === 'SOBREPESO' || zonaBase === 'OBESIDAD') {
                    // gananciaSemanal <= 0.5
                    alerts.push({
                        id: 'estabilidad_control',
                        type: 'success', // Verde Suave
                        message: messages.alerts.ZONA_ESTABILIDAD
                    });
                }
            }
            // Otras transiciones (ej. a Bajo Peso) - Mantener lógica simple
            else if (zonaBase !== zonaNueva) {
                alerts.push({
                    id: 'cambio_de_zona',
                    type: 'warning',
                    message: `Tu seguimiento indica un cambio hacia la zona de ${ultimoControl.zonaIMC}. ¡Cuidemos juntas tu nutrición!`
                });
            }
        }
    }

    return (
        <div className="alert-system-container">
            {/* Solo mostrar la tarjeta de bienvenida gigante si no hay un seguimiento semanal activo generando alertas más precisas */}
            {statusCard && alerts.length === 0 && (
                <div className="status-human-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-app)', marginBottom: '20px', boxShadow: 'var(--shadow-app)', borderLeft: '4px solid var(--color-primary)' }}>
                    <h3 style={{ color: 'var(--color-primary)', marginTop: 0 }}>{statusCard.title}</h3>
                    <p>{statusCard.body}</p>
                    <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '12px', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.95em', color: 'var(--color-text-main)' }}>
                        💡 <strong>Tip para ti:</strong> {statusCard.tip}
                    </div>
                </div>
            )}

            {alerts.length > 0 && (
                <div className="alert-system">
                    <h3 style={{ marginTop: 0 }}>Alertas de Monitoreo</h3>
                    <ul className="alert-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {alerts.map(alert => (
                            <li key={alert.id} className={`alert-item alert-${alert.type}`}>
                                {alert.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AlertSystem;
