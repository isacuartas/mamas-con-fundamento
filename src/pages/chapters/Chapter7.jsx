import React from 'react';

function Chapter7() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 7
            </h3>
            <h1 style={{ marginTop: 0 }}>Seguridad Alimentaria: No corras riesgos innecesarios</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "Una hamburguesa bien cocida es un pequeño sacrificio por la tranquilidad de nueve meses."
            </div>

            <p>
                Durante el embarazo, tu sistema inmune se debilita ligeramente para no rechazar al bebé (después de todo, es genéticamente distinto a ti). Esto te hace mucho más vulnerable a las intoxicaciones alimentarias que podrían pasar directamente al feto a través de la placenta.
            </p>

            <h2>Ojos abiertos con las bacterias</h2>
            <p>
                Hay tres amenazas principales que debemos evitar a toda costa: <strong>Listeria, Salmonella y Toxoplasma.</strong>
            </p>

            <ul style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#333', marginBottom: '40px' }}>
                <li style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#e74c3c' }}>Carnes y Embutidos crudos/curados:</strong> Jabugo, salami, carpaccio, sushi... Todo necesita pasar por calor (al menos 75°C). La Listeria puede ser asintomática en la madre, pero devastadora para el feto.
                </li>
                <li style={{ marginBottom: '15px' }}>
                    <strong style={{ color: '#e74c3c' }}>Huevos crudos o semi-crudos:</strong> Adiós a la mayonesa casera, al merengue no horneado y al huevo frito con la yema líquida. El riesgo es la Salmonella.
                </li>
                <li>
                    <strong style={{ color: '#e74c3c' }}>Lácteos no pasteurizados:</strong> Quesos frescos, brie, camembert (si son de leche cruda) tienen riesgo de Listeria. Si un queso dice "Pasteurizado", puedes consumirlo sin miedo, aunque sea blando.
                </li>
            </ul>

            {/* IA Image Hook: Semáforo Pescado */}
            <div style={{ textAlign: 'center', margin: '50px 0' }}>
                <h2 style={{ color: 'var(--color-primary)' }}>El Semáforo de los Mares (Mercurio)</h2>
                <p style={{ textAlign: 'left', marginBottom: '20px' }}>
                    El pescado es maravilloso por el DHA (Capítulo 3), pero los peces muy grandes viven muchos años y acumulan metales pesados como el mercurio, que pueden ser neurotóxicos para el bebé. Usa esta guía visual para comprar:
                </p>

                <img
                    src="/assets/semaforo_pescado.png"
                    alt="Semáforo del pescado según nivel de mercurio"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                <div style={{ textAlign: 'left', marginTop: '20px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                    <p>🔴 <strong>Rojo (Prohibidos):</strong> Tiburón, Pez Espada, Marlín, Atún Rojo (el grande). Tienen demasiado mercurio.</p>
                    <p>🟡 <strong>Amarillo (Moderación):</strong> Atún enlatado (Elige "Light" sobre blanco). Máximo 1 a 2 latitas por semana.</p>
                    <p>🟢 <strong>Verde (Libres y recomendados):</strong> Salmón (la mejor opción), Trucha, Tilapia, Camarones, Sardinas. Son peces más pequeños de ciclos de vida cortos y con poco riesgo.</p>
                </div>
            </div>

        </div>
    );
}

export default Chapter7;
