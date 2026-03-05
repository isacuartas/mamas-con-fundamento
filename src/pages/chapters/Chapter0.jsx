import React from 'react';

function Chapter0() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 0
            </h3>
            <h1 style={{ marginTop: 0 }}>De la Consulta a la Vida Real (Mi Historia)</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "No soy solo tu nutricionista; soy una mamá en la misma trinchera que tú."
            </div>

            <p>
                Este embarazo no fue un accidente; fue algo que mi esposo y yo planeamos y deseamos mucho. Pero, siendo muy sincera, aunque soy Ingeniera Química con una especialización en nutrición deportiva, la nutrición en el embarazo nunca había sido mi foco. Mi mundo eran los datos de rendimiento y la optimización física. Mi plan inicial para mi embarazo era simplemente ver qué pasaba, confiando en lo que ya sabía.
            </p>

            <p>
                Mi primer trimestre fue un reto de adaptación física. Pasé de ser una mujer dedicada al alto rendimiento, con 12 o 13 horas de triatlón a la semana, a tener que frenar casi por completo porque mi cuerpo me pidió calma. Perdí masa muscular, bajé un kilo y lidié con una indigestión constante que me hizo cogerle fastidio a alimentos que antes amaba, como el huevo.
            </p>

            <h2 style={{ marginTop: '30px' }}>Lo que realmente me cambió el "chip" ocurrió en el segundo trimestre.</h2>

            <p>
                Llegó diciembre y me permití mucha flexibilidad. Disfruté de la pizza, los buñuelos y las galletas de la época. Pero cuando llegué al control médico en enero, la báscula marcó un salto de 58 a 62 kilos. El médico, cumpliendo con su protocolo, me advirtió: <em>"Ojo, que no se trata de subir cuatro kilos por mes"</em>.
            </p>

            <p>
                En ese momento, mi mente de ingeniera se activó. No fue que el médico no supiera hacer su trabajo, sino que la consulta es tan rápida que no hay espacio para la profundidad. Me quedé con un aviso, pero sin la claridad técnica de qué estaba pasando en mi bioquímica.
            </p>

            <div style={{
                margin: '30px 0',
                padding: '25px',
                backgroundColor: '#fff',
                border: '1px solid #eee',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '-15px', left: '20px', fontSize: '2em' }}>💡</div>
                <p style={{ margin: 0, paddingTop: '10px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                    Ahí fue donde nació mi verdadero interés por la nutrición gestacional. Quería entender el "porqué" de cada proceso, más allá de los mitos que nuestras abuelas nos repiten con todo el amor del mundo, pero que a veces carecen de sustento real.
                </p>
            </div>

            <p>
                Empecé a investigar para separar el cariño de la ciencia. Entendí que no se trata de obsesionarse con el peso, sino de tener datos claros para tomar decisiones.
            </p>

            <p>
                Hoy, en mi semana 28, me siento bien y fuerte. He aprendido que estar embarazada es comprender la química de tu propio cuerpo y encontrar el equilibrio entre un antojo y la estabilidad metabólica. Escribo esto para que tú también tengas esa claridad y ese fundamento que nos permite disfrutar el proceso sin miedos innecesarios.
            </p>
        </div>
    );
}

export default Chapter0;
