/* utils.js - funzioni di utilità e storage */
const Utils = (function(){
function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
return array;
}


function sleep(ms){return new Promise(res=>setTimeout(res,ms));}


function formatTime(seconds){
const m=Math.floor(seconds/60).toString().padStart(2,'0');
const s=(seconds%60).toString().padStart(2,'0');
return `${m}:${s}`;
}


function createPairs(symbolsCount){
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
const pool = alphabet.split('');
const chosen = [];
while(chosen.length<symbolsCount){
const c = pool[Math.floor(Math.random()*pool.length)];
if(!chosen.includes(c)) chosen.push(c);
}
const pairs = [...chosen, ...chosen];
return shuffle(pairs);
}


function save(key, value){
try{localStorage.setItem(key, JSON.stringify(value));}catch(e){console.warn('Storage error',e)}
}
function load(key, fallback=null){
try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch(e){return fallback}
}


return {shuffle, sleep, formatTime, createPairs, save, load};
})();