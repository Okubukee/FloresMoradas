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
  // Guiños a Crepusculo
  pinos: true,          // bosque de pinos en el horizonte, como en Forks
  niebla: true,         // niebla que cruza la ciudad
  prado: 90,            // flores que brotan en el suelo al final (0 = ninguna)
};

// Lo que aparece al terminar los mensajes.
const CIERRE = {
  texto: 'Feliz día de la flor morada.',
  pausaAntes: 1800,     // ms tras el ultimo mensaje
  esperaBoton: 3600,    // ms hasta que aparecen los botones del final
  // boton que abre un video en otra pestaña (deja enlaceVideo en '' para quitarlo)
  textoVideo: 'Cómo conservar tu ramo',
  enlaceVideo: 'https://www.youtube.com/shorts/dXnECzPj0GQ',
  // boton que abre la floristeria en otra pestaña (deja enlaceFloristeria en '' para quitarlo)
  textoFloristeria: 'Ver la floristería',
  enlaceFloristeria: 'https://maps.app.goo.gl/HVmx4EXgC9hLbsZK8',
};

// Cosas que pasan en la escena con ciertos mensajes. Se busca el trozo de
// texto dentro del mensaje (da igual mayusculas y tildes); si cambias los
// mensajes, cambia tambien estas palabras.
const MOMENTOS = {
  florAmarilla: 'flores amarillas',  // brota una flor amarilla en el ramo
  sillaVacia: 'ser la luz',          // se ilumina la silla de la manta
  movil: 'floristeria',              // el movil se enciende con un aviso
  avisoMovil: '9 de noviembre 🌸',
  mesesPasan: 'el tiempo y el espacio', // el calendario pasa un año entero (Luna Nueva)
  petaloTulipan: 'no te presionare',    // cae un petalo del tulipan (Luna Nueva)
};

// La carta que se abre al tocar la nota bajo el jarron (sale en el ultimo
// mensaje) o con el boton "Leer la carta" del final.
// Cada texto de "parrafos" es un parrafo. Deja "epigrafe" vacio ('') para quitarlo.
const CARTA = {
  epigrafe: '«Antes de ti, mi vida era como una noche sin luna. Muy oscura, pero había estrellas, puntos de luz y razón… Y entonces cruzaste mi cielo como una estrella fugaz.»',
  titulo: 'Para ti Estela',
  parrafos: [
    'Hola, quiero decirte que estoy disfrutando mucho dedicarte cosas asi. No esperaba divertirme haciendote cosas originales y imaginarme quizas una sonrisa invisible que no pueda ver.',
    'Esta vez quise ser mas detallista, no se si quizas te fijaste. Pero hay algunos detalles interesantes ademas de referencias a Crepusculo ¿Quien diria que esto fuera divertido? Aparte resulta que si haces las cosas con mucho tiempo de antelacion, es mucho mas comodo hacer estas cosas.',
    'Aparte de eso tambien queria decirte algunas cosas sobre ti. Siempre me pareciste hermosa, admiro tu caracter, tu voz, extraño tu acento en otros idiomas, tu sonrisa, tu estilo, tus ocurrencias, tu risa, tu mirada, tu preocupacion, eres inteligente, detallista, dulce, buena, quizas puedas decir que no eres perfecta. Pero que importa pensar en eso, cuando existes tu.',
  ],
  firma: 'Con cariño,',
};

