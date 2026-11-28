# nexa-vista (contenido del repo PÚBLICO adriangovquev-design/nexa-vista)
Solo el programa de la vista de fichas (vista.js) y las frases genéricas de los consejos (plantillas.js, sin números ni nicks).
NINGÚN dato de jugadores: los datos van dentro de cada vista, en el chat.
Se sirve con jsDelivr: https://cdn.jsdelivr.net/gh/adriangovquev-design/nexa-vista@<commit>/vista.js
Regenerar: `python3 construir_plantillas.py mesa_widget.py` → plantillas.json; `python3 mesa_widget.py --vista-js > vista.js`;
`echo "window.NXT=$(cat plantillas.json);" > plantillas.js`. Tras subirlos, poner el commit en NX_SHA (mesa_widget.py, CDN_SHA).
Uso: `NX_SHA=<commit> python3 mesa_widget.py --cdn <stake> nicks…` → pegar en la vista del chat (unos 12 KB en vez de 27 KB).
