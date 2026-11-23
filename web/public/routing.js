// Transparent browser-side routing simulation; matches the existing Worker keyword intents.
// It is not a live AI model and never sends messages anywhere in simulation mode.
export const agents = [
 {id:'arrival-gpt',intent:'arrival',name:'Universal Arrival GPT',symbol:'✳',pap:'Orientashon',en:'Welcome & routing',nl:'Welkom & doorverwijzing',example:'Bon dia, mi no sa kua tipo di yudansa mi mester. Bo por guia mi?'},
 {id:'edu-gpt',intent:'education',name:'EduGPT · Kenepa',symbol:'✦',pap:'Edukashon',en:'Learning',nl:'Onderwijs',example:'Splika un tarea di matematika di skol na Papiamentu.'},
 {id:'toolmaker-gpt',intent:'toolmaking',name:'ToolMakerGPT · Kadushi',symbol:'⚒',pap:'Negoshi i tools',en:'Practical tools',nl:'Praktische tools',example:'Yudami traha un checklist pa un negoshi chikí.'},
 {id:'job-gpt',intent:'jobs',name:'JobGPT · Apeldam',symbol:'✎',pap:'Trabou i CV',en:'Jobs & careers',nl:'Werk & loopbaan',example:'Mi ta buska trabou; yudami ku un CV i entrevista.'},
 {id:'community-gpt',intent:'community',name:'CommunityGPT · Pueblo',symbol:'◎',pap:'Bario i komunidat',en:'Community',nl:'Gemeenschap',example:'Kon nos komunidat di bario por organisá un taller?'}
];
const keywords={
 education:['school','skol','homework','tarea','study','studia','teacher','maestro','student','lesson','math','matematika'],
 toolmaking:['tool','template','form','checklist','workflow','automate','build','make','traha un','document'],
 jobs:['job','jobs','work','trabou','career','cv','resume','interview','solicit','baan'],
 community:['community','komunidat','neighborhood','bario','family','familia','support','subsidy','social','help center']
};
export function simulateRoute(message) {
 const normalized=String(message).toLowerCase();
 const ranked=Object.keys(keywords).map(intent=>({intent,score:keywords[intent].filter(word=>normalized.includes(word)).length})).sort((a,b)=>b.score-a.score);
 const intent=ranked[0]?.score>0?ranked[0].intent:'arrival';
 return agents.find(agent=>agent.intent===intent)??agents[0];
}
