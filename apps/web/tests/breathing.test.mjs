import test from 'node:test';
import assert from 'node:assert/strict';
import {phaseAt,advanceSession,canReportCohort,techniques} from '../../../packages/design-system/breathing.mjs';
import {readFileSync} from 'node:fs';
test('box phase boundaries follow the 16 second cycle',()=>{for(const [ms,index] of [[0,0],[3999,0],[4000,1],[8000,2],[12000,3],[16000,0]])assert.equal(phaseAt(ms,[4,4,4,4]).index,index)});
test('holds keep sphere size fixed',()=>{assert.equal(phaseAt(4000).scale,1);assert.equal(phaseAt(7999).scale,1);assert.equal(phaseAt(12000).scale,.78);assert.equal(phaseAt(15999).scale,.78)});
test('zero-length hold phases are skipped',()=>{assert.equal(phaseAt(4000,[4,0,6,0]).index,2);assert.equal(phaseAt(10000,[4,0,6,0]).index,0)});
test('every catalogue pattern remains finite and bounded',()=>{for(const t of techniques)for(let ms=0;ms<60000;ms+=137){const p=phaseAt(ms,t.phases);assert.ok(p.scale>=.78&&p.scale<=1);assert.ok(p.remaining>=1);assert.ok(Number.isFinite(p.cycleFraction))}});
test('invalid patterns fail explicitly',()=>{for(const p of [[0,0,0,0],[-1,4,4,4],[NaN,4,4,4]])assert.throws(()=>phaseAt(0,p))});
test('session clock clamps at 3, 7 and 11 minute completion',()=>{for(const m of [3,7,11])assert.equal(advanceSession(m*60000-10,100,m*60000),m*60000)});
test('cohort reporting suppresses below the threshold',()=>{assert.equal(canReportCohort(19),false);assert.equal(canReportCohort(20),true);assert.equal(canReportCohort(20.5),false);assert.equal(canReportCohort(-1),false)});
test('essential theme text meets WCAG AA normal text contrast',()=>{
 const t=JSON.parse(readFileSync(new URL('../../../packages/design-system/tokens.json',import.meta.url)));
 const lum=h=>{const v=h.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
 const contrast=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
 for(const mode of ['dark','light'])for(const text of ['text','secondaryText','accent'])for(const bg of ['background','surface'])assert.ok(contrast(t[mode][text],t[mode][bg])>=4.5,`${mode} ${text}/${bg}`);
});
