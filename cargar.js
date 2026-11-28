(function(){
var S=document.currentScript&&document.currentScript.src||'';var BASE=S.replace(/cargar\.js.*$/,'');var NB=512;var TB=Math.floor(Date.now()/6e5);
function fnv(s){var h=2166136261,b=new TextEncoder().encode(s);for(var i=0;i<b.length;i++){h^=b[i];h=Math.imul(h,16777619)>>>0}return h%NB}
function L(s){return new Promise(function(r,j){var e=document.createElement('script');e.src=s;e.onload=r;e.onerror=j;document.head.appendChild(e)})}
async function dec(k,url){var r=await fetch(url);if(!r.ok)throw new Error('No carga '+url);var b=new Uint8Array(await r.arrayBuffer());
var p=await crypto.subtle.decrypt({name:'AES-GCM',iv:b.slice(0,12)},k,b.slice(12));
return JSON.parse(await new Response(new Blob([p]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text())}
function buscar(n,ns,set){if(set.has(n))return n;var lo=n.toLowerCase();for(var i=0;i<ns.length;i++)if(ns[i].toLowerCase()===lo)return ns[i];
var nk=n.replace(/[.…]+$/,'');var c;if(nk.length>=2){c=ns.filter(function(x){return x.startsWith(nk)});if(c.length===1)return c[0];
c=ns.filter(function(x){return x.toLowerCase().startsWith(nk.toLowerCase())});if(c.length===1)return c[0]}
if(n.length>=3){c=ns.filter(function(x){if(x.length!==n.length)return false;var d=0;for(var i=0;i<x.length;i++)if(x[i]!==n[i])d++;return d===1});if(c.length===1)return c[0]}return null}
var esc=function(t){return String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')};
window.NXL=async function(K,stake,mesas){var el=document.getElementById('nxw');try{
if(typeof mesas[0]==='string')mesas=[['',mesas]];mesas=mesas.map(function(m){return[m[0],m[1],m[2]||stake,m[3]||'']});var SB=function(x){return parseFloat(String(x).split('-')[0])||0};mesas.sort(function(a,b){return SB(b[2])-SB(a[2])});
var key=await crypto.subtle.importKey('raw',Uint8Array.from(atob(K),function(c){return c.charCodeAt(0)}),'AES-GCM',false,['decrypt']);
var vj=L(BASE+'plantillas.js?t='+TB).then(function(){return L(BASE+'vista.js?t='+TB)});
var ns=await dec(key,BASE+'d/i.bin?t='+TB),set=new Set(ns);var res={},cub={};
mesas.forEach(function(m){m[1].forEach(function(p){var n=buscar(p,ns,set);res[p]=n;if(n)cub[fnv(n)]=1})});
var cs=await Promise.all(Object.keys(cub).map(function(j){return dec(key,BASE+'d/'+('00'+j).slice(-3)+'.bin?t='+TB)}));var R={};cs.forEach(function(c){Object.assign(R,c)});
var sub={},av={},lab={},notas=[];
var KM={};mesas.forEach(function(m,mi){var stake=m[2];m[1].forEach(function(p){var n=res[p];if(!n)return;var r=R[n];if(!r){return}var ks=Object.keys(r.s);
var s=r.s[stake]?stake:ks.find(function(k){return k.indexOf(stake+'-')===0})||ks.reduce(function(a,b){return r.s[b].h[0]>r.s[a].h[0]?b:a});var key=n;if(sub[n]&&sub[n]._st!==s)key=n+' ('+s+')';KM[mi+'|'+p]=key;if(sub[key])return;
var P={};for(var k in r)if(k!=='s'&&k!=='pl'&&k!=='sz'&&k!=='av')P[k]=r[k];P.s={};P.s[s]=r.s[s];P.plan=r.pl[s];P.sz=r.sz[s]||[];
P._st=s;P._all=r.s;P._pl=r.pl;P._sz=r.sz;P._main=ks.reduce(function(a,b){return r.s[b].h[0]>r.s[a].h[0]?b:a});sub[key]=P;if(r.av)av[key]=r.av;lab[key]=n+(s.indexOf(stake)===0?'':' · '+s);if(n!==p&&notas.indexOf(p+' → '+n)<0)notas.push(p+' → '+n)})});
var ord=function(a,b){var A=sub[a],B=sub[b];var f=(B.fish?1:0)-(A.fish?1:0);if(f)return f;var x=Object.values(A.s)[0].h[1]||0,y=Object.values(B.s)[0].h[1]||0;return x-y};
var h='<div class="nx"><h2 class="sr">Fichas '+esc(stake)+'</h2><div id="nxmesa" style="display:none"></div>'+(notas.length?'<div class="mt" style="margin-bottom:6px">Nick corregido: '+esc(notas.join('; '))+'</div>':'');var first='';
mesas.forEach(function(m,mi){var con=[],sin=[];m[1].forEach(function(p){var n=KM[mi+'|'+p];if(n&&sub[n]){if(con.indexOf(n)<0)con.push(n)}else sin.push(p)});con.sort(ord);if(!first&&con.length)first=con[0];
if(m[0])h+='<div style="font-weight:500;font-size:14px;margin:10px 0 4px">Mesa '+esc(m[0])+(m[3]?' · '+esc(m[3]):'')+'</div>';
h+='<div class="pills">'+con.map(function(n){return'<button data-n="'+esc(n)+'">'+esc(lab[n])+'</button>'}).join('')+'</div>';
if(sin.length)h+='<div class="mt" style="margin:0 0 4px">Sin ficha: '+esc(sin.join(', '))+'</div>'});
h+='<div id="nxout"></div></div>';await vj;NX({h:h,d:{p:sub,av:av},f:first})}catch(e){el.textContent='Error fichas: '+e.message}};
})();
