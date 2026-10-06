import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Dices } from "lucide-react";
import LangSwitch from "./LangSwitch";
import { POLITICAS, CICLOS, simulaTudo, replicas } from "./simuladorMotor";

const COR = { ingenua: "#fb7185", holdout: "#bef264", aleatoria: "#fbbf24", sem_evolucao: "#71717a" };
const W = 640, H = 260, PAD = { l: 44, r: 14, t: 14, b: 28 };

function CurvaSimples({ s }) {
 const [k, setK] = useState(0.17);
 const N = 50, X0 = 1;
 const pts = Array.from({ length: N + 1 }, (_, i) => X0 * Math.exp(k * i));
 const top = pts[N];
 const x = i => PAD.l + (i / N) * (W - PAD.l - PAD.r);
 const y = v => PAD.t + (1 - v / top) * (H - PAD.t - PAD.b);
 const fmt = v => (v >= 1000 ? Math.round(v).toLocaleString("en-US") : v.toFixed(1));
 return <figure className="rounded-[2rem] border border-white/15 bg-white/[.03] p-5 md:p-7">
  <figcaption>
   <b className="text-white">{s.curvaTitulo}</b>
   <span className="block font-mono text-sm text-lime-300">{s.curvaSub}</span>
  </figcaption>
  <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label={s.curvaTitulo}>
   {[0, 0.5, 1].map(f => <g key={f}>
    <line x1={PAD.l} x2={W - PAD.r} y1={y(top * f)} y2={y(top * f)} stroke="#fff" strokeOpacity=".08"/>
    <text x={PAD.l - 8} y={y(top * f) + 4} textAnchor="end" fontSize="11" fill="#71717a">{fmt(top * f)}</text>
   </g>)}
   {[0, 10, 20, 30, 40, 50].map(v => <text key={v} x={x(v)} y={H - 8} textAnchor="middle" fontSize="11" fill="#71717a">{v}</text>)}
   <polyline fill="none" stroke="#bef264" strokeWidth="2.5" strokeLinejoin="round" points={pts.map((v, i) => `${x(i)},${y(v)}`).join(" ")}/>
   <circle cx={x(N)} cy={y(top)} r="4" fill="#bef264"/>
  </svg>
  <label className="mt-2 block text-sm">
   <span className="flex justify-between"><span className="font-bold text-white">{s.curvaK}</span><span className="font-mono text-lime-300">{(k * 100).toFixed(0)}%</span></span>
   <input type="range" min={0.05} max={0.3} step={0.01} value={k} onChange={e => setK(Number(e.target.value))} className="mt-2 w-full accent-lime-300"/>
  </label>
  <p className="mt-3 text-sm text-zinc-500">{s.curvaLegenda}</p>
 </figure>;
}

function Slider({ label, hint, value, min, max, step, onChange, fmt }) {
 return <label className="block">
  <span className="flex items-baseline justify-between gap-3 text-sm">
   <span className="font-bold">{label}</span>
   <span className="font-mono text-lime-300">{fmt ? fmt(value) : value}</span>
  </span>
  <input type="range" min={min} max={max} step={step} value={value}
   onChange={e => onChange(Number(e.target.value))} className="mt-2 w-full accent-lime-300"/>
  <span className="mt-1 block text-xs text-zinc-500">{hint}</span>
 </label>;
}

function Grafico({ dados, ciclo, nomes }) {
 const todos = POLITICAS.flatMap(p => dados[p].map(d => d.real));
 const lo = Math.min(0, ...todos), hi = Math.max(0.1, ...todos);
 const x = i => PAD.l + (i / CICLOS) * (W - PAD.l - PAD.r);
 const y = v => PAD.t + (1 - (v - lo) / (hi - lo)) * (H - PAD.t - PAD.b);
 const ticks = [lo, (lo + hi) / 2, hi];
 return <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Gráfico do valor real por ciclo">
  {ticks.map(t => <g key={t}>
   <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#ffffff" strokeOpacity=".08"/>
   <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#71717a">{t.toFixed(1)}</text>
  </g>)}
  <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} stroke="#ffffff" strokeOpacity=".25" strokeDasharray="3 4"/>
  {[0, 10, 20, 30, 40].map(c => <text key={c} x={x(c)} y={H - 8} textAnchor="middle" fontSize="11" fill="#71717a">{c}</text>)}
  {POLITICAS.map(p => {
   const pts = dados[p].slice(0, ciclo + 1);
   return <g key={p}>
    <polyline fill="none" stroke={COR[p]} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
     points={pts.map((d, i) => `${x(i)},${y(d.real)}`).join(" ")}/>
    <circle cx={x(pts.length - 1)} cy={y(pts.at(-1).real)} r="4" fill={COR[p]}/>
   </g>;
  })}
 </svg>;
}

