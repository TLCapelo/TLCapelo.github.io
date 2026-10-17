import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, RefreshCw, Monitor, Database, Cloud, Coins, Landmark } from "lucide-react";
import LangSwitch from "./LangSwitch";

const DADOS = "./dados/";
const WIDGET = "./downloads/widget-btc-usd-setup.exe";
const COINGECKO = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true";

const TXT = {
 pt: {
  voltar: "MAXIMILIAN®",
  eyebrow: "Estudos · Engenharia de dados",
  titulo: "Clima, criptomoedas e economia",
  lead: "Um pipeline ETL que roda sozinho, a cada 3 horas: coleta três APIs públicas, limpa e valida os dados e entrega tabelas prontas para dashboards. O painel abaixo lê exatamente os arquivos que o pipeline gera.",
  atualizado: "Última execução",
  cidades: "cidades", moedas: "criptomoedas", series: "indicadores do BCB", apis: "APIs públicas",
  dash: "Dashboard", dashSub: "Dados reais da última execução do pipeline. Clique para explorar.",
  abas: { cripto: "Cripto", clima: "Clima", economia: "Economia" },
  carregando: "Carregando dados…", erro: "Não foi possível carregar os dados.",
  moeda: "Moeda", preco: "Preço (USD)", sem: "sem histórico no recorte",
  hist: "Histórico de preço (USD)", mercado: "Mercado agora",
  cidade: "Cidade", tmax: "Máx", tmin: "Mín", chuva: "Chuva", umid: "Umidade", uv: "UV máx", vento: "Vento máx",
  comparativo: "Temperatura média por cidade", dia: "Dia",
  indicador: "Indicador", valor: "Valor", media7: "Média 7 dias", alerta: "Alerta", var30: "Var. 30 dias",
  arquitetura: "Como funciona", arqSub: "Do agendamento ao dashboard, em quatro etapas automáticas.",
  etapas: [
   ["01", "Agendar", "Um agendador dispara o pipeline automaticamente a cada 3 horas, 8 vezes ao dia. Também pode ser executado manualmente."],
   ["02", "Extrair", "Python consulta as APIs Open-Meteo, CoinGecko e BCB/SGS, com tentativas automáticas e limite de requisições respeitado."],
   ["03", "Transformar", "pandas limpa, tipa e enriquece (médias móveis, z-score, categorias, alertas). Validações de qualidade barram dado ruim."],
   ["04", "Servir", "Saem Parquet particionado e CSVs prontos para Power BI. Os arquivos são publicados e este painel os lê."]
  ],
  fontes: "Fontes de dados (APIs)",
  fonteCab: ["Fonte", "O que entrega", "Frequência"],
  fonteLinhas: [
   ["Open-Meteo", "Temperatura, chuva, vento, umidade, UV e radiação de 10 cidades brasileiras", "A cada 3 horas"],
   ["CoinGecko", "Preço, valor de mercado, volume e variação 24h/7d/30d de 10 criptomoedas", "A cada 3 horas"],
   ["BCB / SGS", "Selic, CDI, dólar, euro, IPCA, IGP-M, PIB, desemprego e mais", "A cada 3 horas"]
  ],
  stack: "Tecnologias",
  widgetEyebrow: "Widget para computador",
  widgetTitulo: "Widget BTC / USD",
  widgetTexto: "Uma janela pequena que fica sempre no topo da tela e mostra o preço do Bitcoin em dólares com a variação de 24h, atualizando a cada 60 segundos. Feito com Tauri. Abaixo está o mesmo widget funcionando ao vivo.",
  aoVivo: "AO VIVO", conectando: "CONECTANDO", semConexao: "SEM CONEXÃO", atualizar: "Atualizar", var24: "24h",
  usandoPipeline: "Cotação ao vivo indisponível agora (limite da API). Mostrando o último valor do pipeline.",
  baixar: "Baixar para Windows", baixarNota: "Instalador de ~1,8 MB · Windows 10/11 · 64 bits. Como o app não tem assinatura digital, o Windows pode mostrar um aviso do SmartScreen: clique em “Mais informações” e “Executar assim mesmo”.",
  arquivos: "Dados abertos", arquivosSub: "Os mesmos arquivos que alimentam o dashboard. Conecte ao Power BI ou ao Excel.",
  arquivosLista: [["crypto_market.csv", "Mercado de criptomoedas"], ["crypto_historico.csv", "Histórico de preços"], ["clima_diario.csv", "Clima diário por cidade"], ["economia_diario.csv", "Indicadores do BCB com médias e alertas"], ["metadata.json", "Catálogo e qualidade dos dados"]]
 },
 en: {
  voltar: "MAXIMILIAN®",
  eyebrow: "Studies · Data engineering",
  titulo: "Weather, crypto and economy",
  lead: "An ETL pipeline that runs on its own, every 3 hours: it collects three public APIs, cleans and validates the data and delivers tables ready for dashboards. The panel below reads exactly the files the pipeline produces.",
  atualizado: "Last run",
  cidades: "cities", moedas: "cryptocurrencies", series: "BCB indicators", apis: "public APIs",
  dash: "Dashboard", dashSub: "Real data from the pipeline's latest run. Click to explore.",
  abas: { cripto: "Crypto", clima: "Weather", economia: "Economy" },
  carregando: "Loading data…", erro: "Could not load the data.",
  moeda: "Coin", preco: "Price (USD)", sem: "no history in this slice",
  hist: "Price history (USD)", mercado: "Market now",
  cidade: "City", tmax: "Max", tmin: "Min", chuva: "Rain", umid: "Humidity", uv: "Max UV", vento: "Max wind",
  comparativo: "Mean temperature by city", dia: "Day",
  indicador: "Indicator", valor: "Value", media7: "7-day average", alerta: "Alert", var30: "30-day change",
  arquitetura: "How it works", arqSub: "From scheduling to dashboard, in four automatic steps.",
  etapas: [
   ["01", "Schedule", "A scheduler triggers the pipeline automatically every 3 hours, 8 times a day. It can also be run manually."],
   ["02", "Extract", "Python queries the Open-Meteo, CoinGecko and BCB/SGS APIs, with automatic retries and respect for rate limits."],
   ["03", "Transform", "pandas cleans, types and enriches (moving averages, z-score, categories, alerts). Quality checks block bad data."],
   ["04", "Serve", "Partitioned Parquet and Power BI-ready CSVs come out. The files are published and this panel reads them."]
  ],
  fontes: "Data sources (APIs)",
  fonteCab: ["Source", "What it provides", "Frequency"],
  fonteLinhas: [
   ["Open-Meteo", "Temperature, rain, wind, humidity, UV and radiation for 10 Brazilian cities", "Every 3 hours"],
   ["CoinGecko", "Price, market cap, volume and 24h/7d/30d change for 10 cryptocurrencies", "Every 3 hours"],
   ["BCB / SGS", "Selic, CDI, USD, EUR, IPCA, IGP-M, GDP, unemployment and more", "Every 3 hours"]
  ],
  stack: "Technologies",
  widgetEyebrow: "Desktop widget",
  widgetTitulo: "BTC / USD widget",
  widgetTexto: "A small window that stays on top of your screen and shows the Bitcoin price in dollars with the 24h change, refreshing every 60 seconds. Built with Tauri. Below is the same widget running live.",
  aoVivo: "LIVE", conectando: "CONNECTING", semConexao: "OFFLINE", atualizar: "Refresh", var24: "24h",
  usandoPipeline: "Live quote unavailable right now (API limit). Showing the pipeline's latest value.",
  baixar: "Download for Windows", baixarNota: "~1.8 MB installer · Windows 10/11 · 64-bit. The app is not code-signed, so Windows may show a SmartScreen warning: click “More info” then “Run anyway”.",
  arquivos: "Open data", arquivosSub: "The same files that feed the dashboard. Connect them to Power BI or Excel.",
  arquivosLista: [["crypto_market.csv", "Cryptocurrency market"], ["crypto_historico.csv", "Price history"], ["clima_diario.csv", "Daily weather by city"], ["economia_diario.csv", "BCB indicators with averages and alerts"], ["metadata.json", "Data catalog and quality"]]
 }
};

