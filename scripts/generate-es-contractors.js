// Generates slc/es/contractors.html (Spanish) from slc/contractors.html.
// Translation map is explicit and reviewable. Re-run after EN content changes.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'slc', 'contractors.html');
const OUT = path.join(ROOT, 'slc', 'es', 'contractors.html');
const BASE = 'https://flowforge-iota-umber.vercel.app';

let h = fs.readFileSync(SRC, 'utf8');

// ---- HEAD / SEO ----
h = h.replace('<html lang="en"', '<html lang="es"');
h = h.replace('<title>Contractor Websites Salt Lake City — FlowForge</title>',
              '<title>Sitios Web para Contratistas en Salt Lake City — FlowForge</title>');
const ES_DESC = 'FlowForge crea sitios web para contratistas en Salt Lake City que te hacen aparecer en Google, generan solicitudes de presupuesto y dan seguimiento automático. Techadores, HVAC, plomeros, jardineros.';
h = h.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${ES_DESC}">`);
h = h.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1Sitios Web para Contratistas en Salt Lake City — FlowForge$2`);
h = h.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${ES_DESC}$2`);
h = h.replace(/(<meta name="twitter:title" content=")[^"]*(">)/, `$1Sitios Web para Contratistas en Salt Lake City — FlowForge$2`);
h = h.replace(/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${ES_DESC}$2`);
h = h.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${BASE}/slc/es/contractors$2`);
h = h.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${BASE}/slc/es/contractors$2`);
h = h.replace(`"url": "${BASE}/slc/contractors"`, `"url": "${BASE}/slc/es/contractors"`);
// hreflang: only insert if the EN source doesn't already carry it (idempotent)
if (!/hreflang/.test(h)) {
  h = h.replace(/(<link rel="canonical"[^>]*>)/,
    `$1\n    <link rel="alternate" hreflang="en" href="${BASE}/slc/contractors">` +
    `\n    <link rel="alternate" hreflang="es" href="${BASE}/slc/es/contractors">` +
    `\n    <link rel="alternate" hreflang="x-default" href="${BASE}/slc/contractors">`);
}

// ---- INTERNAL LINKS -> ES counterparts ----
h = h.split('href="/slc/fitness"').join('href="/slc/es/fitness"');
h = h.split('href="/slc"').join('href="/slc/es"');   // hub link + breadcrumb + footer (latino stays /slc/latino)

// ---- NAV language link: EN source has an "ES" link → flip it to "EN" on the ES page ----
h = h.replace('<li><a href="/slc/es/contractors">ES</a></li>', '<li><a href="/slc/contractors">EN</a></li>');
// (if EN source predates that link, add an EN link before the CTA)
if (!h.includes('>EN</a></li>')) {
  h = h.replace('<li><a href="#contact" class="btn-nav">Get a Free Audit</a></li>',
    '<li><a href="/slc/contractors">EN</a></li>\n      <li><a href="#contact" class="btn-nav">Get a Free Audit</a></li>');
}

// ---- TEXT TRANSLATIONS (order: longest/most-specific first) ----
const T = [
  // nav
  ['<li><a href="/slc/es">← SLC Hub</a></li>', '<li><a href="/slc/es">← Inicio SLC</a></li>'],
  // breadcrumb
  ['<span>/ Contractors</span>', '<span>/ Contratistas</span>'],
  // hero
  ['<span>Utah-based · Salt Lake City</span>', '<span>Con base en Utah · Salt Lake City</span>'],
  ['Accepting <strong>2 contractor projects</strong> — slots filling fast', 'Aceptando <strong>2 proyectos de contratistas</strong> — los cupos se llenan rápido'],
  ['Your phone should<br>be <span class="gradient-text">ringing.</span><br>If it isn\'t, your<br>website is the problem.', 'Tu teléfono debería<br>estar <span class="gradient-text">sonando.</span><br>Si no suena, el<br>problema es tu sitio web.'],
  ['We build contractor websites that get you found on Google, make it dead simple to request a quote in under 30 seconds, and follow up automatically so no lead goes cold. Roofers, HVAC, plumbers, landscapers — all of SLC.', 'Creamos sitios web para contratistas que te hacen aparecer en Google, hacen súper fácil pedir un presupuesto en menos de 30 segundos y dan seguimiento automático para que ningún cliente se enfríe. Techadores, HVAC, plomeros, jardineros — en todo SLC.'],
  ['>Get a Free Contractor Audit<', '>Auditoría Gratis para Contratistas<'],
  ['See what\'s included →', 'Ver qué incluye →'],
  // leads card
  ['FlowForge · Contractor Leads', 'FlowForge · Leads de Contratistas'],
  ['>Live\n', '>En vivo\n'],
  ['Quote request · South Salt Lake', 'Solicitud de presupuesto · South Salt Lake'],
  ['>New Lead<', '>Nuevo Lead<'],
  ['>Booked<', '>Reservado<'],
  ['AC repair · Sandy', 'Reparación de AC · Sandy'],
  ['Quote request · Draper', 'Solicitud de presupuesto · Draper'],
  ['>Quote Sent<', '>Presupuesto Enviado<'],
  ['Emergency repair · Murray', 'Reparación de emergencia · Murray'],
  ['>Leads Today<', '>Leads Hoy<'],
  ['>Owned by You<', '>Tuyo al 100%<'],
  ['✓ Quote request in 28 seconds', '✓ Solicitud de presupuesto en 28 segundos'],
  // trust bar
  ['<span>Utah-based builder</span>', '<span>Constructor con base en Utah</span>'],
  ['<span>2 live sites · Growing</span>', '<span>2 sitios activos · Creciendo</span>'],
  ['<span>Done in 2–3 weeks</span>', '<span>Listo en 2–3 semanas</span>'],
  ['<span>You own everything</span>', '<span>Eres dueño de todo</span>'],
  ['<span>Reply in &lt; 24h</span>', '<span>Respuesta en &lt; 24h</span>'],
  // pain
  ['Why contractors lose jobs online', 'Por qué los contratistas pierden trabajos en línea'],
  ['Three things killing<br>your lead flow right now.', 'Tres cosas que están matando<br>tu flujo de clientes ahora mismo.'],
  ['🐢 Your site loads slow on mobile', '🐢 Tu sitio carga lento en el celular'],
  ['67% of homeowners search for contractors on their phone. If your site takes more than 3 seconds to load, they\'re gone — and calling your competitor.', 'El 67% de los dueños de casa buscan contratistas desde el celular. Si tu sitio tarda más de 3 segundos en cargar, se van — y llaman a tu competencia.'],
  ['We fix: Under 3s load time, mobile-first layout', 'Lo arreglamos: Carga en menos de 3s, diseño mobile-first'],
  ['📭 Leads come in — nobody follows up', '📭 Llegan clientes — nadie da seguimiento'],
  ['A homeowner fills out your contact form at 8pm. You see it the next morning. By then they\'ve already booked someone else. Speed-to-lead wins the job.', 'Un cliente llena tu formulario a las 8pm. Tú lo ves a la mañana siguiente. Para entonces ya contrató a otro. La rapidez en responder gana el trabajo.'],
  ['We fix: Instant SMS to you + auto-reply to prospect', 'Lo arreglamos: SMS instantáneo para ti + respuesta automática al cliente'],
  ['🔍 You\'re invisible on Google', '🔍 Eres invisible en Google'],
  ['When someone searches "roofer near me" in Sandy, your site doesn\'t show up. That\'s not an SEO mystery — it\'s a fixable technical problem.', 'Cuando alguien busca "techador cerca de mí" en Sandy, tu sitio no aparece. No es un misterio de SEO — es un problema técnico que se puede arreglar.'],
  ['We fix: Local SEO, Google Business Profile, location pages', 'Lo arreglamos: SEO local, Perfil de Google Business, páginas por zona'],
  // pricing
  ['<span class="label">Pricing</span>', '<span class="label">Precios</span>'],
  ['Pick your plan.<br>No hidden fees.', 'Elige tu plan.<br>Sin costos ocultos.'],
  ['Start with the site. Add automations when you\'re ready.', 'Empieza con el sitio. Agrega automatizaciones cuando estés listo.'],
  ['💡 <strong style="color:var(--text);">Already have a website?</strong> FlowFrame Automation and AutoPilot work on any existing site — Wix, Squarespace, WordPress, anything. Same price.', '💡 <strong style="color:var(--text);">¿Ya tienes un sitio web?</strong> FlowFrame Automation y AutoPilot funcionan en cualquier sitio existente — Wix, Squarespace, WordPress, lo que sea. Mismo precio.'],
  ['>🔧 One-Time<', '>🔧 Pago Único<'],
  ['<span class="price-period"> one-time</span>', '<span class="price-period"> pago único</span>'],
  ['✓ Includes 30 days of automation setup & monitoring', '✓ Incluye 30 días de configuración y monitoreo de automatización'],
  ['"A contractor site that gets you found on Google and turns visitors into quote requests in under 30 seconds."', '"Un sitio para contratistas que te hace aparecer en Google y convierte visitantes en solicitudes de presupuesto en menos de 30 segundos."'],
  ['<li>5–7 page mobile-first site</li>', '<li>Sitio mobile-first de 5–7 páginas</li>'],
  ['<li>Done in 2–3 weeks · 30 days of support</li>', '<li>Listo en 2–3 semanas · 30 días de soporte</li>'],
  ['<li>Full ownership from day one</li>', '<li>Propiedad total desde el primer día</li>'],
  ['<li>Local SEO — optimized for SLC</li>', '<li>SEO local — optimizado para SLC</li>'],
  ['<li>Google Business Profile connected</li>', '<li>Perfil de Google Business conectado</li>'],
  ['<li>50% upfront · 50% on delivery</li>', '<li>50% al inicio · 50% en la entrega</li>'],
  ['✦ Built for contractors', '✦ Hecho para contratistas'],
  ['Quote form — converts in under 30 sec', 'Formulario de presupuesto — convierte en menos de 30 seg'],
  ['Before/after gallery for past jobs', 'Galería de antes/después de trabajos anteriores'],
  ['Service area pages: SLC, Sandy, Draper, Murray', 'Páginas por zona: SLC, Sandy, Draper, Murray'],
  ['>Get a Free Audit<', '>Auditoría Gratis<'],
  ['>⚡ Subscription<', '>⚡ Suscripción<'],
  ['+ $199 Setup & Integration', '+ $199 Configuración e Integración'],
  ['"Your leads never go cold. Set it once, runs forever — works on any website."', '"Tus clientes nunca se enfrían. Configúralo una vez, funciona para siempre — en cualquier sitio web."'],
  ['<li>Lead SMS within 2 min of form fill</li>', '<li>SMS del cliente en menos de 2 min del formulario</li>'],
  ['<li>3-touch follow-up sequence (SMS + email)</li>', '<li>Seguimiento en 3 contactos (SMS + email)</li>'],
  ['<li>Automated review request after each job</li>', '<li>Solicitud de reseña automática tras cada trabajo</li>'],
  ['<li>WhatsApp follow-up</li>', '<li>Seguimiento por WhatsApp</li>'],
  ['<li>Weekly performance report</li>', '<li>Reporte de desempeño semanal</li>'],
  ['<li>1 site update/month</li>', '<li>1 actualización del sitio al mes</li>'],
  ['<li>Works on any existing site</li>', '<li>Funciona en cualquier sitio existente</li>'],
  ['>Start Automation<', '>Iniciar Automatización<'],
  ['First 30 days included with Launch · then $249/mo · cancel anytime', 'Primeros 30 días incluidos con Launch · luego $249/mes · cancela cuando quieras'],
  ['⭐ MOST POPULAR', '⭐ MÁS POPULAR'],
  ['>🚀 Pro Subscription<', '>🚀 Suscripción Pro<'],
  ['+ $299 Setup & Integration', '+ $299 Configuración e Integración'],
  ['"Your marketing runs while you\'re on the job. Works on any existing website."', '"Tu marketing trabaja mientras tú estás en la obra. Funciona en cualquier sitio existente."'],
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
  ['We look at your current site, your Google rankings, and your competitors. You get a clear picture of what\'s broken and how to fix it — no pitch, no pressure.', 'Revisamos tu sitio actual, tu posición en Google y a tu competencia. Te damos un panorama claro de qué está fallando y cómo arreglarlo — sin venta, sin presión.'],
  ['We Build It', 'Lo Construimos'],
  ['You approve the plan. We design, build, and test your site in 2–3 weeks. Progress updates every few days. No scope creep, no surprises.', 'Apruebas el plan. Diseñamos, construimos y probamos tu sitio en 2–3 semanas. Avances cada pocos días. Sin sorpresas ni cambios de alcance.'],
  ['Your Phone Rings', 'Tu Teléfono Suena'],
  ['Your site goes live. Quote requests start coming in. We stick around for 30 days then hand over full ownership. The site is yours, forever.', 'Tu sitio se publica. Empiezan a llegar las solicitudes de presupuesto. Te acompañamos 30 días y luego te entregamos la propiedad total. El sitio es tuyo, para siempre.'],
  // proof
  ['<span class="label">Our work</span>', '<span class="label">Nuestro trabajo</span>'],
  ['Sites we\'ve shipped.', 'Sitios que hemos lanzado.'],
  ['Local Business · Huancayo, Peru', 'Negocio Local · Huancayo, Perú'],
  ['FotoExpress Peru — Photo Printing', 'FotoExpress Perú — Impresión de Fotos'],
  ['Bilingual e-commerce site for a local photo printing shop. Online ordering, WhatsApp integration, local delivery flow — built for a Spanish-speaking market. Shows what a clean, conversion-first local site looks like.', 'Sitio de e-commerce bilingüe para una tienda local de impresión de fotos. Pedidos en línea, integración con WhatsApp y entrega local — hecho para un mercado hispanohablante. Muestra cómo se ve un sitio local limpio y enfocado en conversión.'],
  ['View live site →', 'Ver sitio →'],
  ['Want to be our first SLC contractor case study?', '¿Quieres ser nuestro primer caso de éxito de contratistas en SLC?'],
  ['Claim your spot →', 'Reserva tu lugar →'],
  // faq
  ['<span class="label">Common questions</span>', '<span class="label">Preguntas frecuentes</span>'],
  ['What contractors ask us.', 'Lo que nos preguntan los contratistas.'],
  ['I already have a website. Why would I need a new one?', 'Ya tengo un sitio web. ¿Por qué necesitaría uno nuevo?'],
  ['Most contractor sites we look at have 3–5 problems that are actively costing leads: slow mobile load time, no clear quote request flow, not connected to Google Business Profile, and missing local SEO for the neighborhoods you actually serve. We\'ll tell you honestly on the free audit whether you need a new site or just some targeted fixes.', 'La mayoría de los sitios de contratistas que revisamos tienen entre 3 y 5 problemas que cuestan clientes: carga lenta en el celular, sin un flujo claro para pedir presupuesto, sin conexión al Perfil de Google Business y sin SEO local para las zonas que realmente atiendes. En la auditoría gratis te decimos con honestidad si necesitas un sitio nuevo o solo algunos ajustes puntuales.'],
  ['How long does it take to build?', '¿Cuánto tarda en construirse?'],
  ['2–3 weeks from the day you approve the plan. One point of contact — you talk directly to the person building it. No committees, no waiting on account managers.', '2–3 semanas desde el día que apruebas el plan. Un solo punto de contacto — hablas directamente con quien lo construye. Sin comités, sin esperar a ejecutivos de cuenta.'],
  ['Do I have to pay everything upfront?', '¿Tengo que pagar todo por adelantado?'],
  ['No. 50% to start, 50% when we deliver. We accept bank transfer, PayPal, and Stripe.', 'No. 50% para empezar, 50% al entregar. Aceptamos transferencia bancaria, PayPal y Stripe.'],
  ['What areas of SLC do you target for local SEO?', '¿Qué zonas de SLC trabajas para el SEO local?'],
  ['Whatever service areas you want to win. We typically build location pages for: Salt Lake City, Sandy, Draper, Murray, West Valley City, South Salt Lake, Millcreek, Taylorsville, Riverton, and Herriman — but we tailor it to where your jobs actually come from.', 'Las zonas que quieras ganar. Normalmente creamos páginas por ubicación para: Salt Lake City, Sandy, Draper, Murray, West Valley City, South Salt Lake, Millcreek, Taylorsville, Riverton y Herriman — pero lo ajustamos según de dónde vienen tus trabajos.'],
  // final cta
  ['<span class="label">Let\'s talk</span>', '<span class="label">Hablemos</span>'],
  ['Ready to get more<br>quote requests?', '¿Listo para recibir más<br>solicitudes de presupuesto?'],
  ['Start with a free 20-minute audit. We\'ll look at your current site, your Google rankings, and tell you exactly what\'s holding you back — no strings attached.', 'Empieza con una auditoría gratis de 20 minutos. Revisamos tu sitio actual y tu posición en Google, y te decimos exactamente qué te está frenando — sin compromiso.'],
  ['>Book My Free Audit<', '>Reservar mi Auditoría Gratis<'],
  ['Message on WhatsApp →', 'Escríbenos por WhatsApp →'],
  ['No commitment. No sales pitch. Just a straight look at your online presence.', 'Sin compromiso. Sin discurso de ventas. Solo una mirada honesta a tu presencia en línea.'],
  ['📍 Serving contractors across Salt Lake City and surrounding areas', '📍 Atendemos contratistas en Salt Lake City y zonas aledañas'],
  // footer
  ['<a href="#contact">Contact</a>', '<a href="#contact">Contacto</a>'],
  ['<a href="/slc/es">SLC Hub</a>', '<a href="/slc/es">Inicio SLC</a>'],
];

let applied = 0, missed = [];
for (const [en, es] of T) {
  if (h.includes(en)) { h = h.split(en).join(es); applied++; }
  else missed.push(en.slice(0, 50));
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, h);
console.log('Wrote', path.relative(ROOT, OUT), '| applied', applied + '/' + T.length);
if (missed.length) console.log('MISSED:\n  ' + missed.join('\n  '));
