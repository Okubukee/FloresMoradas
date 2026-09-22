/* ==========================================================
   ESCENA: terraza de noche + mensajes
   AJUSTA AQUÍ
   ========================================================== */

// Cambia estos textos por los tuyos. Puedes poner los que quieras.
const MENSAJES = [
  'Hola, espero que estés bien.',
  'Sé que no me lo pediste y también que nunca debiste haberlo hecho.',
  'No quiero que vuelvas a vivir la vida sin flores y espero de corazón que las disfrutes mucho.',
  'Esta vez no quiero dejarte un texto bíblico, aunque me gusta escribirte por no poder hablarte.',
  'Quiero dejarte claro que sé que esto no soluciona nada y no lo hago con esa intención; lo hago porque te amo y, al menos, creo estar aprendiendo de forma triste a hacerlo.',
  'También quiero decirte que sé que te genera ansiedad y te da miedo repetir la misma situación.',
  'No te presionaré.',
  'Si algún día te sientes segura o decides hablar, aun con miedo e incertidumbre, permíteme ser la luz en tu oscuridad, al igual que tú lo fuiste todo este tiempo para mí.',
  'Tuve mucho miedo el día de las flores amarillas, pero fui muy feliz.',
  'Por eso, el día que te sientas preparada —con todo el tiempo y el espacio que necesites—, espero hacerte feliz como tú lo hiciste conmigo.',
  'Valoro mucho que te esforzaras en escucharme y hablar conmigo, fue muy especial para mí.',
  'El dia 9 de noviembre ve a la floristeria XXX para recoger tus flores a nombre de Estela'
];

const ESCENA = {
  // Cada mensaje dura segun lo largo que sea, entre estos dos limites.
  duracionMinima: 4200,
  duracionMaxima: 9500,
  msPorCaracter: 62,
  pausaEntreMensajes: 1200, // ms de silencio entre uno y otro
  estrellas: 260,
  luciernagas: 9,
  farolas: 46,
};

// Zona que siempre debe verse, pase lo que pase con el tamano de pantalla.
const ENCUADRE = { x: 200, y: -60, ancho: 800, alto: 820 };

const SVG_NS = 'http://www.w3.org/2000/svg';
const svg = document.querySelector('.escena__svg');
const elMensajes = document.querySelector('.mensajes');
const ANCLA_MENSAJES = 186; // altura, en el dibujo, donde empieza el texto
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const crear = (tag, attrs = {}) => {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};
const azar = (min, max) => min + Math.random() * (max - min);

