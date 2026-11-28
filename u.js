/* Cargador fijo: siempre usa la última versión de nexa-vista (no hay que cambiar nunca esta línea) */
(function(){var R='adriangovquev-design/nexa-vista',FB='e893095a51',Q=[];window.NXU=function(){Q.push(arguments)};
function ok(s){return /^[0-9a-f]{7,40}$/.test(s)}
function go(sha){var e=document.createElement('script');e.src='https://cdn.jsdelivr.net/gh/'+R+'@'+sha+'/cargar.js';e.onload=function(){Q.forEach(function(a){window.NXL.apply(null,a)});window.NXU=function(){window.NXL.apply(null,arguments)}};e.onerror=function(){if(sha!==FB)go(FB)};document.head.appendChild(e)}
function f(u,p){return fetch(u,{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var s=p(t);if(!ok(s))throw 0;return s})}
function race(){return new Promise(function(res,rej){var n=0,L=[
f('https://raw.githubusercontent.com/'+R+'/main/ultima.txt?'+Date.now(),function(t){return t.trim().slice(0,10)}),
f('https://api.github.com/repos/'+R+'/commits/main',function(t){return JSON.parse(t).sha.slice(0,10)})];
L.forEach(function(p){p.then(res,function(){if(++n===L.length)rej()})})})}
Promise.race([race(),new Promise(function(_,j){setTimeout(j,4000)})]).catch(function(){return FB}).then(go)})();
