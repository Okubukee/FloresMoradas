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
  'Quiero dejarte claro que sé que esto no soluciona nada y no hago esto con esa intención; lo hago porque te amo y, al menos, creo estar aprendiendo de forma triste a hacerlo.',
  'También quiero decirte que sé que te genera ansiedad y te da miedo repetir la misma situación.',
  'No te presionaré.',
  'Si algún día te sientes segura o decides hablar, aun con miedo e incertidumbre, permíteme ser la luz en tu oscuridad, al igual que tú lo fuiste todo este tiempo para mí.',
  'Tuve mucho miedo el día de las flores amarillas, pero fui muy feliz.',
  'Por eso, el día que te sientas preparada —con todo el tiempo y el espacio que necesites—, espero hacerte feliz como tú lo hiciste conmigo.',
  'Valoro mucho que te esforzaras en escucharme y hablar conmigo, fue muy especial para mí.',
  'El dia 9 de noviembre ve a la floristeria XXX para recoger tus flores encargado a tu nombre.'
];

const ESCENA = {
  // Cada mensaje dura segun lo largo que sea, entre estos dos limites.
  duracionMinima: 4200,
  duracionMaxima: 9500,
  msPorCaracter: 62,
  pausaEntreMensajes: 1200, // ms de silencio entre uno y otro
  estrellas: 260,
  luciernagas: 0,
  ventanasApagadas: 0.65, // parte de las ventanas que se apagan al llegar al final       // en verano ponlas a 9; con nieve no pegan
  // Nieve. Pon nevar en false para quitar la nieve (tambien la acumulada).
  nevar: true,
  coposLejos: 150,
  coposCerca: 40,
  farolas: 46,
  // cada cuanto (ms, entre un minimo y un maximo al azar) pasa cada cosa
  cadaFugaz: [4000, 11000],
  cadaPetalo: [5000, 12000],
  cadaBrasa: [9000, 20000],
};

// Lo que aparece al terminar los mensajes.
const CIERRE = {
  texto: 'Feliz día de la flor morada.',
  pausaAntes: 1800,     // ms tras el ultimo mensaje
  esperaBoton: 3600,    // ms hasta que aparece "Volver a empezar"
};

// Cosas que pasan en la escena con ciertos mensajes. Se busca el trozo de
// texto dentro del mensaje (da igual mayusculas y tildes); si cambias los
// mensajes, cambia tambien estas palabras.
const MOMENTOS = {
  florAmarilla: 'flores amarillas',  // brota una flor amarilla en el ramo
  sillaVacia: 'ser la luz',          // se ilumina la silla de la manta
  movil: 'floristeria',              // el movil se enciende con un aviso
  avisoMovil: '9 de noviembre 🌸',
};

// La cancion se pone en index.html -> <audio id="musica">.
const MUSICA = {
  volumen: 0.6,         // 0 a 1
  fundido: 4000,        // ms que tarda en subir el volumen al empezar
};

// Zona que siempre debe verse, pase lo que pase con el tamano de pantalla.
const ENCUADRE = { x: 200, y: -60, ancho: 800, alto: 870 };

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
const esperar = (ms) => new Promise((listo) => setTimeout(listo, ms));