// Segunda carta, con su propio boton al final ("Carta de Muerte").
const CARTA_MUERTE = {
  epigrafe: '',
  titulo: 'Carta de Muerte',
  parrafos: [
    'Siento que debo aclarártelo. Quizás quieras dejar el pasado atrás, pero las cosas no eran como tú pensabas. Cuando murió mi padre no es que no te necesitara; simplemente no sabía cómo gestionar absolutamente nada. Pensaba que necesitaba espacio, y fue una experiencia horrible tener que estar rodeado de tanta gente. Por algún motivo, no quería ser una molestia para ti ni convertirme en una carga. No sé qué lógica o pensamiento seguí en ese momento, pero solo quería no molestarte ni perjudicarte, y supongo que quería estar un poco solo en casa y pensar sobre ello. Aunque, siendo realistas, lo que más necesitaba era hablar de ello, estar contigo y soltarlo todo contigo.',
    'Suena absurdo porque literalmente había muerto mi padre, pero le decía a mi madre que tenía que ir a trabajar ese mismo día porque no sabía cómo actuar ante una situación así. Fue ella quien me puso los pies en la tierra y recuerdo que me dijo: "Estás loco, acaba de morir tu padre. ¿Cómo irías a trabajar ahora?". Al final avisé de que no podía ir. Cuando mis amigos se enteraron, quisieron animarme o distraerme. Yo no estaba para fiestas ni para nada; ellos suelen quedar en una casa, jugar a juegos de mesa, ver anime y tal, así que no me esperaba que propusieran eso, pero por no saber decir que no, me vi arrastrado a salir. No lo disfruté, no quería estar ahí y solo esperaba a que pasara el tiempo para no pensar.',
    'Aunque suene raro, yo solo estaba esperando a que llegara el fin de semana para verte, mirarte a la cara y abrazarte. Ni siquiera sabía si iba a seguir llorando, cómo reaccionaría ni qué sentía. Con el tiempo me he dado cuenta de que sigo llorando cuando lo pienso o hablo de ello. Estaba perdido, completamente confuso, y me dolió no saber expresarte que te necesitaba mucho más de lo que pude comunicarte.',
    'No hubo fiesta ni compañía que necesitara más que la tuya. Nunca me había visto en una situación así y simplemente no sabía cómo reaccionar. Cuando murieron mis padrinos realmente no me afectó, y cuando murieron mis abuelos no vi ni a mi padre ni a mi madre reaccionar por ello, y mucho menos buscar consuelo en nadie: ni entre ellos, ni en sus hijos, ni en nada. Nunca exteriorizaron nada, así que mi experiencia era demasiado escasa como para saber siquiera cómo actuar. Lo pienso a veces y debí haber sido egoísta contigo y pedirte que vinieras para estar conmigo cuando él murió y ese finde, pero sentía que era mejor no molestarte y estar solo. Me da mucha rabia pensar que te hice sentir que no te necesitaba, cuando la realidad era lo contrario. Mi relación con mi padre fue complicada, con poca cercanía emocional; mi madre me decía que él me quería mucho, pero sinceramente no lo recuerdo bien, todo es borroso. Ni siquiera tuve buenas referencias emocionales en mi familia: mi madre es como una roca, ha tenido una vida muy dura y casi nunca demuestra vulnerabilidad, aunque los quiero mucho a los dos.',
    'Por último, me quiero disculpar de nuevo por lo que te dije por Discord. Tú no tienes ninguna culpa. No te antepuse a mi padre ni nada parecido; simplemente, ante la desesperación de ver que te ibas, solo quería decirte que me importas mucho y usé unas palabras horribles que te hicieron daño y que también menospreciaron a mi padre.',
    'Espero que esto sirva para aclarar un poco las cosas. Me dolía mucho pensar que la relación terminó con esa imagen de mí, cuando la realidad es que lo único que esperaba era poder verte, abrazarte y escucharte.',
  ],
  firma: '',
};

// Tercera carta, con su propio boton al final ("Carta Emoción Incompleta").
const CARTA_INCOMPLETA = {
  epigrafe: '',
  titulo: 'Carta Emoción Incompleta',
  parrafos: [
    'Lo segundo que quiero aclararte es que no fui consciente de que te estaba invalidando emocionalmente. Tiempo después reflexioné y me di cuenta de que había estado limitando tu forma de quererme. Me rompió bastante pensarlo, porque era darme cuenta de que me equivocaba en cosas que yo creía que no.',
    'Más tarde, cuando hablamos después de mucho tiempo, me dijiste que te invalidaba emocionalmente, y eso me hizo pensar y reflexionar. No fue tan obvio para mí, pero al recordar cuando me corregías al hablar con mi madre y en otros momentos, me doy cuenta de que en realidad aprendí eso de mi padre y lo aplicaba con mis seres queridos: contigo y con mi madre. Siempre pensé que actuaba de la forma correcta: sabía expresarme, sabía escuchar y era como un "buen psicólogo". La realidad es que había algo invisible para mí.',
    'Recientemente tuve una conversación con mi madre y también intento poner en práctica el aprender a comunicarme, para no repetir esa invalidación que al final me sale de forma inconsciente contigo y con ella. Me puse a llorar intentando hablar con ella. No es fácil, porque para ella la muerte de mi padre tuvo varias causas y yo fui una de ellas. No me odia, pero sí me culpa un poco cuando se enfada. Toda esta comunicación con mi madre es nueva para mí, y a veces es difícil y desesperante.',
    'Lo que trato de decirte es que escucharé las cosas que me digas y me esforzaré por explicarme. No te culpo de nada; solo pienso que me equivoqué contigo, con errores, asumiendo cosas y sin cuestionármelas. Llegué tarde, porque no fue durante la relación, pero espero que este pequeño diario te diga algo.',
  ],
  firma: '',
};