const STACK = ["Python", "pandas", "PyArrow", "Parquet", "Open-Meteo", "CoinGecko", "BCB/SGS", "GitHub Actions", "Power BI", "Tauri", "Rust"];

// ---------- dados ----------
function parseCsv(texto) {
 const linhas = []; let campo = "", linha = [], aspas = false;
 for (let i = 0; i < texto.length; i++) {
  const c = texto[i];
  if (aspas) {
   if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
   else if (c === '"') aspas = false;
   else campo += c;
  } else if (c === '"') aspas = true;
  else if (c === ",") { linha.push(campo); campo = ""; }
  else if (c === "\n") { linha.push(campo); linhas.push(linha); linha = []; campo = ""; }
  else if (c !== "\r") campo += c;
 }
 if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
 const [cab, ...resto] = linhas;
 return resto.filter(r => r.length === cab.length).map(r => Object.fromEntries(cab.map((k, i) => [k, r[i]])));
}

const num = v => (v === "" || v == null ? null : Number(v));

async function carrega(arquivo) {
 const r = await fetch(DADOS + arquivo);
 if (!r.ok) throw new Error(arquivo);
 return arquivo.endsWith(".json") ? r.json() : parseCsv(await r.text());
}

function useDados() {
 const [d, setD] = useState({ estado: "carregando" });
 useEffect(() => {
  let vivo = true;
  Promise.all([carrega("crypto_market.csv"), carrega("crypto_historico.csv"), carrega("clima_diario.csv"), carrega("economia_diario.csv"), carrega("metadata.json")])
   .then(([mercado, historico, clima, economia, meta]) => vivo && setD({ estado: "ok", mercado, historico, clima, economia, meta }))
   .catch(() => vivo && setD({ estado: "erro" }));
  return () => { vivo = false; };
 }, []);
 return d;
}

