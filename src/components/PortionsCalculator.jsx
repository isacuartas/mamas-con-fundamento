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

        // 1. Calcular TMB (Mifflin-St Jeor para mujeres, asumiendo 30 años promedio)
        const age = 30;
        const tmb = (10 * weight) + (6.25 * heightCm) - (5 * age) - 161;

        // 2. Multiplicador de Actividad y Proteína
        const actLevel = parseFloat(activityLevel);
        let proteinMultiplier = 1.1;
        if (actLevel === 1.2) proteinMultiplier = 1.1; // Sedentaria
        else if (actLevel === 1.3) proteinMultiplier = 1.2; // Ligera (Caminar)
        else if (actLevel === 1.5) proteinMultiplier = 1.5; // Moderada (Ej. Pilates)
        else if (actLevel >= 1.6) proteinMultiplier = 1.6; // Activa (Ej. Pesas)

        // 3. Calorías Totales = TMB * Actividad + Calorías Extra de Embarazo
        let extraCalories = 0;
        if (trimester === "2") extraCalories = 340;
        if (trimester === "3") extraCalories = 450;

        const totalCalories = (tmb * actLevel) + extraCalories;

        // 4. Calcular Macros Mínimos y Necesarios
        // - Carbohidratos Mínimos para embarazadas: 175g
        const carbsGrams = 175;
        const carbsCalories = carbsGrams * 4;

        // - Proteína según peso actual y actividad
        const proteinGrams = weight * proteinMultiplier;
        const proteinCalories = proteinGrams * 4;

        // - Grasas: El resto de las calorías
        let fatCalories = totalCalories - carbsCalories - proteinCalories;
        // Si las calorías de grasa son muy bajas (ej. paciente muy delgada o baja), garantizar un mínimo saludable
        if (fatCalories < (totalCalories * 0.25)) {
            fatCalories = totalCalories * 0.25;
        }
        const fatGrams = fatCalories / 9;

        // 5. Dividir en 4 tomas (Desayuno, Almuerzo, Snack, Cena)
        const meals = 4;
        return {
            totalCalories: Math.round(totalCalories),
            protein: Math.round(proteinGrams),
            carbs: carbsGrams,
            fat: Math.round(fatGrams),
            perMeal: {
                protein: Math.round(proteinGrams / meals),
                carbs: Math.round(carbsGrams / meals),
                fat: Math.round(fatGrams / meals)
            }
        };
    };

    const macros = calculateNutrition();

    return (
        <div className="form-card" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '5px solid var(--color-success)', background: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', margin: '0 0 10px 0' }}>🍽️ Mis Porciones Premium</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginTop: 0 }}>
                    Cantidades calculadas científicamente para tu embarazo basadas en tu peso reportado ({currentWeight} kg).
                </p>
            </div>

            {/* Controles de Configuración */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px', background: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>Trimestre Actual</label>
                    <select
                        value={trimester}
                        onChange={(e) => setTrimester(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    >
                        <option value="1">1er Trimestre (Semanas 1-13)</option>
                        <option value="2">2do Trimestre (Semanas 14-27)</option>
                        <option value="3">3er Trimestre (Semanas 28-40+)</option>
                    </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>Actividad Física</label>
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                    >
                        <option value="1.2">Sedentaria / Reposo</option>
                        <option value="1.3">Ligera (Caminatas suaves)</option>
                        <option value="1.5">Moderada (Yoga, Pilates, Natación)</option>
                        <option value="1.6">Activa (Entrenamiento con pesas)</option>
                    </select>
                </div>
            </div>

            {/* Resultados Totales */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>~{macros.totalCalories}</div>
                    <div style={{ color: '#92400e', fontWeight: '500' }}>Kcal Diarias</div>
                </div>
                <div style={{ background: '#e0e7ff', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4f46e5' }}>{macros.protein}g</div>
                    <div style={{ color: '#3730a3', fontWeight: '500' }}>Proteínas</div>
                </div>
                <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>{macros.carbs}g</div>
                    <div style={{ color: '#14532d', fontWeight: '500' }}>Carbohidratos</div>
                </div>
                <div style={{ background: '#ffe4e6', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e11d48' }}>{macros.fat}g</div>
                    <div style={{ color: '#9f1239', fontWeight: '500' }}>Grasas</div>
                </div>
            </div>

            {/* Traducción al Plato (4 Tomas) */}
            <div>
                <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: 'var(--color-primary)' }}>
                    🍽️ Traducido a tu Plato (En 4 comidas principales)
                </h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Para alcanzar tus metas, intenta que tu <strong>Desayuno, Almuerzo, Snack Fuerte y Cena</strong> contengan aproximadamente estas cantidades en cada comida:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ border: '1px solid #e0e7ff', borderRadius: '12px', padding: '15px', position: 'relative' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🥩 Proteína
                        </h4>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{macros.perMeal.protein}g</div>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                            Equivale a ~{Math.round(macros.perMeal.protein * 4)}g de pollo/carne cruda, o {Math.round(macros.perMeal.protein / 6)} a {Math.round(macros.perMeal.protein / 6) + 1} huevos.
                        </p>
                    </div>

                    <div style={{ border: '1px solid #dcfce7', borderRadius: '12px', padding: '15px', position: 'relative' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🍚 Carbohidratos
                        </h4>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{macros.perMeal.carbs}g</div>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                            Manteniendo el mínimo de 175g de embarazo. Aprox. 1 porción equivalente a un puño abierto y medio.
                        </p>
                    </div>

                    <div style={{ border: '1px solid #ffe4e6', borderRadius: '12px', padding: '15px', position: 'relative' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#e11d48', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🥑 Grasas
                        </h4>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{macros.perMeal.fat}g</div>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                            Para hormonas y cerebro del bebé. Aprox. 1/2 aguacate o 1 cucharada generosa de aceite de oliva.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.9rem', color: '#555', borderLeft: '4px solid #f59e0b' }}>
                <strong>Nota Importante:</strong> Estos valores son una excelente guía científica, pero cada cuerpo es único. Escucha tus señales de saciedad y hambre.
            </div>
        </div>
    );
};

export default PortionsCalculator;
