import React, { useEffect, useRef, useState } from "react";
import { Linkedin, ArrowDownRight, X, RotateCw, Play, Pause, Leaf, Gamepad2, BookOpen, Film, Mic2, Code2, LineChart } from "lucide-react";
import sescomp from "./assets/sescomp-2025.jpg";
import { copy } from "./i18n";
import { FlagBR, FlagUS } from "./Flags";

const LINKEDIN="https://www.linkedin.com/in/mxxcapelo";

const SHAPES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
const COLORS=["#7dd3fc","#fde68a","#c4b5fd","#fdba74","#93c5fd","#86efac","#fda4af"];

// ---------- idioma ----------
const LANGS=["pt","en"];
const store={
 get(){try{return localStorage.getItem("lang")}catch{return null}},
 set(v){try{localStorage.setItem("lang",v)}catch{}}
};
const readLang=()=>{
 const q=new URLSearchParams(window.location.search).get("lang");
 if(LANGS.includes(q))return q;
 const s=store.get();
 return LANGS.includes(s)?s:"pt";
};

function LangSwitch({lang,setLang,tone="dark",className=""}){
 const shell=tone==="light"?"border-black/20 bg-black/[.07]":"border-white/20 bg-black/40 backdrop-blur-md";
 const on=tone==="light"?"bg-white ring-1 ring-black/40":"bg-white/20 ring-1 ring-lime-300";
 return <div className={`flex shrink-0 items-center gap-1 rounded-full border p-1 ${shell} ${className}`}>
  {[["pt",FlagBR,"Ver o site em português"],["en",FlagUS,"View this site in English"]].map(([code,Flag,label])=>
   <button key={code} type="button" onClick={()=>setLang(code)} title={label} aria-label={label} aria-pressed={lang===code}
    className={`rounded-full p-1 transition ${lang===code?on:"opacity-40 hover:opacity-90"}`}>
    <Flag className="h-3.5 w-5 rounded-[2px]"/>
   </button>)}
 </div>;
}

