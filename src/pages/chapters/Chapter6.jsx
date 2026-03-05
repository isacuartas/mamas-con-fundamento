import React from 'react';
import { Link } from 'react-router-dom';

function Chapter6() {
    return (
        <div className="chapter-content">
            <h3 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', margin: '0 0 5px 0' }}>
                Capítulo 6
            </h3>
            <h1 style={{ marginTop: 0 }}>Dejemos la Báscula en Paz (O casi)</h1>

            <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '20px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                "El peso es un dato, no una calificación moral."
            </div>

            <p>
                Muchas mujeres llegan a consulta aterradas por los números que ven en su curva de ganancia de peso, y creo que gran parte del problema es cómo se los comunican.
            </p>

            <h2>El mito de los "Kilos Ideales"</h2>
            <p>
                No hay un número mágico universal. La recomendación médica de ganancia de peso <strong>depende completamente de tu punto de partida</strong> (tu IMC pregestacional). Y es precisamente por esto que creé la herramienta interactiva en esta misma app.
            </p>

            <div style={{ marginTop: '30px', marginBottom: '40px' }}>
                <h3 style={{ color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    ¿De qué está hecho ese peso que subes?
                </h3>
                <p>Cuando ves la báscula subir, es normal sentir algo de frustración si mides tu cuerpo con la mentalidad previa al embarazo. Pero quiero que sepas exactamente cómo se distribuyen, en promedio, esos 12 kilos que pide el médico:</p>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '0.95em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '12px', borderTopLeftRadius: '8px' }}>Componente</th>
                            <th style={{ padding: '12px', borderTopRightRadius: '8px' }}>Peso Aprox.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>El bebé</td>
                            <td style={{ padding: '12px' }}>3.0 - 3.5 kg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '12px' }}>La Placenta</td>
                            <td style={{ padding: '12px' }}>0.5 - 1.0 kg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>Líquido Amniótico</td>
                            <td style={{ padding: '12px' }}>1.0 kg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '12px' }}>Utero y Pechos</td>
                            <td style={{ padding: '12px' }}>1.5 kg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>Expansión de Sangre</td>
                            <td style={{ padding: '12px' }}>1.5 - 2.0 kg</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                            <td style={{ padding: '12px' }}>Reservas de grasa (Para lactar)</td>
                            <td style={{ padding: '12px' }}>2.0 - 4.0 kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{
                marginTop: '40px',
                padding: '25px',
                backgroundColor: '#fff',
                border: '1px solid #dcdde1',
                borderRadius: '12px',
                textAlign: 'center'
            }}>
                <h2 style={{ marginTop: 0, color: 'var(--color-success)' }}>Tu Herramienta Principal</h2>
                <p>
                    Si aún no has llenado tus datos en la página inicial o registrado tus pesos semanales, te invito a hacerlo. Basado en la curva de Atalah, la app graficará tu progreso y te indicará si tu ritmo de ganancia está apoyando correctamente tu embarazo.
                </p>

                <Link to="/" style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '30px',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '15px',
                    textDecoration: 'none'
                }}>
                    Ir a Mi Monitoreo Gráfico
                </Link>
            </div>

        </div>
    );
}

export default Chapter6;
