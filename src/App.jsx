import React, { useState } from 'react';
import IMCPreCalculator from './components/IMCPreCalculator';
import WeightGoalManager from './components/WeightGoalManager';
import AtalahChart from './components/AtalahChart';
import AlertSystem from './components/AlertSystem';
import WeightLogForm from './components/WeightLogForm';
import WellnessBlocks from './components/WellnessBlocks';
import FAQSection from './components/FAQSection';
import ExportPDFButton from './components/ExportPDFButton';
import WeightHistoryTable from './components/WeightHistoryTable';
import { getNutritionalStatusForWeek } from './utils/atalahUtils';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('monitoreo');

  // Inicializar estado usando una función (se ejecuta solo al montar) en vez de useEffect para localStorage
  const [imcData, setImcData] = useState(() => {
    const saved = localStorage.getItem('perfilInicial');
    return saved ? JSON.parse(saved) : null;
  });

  const [historialMonitoreo, setHistorialMonitoreo] = useState(() => {
    const saved = localStorage.getItem('historialPesos');
    return saved ? JSON.parse(saved) : [];
  });

  // El useEffect para cargar datos persistidos ya no es necesario aquí,
  // ya que se maneja en la inicialización de useState.
  // Sin embargo, si hubiera otras dependencias o lógica de carga que no fuera solo inicial,
  // se mantendría un useEffect separado.

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
      <header className="App-header">
        <div className="brand-logo-text">Mamás con <span>Fundamento</span></div>
        <div>
          <h1 style={{ fontSize: '1.5em', marginTop: '10px' }}>Monitoreo Gestacional MINSA</h1>
          <p>Basado en la Guía Técnica para la Valoración Nutricional Antropométrica</p>
        </div>
        {imcData && (
          <button onClick={handleReset} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 15px', borderRadius: 'var(--radius-app)', cursor: 'pointer', alignSelf: 'flex-end', marginTop: '-30px' }}>
            Reiniciar Datos
          </button>
        )}
      </header>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'monitoreo' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitoreo')}
        >
          📊 Panel de Monitoreo
        </button>
        <button
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          🧠 Preguntas Frecuentes
        </button>
      </div>

      {activeTab === 'monitoreo' && (
        <main className="main-grid">
          {/* Panel Izquierdo: Cálculos Iniciales y Metas */}
          <section className="left-panel">
            {!imcData ? (
              <IMCPreCalculator onCalculate={handleCalculateIMC} />
            ) : (
              <div className="profile-summary-card form-card" style={{ background: 'var(--color-bg-lavender)', borderLeft: '5px solid var(--color-primary)' }}>
                <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>👩‍🍼 Tu Perfil Nutricional</h2>
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

      {activeTab === 'faq' && (
        <main style={{ marginTop: '20px' }}>
          <div className="form-card" style={{ maxWidth: '900px', margin: '0 auto', borderTop: '4px solid var(--color-success)' }}>
            <FAQSection />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
