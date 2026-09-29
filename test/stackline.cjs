const assert=require('assert');
const path=require('path');
const cp=require('child_process');
const root=process.env.STACKLINE_TEST_PACKAGE || path.resolve(__dirname,'..');
const target=path.join(root,'dist/cjs/index.js');
function child(body){const r=cp.spawnSync(process.execPath,['-e',`const {onExit,load,unload}=require(${JSON.stringify(target)});${body}`],{encoding:'utf8',timeout:7000});if(r.error)throw r.error;return r;}
let r=child(`onExit((code,signal)=>console.log(JSON.stringify([code,signal])));`);assert.strictEqual(r.status,0);assert.strictEqual(r.stdout.trim(),'[0,null]');
r=child(`onExit((code)=>console.log(code));process.exit(7)`);assert.strictEqual(r.status,7);assert.strictEqual(r.stdout.trim(),'7');
r=child(`onExit((code)=>console.log(typeof code+':'+code));process.exitCode='3'`);assert.strictEqual(r.status,3);assert.strictEqual(r.stdout.trim(),'number:3');
r=child(`const cleanup=onExit(()=>{console.log('A');cleanup()});onExit(()=>console.log('B'));onExit(()=>console.log('last'),{alwaysLast:true})`);assert.strictEqual(r.status,0);assert.strictEqual(r.stdout.trim(),'A\nB\nlast');
r=child(`const remove=onExit(()=>console.log('removed'));remove();remove();onExit(()=>console.log('kept'))`);assert.strictEqual(r.stdout.trim(),'kept');
r=child(`load();load();unload();unload();onExit(()=>console.log('once'))`);assert.strictEqual(r.stdout.trim(),'once');
if(process.platform!=='win32'){
 r=child(`setInterval(()=>{},1000);onExit((c,s)=>console.log(c+':'+s));setTimeout(()=>process.kill(process.pid,'SIGTERM'),20)`);assert.strictEqual(r.signal,'SIGTERM');assert.strictEqual(r.stdout.trim(),'null:SIGTERM');
 r=child(`const hold=setInterval(()=>{},1000);onExit((c,s)=>{console.log(s);clearInterval(hold);return true});setTimeout(()=>process.kill(process.pid,'SIGTERM'),20)`);assert.strictEqual(r.status,0);assert.strictEqual(r.stdout.trim(),'SIGTERM');
}
const browser=require(path.join(root,'dist/cjs/browser.js'));assert.strictEqual(typeof browser.onExit(()=>{}),'function');browser.load();browser.unload();
(async()=>{const esm=await import(require('url').pathToFileURL(path.join(root,'dist/mjs/index.js')).href);assert.strictEqual(typeof esm.onExit,'function');const cleanup=esm.onExit(()=>{});cleanup();assert(Array.isArray(esm.signals));console.log('CJS/ESM/browser exports, lifecycle, exit status, listener cleanup and actual signal subprocess tests passed.');})().catch(e=>{console.error(e);process.exitCode=1});
