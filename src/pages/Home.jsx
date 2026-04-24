import React, { useState } from 'react';
import logoImage from '../assets/logo_mamas.png';
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

import UpsellModal from '../components/UpsellModal';

function Home() {
    const [activeTab, setActiveTab] = useState('hub');
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const isPremium = localStorage.getItem('isPremium') === 'true';

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

        if (!isPremium && historialMonitoreo.length >= 3) {
            setIsUpsellOpen(true);
            return;
        }

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
            <header style={{ position: 'relative', textAlign: 'center', background: 'transparent', padding: '30px 20px', maxWidth: '800px', margin: '0 auto' }}>
                {/* Botón Salir de la Cuenta */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button style={{
                        background: 'transparent',
                        border: '1px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        padding: '10px 30px',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}>
                        Salir de la Cuenta
                    </button>
                </div>

                {/* Logo Placeholder */}
                <div style={{
                    width: '140px',
                    height: '140px',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img 
                        src={logoImage} 
                        alt="Logo Mamás con Fundamento" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                </div>

                <h1 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                    Bienvenida a<br />Mamás con Fundamento
                </h1>
            </header>

            {/* Back to Hub Button when not in Hub */}
            {activeTab !== 'hub' && (
                <div style={{ maxWidth: '1200px', margin: '0 auto 20px', padding: '0 20px' }}>
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
                        ← Volver a Página Principal
                    </button>
                </div>
            )}

            {activeTab === 'hub' && (
                <main style={{ padding: '0 20px' }}>
                    <div className="hub-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {/* 1. Nutrición Integral (E-book) */}
                        <Link to="/book" className="hub-card" style={{ textDecoration: 'none', textAlign: 'center', padding: '30px 15px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🍎</div>
                            <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text)' }}>Nutrición<br />Integral</h2>
                        </Link>

                        {/* 2. Bienestar Materno (Hábitos/Daily Tracker) */}
                        <div className="hub-card" onClick={() => setActiveTab('habitos')} style={{ textAlign: 'center', padding: '30px 15px', cursor: 'pointer' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🧘‍♀️</div>
                            <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text)' }}>Bienestar<br />Materno</h2>
                        </div>

                        {/* 3. Seguimiento Peso (Monitoreo Atalah) */}
                        <div className="hub-card" onClick={() => setActiveTab('monitoreo')} style={{ textAlign: 'center', padding: '30px 15px', cursor: 'pointer' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📅</div>
                            <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text)' }}>Seguimiento<br />Peso</h2>
                        </div>

                        {/* 4. Mis Porciones (Calculadora Macros) */}
                        <div className="hub-card" onClick={() => setActiveTab('porciones')} style={{ textAlign: 'center', padding: '30px 15px', cursor: 'pointer' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🍽️</div>
                            <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text)' }}>Mis<br />Porciones</h2>
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
                    © {new Date().getFullYear()} <strong>Mamás con Fundamento</strong>. Todos los derechos reservados.
                </p>
                <p style={{ margin: '5px 0' }}>
                    Creado y Diseñado por <strong>Isabela Cuartas</strong>
                </p>
            </footer>
            
            <UpsellModal 
                isOpen={isUpsellOpen} 
                onClose={() => setIsUpsellOpen(false)} 
                message="Has registrado 3 medidas, el límite de la versión de prueba."
            />
        </div>
    );
}

export default Home;
