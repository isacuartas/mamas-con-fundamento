import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';
import faqData from '../data/faqData.json';

const FAQSection = () => {
    return (
        <div style={{ padding: '20px 0' }}>
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-bg-lavender)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🧠 Conocimiento con Fundamento
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '25px', fontSize: '1.05em' }}>
                Respuestas basadas en ciencia para empoderar tu nutrición y darte tranquilidad.
            </p>

            <Accordion.Root type="single" collapsible style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqData.map((item) => (
                    <Accordion.Item key={item.id} value={item.id} style={{
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius-app)',
                        boxShadow: '0 2px 8px rgba(106, 90, 205, 0.05)',
                        overflow: 'hidden'
                    }}>
                        <Accordion.Header style={{ display: 'flex', margin: 0 }}>
                            <Accordion.Trigger style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                color: 'var(--color-primary)',
                                padding: '20px',
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '1.1em',
                                fontWeight: '600',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-main)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {item.pregunta}
                                <FaChevronDown style={{ color: 'var(--color-success)', flexShrink: 0, transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)', }} className="AccordionChevron" />
                            </Accordion.Trigger>
                        </Accordion.Header>

                        <Accordion.Content style={{
                            padding: '0 20px 20px 20px',
                            backgroundColor: '#fff',
                        }}>
                            <div style={{ borderTop: '1px solid var(--color-bg-lavender)', paddingTop: '15px' }}>
                                <p style={{ fontSize: '1.05em', margin: '0 0 15px 0' }}><strong>{item.respuesta}</strong></p>

                                <div style={{ backgroundColor: 'var(--color-bg-lavender)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: 'var(--color-primary)', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '0.5px' }}>📚 El Fundamento</h4>
                                    <p style={{ margin: 0, color: 'var(--color-text-main)', lineHeight: '1.6' }}>{item.fundamento}</p>
                                </div>

                                <div style={{ borderLeft: '4px solid var(--color-success)', paddingLeft: '12px' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--color-success)', fontSize: '1em' }}>💡 Tip Pro</h4>
                                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>{item.tip_pro}</p>
                                </div>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>

            {/* Pequeño hack de estilos globales para la animación del Chevron del componente Root de Radix */}
            <style dangerouslySetInnerHTML={{
                __html: `
                [data-state=open] > .AccordionChevron { transform: rotate(180deg); }
                [data-state=open] { background-color: var(--color-bg-main); }
            `}} />
        </div>
    );
};

export default FAQSection;
