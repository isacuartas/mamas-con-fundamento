import React, { useState } from 'react';

const PortionsCalculator = ({ patientData, historialMonitoreo }) => {

    // Extraer pesos y semanas (declarados antes de los hooks y returns)
    const currentWeightOriginal = historialMonitoreo && historialMonitoreo.length > 0
        ? historialMonitoreo[historialMonitoreo.length - 1].peso
        : (patientData ? patientData.peso : 60);

    const currentWeekOriginal = historialMonitoreo && historialMonitoreo.length > 0
        ? historialMonitoreo[historialMonitoreo.length - 1].semana
        : 10;

    let defaultTrimesterOriginal = "1";
    if (currentWeekOriginal >= 14 && currentWeekOriginal < 28) defaultTrimesterOriginal = "2";
    if (currentWeekOriginal >= 28) defaultTrimesterOriginal = "3";

    // HOOKS en el top level
    const [trimester, setTrimester] = useState(defaultTrimesterOriginal);
    const [activityLevel, setActivityLevel] = useState("1.2"); // 1.2 = Sedentario por defecto
    const [age, setAge] = useState("30");
    const [proteinFactor, setProteinFactor] = useState("1.5");
    const [minCarbs, setMinCarbs] = useState("175");
    const [calculatedMacros, setCalculatedMacros] = useState(null);

    // Si no hay perfil, mostramos un mensaje de bloqueo
    if (!patientData) {
        return (
            <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px', textAlign: 'center', color: '#6c757d', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
                <h3>Calculadora Bloqueada</h3>
                <p>⬅️ Ingresa tus datos pregestacionales en el Panel de Monitoreo primero para usar la calculadora de porciones.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '15px', fontStyle: 'italic' }}>
                    Descubre exactamente cuánta proteína, carbohidratos y grasas necesitas comer cada día basándonos en tu trimestre, actividad y peso actual.
                </p>
            </div>
        );
    }

    // Usar datos seguros
    const currentWeight = currentWeightOriginal;


    // Lógica Matemática de la Calculadora Premium
    const calculateNutrition = () => {
        const weight = parseFloat(currentWeight);
        const heightCm = parseFloat(patientData.talla) * 100;

        // 1. Calcular TMB
        const ageVal = parseFloat(age) || 30;
        const tmb = (10 * weight) + (6.25 * heightCm) - (5 * ageVal) - 161;

        // 2. Multiplicador de Actividad y Proteína
        const actLevel = parseFloat(activityLevel);
        const proteinMultiplier = parseFloat(proteinFactor);

        // 3. Calorías Totales = TMB * Actividad + Calorías Extra de Embarazo
        let extraCalories = 0;
        if (trimester === "2") extraCalories = 340;
        if (trimester === "3") extraCalories = 450;

        const totalCalories = (tmb * actLevel) + extraCalories;

        // 4. Calcular Macros
        const carbsGrams = parseFloat(minCarbs) || 175;
        const carbsCalories = carbsGrams * 4;

        const proteinGrams = weight * proteinMultiplier;
        const proteinCalories = proteinGrams * 4;

        let fatCalories = totalCalories - carbsCalories - proteinCalories;
        // Mínimo de grasas
        if (fatCalories < (totalCalories * 0.25)) {
            fatCalories = totalCalories * 0.25;
        }
        const fatGrams = fatCalories / 9;

        return {
            totalCalories: Math.round(totalCalories),
            protein: Math.round(proteinGrams),
            carbs: carbsGrams,
            fat: Math.round(fatGrams)
        };
    };

    const handleCalculate = () => {
        setCalculatedMacros(calculateNutrition());
    };

    return (
        <div className="form-card" style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(106, 90, 205, 0.05)' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--color-primary)', fontSize: '1.8rem', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🍽️ Calculadora de Macros "Mis Porciones"
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginTop: 0 }}>
                    Basado en tu último peso registrado ({currentWeight} kg) y estatura ({patientData.talla} m), ajusta tus datos actuales para conocer tus requerimientos de macronutrientes.
                </p>
            </div>

            {/* Formulario en Grid 3x2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>Tu Edad (Años)</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>Trimestre Cursando</label>
                    <select
                        value={trimester}
                        onChange={(e) => setTrimester(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    >
                        <option value="1">Primer Trimestre (Base)</option>
                        <option value="2">Segundo Trimestre (+340 kcal)</option>
                        <option value="3">Tercer Trimestre (+450 kcal)</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>Nivel de Actividad Diaria</label>
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    >
                        <option value="1.2">Sedentaria (Poco ejercicio)</option>
                        <option value="1.3">Ligera (Caminar, rutinas suaves)</option>
                        <option value="1.5">Moderada (Pilates/Pesas 3-5 días)</option>
                        <option value="1.6">Activa (Deporte intenso diario)</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>Factor Proteína (g por kg)</label>
                    <select value={proteinFactor} onChange={(e) => setProteinFactor(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}>
                        <option value="1.1">1.1 g/kg (Base embarazo)</option>
                        <option value="1.2">1.2 g/kg (Ligera actividad)</option>
                        <option value="1.5">1.5 g/kg (Activa / Pilates / Pesas)</option>
                        <option value="1.6">1.6 g/kg (Muy Activa)</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '8px' }}>Carbohidratos Mínimos (g)</label>
                    <input
                        type="number"
                        value={minCarbs}
                        onChange={(e) => setMinCarbs(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                    <small style={{ color: '#888', display: 'block', marginTop: '5px' }}>Mínimo sugerido: 175g</small>
                </div>
            </div>

            <button
                onClick={handleCalculate}
                style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(106, 90, 205, 0.3)'
                }}>
                Calcular Mis Requerimientos
            </button>

            {/* Resultados */}
            {calculatedMacros && (
                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '2px solid #eee' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                        <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>~{calculatedMacros.totalCalories}</div>
                            <div style={{ color: '#92400e', fontWeight: '500' }}>Kcal Diarias</div>
                        </div>
                        <div style={{ background: '#e0e7ff', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4f46e5' }}>{calculatedMacros.protein}g</div>
                            <div style={{ color: '#3730a3', fontWeight: '500' }}>Proteínas</div>
                        </div>
                        <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>{calculatedMacros.carbs}g</div>
                            <div style={{ color: '#14532d', fontWeight: '500' }}>Carbohidratos</div>
                        </div>
                        <div style={{ background: '#ffe4e6', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e11d48' }}>{calculatedMacros.fat}g</div>
                            <div style={{ color: '#9f1239', fontWeight: '500' }}>Grasas</div>
                        </div>
                    </div>

                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#555', borderLeft: '4px solid #f59e0b' }}>
                        <strong>Nota Importante:</strong> Estos valores son una excelente guía científica, pero cada cuerpo es único. Escucha tus señales de saciedad y hambre.
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortionsCalculator;
