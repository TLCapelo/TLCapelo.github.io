import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowLeft, Mail, Clock, MessagesSquare } from "lucide-react";
import { postsDe, formataData } from "./posts";

export const EMAIL = "mxxcapelo@gmail.com";

// Categoria Announcements: so o mantenedor abre topico, entao ninguem cria
// discussao solta no repositorio. O giscus cria uma por post, pelo slug.
// Se categoryId ficar vazio, a area de comentarios simplesmente nao renderiza.
const GISCUS = {
 repo: "TLCapelo/TLCapelo.github.io",
 repoId: "R_kgDOTsc0WQ",
 category: "Announcements",
 categoryId: "DIC_kwDOTsc0Wc4DELN_"
};

function Comentarios({ slug, lang, t }){
 const caixa = useRef(null);
 const pronto = Boolean(GISCUS.categoryId);

 useEffect(()=>{
  if(!pronto || !caixa.current) return;
  const el = caixa.current;
  const s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.async = true;
  s.crossOrigin = "anonymous";
  Object.entries({
   "data-repo": GISCUS.repo,
   "data-repo-id": GISCUS.repoId,
   "data-category": GISCUS.category,
   "data-category-id": GISCUS.categoryId,
   "data-mapping": "specific",      // uma discussao por slug, estavel se o titulo mudar
   "data-term": slug,
   "data-strict": "1",
   "data-reactions-enabled": "1",
   "data-emit-metadata": "0",
   "data-input-position": "top",
   "data-theme": "light",
   "data-lang": lang === "en" ? "en" : "pt",
   "data-loading": "lazy"
  }).forEach(([k,v]) => s.setAttribute(k,v));
  el.innerHTML = "";
  el.appendChild(s);
  return () => { el.innerHTML = ""; };
 },[slug, lang, pronto]);

 if(!pronto) return null;

 return <section className="mx-auto mt-20 max-w-[46rem] border-t border-black/15 pt-12">
  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[.25em]"><MessagesSquare size={16}/> {t.blog.comentarios}</p>
  <p className="mt-3 text-sm text-zinc-500">{t.blog.comentariosNota}</p>
  <div ref={caixa} className="mt-8"/>
 </section>;
}

export function ListaPosts({ t, lang }){
 const lista = postsDe(lang);
 return <main className="min-h-screen bg-[#f1efe8] px-5 pb-32 pt-32 text-[#111] md:px-10 md:pt-40">
  <div className="mx-auto max-w-[1400px]">
   <p className="font-mono text-xs uppercase tracking-[.25em]">{t.blog.label}</p>
   <h1 className="mt-4 max-w-4xl text-6xl font-black leading-[.9] tracking-[-.06em] md:text-9xl">{t.blog.tituloA}<br/><span className="text-zinc-400">{t.blog.tituloB}</span></h1>
   <p className="mt-10 max-w-2xl text-2xl font-bold leading-snug tracking-tight md:text-3xl">{t.blog.lede}</p>
   <p className="mt-6 max-w-xl text-lg text-zinc-600">{t.blog.intro}</p>

   {lista.length === 0
    ? <div className="mt-16 rounded-[2rem] border border-black/15 p-10"><p className="text-2xl font-bold tracking-tight">{t.blog.vazioTitulo}</p><p className="mt-3 max-w-lg text-lg text-zinc-600">{t.blog.vazioTexto}</p></div>
    : <div className="mt-16 border-t border-black/15">
       {lista.map((p,i) =>
        <a key={p.slug} href={`#/blog/${p.slug}`} className="group grid gap-4 border-b border-black/15 py-9 transition hover:bg-black/[.03] md:grid-cols-[80px_1fr_1.1fr] md:gap-8 md:px-4">
         <span className="font-mono text-zinc-400">{String(i+1).padStart(2,"0")}</span>
         <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-zinc-500">{formataData(p.data, lang)} · {p.minutos} {t.blog.min}</p>
          <h2 className="mt-2 text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl">{p.titulo}</h2>
         </div>
         <div>
          <p className="text-lg text-zinc-600">{p.resumo}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
           {p.tags.map(tag => <span key={tag} className="rounded-full border border-black/15 px-3 py-1 text-xs text-zinc-600">{tag}</span>)}
           <span className="ml-auto hidden items-center gap-1 font-bold transition group-hover:gap-2 md:flex">{t.blog.ler} <ArrowUpRight size={18}/></span>
          </div>
         </div>
        </a>)}
      </div>}
  </div>
 </main>;
}

export function PaginaPost({ post, t, lang }){
 const assunto = encodeURIComponent(`${t.blog.assunto}: ${post.titulo}`);
 return <main className="min-h-screen bg-[#f1efe8] text-[#111]">

  <header className="bg-[#101010] px-5 pb-16 pt-32 text-white md:px-10 md:pb-20 md:pt-40">
   <div className="mx-auto max-w-[46rem]">
    <a href="#/blog" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.25em] text-lime-300 transition hover:gap-3"><ArrowLeft size={14}/> {t.blog.voltar}</a>
    <h1 className="mt-8 text-4xl font-black leading-[1.02] tracking-[-.04em] md:text-6xl">{post.titulo}</h1>
    {post.subtitulo && <p className="mt-6 text-xl leading-snug text-zinc-400 md:text-2xl">{post.subtitulo}</p>}
    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-6 text-sm text-zinc-400">
     <span>{formataData(post.data, lang)}</span>
     <span className="flex items-center gap-1.5"><Clock size={14}/> {post.minutos} {t.blog.min}</span>
     {post.tags.map(tag => <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs">{tag}</span>)}
    </div>
   </div>
  </header>

  <article className="px-5 py-16 md:px-10 md:py-24">
   <div className="post mx-auto max-w-[46rem]" dangerouslySetInnerHTML={{ __html: post.html }}/>

   <aside className="mx-auto mt-20 max-w-[46rem] rounded-[2rem] bg-lime-300 p-8 md:p-12">
    <Mail size={40} strokeWidth={1.75}/>
    <h2 className="mt-6 text-3xl font-black tracking-[-.04em] md:text-5xl">{t.blog.faleTitulo}</h2>
    <p className="mt-4 max-w-lg text-lg">{t.blog.faleTexto}</p>
    <a href={`mailto:${EMAIL}?subject=${assunto}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 font-bold text-white transition hover:gap-3">
     {EMAIL} <ArrowUpRight size={18}/>
    </a>
   </aside>

   <Comentarios slug={post.slug} lang={lang} t={t}/>

   <p className="mx-auto mt-16 max-w-[46rem] border-t border-black/15 pt-8 text-sm text-zinc-500">{t.blog.rodapeApoio}</p>
  </article>
 </main>;
}

export function PostNaoEncontrado({ t }){
 return <main className="grid min-h-screen place-items-center bg-[#f1efe8] px-5 text-center text-[#111]">
  <div>
   <p className="font-mono text-xs uppercase tracking-[.25em] text-zinc-500">404</p>
   <h1 className="mt-4 text-5xl font-black tracking-[-.05em] md:text-7xl">{t.blog.naoAchou}</h1>
   <a href="#/blog" className="mt-8 inline-block rounded-full bg-black px-6 py-3 font-bold text-white">{t.blog.voltar}</a>
  </div>
 </main>;
}
