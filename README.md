# Dia de la Flor Morada

Una sola escena: el balcon cubierto de un piso, de noche sobre la ciudad, con la
silueta sentada y los mensajes que van apareciendo. Abre `index.html` con doble clic.

```
index.html            la escena (SVG dibujado a mano)
assets/css/escena.css estilos y animaciones
assets/js/escena.js   mensajes + ciudad, estrellas, luces, flores, luciernagas
```

## Que tocar

| Quieres cambiar... | Donde |
|---|---|
| Los mensajes | `assets/js/escena.js` -> `MENSAJES` |
| Cuanto dura cada mensaje y la pausa entre ellos | `assets/js/escena.js` -> `ESCENA` (la duracion se calcula segun lo largo que sea el texto) |
| Numero de estrellas, luciernagas y farolas | `assets/js/escena.js` -> `ESCENA` |
| Las capas de la ciudad (altura, ancho, ventanas, color) | `assets/js/escena.js` -> `CAPAS` (`ciudadLejos`, `ciudadMedia`, `ciudadCerca`) |
| El tamano del balcon (suelo, muros, techo, barandilla) | `index.html` -> seccion `3. EL BALCON` |
| Donde cae el texto dentro del hueco | `assets/js/escena.js` -> `ANCLA_MENSAJES` |
| Tamano y posicion del texto | `assets/css/escena.css` -> `.mensajes`, `.mensajes__texto` |
| Que parte de la escena se ve siempre | `assets/js/escena.js` -> `ENCUADRE` (el viewBox se recalcula segun la pantalla) |
| Colores del cielo, la luna, el ramo | `index.html` -> bloque `<defs>` y los grupos del SVG |
| El cenicero, el cigarro y el humo | `index.html` -> grupo `Cenicero`; animaciones `.brasa` y `.humo` en `escena.css` |
