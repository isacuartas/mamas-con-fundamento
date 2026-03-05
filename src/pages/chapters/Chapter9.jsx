import React from 'react';

function Chapter9() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 9
            </h3>
            <h1 style={{ marginTop: 0 }}>Recetario Práctico</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "Porque comer sano por dos nueve meses no debería ser aburrido."
            </div>

            <p>Aquí tienes tres recetas estrella, aprobadas nutricionalmente para darte densidad sin picos de glucosa.</p>

            {/* Receta 1: Smoothie */}
            <div style={{ marginTop: '40px' }}>
                <h2 style={{ color: 'var(--color-success)' }}>1. El "Shot" Anti-Náuseas y Pro-Hierro (Smoothie Verde)</h2>
                <img src="/assets/receta_smoothie_verde.png" alt="Smoothie Verde" style={{ width: '100%', borderRadius: '12px', marginBottom: '15px' }} />
                <p>Ideal para las mañanas difíciles. El jengibre asienta el estómago y la vitamina C del kiwi hace que el hierro de las espinacas se absorba al máximo.</p>
                <ul>
                    <li>1 puñado grande de espinaca baby (lavada)</li>
                    <li>1 kiwi pelado (Vitamina C)</li>
                    <li>1/2 manzana verde</li>
                    <li>1 rodajita pequeña de jengibre pelado (Anti-emético natural)</li>
                    <li>1 cucharada de semillas de chía o cáñamo (Fibra y aminoácidos)</li>
                    <li>Agua de coco o agua normal al gusto</li>
                </ul>
            </div>

            {/* Receta 2: Salmon */}
            <div style={{ marginTop: '40px' }}>
                <h2 style={{ color: 'var(--color-primary)' }}>2. Inyección de DHA: Salmón en Costra de Pistacho</h2>
                <img src="/assets/receta_salmon_costra.png" alt="Salmón con costra de pistacho" style={{ width: '100%', borderRadius: '12px', marginBottom: '15px' }} />
                <p>Una cena de restaurante hecha en 15 minutos. El Omega-3 supremo del salmón potenciado por las grasas saludables del pistacho.</p>
                <ul>
                    <li>1 filete de salmón fresco (Pescado de bajo mercurio - Verde)</li>
                    <li>2 cucharadas de pistachos pelados y machacados</li>
                    <li>1 cucharadita de mostaza Dijon</li>
                    <li>Gotas de limón, sal marina y pimienta</li>
                    <li><strong>Instrucciones:</strong> Unta la mostaza sobre el salmón, pega los pistachos encima haciendo presión y hornea (o usa AirFryer) a 200°C por 12-15 minutos. Acompaña con espárragos.</li>
                </ul>
            </div>

            {/* Receta 3: Mugcake */}
            <div style={{ marginTop: '40px' }}>
                <h2 style={{ color: '#f39c12' }}>3. El Antojo Controlado: Mugcake de Choco-Banano</h2>
                <img src="/assets/receta_mugcake_choco.png" alt="Mugcake de chocolate y banano" style={{ width: '100%', borderRadius: '12px', marginBottom: '15px' }} />
                <p>Para cuando mueres por un dulce a las 4pm, pero no quieres el bajón de energía posterior.</p>
                <ul>
                    <li>1/2 banano muy maduro (aplastado)</li>
                    <li>1 huevo entero (Colina para el cerebro del bebé)</li>
                    <li>2 cucharadas de harina de avena o almendras</li>
                    <li>1 cucharada de cacao en polvo sin azúcar</li>
                    <li>1/2 cucharadita de polvo de hornear</li>
                    <li><strong>Instrucciones:</strong> Mezcla todo directo en un tazón o taza grande. Ponlo al microondas por 1.5 a 2 minutos. Sácalo y ponle yogur griego natural encima y unos arándanos para el contraste fresco. ¡Listo!</li>
                </ul>
            </div>

        </div>
    );
}

export default Chapter9;
