import {agents,simulateRoute} from './routing.js';

const translations={
pap:{
title:'Un boske digital ku raiz den nos pueblo',desc:'Un demonstrashon supervisá di sinku ruta di AI pa siñamentu, trabou, negoshi i komunidat. Kultura promé. Hende na mando.',
agentEyebrow:'SINKU RUTA DI PILOT',agents:'Skohe un ruta',agentNote:'E router ta selektá e ruta segun e pregunta. E demo no ta agregá agents nobo.',
demoEyebrow:'INTERAKSHON SUPERVISÁ',demo:'Demostrashon interaktivo',disclosure:'Modo demo: no ta manda dato na backend. Konekshon live ta visibel solamente ora Cloudflare Worker a wordu verificá.',
prompts:'TRATA UN PROMPT',placeholder:'Skirbi bo pregunta aki…',send:'Manda ↗',privacy:'No inkluí nòmber, number di telefòn ni dato sensitiv.',clear:'Limpia',briefEyebrow:'PA E REUNION',brief:'E piloto den korto',briefLead:'Un prueba chikí, medibel i ku supervisión humano.',
phaseA:'Privacidat, prompts i test',phaseB:'Taller i feedback supervisá',phaseC:'Mehora e sinku pilot agents',
measureHead:'KIKO NOS TA MIDI',measureA:'◉ Klaridat di orientashon',measureB:'◇ Participashon den taller',measureC:'◌ Feedback i caso di seguridat',
independent:'Inisiativa independiente · No ta un servisio ofisial di gobierno ni un sistema implementá.',welcome:'Bon bini na Digital Kòrsou. Skohe un ehèmpel òf skirbi un pregunta. E ruta lo wordu mustrá, i un simulashon no ta un kontesta AI real.',modeSim:'● SIMULASHON',modeLive:'● WORKER LIVE',liveOn:'Usa Worker',liveOff:'Usa simulashon',you:'BO',reply:'Simulashon di routing: e pregunta aki ta bai pa {agent}.\n\nE baseline ta klasifiká tema; e no ta duna asistensia AI real den modo simulashon. Nos ta valida e ruta, idioma i privasidat durante e pilot.',error:'Konekshon no a logra. Bira bèk na simulashon.',suggestOther:'Mi ta buska trabou i mester un CV.'
},
en:{
title:'A digital forest rooted in our community',desc:'A supervised five-route AI demonstration for learning, work, small business and community support. Culture first. People in control.',
agentEyebrow:'FIVE PILOT ROUTES',agents:'Choose a route',agentNote:'The router selects an agent based on the question. No additional agents are introduced.',
demoEyebrow:'SUPERVISED INTERACTION',demo:'Interactive demonstration',disclosure:'Simulation does not send chat data to the backend. A verified Cloudflare Worker connection is labeled separately.',
prompts:'TRY A PROMPT',placeholder:'Ask a question here…',send:'Send ↗',privacy:'Do not include names, phone numbers or sensitive information.',clear:'Clear',briefEyebrow:'FOR THE MEETING',brief:'The pilot at a glance',briefLead:'A small, measurable test with human oversight.',
phaseA:'Privacy, prompts and testing',phaseB:'Workshop and supervised feedback',phaseC:'Improve the same five agents',
measureHead:'WHAT WE MEASURE',measureA:'◉ Routing clarity',measureB:'◇ Workshop participation',measureC:'◌ Feedback and safety cases',
independent:'Independent initiative · Not a government service or approved public AI system.',welcome:'Welcome to Digital Kòrsou. Select an example or write a question. You will see the route; simulation is not a real AI answer.',modeSim:'● SIMULATED',modeLive:'● WORKER LIVE',liveOn:'Use Worker',liveOff:'Use simulation',you:'YOU',reply:'Routing simulation: this question would be directed to {agent}.\n\nThis baseline classifies topics but does not deliver an AI-generated answer in simulation mode. Routing, language clarity and privacy require supervised pilot review.',error:'The Worker did not respond. Returning to simulation.',suggestOther:'Help me write a CV for a job.'
},
nl:{
title:'Een digitaal bos, geworteld in onze gemeenschap',desc:'Een begeleide AI-demonstratie met vijf routes voor onderwijs, werk, kleine bedrijven en de gemeenschap. Cultuur voorop. Mensen houden de regie.',
agentEyebrow:'VIJF PILOTROUTES',agents:'Kies een route',agentNote:'De router kiest op basis van de vraag. Er worden geen nieuwe agenten toegevoegd.',
demoEyebrow:'BEGELEIDE INTERACTIE',demo:'Interactieve demonstratie',disclosure:'De simulatie verstuurt geen chatgegevens. Een live Cloudflare Worker wordt pas getoond na verificatie.',
prompts:'PROBEER EEN VOORBEELD',placeholder:'Stel je vraag hier…',send:'Verstuur ↗',privacy:'Vermeld geen namen, telefoonnummers of gevoelige gegevens.',clear:'Wissen',briefEyebrow:'VOOR HET GESPREK',brief:'De pilot kort uitgelegd',briefLead:'Een kleine, meetbare proef onder menselijk toezicht.',
phaseA:'Privacy, prompts en tests',phaseB:'Workshop en begeleide feedback',phaseC:'Verbeter de bestaande vijf agenten',
measureHead:'WAT WE METEN',measureA:'◉ Duidelijkheid van routering',measureB:'◇ Deelname aan workshops',measureC:'◌ Feedback en veiligheidsgevallen',
independent:'Onafhankelijk initiatief · Geen overheidsdienst of goedgekeurd publiek AI-systeem.',welcome:'Welkom bij Digital Kòrsou. Kies een voorbeeld of stel een vraag. De simulatie is geen echt AI-antwoord.',modeSim:'● SIMULATIE',modeLive:'● WORKER LIVE',liveOn:'Gebruik Worker',liveOff:'Gebruik simulatie',you:'JIJ',reply:'Routeringssimulatie: deze vraag wordt doorgestuurd naar {agent}.\n\nDeze basis herkent onderwerpen maar geeft in de simulatiemodus geen echt AI-antwoord. Routering, taal en privacy worden begeleid getest.',error:'De Worker reageert niet. Terug naar de simulatie.',suggestOther:'Help mij met een cv voor werk.'
}
};
const $=id=>document.getElementById(id);
const state={lang:'pap',selected:'arrival-gpt',available:false,live:false,busy:false};
const tr=(key)=>translations[state.lang][key];
function item(text,role,label){
 const wrapper=document.createElement('div');wrapper.className='message '+role;
 const heading=document.createElement('div');heading.className='message-label';heading.textContent=label;
 const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=text;
 wrapper.append(heading,bubble);$('transcript').append(wrapper);$('transcript').scrollTop=$('transcript').scrollHeight;
}
function reset(){ $('transcript').replaceChildren();item(tr('welcome'),'assistant','DIGITAL KÒRSOU');}
function renderAgents(){
 const region=$('agents');region.replaceChildren();
 for(const a of agents){
  const btn=document.createElement('button');btn.type='button';btn.className='agent';btn.setAttribute('aria-pressed',String(a.id===state.selected));
  const symbol=document.createElement('span');symbol.className='symbol';symbol.textContent=a.symbol;symbol.setAttribute('aria-hidden','true');
  const text=document.createElement('span');const name=document.createElement('strong');name.textContent=a.name;
  const sub=document.createElement('small');sub.textContent=a[state.lang];text.append(name,sub);btn.append(symbol,text);
  btn.addEventListener('click',()=>{state.selected=a.id;$('message').value=a.example;renderAgents();renderSuggestions();$('message').focus()});region.append(btn);
 }
}
function renderSuggestions(){
 const active=agents.find(a=>a.id===state.selected)??agents[0];const region=$('suggestions');region.replaceChildren();
 for(const suggestion of [active.example,tr('suggestOther')]){
  const btn=document.createElement('button');btn.type='button';btn.className='suggestion';btn.textContent=suggestion;
  btn.addEventListener('click',()=>{$('message').value=suggestion;$('message').focus()});region.append(btn);
 }
}
function renderMode(){
 $('mode').textContent=state.live?tr('modeLive'):tr('modeSim');$('mode').classList.toggle('live',state.live);
 $('toggle').hidden=!state.available;$('toggle').textContent=state.live?tr('liveOff'):tr('liveOn');
}
function changeLanguage(language){
 if(!translations[language])return;state.lang=language;document.documentElement.lang=language;
 const assign={ 'hero-desc':'desc','agents-eyebrow':'agentEyebrow','agents-title':'agents','agent-note':'agentNote','demo-eyebrow':'demoEyebrow','demo-title':'demo','disclosure':'disclosure','prompt-label':'prompts','privacy':'privacy','clear':'clear','brief-eyebrow':'briefEyebrow','brief-title':'brief','brief-lead':'briefLead','phase-a':'phaseA','phase-b':'phaseB','phase-c':'phaseC','measure-head':'measureHead','measure-a':'measureA','measure-b':'measureB','measure-c':'measureC','independent':'independent'};
 for(const [id,key] of Object.entries(assign))$(id).textContent=tr(key);
 $('hero-title').replaceChildren(document.createTextNode(tr('title')));const dot=document.createElement('span');dot.textContent='.';$('hero-title').append(dot);
 $('message').placeholder=tr('placeholder');$('send').textContent=tr('send');
 document.querySelectorAll('[data-lang]').forEach(btn=>{const active=btn.dataset.lang===language;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
 renderAgents();renderSuggestions();renderMode();reset();
}
async function submit(event){
 event.preventDefault();if(state.busy)return;const message=$('message').value.trim();if(!message)return;
 state.busy=true;$('send').disabled=true;item(message,'user',tr('you'));$('message').value='';
 try{
  if(!state.live){
   const selected=simulateRoute(message);state.selected=selected.id;renderAgents();renderSuggestions();
   item(tr('reply').replace('{agent}',selected.name),'assistant',tr('modeSim'));
  }else{
   const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,language:state.lang}),cache:'no-store'});
   const result=await response.json();
   if(!response.ok || typeof result.response!=='string'||!result.agent?.name||!['local','openai','fallback'].includes(result.mode))throw Error('Worker failed');
   state.selected=result.agent.id;renderAgents();renderSuggestions();item(result.response,'assistant',result.agent.name+' · '+result.mode.toUpperCase());
  }
 }catch{state.live=false;renderMode();item(tr('error'),'assistant','DIGITAL KÒRSOU');}
 finally{state.busy=false;$('send').disabled=false;}
}
async function verifyWorker(){
 try{
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),6000);
  const response=await fetch('/api/status',{cache:'no-store',signal:controller.signal});clearTimeout(timeout);
  if(!response.ok)return;const data=await response.json();state.available=data.available===true;renderMode();
 }catch{state.available=false;renderMode();}
}
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>changeLanguage(btn.dataset.lang)));
$('chat').addEventListener('submit',submit);$('clear').addEventListener('click',reset);
$('toggle').addEventListener('click',()=>{state.live=!state.live;renderMode();reset()});
$('message').addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();$('chat').requestSubmit();}});
changeLanguage('pap');verifyWorker();
