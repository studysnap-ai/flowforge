// Generates slc/es.html (Spanish hub) from slc.html using its own T translations.
// Re-run after editing slc.html EN content to keep the Spanish version in sync.
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'slc.html');
const OUT = path.join(ROOT, 'slc', 'es.html');
const BASE = 'https://flowforge-iota-umber.vercel.app';

const ES_TITLE = 'Diseño Web para Negocios de Servicios en Salt Lake City — FlowForge';
const ES_DESC  = 'FlowForge crea sitios web de alta conversión para contratistas, gimnasios y negocios latinos en Salt Lake City. Mobile-first, bilingües y diseñados para conseguirte clientes.';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// --- 1. Extract the `const T = { ... }` object literal (string-aware brace match) ---
let raw = fs.readFileSync(SRC, 'utf8');
const marker = 'const T = ';
const mi = raw.indexOf(marker);
if (mi < 0) throw new Error('T object not found');
let i = raw.indexOf('{', mi);
const startObj = i;
let depth = 0, str = null, esc2 = false;
for (; i < raw.length; i++) {
  const c = raw[i];
  if (str) {
    if (esc2) { esc2 = false; }
    else if (c === '\\') { esc2 = true; }
    else if (c === str) { str = null; }
  } else {
    if (c === "'" || c === '"' || c === '`') str = c;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
  }
}
const literal = raw.slice(startObj, i);
const T = new Function('return ' + literal)();
if (!T.es) throw new Error('T.es missing');

// --- 2. Parse HTML (preserve doctype) ---
const doctypeMatch = raw.match(/^\s*<!DOCTYPE[^>]*>/i);
const doctype = doctypeMatch ? doctypeMatch[0] : '<!DOCTYPE html>';
const root = parse(raw, { lowerCaseTagName: false, comment: true,
  blockTextElements: { script: true, style: true, noscript: true } });

// --- 3. Apply Spanish translations ---
let applied = 0;
root.querySelectorAll('[data-i18n]').forEach(el => {
  const k = el.getAttribute('data-i18n');
  if (T.es[k] !== undefined) { el.set_content(esc(T.es[k])); applied++; }
});
root.querySelectorAll('[data-i18n-html]').forEach(el => {
  const k = el.getAttribute('data-i18n-html');
  if (T.es[k] !== undefined) { el.set_content(T.es[k]); applied++; }
});

// --- 4. <html lang>, head meta ---
const htmlEl = root.querySelector('html');
htmlEl.setAttribute('lang', 'es');

const titleEl = root.querySelector('title');
if (titleEl) titleEl.set_content(esc(ES_TITLE));
const descEl = root.querySelector('meta[name="description"]');
if (descEl) descEl.setAttribute('content', ES_DESC);

const setMeta = (sel, attr, val) => { const e = root.querySelector(sel); if (e) e.setAttribute(attr, val); };
setMeta('link[rel="canonical"]', 'href', BASE + '/slc/es');
setMeta('meta[property="og:title"]', 'content', ES_TITLE);
setMeta('meta[property="og:description"]', 'content', ES_DESC);
setMeta('meta[property="og:url"]', 'content', BASE + '/slc/es');
setMeta('meta[name="twitter:title"]', 'content', ES_TITLE);
setMeta('meta[name="twitter:description"]', 'content', ES_DESC);

// hreflang trio is already present in slc.html source (reciprocal, identical on both
// language versions) so it carries over — only the canonical above is page-specific.

// --- 5. Language toggle -> navigation; ES active ---
['nav-btn-en', 'nav-btn-en-m'].forEach(id => {
  const b = root.querySelector('#' + id);
  if (b) { b.setAttribute('onclick', "location.href='/slc'"); b.setAttribute('class', b.getAttribute('class').replace(/\bactive\b/, '').trim()); }
});
['nav-btn-es', 'nav-btn-es-m'].forEach(id => {
  const b = root.querySelector('#' + id);
  if (b) { b.setAttribute('onclick', "location.href='/slc/es'"); const c = b.getAttribute('class') || ''; if (!/\bactive\b/.test(c)) b.setAttribute('class', (c + ' active').trim()); }
});

// --- 6. Lock page language (ignore localStorage so URL controls language) ---
let out = doctype + '\n' + root.toString();
out = out.replace(/let currentLang = 'en';/, "let currentLang = 'es';");
// Point niche-card links at the Spanish niche pages (latino is already Spanish, leave it)
out = out.split('href="/slc/contractors"').join('href="/slc/es/contractors"');
out = out.split('href="/slc/fitness"').join('href="/slc/es/fitness"');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('Generated', path.relative(ROOT, OUT), '| translations applied:', applied, '| size:', out.length);
