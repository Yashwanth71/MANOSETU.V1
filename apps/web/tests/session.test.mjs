import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceSession,breathingPhase} from '../src/session.mjs';
test('clock clamps at completion and ignores negative deltas',()=>{
 assert.equal(advanceSession(179900,500,180000),180000);
 assert.equal(advanceSession(500,-100,180000),500);
});
test('breathing phases cross boundaries without a holding phase',()=>{
 assert.equal(breathingPhase(0).label,'Breathe in gently');
 assert.equal(breathingPhase(4000).label,'Breathe out gently');
 assert.equal(breathingPhase(10000).label,'Breathe in gently');
 for(let t=0;t<=60000;t+=100)assert.ok(breathingPhase(t).scale>=.82&&breathingPhase(t).scale<=1);
});
