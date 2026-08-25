import { FlagBR, FlagUS } from "./Flags";

export default function LangSwitch({lang,setLang,tone="dark",className=""}){
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
