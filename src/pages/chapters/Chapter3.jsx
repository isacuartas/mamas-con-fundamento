import React from 'react';

function Chapter3() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 3
            </h3>
            <h1 style={{ marginTop: 0 }}>El Universo del DHA</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "El alimento maestro del cerebro y la retina"
            </div>

            <p>
                Este nutriente merece su propio espacio porque es el que marca la diferencia en el desarrollo cognitivo de tu bebé.
            </p>

            <h2>El DHA en tu línea de tiempo: ¿Qué pasa en cada etapa?</h2>
            <p>
                Como experta, quiero que veas el desarrollo de tu bebé como una obra de construcción de alta precisión. El DHA es el material premium que se necesita en diferentes cantidades según la fase de la obra:
            </p>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: 'var(--color-success)' }}>1. Primer Trimestre: La base del diseño</h3>
                <p>En esta etapa, aunque tu bebé es apenas del tamaño de una ciruela, se está diseñando el tubo neural y las primeras conexiones de lo que será su sistema nervioso central.</p>
                <ul>
                    <li><strong>Qué sucede:</strong> El DHA es fundamental para la división celular y la formación de las membranas de las neuronas.</li>
                    <li><strong>El reto:</strong> Es la etapa de las náuseas y el fastidio al pescado. Por eso, si no puedes comerlo, tus reservas previas y una suplementación de alta calidad son tu "seguro de vida" para que esa fase de diseño no tenga fallos por falta de material.</li>
                </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: 'var(--color-success)' }}>2. Segundo Trimestre: La gran conexión</h3>
                <p>Aquí es donde el cerebro empieza a crecer en volumen y a especializarse.</p>
                <ul>
                    <li><strong>Qué sucede:</strong> Se disparan los procesos de neurogénesis (creación de nuevas neuronas) y empieza la formación de la retina. El bebé empieza a acumular DHA en sus tejidos, pero de forma gradual.</li>
                    <li><strong>Tu ventaja:</strong> Es el momento en que generalmente te sientes mejor. Es la "ventana de oportunidad" para recargar tus depósitos de Omega-3 a través de la alimentación y asegurar que la placenta tenga un flujo constante para enviarle al bebé.</li>
                </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: '#e74c3c' }}>3. Tercer Trimestre: La extracción implacable</h3>
                <p>Esta es la fase crítica de la que hablábamos. El crecimiento cerebral es exponencial.</p>
                <ul>
                    <li><strong>Qué sucede:</strong> El feto se vuelve un "extractor" voraz. Toma entre 50 y 70 mg diarios de tu sangre para terminar de cablear la corteza cerebral y la visión.</li>
                    <li><strong>El riesgo para ti:</strong> Si en este punto no consumes los 200-300 mg diarios recomendados, el bebé no se quedará sin nada; <strong>él lo sacará de tus propios depósitos</strong> (incluyendo tu tejido cerebral). Esto es lo que la ciencia relaciona con la "niebla mental" o <em>mom brain</em> (pérdida de memoria y falta de concentración) y con un mayor riesgo de depresión postparto.</li>
                </ul>
            </div>

            <div style={{
                margin: '40px 0',
                padding: '25px',
                backgroundColor: '#fef9e7',
                border: '1px solid #f1c40f',
                borderRadius: '12px'
            }}>
                <h3 style={{ color: '#d35400', marginTop: 0 }}>⚠️ La trampa de las semillas</h3>
                <p style={{ margin: 0 }}>
                    Quiero que entiendas un dato técnico crucial: mucha gente confía en la chía o la linaza para obtener Omega-3. Sin embargo, la conversión del Omega-3 vegetal (ALA) al que el bebé realmente necesita (DHA) <strong>es menor al 1%</strong>. No puedes construir el cerebro de tu hijo basándote en una conversión tan ineficiente. Necesitas de 200 a 300 mg diarios de DHA preformado.
                </p>
            </div>

        </div>
    );
}

export default Chapter3;
