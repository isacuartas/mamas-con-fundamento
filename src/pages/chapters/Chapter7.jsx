import React from 'react';

function Chapter7() {
    return (
        <div className="chapter-content">
            <h1>Capítulo 7: Seguridad Alimentaria</h1>
            <div className="chapter-subtitle-box">
                <h2>"Protegiendo el sistema: El semáforo de lo que sí y lo que no"</h2>
                <img src="/images/ebook/semaforo.png" alt="Semáforo del Pescado en el Embarazo" className="ebook-image" />
            </div>
            <p>En este capítulo vamos a hablar de los "guardianes" de tu alimentación. No se trata de vivir con miedo a lo que comes, sino de establecer un sistema de seguridad para que tú y tu bebé estén protegidos de riesgos que son totalmente evitables.</p>

            <h3>1. El Semáforo del Café: La regla de los 200 mg</h3>
            <p>La cafeína es un estimulante que atraviesa la placenta con facilidad. Mientras que tu cuerpo la procesa rápido, el metabolismo de tu bebé aún no está listo para ella. La ciencia ha establecido que el límite seguro es de 200 mg de cafeína al día.</p>

            <h4>¿Cómo se ve esto en la vida real?</h4>
            <ul>
                <li><strong>Café filtrado (tipo tinto):</strong> 1 taza de 8 oz tiene entre 95 y 140 mg. (Puedes tomarte 1 o 1.5 tazas).</li>
                <li><strong>Espresso:</strong> 1 shot tiene unos 64 mg. (Podrías tomarte hasta 2 o 3 si son cortos).</li>
                <li><strong>Té negro/verde:</strong> Tienen entre 25 y 45 mg por taza.</li>
                <li><strong>Chocolate oscuro:</strong> Una barra pequeña tiene unos 20 mg.</li>
            </ul>
            <p><strong>Mi consejo:</strong> Si te encanta el sabor del café pero quieres estar del lado seguro, opta por el descafeinado o mezcla media taza de café normal con media de descafeinado. Así mantienes el ritual sin superar el límite.</p>

            <h3>2. El Mercurio: El "tráfico ligero" en el mar</h3>
            <p>El mercurio es un metal pesado que puede interferir con el desarrollo del sistema nervioso del bebé. Como regla general: entre más grande y viejo sea el pez, más mercurio tiene.</p>
            <ul>
                <li>⛔ <strong>Evitar (Peces grandes):</strong> Tiburón, Pez Espada (Albacora), Macarela Rey o Atún de ojo grande (Bigeye). Estos son los que más acumulan tóxicos.</li>
                <li>✅ <strong>Consumo Seguro (2-3 porciones por semana):</strong> Salmón, Trucha (muy común en Colombia), Sardinas, Camarones y Tilapia.</li>
                <li>⚠️ <strong>Consumo Moderado (1 porción por semana):</strong> Atún claro en lata o Atún blanco (Albacore).</li>
            </ul>
            <p><strong>Dato clave:</strong> Recuerda que el Pilar del DHA se cumple mejor con los peces pequeños (sardinas/salmón), que son los más limpios y potentes para el cerebro de tu hijo.</p>

            <h3>3. Bacterias y Parásitos: La importancia de la higiene</h3>
            <p>Durante el embarazo, tu sistema inmune trabaja de una forma distinta, lo que te hace un poco más vulnerable a bacterias como la Listeria o parásitos como el Toxoplasma.</p>

            <h4>Reglas de oro en la cocina:</h4>
            <ul>
                <li><strong>Nada de términos medios:</strong> Las carnes, el pollo y los huevos deben estar bien cocidos. La cocción a altas temperaturas (75°C) es lo único que garantiza la eliminación de riesgos.</li>
                <li><strong>El lavado es innegociable:</strong> Todas las frutas y verduras que consumas crudas deben estar perfectamente lavadas y desinfectadas. Un chorrito de vinagre no es suficiente; usa soluciones desinfectantes para alimentos si es necesario.</li>
                <li><strong>Quesos y Lácteos:</strong> Asegúrate siempre de que digan "Pasteurizado" en la etiqueta. Evita los quesos artesanales o "de campo" que no garanticen este proceso, ya que son el hogar favorito de la Listeria.</li>
                <li><strong>Tablas separadas:</strong> No uses la misma tabla donde cortaste carne cruda para picar la ensalada. La contaminación cruzada es un riesgo silencioso.</li>
            </ul>

            <div className="image-placeholder">
                <img src="/images/ebook/semaforo.png" alt="Semáforo del Pescado en el Embarazo" className="ebook-image" />
            </div>

            <h3>El mensaje final</h3>
            <p>Seguir estas pautas no significa que dejes de disfrutar la comida. Significa que ahora tienes el criterio para elegir lo que es mejor para ambos. Una cocina limpia y una elección inteligente de ingredientes son el mejor escudo para tu embarazo.</p>
        </div>
    );
}

export default Chapter7;
