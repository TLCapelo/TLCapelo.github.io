import React from "react";
import { ArrowUpRight, Linkedin } from "lucide-react";
import LangSwitch from "./LangSwitch";
import { formataData } from "./posts";

const LINKEDIN = "https://www.linkedin.com/in/mxxcapelo";

function Porta({ href, label, titulo, texto, rodape, destaque }){
 const base = "group flex flex-col justify-between rounded-[2rem] border p-8 transition md:p-10";
 const cor = destaque
  ? "border-lime-300 bg-lime-300 text-black hover:bg-lime-200"
  : "border-white/15 hover:border-white/40 hover:bg-white/[.04]";
 return <a href={href} className={`${base} ${cor}`}>
  <div>
   <p className={`font-mono text-xs uppercase tracking-[.25em] ${destaque?"text-black/60":"text-lime-300"}`}>{label}</p>
   <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">{titulo}</h2>
   <p className={`mt-4 max-w-sm text-lg ${destaque?"text-black/70":"text-zinc-400"}`}>{texto}</p>
  </div>
  <div className="mt-12 flex items-end justify-between gap-4">
   <span className={`text-sm ${destaque?"text-black/60":"text-zinc-500"}`}>{rodape}</span>
   <ArrowUpRight className="shrink-0 transition group-hover:-translate-y-1 group-hover:translate-x-1" size={34} strokeWidth={2}/>
  </div>
 </a>;
}

export default function Entrada({ t, lang, setLang, ultimo }){
 return <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#101010] px-5 py-7 text-white md:px-10 md:py-9">
  <div className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] rounded-full bg-lime-300/15 blur-[130px]"/>

  <header className="relative flex items-center justify-between">
   <span className="text-sm font-black tracking-tight">MAXIMILIAN®</span>
   <LangSwitch lang={lang} setLang={setLang}/>
  </header>

  <div className="relative py-16">
   <p className="font-mono text-xs uppercase tracking-[.3em] text-lime-300">{t.entrada.eyebrow}</p>
   <h1 className="mt-6 max-w-5xl text-[13vw] font-black uppercase leading-[.8] tracking-[-.07em] md:text-[6.5vw]">
    {t.entrada.h1a}<br/><span className="text-zinc-600">{t.entrada.h1b}</span>
   </h1>
   <p className="mt-8 max-w-xl text-lg text-zinc-400">{t.entrada.lead}</p>

   <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
    <Porta destaque href="#/portfolio"
     label={t.entrada.portfolioLabel} titulo={t.entrada.portfolioTitulo}
     texto={t.entrada.portfolioTexto} rodape={t.entrada.portfolioRodape}/>
    <Porta href="#/blog"
     label={t.entrada.blogLabel} titulo={t.entrada.blogTitulo}
     texto={t.entrada.blogTexto}
     rodape={ultimo ? `${t.entrada.blogUltimo}: ${ultimo.titulo}` : t.entrada.blogVazio}/>
   </div>
  </div>

  <footer className="relative flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-500">
   <p>{t.contato.copyright}</p>
   <div className="flex items-center gap-5">
    {ultimo && <span className="hidden md:inline">{formataData(ultimo.data, lang)}</span>}
    <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-white"><Linkedin size={20}/></a>
   </div>
  </footer>
 </main>;
}
