import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const dir='docs',base='/Boda-Nuria-y-Jonatan-/';
fs.writeFileSync(path.join(dir,'.nojekyll'),'');
fs.copyFileSync(path.join(dir,'index.html'),path.join(dir,'404.html'));
const files=fs.readdirSync(dir,{recursive:true}).filter(f=>fs.statSync(path.join(dir,f)).isFile()&&f!=='sw.js').map(f=>base+f.replaceAll('\\','/'));
const hash=crypto.createHash('sha256');for(const f of files)hash.update(fs.readFileSync(path.join(dir,f.slice(base.length))));
const name='boda-nuria-jonatan-'+hash.digest('hex').slice(0,12);
fs.writeFileSync(path.join(dir,'sw.js'),`const CACHE='${name}',BASE='${base}',FILES=${JSON.stringify(files)};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('boda-nuria-jonatan-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(BASE))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match(BASE+'index.html')));return;}
 if(FILES.includes(u.pathname))e.respondWith(caches.open(CACHE).then(async c=>(await c.match(u.pathname))||fetch(e.request)));
});`);
console.log('Static public trial prepared:',files.length,'files. No API, no administration, no responses.');