// ---------- gráfico ----------
function Linhas({ series, altura = 220, formato }) {
 const W = 640, H = altura, P = { l: 56, r: 12, t: 12, b: 26 };
 const todos = series.flatMap(s => s.pts);
 if (todos.length < 2) return <p className="text-sm text-zinc-500">—</p>;
 const xs = todos.map(p => p.x), ys = todos.map(p => p.y);
 const x0 = Math.min(...xs), x1 = Math.max(...xs);
 let y0 = Math.min(...ys), y1 = Math.max(...ys);
 if (y0 === y1) { y0 -= 1; y1 += 1; }
 const margem = (y1 - y0) * 0.08; y0 -= margem; y1 += margem;
 const X = x => P.l + ((x - x0) / (x1 - x0 || 1)) * (W - P.l - P.r);
 const Y = y => H - P.b - ((y - y0) / (y1 - y0)) * (H - P.t - P.b);
 const ticks = [0, 1, 2, 3].map(i => y0 + ((y1 - y0) * i) / 3);
 const datas = [x0, (x0 + x1) / 2, x1];
 return <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
  {ticks.map((t, i) => <g key={i}>
   <line x1={P.l} x2={W - P.r} y1={Y(t)} y2={Y(t)} stroke="#ffffff" strokeOpacity=".08"/>
   <text x={P.l - 8} y={Y(t) + 4} textAnchor="end" fontSize="11" fill="#a1a1aa">{formato(t)}</text>
  </g>)}
  {datas.map((d, i) => <text key={i} x={X(d)} y={H - 6} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} fontSize="11" fill="#a1a1aa">{new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" })}</text>)}
  {series.map(s => <polyline key={s.nome} fill="none" stroke={s.cor} strokeWidth={s.fino ? 1.5 : 2.5} strokeDasharray={s.fino ? "5 4" : undefined} strokeLinejoin="round" points={s.pts.map(p => `${X(p.x)},${Y(p.y)}`).join(" ")}/>)}
 </svg>;
}

const Cartao = ({ children, className = "" }) => <div className={`rounded-[1.5rem] border border-white/10 bg-white/[.03] p-5 md:p-7 ${className}`}>{children}</div>;
const Rotulo = ({ children }) => <p className="font-mono text-[11px] uppercase tracking-[.25em] text-lime-300">{children}</p>;
const Pct = ({ v }) => v == null ? <span className="text-zinc-500">—</span> : <span className={v >= 0 ? "text-lime-300" : "text-rose-400"}>{v >= 0 ? "+" : ""}{v.toFixed(2)}%</span>;

function Seletor({ itens, valor, onChange }) {
 return <div className="flex flex-wrap gap-2">
  {itens.map(i => <button key={i.id} onClick={() => onChange(i.id)} className={`rounded-full border px-4 py-1.5 text-sm transition ${valor === i.id ? "border-lime-300 bg-lime-300 font-bold text-black" : "border-white/15 text-zinc-300 hover:border-white/40"}`}>{i.nome}</button>)}
 </div>;
}

// ---------- abas do dashboard ----------
function Cripto({ d, t, loc }) {
 const moedas = useMemo(() => d.mercado.filter(r => r.vs_currency === "usd" && r.usd_current_price !== "").sort((a, b) => num(a.market_cap_rank) - num(b.market_cap_rank)), [d]);
 const [id, setId] = useState(() => moedas.find(m => m.coin_id === "bitcoin")?.coin_id || moedas[0]?.coin_id);
 const pts = d.historico.filter(r => r.coin_id === id).map(r => ({ x: Date.parse(r.date), y: num(r.price_usd) })).sort((a, b) => a.x - b.x);
 const usd = new Intl.NumberFormat(loc, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
 const curto = new Intl.NumberFormat(loc, { notation: "compact", maximumFractionDigits: 1 });
 return <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
  <Cartao>
   <Rotulo>{t.mercado}</Rotulo>
   <div className="mt-4 overflow-x-auto">
    <table className="w-full min-w-[460px] text-left text-sm">
     <thead className="text-xs uppercase tracking-wider text-zinc-500"><tr><th className="pb-2 font-normal">{t.moeda}</th><th className="pb-2 text-right font-normal">{t.preco}</th><th className="pb-2 text-right font-normal">24h</th><th className="pb-2 text-right font-normal">7d</th><th className="pb-2 text-right font-normal">30d</th></tr></thead>
     <tbody>{moedas.map(m => <tr key={m.coin_id} onClick={() => setId(m.coin_id)} className={`cursor-pointer border-t border-white/10 transition hover:bg-white/[.05] ${m.coin_id === id ? "bg-white/[.07]" : ""}`}>
      <td className="py-2.5 font-bold">{m.name} <span className="font-normal text-zinc-500">{m.symbol}</span></td>
      <td className="py-2.5 text-right tabular-nums">{usd.format(num(m.usd_current_price))}</td>
      <td className="py-2.5 text-right tabular-nums"><Pct v={num(m.price_change_percentage_24h)}/></td>
      <td className="py-2.5 text-right tabular-nums"><Pct v={num(m.price_change_percentage_7d)}/></td>
      <td className="py-2.5 text-right tabular-nums"><Pct v={num(m.price_change_percentage_30d)}/></td>
     </tr>)}</tbody>
    </table>
   </div>
  </Cartao>
  <Cartao>
   <Rotulo>{t.hist}</Rotulo>
   <p className="mt-3 text-3xl font-black tracking-tight">{moedas.find(m => m.coin_id === id)?.name}</p>
   <div className="mt-4">{pts.length > 1 ? <Linhas series={[{ nome: id, cor: "#bef264", pts }]} formato={v => curto.format(v)}/> : <p className="py-10 text-sm text-zinc-500">{t.sem}</p>}</div>
  </Cartao>
 </div>;
}

function Clima({ d, t, loc }) {
 const cidades = useMemo(() => [...new Set(d.clima.map(r => r.city))], [d]);
 const [cidade, setCidade] = useState(cidades[0]);
 const dias = [...new Set(d.clima.map(r => r.date))].sort();
 const ultimo = dias[dias.length - 1];
 const linhas = d.clima.filter(r => r.city === cidade).sort((a, b) => a.date.localeCompare(b.date));
 const hoje = linhas[linhas.length - 1];
 const ranking = d.clima.filter(r => r.date === ultimo).map(r => ({ city: r.city, v: num(r.temperature_2m_mean) })).sort((a, b) => b.v - a.v);
 const max = Math.max(...ranking.map(r => r.v), 1);
 const f = (v, u, dig = 0) => v == null ? "—" : `${v.toLocaleString(loc, { maximumFractionDigits: dig })}${u}`;
 return <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
  <Cartao>
   <Rotulo>{t.cidade}</Rotulo>
   <div className="mt-4"><Seletor itens={cidades.map(c => ({ id: c, nome: c }))} valor={cidade} onChange={setCidade}/></div>
   {hoje && <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
    {[[t.tmax, f(num(hoje.temperature_2m_max), "°C", 1)], [t.tmin, f(num(hoje.temperature_2m_min), "°C", 1)], [t.chuva, f(num(hoje.precipitation_sum), " mm", 1)], [t.umid, f(num(hoje.relative_humidity_2m_mean), "%")], [t.uv, f(num(hoje.uv_index_max), "", 1)], [t.vento, f(num(hoje.windspeed_10m_max), " km/h", 1)]].map(([k, v]) => <div key={k} className="rounded-2xl bg-white/[.05] p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">{k}</p><p className="mt-1 text-2xl font-black tabular-nums">{v}</p></div>)}
   </div>}
   <p className="mt-4 text-xs text-zinc-500">{t.dia}: {hoje && new Date(hoje.date).toLocaleDateString(loc, { timeZone: "UTC" })} · {hoje?.temp_category} · {hoje?.precip_category}</p>
  </Cartao>
  <Cartao>
   <Rotulo>{t.comparativo}</Rotulo>
   <ul className="mt-5 space-y-2.5">
    {ranking.map(r => <li key={r.city} onClick={() => setCidade(r.city)} className="grid cursor-pointer grid-cols-[110px_1fr_52px] items-center gap-3 text-sm">
     <span className={r.city === cidade ? "font-bold text-lime-300" : "text-zinc-300"}>{r.city}</span>
     <span className="h-2.5 rounded-full bg-white/10"><span className="block h-full rounded-full bg-lime-300" style={{ width: `${(r.v / max) * 100}%` }}/></span>
     <span className="text-right tabular-nums">{f(r.v, "°", 1)}</span>
    </li>)}
   </ul>
  </Cartao>
 </div>;
}

function Economia({ d, t, loc }) {
 const series = useMemo(() => {
  const m = new Map();
  d.economia.forEach(r => { if (!m.has(r.series_name)) m.set(r.series_name, { id: r.series_name, nome: r.series_description || r.series_name, unidade: r.unit, linhas: [] }); m.get(r.series_name).linhas.push(r); });
  return [...m.values()];
 }, [d]);
 const [id, setId] = useState(() => (series.find(s => s.id === "selic") || series[0])?.id);
 const s = series.find(x => x.id === id);
 const linhas = s ? s.linhas.slice().sort((a, b) => a.date.localeCompare(b.date)) : [];
 const ult = linhas[linhas.length - 1];
 const nf = new Intl.NumberFormat(loc, { maximumFractionDigits: 4 });
 const ptsV = linhas.filter(r => num(r.value) != null).map(r => ({ x: Date.parse(r.date), y: num(r.value) }));
 const faixa = ptsV.length ? Math.max(...ptsV.map(p => p.y)) - Math.min(...ptsV.map(p => p.y)) : 1;
 const nfAx = new Intl.NumberFormat(loc, { maximumFractionDigits: faixa < 0.01 ? 5 : faixa < 1 ? 4 : faixa < 20 ? 2 : 0 });
 const ptsM = linhas.filter(r => num(r.ma_7d) != null).map(r => ({ x: Date.parse(r.date), y: num(r.ma_7d) }));
 return <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
  <Cartao>
   <Rotulo>{t.indicador}</Rotulo>
   <div className="mt-4 max-h-[300px] overflow-y-auto pr-1"><Seletor itens={series.map(x => ({ id: x.id, nome: x.nome }))} valor={id} onChange={setId}/></div>
  </Cartao>
  <Cartao>
   {ult && <>
    <p className="text-sm text-zinc-400">{s.nome}</p>
    <p className="mt-1 text-4xl font-black tracking-tight tabular-nums">{nf.format(num(ult.value))} {!/percentual|_/.test(s.unidade || "") && <span className="text-lg font-normal text-zinc-500">{s.unidade}</span>}</p>
    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400">
     <span>{t.var30}: <Pct v={num(ult.pct_change_30d)}/></span>
     <span>{t.media7}: {num(ult.ma_7d) == null ? "—" : nf.format(num(ult.ma_7d))}</span>
     <span>{t.alerta}: <b className={ult.alert === "Normal" ? "text-zinc-200" : "text-amber-300"}>{ult.alert || "—"}</b></span>
    </div>
    <div className="mt-4"><Linhas series={[{ nome: "valor", cor: "#bef264", pts: ptsV }, { nome: "ma7", cor: "#fbbf24", pts: ptsM, fino: true }]} formato={v => nfAx.format(v)}/></div>
    <p className="mt-1 flex gap-4 text-xs text-zinc-500"><span><i className="mr-1 inline-block h-0.5 w-4 bg-lime-300 align-middle"/>{t.valor}</span><span><i className="mr-1 inline-block h-0.5 w-4 bg-amber-400 align-middle"/>{t.media7}</span></p>
   </>}
  </Cartao>
 </div>;
}

function Dashboard({ t, lang }) {
 const d = useDados();
 const [aba, setAba] = useState("cripto");
 const loc = lang === "pt" ? "pt-BR" : "en-US";
 return <section className="mt-20">
  <Rotulo>{t.dash}</Rotulo>
  <h2 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-6xl">{t.dash}</h2>
  <p className="mt-3 max-w-xl text-zinc-400">{t.dashSub}</p>
  <div className="mt-8"><Seletor itens={Object.entries(t.abas).map(([id, nome]) => ({ id, nome }))} valor={aba} onChange={setAba}/></div>
  <div className="mt-6">
   {d.estado === "carregando" && <p className="py-16 text-zinc-500">{t.carregando}</p>}
   {d.estado === "erro" && <p className="py-16 text-rose-400">{t.erro}</p>}
   {d.estado === "ok" && (aba === "cripto" ? <Cripto d={d} t={t} loc={loc}/> : aba === "clima" ? <Clima d={d} t={t} loc={loc}/> : <Economia d={d} t={t} loc={loc}/>)}
  </div>
 </section>;
}

// ---------- widget ao vivo ----------
function WidgetVivo({ t, lang, fallback }) {
 const [estado, setEstado] = useState("loading");
 const [dado, setDado] = useState(null);
 const loc = lang === "pt" ? "pt-BR" : "en-US";
 const busca = async () => {
  setEstado("loading");
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 12000);
  try {
   const r = await fetch(COINGECKO, { signal: ctrl.signal });
   if (!r.ok) throw new Error(r.status);
   const j = (await r.json()).bitcoin;
   setDado({ preco: j.usd, var: j.usd_24h_change, em: j.last_updated_at * 1000 }); setEstado("live");
  } catch { setEstado("error"); }
  finally { clearTimeout(to); }
 };
 useEffect(() => { busca(); const id = setInterval(busca, 60000); return () => clearInterval(id); }, []);
 const mostra = estado === "live" ? dado : fallback;
 const rotulo = estado === "live" ? t.aoVivo : estado === "loading" ? t.conectando : t.semConexao;
 const cor = estado === "live" ? "bg-lime-300" : estado === "loading" ? "bg-amber-300" : "bg-rose-400";
 return <div className="mx-auto w-full max-w-[340px] rounded-[1.75rem] border border-white/15 bg-[#0b0b0b] p-6 shadow-2xl shadow-black/60">
  <div className="flex items-center justify-between text-xs">
   <span className="font-mono tracking-[.25em] text-zinc-400">BTC / USD</span>
   <span className="flex items-center gap-2 font-mono tracking-widest text-zinc-300"><i className={`h-2 w-2 rounded-full ${cor} ${estado === "live" ? "animate-pulse" : ""}`}/>{rotulo}</span>
  </div>
  <p className="mt-8 text-4xl font-black tracking-tight tabular-nums sm:text-[2.6rem]">{mostra ? new Intl.NumberFormat(loc, { style: "currency", currency: "USD" }).format(mostra.preco) : "—"}</p>
  <p className="mt-2 text-sm text-zinc-400">{t.var24}: {mostra ? <Pct v={mostra.var}/> : "—"}</p>
  <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
   <span>{mostra?.em ? new Date(mostra.em).toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }) : ""}</span>
   <button onClick={busca} disabled={estado === "loading"} aria-label={t.atualizar} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-zinc-300 transition hover:border-white/40 disabled:opacity-50"><RefreshCw size={13} className={estado === "loading" ? "animate-spin" : ""}/>{t.atualizar}</button>
  </div>
  {estado === "error" && <p className="mt-4 text-xs leading-relaxed text-amber-300">{t.usandoPipeline}</p>}
 </div>;
}

