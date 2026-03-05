import React from 'react';

function Chapter8() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 8
            </h3>
            <h1 style={{ marginTop: 0 }}>El Método en la Cocina (Menú Base)</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "La planificación vence a los antojos."
            </div>

            <p>
                Ya vimos en el Capítulo 5 cómo estructurar el plato. Para no tener que pensar todos los días desde cero de dónde sacar la proteína o la fibra, te dejo este menú base.
            </p>

            <h2>Opciones de armado rápido:</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '30px' }}>

                {/* Desayunos */}
                <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: 'var(--color-primary)', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Desayunos (Rompe-ayunos)</h3>
                    <ul style={{ paddingLeft: '20px', color: '#444' }}>
                        <li style={{ marginBottom: '10px' }}><strong>Arepa poderosa:</strong> Arepa de maíz, 2 huevos revueltos con tomate/cebolla y medio aguacate.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Avena Mágica:</strong> Avena cocida en leche (o bebida vegetal), semillas chia, 1 cucharada de mantequilla de maní y arándanos.</li>
                        <li><strong>Pancakes proteicos:</strong> Hechos con avena, plátano, 1 huevo y acompañados de yogur griego.</li>
                    </ul>
                </div>

                {/* Almuerzos */}
                <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: 'var(--color-success)', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Almuerzos Reales</h3>
                    <ul style={{ paddingLeft: '20px', color: '#444' }}>
                        <li style={{ marginBottom: '10px' }}><strong>Día 1:</strong> Pechuga a la plancha, puré de batata/camote, y ensalada verde abundante con aceite de oliva.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Semáforo Verde:</strong> Filete de salmón al horno, quinoa cocida, brócoli y calabacín asados.</li>
                        <li><strong>Plato Latino:</strong> Carne molida guisada, casquitos de maduro al vapor, ensalada de tomate/aguacate y una cucharada de frijoles.</li>
                    </ul>
                </div>

                {/* Cenas */}
                <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#f39c12', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Cenas Ligeras pero Densas</h3>
                    <ul style={{ paddingLeft: '20px', color: '#444' }}>
                        <li style={{ marginBottom: '10px' }}><strong>Sopa reparadora:</strong> Caldo de pollo natural con verduras picadas finitas y pechuga desmechada.</li>
                        <li style={{ marginBottom: '10px' }}><strong>Tacos fáciles:</strong> 2 tortillas de maíz rellenas de restos del pollo del almuerzo, pico de gallo y aguacate.</li>
                        <li><strong>Ensalada potente:</strong> Hojas verdes, atún (solo 1 vez a la semana), tomates cherry, huevo cocido y vinagreta.</li>
                    </ul>
                </div>

            </div>

            <h2 style={{ marginTop: '50px' }}>El poder de los Snacks (Y cuándo usarlos)</h2>
            <p>
                Muchas pacientes me preguntan cuántas veces al día deben comer. La respuesta es: come 3 comidas fuertes y estructuradas primero y, si pasan más de 5 horas entre ellas, incluye un snack.
            </p>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderLeft: '4px solid #e74c3c', marginTop: '20px', borderRadius: '0 8px 8px 0' }}>
                <p style={{ margin: 0 }}>
                    <strong>El Truco Anti-Náuseas:</strong> En el primer trimestre, cuando las náuseas mandan, no intentes comer los platos gigantes. Convierte esos grandes platos en 6 mini-snacks a lo largo del día. Lo único que mejora las náuseas matutinas del embarazo es evitar que el estómago esté 100% vacío. Una galleta de avena o unas almendras en tu nochero (mesa de noche) antes de siquiera levantarte pueden salvarte la mañana.
                </p>
            </div>

        </div>
    );
}

export default Chapter8;
