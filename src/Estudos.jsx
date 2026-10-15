import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Estudos({ t }){
 return <main className="px-5 pb-24 pt-32 md:px-10 md:pb-36">
  <div className="mx-auto max-w-[1400px]">
   <header className="max-w-4xl">
    <p className="font-mono text-xs uppercase tracking-[.25em] text-lime-700">{t.label}</p>
    <h1 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.06em] md:text-8xl">{t.title}</h1>
    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">{t.intro}</p>
   </header>

   <div className="mt-16 border-t border-black/15">
    {t.projects.map((project, index)=><article key={project.title} className="grid gap-6 border-b border-black/15 py-9 md:grid-cols-[80px_1fr_1fr] md:gap-8 md:py-12">
     <span className="font-mono text-zinc-500">{String(index+1).padStart(2,"0")}</span>
     <div>
      <p className="font-mono text-xs uppercase tracking-[.2em] text-lime-700">{project.type}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h2>
      <p className="mt-5 text-xl font-black text-lime-700 md:text-2xl">{project.metric}</p>
      <p className="mt-2 text-sm text-zinc-500">{project.detail}</p>
     </div>
     <div>
      <p className="text-lg leading-relaxed text-zinc-700">{project.text}</p>
      <div className="mt-5 flex flex-wrap gap-2">
       {project.stack.map(item=><span className="rounded-full border border-black/15 px-3 py-1 text-xs text-zinc-600" key={item}>{item}</span>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
       {project.action && project.href && <a href={project.href} className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-200">{project.action}<ArrowUpRight size={16}/></a>}
       {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm font-bold transition hover:bg-black/5">GitHub<ArrowUpRight size={16}/></a>}
       {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm font-bold transition hover:bg-black/5">{project.demoLabel}<ArrowUpRight size={16}/></a>}
       {project.status && <span className="rounded-full bg-lime-300 px-3 py-2 text-xs font-bold text-black">{project.status}</span>}
      </div>
     </div>
    </article>)}
   </div>
  </div>
 </main>;
}