function Tetris({onClose,t}){
 const canvasRef=useRef(null), game=useRef(null);
 const [score,setScore]=useState(0); const [running,setRunning]=useState(true); const [over,setOver]=useState(false);
 // Espelho em ref: o loop de animação precisa ler o valor atual sem virar dependência do efeito.
 const runningRef=useRef(true), overRef=useRef(false);

 const setPause=v=>{const next=typeof v==="function"?v(runningRef.current):v; runningRef.current=next; setRunning(next)};
 const setGameOver=v=>{overRef.current=v; setOver(v)};

 const fresh=()=>({board:Array.from({length:20},()=>Array(10).fill(0)), piece:null, last:0});
 const collide=(g,dx,dy,s)=>s.some((r,y)=>r.some((v,x)=>v&&(g.piece.y+y+dy>=20||g.piece.x+x+dx<0||g.piece.x+x+dx>=10||g.board[g.piece.y+y+dy]?.[g.piece.x+x+dx])));
 const spawn=g=>{const id=Math.floor(Math.random()*SHAPES.length); g.piece={s:SHAPES[id],x:Math.floor((10-SHAPES[id][0].length)/2),y:0,c:COLORS[id]}; if(collide(g,0,0,g.piece.s)) setGameOver(true)};
 const merge=g=>g.piece.s.forEach((r,y)=>r.forEach((v,x)=>{if(v&&g.piece.y+y>=0)g.board[g.piece.y+y][g.piece.x+x]=g.piece.c}));
 const clear=g=>{let n=0;g.board=g.board.filter(r=>{if(r.every(Boolean)){n++;return false}return true});while(g.board.length<20)g.board.unshift(Array(10).fill(0));if(n)setScore(s=>s+[0,100,300,500,800][n])};
 const rotate=()=>{const g=game.current;if(!g?.piece||overRef.current)return;const s=g.piece.s[0].map((_,i)=>g.piece.s.map(r=>r[i]).reverse());if(!collide(g,0,0,s))g.piece.s=s;draw(g)};
 const move=dx=>{const g=game.current;if(!g?.piece||overRef.current)return;if(!collide(g,dx,0,g.piece.s))g.piece.x+=dx;draw(g)};
 const down=()=>{const g=game.current;if(!g?.piece||overRef.current)return;if(!collide(g,0,1,g.piece.s))g.piece.y++;else{merge(g);clear(g);spawn(g)};draw(g)};

 const draw=g=>{const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");ctx.fillStyle="#09090b";ctx.fillRect(0,0,300,600);const cell=(x,y,color)=>{ctx.fillStyle=color;ctx.fillRect(x*30+2,y*30+2,26,26)};g.board.forEach((r,y)=>r.forEach((v,x)=>v&&cell(x,y,v)));g.piece?.s.forEach((r,y)=>r.forEach((v,x)=>v&&cell(g.piece.x+x,g.piece.y+y,g.piece.c)))};

 const reset=()=>{game.current=fresh();setScore(0);setGameOver(false);setPause(true);spawn(game.current);draw(game.current)};

 // Efeito de MONTAGEM apenas. Se "running"/"over" fossem dependências,
 // pausar o jogo (espaço) rodaria reset() e apagaria o tabuleiro.
 useEffect(()=>{
  reset();
  let id;
  const loop=ts=>{
   const g=game.current;
   if(g&&runningRef.current&&!overRef.current){ if(ts-g.last>520){down();g.last=ts} }
   id=requestAnimationFrame(loop);
  };
  id=requestAnimationFrame(loop);
  const key=e=>{
   if(["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"," "].includes(e.key))e.preventDefault();
   if(e.key==="Escape")return onClose();
   if(e.key===" ")return setPause(v=>!v);
   if(!runningRef.current)return;
   if(e.key==="ArrowLeft")move(-1);
   if(e.key==="ArrowRight")move(1);
   if(e.key==="ArrowDown")down();
   if(e.key==="ArrowUp")rotate();
  };
  addEventListener("keydown",key);
  return()=>{cancelAnimationFrame(id);removeEventListener("keydown",key)};
 },[]);

 return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-xl"><div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-auto rounded-[2rem] border border-white/10 bg-zinc-950 p-5 text-white shadow-2xl md:flex-row md:gap-8 md:p-8"><button onClick={onClose} aria-label={t.fechar} className="absolute right-5 top-5 z-10 rounded-full border border-white/10 p-2 hover:bg-white/10"><X/></button><canvas ref={canvasRef} width="300" height="600" className="mx-auto h-[60vh] w-auto max-w-full rounded-xl border border-white/10 bg-black"/><div className="flex min-w-52 flex-col justify-center py-5"><p className="text-xs uppercase tracking-[.25em] text-lime-300">{t.label}</p><h2 className="mt-2 text-4xl font-black">Tetris</h2><p className="mt-3 text-zinc-400">{t.controles}</p><p className="mt-7 text-5xl font-black tabular-nums">{score}</p><p className="text-sm text-zinc-500">{t.pontos}</p>{over&&<p className="mt-5 font-bold text-rose-400">{t.fim}</p>}{!running&&!over&&<p className="mt-5 font-bold text-lime-300">{t.pausado}</p>}<div className="mt-6 flex gap-2"><button onClick={()=>setPause(v=>!v)} aria-label={running?t.pausar:t.continuar} className="rounded-full bg-white px-4 py-3 text-black">{running?<Pause size={18}/>:<Play size={18}/>}</button><button onClick={rotate} aria-label={t.girar} className="rounded-full border border-white/10 px-4 py-3"><RotateCw size={18}/></button><button onClick={reset} className="rounded-full border border-white/10 px-5 py-3 text-sm">{t.recomecar}</button></div><div className="mt-4 grid grid-cols-3 gap-2 md:hidden"><button onClick={()=>move(-1)} className="rounded-xl bg-white/10 p-3">←</button><button onClick={rotate} className="rounded-xl bg-white/10 p-3">↻</button><button onClick={()=>move(1)} className="rounded-xl bg-white/10 p-3">→</button><button onClick={down} className="col-span-3 rounded-xl bg-lime-300 p-3 font-bold text-black">{t.descer}</button></div></div></div></div>
}

export default function Portfolio(){
 const [game,setGame]=useState(false); const [menu,setMenu]=useState(false);
 const [lang,setLang]=useState(readLang);
 const t=copy[lang];

 // O idioma vira estado da URL (?lang=en) para o link em inglês ser compartilhável.
 useEffect(()=>{
  document.documentElement.lang=t.meta.htmlLang;
  document.title=t.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content",t.meta.desc);
  store.set(lang);
  const u=new URL(window.location.href);
  if(lang==="pt")u.searchParams.delete("lang"); else u.searchParams.set("lang",lang);
  window.history.replaceState({},"",u);
 },[lang,t]);

 return <main className="min-h-screen overflow-x-hidden bg-[#f1efe8] text-[#111] selection:bg-lime-300">
  <nav className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 md:px-10"><div className="flex items-center gap-4"><LangSwitch lang={lang} setLang={setLang}/><a href="#top" className="text-sm font-black tracking-tight text-white mix-blend-difference">MAXIMILIAN®</a></div><div className="flex items-center text-white mix-blend-difference"><div className="hidden gap-7 text-sm md:flex"><a href="#sobre">{t.nav.sobre}</a><a href="#trajetoria">{t.nav.trajetoria}</a><a href="#projetos">{t.nav.projetos}</a><a href="#vida">{t.nav.vida}</a><button onClick={()=>setGame(true)} className="font-bold text-lime-300">{t.nav.tedio}</button></div><button className="md:hidden" onClick={()=>setMenu(!menu)}>{t.nav.menu}</button></div></nav>
  {menu&&<div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black text-4xl text-white"><a onClick={()=>setMenu(false)} href="#sobre">{t.nav.sobre}</a><a onClick={()=>setMenu(false)} href="#trajetoria">{t.nav.trajetoria}</a><a onClick={()=>setMenu(false)} href="#projetos">{t.nav.projetos}</a><a onClick={()=>setMenu(false)} href="#vida">{t.nav.vida}</a><button onClick={()=>{setGame(true);setMenu(false)}} className="text-lime-300">{t.nav.tedio}</button><LangSwitch lang={lang} setLang={setLang} className="mt-4"/></div>}
  <header id="top" className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[#101010] px-5 pb-12 pt-28 text-white md:px-10 md:pb-16"><div className="absolute -right-24 top-14 h-[420px] w-[420px] rounded-full bg-lime-300/20 blur-[110px]"/><p className="mb-6 font-mono text-xs uppercase tracking-[.3em] text-lime-300">{t.hero.eyebrow}</p><h1 className="max-w-6xl text-[15vw] font-black uppercase leading-[.75] tracking-[-.08em] md:text-[10vw]">{t.hero.h1a}<br/><span className="text-zinc-500">{t.hero.h1b}</span><br/>{t.hero.h1c}</h1><div className="mt-12 grid gap-8 border-t border-white/15 pt-7 md:grid-cols-2"><p className="max-w-xl text-xl text-zinc-300">{t.hero.lead}</p><div className="flex items-end gap-3 md:justify-end"><a href="#projetos" className="rounded-full bg-lime-300 px-6 py-3 font-bold text-black">{t.hero.cta}</a><a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10"><Linkedin/></a></div></div></header>

  <section id="sobre" className="px-5 py-24 md:px-10 md:py-40"><div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs uppercase tracking-[.25em]">{t.sobre.label}</p><div><h2 className="text-5xl font-black leading-[.95] tracking-[-.05em] md:text-8xl">{t.sobre.h2a}<br/><span className="text-zinc-400">{t.sobre.h2b}</span></h2><div className="mt-12 grid gap-8 text-lg leading-relaxed text-zinc-700 md:grid-cols-2"><p>{t.sobre.p1}</p><p>{t.sobre.p2}</p><p className="md:col-span-2">{t.sobre.p3}</p></div><div className="mt-12 grid grid-cols-2 border-y border-black/15 py-8 md:grid-cols-5">{t.sobre.stats.map((s,i)=><div key={s.l} className={i>1?"mt-8 md:mt-0":undefined}><b className="text-4xl md:text-5xl">{s.n}</b><p className="mt-2 text-sm text-zinc-500">{s.l}</p></div>)}</div></div></div></section>

  <section className="bg-lime-300 px-5 py-16 md:px-10 md:py-20"><div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 md:flex-row md:justify-between md:gap-16"><div className="md:flex-1"><p className="font-mono text-xs uppercase tracking-[.25em]">{t.palco.label}</p><h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.04em] md:text-7xl">{t.palco.h2}</h2><p className="mt-7 max-w-xl text-2xl font-bold italic leading-snug md:text-3xl">{t.palco.talk}</p><p className="mt-4 max-w-xl text-lg">{t.palco.text}</p><div className="mt-8 flex items-center gap-3 font-bold"><Mic2 size={28} strokeWidth={1.75} className="shrink-0"/><span>{t.palco.when}</span></div></div><img src={sescomp} alt={t.palco.alt} loading="lazy" className="w-full max-w-sm rounded-[2rem] shadow-2xl md:w-[400px] md:max-w-none"/></div></section>

  <section id="trajetoria" className="px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1400px]"><div className="mb-16 flex items-end justify-between gap-8"><div><p className="font-mono text-xs uppercase tracking-[.25em]">{t.trajetoria.label}</p><h2 className="mt-4 text-5xl font-black leading-[.95] tracking-[-.05em] md:text-8xl">{t.trajetoria.h2a}<br/><span className="text-zinc-400">{t.trajetoria.h2b}</span></h2></div><LineChart className="hidden shrink-0 text-zinc-300 md:block" size={100} strokeWidth={1.25}/></div><div className="border-t border-black/15">{t.roles.map(r=><article key={r.role} className="grid gap-4 border-b border-black/15 py-9 md:grid-cols-[190px_1fr_1.4fr] md:gap-8"><div><p className="font-mono text-sm font-bold">{r.period}</p><p className="mt-1 text-sm text-zinc-500">{r.place}</p></div><div><h3 className="text-2xl font-bold tracking-tight md:text-3xl">{r.role}</h3><p className="mt-1 font-bold text-zinc-500">{r.org}</p></div><div><p className="text-lg leading-relaxed text-zinc-700">{r.text}</p><div className="mt-5 flex flex-wrap gap-2">{r.tags.map(x=><span key={x} className="rounded-full border border-black/15 px-3 py-1 text-xs text-zinc-600">{x}</span>)}</div></div></article>)}</div><div className="mt-16 grid gap-12 md:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-[.25em]">{t.trajetoria.formacao}</p><ul className="mt-7 space-y-6">{t.education.map(e=><li key={e.course}><p className="text-xl font-bold tracking-tight">{e.course}</p><p className="mt-1 text-zinc-500">{e.school} · {e.period}</p></li>)}</ul></div><div><p className="font-mono text-xs uppercase tracking-[.25em]">{t.trajetoria.ferramentas}</p><div className="mt-7 space-y-6">{t.toolGroups.map(g=><div key={g.label}><p className="text-sm font-bold text-zinc-500">{g.label}</p><div className="mt-3 flex flex-wrap gap-2">{g.items.map(i=><span key={i} className="rounded-full bg-black/5 px-4 py-2 text-sm font-bold">{i}</span>)}</div></div>)}</div></div></div></div></section>

  <section id="projetos" className="bg-[#101010] px-5 py-24 text-white md:px-10 md:py-36"><div className="mx-auto max-w-[1400px]"><div className="mb-16 flex items-end justify-between"><div><p className="font-mono text-xs uppercase tracking-[.25em] text-lime-300">{t.projetos.label}</p><h2 className="mt-4 text-6xl font-black tracking-[-.06em] md:text-9xl">{t.projetos.h2a}<br/>{t.projetos.h2b}</h2></div><Code2 className="hidden shrink-0 text-zinc-700 md:block" size={100}/></div><div className="border-t border-white/15">{t.projects.map((p,i)=><article key={p.title} className="group grid gap-5 border-b border-white/15 py-9 transition hover:bg-white/[.03] md:grid-cols-[80px_1fr_1fr] md:p-9"><span className="font-mono text-zinc-600">0{i+1}</span><div><p className="text-xs uppercase tracking-[.2em] text-lime-300">{p.type}</p><h3 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{p.title}</h3><p className="mt-4 text-2xl font-black tracking-tight text-lime-300 md:text-3xl">{p.metric}</p><p className="mt-1 text-sm text-zinc-500">{p.detail}</p></div><div><p className="text-lg text-zinc-400">{p.text}</p><div className="mt-5 flex flex-wrap gap-2">{p.stack.map(s=><span className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400" key={s}>{s}</span>)}</div></div></article>)}</div><p className="mt-8 max-w-2xl text-sm text-zinc-500">{t.projetos.nota}</p></div></section>

  <section id="vida" className="px-5 py-24 md:px-10 md:py-40"><div className="mx-auto max-w-[1400px]"><p className="font-mono text-xs uppercase tracking-[.25em]">{t.vida.label}</p><div className="mt-10 grid gap-5 md:grid-cols-12"><div className="rounded-[2rem] bg-[#ff5b35] p-8 md:col-span-7 md:p-12"><h2 className="text-5xl font-black tracking-[-.05em] md:text-8xl">{t.vida.h2}</h2><p className="mt-8 max-w-xl text-xl">{t.vida.p}</p><div className="mt-10 flex gap-4"><BookOpen/><Gamepad2/><Film/></div></div><div className="rounded-[2rem] bg-[#222] p-8 text-white md:col-span-5 md:p-12"><p className="text-sm uppercase tracking-[.2em] text-zinc-500">{t.vida.livroLabel}</p><p className="mt-5 text-4xl font-black italic">{t.vida.livroQuote}</p><p className="mt-6 text-zinc-400">{t.vida.livroText}</p></div><div className="rounded-[2rem] bg-sky-300 p-8 md:col-span-5 md:p-12"><Leaf size={48}/><h3 className="mt-8 text-4xl font-black">{t.vida.verdeH3}</h3><p className="mt-4 text-lg">{t.vida.verdeP}</p></div><div className="rounded-[2rem] bg-[#d8c7ff] p-8 md:col-span-7 md:p-12"><p className="text-sm uppercase tracking-[.2em]">{t.vida.filmesLabel}</p><div className="mt-7 flex flex-wrap gap-3">{t.vida.films.map((f,i)=><span key={f} className="rounded-full border border-black/20 bg-white/30 px-4 py-2 font-bold">{String(i+1).padStart(2,"0")} · {f}</span>)}</div></div></div></div></section>

  <section className="bg-lime-300 px-5 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-[1400px]"><p className="font-mono text-xs uppercase tracking-[.25em]">{t.contato.label}</p><a href={LINKEDIN} target="_blank" rel="noreferrer" className="group mt-7 flex items-end justify-between border-b-4 border-black pb-5"><span className="text-6xl font-black tracking-[-.06em] md:text-[9vw]">{t.contato.cta}</span><ArrowDownRight className="shrink-0 transition group-hover:rotate-45" size={72}/></a><div className="mt-12 flex flex-wrap items-center justify-between gap-5 text-sm"><p>{t.contato.copyright}</p><div className="flex items-center gap-6"><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><button onClick={()=>setGame(true)} className="font-black">{t.nav.tedio}</button><LangSwitch lang={lang} setLang={setLang} tone="light"/></div></div></div></section>
  {game&&<Tetris onClose={()=>setGame(false)} t={t.tetris}/>}
 </main>
}