function Dispersao({ nuvem, nomes }) {
 const S = 300, P = 30;
 if (!nuvem) return <div className="grid h-[300px] place-items-center text-sm text-zinc-500">{nomes.semNuvem}</div>;
 const lim = Math.max(0.12, ...nuvem.pontos.flat().map(Math.abs)) * 1.05;
 const sx = v => P + ((v + lim) / (2 * lim)) * (S - 2 * P);
 const sy = v => S - P - ((v + lim) / (2 * lim)) * (S - 2 * P);
 const [vr, vm] = nuvem.vencedor;
 return <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[340px]" role="img" aria-label={nomes.dispersaoAria}>
  <line x1={sx(0)} x2={sx(0)} y1={P} y2={S - P} stroke="#fff" strokeOpacity=".2"/>
  <line x1={P} x2={S - P} y1={sy(0)} y2={sy(0)} stroke="#fff" strokeOpacity=".2"/>
  <line x1={sx(-lim)} y1={sy(-lim)} x2={sx(lim)} y2={sy(lim)} stroke="#bef264" strokeOpacity=".5" strokeDasharray="4 4"/>
  <g className="sim-pop">
   {nuvem.pontos.map(([r, m], i) => <circle key={i} cx={sx(r)} cy={sy(m)} r="2.2" fill="#a1a1aa" fillOpacity=".55"/>)}
  </g>
  <circle className="sim-pop" cx={sx(vr)} cy={sy(vm)} r="7" fill="none" stroke="#fb7185" strokeWidth="2"/>
  <circle className="sim-pop" cx={sx(vr)} cy={sy(vm)} r="2.5" fill="#fb7185"/>
  <text x={S / 2} y={S - 6} textAnchor="middle" fontSize="10" fill="#71717a">{nomes.eixoReal}</text>
  <text x="10" y={S / 2} fontSize="10" fill="#71717a" transform={`rotate(-90 10 ${S / 2})`} textAnchor="middle">{nomes.eixoMedido}</text>
 </svg>;
}

function Barras({ nome, cor, acreditado, real, max, t }) {
 const w = v => `${Math.max(0, Math.min(100, (Math.max(v, 0) / max) * 100))}%`;
 return <div>
  <p className="text-sm font-bold" style={{ color: cor }}>{nome}</p>
  <div className="mt-3 space-y-2 text-xs text-zinc-400">
   <div><div className="flex justify-between"><span>{t.achou}</span><span className="font-mono">{acreditado.toFixed(2)}</span></div>
    <div className="mt-1 h-2.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-zinc-400 transition-[width] duration-300" style={{ width: w(acreditado) }}/></div></div>
   <div><div className="flex justify-between"><span>{t.ganhou}</span><span className="font-mono">{real.toFixed(2)}</span></div>
    <div className="mt-1 h-2.5 rounded-full bg-white/10"><div className="h-full rounded-full transition-[width] duration-300" style={{ width: w(real), background: cor }}/></div></div>
  </div>
 </div>;
}

