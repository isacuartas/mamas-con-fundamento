import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './SalesPage.css';

const CREAR_PAGO_URL = 'https://us-central1-minsa-gestante-app.cloudfunctions.net/crearPago';

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.sp-reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sp-faq-item">
      <button className="sp-faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className={`sp-faq-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      <div className={`sp-faq-answer ${open ? 'open' : ''}`}>
        <div className="sp-faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
}

// ─── Buy Button ───────────────────────────────────────────────────────────────
function BuyButton({ className = 'sp-btn-primary', label = '🛒 Comprar ahora — $89.900 COP' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuy = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CREAR_PAGO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 89900, currency: 'COP', description: 'Mamás con Fundamento — Acceso Premium' }),
      });
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
      const data = await res.json();
      const url = data.checkoutUrl || data.init_point || data.sandbox_init_point || data.url;
      if (!url) throw new Error('No se recibió el link de pago.');
      window.location.href = url;
    } catch (err) {
      setError('Hubo un problema al iniciar el pago. Por favor inténtalo de nuevo o escríbenos a @mamasconfundamento en Instagram.');
      setLoading(false);
    }
  }, []);

  return (
    <>
      <button className={className} onClick={handleBuy} disabled={loading}>
        {loading ? (
          <><span className="sp-spinner"></span> Redirigiendo a MercadoPago...</>
        ) : (
          label
        )}
      </button>
      {error && <div className="sp-error-banner">⚠️ {error}</div>}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SalesPage() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVariant, setHeroVariant] = useState("B");


  const heroVariants = {
    A: {
      badge: "Guía digital · Acceso de por vida",
      kicker: "Propuesta A — Estética Editorial Minimalista",
      titlePrefix: "Tu embarazo merece algo más que ",
      titleEm: "consejos de internet",
      titleSuffix: ".",
      subtitle: "Una guía de nutrición basada en evidencia para entender qué comer, cuánto necesitas y cómo tomar decisiones con más tranquilidad durante el embarazo.",
      quote: "No necesitas comer por dos. Necesitas entender qué necesitas.",
      ctaLabel: "Quiero nutrirme con fundamento →",
      note: "Guía digital · Un solo pago de $89.900 COP · Acceso de por vida",
      image: "/images/hero_variant_a.jpg",
      imageAlt: "Mujer embarazada leyendo tranquilamente en un ambiente luminoso",
      captionTitle: "Isabela Cuartas",
      captionSub: "Mamá, Especialista en Nutrición y Triatleta"
    },
    B: {
      badge: "Guía digital · Acceso de por vida",
      kicker: "GUÍA DIGITAL · ACCESO DE POR VIDA",
      titlePrefix: "Nutrición real para tu embarazo, ",
      titleEm: "sin mitos ni culpa",
      titleSuffix: ".",
      subtitle: "Una guía de nutrición basada en evidencia para entender qué comer, cuánto necesitas y cómo tomar decisiones con más tranquilidad durante el embarazo.",
      quote: "La nutrición con fundamento ocurre en tu cocina diaria, no en dietas perfectas.",
      ctaLabel: "Quiero nutrirme con fundamento →",
      note: "Guía digital · Un solo pago de $89.900 COP · Acceso de por vida",
      image: "/images/isabela_hero_reading.jpg",
      imageAlt: "Isabela Cuartas leyendo Nutrición durante el embarazo",
      captionTitle: "Isabela Cuartas",
      captionSub: "Mamá, Especialista en Nutrición y Triatleta"
    },
    C: {
      badge: "Guía digital · Acceso de por vida",
      kicker: "Propuesta C — Mamás con Fundamento (Recomendada)",
      titlePrefix: "Tu embarazo merece algo más que ",
      titleEm: "consejos de internet",
      titleSuffix: ".",
      subtitle: "Una guía de nutrición basada en evidencia para entender qué comer, cuánto necesitas y cómo tomar decisiones con más tranquilidad durante el embarazo.",
      quote: "No necesitas comer por dos. Necesitas entender qué necesitas.",
      ctaLabel: "Quiero nutrirme con fundamento →",
      note: "Guía digital · Un solo pago de $89.900 COP · Acceso de por vida",
      image: "/images/hero_variant_c.jpg",
      imageAlt: "Mujer embarazada tomando notas en una mesa iluminada con una taza de té",
      captionTitle: "Isabela Cuartas",
      captionSub: "Mamá, Especialista en Nutrición y Triatleta"
    }
  };

  const currentHero = heroVariants[heroVariant];

  const tools = [
    {
      icon: '📖',
      title: 'E-book de Nutrición Integral',
      desc: '10 capítulos con respaldo científico. Desde los pilares nutricionales hasta un recetario con justificación académica. Cada dato tiene fuente bibliográfica real: ACOG, EFSA, Journal of Nutrition.',
      tag: 'Lo más completo',
    },
    {
      icon: '📅',
      title: 'Monitoreo de Peso (Curva de Atalah)',
      desc: 'El mismo estándar científico que usa tu ginecólogo. Registra tu peso semana a semana y genera un reporte PDF descargable para llevar a tu cita médica.',
      tag: 'Evidencia médica',
    },
    {
      icon: '🍽️',
      title: 'Calculadora de Porciones Personalizada',
      desc: 'Calcula exactamente cuánta proteína, carbohidratos y grasas necesitas según tu peso actual y nivel de actividad. Diferencia entre mamás sedentarias y activas (Pilates, caminar, etc.).',
      tag: 'Personalizada para ti',
    },
    {
      icon: '🧘‍♀️',
      title: 'Tracker de Hábitos y Bienestar Materno',
      desc: 'Seguimiento diario de hábitos clave: hidratación, movimiento, sueño, suplementos y más. Todo en un solo lugar para que cuides lo que realmente importa.',
      tag: 'Bienestar integral',
    },
  ];

  const dataPoints = [
    { num: '50–70 mg', title: 'de DHA diarios extrae el bebé de tu cerebro', desc: 'En el tercer trimestre, el cerebro de tu bebé se lleva DHA directamente del tuyo. El método te enseña cómo reponer esa reserva.' },
    { num: '75 mg', title: 'de Vitamina C triplican la absorción de hierro', desc: 'Una sola guayaba supera esa meta. Aprender a combinar alimentos estratégicamente es una de las grandes herramientas del libro.' },
    { num: '50%', title: 'más volumen de sangre produce tu cuerpo', desc: 'Tu cuerpo fabrica literalmente más sangre durante el embarazo. Sin hierro suficiente, hay anemia, fatiga crónica y riesgo en el parto.' },
    { num: '<1%', title: 'es la conversión del Omega-3 de la chía al DHA', desc: 'Un mito muy popular desmontado con ciencia. No, la chía no te da el DHA que tu bebé necesita. El libro explica qué sí funciona.' },
    { num: '175 g', title: 'de carbohidratos mínimos al día necesita tu bebé', desc: 'Si no los consumes, tu cuerpo entra en cetosis, lo cual no es ideal para el desarrollo fetal. El libro te muestra cómo llegar a esa meta con alimentos reales.' },
    { num: '10', title: 'capítulos con bibliografía académica real', desc: 'No es un blog de recetas ni consejos de abuela. Es ingeniería aplicada a la nutrición del embarazo, con fuentes verificables.' },
  ];

  const weightItems = [
    { emoji: '👶', kg: '3.4 kg', label: 'Tu bebé' },
    { emoji: '🫀', kg: '~1.8 kg', label: 'Más sangre (50% extra)' },
    { emoji: '💧', kg: '0.8 kg', label: 'Líquido amniótico' },
    { emoji: '🫁', kg: '1.0 kg', label: 'Útero expandido' },
    { emoji: '🍼', kg: '~0.8 kg', label: 'Tejido mamario' },
    { emoji: '🧬', kg: '0.7 kg', label: 'Placenta' },
    { emoji: '⚡', kg: '~3.5 kg', label: 'Reservas de energía' },
    { emoji: '🌊', kg: '~2 kg', label: 'Líquidos y tejidos extra' },
  ];

  const chapters = [
    { num: '0', title: 'Bienvenida', sub: 'De atleta de alto rendimiento a mamá con datos' },
    { num: '1', title: 'Calidad vs. Cantidad', sub: '"No necesitas comer por dos, necesitas nutrirse mejor"', premium: false },
    { num: '2', title: 'Los 10 Pilares Nutricionales', sub: 'Agua, hierro, proteína, DHA, calcio, microbiota y más', premium: false },
    { num: '3', title: 'El Universo del DHA', sub: '"Construyendo el centro de control de tu bebé"', premium: true },
    { num: '4', title: 'Microbiota Intestinal', sub: '"La semilla de la inmunidad de tu bebé"', premium: true },
    { num: '5', title: 'Traduciendo los datos al plato', sub: 'Tablas de porciones reales en medidas caseras', premium: true },
    { num: '6', title: 'Tu cuerpo está trabajando', sub: '"Tu peso no te define, es solo un dato en medio de un milagro"', premium: true },
    { num: '7', title: 'Seguridad Alimentaria', sub: 'Semáforo del café, mercurio y bacterias', premium: true },
    { num: '8', title: 'El Método del Plato', sub: 'Cómo comer con el estómago comprimido en el tercer trimestre', premium: true },
    { num: '9', title: 'Recetario + Bibliografía', sub: '7 recetas con justificación científica y referencias académicas', premium: true },
  ];

  const testimonials = [
    {
      initial: "N",
      name: "Natalia",
      context: "Inicio de embarazo · Asesoría personalizada",
      stars: "★★★★★",
      text: "\"Natalia lleva el tracking de su peso ahora que inicia su embarazo y quiso tomar una asesoría personalizada. La gráfica de Atalah le da la tranquilidad de ver su evolución semana a semana.\"",
      image: "/images/testimonial_natalia_atalah.jpg"
    },
    {
      initial: 'A',
      name: 'Annie Valencia',
      context: 'Primer embarazo · Deportista',
      stars: '★★★★★',
      text: '"Súper, sobre todo por el tema de saber si estamos bien con el peso. Para mí ha sido un tema que inicialmente me daba muchas dudas. Como deportista siempre me cuidé de mi peso, pero saber que estoy en un rango saludable me da tranquilidad y que estoy haciendo las cosas bien."',
    },
    {
      initial: 'L',
      name: 'Lina Mercado',
      context: 'Semana 6.5 · Primera vez',
      stars: '★★★★★',
      text: '"¡Hola!! Pues ya entendí por qué me andaba inflamando por todo, porque como enseñas ahí, la digestión va más lento. No sabía lo de la vitamina D y el calcio. Estaba muy preocupada por subirme demasiado de peso pero aunque es importante, no es lo más importante."',
    },
    {
      initial: '🏃',
      name: 'Corredora aficionada',
      context: 'Anónima · Embarazo inesperado',
      stars: '★★★★★',
      text: '"Súper bien, tiene mucha información importante. Yo me alarmé porque soy corredora y cuando me di cuenta del embarazo mi ritmo de vida cambió y me subió muy rápido de peso. Aquí vamos tratando de entender y de ser muy conscientes de todo."',
    },
  ];

  const faqs = [
    {
      question: '¿Necesito saber mucho de nutrición para entender el libro?',
      answer: 'Para nada. El libro está escrito en un lenguaje cercano y claro, como hablar con una amiga que sabe mucho de ciencia. No necesitas conocimientos previos. Los conceptos técnicos están explicados con ejemplos prácticos y alimentos cotidianos.',
    },
    {
      question: '¿Es apto para cualquier trimestre de embarazo?',
      answer: 'Sí. El contenido aplica para toda la gestación. Hay secciones específicas para cada etapa: desde las náuseas del primer trimestre hasta el método del plato cuando el estómago está comprimido en el tercero.',
    },
    {
      question: '¿Cómo accedo después de comprar?',
      answer: 'Una vez completes el pago en MercadoPago, recibirás acceso automático. Puedes entrar desde mamasconfundamento.netlify.app en cualquier navegador, en tu celular o computador. No necesitas descargar ninguna app.',
    },
    {
      question: '¿La curva de Atalah es la misma que usa mi ginecólogo?',
      answer: 'Exactamente. Es el estándar médico validado internacionalmente que usan los profesionales de salud para evaluar el peso gestacional. La herramienta dentro de la app usa este mismo método para que llegues a tu cita con datos reales de toda tu curva, no solo el dato del día.',
    },
    {
      question: '¿Qué pasa si tengo una restricción alimentaria (vegetariana, intolerancia a la lactosa, etc.)?',
      answer: 'El libro aborda alternativas para diferentes estilos de alimentación. Los pilares nutricionales están explicados con múltiples fuentes alimentarias para que puedas adaptar las recomendaciones a tu contexto.',
    },
    {
      question: '¿El pago es seguro?',
      answer: 'Sí. El checkout es procesado por MercadoPago, la plataforma de pagos más utilizada en Latinoamérica. Puedes pagar con tarjeta de crédito, débito, PSE o efectivo en puntos autorizados. Tus datos bancarios nunca pasan por nuestros servidores.',
    },
    {
      question: '¿Qué incluye el acceso premium exactamente?',
      answer: 'Acceso completo al e-book de 10 capítulos (incluyendo el recetario y la bibliografía), registros de peso ilimitados en la curva de Atalah con reporte PDF descargable, la calculadora de porciones personalizada y el tracker de hábitos de bienestar materno. Todo desde una sola plataforma.',
    },
  ];

  return (
    <div className="sp-page">

      {/* ── NAV ── */}
      <nav className="sp-nav">
        <a href="/" className="sp-nav-logo">
          <img src="/images/logo_real_high.png" alt="Mamás con Fundamento" />
          <span className="sp-nav-wordmark">
            <strong>Mamás con Fundamento</strong>
            <span>Nutrición con evidencia</span>
          </span>
        </a>
        <button
          className={`sp-nav-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
        <div className={`sp-nav-menu ${menuOpen ? 'open' : ''}`}>
          <div className="sp-nav-links" onClick={() => setMenuOpen(false)}>
            <a href="#metodo">El método</a>
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#preguntas">Preguntas</a>
          </div>
          <div className="sp-nav-actions">
            <Link to="/login" className="sp-nav-login">Ya tengo acceso</Link>
            <BuyButton
              className="sp-nav-cta"
              label="Quiero mi acceso"
            />
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sp-hero">

        <div className="sp-hero-inner">
          <div className="sp-hero-content">
            <span className="sp-hero-kicker">{currentHero.badge}</span>
            <h1 className="sp-hero-title">
              {currentHero.titlePrefix}<em>{currentHero.titleEm}</em>{currentHero.titleSuffix}
            </h1>
            <p className="sp-hero-subtitle">
              {currentHero.subtitle}
            </p>
            <blockquote className="sp-hero-quote">
              "{currentHero.quote}"
            </blockquote>
            <div className="sp-hero-ctas">
              <BuyButton label={currentHero.ctaLabel} />
            </div>
            <p className="sp-hero-note">
              {currentHero.note}
            </p>
          </div>

          <div className="sp-hero-media sp-reveal">
            <div className="sp-hero-photo">
              <img src={currentHero.image} alt={currentHero.imageAlt} key={heroVariant} />
            </div>
            <div className="sp-hero-photo-caption">
              <span className="name">{currentHero.captionTitle}</span>
              <span className="role">{currentHero.captionSub}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="sp-problem">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">¿Te suena familiar?</span>
            <h2 className="sp-section-title">¿Te sientes perdida con la nutrición de tu embarazo?</h2>
            <p className="sp-section-subtitle">
              No es tu culpa. La información disponible es contradictoria, las citas médicas son cortas
              y nadie te explica el <em>por qué</em> detrás de cada recomendación.
            </p>
          </div>
          <div className="sp-problem-grid sp-reveal">
            <div className="sp-problem-card">
              <span className="sp-problem-icon">😵</span>
              <h3>"¿Cuánto tengo que subir de peso?"</h3>
              <p>El médico te dice "ojo con el peso" pero no explica el rango exacto para <strong>tu</strong> cuerpo. Cada semana es diferente y nadie te lo calcula.</p>
            </div>
            <div className="sp-problem-card">
              <span className="sp-problem-icon">🤔</span>
              <h3>"¿Esto sí lo puedo comer?"</h3>
              <p>El atún, el café, los quesos, la chía… La información contradictoria entre la abuela, Instagram y el médico te tiene confundida.</p>
            </div>
            <div className="sp-problem-card">
              <span className="sp-problem-icon">⏱️</span>
              <h3>"La cita fue de 10 minutos"</h3>
              <p>Saliste con datos pero sin entender el por qué. La consulta fue rápida y quedaron preguntas sin responder sobre tu alimentación real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="sp-solution">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">La solución</span>
            <p className="sp-solution-quote">
              No necesitas comer por dos, necesitas nutrirse mejor.
            </p>
            <p className="sp-solution-desc">
              <strong>Mamás con Fundamento</strong> es una plataforma creada por <strong>Isabela Cuartas</strong>
              — Ingeniera Química con especialización en Nutrición Deportiva y mamá gestante — que combina
              un <strong>e-book científico</strong> con <strong>herramientas interactivas</strong> para que
              tengas claridad real sobre tu alimentación, tu peso y el bienestar de tu bebé. No más conjeturas.
              No más culpa. Solo datos y ciencia accesibles.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="sp-tools" id="metodo">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">Qué incluye</span>
            <h2 className="sp-section-title">4 herramientas en una sola plataforma</h2>
            <p className="sp-section-subtitle">Todo lo que necesitas para vivir tu embarazo con información real, en un solo lugar.</p>
          </div>
                    <div className="sp-tools-grid sp-reveal">
            {tools.map((t) => (
              <div className="sp-tool-card" key={t.title}>
                <span className="sp-tool-icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="sp-tool-tag">{t.tag}</span>
                {t.title.includes("E-book") && (
                  <div className="sp-tool-img-wrap">
                    <img src="/assets/plato_saludable_embarazo.png" alt="Plato saludable en el embarazo real" />
                    <span className="sp-tool-img-caption">Vista real: El Método del Plato en la plataforma</span>
                  </div>
                )}
                {t.title.includes("Monitoreo") && (
                  <div className="sp-tool-img-wrap">
                    <img src="/images/testimonial_natalia_atalah.jpg" alt="Gráfica de Monitoreo Atalah Real de Natalia" />
                    <span className="sp-tool-img-caption">Caso real: Natalia haciendo el tracking de su peso al iniciar su embarazo</span>
                  </div>
                )}
                {t.title.includes("Calculadora") && (
                  <div className="sp-tool-img-wrap">
                    <img src="/images/app_calculator.png" alt="Calculadora de Porciones Real" />
                    <span className="sp-tool-img-caption">Vista real: Calculadora de Macros "Mis Porciones"</span>
                  </div>
                )}
                {t.title.includes("Tracker") && (
                  <div className="sp-tool-img-wrap">
                    <img src="/assets/semaforo_pescado.png" alt="Semáforo de Seguridad Alimentaria Real" />
                    <span className="sp-tool-img-caption">Vista real: Semáforo de alimentos y mercurio</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="sp-section-cta sp-reveal" style={{ textAlign: "center", marginTop: "40px" }}>
            <BuyButton label="Quiero nutrirme con fundamento →" />
          </div>
        </div>
      </section>

      {/* ── DATA POINTS ── */}
      <section className="sp-data">
        <div className="sp-container">
          <div className="sp-reveal">
            <h2 className="sp-section-title">Datos que cambiarán cómo ves tu embarazo</h2>
            <p className="sp-section-subtitle">La ciencia que hay detrás de cada decisión que tomas a diario.</p>
          </div>
          <div className="sp-data-grid sp-reveal">
            {dataPoints.map((d) => (
              <div className="sp-data-card" key={d.title}>
                <div className="sp-data-number">{d.num}</div>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEIGHT ANATOMY ── */}
      <section className="sp-weight">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">El dato wow</span>
            <h2 className="sp-section-title">¿A dónde va el peso que subes?</h2>
            <p className="sp-section-subtitle">
              De esos 12–15 kg típicos de un embarazo, la mayor parte no es "grasa de más".
              Aquí está la anatomía real de tu aumento de peso:
            </p>
          </div>
          <div className="sp-weight-grid sp-reveal">
            {weightItems.map((w) => (
              <div className="sp-weight-item" key={w.label}>
                <span className="emoji">{w.emoji}</span>
                <span className="kg">{w.kg}</span>
                <span className="label">{w.label}</span>
              </div>
            ))}
          </div>
          <div className="sp-reveal" style={{ textAlign: 'center' }}>
            <div className="sp-weight-note">
              <p>
                💡 La mayor parte es agua, sangre extra, tu bebé y soporte vital.
                Sin ese aumento, el desarrollo de tu hijo estaría comprometido.
                El libro te explica exactamente en qué rango deberías estar <strong>tú</strong>, según tu IMC inicial.
              </p>
            </div>
            <div className="sp-section-cta sp-reveal" style={{ textAlign: "center", marginTop: "32px" }}>
              <BuyButton label="Quiero nutrirme con fundamento →" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EBOOK PREVIEW ── */}
      <section className="sp-ebook">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">Vista previa</span>
            <h2 className="sp-section-title">10 capítulos con ciencia real</h2>
            <p className="sp-section-subtitle">
              Cada capítulo tiene fuentes bibliográficas verificables: Journal of Nutrition, ACOG, EFSA,
              Frontiers in Microbiology, CDC y más.
            </p>
          </div>
          <div className="sp-ebook-chapters sp-reveal">
            {chapters.map((c) => (
              <div className="sp-chapter-item" key={c.num}>
                <div className="sp-chapter-num">{c.num}</div>
                <div className="sp-chapter-info" style={{ flex: 1 }}>
                  <h4>{c.title}</h4>
                  <p>{c.sub}</p>
                </div>
                {c.premium && <span className="sp-chapter-lock">🔒 Premium</span>}
              </div>
            ))}
          </div>
        
          {/* Muestra Real del Contenido dentro de la plataforma */}
          <div className="sp-ebook-showcase sp-reveal">
            <h3 className="sp-showcase-title">Muestra real del contenido y recetario dentro de la web app:</h3>
            <div className="sp-showcase-grid">
              <div className="sp-showcase-card">
                <img src="/assets/microbiota_embarazo.png" alt="Microbiota Intestinal e Inmunidad del Bebé" />
                <div className="sp-showcase-info">
                  <strong>Capítulo 4: Microbiota Intestinal</strong>
                  <span>La semilla de la inmunidad de tu bebé explicada con gráficos visuales.</span>
                </div>
              </div>
              <div className="sp-showcase-card">
                <img src="/assets/calorias_vs_densidad.png" alt="Calorías vs Densidad Nutricional" />
                <div className="sp-showcase-info">
                  <strong>Capítulo 1: Calidad vs. Cantidad</strong>
                  <span>Por qué la densidad nutricional es más relevante que contar calorías.</span>
                </div>
              </div>
              <div className="sp-showcase-card">
                <img src="/assets/receta_salmon_costra.png" alt="Recetas con Justificación Científica" />
                <div className="sp-showcase-info">
                  <strong>Capítulo 9: Recetario Práctico</strong>
                  <span>Recetas explicadas paso a paso con su justificación nutricional exacta.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

            {/* ── ABOUT ISABELA ── */}
      <section className="sp-about" id="sobre-mi">
        <div className="sp-about-inner">
          <div className="sp-about-img-wrap sp-reveal">
            <img src="/images/isabela_studio_pose.png" alt="Isabela Cuartas — Mamá, Especialista en Nutrición y Triatleta" style={{ borderRadius: "24px", width: "100%", display: "block" }} />
            <div className="sp-about-credentials">
              <div className="cred-item"><span className="icon">🥑</span> Especialista en Nutrición</div>
              <div className="cred-item"><span className="icon">✨</span> Nutrición con Fundamento (+14 años)</div>
              <div className="cred-item"><span className="icon">🏊</span> Triatleta</div>
              <div className="cred-item"><span className="icon">👶</span> Mamá</div>
            </div>
          </div>
          <div className="sp-about-content sp-reveal">
            <span className="sp-badge">Quién lo creó</span>
            <h2 className="sp-about-name">Hola, soy Isabela</h2>
            <p className="sp-about-subtitle">Especialista en Nutrición · Triatleta · Creadora de Nutrición con Fundamento</p>
            
            <p className="sp-about-bio">
              Soy la creadora de <strong>Nutrición con Fundamento</strong>, un espacio desde el que llevo más de 14 años haciendo asesorías y acompañando a personas a entender mejor su alimentación.
            </p>
            
            <p className="sp-about-bio">
              Cuando quedé embarazada, algo cambió.
            </p>

            <p className="sp-about-bio">
              Aunque llevaba años trabajando con nutrición, el embarazo me abrió un mundo de preguntas que también eran nuevas para mí: <strong>¿cuánto debería subir de peso?, ¿por qué ese peso?, ¿qué pasa si subo más o menos?, ¿cómo debería alimentarme realmente?, ¿qué recomendaciones tienen fundamento y cuáles simplemente repetimos porque “siempre se han dicho”?</strong>
            </p>

            <p className="sp-about-bio">
              Y ahí me di cuenta de algo: en consulta había visto muchas veces estas mismas dudas, especialmente alrededor del peso, la alimentación y los cambios del cuerpo durante el embarazo, pero vivirlo en primera persona hizo que quisiera entenderlo mucho más a fondo.
            </p>

            <p className="sp-about-bio highlight">
              Así nació <strong>Mamás con Fundamento</strong>.
            </p>

            <p className="sp-about-bio">
              Un espacio para hablar de embarazo, posparto, nutrición, lactancia, recuperación y maternidad desde una mirada crítica y aterrizada. Sin miedo a cuestionar recomendaciones que no tienen sentido y sin convertir la maternidad en una lista interminable de reglas.
            </p>

            <p className="sp-about-bio">
              Quiero compartir aquí lo que he aprendido, lo que sigo aprendiendo y, sobre todo, ayudarte a tomar decisiones con <strong>más información y menos culpa</strong>.</p>

            <p className="sp-about-bio highlight">
              Y hoy, que mi hija ya nació, gracias a que entendí todo el proceso del embarazo desde la evidencia, he tenido un posparto más sano, sin complicaciones de bajo peso o exceso de peso post embarazo.
            </p>

            <blockquote className="sp-about-quote">
              "Porque ser mamá ya trae suficientes preguntas.<br />
              Al menos las respuestas deberían tener fundamento."
            </blockquote>

            <div className="sp-about-cta" style={{ marginTop: "24px" }}>
              <BuyButton label="Quiero nutrirme con fundamento →" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sp-testimonials" id="testimonios">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">Lo que dicen las mamás</span>
            <h2 className="sp-section-title">Mamás reales, resultados reales</h2>
            <p className="sp-section-subtitle">
              Estas son conversaciones reales de mamás que ya están usando el método.
            </p>
          </div>
          <div className="sp-testimonials-grid sp-reveal">
            {testimonials.map((t) => (
              <div className="sp-testimonial-card" key={t.name}>
                <div className="sp-testimonial-avatar">{t.initial}</div>
                <p className="sp-testimonial-name">{t.name}</p>
                <p className="sp-testimonial-context">{t.context}</p>
                <div className="sp-testimonial-stars">{t.stars}</div>
                <p className="sp-testimonial-text">{t.text}</p>
                {t.image && (
                  <div className="sp-testimonial-img-wrap" style={{ marginTop: "16px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(92,107,84,0.2)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <img src={t.image} alt={`Monitoreo real de ${t.name}`} style={{ width: "100%", display: "block" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="sp-pricing" id="comprar">
        <div className="sp-container">
          <div className="sp-reveal">
            <h2 className="sp-section-title">Acceso de por vida a todo el método</h2>
            <p className="sp-section-subtitle">Un solo pago. Sin suscripciones. Sin letra pequeña.</p>
          </div>
          <div className="sp-price-card sp-reveal">
            <span className="sp-price-popular">✨ Precio de lanzamiento</span>
            <p className="sp-price-what">Mamás con Fundamento</p>
            <p className="sp-price-name">Acceso Premium Completo</p>
            <div className="sp-price-amount-row">
              <span className="sp-price-old">$199.900</span>
              <span className="sp-price-new">$89.900</span>
              <span className="sp-price-currency">COP</span>
            </div>
            <p className="sp-price-note">Precio de lanzamiento · Acceso de por vida</p>
            <div className="sp-price-includes">
              <h4>Incluye todo esto:</h4>
              {[
                'E-book completo de 10 capítulos con bibliografía académica',
                'Monitoreo de peso ilimitado con la Curva de Atalah',
                'Reporte PDF descargable para llevar a tu cita médica',
                'Calculadora de porciones personalizada por peso y actividad',
                'Tracker de hábitos de bienestar materno',
                'Acceso de por vida desde cualquier dispositivo',
                'Actualizaciones futuras sin costo adicional',
              ].map((item) => (
                <div className="sp-price-item" key={item}>
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <BuyButton label="🛒 Quiero mi acceso ahora — $89.900 COP" />
            <div className="sp-guarantee">
              🔒 Pago 100% seguro con MercadoPago · Tarjeta, PSE o efectivo
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="sp-faqs" id="preguntas">
        <div className="sp-container">
          <div className="sp-reveal">
            <span className="sp-badge">Preguntas frecuentes</span>
            <h2 className="sp-section-title">¿Tienes dudas? Las respondemos</h2>
          </div>
          <div className="sp-faq-list sp-reveal">
            {faqs.map((f) => (
              <FaqItem key={f.question} question={f.question} answer={f.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="sp-final-cta">
        <div className="sp-container sp-reveal">
          <h2>Tu embarazo merece respuestas reales</h2>
          <p>
            No más confusión. No más culpa. Solo ciencia, claridad y las herramientas
            que necesitas para nutrirse mejor en cada etapa.
          </p>
          <BuyButton
            className="sp-btn-primary"
            label="🌱 Empezar mi método ahora — $89.900 COP"
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sp-footer">
        <p>© {new Date().getFullYear()} Mamás con Fundamento · Creado con ❤️ por Isabela Cuartas · <a href="/login">Iniciar sesión</a></p>
      </footer>
    </div>
  );
}