// ---------- página ----------
export default function Pipeline({ lang, setLang }) {
 const t = TXT[lang] || TXT.pt;
 const [meta, setMeta] = useState(null);
 const [btc, setBtc] = useState(null);
 useEffect(() => { window.scrollTo(0, 0); }, []);
 useEffect(() => {
  carrega("metadata.json").then(setMeta).catch(() => {});
  carrega("crypto_market.csv").then(rs => { const r = rs.find(x => x.coin_id === "bitcoin" && x.vs_currency === "usd"); if (r) setBtc({ preco: num(r.usd_current_price), var: num(r.price_change_percentage_24h), em: Date.parse(r.last_updated) }); }).catch(() => {});
 }, []);
 const loc = lang === "pt" ? "pt-BR" : "en-US";
 const quando = meta?.generated_at ? new Date(meta.generated_at + "Z").toLocaleString(loc, { dateStyle: "medium", timeStyle: "short" }) : "—";
 const icones = [Cloud, Database, Coins, Landmark];

 return <main className="min-h-screen overflow-x-hidden bg-[#101010] text-white selection:bg-lime-300 selection:text-black">
  <div className="pointer-events-none fixed -right-40 top-10 h-[480px] w-[480px] rounded-full bg-lime-300/10 blur-[140px]"/>
  <div className="relative mx-auto max-w-[1200px] px-5 py-7 md:px-10 md:py-9">
   <header className="flex items-center justify-between">
    <a href="#/" className="flex items-center gap-2 text-sm font-black tracking-tight"><ArrowLeft size={16}/>{t.voltar}</a>
    <div className="flex items-center gap-4">
     <a href="#/estudos" className="hidden text-sm text-zinc-400 transition hover:text-white sm:inline">{lang === "pt" ? "Estudos" : "Studies"}</a>
     <LangSwitch lang={lang} setLang={setLang}/>
    </div>
   </header>

   <div className="mt-16 md:mt-24">
    <Rotulo>{t.eyebrow}</Rotulo>
    <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.92] tracking-[-.05em] md:text-8xl">{t.titulo}</h1>
    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">{t.lead}</p>
    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400">
     {[["10", t.cidades], ["10", t.moedas], ["15", t.series], ["3", t.apis]].map(([n, k]) => <span key={k}><b className="text-2xl font-black text-white">{n}</b> {k}</span>)}
    </div>
    <p className="mt-4 text-xs text-zinc-500">{t.atualizado}: {quando}</p>
   </div>

   <Dashboard t={t} lang={lang}/>

   <section className="mt-24">
    <Rotulo>{t.arquitetura}</Rotulo>
    <h2 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-6xl">{t.arquitetura}</h2>
    <p className="mt-3 max-w-xl text-zinc-400">{t.arqSub}</p>
    <ol className="mt-8 grid gap-4 md:grid-cols-4">
     {t.etapas.map(([n, titulo, texto], i) => { const Ic = icones[i]; return <li key={n} className="rounded-[1.5rem] border border-white/10 p-6">
      <div className="flex items-center justify-between"><span className="font-mono text-sm text-lime-300">{n}</span><Ic size={22} className="text-zinc-500"/></div>
      <h3 className="mt-5 text-2xl font-black tracking-tight">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{texto}</p>
     </li>; })}
    </ol>

    <h3 className="mt-14 text-2xl font-black tracking-tight">{t.fontes}</h3>
    <div className="mt-5 overflow-x-auto rounded-[1.5rem] border border-white/10">
     <table className="w-full min-w-[560px] text-left text-sm">
      <thead className="bg-white/[.04] text-xs uppercase tracking-wider text-zinc-500"><tr>{t.fonteCab.map(c => <th key={c} className="px-5 py-3 font-normal">{c}</th>)}</tr></thead>
      <tbody>{t.fonteLinhas.map(l => <tr key={l[0]} className="border-t border-white/10"><td className="px-5 py-3.5 font-bold">{l[0]}</td><td className="px-5 py-3.5 text-zinc-300">{l[1]}</td><td className="px-5 py-3.5 text-zinc-400">{l[2]}</td></tr>)}</tbody>
     </table>
    </div>
    <h3 className="mt-10 text-2xl font-black tracking-tight">{t.stack}</h3>
    <div className="mt-4 flex flex-wrap gap-2">{STACK.map(s => <span key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">{s}</span>)}</div>
   </section>

   <section className="mt-24 grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[.03] p-6 md:grid-cols-2 md:p-12">
    <div>
     <Rotulo>{t.widgetEyebrow}</Rotulo>
     <h2 className="mt-3 flex items-center gap-3 text-4xl font-black tracking-[-.04em] md:text-5xl"><Monitor size={36} className="shrink-0 text-lime-300"/>{t.widgetTitulo}</h2>
     <p className="mt-5 leading-relaxed text-zinc-400">{t.widgetTexto}</p>
     <a href={WIDGET} download className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-bold text-black transition hover:bg-lime-200"><Download size={18}/>{t.baixar}</a>
     <p className="mt-4 max-w-md text-xs leading-relaxed text-zinc-500">{t.baixarNota}</p>
    </div>
    <WidgetVivo t={t} lang={lang} fallback={btc}/>
   </section>

   <section className="mt-24 pb-16">
    <Rotulo>{t.arquivos}</Rotulo>
    <h2 className="mt-3 text-4xl font-black tracking-[-.04em] md:text-5xl">{t.arquivos}</h2>
    <p className="mt-3 max-w-xl text-zinc-400">{t.arquivosSub}</p>
    <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
     {t.arquivosLista.map(([arq, desc]) => <li key={arq}><a href={DADOS + arq} download className="group flex items-center justify-between gap-4 py-4 transition hover:text-lime-300"><span><b className="font-mono text-sm">{arq}</b><span className="ml-3 text-sm text-zinc-500">{desc}</span></span><Download size={18} className="shrink-0 text-zinc-500 transition group-hover:text-lime-300"/></a></li>)}
    </ul>
   </section>
  </div>
 </main>;
}
