import React, { useState } from 'react';

/**
 * Componente: IMCPreCalculator
 * 
 * Lógica: Calcular IMC = peso / talla^2
 * Input: peso_pregestacional (kg) y talla (m)
 * Clasificación (Output):
 *  < 18.5: "Delgadez"
 *  18.5 - 24.9: "Normal"
 *  25.0 - 29.9: "Sobrepeso"
 *  ≥ 30.0: "Obesidad"
 */
const IMCPreCalculator = ({ onCalculate }) => {
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!peso || !talla) return;

    const pesoNum = parseFloat(peso);
    const tallaCm = parseFloat(talla);

    // Validar entradas básicas
    if (pesoNum <= 0 || tallaCm <= 0) return;

    // Convertir cm a metros para el cálculo oficial
    const tallaNum = tallaCm / 100;

    // Calcular IMC = peso / talla^2
    const imc = pesoNum / (tallaNum * tallaNum);

    // Clasificación MINSA
    let clasificacion = "";
    if (imc < 18.5) {
      clasificacion = "Delgadez";
    } else if (imc >= 18.5 && imc <= 24.9) {
      clasificacion = "Normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
      clasificacion = "Sobrepeso";
    } else if (imc >= 30.0) {
      clasificacion = "Obesidad";
    }

    const data = {
      imc: imc.toFixed(2),
      clasificacion,
      peso: pesoNum,
      talla: tallaNum // Guardamos en metros en el estado para consistencia con el resto de la app
    };

    setResultado(data);

    // Emitir el resultado al componente padre (o al store)
    if (onCalculate) {
      onCalculate(data);
    }
  };

  return (
    <div className="imc-calculator-card">
      <h2>Calculadora de IMC Pregestacional (MINSA)</h2>
      <form onSubmit={handleCalculate}>
        <div>
          <label>Peso Pregestacional (kg):</label>
          <input
            type="number"
            step="0.01"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ej. 65.5"
            required
          />
        </div>
        <div>
          <label>Talla (cm):</label>
          <input
            type="number"
            step="1"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            placeholder="Ej. 160"
            required
          />
        </div>
        <button type="submit">Calcular IMC Inicial</button>
      </form>

      {resultado && (
        <div className="imc-result">
          <h3>Resultados:</h3>
          <p><strong>IMC:</strong> {resultado.imc}</p>
          <p><strong>Clasificación:</strong> {resultado.clasificacion}</p>
        </div>
      )}
    </div>
  );
};

export default IMCPreCalculator;
