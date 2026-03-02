import React from 'react';

const WeightHistoryTable = ({ historial, onDeleteRecord, onEditRecord }) => {
    if (!historial || historial.length === 0) return null;

    return (
        <div className="history-table-card form-card" style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', padding: '20px' }}>
            <h3 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-bg-lavender)', paddingBottom: '10px', marginTop: 0 }}>
                📋 Historial de Registros
            </h3>

            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e9ecef', marginTop: '15px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', margin: 0 }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                            <th style={{ padding: '14px 12px', borderBottom: '2px solid var(--color-primary)' }}>Semana</th>
                            <th style={{ padding: '14px 12px', borderBottom: '2px solid var(--color-primary)' }}>Peso (kg)</th>
                            <th style={{ padding: '14px 12px', borderBottom: '2px solid var(--color-primary)' }}>IMC</th>
                            <th style={{ padding: '14px 12px', borderBottom: '2px solid var(--color-primary)' }}>Estado</th>
                            <th style={{ padding: '14px 12px', borderBottom: '2px solid var(--color-primary)', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((record, index) => (
                            <tr key={record.semana} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                                <td style={{ padding: '14px 12px' }}><strong>Semana {record.semana}</strong></td>
                                <td style={{ padding: '14px 12px' }}>{record.peso.toFixed(2)}</td>
                                <td style={{ padding: '14px 12px' }}>{record.imcPaciente ? record.imcPaciente.toFixed(2) : '-'}</td>
                                <td style={{ padding: '14px 12px' }}>
                                    <span style={{
                                        backgroundColor: String(record.zonaIMC).toUpperCase() === 'NORMAL' ? '#e2f0cb' : 'var(--color-bg-main)',
                                        color: String(record.zonaIMC).toUpperCase() === 'NORMAL' ? '#2e7d32' : 'var(--color-primary)',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.85em',
                                        fontWeight: 'bold'
                                    }}>
                                        {String(record.zonaIMC).replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                                    {record.semana !== 10 && ( // Prevenir borrar la semana 10 inicial
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => onEditRecord(record)}
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: '#3498db',
                                                    border: '1px solid #3498db',
                                                    padding: '6px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.9em',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                                title="Editar peso"
                                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e3f2fd'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => onDeleteRecord(record.semana)}
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: '#e74c3c',
                                                    border: '1px solid #e74c3c',
                                                    padding: '6px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.9em',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                }}
                                                title="Borrar registro"
                                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffebee'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p style={{ fontSize: '0.85em', color: 'var(--color-text-muted)', marginTop: '15px' }}>
                Si cometiste un error, puedes borrar el registro aquí y volver a ingresarlo arriba.
                *(Nota: La semana 10 es tu punto de partida pregestacional y no puede ser borrada individualmente).*
            </p>
        </div>
    );
};

export default WeightHistoryTable;
