export const techniques = [
 {id:'gentle',name:'Gentle breathing',category:'Begin',description:'An unhurried rhythm without breath holds.',phases:[4,0,6,0],labels:['Breathe in','','Breathe out',''],tag:'No holds',available:true},
 {id:'box',name:'Box breathing',category:'Focus',description:'Four equal phases, one clear rhythm.',phases:[4,4,4,4],labels:['Breathe in','Hold gently','Breathe out','Rest gently'],tag:'4 · 4 · 4 · 4',available:true},
 {id:'equal',name:'Equal breathing',category:'Balance',description:'Equal time for the inhale and the exhale.',phases:[5,0,5,0],labels:['Breathe in','','Breathe out',''],tag:'No holds',available:true},
 {id:'extended',name:'Longer exhale',category:'Unwind',description:'A slower outward breath, at your own pace.',phases:[4,0,8,0],labels:['Breathe in','','Breathe out',''],tag:'4 · 8',available:true},
 {id:'478',name:'4–7–8 breathing',category:'Learn',description:'A longer-hold pattern. Read the guidance first.',phases:[4,7,8,0],labels:['Breathe in','Hold gently','Breathe out',''],tag:'Content review pending',available:false},
 {id:'nadi',name:'Nadi Shodhana',category:'Learn',description:'An introduction to alternate-nostril breathing.',phases:[4,0,4,0],labels:['Breathe in','','Breathe out',''],tag:'Content review pending',available:false},
 {id:'bhramari',name:'Bhramari',category:'Learn',description:'An introduction to gentle humming breath.',phases:[4,0,6,0],labels:['Breathe in','','Hum out',''],tag:'Content review pending',available:false},
 {id:'dirga',name:'Dirga breathing',category:'Learn',description:'An introduction to three-part breathing.',phases:[5,0,5,0],labels:['Breathe in','','Breathe out',''],tag:'Content review pending',available:false},
];
export function phaseAt(elapsed, phases=[4,4,4,4]) {
 const total=phases.reduce((a,b)=>a+b,0)*1000;
 if(!Number.isFinite(total)||total<=0||phases.some(v=>!Number.isFinite(v)||v<0))throw new Error('Invalid breathing pattern');
 const time=((Math.max(0,elapsed)%total)+total)%total;let start=0;
 for(let i=0;i<phases.length;i++){const length=phases[i]*1000;if(length>0&&time<start+length){const t=(time-start)/length;const eased=(1-Math.cos(Math.PI*t))/2;return {index:i,fraction:t,remaining:Math.ceil((length-(time-start))/1000),scale:i===0?.78+.22*eased:i===1?1:i===2?1-.22*eased:.78,cycleFraction:time/total};}start+=length;}
 throw new Error('Invalid phase');
}
export function advanceSession(elapsed,delta,duration){return Math.min(duration,Math.max(0,elapsed+Math.max(0,delta)));}
export function canReportCohort(count,minimum=20){return Number.isInteger(count)&&count>=minimum;}
