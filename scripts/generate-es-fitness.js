// Generates slc/es/fitness.html (Spanish) from slc/fitness.html.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'slc', 'fitness.html');
const OUT = path.join(ROOT, 'slc', 'es', 'fitness.html');
const BASE = 'https://flowforge-iota-umber.vercel.app';

let h = fs.readFileSync(SRC, 'utf8');
const ES_TITLE = 'Sitios Web para Gimnasios y Fitness en Salt Lake City — FlowForge';
const ES_DESC = 'FlowForge crea sitios web para gimnasios y negocios fitness en Salt Lake City con ofertas de prueba, reservas en línea y horarios de clases que convierten visitantes en miembros que pagan.';

// HEAD / SEO
h = h.replace('<html lang="en"', '<html lang="es"');
h = h.replace(/<title>[^<]*<\/title>/, `<title>${ES_TITLE}</title>`);
h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${ES_DESC}">`);
h = h.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${ES_TITLE}$2`);
h = h.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${ES_DESC}$2`);
h = h.replace(/(<meta name="twitter:title" content=")[^"]*(">)/, `$1${ES_TITLE}$2`);
h = h.replace(/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${ES_DESC}$2`);
h = h.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${BASE}/slc/es/fitness$2`);
h = h.replace(`"url": "${BASE}/slc/fitness"`, `"url": "${BASE}/slc/es/fitness"`);
h = h.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${BASE}/slc/es/fitness$2`);
if (!/hreflang/.test(h)) {
  h = h.replace(/(<link rel="canonical"[^>]*>)/,
    `$1\n    <link rel="alternate" hreflang="en" href="${BASE}/slc/fitness">` +
    `\n    <link rel="alternate" hreflang="es" href="${BASE}/slc/es/fitness">` +
    `\n    <link rel="alternate" hreflang="x-default" href="${BASE}/slc/fitness">`);
}

// INTERNAL LINKS -> ES
h = h.split('href="/slc/contractors"').join('href="/slc/es/contractors"');
h = h.split('href="/slc"').join('href="/slc/es"');

// NAV language link: EN source has an "ES" link → flip it to "EN" on the ES page
h = h.replace('<li><a href="/slc/es/fitness">ES</a></li>', '<li><a href="/slc/fitness">EN</a></li>');
if (!h.includes('>EN</a></li>')) {
  h = h.replace('<li><a href="#contact" class="btn-nav">Get a Free Audit</a></li>',
    '<li><a href="/slc/fitness">EN</a></li>\n      <li><a href="#contact" class="btn-nav">Get a Free Audit</a></li>');
}

const T = [
  ['<li><a href="/slc/es">← SLC Hub</a></li>', '<li><a href="/slc/es">← Inicio SLC</a></li>'],
  ['<li><a href="/slc/es/contractors">Contractors</a></li>', '<li><a href="/slc/es/contractors">Contratistas</a></li>'],
  ['<span>/ Fitness & Gyms</span>', '<span>/ Fitness y Gimnasios</span>'],
  ['<span>Utah-based · Salt Lake City</span>', '<span>Con base en Utah · Salt Lake City</span>'],
  ['Accepting <strong>2 fitness projects</strong> — slots filling fast', 'Aceptando <strong>2 proyectos de fitness</strong> — los cupos se llenan rápido'],
  ['Your gym deserves<br>more than an <span class="gradient-text">Instagram bio.</span>', 'Tu gimnasio merece<br>más que una <span class="gradient-text">bio de Instagram.</span>'],
  ['We build fitness websites with trial offers, booking flows, and class schedules that turn visitors into paying members. Gyms, personal trainers, yoga studios, and wellness businesses across Salt Lake City.', 'Creamos sitios web de fitness con ofertas de prueba, reservas en línea y horarios de clases que convierten visitantes en miembros que pagan. Gimnasios, entrenadores personales, estudios de yoga y negocios de bienestar en todo Salt Lake City.'],
  ['>Get a Free Fitness Audit<', '>Auditoría Gratis de Fitness<'],
  ['See what\'s included →', 'Ver qué incluye →'],
  // schedule card
  ['Elevate Fitness SLC · Schedule', 'Elevate Fitness SLC · Horario'],
  ['>Live\n', '>En vivo\n'],
  ['<div style="font-size:.8rem;font-weight:700;color:#f1f5f9;">HIIT Bootcamp</div>', '<div style="font-size:.8rem;font-weight:700;color:#f1f5f9;">HIIT Bootcamp</div>'],
  ['6:00 AM · Monday', '6:00 AM · Lunes'],
  ['>4 spots<', '>4 lugares<'],
  ['7:30 AM · Monday', '7:30 AM · Lunes'],
  ['>Full<', '>Lleno<'],
  ['Free Trial Class', 'Clase de Prueba Gratis'],
  ['12:00 PM · Monday', '12:00 PM · Lunes'],
  ['>Trial open<', '>Prueba disponible<'],
  ['Strength & Conditioning', 'Fuerza y Acondicionamiento'],
  ['5:30 PM · Monday', '5:30 PM · Lunes'],
  ['>8 spots<', '>8 lugares<'],
  ['>Bookings<', '>Reservas<'],
  ['>Trials Today<', '>Pruebas Hoy<'],
  ['>Owned by You<', '>Tuyo al 100%<'],
  ['✓ Free trial booked in 22 seconds', '✓ Prueba gratis reservada en 22 segundos'],
  // trust
  ['<span>Utah-based builder</span>', '<span>Constructor con base en Utah</span>'],
  ['<span>2 live sites · Growing</span>', '<span>2 sitios activos · Creciendo</span>'],
  ['<span>Booking flows that convert</span>', '<span>Reservas que convierten</span>'],
  ['<span>Done in 2–3 weeks</span>', '<span>Listo en 2–3 semanas</span>'],
  ['<span>You own everything</span>', '<span>Eres dueño de todo</span>'],
  // pain
  ['<span class="label">The real problem</span>', '<span class="label">El problema real</span>'],
  ['Why Instagram alone<br>isn\'t growing your gym.', 'Por qué Instagram por sí solo<br>no hace crecer tu gimnasio.'],
  ['📱 Your booking link is buried in a bio', '📱 Tu enlace de reservas está enterrado en una bio'],
  ['Someone sees your transformation post, clicks to your profile, finds a Linktree, clicks again, lands on a confusing page. They leave. That\'s a lost member.', 'Alguien ve tu post de transformación, entra a tu perfil, encuentra un Linktree, hace clic otra vez, llega a una página confusa. Se va. Ese es un miembro perdido.'],
  ['We fix: Direct booking flow on your own site', 'Lo arreglamos: Reserva directa en tu propio sitio'],
  ['🕰️ Your website looks like it\'s from 2014', '🕰️ Tu sitio web parece de 2014'],
  ['Potential members judge you in 3 seconds. If your site looks outdated, they assume your equipment and coaching is too — even if it isn\'t.', 'Los miembros potenciales te juzgan en 3 segundos. Si tu sitio se ve anticuado, asumen que tu equipo y tu coaching también lo son — aunque no sea cierto.'],
  ['We fix: Modern, mobile-first design that reflects your brand', 'Lo arreglamos: Diseño moderno y mobile-first que refleja tu marca'],
  ['💸 You\'re not capturing leads off Instagram', '💸 No estás captando clientes fuera de Instagram'],
  ['When Instagram goes down, changes its algorithm, or you take a day off posting — your lead flow stops completely. A website works 24/7 with no algorithm.', 'Cuando Instagram se cae, cambia su algoritmo, o tomas un día sin publicar — tu flujo de clientes se detiene por completo. Un sitio web trabaja 24/7 sin algoritmo.'],
  ['We fix: Email capture + trial offer that runs on autopilot', 'Lo arreglamos: Captura de emails + oferta de prueba en piloto automático'],
  // pricing (shared)
  ['<span class="label">Pricing</span>', '<span class="label">Precios</span>'],
  ['Pick your plan.<br>No hidden fees.', 'Elige tu plan.<br>Sin costos ocultos.'],
  ['Start with the site. Add automations when you\'re ready.', 'Empieza con el sitio. Agrega automatizaciones cuando estés listo.'],
  ['💡 <strong style="color:var(--text);">Already have a website?</strong> FlowFrame Automation and AutoPilot work on any existing site — Wix, Squarespace, WordPress, anything. Same price.', '💡 <strong style="color:var(--text);">¿Ya tienes un sitio web?</strong> FlowFrame Automation y AutoPilot funcionan en cualquier sitio existente — Wix, Squarespace, WordPress, lo que sea. Mismo precio.'],
  ['>🔧 One-Time<', '>🔧 Pago Único<'],
  ['<span class="price-period"> one-time</span>', '<span class="price-period"> pago único</span>'],
  ['✓ Includes 30 days of automation setup & monitoring', '✓ Incluye 30 días de configuración y monitoreo de automatización'],
  ['"A fitness site with a built-in booking flow that converts visitors into trial signups — and trial signups into paying members."', '"Un sitio de fitness con reservas integradas que convierte visitantes en pruebas gratis — y pruebas gratis en miembros que pagan."'],
  ['<li>5–7 page mobile-first site</li>', '<li>Sitio mobile-first de 5–7 páginas</li>'],
  ['<li>Done in 2–3 weeks · 30 days of support</li>', '<li>Listo en 2–3 semanas · 30 días de soporte</li>'],
  ['<li>Full ownership from day one</li>', '<li>Propiedad total desde el primer día</li>'],
  ['<li>Local SEO — optimized for SLC</li>', '<li>SEO local — optimizado para SLC</li>'],
  ['<li>Google Business Profile connected</li>', '<li>Perfil de Google Business conectado</li>'],
  ['<li>50% upfront · 50% on delivery</li>', '<li>50% al inicio · 50% en la entrega</li>'],
  ['✦ Built for fitness', '✦ Hecho para fitness'],
  ['Trial offer + booking flow built in', 'Oferta de prueba + reservas integradas'],
  ['Class schedule section', 'Sección de horario de clases'],
  ['Transformation photo gallery', 'Galería de fotos de transformación'],
  ['>Get a Free Audit<', '>Auditoría Gratis<'],
  ['>⚡ Subscription<', '>⚡ Suscripción<'],
  ['+ $199 Setup & Integration', '+ $199 Configuración e Integración'],
  ['"Your leads never go cold. Set it once, runs forever — works on any website."', '"Tus clientes nunca se enfrían. Configúralo una vez, funciona para siempre — en cualquier sitio web."'],
  ['<li>Lead SMS within 2 min of form fill</li>', '<li>SMS del cliente en menos de 2 min del formulario</li>'],
  ['<li>3-touch follow-up sequence (SMS + email)</li>', '<li>Seguimiento en 3 contactos (SMS + email)</li>'],
  ['<li>Automated review request after each job</li>', '<li>Solicitud de reseña automática tras cada visita</li>'],
  ['<li>WhatsApp follow-up</li>', '<li>Seguimiento por WhatsApp</li>'],
  ['<li>Weekly performance report</li>', '<li>Reporte de desempeño semanal</li>'],
  ['<li>1 site update/month</li>', '<li>1 actualización del sitio al mes</li>'],
  ['<li>Works on any existing site</li>', '<li>Funciona en cualquier sitio existente</li>'],
  ['>Start Automation<', '>Iniciar Automatización<'],
  ['First 30 days included with Launch · then $249/mo · cancel anytime', 'Primeros 30 días incluidos con Launch · luego $249/mes · cancela cuando quieras'],
  ['⭐ MOST POPULAR', '⭐ MÁS POPULAR'],
  ['>🚀 Pro Subscription<', '>🚀 Suscripción Pro<'],
  ['+ $299 Setup & Integration', '+ $299 Configuración e Integración'],
  ['"Your marketing runs while your members train. Works on any existing website."', '"Tu marketing trabaja mientras tus miembros entrenan. Funciona en cualquier sitio existente."'],
  ['<li>Everything in Automation</li>', '<li>Todo lo de Automation</li>'],
  ['<li>5 social posts/week (Instagram + Facebook)</li>', '<li>5 publicaciones/semana (Instagram + Facebook)</li>'],
  ['<li>Google Business Profile updates</li>', '<li>Actualizaciones del Perfil de Google Business</li>'],
  ['<li>AI chat widget on your site</li>', '<li>Chat con IA en tu sitio</li>'],
  ['<li>Missed call text-back</li>', '<li>Texto automático por llamada perdida</li>'],
  ['<li>Unlimited site updates</li>', '<li>Actualizaciones ilimitadas del sitio</li>'],
  ['<li>Monthly strategy call</li>', '<li>Llamada de estrategia mensual</li>'],
  ['<li>SEO progress report</li>', '<li>Reporte de avance de SEO</li>'],
  ['<li>Priority support</li>', '<li>Soporte prioritario</li>'],
  ['>Start AutoPilot<', '>Iniciar AutoPilot<'],
  ['First 30 days included with Launch · then $449/mo · cancel anytime', 'Primeros 30 días incluidos con Launch · luego $449/mes · cancela cuando quieras'],
  // process
  ['<span class="label">The process</span>', '<span class="label">El proceso</span>'],
  ['Simple. Fast. No surprises.', 'Simple. Rápido. Sin sorpresas.'],
  ['Free Audit Call', 'Llamada de Auditoría Gratis'],
  ['We look at your current online presence — site, Instagram, Google listing — and tell you exactly what\'s holding back your membership growth. No pitch, no pressure.', 'Revisamos tu presencia en línea — sitio, Instagram, ficha de Google — y te decimos exactamente qué está frenando el crecimiento de tus miembros. Sin venta, sin presión.'],
  ['We Build It', 'Lo Construimos'],
  ['You approve the plan. We design, build, and test everything in 2–3 weeks. You see progress every few days and can give feedback at any point.', 'Apruebas el plan. Diseñamos, construimos y probamos todo en 2–3 semanas. Ves avances cada pocos días y puedes dar tu opinión en cualquier momento.'],
  ['Members Start Booking', 'Los Miembros Empiezan a Reservar'],
  ['Your site goes live. Trial signups start coming in directly — no algorithm, no link in bio. We stick around for 30 days then hand over full ownership.', 'Tu sitio se publica. Las pruebas gratis empiezan a llegar directamente — sin algoritmo, sin link en la bio. Te acompañamos 30 días y luego te entregamos la propiedad total.'],
  // proof
  ['<span class="label">Our work</span>', '<span class="label">Nuestro trabajo</span>'],
  ['Sites we\'ve shipped.', 'Sitios que hemos lanzado.'],
  ['Productivity App · Browser Extension', 'App de Productividad · Extensión de Navegador'],
  ['Clarity — Time & Money Tracker', 'Clarity — Control de Tiempo y Dinero'],
  ['Full product landing page for a Chrome extension that tracks social media time and meeting costs. Clean, conversion-focused design — shows the level of craft we bring to every project.', 'Landing page completa para una extensión de Chrome que mide el tiempo en redes sociales y el costo de las reuniones. Diseño limpio y enfocado en conversión — muestra el nivel de calidad que ponemos en cada proyecto.'],
  ['View live site →', 'Ver sitio →'],
  ['Want to be our first SLC fitness case study?', '¿Quieres ser nuestro primer caso de éxito de fitness en SLC?'],
  ['Claim your spot →', 'Reserva tu lugar →'],
  // faq
  ['<span class="label">Common questions</span>', '<span class="label">Preguntas frecuentes</span>'],
  ['What gym owners ask us.', 'Lo que nos preguntan los dueños de gimnasios.'],
  ['Can\'t I just use Mindbody or Glofox for my website?', '¿No me sirve solo Mindbody o Glofox como sitio web?'],
  ['Those are booking management tools — not websites. They give you a booking widget you embed somewhere, but you still need an actual site that represents your brand, ranks on Google, and gets people to that booking step in the first place. We build that site.', 'Esas son herramientas de gestión de reservas — no sitios web. Te dan un widget de reservas para insertar en algún lado, pero igual necesitas un sitio real que represente tu marca, aparezca en Google y lleve a la gente hasta ese paso de reserva. Nosotros construimos ese sitio.'],
  ['Do you integrate with my existing booking software?', '¿Se integran con mi software de reservas actual?'],
  ['Yes. We integrate with Calendly, Mindbody, Acuity, and most other booking tools. If you don\'t have one, we\'ll set up a simple booking form that works without any monthly software fee.', 'Sí. Nos integramos con Calendly, Mindbody, Acuity y la mayoría de herramientas de reservas. Si no tienes una, configuramos un formulario de reservas simple que funciona sin ninguna cuota mensual de software.'],
  ['How long does it take?', '¿Cuánto tarda?'],
  ['2–3 weeks from the day you approve the plan. One point of contact — you\'re talking directly to the person building it. No account managers, no waiting.', '2–3 semanas desde el día que apruebas el plan. Un solo punto de contacto — hablas directamente con quien lo construye. Sin ejecutivos de cuenta, sin esperas.'],
  ['What if I already have a website I don\'t like?', '¿Y si ya tengo un sitio web que no me gusta?'],
  ['We\'ll tell you honestly on the free audit call: targeted fixes, or start fresh. Sometimes a new hero section and a proper booking flow is all you need. We\'ll know after 20 minutes.', 'En la llamada de auditoría gratis te decimos con honestidad: ajustes puntuales, o empezar de cero. A veces solo necesitas una nueva sección hero y un buen flujo de reservas. Lo sabremos en 20 minutos.'],
  // final cta
  ['<span class="label">Let\'s talk</span>', '<span class="label">Hablemos</span>'],
  ['Ready to grow your<br>membership online?', '¿Listo para hacer crecer tus<br>miembros en línea?'],
  ['Start with a free 20-minute audit. We\'ll look at your current site, your Instagram, and your Google listing — and tell you exactly what\'s costing you signups. No strings attached.', 'Empieza con una auditoría gratis de 20 minutos. Revisamos tu sitio actual, tu Instagram y tu ficha de Google — y te decimos exactamente qué te está costando inscripciones. Sin compromiso.'],
  ['>Book My Free Audit<', '>Reservar mi Auditoría Gratis<'],
  ['Message on WhatsApp →', 'Escríbenos por WhatsApp →'],
  ['No commitment. No sales pitch. Just a straight look at your online presence.', 'Sin compromiso. Sin discurso de ventas. Solo una mirada honesta a tu presencia en línea.'],
  ['📍 Serving fitness businesses across Salt Lake City', '📍 Atendemos negocios de fitness en todo Salt Lake City'],
  // footer
  ['<a href="#contact">Contact</a>', '<a href="#contact">Contacto</a>'],
  ['<a href="/slc/es">SLC Hub</a>', '<a href="/slc/es">Inicio SLC</a>'],
  ['<a href="/slc/es/contractors">Contractors</a>', '<a href="/slc/es/contractors">Contratistas</a>'],
];

let applied = 0, missed = [];
for (const [en, es] of T) {
  if (h.includes(en)) { h = h.split(en).join(es); applied++; }
  else missed.push(en.slice(0, 55));
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, h);
console.log('Wrote', path.relative(ROOT, OUT), '| applied', applied + '/' + T.length);
if (missed.length) console.log('MISSED:\n  ' + missed.join('\n  '));