// La cancion se pone en index.html -> <audio id="musica">.
const MUSICA = {
  volumen: 0.6,         // 0 a 1
  fundido: 4000,        // ms que tarda en subir el volumen al empezar
};

// Zona que siempre debe verse, pase lo que pase con el tamano de pantalla.
// De ancho entra desde el calendario del muro izquierdo hasta la manzana de la barandilla.
const ENCUADRE = { x: 210, y: -60, ancho: 780, alto: 870 };

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
    // en movil (vertical) sobra alto: se enseña mas cielo y suelo para que
    // quepa todo el ancho y no se corten el calendario ni el tulipan
    ancho = ENCUADRE.ancho;
    alto = Math.min(1950, ancho / r);
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

    // en movil los botones del final se apilan: se bajan al suelo vacio, bajo
    // el gato, para no tapar la mesa
    const elBotones = elMensajes.querySelector('.mensajes__botones');
    if (elBotones) {
      if (r <= proporcionSegura) {
        const suelo = (820 - y) * escala - desviacion;
        Object.assign(elBotones.style, {
          position: 'absolute', left: '0', right: '0', marginTop: '0',
          top: `${Math.round(suelo - arriba)}px`,
        });
      } else {
        elBotones.removeAttribute('style');
      }
    }
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

/* ---------- Pinos de Forks en el horizonte ---------- */

