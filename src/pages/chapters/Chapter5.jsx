import React from 'react';

function Chapter5() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 5
            </h3>
            <h1 style={{ marginTop: 0 }}>Traduciendo la ciencia al plato</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "La teoría es perfecta, pero el embarazo se vive comiendo"
            </div>

            <p>
                Hasta aquí hemos hablado de bioquímica, de requerimientos y de la microbiota. Pero a menos que seas nutricionista, sentarte a almorzar pensando en "gramos de magnesio" o "miligramos de DHA" es la receta perfecta para el estrés.
            </p>

            <h2>El Método del Plato con Fundamento</h2>
            <p>
                Para simplificarte la vida, creé una guía visual. Cada vez que te sientes a almorzar o a cenar, tu plato debería verse (a nivel de proporciones, no de conteo estricto) como un ecosistema donde todo tiene un propósito.
            </p>

            {/* IA Image Hook: Plato */}
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <img
                    src="/assets/plato_saludable_embarazo.png"
                    alt="Fotografía de un plato balanceado con pollo, camote y ensalada"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <p style={{ fontSize: '0.85em', color: '#888', marginTop: '10px', fontStyle: 'italic' }}>
                    Proteína como base, fibra para tu microbiota y energía de lenta absorción (camote/batata).
                </p>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--color-success)' }}>1. El 50%: Color y Fibra (Vegetales y Frutas)</h3>
                <p>La mitad de tu plato debe llenarse de vida. Aquí están las vitaminas, los antioxidantes y la famosa fibra insoluble que "barre" tu intestino para evitar el estreñimiento.</p>
                <ul>
                    <li><strong>Regla de oro:</strong> Cuantos más colores, mejor. No te quedes solo en la lechuga. Agrega zanahoria rallada, tomate, remolacha, brócoli, calabacín.</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--color-primary)' }}>2. El 25%: Tus "Ladrillos" (Proteína)</h3>
                <p>Esa cuarta parte del plato es innegociable. Si falta la proteína, a la hora vas a tener hambre y tu azúcar en sangre va a saltar.</p>
                <ul>
                    <li><strong>Fuentes:</strong> Pollo, huevos, carne de res, pescados bajos en mercurio, lentejas, garbanzos, tofu.</li>
                    <li><strong>El truco:</strong> Si comes de origen vegetal (leguminosas), asegúrate de acompañar con vitamina C (un chorro de limón) para absorber el hierro no hemo.</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#f39c12' }}>3. El 25%: Energía Lenta (Carbohidratos Complejos)</h3>
                <p>Aquí es donde las cosas suelen fallar. No necesitas una torre de arroz blanco ni comer pasta hasta reventar. Necesitas un carbohidrato que libere energía despacito.</p>
                <ul>
                    <li><strong>Los campeones:</strong> Papa con cáscara, yuca, batata/camote, plátano verde o maduro, quinoa, avena.</li>
                    <li><strong>¿Por qué?</strong> Porque si es complejo, el índice glucémico baja. Menos picos de azúcar = Menos antojos a media tarde.</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#27ae60' }}>4. El Toque Maestro: Las Grasas Buenas</h3>
                <p>No se miden por porciones gigantes en el plato, pero tienen que estar ahí. Son el aceite de oliva extra virgen, el medio aguacate acompañando la arepa, o el puñadito de almendras o nueces.</p>
            </div>

            <div style={{
                marginTop: '40px',
                padding: '25px',
                backgroundColor: '#fff',
                border: '1px solid #dcdde1',
                borderRadius: '12px'
            }}>
                <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>¿Qué pasa con los antojos?</h2>
                <p>Si durante la tarde mueres por un dulce o un helado, no es que no tengas fuerza de voluntad. En el 90% de los casos, significa que en el almuerzo te quedaste corta de proteína o de grasas buenas.</p>
                <p style={{ margin: 0 }}>
                    <strong>Solución técnica:</strong> Antes de culparte, revisa tu último plato principal. Si fue un "pico" glucémico (ej: un plato de pasta sola), tu cuerpo está exigiendo azúcar para mantener ese nivel y no "estrellarse". Dale estructura a tus comidas y esos picos se aplanarán.
                </p>
            </div>
        </div>
    );
}

export default Chapter5;
