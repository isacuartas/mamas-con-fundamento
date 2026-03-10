import React, { useState } from 'react';
import IMCPreCalculator from '../components/IMCPreCalculator';
import WeightGoalManager from '../components/WeightGoalManager';
import AtalahChart from '../components/AtalahChart';
import AlertSystem from '../components/AlertSystem';
import WeightLogForm from '../components/WeightLogForm';
import WellnessBlocks from '../components/WellnessBlocks';
import FAQSection from '../components/FAQSection';
import ExportPDFButton from '../components/ExportPDFButton';
import WeightHistoryTable from '../components/WeightHistoryTable';
import DailyTracker from '../components/DailyTracker';
import PortionsCalculator from '../components/PortionsCalculator';
import { getNutritionalStatusForWeek } from '../utils/atalahUtils';
import { Link } from 'react-router-dom';

function Home() {
    const [activeTab, setActiveTab] = useState('hub');

    // Inicializar estado usando una función (se ejecuta solo al montar) en vez de useEffect para localStorage
    const [imcData, setImcData] = useState(() => {
        const saved = localStorage.getItem('perfilInicial');
        return saved ? JSON.parse(saved) : null;
    });

    const [historialMonitoreo, setHistorialMonitoreo] = useState(() => {
        const saved = localStorage.getItem('historialPesos');
        return saved ? JSON.parse(saved) : [];
    });

    const handleCalculateIMC = (data) => {
        setImcData(data);
        localStorage.setItem('perfilInicial', JSON.stringify(data));

        // Al configurar por primera vez, el primer control es de la semana 10 como base
        const initialLog = [{
            semana: 10,
            peso: data.peso,
            talla: data.talla,
            zonaIMC: data.clasificacion,
            imcPaciente: parseFloat(data.imc)
        }];
        setHistorialMonitoreo(initialLog);
        localStorage.setItem('historialPesos', JSON.stringify(initialLog));
    };

    const handleLogWeight = (logData) => {
        if (!imcData) return;

        // Calcular IMC actual de la semana (Peso Actual / Talla de Perfil^2)
        const imcActual = logData.peso / (imcData.talla * imcData.talla);

        // Evaluar estado con Interpolación Atalah
        const zonaActual = getNutritionalStatusForWeek(logData.semana, imcActual);

        const newRecord = {
            semana: logData.semana,
            peso: logData.peso,
            talla: imcData.talla,
            zonaIMC: zonaActual,
            imcPaciente: parseFloat(imcActual.toFixed(2))
        };

        // Actualizar el historial agregando el nuevo record o sobrescribiéndolo si ya existe la misma semana
        const parsedHistorial = historialMonitoreo.filter(item => item.semana !== logData.semana);
        const newHistorial = [...parsedHistorial, newRecord].sort((a, b) => a.semana - b.semana);

        setHistorialMonitoreo(newHistorial);
        localStorage.setItem('historialPesos', JSON.stringify(newHistorial));
    };

    const handleDeleteRecord = (semanaToDelete) => {
        if (window.confirm(`¿Estás segura de eliminar el registro de la semana ${semanaToDelete}?`)) {
            const filteredHistorial = historialMonitoreo.filter(item => item.semana !== semanaToDelete);
            setHistorialMonitoreo(filteredHistorial);
            localStorage.setItem('historialPesos', JSON.stringify(filteredHistorial));
        }
    };

    const handleEditRecord = (record) => {
        // Usaremos un prompt simple para la edición rápida in-situ para mejor UX
        const newPeso = window.prompt(`Ingresa el nuevo peso para la Semana ${record.semana}:\n(Actual: ${record.peso} kg)`, record.peso);
        if (newPeso && !isNaN(parseFloat(newPeso))) {
            // Aprovechamos la misma lógica de log existente
            handleLogWeight({
                semana: record.semana,
                peso: parseFloat(newPeso)
            });
        }
    };

    const handleReset = () => {
        if (window.confirm('¿Segura que deseas borrar todo tu progreso y empezar de nuevo?')) {
            localStorage.removeItem('perfilInicial');
            localStorage.removeItem('historialPesos');
            setImcData(null);
            setHistorialMonitoreo([]);
        }
    };

    // Obtener la semana más reciente para los bloques de bienestar
    const ultimaSemana = historialMonitoreo.length > 0
        ? historialMonitoreo[historialMonitoreo.length - 1].semana
        : 0;

    return (
        <div className="App">
            <header className="App-header" style={{ position: 'relative', textAlign: 'center', background: 'white', borderRadius: '16px', padding: '30px 20px', boxShadow: '0 10px 30px rgba(106, 90, 205, 0.05)', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: '0 0 10px 0' }}>Mamás con <span style={{ fontWeight: 'normal' }}>Fundamento</span></h1>

                <Link to="/book" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: 'var(--color-success)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.95em',
                    boxShadow: '0 4px 15px rgba(139, 195, 74, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    📖 Leer E-book
                </Link>

                <div style={{ marginTop: '10px' }}>
                    <h2 style={{ fontSize: '1.4em', color: 'var(--color-primary)', margin: '15px 0 5px 0' }}>Monitoreo Gestacional MINSA</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', margin: 0 }}>Herramientas gratuitas para el control de tu embarazo</p>
                </div>
            </header>

            {/* Back to Hub Button when not in Hub */}
            {activeTab !== 'hub' && (
                <div style={{ maxWidth: '1200px', margin: '20px auto 0', padding: '0 20px' }}>
                    <button
                        onClick={() => setActiveTab('hub')}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ← Volver al Menú Principal
                    </button>
                </div>
            )}

            {activeTab === 'hub' && (
                <main>
                    <div className="hub-grid">
                        <Link to="/book" className="hub-card" style={{ textDecoration: 'none' }}>
                            <div className="hub-icon">📖</div>
                            <h2 className="hub-title">E-book Premium</h2>
                            <p className="hub-desc">Lee "Nutrición con Fundamento", toda la ciencia detrás de tu nutrición en el embarazo.</p>
                        </Link>

                        <div className="hub-card" onClick={() => setActiveTab('monitoreo')}>
                            <div className="hub-icon">⚖️</div>
                            <h2 className="hub-title">Monitoreo Gestacional</h2>
                            <p className="hub-desc">Supervisa tu ganancia de peso ideal con la Curva de Atalah del MINSA.</p>
                        </div>

                        <div className="hub-card" onClick={() => setActiveTab('porciones')}>
                            <div className="hub-icon">🍽️</div>
                            <h2 className="hub-title">Mis Porciones</h2>
                            <p className="hub-desc">Calculadora de macronutrientes adaptada a tu trimestre y nivel de actividad.</p>
                        </div>

                        <div className="hub-card" onClick={() => setActiveTab('habitos')}>
                            <div className="hub-icon">🗓️</div>
                            <h2 className="hub-title">Hábitos y Retos</h2>
                            <p className="hub-desc">Rastreador de metas diarias para mantenerte activa e hidratada.</p>
                        </div>

                        <div className="hub-card" onClick={() => setActiveTab('faq')}>
                            <div className="hub-icon">🧠</div>
                            <h2 className="hub-title">FAQs</h2>
                            <p className="hub-desc">Respuestas científicas a tus dudas más comunes sobre la nutrición.</p>
                        </div>
                    </div>
                </main>
            )}

            {activeTab === 'monitoreo' && (
                <main className="main-grid">
                    {/* Panel Izquierdo: Cálculos Iniciales y Metas */}
                    <section className="left-panel">
                        {!imcData ? (
                            <IMCPreCalculator onCalculate={handleCalculateIMC} />
                        ) : (
                            <div className="profile-summary-card form-card" style={{ background: 'var(--color-bg-lavender)', borderLeft: '5px solid var(--color-primary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>👩‍🍼 Tu Perfil Nutricional</h2>
                                    <button onClick={handleReset} style={{ background: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Reiniciar</button>
                                </div>
                                <p><strong>Estatura:</strong> {imcData.talla}m</p>
                                <p><strong>Peso Inicial (Sem 10):</strong> {imcData.peso}kg</p>
                                <p><strong>Punto de Partida:</strong> {imcData.imc} ({imcData.clasificacion})</p>
                            </div>
                        )}

                        {imcData && (
                            <>
                                <WeightGoalManager clasificacionIMC={imcData.clasificacion} />
                                <WeightLogForm
                                    onLogWeight={handleLogWeight}
                                    startData={historialMonitoreo.length > 0 ? historialMonitoreo[0] : null}
                                />
                            </>
                        )}
                    </section>

                    {/* Panel Derecho: Monitoreo y Alertas */}
                    <section className="right-panel">
                        {imcData ? (
                            <>
                                <AlertSystem
                                    patientData={imcData}
                                    historialMonitoreo={historialMonitoreo}
                                />

                                <AtalahChart patientData={historialMonitoreo} />

                                <WellnessBlocks currentWeek={ultimaSemana} />

                                <WeightHistoryTable
                                    historial={historialMonitoreo}
                                    onDeleteRecord={handleDeleteRecord}
                                    onEditRecord={handleEditRecord}
                                />

                                <div style={{ marginTop: '10px' }}>
                                    <ExportPDFButton
                                        patientData={imcData}
                                        historialMonitoreo={historialMonitoreo}
                                        chartElementId="atalah-chart-capture-area"
                                    />
                                </div>
                            </>
                        ) : (
                            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#6c757d' }}>
                                <p>⬅️ Ingresa tus datos pregestacionales para iniciar el monitoreo interactivo de Atalah.</p>
                            </div>
                        )}
                    </section>
                </main>
            )}

            {activeTab === 'porciones' && (
                <main style={{ marginTop: '20px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <PortionsCalculator patientData={imcData} historialMonitoreo={historialMonitoreo} />
                    </div>
                </main>
            )}

            {activeTab === 'habitos' && (
                <main style={{ marginTop: '20px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <DailyTracker />
                    </div>
                </main>
            )}

            {activeTab === 'faq' && (
                <main style={{ marginTop: '20px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ marginTop: '20px' }} className="form-card">
                            <FAQSection />
                        </div>
                    </div>
                </main>
            )}

            {/* Footer / Derechos de Autor */}
            <footer style={{
                marginTop: '40px',
                padding: '20px',
                textAlign: 'center',
                borderTop: '1px solid var(--color-border)',
                fontSize: '0.9em',
                color: 'var(--color-text-muted)'
            }}>
                <p style={{ margin: '5px 0' }}>
                    © {new Date().getFullYear()} <strong>Nutrición con Fundamento</strong>. Todos los derechos reservados.
                </p>
                <p style={{ margin: '5px 0' }}>
                    Creado y Diseñado por <strong>Isabela Cuartas</strong>
                </p>
            </footer>
        </div>
    );
}

export default Home;
