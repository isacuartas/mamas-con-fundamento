import React from 'react';

function Chapter8() {
    return (
        <div className="chapter-content">
            <h1>Capítulo 8: El Método del Plato (Frecuencia y Digestión)</h1>
            <div className="chapter-subtitle-box">
                <h2>"Tu estómago cambia de forma, tu forma de comer también debería"</h2>
            </div>
            <p>Si hay algo que nadie te dice es que, en el embarazo, tu sistema digestivo se vuelve otro. Esa recomendación de "comer mucha ensalada" choca de frente con la realidad: el reflujo, las agrieras y esa sensación de que la comida se quedó "atrapada" en la garganta.</p>
            <p>En este capítulo vamos a entender por qué pasa esto y cómo ajustar tu plato para nutrirte sin terminar con malestar.</p>

            <h3>1. El Sabotaje de la Progesterona y el Espacio Físico</h3>
            <p>¿Por qué ahora todo te cae pesado? Hay dos razones técnicas:</p>
            <ul>
                <li><strong>La Hormona "Relajante":</strong> La progesterona relaja los músculos para que el útero no se contraiga, pero también relaja la válvula del esófago. Al quedar un poco "abierta", el ácido del estómago sube (reflujo). Además, ralentiza el movimiento de los intestinos.</li>
                <li><strong>La Falta de Espacio:</strong> A medida que tu bebé crece, empuja tu estómago hacia arriba y lo comprime. Literalmente, tienes menos espacio físico para que la comida se acomode.</li>
            </ul>

            <div className="image-placeholder">
                <img src="/images/ebook/estomago.png" alt="Comparativa de estómago normal y estómago comprimido en el tercer trimestre" className="ebook-image" />
            </div>

            <h3>2. El Dilema de la Ensalada: Volumen vs. Densidad</h3>
            <p>Comer una montaña de vegetales crudos puede ser contraproducente si te genera gases o "saciedad precoz" (sentirte llena con tres bocados).</p>
            <ul>
                <li><strong>Prefiere vegetales cocidos:</strong> La fibra cruda ocupa mucho volumen. Al cocinar los vegetales (al vapor o salteados), reducimos su tamaño físico pero mantenemos sus nutrientes.</li>
                <li><strong>No bebas mientras comes:</strong> El líquido aumenta el volumen en el estómago. Bebe agua 30 minutos antes o después de las comidas.</li>
                <li><strong>Fracciona:</strong> Es mejor hacer 5 comidas pequeñas con mucha nutrición que 3 platos gigantes que te dejen con malestar.</li>
            </ul>

            <h3>3. Enzimas Digestivas Naturales: Acelerando el proceso</h3>
            <p>A veces el problema no es el ácido, sino que la comida se queda "estancada" demasiado tiempo en el estómago, generando presión. Podemos usar la naturaleza a nuestro favor:</p>
            <ul>
                <li><strong>Papaya y Piña (con medida):</strong> La papaína (de la papaya) y la bromelina (de la piña) son enzimas que ayudan a romper las proteínas más rápido.</li>
                <li><strong>La regla de oro:</strong> Una porción grande (ej. un plato típico gigante con arroz, papa, plátano y carne) puede tomar hasta 5 horas en vaciarse de un estómago de embarazo. Las porciones pequeñas (densas en nutrientes) tardan unas 2 horas.</li>
            </ul>

            <div className="image-placeholder" style={{ marginTop: '20px' }}>
                <img src="/images/ebook/digestion.png" alt="Tiempos de digestión comparando plato alto en grasas vs método de densidad" className="ebook-image" />
            </div>

            <h3>4. Semáforo contra el Reflujo e Indigestión</h3>
            <p>Para que la comida no se "devuelva", aplica estas reglas de oro:</p>
            <ul>
                <li>⚠️ <strong>Cuidado con los irritantes:</strong> Picantes, cítricos en exceso y frituras relajan aún más la válvula del esófago.</li>
                <li>⏰ <strong>La regla de las 2 horas:</strong> Nunca te acuestes inmediatamente después de comer. Deja que la gravedad ayude a tu estómago.</li>
                <li>🛏️ <strong>Duerme sobre tu lado izquierdo:</strong> Por la anatomía del estómago (que tiene forma de J), dormir de este lado dificulta que el ácido suba.</li>
                <li>🌱 <strong>Ginger al rescate:</strong> El jengibre natural es el aliado número uno contra las náuseas y la digestión pesada.</li>
            </ul>

            <h3>5. El Plato Realista: ¿Cómo lo armamos?</h3>
            <p>Si la llenura es mucha, prioriza así:</p>
            <ol>
                <li><strong>Primero la Proteína (25%):</strong> Es lo más importante para el bebé.</li>
                <li><strong>Luego el Carbohidrato Compacto (25%):</strong> Arroz, papa o arepa.</li>
                <li><strong>Al final los Vegetales Cocidos:</strong> Ocupan el espacio que sobre.</li>
            </ol>

            <div className="image-placeholder">
                <img src="/images/ebook/plate.png" alt="Plato realista para el embarazo con proteínas, carbohidratos y vegetales" className="ebook-image" />
            </div>
        </div>
    );
}

export default Chapter8;