// Un abeto: copa en pisos que se abren hacia abajo y un tronco corto.
const pino = (x, base, alto) => {
  const ancho = alto * azar(0.32, 0.42);
  const top = base - alto;
  const copa = alto * 0.88;
  const pisos = 4;
  const lado = [];
  for (let i = 1; i <= pisos; i++) {
    const t = i / pisos;
    const y = top + copa * t;
    lado.push([(ancho / 2) * t, y]);
    if (i < pisos) lado.push([(ancho / 2) * t * 0.45, y - alto * 0.02]);
  }
  const tronco = ancho * 0.06;
  const derecha = [...lado, [tronco, top + copa], [tronco, base]];
  const puntos = [[0, top], ...derecha, ...[...derecha].reverse().map(([dx, y]) => [-dx, y])];
  return crear('path', {
    d: `M${puntos.map(([dx, y]) => `${(x + dx).toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`,
  });
};

const plantarPinos = (id, { base, alto, color, zonas, cuantos }) => {
  const grupo = document.getElementById(id);
  if (!grupo || !ESCENA.pinos) return;
  grupo.setAttribute('fill', color);
  for (let i = 0; i < cuantos; i++) {
    const [desde, hasta] = zonas[Math.floor(Math.random() * zonas.length)];
    grupo.appendChild(pino(azar(desde, hasta), base + azar(0, 4), azar(alto[0], alto[1])));
  }
};

// al fondo por todo el horizonte; los cercanos, mas altos, hacia los lados
plantarPinos('pinosLejos', {
  base: 450, alto: [22, 58], color: '#23173f', cuantos: 150,
  zonas: [[-700, 440], [760, 1900], [440, 760]],
});
plantarPinos('pinosCerca', {
  base: 468, alto: [44, 104], color: '#150d29', cuantos: 60,
  zonas: [[-700, 380], [820, 1900]],
});

/* ---------- Niebla ---------- */
const echarNiebla = (id, bandas) => {
  const grupo = document.getElementById(id);
  if (!grupo || !ESCENA.niebla) return;
  bandas.forEach(({ y, alto, opacidad, cuantas }) => {
    for (let i = 0; i < cuantas; i++) {
      const nube = crear('ellipse', {
        cx: azar(-700, 1900).toFixed(0),
        cy: (y + azar(-8, 8)).toFixed(0),
        rx: azar(220, 420).toFixed(0),
        ry: (alto * azar(0.7, 1.2)).toFixed(0),
        fill: 'url(#gNiebla)',
        opacity: azar(opacidad * 0.6, opacidad).toFixed(2),
      });
      if (!reducido) {
        nube.setAttribute('class', 'niebla');
        nube.style.setProperty('--viaje', `${(azar(80, 220) * (Math.random() < 0.5 ? -1 : 1)).toFixed(0)}px`);
        nube.style.animationDuration = `${azar(40, 80).toFixed(0)}s`;
        nube.style.animationDelay = `${(-azar(0, 80)).toFixed(0)}s`;
      }
      grupo.appendChild(nube);
    }
  });
};

echarNiebla('nieblaLejos', [
  { y: 452, alto: 26, opacidad: 0.6, cuantas: 9 },
  { y: 420, alto: 18, opacidad: 0.3, cuantas: 5 },
]);
echarNiebla('nieblaCerca', [{ y: 530, alto: 40, opacidad: 0.4, cuantas: 7 }]);

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
const DIA_MARCADO = { anio: 2026, mes: 10, dia: 9 }; // mes: 0 = enero
const NOMBRES_MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const hojaCalendario = document.getElementById('hojaCalendario');
const elMes = document.getElementById('mesCalendario');
const gDias = document.getElementById('diasCalendario');
const diaMarcado = document.querySelector('.dia-marcado');

const dibujarMes = (anio, mes) => {
  if (!gDias) return;
  gDias.replaceChildren();
  if (elMes) elMes.textContent = NOMBRES_MES[mes];
  const conMarca = mes === DIA_MARCADO.mes;
  if (diaMarcado) diaMarcado.style.visibility = conMarca ? 'visible' : 'hidden';
  const hueco = (new Date(anio, mes, 1).getDay() + 6) % 7; // semanas empezando en lunes
  const dias = new Date(anio, mes + 1, 0).getDate();
  for (let d = 1; d <= dias; d++) {
    const pos = d - 1 + hueco;
    const x = 5 + (pos % 7) * 5.7;
    const y = 16 + Math.floor(pos / 7) * 5.6;
    gDias.appendChild(crear('rect', { x: x - 1.4, y: y - 0.9, width: 2.8, height: 1.8, rx: 0.4 }));
    if (conMarca && d === DIA_MARCADO.dia && diaMarcado) {
      diaMarcado.setAttribute('cx', x);
      diaMarcado.setAttribute('cy', y);
    }
  }
};
const volverANoviembre = () => dibujarMes(DIA_MARCADO.anio, DIA_MARCADO.mes);
volverANoviembre();

// Pasa un año entero, hoja a hoja, como en Luna Nueva, y vuelve a noviembre.
// Cada hoja arrancada es una copia que sale volando; debajo ya esta el mes siguiente.
let hojeando = 0;
const pasarMeses = async () => {
  if (!hojaCalendario || reducido) return;
  const vez = ++hojeando;
  await esperar(1200);
  for (let i = 1; i <= 12; i++) {
    if (vez !== hojeando) return;
    const hoja = hojaCalendario.cloneNode(true);
    hoja.removeAttribute('id');
    hoja.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    hojaCalendario.after(hoja);

    if (i === 12) volverANoviembre();
    else {
      const fecha = new Date(DIA_MARCADO.anio, DIA_MARCADO.mes + i, 1);
      dibujarMes(fecha.getFullYear(), fecha.getMonth());
    }

    hoja.style.transformBox = 'fill-box';
    hoja.style.transformOrigin = '50% 0';
    hoja.animate([
      { transform: 'translate(0, 0) rotate(0deg) scaleY(1)', opacity: 1 },
      { transform: 'translate(4px, -8px) rotate(-8deg) scaleY(.4)', opacity: 0.85, offset: 0.45 },
      { transform: 'translate(16px, 10px) rotate(-24deg) scaleY(.1)', opacity: 0 },
    ], { duration: 900, easing: 'ease-in', fill: 'forwards' }).onfinish = () => hoja.remove();
    await esperar(600);
  }
};
const pararMeses = () => {
  hojeando++;
  volverANoviembre();
};

/* ---------- Tablero de ajedrez sobre la silla vacia ---------- */
const gTablero = document.getElementById('tablero');
if (gTablero) {
  // esquinas del tablero en perspectiva: fondo izq, fondo der, frente der, frente izq
  const [fi, fd, dd, di] = [[756, 671], [806, 671], [812, 678], [750, 678]];
  const punto = (u, v) => {
    const arriba = [fi[0] + (fd[0] - fi[0]) * u, fi[1]];
    const abajo = [di[0] + (dd[0] - di[0]) * u, di[1]];
    return [arriba[0] + (abajo[0] - arriba[0]) * v, arriba[1] + (abajo[1] - arriba[1]) * v];
  };
  const filas = 4;
  const columnas = 8;
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      if ((f + c) % 2) continue;
      const esquinas = [
        punto(c / columnas, f / filas), punto((c + 1) / columnas, f / filas),
        punto((c + 1) / columnas, (f + 1) / filas), punto(c / columnas, (f + 1) / filas),
      ];
      gTablero.appendChild(crear('path', {
        d: `M${esquinas.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L')} Z`,
        fill: '#c9bfae', opacity: 0.55,
      }));
    }
  }
}

