import React from 'react';

function Chapter2() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 2
            </h3>
            <h1 style={{ marginTop: 0 }}>Los Pilares de la Nutrición Gestacional</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "Mucho más que simples consejos"
            </div>

            <p>
                En este capítulo vamos a profundizar en los cimientos biológicos de tu embarazo. No son sugerencias, son los requerimientos técnicos que tu cuerpo y tu bebé exigen para funcionar al 100%.
            </p>

            {/* Pilar 1 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    💧 Pilar 1: El agua no es solo para la sed
                </h2>
                <p><strong>Es para fabricar sangre.</strong> Durante el embarazo, tu volumen de sangre aumenta aproximadamente un 50%. Necesitas esa sangre extra para irrigar la placenta y para que el líquido amniótico se renueve constantemente.</p>
                <ul>
                    <li><strong>El Fundamento:</strong> Si dejas de hidratarte, tu cuerpo entra en modo "ahorro" y retiene líquidos, lo que irónicamente te hace sentir más hinchada (edema).</li>
                    <li><strong>En la Práctica:</strong> Monitorea el color de tu orina: debe parecer limonada clarita. Si es oscura, tu bebé y tu sistema circulatorio necesitan agua de inmediato.</li>
                </ul>
            </div>

            {/* Pilar 2 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🥑 Pilar 2: Gestión de la Motilidad Gastrointestinal
                </h2>
                <p>La progesterona relaja tus intestinos para asegurar que los nutrientes tengan más tiempo de absorberse. El efecto secundario es que la digestión va "a paso de tortuga".</p>
                <ul>
                    <li><strong>El Fundamento:</strong> Al moverse todo más lento, la comida se queda "haciendo fila", causando pesadez y gases.</li>
                    <li><strong>En la Práctica:</strong> La solución es mecánica: fibra y movimiento. Asegura fibra soluble e insoluble (frutas con cáscara, legumbres, semillas) y camina diariamente. Es el motor externo que tu intestino necesita.</li>
                </ul>
            </div>

            {/* Pilar 3 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🩸 Pilar 3: El Hierro y la Logística del Oxígeno
                </h2>
                <p>Este es el pilar crítico de tus niveles de energía. Necesitas aproximadamente 1000 mg de hierro en total: 270 mg para el feto, 90 mg para la placenta y 450 mg para expandir tu propia sangre.</p>
                <ul>
                    <li><strong>El Fundamento:</strong> Sin hierro no hay glóbulos rojos, y sin ellos no hay oxígeno para tu bebé. La anemia gestacional causa fatiga crónica y aumenta riesgos en el parto.</li>
                    <li><strong>En la Práctica (Potencia):</strong> Acompaña el hierro con Vitamina C (guayaba, kiwi, cítricos). Solo 75 mg de Vitamina C pueden triplicar la absorción.</li>
                    <li><strong>En la Práctica (Separa):</strong> El café, el té y los lácteos bloquean el hierro. Espera al menos 2 horas después de almorzar para consumirlos.</li>
                </ul>
            </div>

            {/* Pilar 4 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    ⚡ Pilar 4: Estabilidad Glucémica y Energía Cerebral
                </h2>
                <p>Para evitar sentirte como un "zombie" o tener cambios de humor bruscos, debemos evitar los picos de azúcar.</p>
                <ul>
                    <li><strong>El Fundamento:</strong> El cerebro de tu bebé usa glucosa de forma casi exclusiva. Necesitas un mínimo de 175 g de carbohidratos al día para evitar la cetosis materna (un estado donde quemas grasa de forma ineficiente que no es ideal para el bebé).</li>
                    <li><strong>En la Práctica:</strong> Nunca consumas un carbohidrato solo. Acompáñalo siempre con proteína o grasa (ej: fruta con yogur griego o arepa con huevo). Esto hace que la energía entre a tu sangre de forma lenta y constante.</li>
                </ul>
            </div>

            {/* Pilar 5 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🦴 Pilar 5: Calcio y Vitamina D (La regla en Colombia)
                </h2>
                <p>En Colombia, la norma de salud (Resolución 3280) exige la suplementación con 1.200 mg de calcio al día desde la semana 14.</p>
                <ul>
                    <li><strong>El Fundamento:</strong> Si no consumes suficiente, el bebé "sacará" el calcio de tus propios huesos. Además, en nuestro país, el calcio es vital para reducir el riesgo de preeclampsia.</li>
                    <li><strong>En la Práctica:</strong> La Vitamina D es la "llave" que mete el calcio al hueso. Incluye lácteos, frutos secos y asegúrate de recibir 10-15 minutos de sol diario.</li>
                </ul>
            </div>

            {/* Pilar 6 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🥩 Pilar 6: Proteínas (Tus ladrillos estructurales)
                </h2>
                <p>Es el nutriente que construye cada tejido del bebé y protege tu propia masa muscular.</p>
                <ul>
                    <li><strong>El SÍ para la mujer activa:</strong> Si haces pesas, caminas o haces Pilates, tus necesidades suben. El Pilates es resistencia y fuerza; tus músculos necesitan sustrato para recuperarse.</li>
                    <li><strong>El Fundamento:</strong> Olvida el 1.1 g/kg estándar. Para una mamá activa, el rango óptimo es de 1.2 a 1.6 g/kg de peso actual. A partir del segundo trimestre, suma al menos 25 g adicionales de proteína a tu día.</li>
                    <li><strong>En la Práctica:</strong> Asegura proteína de alto valor en cada comida para evitar la pérdida de músculo y controlar el hambre voraz.</li>
                </ul>
            </div>

            {/* Pilar 7 y 8 juntos por brevedad visual */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🥑 Pilar 7 y 8: Grasas y Magnesio
                </h2>
                <ul>
                    <li><strong>Grasas:</strong> Las grasas de calidad (aguacate, aceite de oliva, nueces) son el material de construcción del sistema nervioso y ayudan a la absorción de vitaminas (A, D, E, K). Dedicaremos un capítulo entero al DHA.</li>
                    <li><strong>Magnesio:</strong> El cuerpo lo consume muy rápido. Relaja los músculos y su déficit causa calambres nocturnos e insomnio. Incluye semillas de calabaza y almendras.</li>
                </ul>
            </div>

            {/* Pilar 9 */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    🧂 Pilar 9: El Equilibrio de Líquidos (Sodio y Potasio)
                </h2>
                <p>No quites la sal por miedo a la hinchazón; el equilibrio es lo que importa.</p>
                <ul>
                    <li><strong>El Fundamento:</strong> Si hay poco potasio, el cuerpo retiene agua fuera de las células (edema).</li>
                    <li><strong>En la Práctica:</strong> Acompaña el uso moderado de sal marina con alimentos ricos en potasio (banano, agua de coco, papa). Esto ayuda a que el agua se quede dentro de tus células y no en tus tobillos.</li>
                </ul>
            </div>
        </div>
    );
}

export default Chapter2;