// Repite una funcion para siempre, con una pausa al azar entre [min, max] ms.
const cadaTanto = ([min, max], fn) => {
  const siguiente = () => setTimeout(() => { fn(); siguiente(); }, azar(min, max));
  siguiente();
};

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
const VENTANAS = []; // las que no parpadean; se van apagando con los mensajes

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
      } else {
        v.setAttribute('class', 'ventana');
        VENTANAS.push(v);
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

/* ---------- Calendario: noviembre, con el dia 9 marcado ---------- */
const gDias = document.getElementById('diasCalendario');
const diaMarcado = document.querySelector('.dia-marcado');
if (gDias) {
  const anio = 2026;
  const hueco = (new Date(anio, 10, 1).getDay() + 6) % 7; // semanas empezando en lunes
  for (let d = 1; d <= 30; d++) {
    const pos = d - 1 + hueco;
    const x = 5 + (pos % 7) * 5.7;
    const y = 16 + Math.floor(pos / 7) * 5.6;
    gDias.appendChild(crear('rect', { x: x - 1.4, y: y - 0.9, width: 2.8, height: 1.8, rx: 0.4 }));
    if (d === 9 && diaMarcado) {
      diaMarcado.setAttribute('cx', x);
      diaMarcado.setAttribute('cy', y);
    }
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
// punta de cada tallo definido en el HTML
const PUNTAS_RAMO = [
  [580, 498, 0.92], [626, 504, 0.98], [562, 520, 0.86],
  [642, 528, 0.82], [601, 482, 1.06], [554, 546, 0.78], [648, 550, 0.78],
  [592, 504, 0.88], [616, 514, 0.84],
];
const TONOS_FLOR = ['#8b52c9', '#7a41b8', '#a97ad8', '#6b34a8', '#b98ae0'];

const gFlores = document.getElementById('flores');
if (gFlores) {
  PUNTAS_RAMO.forEach(([cx, cy, escala], i) => {
    const flor = crear('g', { transform: `translate(${cx} ${cy}) scale(${escala})` });
    const tono = TONOS_FLOR[i % TONOS_FLOR.length];

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

/* ---------- Nieve ---------- */
const nieveAcumulada = document.getElementById('nieveAcumulada');
if (nieveAcumulada && !ESCENA.nevar) nieveAcumulada.remove();

// Cada copo cae desde arriba con una deriva lateral y se mece un poco.
const nevar = (id, cuantos, capa) => {
  const grupo = document.getElementById(id);
  if (!grupo || !ESCENA.nevar || reducido) return;
  for (let i = 0; i < cuantos; i++) {
    const cae = crear('g', { class: 'copo' });
    const copo = crear('circle', {
      cx: azar(-700, 1900).toFixed(1),
      cy: azar(-340, -300).toFixed(1),
      r: azar(capa.r[0], capa.r[1]).toFixed(2),
      fill: '#f4f6ff',
      opacity: azar(capa.opacidad[0], capa.opacidad[1]).toFixed(2),
      class: 'copo__vaiven',
    });
    if (capa.borroso && Math.random() < 0.5) copo.setAttribute('filter', 'url(#fSuave)');
    const duracion = azar(capa.duracion[0], capa.duracion[1]);
    cae.style.setProperty('--deriva', `${azar(-120, 60).toFixed(0)}px`);
    cae.style.setProperty('--caida', `${capa.caida}px`);
    cae.style.animationDuration = `${duracion.toFixed(1)}s`;
    cae.style.animationDelay = `${(-azar(0, duracion)).toFixed(1)}s`; // ya nevando al abrir
    copo.style.setProperty('--mece', `${azar(4, 14).toFixed(0)}px`);
    copo.style.animationDuration = `${azar(2.5, 5).toFixed(1)}s`;
    copo.style.animationDelay = `${(-azar(0, 5)).toFixed(1)}s`;
    cae.appendChild(copo);
    grupo.appendChild(cae);
  }
};

nevar('nieveLejos', ESCENA.coposLejos, {
  r: [0.7, 1.7], opacidad: [0.35, 0.8], duracion: [16, 28], caida: 1500,
});
nevar('nieveCerca', ESCENA.coposCerca, {
  r: [1.8, 3.6], opacidad: [0.55, 0.9], duracion: [9, 15], caida: 1500, borroso: true,
});

/* ---------- Vaho: se le ve el aliento con el frio ---------- */
const gVaho = document.getElementById('vaho');
const soltarVaho = () => {
  if (!gVaho || !ESCENA.nevar || reducido) return;
  const nube = crear('ellipse', {
    cx: 424, cy: 548, rx: 7, ry: 4.5, fill: '#e8ecf8', filter: 'url(#fSuave)', opacity: 0,
  });
  nube.style.transformBox = 'fill-box';
  nube.style.transformOrigin = 'center';
  gVaho.appendChild(nube);
  nube.animate([
    { opacity: 0, transform: 'translate(0, 0) scale(.6)' },
    { opacity: 0.32, offset: 0.25 },
    { opacity: 0, transform: `translate(${azar(14, 24).toFixed(0)}px, ${azar(-30, -18).toFixed(0)}px) scale(2.6)` },
  ], { duration: 3200, easing: 'ease-out' }).onfinish = () => nube.remove();
};
// al ritmo de la respiracion (.respira dura 5.5 s en escena.css)
if (!reducido && ESCENA.nevar) setInterval(soltarVaho, 5500);

/* ---------- Estrellas fugaces ---------- */
const gFugaces = document.getElementById('fugaces');

// grande: la del cierre, mas larga, mas lenta y cruzando el centro del cielo
const estrellaFugaz = (grande = false) => {
  if (!gFugaces || reducido) return;
  const vb = svg.viewBox.baseVal;
  const arriba = vb.y + vb.height * 0.04;
  const x = grande
    ? 600 - azar(180, 260)
    : azar(vb.x + vb.width * 0.12, vb.x + vb.width * 0.88);
  const y = grande
    ? Math.max(arriba + 30, azar(-10, 40))
    : azar(arriba, Math.max(arriba + 40, 230));
  // cae en diagonal, hacia un lado u otro
  const inclinacion = grande ? azar(14, 20) : azar(16, 36);
  const angulo = grande || Math.random() < 0.5 ? inclinacion : 180 - inclinacion;
  const cola = grande ? azar(260, 320) : azar(80, 150);
  const recorrido = grande ? azar(520, 600) : azar(220, 380);
  const grosor = grande ? 3.4 : 1.8;

  const g = crear('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angulo.toFixed(1)})` });
  const viaje = crear('g');
  viaje.appendChild(crear('path', { d: `M0 ${-grosor} L${-cola} 0 L0 ${grosor} Z`, fill: 'url(#gFugaz)' }));
  viaje.appendChild(crear('circle', { cx: 0, cy: 0, r: grande ? 4 : 2.3, fill: '#fff', filter: 'url(#fBrillo)' }));
  g.appendChild(viaje);
  gFugaces.appendChild(g);

  viaje.animate([
    { transform: 'translateX(0) scaleX(.15)', opacity: 0 },
    { opacity: 1, offset: 0.15 },
    { opacity: 1, offset: 0.7 },
    { transform: `translateX(${recorrido.toFixed(0)}px) scaleX(1)`, opacity: 0 },
  ], {
    duration: grande ? 3200 : azar(900, 1600),
    easing: grande ? 'cubic-bezier(.25,.1,.5,1)' : 'cubic-bezier(.3,.1,.6,1)',
  }).onfinish = () => g.remove();
};

/* ---------- Petalos que se caen del ramo ---------- */
const gPetalos = document.getElementById('petalos');

// el ramo esta dibujado a escala .72 alrededor de (600, 620)
const enElRamo = (x, y) => [600 + (x - 600) * 0.72, 620 + (y - 620) * 0.72];

const soltarPetalo = () => {
  if (!gPetalos || reducido || gPetalos.childElementCount > 14) return;
  const [fx, fy] = PUNTAS_RAMO[Math.floor(Math.random() * PUNTAS_RAMO.length)];
  const [x, y] = enElRamo(fx, fy);

  // unos se quedan en la mesa y otros caen al suelo
  const alSuelo = Math.random() < 0.4;
  let dx;
  let dy;
  if (alSuelo) {
    const lado = x < 600 ? -1 : 1;
    dx = 600 + lado * azar(100, 150) - x;
    dy = azar(740, 790) - y;
  } else {
    const tx = x + azar(-30, 30);
    const media = 22 * Math.sqrt(Math.max(0, 1 - ((tx - 600) / 94) ** 2));
    dx = tx - x;
    dy = 618 + azar(-0.3, 0.75) * media - y;
  }

  const g = crear('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` });
  const petalo = crear('ellipse', {
    rx: 3.4, ry: 2.3,
    fill: TONOS_FLOR[Math.floor(Math.random() * TONOS_FLOR.length)],
    opacity: 0.95,
  });
  g.appendChild(petalo);
  gPetalos.appendChild(g);

  // bajada con vaiven, girando sobre si mismo
  const pasos = 8;
  const vaiven = azar(6, 12);
  const fase = azar(0, Math.PI * 2);
  const giro = azar(160, 420) * (Math.random() < 0.5 ? -1 : 1);
  const fotogramas = [];
  for (let k = 0; k <= pasos; k++) {
    const t = k / pasos;
    const px = dx * t + Math.sin(t * Math.PI * 2.5 + fase) * vaiven * (1 - t);
    const py = dy * t ** 1.25;
    const aleteo = 0.6 + 0.4 * Math.abs(Math.cos(t * 7 + fase));
    fotogramas.push({
      transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(giro * t).toFixed(0)}deg) scaleY(${aleteo.toFixed(2)})`,
      opacity: k === 0 ? 0 : 1,
    });
  }
  const caida = petalo.animate(fotogramas, {
    duration: alSuelo ? azar(7000, 9500) : azar(4200, 6200),
    easing: 'ease-in-out',
    fill: 'forwards',
  });
  // se queda un rato donde ha caido y luego se desvanece
  caida.onfinish = () => {
    g.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 2500, delay: azar(7000, 14000), fill: 'forwards',
    }).onfinish = () => g.remove();
  };
};

/* ---------- La brasa se aviva con el aire ---------- */
const brasaHalo = document.getElementById('brasaHalo');
const brasaLuz = document.getElementById('brasaLuz');
const humoAviva = document.getElementById('humoAviva');
const gChispas = document.getElementById('chispas');
const PUNTA_CIGARRO = [696.2, 599.4]; // la brasa, ya girada con el cigarro

const avivarBrasa = () => {
  if (reducido || !brasaHalo) return;
  brasaHalo.style.transformBox = 'fill-box';
  brasaHalo.style.transformOrigin = 'center';
  brasaHalo.animate([
    { opacity: 0, transform: 'scale(.6)' },
    { opacity: 1, transform: 'scale(1.35)', offset: 0.35 },
    { opacity: 0.7, transform: 'scale(1.1)', offset: 0.6 },
    { opacity: 0, transform: 'scale(.8)' },
  ], { duration: 3200, easing: 'ease-in-out' });
  if (brasaLuz) {
    brasaLuz.animate([{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: 0 }],
      { duration: 3400, easing: 'ease-in-out' });
  }
  if (humoAviva) {
    humoAviva.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, offset: 0.3 },
      { opacity: 0, transform: 'translate(8px, -40px)' },
    ], { duration: 5200, delay: 700, easing: 'ease-out' });
  }
  if (gChispas) {
    const cuantas = Math.floor(azar(2, 5));
    for (let i = 0; i < cuantas; i++) {
      const chispa = crear('circle', {
        cx: PUNTA_CIGARRO[0], cy: PUNTA_CIGARRO[1],
        r: azar(0.7, 1.3).toFixed(2), fill: '#ffb066', filter: 'url(#fBrillo)',
      });
      gChispas.appendChild(chispa);
      chispa.animate([
        { transform: 'translate(0, 0)', opacity: 0 },
        { opacity: 1, offset: 0.15 },
        { transform: `translate(${azar(-8, 12).toFixed(1)}px, ${azar(-60, -28).toFixed(1)}px)`, opacity: 0 },
      ], { duration: azar(1400, 2400), delay: 600 + i * azar(80, 260), easing: 'ease-out', fill: 'backwards' })
        .onfinish = () => chispa.remove();
    }
  }
};

if (!reducido) {
  cadaTanto(ESCENA.cadaFugaz, () => estrellaFugaz());
  cadaTanto(ESCENA.cadaPetalo, soltarPetalo);
  cadaTanto(ESCENA.cadaBrasa, avivarBrasa);
  setTimeout(() => estrellaFugaz(), 2500);
}

/* ---------- Musica ---------- */
const audio = document.getElementById('musica');
const btnSonido = document.getElementById('sonido');
let hayMusica = Boolean(audio);

if (audio) {
  const sinMusica = () => {
    hayMusica = false;
    if (btnSonido) btnSonido.hidden = true;
  };
  if (audio.error) sinMusica();
  audio.addEventListener('error', sinMusica);
}

// Sube el volumen poco a poco. Va por reloj (no por fotogramas) para que no
// se quede a medias si el navegador frena la pagina, y al final fija el
// volumen exacto por si algun paso se perdio.
const fundirVolumen = (destino, ms) => {
  const desde = audio.volume;
  const t0 = Date.now();
  const paso = setInterval(() => {
    const k = Math.min(1, (Date.now() - t0) / ms);
    audio.volume = desde + (destino - desde) * k;
    if (k >= 1) clearInterval(paso);
  }, 50);
  setTimeout(() => {
    clearInterval(paso);
    audio.volume = destino;
  }, ms + 200);
};

// Se llama desde el toque de la portada. Si el navegador aun asi la bloquea,
// se vuelve a intentar con el siguiente toque o tecla, hasta que suene.
const sonarMusica = () => {
  if (!audio) return;
  if (audio.error) audio.load(); // por si fallo al cargar, reintenta
  audio.muted = false;
  audio.volume = 0;
  audio.play()
    .then(() => {
      hayMusica = true;
      fundirVolumen(MUSICA.volumen, MUSICA.fundido);
      if (btnSonido) btnSonido.hidden = false;
    })
    .catch(() => {
      const reintentar = () => {
        window.removeEventListener('pointerdown', reintentar);
        window.removeEventListener('keydown', reintentar);
        if (audio.paused) sonarMusica();
      };
      window.addEventListener('pointerdown', reintentar);
      window.addEventListener('keydown', reintentar);
    });
};

if (btnSonido && audio) {
  btnSonido.addEventListener('click', () => {
    audio.muted = !audio.muted;
    btnSonido.setAttribute('aria-pressed', String(audio.muted));
    btnSonido.setAttribute('aria-label', audio.muted ? 'Activar musica' : 'Silenciar musica');
  });
}

/* ---------- Mensajes, cierre y vuelta a empezar ---------- */
const elMensaje = document.getElementById('mensaje');
const elBarra = document.getElementById('avance');
const elRepetir = document.getElementById('repetir');
const elInicio = document.getElementById('inicio');

const duracion = (texto) => Math.min(
  ESCENA.duracionMaxima,
  Math.max(ESCENA.duracionMinima, 2200 + texto.length * ESCENA.msPorCaracter),
);

const cierre = async () => {
  elMensajes.classList.add('is-cierre');
  await esperar(CIERRE.pausaAntes);

  // lluvia de estrellas fugaces y unos cuantos petalos
  for (let i = 0; i < 7; i++) setTimeout(() => estrellaFugaz(), i * azar(350, 650));
  for (let i = 0; i < 4; i++) setTimeout(soltarPetalo, 400 + i * 700);
  await esperar(4200);

  // una estrella fugaz grande y lenta; al pasar se enciende una ventana lejana
  estrellaFugaz(true);
  await esperar(2200);
  encenderUltimaVentana();
  await esperar(1400);

  elMensaje.textContent = CIERRE.texto;
  elMensaje.classList.add('is-on');
  await esperar(CIERRE.esperaBoton);

  if (elRepetir) {
    elRepetir.classList.add('is-on');
    elRepetir.tabIndex = 0;
  }
};

/* ---------- Momentos ligados a los mensajes ---------- */
const sinTildes = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const trae = (texto, clave) => Boolean(clave) && sinTildes(texto).includes(sinTildes(clave));

const florAmarilla = document.getElementById('florAmarilla');
const talloAmarillo = document.getElementById('talloAmarillo');
const corolaAmarilla = document.getElementById('corolaAmarilla');
let animacionesFlor = [];

const brotarFlorAmarilla = () => {
  if (!florAmarilla) return;
  florAmarilla.setAttribute('opacity', '1');
  if (reducido) {
    talloAmarillo.setAttribute('stroke-dashoffset', '0');
    corolaAmarilla.setAttribute('transform', 'scale(1)');
    return;
  }
  corolaAmarilla.style.transformBox = 'fill-box';
  corolaAmarilla.style.transformOrigin = 'center';
  animacionesFlor = [
    talloAmarillo.animate([{ strokeDashoffset: '1' }, { strokeDashoffset: '0' }],
      { duration: 1800, easing: 'ease-out', fill: 'forwards' }),
    corolaAmarilla.animate([
      { transform: 'scale(0) rotate(-40deg)' },
      { transform: 'scale(1.15) rotate(6deg)', offset: 0.75 },
      { transform: 'scale(1) rotate(0deg)' },
    ], { duration: 1600, delay: 1300, easing: 'ease-out', fill: 'forwards' }),
  ];
};

const esconderFlorAmarilla = () => {
  if (!florAmarilla) return;
  animacionesFlor.forEach((a) => a.cancel());
  animacionesFlor = [];
  florAmarilla.setAttribute('opacity', '0');
  talloAmarillo.setAttribute('stroke-dashoffset', '1');
  corolaAmarilla.setAttribute('transform', 'scale(0)');
};

const elAviso = document.getElementById('aviso');
const elAvisoTexto = document.getElementById('avisoTexto');

// coloca la notificacion justo encima del movil, sea cual sea la pantalla
const colocarAviso = () => {
  if (!elAviso || !svg.getScreenCTM()) return;
  const p = svg.createSVGPoint();
  p.x = 562;
  p.y = 614;
  const enPantalla = p.matrixTransform(svg.getScreenCTM());
  elAviso.style.left = `${enPantalla.x}px`;
  elAviso.style.top = `${enPantalla.y}px`;
};
window.addEventListener('resize', colocarAviso);

const encenderMovil = async () => {
  await esperar(1500);
  if (elAvisoTexto) elAvisoTexto.textContent = MOMENTOS.avisoMovil;
  colocarAviso();
  svg.classList.add('movil-encendido');
  await esperar(500);
  if (elAviso) elAviso.classList.add('is-on');
  await esperar(3800);
  if (elAviso) elAviso.classList.remove('is-on');
  await esperar(400);
  svg.classList.remove('movil-encendido');
};

// Se llama al empezar cada mensaje; devuelve lo que hay que hacer al quitarlo.
/* la nota bajo el jarron sale del todo en el ultimo mensaje */
const elNota = document.getElementById('nota');
let animacionNota = null;
const mostrarNota = () => {
  if (!elNota) return;
  if (reducido) {
    elNota.setAttribute('opacity', '1');
    return;
  }
  animacionNota = elNota.animate([
    { opacity: 0, transform: 'translateX(12px)' },
    { opacity: 1, transform: 'translateX(0)' },
  ], { duration: 1800, delay: 900, easing: 'ease-out', fill: 'forwards' });
};
const esconderNota = () => {
  if (animacionNota) animacionNota.cancel();
  animacionNota = null;
  if (elNota) elNota.setAttribute('opacity', '0');
};

/* las ventanas de la ciudad se apagan poco a poco segun avanzan los mensajes */
const ventanasEnOrden = [...VENTANAS].sort(() => Math.random() - 0.5);
let ultimaVentana = null;
const apagarCiudad = (hasta) => {
  const cuantas = Math.round(ventanasEnOrden.length * ESCENA.ventanasApagadas * hasta);
  ventanasEnOrden.forEach((v, i) => {
    if (i < cuantas && !v.classList.contains('apagada')) {
      setTimeout(() => v.classList.add('apagada'), azar(0, 4000));
    }
  });
};
const encenderCiudad = () => {
  VENTANAS.forEach((v) => v.classList.remove('apagada'));
  if (ultimaVentana) {
    ultimaVentana.classList.remove('ventana--ultima');
    ultimaVentana.removeAttribute('filter');
    ultimaVentana = null;
  }
};
// una ventana de la ciudad lejana, bien a la vista entre los dos muros
const encenderUltimaVentana = () => {
  const lejos = document.getElementById('ciudadLejos');
  const candidatas = VENTANAS.filter((v) => lejos.contains(v)
    && v.classList.contains('apagada')
    && +v.getAttribute('x') > 380 && +v.getAttribute('x') < 820);
  ultimaVentana = candidatas[Math.floor(Math.random() * candidatas.length)];
  if (!ultimaVentana) return;
  ultimaVentana.setAttribute('filter', 'url(#fBrillo)');
  ultimaVentana.classList.add('ventana--ultima');
  ultimaVentana.classList.remove('apagada');
};

let temporizadorMirada = null;
const momentoDe = (texto) => {
  if (trae(texto, MOMENTOS.florAmarilla)) brotarFlorAmarilla();
  if (trae(texto, MOMENTOS.movil)) {
    encenderMovil();
    mostrarNota();
    svg.classList.add('dia-senalado');
  }
  if (trae(texto, MOMENTOS.sillaVacia)) {
    svg.classList.add('silla-encendida');
    // al poco de encenderse la luz, gira la cabeza hacia la silla
    temporizadorMirada = setTimeout(() => svg.classList.add('mira-silla'), 1800);
    return () => {
      clearTimeout(temporizadorMirada);
      svg.classList.remove('silla-encendida', 'mira-silla');
    };
  }
  return () => {};
};

const recorrido = async () => {
  elMensajes.classList.remove('is-cierre');
  esconderFlorAmarilla();
  esconderNota();
  encenderCiudad();
  svg.classList.remove('dia-senalado');
  for (let i = 0; i < MENSAJES.length; i++) {
    const texto = MENSAJES[i];
    elMensaje.textContent = texto;
    elMensaje.classList.add('is-on');
    if (elBarra) elBarra.style.width = `${((i + 1) / MENSAJES.length) * 100}%`;
    apagarCiudad((i + 1) / MENSAJES.length);
    const alQuitar = momentoDe(texto);
    await esperar(duracion(texto));
    alQuitar();
    elMensaje.classList.remove('is-on');
    await esperar(ESCENA.pausaEntreMensajes);
  }
  await cierre();
};

if (elRepetir) {
  let repitiendo = false;
  elRepetir.addEventListener('click', async () => {
    if (repitiendo) return;
    repitiendo = true;
    elRepetir.classList.remove('is-on');
    elRepetir.tabIndex = -1;
    elMensaje.classList.remove('is-on');
    if (elBarra) elBarra.style.width = '0%';
    await esperar(1600);
    repitiendo = false;
    recorrido();
  });
}

if (elMensaje && MENSAJES.length) {
  let empezado = false;
  const empezar = () => {
    if (empezado) return;
    empezado = true;
    sonarMusica();
    if (elInicio) elInicio.classList.add('is-fuera');
    elMensajes.classList.remove('is-esperando');
    setTimeout(recorrido, 1800);
  };

  if (elInicio) {
    elInicio.addEventListener('click', empezar);
    elInicio.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        empezar();
      }
    });
    elInicio.focus({ preventScroll: true });
  } else {
    empezar();
  }
}