export default function Simulador({ t, lang, setLang }) {
 const s = t.sim;
 const [ruido, setRuido] = useState(0.15);
 const [tentativas, setTentativas] = useState(100);
 const [capacidade, setCapacidade] = useState(0.005);
 const [semente, setSemente] = useState(7);
 const [ciclo, setCiclo] = useState(0);
 const [tocando, setTocando] = useState(() => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
 const [foco, setFoco] = useState("ingenua");

 const params = useMemo(() => ({ ruido, tentativas, capacidade, semente }), [ruido, tentativas, capacidade, semente]);
 const dados = useMemo(() => simulaTudo(params), [params]);
 const mult = useMemo(() => replicas({ ruido, tentativas, capacidade }, 40), [ruido, tentativas, capacidade]);

 // mexeu em qualquer controle: recomeça a animação do zero
 useEffect(() => { setCiclo(0); }, [params]);
 useEffect(() => {
  if (!tocando) return;
  const id = setInterval(() => setCiclo(c => (c >= CICLOS ? c : c + 1)), 320);
  return () => clearInterval(id);
 }, [tocando]);
 useEffect(() => { if (ciclo >= CICLOS) setTocando(false); }, [ciclo]);

 const fim = (p) => dados[p][ciclo];
 const maxBarra = Math.max(0.5, ...["ingenua", "holdout"].map(p => Math.max(fim(p).acreditado, fim(p).real)));
 const nuvem = dados[foco][ciclo]?.nuvem;
 const f = foco === "ingenua" ? dados.ingenua[ciclo] : dados.holdout[ciclo];

 return <main className="min-h-screen overflow-x-hidden bg-[#101010] text-white selection:bg-lime-300 selection:text-black">
  <div className="pointer-events-none fixed -right-32 top-1/4 h-[520px] w-[520px] rounded-full bg-lime-300/10 blur-[130px]"/>
  <div className="relative mx-auto max-w-[1200px] px-5 py-7 md:px-10 md:py-9">
   <header className="flex items-center justify-between">
    <a href="#/" className="flex items-center gap-2 text-sm font-black tracking-tight"><ArrowLeft size={16}/>MAXIMILIAN®</a>
    <LangSwitch lang={lang} setLang={setLang}/>
   </header>

   <section className="py-16 md:py-24">
    <p className="font-mono text-xs uppercase tracking-[.3em] text-lime-300">{s.eyebrow}</p>
    <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.06em] md:text-8xl">{s.h1a}<br/><span className="text-zinc-600">{s.h1b}</span></h1>
    <p className="mt-8 max-w-2xl text-lg text-zinc-400">{s.lead}</p>
   </section>

   {/* ---------- demo ---------- */}
   <section aria-label={s.demoLabel} className="rounded-[2rem] border border-white/15 bg-white/[.03] p-5 md:p-8">
    <div className="grid gap-8 md:grid-cols-3">
     <Slider label={s.ruido} hint={s.ruidoHint} value={ruido} min={0} max={0.3} step={0.01} onChange={setRuido} fmt={v => v.toFixed(2)}/>
     <Slider label={s.tentativas} hint={s.tentativasHint} value={tentativas} min={5} max={300} step={5} onChange={setTentativas}/>
     <Slider label={s.capacidade} hint={s.capacidadeHint} value={capacidade} min={0} max={0.02} step={0.001} onChange={setCapacidade} fmt={v => v.toFixed(3)}/>
    </div>
    <div className="mt-8 flex flex-wrap items-center gap-3">
     <button onClick={() => { if (ciclo >= CICLOS) setCiclo(0); setTocando(v => !v); }}
      className="flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 font-bold text-black">
      {tocando ? <Pause size={18}/> : <Play size={18}/>}{tocando ? s.pausar : ciclo >= CICLOS ? s.repetir : s.tocar}
     </button>
     <button onClick={() => { setCiclo(0); setTocando(true); }} aria-label={s.reiniciar}
      className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm"><RotateCcw size={16}/>{s.reiniciar}</button>
     <button onClick={() => { setSemente(x => x + 1); setTocando(true); }}
      className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm"><Dices size={16}/>{s.novaSemente}</button>
     <p className="ml-auto font-mono text-sm text-zinc-400" aria-live="off">{s.ciclo} <b className="text-white">{ciclo}</b>/{CICLOS}</p>
    </div>

    <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
     <div>
      <h3 className="text-sm font-bold">{s.graficoTitulo}</h3>
      <p className="mb-3 text-xs text-zinc-500">{s.graficoSub}</p>
      <Grafico dados={dados} ciclo={ciclo} nomes={s}/>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
       {POLITICAS.map(p => <span key={p} className="flex items-center gap-2 text-zinc-300">
        <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COR[p] }}/>{s.pol[p]}</span>)}
      </div>
     </div>
     <div>
      <h3 className="text-sm font-bold">{s.nuvemTitulo}</h3>
      <div className="mb-2 mt-2 flex gap-2">
       {["ingenua", "holdout"].map(p => <button key={p} onClick={() => setFoco(p)} aria-pressed={foco === p}
        className={`rounded-full border px-3 py-1 text-xs ${foco === p ? "border-lime-300 text-lime-300" : "border-white/20 text-zinc-400"}`}>{s.pol[p]}</button>)}
      </div>
      <div key={`${foco}-${ciclo}-${semente}`}><Dispersao nuvem={nuvem} nomes={s}/></div>
      <p className="mt-2 text-xs text-zinc-500">
       {nuvem ? (nuvem.promovido ? s.nuvemPromovido : s.nuvemRecusado) : s.nuvemInicio}
       {nuvem && <> {s.nuvemVencedor} <b className="text-zinc-300">{nuvem.vencedor[1].toFixed(2)}</b>, {s.nuvemReal} <b className={nuvem.vencedor[0] > 0 ? "text-lime-300" : "text-rose-400"}>{nuvem.vencedor[0].toFixed(2)}</b>.</>}
      </p>
     </div>
    </div>

    <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
     <div>
      <h3 className="text-sm font-bold">{s.barrasTitulo}</h3>
      <p className="mb-4 text-xs text-zinc-500">{s.barrasSub}</p>
      <div className="grid gap-6 sm:grid-cols-2">
       {["ingenua", "holdout"].map(p => <Barras key={p} nome={s.pol[p]} cor={COR[p]} acreditado={fim(p).acreditado} real={fim(p).real} max={maxBarra} t={s}/>)}
      </div>
     </div>
     <div>
      <h3 className="text-sm font-bold">{s.contadorTitulo}</h3>
      <p className="mb-4 text-xs text-zinc-500">{s.contadorSub}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
       {["ingenua", "holdout"].map(p => {
        const d = fim(p);
        return <div key={p} className="rounded-2xl border border-white/10 p-4">
         <p className="text-xs" style={{ color: COR[p] }}>{s.pol[p]}</p>
         <p className="mt-2 text-3xl font-black tabular-nums">{d.falsas}<span className="text-base font-normal text-zinc-500">/{d.promocoes}</span></p>
         <p className="mt-1 text-xs text-zinc-500">{s.falsasLabel}</p>
        </div>;
       })}
      </div>
     </div>
    </div>
   </section>

   {/* ---------- 40 sementes ---------- */}
   <section className="mt-6 rounded-[2rem] border border-white/15 p-5 md:p-8">
    <h2 className="text-2xl font-black tracking-tight md:text-3xl">{s.multTitulo}</h2>
    <p className="mt-2 max-w-3xl text-zinc-400">{s.multTexto}</p>
    <div className="mt-6 overflow-x-auto">
     <table className="w-full min-w-[560px] text-left text-sm">
      <thead className="text-xs uppercase tracking-wider text-zinc-500">
       <tr><th className="py-2 pr-4 font-normal">{s.colPolitica}</th><th className="px-3 font-normal">{s.colReal}</th><th className="px-3 font-normal">{s.colAchou}</th><th className="px-3 font-normal">{s.colFalsas}</th><th className="px-3 font-normal">{s.colPromo}</th></tr>
      </thead>
      <tbody className="font-mono">
       {POLITICAS.map(p => <tr key={p} className="border-t border-white/10">
        <td className="py-3 pr-4 font-sans font-bold" style={{ color: COR[p] }}>{s.pol[p]}</td>
        <td className="px-3">{mult[p].real.toFixed(2)}</td>
        <td className="px-3 text-zinc-400">{p === "aleatoria" || p === "sem_evolucao" ? "n/a" : mult[p].acreditado.toFixed(2)}</td>
        <td className="px-3">{p === "sem_evolucao" ? "n/a" : `${(mult[p].taxaFalsa * 100).toFixed(0)}%`}</td>
        <td className="px-3">{mult[p].promocoes.toFixed(1)}</td>
       </tr>)}
      </tbody>
     </table>
    </div>
    <p className="mt-4 max-w-3xl text-sm text-lime-300">{s.multHonesto}</p>
   </section>

   {/* ---------- explicação ---------- */}
   <article className="mx-auto mt-20 max-w-3xl space-y-14 text-lg leading-relaxed text-zinc-300">
    {s.secoes.map((sec, idx) => <section key={sec.titulo}>
     <h2 className="text-3xl font-black tracking-[-.03em] text-white md:text-4xl">{sec.titulo}</h2>
     {sec.paragrafos.map((p, i) => <p key={i} className="mt-5">{p}</p>)}
     {idx === 0 && <div className="mt-8"><CurvaSimples s={s}/></div>}
     {sec.lista && <ul className="mt-5 space-y-4">
      {sec.lista.map(item => <li key={item.t} className="border-l-2 border-lime-300/60 pl-4">
       <b className="text-white">{item.t}</b> <span className="text-zinc-400">{item.d}</span></li>)}
     </ul>}
    </section>)}
   </article>

   <footer className="mx-auto mt-24 max-w-3xl border-t border-white/15 pt-8 pb-10 text-sm text-zinc-500">
    <p className="rounded-2xl border border-amber-300/30 bg-amber-300/[.06] p-5 text-amber-100/90">{s.aviso}</p>
    <p className="mt-6">{t.contato.copyright}</p>
   </footer>
  </div>
 </main>;
}