/* ---------- La manzana brilla al tocarla ---------- */
const manzana = document.getElementById('manzana');
const brilloManzana = document.getElementById('brilloManzana');
if (manzana && brilloManzana) {
  manzana.addEventListener('click', () => {
    brilloManzana.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }],
      { duration: 2400, easing: 'ease-in-out' });
  });
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

/* ---------- El petalo del tulipan (Luna Nueva) ---------- */
// Cae despacio hasta el suelo y se queda alli hasta volver a empezar.
const petaloTulipan = document.getElementById('petaloTulipan');
let petaloCaido = null;
let animacionTulipan = null;

const caerPetaloTulipan = async () => {
  if (!petaloTulipan || !gPetalos || reducido || petaloCaido) return;
  const [x, y] = [294.5, 564]; // el petalo derecho del tulipan de la botella
  const [dx, dy] = [316 - x, 678 - y]; // al suelo, junto a la botella
  petaloCaido = crear('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` });
  const petalo = crear('path', {
    d: 'M0 -8 C 3 -6, 4 -1, 3 4 C 2 7, -2 7, -3 4 C -4 -1, -3 -6, 0 -8 Z',
    fill: 'url(#gTulipan)',
  });
  petaloCaido.appendChild(petalo);
  gPetalos.appendChild(petaloCaido);

  animacionTulipan = petaloTulipan.animate([{ opacity: 1 }, { opacity: 0 }],
    { duration: 300, fill: 'forwards' });

  const pasos = 12;
  const fotogramas = [];
  for (let k = 0; k <= pasos; k++) {
    const t = k / pasos;
    const px = dx * t + Math.sin(t * Math.PI * 3) * 22 * (1 - t * 0.7);
    const py = dy * t ** 1.3;
    const aleteo = 0.7 + 0.3 * Math.abs(Math.cos(t * 6));
    fotogramas.push({
      transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(20 + 70 * t + Math.sin(t * 9) * 25).toFixed(0)}deg) scaleY(${aleteo.toFixed(2)})`,
    });
  }
  // al llegar al suelo se queda tumbado
  fotogramas[pasos].transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(80deg) scaleY(.55)`;
  petalo.animate(fotogramas, { duration: 8000, easing: 'ease-in-out', fill: 'forwards' });
};

const devolverPetaloTulipan = () => {
  if (animacionTulipan) animacionTulipan.cancel();
  animacionTulipan = null;
  if (petaloCaido) petaloCaido.remove();
  petaloCaido = null;
};

/* ---------- El prado del final ---------- */
// Flores moradas silvestres que brotan por todo el suelo del balcon.
const gPrado = document.getElementById('prado');
const gPradoDelante = document.getElementById('pradoDelante');

// bordes del suelo (el trapecio del balcon) a una altura dada
const anchoDelSuelo = (y) => {
  const t = (y - 580) / 820;
  return [256 - 136 * t, 944 + 136 * t];
};

const florecerPrado = () => {
  if (!gPrado || !gPradoDelante || !ESCENA.prado) return;
  for (let i = 0; i < ESCENA.prado; i++) {
    const y = azar(598, 900);
    const [izq, der] = anchoDelSuelo(y);
    const x = azar(izq + 8, der - 8);
    const delante = y > 736;
    if (delante && x > 646 && x < 750 && y < 794) continue; // ahi duerme el gato

    const escala = 0.45 + (y - 590) / 260; // mas pequeñas cuanto mas lejos
    const flor = crear('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${escala.toFixed(2)})` });
    const alto = azar(8, 16);
    const tallo = crear('path', {
      d: `M0 0 Q ${azar(-3, 3).toFixed(1)} ${(-alto / 2).toFixed(1)}, 0 ${(-alto).toFixed(1)}`,
      stroke: '#38684a', 'stroke-width': 1.3, 'stroke-linecap': 'round', fill: 'none', opacity: 0.8,
      pathLength: 1, 'stroke-dasharray': 1,
    });
    const sitio = crear('g', { transform: `translate(0 ${(-alto).toFixed(1)})` });
    const corola = crear('g');
    const color = TONOS_FLOR[Math.floor(Math.random() * TONOS_FLOR.length)];
    corola.appendChild(crear('circle', { r: 7, fill: 'url(#gHaloFlor)' }));
    for (let p = 0; p < 5; p++) {
      const ang = (p / 5) * Math.PI * 2 - Math.PI / 2;
      corola.appendChild(crear('circle', {
        cx: (Math.cos(ang) * 2.3).toFixed(2), cy: (Math.sin(ang) * 2.3).toFixed(2), r: 1.9, fill: color,
      }));
    }
    corola.appendChild(crear('circle', { r: 1, fill: '#edd9a6' }));
    sitio.appendChild(corola);
    flor.append(tallo, sitio);
    (delante ? gPradoDelante : gPrado).appendChild(flor);

    if (reducido) continue;
    const retraso = azar(0, 4500);
    tallo.animate([{ strokeDashoffset: '1' }, { strokeDashoffset: '0' }],
      { duration: 1000, delay: retraso, easing: 'ease-out', fill: 'both' });
    corola.style.transformBox = 'fill-box';
    corola.style.transformOrigin = 'center';
    corola.animate([
      { transform: 'scale(0) rotate(-40deg)' },
      { transform: 'scale(1.2) rotate(6deg)', offset: 0.7 },
      { transform: 'scale(1) rotate(0deg)' },
    ], { duration: 1200, delay: retraso + 700, easing: 'ease-out', fill: 'both' });
  }
};

const marchitarPrado = () => {
  if (gPrado) gPrado.replaceChildren();
  if (gPradoDelante) gPradoDelante.replaceChildren();
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

  // el suelo se llena de flores moradas, como el prado
  florecerPrado();

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

  [elLeerCarta, elCartaMuerte, elCartaIncompleta, elVerVideo, elVerFloristeria, elRepetir].forEach((boton) => {
    if (!boton) return;
    boton.classList.add('is-on');
    boton.tabIndex = 0;
  });
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
// mientras no se ve, la nota no se puede tocar
const notaTocable = (si) => {
  if (!elNota) return;
  elNota.classList.toggle('is-tocable', si);
  elNota.tabIndex = si ? 0 : -1;
};
const mostrarNota = () => {
  if (!elNota) return;
  notaTocable(true);
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
  notaTocable(false);
  if (elNota) elNota.setAttribute('opacity', '0');
};

/* ---------- La carta ---------- */
const elCarta = document.getElementById('carta');
const elCartaPapel = document.getElementById('cartaPapel');
const elCartaCerrar = document.getElementById('cartaCerrar');
const elLeerCarta = document.getElementById('leerCarta');

// botones-enlace del final (video, floristeria); sin enlace, no se muestran
const prepararEnlace = (id, enlace, texto) => {
  const el = document.getElementById(id);
  if (!el) return null;
  if (!enlace) {
    el.remove();
    return null;
  }
  el.href = enlace;
  el.querySelector('.mensajes__etiqueta').textContent = texto;
  return el;
};
const elVerVideo = prepararEnlace('verVideo', CIERRE.enlaceVideo, CIERRE.textoVideo);
const elVerFloristeria = prepararEnlace('verFloristeria', CIERRE.enlaceFloristeria, CIERRE.textoFloristeria);

const elCartaMuerte = document.getElementById('leerCartaMuerte');
const elCartaIncompleta = document.getElementById('leerCartaIncompleta');

const escribirCarta = (carta) => {
  const epigrafe = document.getElementById('cartaEpigrafe');
  epigrafe.textContent = carta.epigrafe;
  epigrafe.hidden = !carta.epigrafe;
  document.getElementById('cartaTitulo').textContent = carta.titulo;
  const firma = document.getElementById('cartaFirma');
  firma.textContent = carta.firma;
  firma.hidden = !carta.firma;
  document.getElementById('cartaCuerpo').replaceChildren(...carta.parrafos.map((texto) => {
    const p = document.createElement('p');
    p.textContent = texto;
    return p;
  }));
};

let focoAntesDeLaCarta = null;
let cerrandoCarta = null;
const abrirCarta = (carta = CARTA) => {
  if (!elCarta) return;
  clearTimeout(cerrandoCarta);
  escribirCarta(carta);
  focoAntesDeLaCarta = document.activeElement;
  elCarta.hidden = false;
  elCartaPapel.scrollTop = 0;
  void elCarta.offsetWidth; // para que la transicion arranque desde oculta
  elCarta.classList.add('is-on');
  elCartaCerrar.focus({ preventScroll: true });
};
const cerrarCarta = () => {
  if (!elCarta || elCarta.hidden) return;
  elCarta.classList.remove('is-on');
  cerrandoCarta = setTimeout(() => { elCarta.hidden = true; }, reducido ? 0 : 700);
  if (focoAntesDeLaCarta && focoAntesDeLaCarta.focus) focoAntesDeLaCarta.focus({ preventScroll: true });
};

if (elCarta) {
  elCartaCerrar.addEventListener('click', cerrarCarta);
  // tocar fuera del papel tambien la cierra
  elCarta.addEventListener('click', (e) => { if (e.target === elCarta) cerrarCarta(); });
  document.addEventListener('keydown', (e) => {
    if (elCarta.hidden) return;
    if (e.key === 'Escape') cerrarCarta();
    // con el tabulador el foco se queda dentro de la carta: el papel (para
    // bajar con las flechas) y el boton de cerrar
    if (e.key === 'Tab') {
      e.preventDefault();
      (document.activeElement === elCartaCerrar ? elCartaPapel : elCartaCerrar).focus({ preventScroll: true });
    }
  });
}
if (elNota) {
  elNota.addEventListener('click', () => { if (elNota.classList.contains('is-tocable')) abrirCarta(); });
  elNota.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && elNota.classList.contains('is-tocable')) {
      e.preventDefault();
      abrirCarta();
    }
  });
}
if (elLeerCarta) elLeerCarta.addEventListener('click', () => abrirCarta(CARTA));
if (elCartaMuerte) elCartaMuerte.addEventListener('click', () => abrirCarta(CARTA_MUERTE));
if (elCartaIncompleta) elCartaIncompleta.addEventListener('click', () => abrirCarta(CARTA_INCOMPLETA));

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
  if (trae(texto, MOMENTOS.mesesPasan)) pasarMeses();
  if (trae(texto, MOMENTOS.petaloTulipan)) setTimeout(caerPetaloTulipan, 600);
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
  pararMeses();
  devolverPetaloTulipan();
  marchitarPrado();
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
    [elLeerCarta, elCartaMuerte, elCartaIncompleta, elVerVideo, elVerFloristeria, elRepetir].forEach((boton) => {
      if (!boton) return;
      boton.classList.remove('is-on');
      boton.tabIndex = -1;
    });
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
