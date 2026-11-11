/* =====================================================================
   BURGER 87 · CAPA INTERACTIVA
   Cambia solo la presentación: íconos en lugar de emojis, animaciones,
   buscador y vista rápida de la carta. Si este archivo falla, el sistema
   sigue funcionando igual, porque ningún pedido ni cobro pasa por aquí.
   ===================================================================== */
(() => {
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // "carta" = carta de mesas del sistema; "domicilios" = página de pedidos por WhatsApp
  const PAGINA = document.documentElement.dataset.pxPagina || "carta";
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- 1. Íconos ---------- */
  const TRAZOS = {
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    burger: '<path d="M4 11c0-4 3.6-6.500 8-6.500s8 2.500 8 6.500H4Z"/><path d="M3 14.500c1.500 1.300 3 1.300 4.500 0s3-1.300 4.500 0 3 1.300 4.500 0 3-1.300 4.500 0"/><path d="M5 18h14a0 0 0 0 1 0 0 2.500 2.500 0 0 1-2.500 2h-9A2.500 2.500 0 0 1 5 18Z"/>',
    billete: '<rect x="2.500" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.600"/><path d="M6 9.500v.01M18 14.500v.01"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4.500 20.500c1-4 4-6 7.500-6s6.500 2 7.500 6"/>',
    usuarios: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c.8-3.500 3.300-5.500 6.500-5.500s5.700 2 6.500 5.500"/><path d="M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.800c1.800.7 3 2.500 3.500 5.200"/>',
    timbre: '<path d="M4 17a8 8 0 0 1 16 0"/><path d="M2.500 17h19M12 9V6.500M10 6.500h4M6 20.500h12"/>',
    plato: '<path d="M4 3v7a2.500 2.500 0 0 0 5 0V3M6.500 3v18"/><path d="M18 21v-7h-2.500V7c0-2.500 1.300-4 2.500-4Z"/>',
    moto: '<circle cx="6" cy="17.500" r="2.800"/><circle cx="18" cy="17.500" r="2.800"/><path d="M8.800 17.500h6.400l2-8.500h-3M17.200 9H20M4 12.500h6.500l2 5M4.500 9.500h5v3"/>',
    basura: '<path d="M4 7h16M9.500 7V4.500h5V7M6.500 7l1 13.500h9l1-13.500M10 11v6M14 11v6"/>',
    recibo: '<path d="M5.500 3v18l2.200-1.500 2.100 1.500 2.200-1.500 2.200 1.500 2.100-1.500 2.200 1.500V3l-2.200 1.500L14.200 3 12 4.500 9.800 3 7.700 4.500Z"/><path d="M9 9.500h6M9 13.500h6"/>',
    alerta: '<path d="M12 3.500 2.500 20h19Z"/><path d="M12 10v4.500M12 17.500v.01"/>',
    lapiz: '<path d="m4 20 1-4.500L16.500 4l3.500 3.500L8.500 19Z"/><path d="m14 6.500 3.500 3.500"/>',
    campana: '<path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 2h-15Z"/><path d="M10 21.500h4"/>',
    campanaNo: '<path d="M8 5.500A6 6 0 0 1 18 11v4M6 9.500v7l-1.500 2H17M10 21.500h4M3.500 3.500l17 17"/>',
    trofeo: '<path d="M7 4h10v6a5 5 0 0 1-10 0Z"/><path d="M7 5.500H3.500c0 3.500 1.500 5.500 4 6M17 5.500h3.500c0 3.500-1.500 5.500-4 6M12 15v4M8 20.500h8"/>',
    llave: '<circle cx="8" cy="15.500" r="4.500"/><path d="m11.500 12.500 8.500-8.500M16 8l3 3M13.500 10.500l2 2"/>',
    llama: '<path d="M12 2.500c.8 3.500 6 6.200 6 11.500a6 6 0 0 1-12 0c0-2.200 1-3.800 2.200-5 .2 1.700 1 2.700 2 3.200C9.800 8.800 10.500 5.200 12 2.500Z"/>',
    sarten: '<circle cx="9.500" cy="12" r="6.800"/><circle cx="9.500" cy="12" r="2.600"/><path d="m15.500 8.500 6-4.500"/>',
    impresora: '<path d="M7 8V3.500h10V8M7 17.500H4V8.500h16v9h-3"/><rect x="7" y="14" width="10" height="6.500"/>',
    mano: '<path d="M7.500 12V6.500a1.500 1.500 0 0 1 3 0V11M10.500 11V4.500a1.500 1.500 0 0 1 3 0V11M13.500 11V6a1.500 1.500 0 0 1 3 0v8c0 4-2.300 6.500-5.500 6.500-3 0-4.500-2-6-5.500L4.300 13a1.500 1.500 0 0 1 2.700-1.200l.5.700"/>',
    corona: '<path d="m3.500 8 4 3.500L12 5l4.500 6.500 4-3.500-1.700 10.500H5.200Z"/><path d="M5.500 21.500h13"/>',
    prohibido: '<circle cx="12" cy="12" r="9"/><path d="m5.700 5.700 12.600 12.600"/>',
    silla: '<path d="M7 3v10h10V3M7 13l-1 8.500M17 13l1 8.500M7 8h10M7 17.500h10"/>',
    deshacer: '<path d="M8.500 5 4 9.500 8.500 14"/><path d="M4 9.500h10a5.500 5.500 0 0 1 0 11h-3"/>',
    pin: '<path d="M12 21.500s7-6.300 7-12a7 7 0 0 0-14 0c0 5.700 7 12 7 12Z"/><circle cx="12" cy="9.500" r="2.500"/>',
    senal: '<path d="M5 12.500a10 10 0 0 1 14 0M8 16a5.700 5.700 0 0 1 8 0M12 19.500v.01"/><path d="M3.500 3.500l17 17"/>',
    bajar: '<path d="M12 3.500v12M7 11l5 5 5-5M4.500 20.500h15"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    carrito: '<path d="M3 4h2.500l2.300 11h10.400l2-8H6.300"/><circle cx="9" cy="19.500" r="1.500"/><circle cx="17" cy="19.500" r="1.500"/>',
    presa: '<path d="M14.500 3a6.500 6.500 0 0 1 3.300 12.100c-2.400 1.400-5.200.9-6.800-.7-1.700-1.700-2.200-4.500-.8-6.800A6.500 6.500 0 0 1 14.500 3Z"/><path d="m11 14.500-5 5M6 19.500c-.8-.2-2.200.2-2 1.500s1.600 1.300 2 .5c.8.700 2 .1 1.800-.9-.1-.7-1-1-1.800-1.100Z"/>',
    candado: '<rect x="5" y="10.500" width="14" height="10.500" rx="2"/><path d="M8 10.500V7.500a4 4 0 0 1 8 0v3"/>',
    queso: '<path d="M3 13.500 15 5l6 8.500v6.500H3Z"/><path d="M3 13.500h18"/><circle cx="9" cy="17" r="1.100"/><circle cx="15.500" cy="16.500" r="1.400"/>',
    perro: '<rect x="2.500" y="8.500" width="19" height="7" rx="3.500"/><path d="M5.500 8.500c1-2 3-3 5-3h3c2 0 4 1 5 3M5.500 15.500c1 2 3 3 5 3h3c2 0 4-1 5-3M6 12c1.500-1.300 2.500 1.300 4 0s2.500 1.300 4 0 2.500 1.300 4 0"/>',
    celular: '<rect x="7" y="2.500" width="10" height="19" rx="2"/><path d="M11 18.500h2"/>',
    tarjeta: '<rect x="2.500" y="5.500" width="19" height="13" rx="2"/><path d="M2.500 10h19M6 15h4"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.200l3.300 2"/>',
    arena: '<path d="M6.500 3h11M6.500 21h11M8 3v3.500c0 2 4 3.500 4 5.500s-4 3.500-4 5.500V21M16 3v3.500c0 2-4 3.500-4 5.500s4 3.500 4 5.500V21"/>',
    ajustes: '<circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100"/>',
    estrella: '<path d="m12 3 2.800 5.800 6.200.9-4.500 4.400 1.100 6.300L12 17.400l-5.600 3 1.100-6.300L3 9.700l6.200-.9Z"/>',
    sandwich: '<path d="M3 14 12 5l9 9Z"/><path d="M3 14h18v2.500H3ZM5 19.500h14"/>',
    papas: '<path d="M6 10.500h12l-1.500 11h-9Z"/><path d="M7 10.500 6 4h2.500l.5 6.500M11 10.500V3h2.500l-.5 7.500M15 10.500 16 5h2.500L18 10.500"/>',
    carne: '<path d="M4 11c0-4.500 4-7.500 9-7.500s7.500 3.500 7.500 8-3.500 9-8.500 9-8-4.500-8-9.500Z"/><path d="M9 12.500c0-2 1.500-3.500 3.500-3.500s3 1.500 3 3-1.500 3.500-3.500 3.500-3-1.500-3-3Z"/>',
    vaso: '<path d="M6 7.500h12l-1.500 14h-9ZM14 7.500l1-5h3M5 7.500h14"/>',
    girar: '<path d="M20 11A8 8 0 0 0 6 6.500L3.500 9M4 13a8 8 0 0 0 14 4.500l2.500-2.500"/><path d="M3.500 4v5h5M20.500 20v-5h-5"/>',
    tijera: '<circle cx="6" cy="6.500" r="2.800"/><circle cx="6" cy="17.500" r="2.800"/><path d="M8.500 8 20 19M8.500 16 20 5"/>',
    mundo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 2.600 4 5.700 4 9s-1 6.400-4 9c-3-2.600-4-5.700-4-9s1-6.400 4-9Z"/>',
    monedas: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.700 2.700 3 6 3M15 7v3"/><ellipse cx="15" cy="15" rx="6" ry="3"/><path d="M9 15v3c0 1.700 2.700 3 6 3s6-1.300 6-3v-3"/>',
    comprimir: '<path d="M9 3.500V9H3.500M15 3.500V9h5.500M9 20.500V15H3.500M15 20.500V15h5.500"/>',
    expandir: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    abajo: '<path d="M12 4v15M6.500 13.500 12 19l5.500-5.500"/>',
    telefono: '<path d="M5 3.500h3.500l1.500 5-2.200 1.500a12 12 0 0 0 6.200 6.200l1.500-2.200 5 1.500V19c0 1.100-.9 2-2 2C10.500 21 3 13.500 3 5.500c0-1.100.9-2 2-2Z"/>',
    camara: '<path d="M3 8h4l1.500-2.500h7L17 8h4v12H3Z"/><circle cx="12" cy="13.500" r="3.500"/>',
    mapa: '<path d="m3 6 6-2.500 6 2.500 6-2.500V18l-6 2.500L9 18l-6 2.500ZM9 3.500V18M15 6v14.500"/>',
    corazon: '<path d="M12 20.500S3.500 15.500 3.500 9.300A4.800 4.800 0 0 1 12 6.500a4.800 4.800 0 0 1 8.500 2.800c0 6.200-8.500 11.200-8.500 11.200Z"/>',
    caja: '<path d="m12 2.500 8.500 4.500v10L12 21.500 3.500 17V7ZM3.500 7 12 11.500 20.500 7M12 11.500v10"/>',
    grafica: '<path d="M4 20.500h16M7 17v-5M12 17V6M17 17v-8"/>',
    calendario: '<rect x="3.500" y="5" width="17" height="16" rx="2"/><path d="M3.500 10h17M8 3v4M16 3v4"/>',
    tablero: '<rect x="5" y="4.500" width="14" height="17" rx="2"/><path d="M9 3h6v3H9ZM9 11h6M9 15.500h6"/>',
    frasco: '<path d="M9.500 3h5M10.500 3v6L5 18.500A2 2 0 0 0 6.800 21.500h10.400A2 2 0 0 0 19 18.500L13.500 9V3M8 14.500h8"/>',
    repetir: '<path d="m17 2.500 3.500 3.500L17 9.500"/><path d="M3.500 11V9a3 3 0 0 1 3-3h14M7 21.500 3.500 18 7 14.500"/><path d="M20.500 13v2a3 3 0 0 1-3 3h-14"/>',
    ayuda: '<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.800 2.200c-.9.500-1.300 1-1.300 2M12 17v.01"/>',
    pausa: '<path d="M8.500 5v14M15.500 5v14"/>',
    play: '<path d="M7 4.500v15l12-7.500Z"/>',
    bolsa: '<path d="M5 8h14l1 13H4Z"/><path d="M8.500 11V6.500a3.500 3.500 0 0 1 7 0V11"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20.500 20.500-4.500-4.500"/>',
    teclado: '<rect x="2.500" y="6" width="19" height="12" rx="2"/><path d="M6.500 10v.01M10 10v.01M14 10v.01M17.500 10v.01M7.500 14.500h9"/>',
    rayo: '<path d="M13.500 2.500 5 13.500h6l-1 8 9-11.500h-6Z"/>',
    tv: '<rect x="2.500" y="5" width="19" height="13" rx="2"/><path d="M8 21h8"/>',
    nuevo: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.500 2.500M15.500 15.500 18 18M18 6l-2.500 2.500M8.500 15.500 6 18"/>',
    fiesta: '<path d="M4 20.500 9 7.500l7.500 7.500Z"/><path d="M14 4v.01M19.500 9.500v.01M17 6.500c.5-1 1.500-1.500 2.500-1.500M20 14.500c-1 0-2 .5-2.500 1.500"/>',
    dividir: '<path d="M5 12h14M12 6.500v.01M12 17.500v.01"/>',
    bandeja: '<path d="M3.500 13.500 6 4.500h12l2.500 9V20h-17Z"/><path d="M3.500 13.500H9c0 1.700 1.300 3 3 3s3-1.300 3-3h5.500"/>',
    banco: '<path d="M3 9.500 12 4l9 5.500M5 10v8M9.500 10v8M14.500 10v8M19 10v8M3 20.500h18"/>',
    compartir: '<path d="M12 15V3.500M7.500 8 12 3.500 16.500 8"/><path d="M5 12v7.500h14V12"/>',
    luna: '<path d="M19.500 14.500A8 8 0 0 1 9.500 4.500a8 8 0 1 0 10 10Z"/>',
    destello: '<path d="M12 3c.8 4.500 2.500 6.200 7 7-4.500.8-6.200 2.500-7 7-.8-4.500-2.500-6.200-7-7 4.500-.8 6.200-2.500 7-7Z"/><path d="M19 3v3M17.500 4.500h3"/>',
    enlace: '<path d="M10 14a4.500 4.500 0 0 0 6.400 0l3-3a4.500 4.500 0 0 0-6.400-6.400l-1 1"/><path d="M14 10a4.500 4.500 0 0 0-6.400 0l-3 3a4.500 4.500 0 0 0 6.400 6.400l1-1"/>',
    "dot-verde": '<circle cx="12" cy="12" r="5.500"/>',
    "dot-rojo": '<circle cx="12" cy="12" r="5.500"/>',
    "dot-ambar": '<circle cx="12" cy="12" r="5.500"/>'
  };
  const EMOJI = {
    "✅": "check", "✔": "check", "❌": "x", "✖": "x", "✕": "x", "🍔": "burger", "💵": "billete", "👤": "usuario", "👥": "usuarios", "🛎": "timbre", "🍽": "plato", "🛵": "moto",
    "🗑": "basura", "🧾": "recibo", "⚠": "alerta", "✏": "lapiz", "🔔": "campana", "🔕": "campanaNo", "🏆": "trofeo", "🔑": "llave", "🔥": "llama", "🍳": "sarten", "🖨": "impresora",
    "🙋": "mano", "👑": "corona", "🚫": "prohibido", "⛔": "prohibido", "🪑": "silla", "↩": "deshacer", "📍": "pin", "📡": "senal", "⬇": "bajar", "➕": "mas", "🟢": "dot-verde",
    "🔴": "dot-rojo", "🟡": "dot-ambar", "🛒": "carrito", "🍗": "presa", "🔒": "candado", "🔐": "candado", "🧀": "queso", "🌭": "perro", "📱": "celular", "📲": "celular", "💳": "tarjeta",
    "⏳": "arena", "⚙": "ajustes", "⏱": "reloj", "🕖": "reloj", "🕐": "reloj", "⭐": "estrella", "🥪": "sandwich", "🍟": "papas", "🥩": "carne", "🥤": "vaso", "🔄": "girar", "🔁": "repetir",
    "✂": "tijera", "🌐": "mundo", "💰": "monedas", "🗜": "comprimir", "⛶": "expandir", "👇": "abajo", "📞": "telefono", "📸": "camara", "🗺": "mapa", "❤": "corazon", "📦": "caja", "📊": "grafica",
    "📅": "calendario", "📋": "tablero", "🧪": "frasco", "❔": "ayuda", "⏸": "pausa", "▶": "play", "🛍": "bolsa", "🔎": "buscar", "⌨": "teclado", "⚡": "rayo", "📺": "tv", "🆕": "nuevo", "🎉": "fiesta",
    "➗": "dividir", "📥": "bandeja", "🥔": "papas", "🥓": "carne", "🍖": "carne", "🥖": "sandwich", "🌽": "papas", "🥗": "plato", "😇": "estrella",
    "💍": "corazon", "💥": "rayo", "🤔": "ayuda", "🏦": "banco", "🌙": "luna", "🟠": "dot-ambar", "✨": "destello", "🥉": "trofeo", "🔗": "enlace", "📤": "compartir", "↺": "repetir"
  };
  const RE_EMOJI = new RegExp("(" + Object.keys(EMOJI).join("|") + ")\\uFE0F?", "gu");
  const SALTAR = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "TITLE", "CODE", "PRE"]);

  const sprite = document.createElementNS(NS, "svg");
  sprite.setAttribute("aria-hidden", "true");
  sprite.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  sprite.innerHTML = Object.entries(TRAZOS).map(([n, t]) => `<symbol id="pe-${n}" viewBox="0 0 24 24">${t}</symbol>`).join("");
  (document.body || document.documentElement).prepend(sprite);

  function icono(nombre) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("class", "pe pe-" + nombre);
    s.setAttribute("aria-hidden", "true");
    const u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#pe-" + nombre);
    s.append(u);
    return s;
  }

  function cambiarEmojis(raiz) {
    if (raiz.nodeType === 3) return textoAIconos(raiz);
    if (raiz.nodeType !== 1 || SALTAR.has(raiz.tagName) || raiz.namespaceURI === NS) return;
    const andar = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    const nodos = [];
    while (andar.nextNode()) nodos.push(andar.currentNode);
    nodos.forEach(textoAIconos);
  }
  function textoAIconos(nodo) {
    const txt = nodo.nodeValue;
    if (!txt || !/[^\u0000-⁯]/.test(txt)) return;
    RE_EMOJI.lastIndex = 0;
    if (!RE_EMOJI.test(txt)) return;
    const padre = nodo.parentNode;
    if (!padre || SALTAR.has(padre.nodeName) || padre.closest?.(".px-emoji")) return;
    RE_EMOJI.lastIndex = 0;
    // Una opción de una lista no admite íconos: se limpia su texto y se conserva su valor
    if (padre.nodeName === "OPTION") {
      if (!padre.hasAttribute("value")) padre.setAttribute("value", txt);
      nodo.nodeValue = txt.replace(RE_EMOJI, "").trim();
      return;
    }
    const frag = document.createDocumentFragment();
    let ultimo = 0;
    for (const m of txt.matchAll(RE_EMOJI)) {
      if (m.index > ultimo) frag.append(txt.slice(ultimo, m.index));
      frag.append(icono(EMOJI[m[1]]));
      ultimo = m.index + m[0].length;
    }
    if (ultimo < txt.length) frag.append(txt.slice(ultimo));
    padre.replaceChild(frag, nodo);
  }

  /* ---------- 2. Ilustración de cada producto de la carta ---------- */
  function ilustracionDe(art) {
    const n = (art.querySelector("h3")?.textContent || "").toLowerCase();
    const c = art.dataset.category || "";
    const r = (x) => "ilustraciones/menu-" + x + ".svg";
    if (/alita/.test(n) || /alitas/.test(c)) return r("alitas");
    if (/perro|hot ?dog/.test(n) || /hotdogs/.test(c)) return r("perro");
    if (/ensalada/.test(n)) return r("ensalada");
    if (/maicito|maíz|maiz/.test(n)) return r("maiz");
    if (/club/.test(n)) return r("club");
    if (/dedito|queso/.test(n)) return r("queso");
    if (/parrill|churrasco|costilla|chorizo$/.test(n) || /parrillitas/.test(c)) return r("parrilla");
    if (/papa|picada|salchi/.test(n) || /salchipapas/.test(c)) return r("papas");
    if (/bebidas/.test(c)) return r("bebida");
    if (/adicionales/.test(c)) return r("adicional");
    if (/pollo|chicken|pechuga/.test(n)) return r("pollo");
    if (/entradas/.test(c)) return r("queso");
    if (/platos/.test(c)) return r("club");
    return r("hamburguesa");
  }
  function vestirTarjeta(art) {
    const caja = art.firstElementChild;
    if (!caja || caja.tagName === "IMG" || caja.classList.contains("px-tile")) return;
    caja.classList.add("px-tile");
    caja.classList.remove("from-amber-400", "to-red-600", "bg-gradient-to-br");
    caja.textContent = "";
    const img = document.createElement("img");
    img.alt = ""; img.src = ilustracionDe(art); img.loading = "lazy"; img.decoding = "async";
    caja.append(img);
    if (!art.hasAttribute("tabindex")) art.tabIndex = 0;
  }
  const vestirTodas = (raiz) => {
    if (raiz.nodeType !== 1) return;
    if (PAGINA !== "carta") return;
    if (raiz.matches?.("#menu article[data-id]")) vestirTarjeta(raiz);
    raiz.querySelectorAll?.("#menu article[data-id]").forEach(vestirTarjeta);
  };

  /* ---------- 3. Números que suben o bajan hasta su valor ---------- */
  const NUMEROS = "#fabTotal, #total, #cuentasTotal, .kpi p:last-child";
  const memoria = new Map(), enCurso = new WeakMap();
  const claveNum = (el) => el.id || el.parentElement?.querySelector("p")?.textContent || "";
  const valorDe = (t) => { const d = String(t).replace(/\D/g, ""); return d ? Number(d) : null; };
  function formatear(plantilla, n) {
    // Conserva el símbolo y los puntos de miles del texto final
    const prefijo = plantilla.match(/^\D*/)[0], sufijo = plantilla.match(/\D*$/)[0];
    return prefijo + n.toLocaleString("es-CO") + sufijo;
  }
  function animarNumero(el) {
    if (el.childElementCount || enCurso.get(el) === el.textContent) return;
    const final = el.textContent, destino = valorDe(final), k = claveNum(el);
    if (destino === null || !k) return;
    const origen = memoria.get(k);
    memoria.set(k, destino);
    if (quieto || origen === undefined || origen === destino || !/^\D*[\d.]+\D*$/.test(final)) return;
    const t0 = performance.now(), dur = 520;
    const paso = (t) => {
      if (el.textContent !== (enCurso.get(el) ?? final)) { enCurso.delete(el); return; }   // la página ya escribió otro valor
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      const txt = p === 1 ? final : formatear(final, Math.round(origen + (destino - origen) * e));
      enCurso.set(el, txt); el.textContent = txt;
      if (p < 1) requestAnimationFrame(paso); else enCurso.delete(el);
    };
    requestAnimationFrame(paso);
  }

  /* ---------- 4. Entradas: solo al abrir una vista ---------- */
  let tEntrada;
  function entrar() {
    if (quieto) return;
    const b = document.body;
    b.classList.remove("px-entrando");
    document.querySelectorAll(".card, .kpi, .ip-card, #menu article:not(.hidden), #menu h3[data-seccion]:not(.hidden), #listos > *, #cocina > *").forEach((el, i) => {
      el.style.setProperty("--px-i", el.closest("#menu") ? Math.min(i, 9) : Math.min(i % 12, 11));
    });
    void b.offsetWidth;
    b.classList.add("px-entrando");
    clearTimeout(tEntrada);
    tEntrada = setTimeout(() => b.classList.remove("px-entrando"), 1100);
  }

  /* ---------- 5. Indicador deslizante ---------- */
  const barras = new Set();
  function moverIndicador(barra) {
    const activo = barra.querySelector('[aria-selected="true"], [aria-pressed="true"]'), ind = barra.querySelector(":scope > .px-ind");
    if (!ind) return;
    if (!activo || !activo.offsetWidth) { ind.style.opacity = "0"; return; }
    ind.style.opacity = "1";
    ind.style.width = activo.offsetWidth + "px";
    ind.style.height = activo.offsetHeight + "px";
    ind.style.translate = `${activo.offsetLeft}px ${activo.offsetTop}px`;
    barra.classList.add("px-listo");
  }
  function montarBarra(barra) {
    if (!barra || barras.has(barra)) return;
    barras.add(barra);
    barra.classList.add("px-slider");
    if (getComputedStyle(barra).position === "static") barra.style.position = "relative";
    const ind = document.createElement("i");
    ind.className = "px-ind"; ind.setAttribute("aria-hidden", "true");
    barra.prepend(ind);
    new MutationObserver(() => moverIndicador(barra)).observe(barra, { subtree: true, attributes: true, attributeFilter: ["aria-selected", "aria-pressed"] });
    new ResizeObserver(() => moverIndicador(barra)).observe(barra);
    moverIndicador(barra);
    document.fonts?.ready.then(() => moverIndicador(barra));
  }

  /* ---------- 6. Tarjetas de cocina: la que cambia de columna viaja ---------- */
  let cocinaVista = null;
  function seguirCocina() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    const ahora = new Map();
    grid.querySelectorAll("article[data-grupo]").forEach((a) => {
      const col = a.closest(".k-columna")?.id || "";
      ahora.set(a.dataset.grupo + "|" + col, a);
      ahora.get(a.dataset.grupo) || ahora.set(a.dataset.grupo, a);
    });
    if (cocinaVista && !quieto) {
      ahora.forEach((a, k) => {
        if (!k.includes("|")) return;
        if (cocinaVista.claves.has(k)) return;
        const previo = cocinaVista.rect.get(a.dataset.grupo), r = a.getBoundingClientRect();
        if (previo) a.animate([{ translate: `${previo.left - r.left}px ${previo.top - r.top}px`, opacity: .7 }, { translate: "0 0", opacity: 1 }], { duration: 460, easing: "cubic-bezier(.2,.9,.25,1.06)" });
        else a.classList.add("px-nuevo");
      });
    }
    const rect = new Map();
    ahora.forEach((a, k) => { if (!k.includes("|")) rect.set(k, a.getBoundingClientRect()); });
    cocinaVista = { claves: new Set([...ahora.keys()].filter((k) => k.includes("|"))), rect };
  }

  /* ---------- 7. Observador único ---------- */
  function procesar(nodo) {
    vestirTodas(nodo);
    cambiarEmojis(nodo);
  }
  const estadoRed = () => {
    const c = document.getElementById("conexion");
    if (!c) return;
    const t = c.textContent.toLowerCase();
    c.dataset.pxRed = /sin |offline|error|lenta|inestable/.test(t) ? "mal" : /conectando|reconect/.test(t) ? "espera" : "ok";
  };
  let tCocina;
  const observador = new MutationObserver((lista) => {
    let hayCocina = false;
    for (const m of lista) {
      if (m.type === "attributes") {
        if (m.target.id === "app" && !m.target.classList.contains("hidden")) { barras.forEach(moverIndicador); entrar(); }
        continue;
      }
      if (m.type === "characterData") {
        textoAIconos(m.target);
        const el = m.target.parentElement;
        if (el?.matches?.(NUMEROS)) animarNumero(el);
        continue;
      }
      m.addedNodes.forEach((n) => {
        procesar(n);
        if (n.nodeType === 1) {
          if (n.matches?.(NUMEROS)) animarNumero(n);
          n.querySelectorAll?.(NUMEROS).forEach(animarNumero);
        }
      });
      if (m.target.nodeType === 1) {
        if (m.target.matches?.(NUMEROS)) animarNumero(m.target);
        if (m.target.id === "conexion" || m.target.closest?.("#conexion")) estadoRed();
        if (m.target.closest?.("#grid")) hayCocina = true;
      }
    }
    if (hayCocina) { clearTimeout(tCocina); tCocina = setTimeout(seguirCocina, 0); }
  });

  function iniciar() {
    procesar(document.body);
    document.querySelectorAll(NUMEROS).forEach(animarNumero);
    observador.observe(document.body, { subtree: true, childList: true, characterData: true });
    const app = document.getElementById("app");
    if (app) observador.observe(app, { attributes: true, attributeFilter: ["class"] });
    document.querySelectorAll('[role="tablist"]').forEach(montarBarra);
    const barraChips = document.querySelector('nav[aria-label="Categorías del menú"] > div');
    if (barraChips) montarBarra(barraChips);
    estadoRed();
    entrar();
    if (PAGINA === "carta" && document.getElementById("menu")) carta();
    if (PAGINA === "domicilios") domicilios();
  }

  /* ---------- 8. Efectos de toque ---------- */
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest?.("button, a.btn, .btn");
    if (!b || b.disabled || quieto || b.classList.contains("switch")) return;
    const r = b.getBoundingClientRect();
    if (getComputedStyle(b).position === "static") b.classList.add("px-onda");
    else b.classList.add("px-onda");
    b.style.setProperty("--px-x", e.clientX - r.left + "px");
    b.style.setProperty("--px-y", e.clientY - r.top + "px");
    b.classList.remove("px-onda"); void b.offsetWidth; b.classList.add("px-onda");
    clearTimeout(b._pxOnda);
    b._pxOnda = setTimeout(() => b.classList.remove("px-onda"), 520);
  }, { passive: true });

  document.addEventListener("click", (e) => {
    if (e.target.closest?.('[role="tab"], [data-filter]')) requestAnimationFrame(entrar);
  });

  if (matchMedia("(hover: hover)").matches && !quieto) {
    let ultima = null;
    document.addEventListener("pointermove", (e) => {
      const c = e.target.closest?.(".kpi, .ip-card, #menu article");
      if (ultima && ultima !== c) ultima.style.setProperty("--px-luz", "0");
      ultima = c;
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.classList.add("px-luz");
      c.style.setProperty("--px-mx", e.clientX - r.left + "px");
      c.style.setProperty("--px-my", e.clientY - r.top + "px");
      c.style.setProperty("--px-luz", "1");
    }, { passive: true });
  }

  /* ---------- 9. Solo en la carta pública ---------- */
  function carta() {
    brasas();
    buscador();
    vistaRapida();
    vueloAlCarrito();
    seccionVisible();
    const fotoHero = document.querySelector("#inicio .flex.items-center.gap-3 > img");
    if (fotoHero && !quieto) addEventListener("scroll", () => { fotoHero.style.transform = `translateY(${Math.min(scrollY, 500) * .09}px)`; }, { passive: true });
  }

  function brasas() {
    const hero = document.getElementById("inicio");
    if (!hero || quieto || (navigator.hardwareConcurrency || 4) <= 2) return;
    const c = document.createElement("canvas");
    c.id = "pxBrasas"; c.setAttribute("aria-hidden", "true");
    hero.prepend(c);
    const ctx = c.getContext("2d");
    let w = 0, h = 0, visible = true, ultimoT = 0;
    const medir = () => { const d = Math.min(devicePixelRatio || 1, 2); w = hero.clientWidth; h = hero.clientHeight; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    medir();
    new ResizeObserver(medir).observe(hero);
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestAnimationFrame(cuadro); }).observe(hero);
    const nueva = (y) => ({ x: Math.random() * w, y: y ?? h + 8, r: .7 + Math.random() * 1.8, v: 12 + Math.random() * 30, f: Math.random() * 6.3, a: .35 + Math.random() * .6 });
    const P = Array.from({ length: 26 }, () => nueva(Math.random() * h));
    function cuadro(t) {
      if (!visible || document.hidden) { ultimoT = 0; if (!document.hidden) return; setTimeout(() => requestAnimationFrame(cuadro), 800); return; }
      const dt = Math.min(.05, (t - (ultimoT || t)) / 1000); ultimoT = t;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      P.forEach((p, i) => {
        p.y -= p.v * dt; p.f += dt * 1.6; p.x += Math.sin(p.f) * .35;
        const vida = Math.max(0, Math.min(1, p.y / h));
        if (p.y < -6) { P[i] = nueva(); return; }
        ctx.fillStyle = `rgba(255,${130 + 80 * vida | 0},50,${p.a * vida})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.3); ctx.fill();
        ctx.globalAlpha = .22; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, 6.3); ctx.fill(); ctx.globalAlpha = 1;
      });
      requestAnimationFrame(cuadro);
    }
    requestAnimationFrame(cuadro);
  }

  function buscador() {
    const grilla = document.querySelector("#menu .grid");
    if (!grilla) return;
    const caja = document.createElement("label");
    caja.className = "px-buscar";
    caja.innerHTML = '<span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Buscar en la carta</span><input id="pxBuscar" type="search" autocomplete="off" placeholder="Busca un plato o ingrediente" enterkeyhint="search">';
    caja.prepend(icono("buscar"));
    grilla.before(caja);
    const nada = document.createElement("p");
    nada.id = "pxNada"; nada.className = "hidden";
    const limpiar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const input = caja.querySelector("input");
    let previo = "";
    input.addEventListener("input", () => {
      const q = limpiar(input.value.trim());
      const hijos = [...grilla.children];
      hijos.forEach((el) => {
        if (el.tagName === "ARTICLE") el.classList.toggle("px-nomatch", !!q && !limpiar(el.textContent).includes(q));
      });
      // Un título se esconde si su sección quedó sin resultados
      hijos.forEach((el, i) => {
        if (!el.dataset.seccion) return;
        let hay = false;
        for (let j = i + 1; j < hijos.length && !hijos[j].dataset.seccion; j++) if (hijos[j].tagName === "ARTICLE" && !hijos[j].classList.contains("px-nomatch")) { hay = true; break; }
        el.classList.toggle("px-nomatch", !!q && !hay);
      });
      const visibles = hijos.some((el) => el.tagName === "ARTICLE" && !el.classList.contains("px-nomatch") && !el.classList.contains("hidden") && !el.classList.contains("b87-eliminado"));
      if (!nada.parentNode) grilla.append(nada);
      nada.textContent = q && !visibles ? `No encontramos "${input.value.trim()}" en la carta.` : "";
      nada.classList.toggle("hidden", !(q && !visibles));
      // Al empezar a buscar se muestra toda la carta
      if (q && !previo) document.querySelector('[data-filter="todos"]:not([aria-pressed="true"])')?.click();
      previo = q;
    });
  }

  function vistaRapida() {
    const h = document.createElement("div");
    h.id = "pxDetalle"; h.className = "hidden";
    h.setAttribute("role", "dialog"); h.setAttribute("aria-modal", "true"); h.setAttribute("aria-labelledby", "pxDetNombre");
    h.innerHTML = `<div data-px-cerrar class="absolute inset-0"></div>
      <div class="sheet">
        <div class="px-det-foto"><img id="pxDetFoto" alt=""><button type="button" data-px-cerrar class="px-det-cerrar" aria-label="Cerrar"></button></div>
        <h2 id="pxDetNombre"></h2><p id="pxDetDesc"></p><p id="pxDetExtras"></p>
        <div class="px-det-pie"><span id="pxDetPrecio"></span><button id="pxDetAgregar" type="button" class="bg-amber-400"></button></div>
      </div>`;
    h.querySelector(".px-det-cerrar").append(icono("x"));
    document.body.append(h);
    let actual = null, foco = null;
    const $ = (s) => h.querySelector(s);
    function abrir(art) {
      actual = art; foco = document.activeElement;
      const tile = art.firstElementChild, img = tile.tagName === "IMG" ? tile : tile.querySelector("img");
      $("#pxDetFoto").src = img?.src || "";
      $("#pxDetFoto").classList.toggle("px-real", tile.tagName === "IMG");
      $("#pxDetNombre").textContent = art.querySelector("h3")?.textContent || "";
      $("#pxDetDesc").textContent = art.querySelector("p.leading-snug")?.textContent || "";
      $("#pxDetExtras").textContent = art.querySelector(".extras")?.textContent || "";
      $("#pxDetPrecio").textContent = (art.querySelector("p.text-base")?.textContent || "").replace(/\s*COP\s*$/, "");
      const b = art.querySelector("[data-add]"), ag = !!b?.disabled;
      $("#pxDetAgregar").disabled = ag;
      $("#pxDetAgregar").textContent = ag ? "Agotado" : "Agregar al pedido";
      h.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      $(".px-det-cerrar").focus();
    }
    function cerrar() {
      if (h.classList.contains("hidden")) return;
      h.classList.add("hidden");
      document.body.style.overflow = "";
      foco?.focus?.({ preventScroll: true });
    }
    h.addEventListener("click", (e) => { if (e.target.closest("[data-px-cerrar]")) cerrar(); });
    $("#pxDetAgregar").addEventListener("click", () => {
      const b = actual?.querySelector("[data-add]");
      cerrar();
      if (b && !b.disabled) b.click();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrar();
      if ((e.key === "Enter" || e.key === " ") && e.target.matches?.("#menu article[data-id]")) { e.preventDefault(); abrir(e.target); }
    });
    document.querySelector("#menu .grid")?.addEventListener("click", (e) => {
      const art = e.target.closest("article[data-id]");
      if (art && !e.target.closest("button, a, input")) abrir(art);
    });
  }

  function vueloAlCarrito() {
    const fab = document.getElementById("fab"), badge = document.getElementById("badge");
    if (!fab || !badge) return;
    let origen = null;
    const cuenta = () => Number(badge.textContent) || 0;
    document.addEventListener("click", (e) => {
      const add = e.target.closest?.("[data-add], #opcAgregar");
      if (!add) return;
      if (add.dataset.add) origen = add.closest("article");
      const antes = cuenta(), art = origen;
      setTimeout(() => {
        if (cuenta() <= antes) return;
        fab.classList.remove("px-rebote"); void fab.offsetWidth; fab.classList.add("px-rebote");
        if (quieto || !art) return;
        const tile = art.firstElementChild, img = tile?.tagName === "IMG" ? tile : tile?.querySelector("img");
        if (!img) return;
        const a = (add.id === "opcAgregar" ? add : tile).getBoundingClientRect(), b = fab.getBoundingClientRect();
        const v = document.createElement("img");
        v.src = img.src; v.alt = ""; v.className = "px-vuelo";
        v.style.left = a.left + "px"; v.style.top = a.top + "px";
        document.body.append(v);
        const dx = b.left + b.width / 2 - a.left - 34, dy = b.top + b.height / 2 - a.top - 34;
        v.animate([
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx * .45}px, ${dy * .3 - 60}px) scale(.85) rotate(-10deg)`, opacity: 1, offset: .5 },
          { transform: `translate(${dx}px, ${dy}px) scale(.18) rotate(12deg)`, opacity: .3 }
        ], { duration: 620, easing: "cubic-bezier(.4,.1,.3,1)" }).onfinish = () => v.remove();
      }, 0);
    });
  }

  function seccionVisible() {
    const chips = [...document.querySelectorAll("[data-filter]")];
    if (!("IntersectionObserver" in window) || !chips.length) return;
    let marcado = null;
    const io = new IntersectionObserver((ents) => {
      const en = ents.filter((x) => x.isIntersecting).pop();
      if (!en || document.querySelector('[data-filter="todos"]')?.getAttribute("aria-pressed") !== "true") return;
      const chip = chips.find((c) => c.dataset.filter === en.target.dataset.seccion);
      if (!chip || chip === marcado) return;
      marcado?.classList.remove("px-spy");
      chip.classList.add("px-spy"); marcado = chip;
      const barra = chip.parentElement;
      barra.scrollTo({ left: chip.offsetLeft - (barra.clientWidth - chip.offsetWidth) / 2, behavior: quieto ? "auto" : "smooth" });
    }, { rootMargin: "-22% 0px -70% 0px" });
    const mirar = () => document.querySelectorAll("#menu h3[data-seccion]").forEach((h) => io.observe(h));
    // Los títulos los crea la página al cargar: se esperan un momento
    setTimeout(mirar, 300);
  }

  /* ---------- 10. Solo en la página de domicilios ---------- */
  function domicilios() {
    const fab = document.getElementById("fab"), badge = document.getElementById("badge");
    if (!fab || !badge) return;
    let origen = null;
    const cuenta = () => Number(badge.textContent) || 0;
    // Guarda de dónde salió el producto: su tarjeta, la premiada o la hoja de personalizar
    document.addEventListener("pointerdown", (e) => {
      const b = e.target.closest?.("[data-add], #pmAgregar");
      if (!b) return;
      origen = b.id === "pmAgregar" ? document.querySelector("#pmEmoji img") : b.closest("article")?.querySelector("img.px-foto");
    }, { passive: true, capture: true });
    new MutationObserver(() => {
      const n = cuenta();
      if (n <= (domicilios.n || 0)) { domicilios.n = n; return; }
      domicilios.n = n;
      const img = origen; origen = null;
      if (quieto || !img || !img.isConnected) return;
      const a = img.getBoundingClientRect(), b = (fab.querySelector("#badge") || fab).getBoundingClientRect();
      if (!a.width) return;
      const v = document.createElement("img");
      v.src = img.src; v.alt = ""; v.className = "px-vuelo";
      v.style.left = a.left + a.width / 2 - 34 + "px"; v.style.top = a.top + a.height / 2 - 34 + "px";
      document.body.append(v);
      const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
      v.animate([
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * .45}px, ${dy * .3 - 60}px) scale(.85) rotate(-10deg)`, opacity: 1, offset: .5 },
        { transform: `translate(${dx}px, ${dy}px) scale(.18) rotate(12deg)`, opacity: .3 }
      ], { duration: 620, easing: "cubic-bezier(.4,.1,.3,1)" }).onfinish = () => v.remove();
    }).observe(badge, { childList: true, characterData: true, subtree: true });
    domicilios.n = cuenta();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
