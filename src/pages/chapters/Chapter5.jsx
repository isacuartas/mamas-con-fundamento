import React from 'react';

function Chapter5() {
    return (
        <div className="chapter-content">
            <h1>Capítulo 5: Traduciendo los datos al plato (Ejemplos Reales)</h1>
            <h2>"Si no lo puedes medir en crudo, no lo puedes controlar"</h2>
            <p>Entender la teoría es el primer paso, pero el éxito real ocurre cuando sabemos exactamente qué poner en el carrito del mercado y cómo servirlo en nuestra mesa. En este capítulo, vamos a bajar los números a porciones de comida real para que puedas planificar tus días con total confianza y sin estrés.</p>

            <h3>1. El Reto de la Proteína: Pesar en crudo es la clave</h3>
            <p>Para que este proceso sea preciso, mi recomendación es pesar los alimentos siempre en crudo. El agua es una variable engañosa: una proteína pierde peso dependiendo de si la haces a la plancha, al horno o al vapor, pero su valor nutricional en crudo es constante. Pesar antes de cocinar es la única forma de asegurar que los "ladrillos" que le estás enviando a tu bebé son los exactos que calculamos.</p>

            <h4>Tabla Resumen: Tu meta de proteína según tu peso y actividad</h4>
            <p>Busca tu peso actual y el nivel de proteína que mejor se adapte a tu día (1.1 si es un día tranquilo o de descanso, 1.6 si es un día de entrenamiento exigente, pesas o Pilates).</p>

            <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Peso actual (kg)</th>
                            <th>1.1 g/kg (Mantenimiento)</th>
                            <th>1.2 - 1.3 g/kg (Intermedio)</th>
                            <th>1.6 g/kg (Activa/Pilates)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>50 kg</td>
                            <td>55 g</td>
                            <td>60 - 65 g</td>
                            <td>80 g</td>
                        </tr>
                        <tr>
                            <td>60 kg</td>
                            <td>66 g</td>
                            <td>72 - 78 g</td>
                            <td>96 g</td>
                        </tr>
                        <tr>
                            <td>70 kg</td>
                            <td>77 g</td>
                            <td>84 - 91 g</td>
                            <td>112 g</td>
                        </tr>
                        <tr>
                            <td>80 kg</td>
                            <td>88 g</td>
                            <td>96 - 104 g</td>
                            <td>128 g</td>
                        </tr>
                        <tr>
                            <td>90 kg +</td>
                            <td>99 g</td>
                            <td>108 - 117 g</td>
                            <td>144 g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4>¿Cómo se ve esto en comida real? (Peso en Crudo):</h4>
            <p><strong>Día Activo (Meta: 96 g de proteína para una mujer de 60 kg):</strong></p>
            <ul>
                <li><strong>Desayuno:</strong> 2 huevos + 40 g de queso cuajada o campesino (20 g proteína).</li>
                <li><strong>Almuerzo:</strong> 150 g de carne de res magra o pechuga de pollo en crudo (~34 g proteína).</li>
                <li><strong>Snack:</strong> 1 vaso de yogur griego natural de 150 g (15 g proteína).</li>
                <li><strong>Cena:</strong> 125 g de salmón o lomo de cerdo en crudo (~27 g proteína).</li>
                <li><strong>Total:</strong> 96 g de proteína.</li>
            </ul>

            <hr />

            <h3>2. Carbohidratos: El combustible para el cerebro de tu bebé</h3>
            <p>Para evitar la cetosis y asegurar que el cerebro de tu bebé se desarrolle con energía constante, el requerimiento mínimo es de 175 g de carbohidratos al día. Aquí tienes cómo sumar esa cifra de forma inteligente:</p>

            <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Alimento</th>
                            <th>Medida Casera</th>
                            <th>Carbohidratos aprox.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arroz (blanco o integral)</td>
                            <td>1 taza cocida</td>
                            <td>45 g</td>
                        </tr>
                        <tr>
                            <td>Papa mediana</td>
                            <td>1 unidad (aprox. 150 g cruda)</td>
                            <td>26 g</td>
                        </tr>
                        <tr>
                            <td>Arepa de maíz mediana</td>
                            <td>1 unidad</td>
                            <td>20 g</td>
                        </tr>
                        <tr>
                            <td>Banano mediano</td>
                            <td>1 unidad</td>
                            <td>27 g</td>
                        </tr>
                        <tr>
                            <td>Fruta (Manzana o Pera)</td>
                            <td>1 unidad</td>
                            <td>22 g</td>
                        </tr>
                        <tr>
                            <td>Pasta</td>
                            <td>1 taza cocida</td>
                            <td>40 g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p><strong>Un día ejemplo para cumplir la meta:</strong> Una arepa al desayuno, una taza de arroz al almuerzo, un banano de snack, una papa a la cena y dos porciones de fruta distribuidas en el día te aseguran cubrir los requerimientos cerebrales de tu bebé.</p>

            <hr />

            <h3>3. Grasas Saludables: El balance de tu energía</h3>
            <p>Las grasas son el "ajuste" de tu ecuación nutricional. Una vez cubres tu proteína y tus carbohidratos mínimos, las grasas completan la energía que tú y tu bebé necesitan para que el sistema funcione sin fatiga.</p>

            <h4>Tabla de Grasas sugeridas por peso:</h4>
            <p>A medida que el peso corporal es mayor, la necesidad de energía para sostener el movimiento y el crecimiento fetal aumenta. Aquí tienes los rangos recomendados:</p>

            <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Peso actual (kg)</th>
                            <th>Grasa diaria sugerida (aprox.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>55 kg</td>
                            <td>90 - 100 g</td>
                        </tr>
                        <tr>
                            <td>65 kg</td>
                            <td>110 - 125 g</td>
                        </tr>
                        <tr>
                            <td>75 kg</td>
                            <td>135 - 145 g</td>
                        </tr>
                        <tr>
                            <td>85 kg +</td>
                            <td>155 - 165 g</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4>La Regla del Pulgar:</h4>
            <p>Para alcanzar estas cifras sin complicaciones, busca incluir 1 a 2 porciones de estas grasas en cada una de tus comidas:</p>
            <ul>
                <li><strong>Aguacate:</strong> 1/4 a 1/2 unidad al día.</li>
                <li><strong>Aceite de Oliva:</strong> 1 cucharada sopera (siempre en crudo sobre los platos servidos).</li>
                <li><strong>Nueces y semillas:</strong> Un puñado pequeño (lo que quepa en el centro de tu mano).</li>
                <li><strong>Mantequilla de frutos secos:</strong> 1 cucharada sopera.</li>
            </ul>

            <hr />

            <h3>4. Vitamina C: El "Enchufe" del Hierro</h3>
            <p>Como vimos en los pilares, el hierro necesita un ambiente ácido para absorberse. Necesitas 75 mg de Vitamina C en la misma comida donde consumas tu fuente de hierro.</p>

            <h4>Tus mejores opciones (especialmente en Colombia):</h4>
            <ul>
                <li><strong>1 Guayaba:</strong> 120 mg (Superas la meta con una sola fruta).</li>
                <li><strong>1 Kiwi:</strong> 70 mg.</li>
                <li><strong>1 Naranja:</strong> 70 mg.</li>
                <li><strong>1/2 taza de Fresas:</strong> 45 mg.</li>
            </ul>

            <p><strong>Regla de Oro:</strong> Si tu almuerzo tiene carne, pollo o granos (lentejas/frijoles), tu "postre" debe ser una de estas frutas. Evita el café, el té o los lácteos inmediatamente después de comer, ya que bloquean la entrada del hierro a tu organismo.</p>
        </div>
    );
}

export default Chapter5;