/* ---------- Encuadre: el viewBox se adapta a la pantalla ---------- */
const ajustarEncuadre = () => {
  if (!svg) return;
  const r = window.innerWidth / Math.max(1, window.innerHeight);
  const proporcionSegura = ENCUADRE.ancho / ENCUADRE.alto;

  let ancho;
  let alto;
  if (r > proporcionSegura) {
    alto = ENCUADRE.alto;
    ancho = Math.min(2500, alto * r);
  } else {
    ancho = ENCUADRE.ancho;
    alto = Math.min(1400, ancho / r);
  }

  const x = 600 - ancho / 2;                       // centrado en la mesa
  // el alto de sobra se reparte: un poco de techo arriba, el resto de suelo abajo
  const sobra = Math.max(0, alto - ENCUADRE.alto);
  const y = ENCUADRE.y - sobra * 0.45;
  svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${ancho.toFixed(1)} ${alto.toFixed(1)}`);

  // los mensajes se colocan siempre dentro del hueco entre el techo y la ciudad
  if (elMensajes) {
    const escala = Math.max(window.innerWidth / ancho, window.innerHeight / alto);
    const desviacion = (alto * escala - window.innerHeight) / 2;
    const arriba = (ANCLA_MENSAJES - y) * escala - desviacion;
    elMensajes.style.top = `${Math.round(arriba)}px`;
    elMensajes.style.width = `${Math.round(Math.min(660 * escala, window.innerWidth * 0.86))}px`;
  }
};

ajustarEncuadre();
window.addEventListener('resize', ajustarEncuadre);

/* ---------- Estrellas ---------- */
const gEstrellas = document.getElementById('estrellas');
if (gEstrellas) {
  for (let i = 0; i < ESCENA.estrellas; i++) {
    const y = azar(-860, 442);
    // menos estrellas según bajamos hacia el horizonte
    if (y > 300 && Math.random() > 1 - y / 580) continue;
    const estrella = crear('circle', {
      cx: azar(-680, 1880).toFixed(1),
      cy: y.toFixed(1),
      r: azar(0.6, 1.9).toFixed(2),
      fill: Math.random() > 0.85 ? '#e8c98a' : '#f4ecfd',
      opacity: azar(0.3, 0.95).toFixed(2),
    });
    if (!reducido && Math.random() > 0.65) {
      estrella.setAttribute('class', 'parpadeo');
      estrella.style.animationDelay = azar(0, 4) + 's';
      estrella.style.animationDuration = azar(2.5, 6) + 's';
    }
    gEstrellas.appendChild(estrella);
  }
}

/* ---------- La ciudad ---------- */

// Aclara u oscurece un color para variar el tono de edificio a edificio.
const tono = (hex, k) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => Math.max(0, Math.min(255, Math.round(v * k))));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

const LUCES = ['#e8c98a', '#f0d9a6', '#c79cf0', '#9ec4e8'];

// Ventanas encendidas en la fachada de un edificio.
const ventanas = (grupo, x, ancho, top, base, densidad, escala) => {
  const paso = 9 * escala;
  const alto = 4.6 * escala;
  const anchoV = 3.6 * escala;
  for (let vy = top + paso; vy < base - paso * 0.6; vy += paso * 1.25) {
    for (let vx = x + paso * 0.6; vx < x + ancho - paso; vx += paso) {
      if (Math.random() > densidad) continue;
      const v = crear('rect', {
        x: vx.toFixed(1), y: vy.toFixed(1),
        width: anchoV.toFixed(1), height: alto.toFixed(1), rx: 1,
        fill: LUCES[Math.random() > 0.78 ? Math.floor(azar(2, 4)) : Math.floor(azar(0, 2))],
        opacity: azar(0.3, 0.9).toFixed(2),
      });
      if (!reducido && Math.random() > 0.9) {
        v.setAttribute('class', 'parpadeo');
        v.style.animationDelay = azar(0, 7) + 's';
        v.style.animationDuration = azar(4, 10) + 's';
      }
      grupo.appendChild(v);
    }
  }
};

const CAPAS = [
  { id: 'ciudadLejos', color: '#2b1c4a', base: 452, alto: [26, 88], ancho: [24, 58],
    hueco: [3, 14], densidad: 0.30, escala: 0.8, remate: 0.30 },
  { id: 'ciudadMedia', color: '#1a1030', base: 470, alto: [50, 150], ancho: [34, 84],
    hueco: [5, 20], densidad: 0.36, escala: 1, remate: 0.42 },
  { id: 'ciudadCerca', color: '#0d0719', base: 1210, alto: [560, 700], ancho: [80, 190],
    hueco: [14, 46], densidad: 0.22, escala: 1.45, remate: 0.30 },
];

CAPAS.forEach((capa) => {
  const grupo = document.getElementById(capa.id);
  if (!grupo) return;

  let x = -760;
  while (x < 1940) {
    const ancho = azar(capa.ancho[0], capa.ancho[1]);
    const alto = azar(capa.alto[0], capa.alto[1]);
    const top = capa.base - alto;
    const color = tono(capa.color, azar(0.88, 1.16));

    grupo.appendChild(crear('rect', {
      x: x.toFixed(1), y: top.toFixed(1),
      width: ancho.toFixed(1), height: (capa.base - top).toFixed(1),
      fill: color,
    }));

    // remates: un cuerpo mas alto, un deposito, o una antena con su luz roja
    if (Math.random() < capa.remate) {
      const r = Math.random();
      if (r < 0.4) {
        grupo.appendChild(crear('rect', {
          x: (x + ancho * azar(0.1, 0.45)).toFixed(1),
          y: (top - alto * azar(0.08, 0.22)).toFixed(1),
          width: (ancho * azar(0.3, 0.55)).toFixed(1),
          height: (alto * 0.35).toFixed(1),
          fill: color,
        }));
      } else if (r < 0.7) {
        grupo.appendChild(crear('rect', {
          x: (x + ancho * 0.3).toFixed(1), y: (top - 5 * capa.escala).toFixed(1),
          width: (ancho * 0.4).toFixed(1), height: (5 * capa.escala).toFixed(1),
          rx: (2 * capa.escala).toFixed(1), fill: color,
        }));
      } else {
        const ax = x + ancho * azar(0.3, 0.7);
        const ay = top - azar(14, 34) * capa.escala;
        grupo.appendChild(crear('rect', {
          x: ax.toFixed(1), y: ay.toFixed(1),
          width: (1.6 * capa.escala).toFixed(1), height: (top - ay).toFixed(1), fill: color,
        }));
        const luz = crear('circle', {
          cx: (ax + 0.8 * capa.escala).toFixed(1), cy: ay.toFixed(1),
          r: (2 * capa.escala).toFixed(1), fill: '#ff5e5e', filter: 'url(#fBrillo)',
        });
        if (!reducido) {
          luz.setAttribute('class', 'parpadeo');
          luz.style.animationDuration = azar(1.8, 3.2) + 's';
        }
        grupo.appendChild(luz);
      }
    }

    ventanas(grupo, x, ancho, top, capa.base, capa.densidad, capa.escala);
    x += ancho + azar(capa.hueco[0], capa.hueco[1]);
  }
});

/* ---------- Farolas de la calle, alla abajo ---------- */
const gFarolas = document.getElementById('farolas');
if (gFarolas) {
  for (let i = 0; i < ESCENA.farolas; i++) {
    const y = azar(500, 1180);
    gFarolas.appendChild(crear('circle', {
      cx: azar(-740, 1920).toFixed(1),
      cy: y.toFixed(1),
      r: azar(1.2, 2.6).toFixed(2),
      fill: Math.random() > 0.3 ? '#e8c98a' : '#9ec4e8',
      opacity: Math.max(0.08, 0.5 - (y - 500) / 2600).toFixed(2),
      filter: 'url(#fBrillo)',
    }));
  }
}

/* ---------- Balaustres de la barandilla ---------- */
const gBalaustres = document.getElementById('balaustres');
if (gBalaustres) {
  for (let bx = 268; bx < 936; bx += 38) {
    gBalaustres.appendChild(crear('rect', { x: bx, y: 495, width: 6, height: 79, rx: 3 }));
  }
}

/* ---------- Guirnalda de bombillas ---------- */
const guirnalda = document.getElementById('guirnalda');
const gBombillas = document.getElementById('bombillas');
if (guirnalda && gBombillas) {
  const largo = guirnalda.getTotalLength();
  const total = 19;
  for (let i = 1; i < total; i++) {
    const p = guirnalda.getPointAtLength((largo / total) * i);
    gBombillas.appendChild(crear('line', {
      x1: p.x.toFixed(1), y1: p.y.toFixed(1),
      x2: p.x.toFixed(1), y2: (p.y + 13).toFixed(1),
      stroke: '#d9c2f2', 'stroke-opacity': '.2', 'stroke-width': 1,
    }));
    const bombilla = crear('circle', {
      cx: p.x.toFixed(1), cy: (p.y + 17).toFixed(1), r: 3.6,
      fill: '#e8c98a', filter: 'url(#fBrillo)',
    });
    if (!reducido) {
      bombilla.setAttribute('class', 'bombilla');
      bombilla.style.animationDelay = azar(0, 3) + 's';
      bombilla.style.animationDuration = azar(2.4, 4.6) + 's';
    }
    gBombillas.appendChild(bombilla);
  }
}

/* ---------- Ramo de flores moradas ---------- */
const gFlores = document.getElementById('flores');
if (gFlores) {
  // punta de cada tallo definido en el HTML
  const puntas = [
    [580, 498, 0.92], [626, 504, 0.98], [562, 520, 0.86],
    [642, 528, 0.82], [601, 482, 1.06], [554, 546, 0.78], [648, 550, 0.78],
    [592, 504, 0.88], [616, 514, 0.84],
  ];
  const tonos = ['#8b52c9', '#7a41b8', '#a97ad8', '#6b34a8', '#b98ae0'];

  puntas.forEach(([cx, cy, escala], i) => {
    const flor = crear('g', { transform: `translate(${cx} ${cy}) scale(${escala})` });
    const tono = tonos[i % tonos.length];

    flor.appendChild(crear('circle', { cx: 0, cy: 0, r: 19, fill: 'url(#gHaloFlor)' }));
    for (let p = 0; p < 5; p++) {
      const ang = (p / 5) * Math.PI * 2 - Math.PI / 2;
      flor.appendChild(crear('ellipse', {
        cx: (Math.cos(ang) * 6.6).toFixed(2),
        cy: (Math.sin(ang) * 6.6).toFixed(2),
        rx: 5.4, ry: 4.2,
        fill: tono,
        opacity: 0.94,
        transform: `rotate(${(ang * 180) / Math.PI} ${(Math.cos(ang) * 6.6).toFixed(2)} ${(Math.sin(ang) * 6.6).toFixed(2)})`,
      }));
    }
    flor.appendChild(crear('circle', { cx: 0, cy: 0, r: 2.6, fill: '#edd9a6', opacity: 0.9 }));
    gFlores.appendChild(flor);
  });

  // capullos pequeños para dar volumen
  [[586, 524], [616, 530], [570, 544], [630, 548], [602, 508], [608, 540],
   [578, 534], [624, 538], [596, 552], [636, 560]].forEach(([cx, cy]) => {
    gFlores.appendChild(crear('circle', { cx, cy, r: 3.8, fill: '#6b34a8', opacity: 0.85 }));
  });
}

/* ---------- Luciérnagas ---------- */
const gLuciernagas = document.getElementById('luciernagas');
if (gLuciernagas && !reducido) {
  for (let i = 0; i < ESCENA.luciernagas; i++) {
    const punto = crear('circle', {
      cx: azar(230, 980).toFixed(1),
      cy: azar(560, 740).toFixed(1),
      r: azar(1.6, 2.8).toFixed(2),
      fill: '#e8c98a',
      filter: 'url(#fBrillo)',
      class: 'luciernaga',
    });
    punto.style.animationDelay = azar(0, 9) + 's';
    punto.style.animationDuration = azar(7, 13) + 's';
    gLuciernagas.appendChild(punto);
  }
}

/* ---------- Mensajes ---------- */
const elMensaje = document.getElementById('mensaje');
const elBarra = document.getElementById('avance');

if (elMensaje && MENSAJES.length) {
  let indice = -1;

  const duracion = (texto) => Math.min(
    ESCENA.duracionMaxima,
    Math.max(ESCENA.duracionMinima, 2200 + texto.length * ESCENA.msPorCaracter),
  );

  const mostrar = () => {
    indice = (indice + 1) % MENSAJES.length;
    const texto = MENSAJES[indice];

    elMensaje.textContent = texto;
    elMensaje.classList.add('is-on');
    if (elBarra) elBarra.style.width = `${((indice + 1) / MENSAJES.length) * 100}%`;

    setTimeout(() => {
      elMensaje.classList.remove('is-on');
      setTimeout(mostrar, ESCENA.pausaEntreMensajes);
    }, duracion(texto));
  };

  setTimeout(mostrar, 1100);
}
