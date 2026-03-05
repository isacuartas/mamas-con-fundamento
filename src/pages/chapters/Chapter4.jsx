import React from 'react';

function Chapter4() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 4
            </h3>
            <h1 style={{ marginTop: 0 }}>Microbiota Intestinal</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "Tu primer regalo de inmunidad: Sembrando salud desde el vientre"
            </div>

            <p>
                Como hemos visto, tu bebé recibe de ti oxígeno y nutrientes, pero hay algo más que estás "heredando" en cada bocado: tus bacterias. La microbiota (el ecosistema de microorganismos que vive en tu intestino y en tu canal vaginal) es el primer sistema de defensa que tu hijo conocerá.
            </p>

            <h2>1. El vínculo madre-hijo: Más que una herencia</h2>
            <p>
                Durante años se pensó que el útero era un ambiente estéril, pero hoy sabemos que hay una comunicación constante. Tu microbiota "educa" al sistema inmune de tu bebé mientras se desarrolla. Una madre con una microbiota equilibrada le entrega a su hijo una "base de datos" de bacterias buenas que lo protegen contra enfermedades inflamatorias, asma y alergias en el futuro.
            </p>

            {/* IA Image Hook: Microbiota */}
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <img
                    src="/assets/microbiota_embarazo.png"
                    alt="Ilustración del Eje Intestino-Placenta"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <p style={{ fontSize: '0.85em', color: '#888', marginTop: '10px', fontStyle: 'italic' }}>
                    El Eje Intestino-Placenta: Cómo tus bacterias viajan y programan la inmunidad fetal.
                </p>
            </div>

            <h2>2. Cepas con "Fundamento" (Qué buscar y por qué)</h2>
            <p>
                No todos los probióticos son iguales. Gracias a la ciencia, hoy podemos identificar cepas específicas (con nombre y apellido) que cumplen misiones puntuales durante el embarazo:
            </p>

            <ul>
                <li style={{ marginBottom: '15px' }}>
                    <strong style={{ color: 'var(--color-primary)' }}>Lactobacillus rhamnosus GG (LGG):</strong> Es el estándar de oro en pediatría y obstetricia. Su misión principal es reducir el riesgo de que tu bebé desarrolle eczema (dermatitis) y alergias alimentarias durante sus primeros años de vida.
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <strong style={{ color: 'var(--color-primary)' }}>Bifidobacterium lactis BB-12:</strong> Esta cepa es tu gran aliada metabólica. Ayuda a que tu cuerpo gestione mejor el azúcar en sangre, reduciendo el riesgo de inflamación sistémica y apoyando el control glucémico materno.
                </li>
                <li>
                    <strong style={{ color: 'var(--color-primary)' }}>Lactobacillus reuteri RC-14:</strong> Vital para la salud vaginal. Mantener esta zona equilibrada es clave para prevenir infecciones durante el embarazo y asegurar que, en un parto vaginal, el bebé se "bañe" de las bacterias adecuadas que colonizarán su propio sistema.
                </li>
            </ul>

            <h2>3. La Ciencia de la Dosis: ¿Cuánto es necesario?</h2>
            <p>
                En el mundo de los probióticos hablamos de CFU (Unidades Formadoras de Colonias). Para una gestación saludable, los estudios sugieren dosis de entre <strong>5 y 10 billones de CFU</strong> al día.
            </p>
            <p>
                No caigas en la trampa de los suplementos que prometen 30 o 50 cepas diferentes. En el embarazo, <em>menos es más</em>. La ciencia respalda fórmulas de 1 a 5 cepas bien estudiadas. Buscamos un equipo de especialistas, no una multitud.
            </p>

            <h2>4. Cómo cultivar tu "jardín interno"</h2>
            <p>Tener una buena microbiota no depende solo de una cápsula; depende de cómo alimentas a esas bacterias.</p>

            <ul>
                <li><strong>Los Prebióticos (El abono):</strong> Incluye ajo, cebolla, banano, espárragos y avena. Estos actúan como fertilizante para que tus bacterias crezcan fuertes.</li>
                <li><strong>Alimentos Fermentados:</strong> El yogur natural, el kéfir o la kombucha son fuentes naturales de bacterias vivas.</li>
                <li><strong>Los "Pesticidas":</strong> El exceso de azúcar refinada y el estrés crónico alteran el equilibrio de tu microbiota.</li>
            </ul>

            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'var(--color-bg-lavender)', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-primary)', margin: 0 }}>El mensaje final</h3>
                <p style={{ margin: '10px 0 0 0' }}>
                    Cuando eliges comida real y cuidas tu digestión, no solo estás evitando pesadez. Estás sembrando la semilla de la salud de tu hijo. Una microbiota sana es el regalo de inmunidad más valioso que puedes darle antes de que nazca.
                </p>
            </div>

        </div>
    );
}

export default Chapter4;
