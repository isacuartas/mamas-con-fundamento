import React from 'react';

function Chapter1() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', marginBottom: '5px' }}>
                Capítulo 1
            </h3>
            <h1>Calidad vs. Cantidad</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "No necesitas comer por dos, necesitas nutrirte mejor"
            </div>

            <p>
                Si hay un consejo que todas escuchamos apenas damos la noticia del embarazo es ese famoso: "Ahora tienes que comer por dos". Y aunque nos lo dicen con todo el amor del mundo, la realidad es que nuestro cuerpo no necesita el doble de volumen, sino <strong>el doble de calidad</strong>.
            </p>

            <h2>Olvídate de las calorías</h2>
            <p>
                A veces nos obsesionamos pensando en cuánta energía estamos metiendo al cuerpo, pero en el embarazo, el enfoque debe ser otro. No se trata de sumar números en una aplicación de nutrición, se trata de entender que <strong>la comida es información</strong>.
            </p>
            <p>
                Lo que eliges poner en tu plato hoy es el material con el que tu bebé está construyendo sus órganos, su cerebro y su sistema inmune.
            </p>

            <h2>La trampa del "llenar el hueco"</h2>
            <p>
                Es muy fácil caer en la tentación de comer cualquier cosa cuando el hambre aprieta (y créeme, sé lo que es tener hambre de embarazo). Pero aquí es donde entra la diferencia entre llenarse y nutrirse:
            </p>

            <ul style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#333', marginBottom: '30px' }}>
                <li style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#e74c3c' }}>Calorías vacías:</strong> Son esos alimentos que te quitan el hambre un ratito (como un paquete de galletas o un pan dulce) pero que no le aportan nada útil a tu bebé. Solo disparan tu energía un momento para luego dejarte más cansada y con ganas de seguir comiendo.
                </li>
                <li>
                    <strong style={{ color: 'var(--color-success)' }}>Densidad nutricional:</strong> Son los alimentos que realmente "trabajan" por ti. Una porción de proteína, unas grasas buenas como el aguacate o un puñado de frutos secos le están mandando a tu bebé hierro, calcio y grasas esenciales.
                </li>
            </ul>

            {/* Aquí irá la imagen generada por IA sobre el contraste Calorías vs Densidad */}
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <img
                    src="/assets/calorias_vs_densidad.png"
                    alt="Contraste entre alimentos con calorías vacías y alimentos con alta densidad nutricional"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    onError={(e) => { e.target.style.display = 'none'; }} // Hide if image is not generated yet
                />
                <p style={{ fontSize: '0.85em', color: '#888', marginTop: '10px', fontStyle: 'italic' }}>
                    Elige enviar información de calidad (derecha) en lugar de "tapar huecos" con energía de corta duración (izquierda).
                </p>
            </div>

            <h2>¿Cómo elegir en el día a día?</h2>
            <p>
                Mi invitación con este libro no es que te vuelvas una experta en nutrición, sino que aprendas a ver tu plato con otros ojos. En lugar de preguntarte <em>"¿Cuántas calorías tiene esto?"</em>, pregúntate: <strong>"¿Qué le estoy aportando a mi bebé con este bocado?"</strong>.
            </p>

            <p>
                Cuando priorizas la comida real, esa que viene de la tierra y no de un empaque, el cuerpo se regula solo. No necesitas estar pesando comida ni contando porciones; cuando le das al cuerpo los nutrientes que necesita, la saciedad llega sola y tú te sientes con más energía para disfrutar el proceso.
            </p>
        </div>
    );
}

export default Chapter1;
