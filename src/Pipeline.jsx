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
  linhaVelas: ["Linha", "Velas"], velasAviso: "Velas diárias ao vivo (CoinGecko). Experimento: a API gratuita tem limite de requisições.", velasCarregando: "Buscando velas…", velasErro: "Velas indisponíveis agora (limite da API). Tente de novo em instantes.", velasLegenda: "Cada vela mostra abertura, máxima, mínima e fechamento do dia. Verde: fechou acima da abertura.",
  mapaTitulo: "Mapa de temperatura", mapaSub: "Temperatura média do dia. Clique numa cidade.", mapaEscala: "°C",
  grupos: { cambio: "Câmbio", juros: "Juros", inflacao: "Inflação", atividade: "Atividade e emprego", contas: "Contas públicas e externas" },
  emMes: "no mês", em30: "em 30 dias", em12: "em 12 meses", acum12: "acumulado em 12 meses", alertaNormal: "dentro do padrão", alertaAlerta: "fora do padrão (±2σ)",
  detalheJanela: { daily: "Últimos 6 meses", monthly: "Últimos 36 meses" }, mediaMovel: "Média de 30 dias", acumulado: "Acumulado 12 meses", mensal: "Variação mensal",
  atualizadoEm: "Dado de",
  agora: "Agora", agoraEm: "Medido às", sensacao: "Sensação", mapaSubAgora: "Temperatura de agora, atualizada a cada 5 minutos. Clique numa cidade.", agoraErro: "Tempo real indisponível; mostrando a média do dia do pipeline.", mediaDia: "média do dia",
  wmo: { 0: "Céu limpo", 1: "Quase limpo", 2: "Parcialmente nublado", 3: "Nublado", 45: "Neblina", 48: "Neblina", 51: "Garoa fraca", 53: "Garoa", 55: "Garoa forte", 61: "Chuva fraca", 63: "Chuva", 65: "Chuva forte", 80: "Pancadas fracas", 81: "Pancadas", 82: "Pancadas fortes", 95: "Trovoadas", 96: "Trovoadas com granizo", 99: "Trovoadas com granizo" },
  coletadoEm: "Coletado em", ultimoDado: "Dado mais recente", ate: "a",
  dividaDif: "Diferença (ativos do governo)", dividaTabela: "Últimos 12 meses", mes: "Mês", bruta: "Bruta", liquida: "Líquida",
  notas: {
   dolar_venda: "Cotação de venda do dólar comercial, divulgada pelo Banco Central (PTAX). Quanto maior, mais caro o dólar em reais.",
   euro_venda: "Cotação de venda do euro em reais, divulgada pelo Banco Central.",
   reservas: "Dólares e ativos externos guardados pelo Banco Central. Funcionam como colchão contra choques no câmbio.",
   selic_meta: "Taxa básica de juros definida pelo Copom. Só muda nas reuniões, por isso o gráfico anda em degraus.",
   cdi_anual: "Taxa dos empréstimos entre bancos, quase igual à Selic. Aqui, a média anualizada de cada mês.",
   ipca_mensal: "Inflação oficial do mês. As barras são a variação mensal; a linha amarela, o acumulado dos últimos 12 meses (eixo à direita).",
   ipca_12m: "Inflação oficial acumulada nos últimos 12 meses, a medida usada para comparar com a meta de inflação.",
   igpm_mensal: "Índice usado em reajustes de aluguel e contratos. As barras são a variação mensal; a linha, o acumulado em 12 meses.",
   ibc_br: "Índice de atividade econômica do Banco Central, uma prévia mensal do PIB. Base 100 = 2002.",
   desemprego: "Percentual da força de trabalho sem emprego, segundo a PNAD Contínua do IBGE.",
   divida_bruta: "Tudo que o governo geral (União, estados e municípios) deve, como proporção do PIB. O gráfico compara com a dívida líquida.",
   divida_liquida: "Dívida do setor público menos seus ativos (como reservas e créditos), como proporção do PIB. O gráfico compara com a dívida bruta."
  },
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
   ["CoinGecko", "Preço, valor de mercado, volume e variação 24h/7d/30d de 7 criptomoedas", "A cada 3 horas"],
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
  linhaVelas: ["Line", "Candles"], velasAviso: "Live daily candles (CoinGecko). Experiment: the free API has a request limit.", velasCarregando: "Fetching candles…", velasErro: "Candles unavailable right now (API limit). Try again in a moment.", velasLegenda: "Each candle shows the day's open, high, low and close. Green: closed above the open.",
  mapaTitulo: "Temperature map", mapaSub: "Mean temperature of the day. Click a city.", mapaEscala: "°C",
  grupos: { cambio: "Exchange rates", juros: "Interest rates", inflacao: "Inflation", atividade: "Activity and jobs", contas: "Public accounts and external" },
  emMes: "month over month", em30: "in 30 days", em12: "in 12 months", acum12: "accumulated in 12 months", alertaNormal: "within the usual range", alertaAlerta: "outside the usual range (±2σ)",
  detalheJanela: { daily: "Last 6 months", monthly: "Last 36 months" }, mediaMovel: "30-day average", acumulado: "12-month accumulated", mensal: "Monthly change",
  atualizadoEm: "Data from",
  agora: "Now", agoraEm: "Measured at", sensacao: "Feels like", mapaSubAgora: "Temperature right now, refreshed every 5 minutes. Click a city.", agoraErro: "Real time unavailable; showing the pipeline's daily mean.", mediaDia: "daily mean",
  wmo: { 0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 80: "Light showers", 81: "Showers", 82: "Heavy showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with hail" },
  coletadoEm: "Collected on", ultimoDado: "Latest data point", ate: "to",
  dividaDif: "Difference (government assets)", dividaTabela: "Last 12 months", mes: "Month", bruta: "Gross", liquida: "Net",
  notas: {
   dolar_venda: "Selling rate of the commercial dollar, published by the Central Bank (PTAX). The higher it is, the more expensive the dollar is in reais.",
   euro_venda: "Selling rate of the euro in reais, published by the Central Bank.",
   reservas: "Dollars and foreign assets held by the Central Bank. They work as a cushion against exchange-rate shocks.",
   selic_meta: "Benchmark interest rate set by the Copom. It only changes at its meetings, so the chart moves in steps.",
   cdi_anual: "Rate on loans between banks, nearly equal to Selic. Here, the annualized average of each month.",
   ipca_mensal: "Official inflation for the month. Bars are the monthly change; the amber line is the 12-month accumulation (right axis).",
   ipca_12m: "Official inflation accumulated over the last 12 months, the measure compared against the inflation target.",
   igpm_mensal: "Index used for rent and contract adjustments. Bars are the monthly change; the line is the 12-month accumulation.",
   ibc_br: "The Central Bank economic activity index, a monthly preview of GDP. Base 100 = 2002.",
   desemprego: "Share of the labor force without a job, according to IBGE PNAD Contínua.",
   divida_bruta: "Everything the general government (federal, states and cities) owes, as a share of GDP. The chart compares it with net debt.",
   divida_liquida: "Public sector debt minus its assets (such as reserves and credits), as a share of GDP. The chart compares it with gross debt."
  },
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
   ["CoinGecko", "Price, market cap, volume and 24h/7d/30d change for 7 cryptocurrencies", "Every 3 hours"],
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
 const longo = (x1 - x0) / 864e5 > 120;
 const fmtX = d => new Date(d).toLocaleDateString("pt-BR", longo ? { month: "short", year: "2-digit", timeZone: "UTC" } : { day: "2-digit", month: "2-digit", timeZone: "UTC" });
 const datas = [0, 1, 2, 3, 4].map(i => x0 + ((x1 - x0) * i) / 4);
 return <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
  {ticks.map((t, i) => <g key={i}>
   <line x1={P.l} x2={W - P.r} y1={Y(t)} y2={Y(t)} stroke="#ffffff" strokeOpacity=".08"/>
   <text x={P.l - 8} y={Y(t) + 4} textAnchor="end" fontSize="11" fill="#a1a1aa">{formato(t)}</text>
  </g>)}
  {datas.map((d, i) => <text key={i} x={X(d)} y={H - 6} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} fontSize="11" fill="#a1a1aa">{fmtX(d)}</text>)}
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
// ---------- velas (candlestick) ----------
function Velas({ id, t, loc }) {
 const [estado, setEstado] = useState("loading");
 const [velas, setVelas] = useState([]);
 useEffect(() => {
  let vivo = true; setEstado("loading");
  const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 12000);
  fetch(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=30`, { signal: ctrl.signal })
   .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
   .then(rows => {
    // a API devolve velas de 4h; agrupa por dia (UTC) para ficarem legíveis
    const dias = new Map();
    rows.forEach(([ts, o, h, l, c]) => {
     const d = new Date(ts).toISOString().slice(0, 10);
     const v = dias.get(d);
     if (!v) dias.set(d, { d, o, h, l, c });
     else { v.h = Math.max(v.h, h); v.l = Math.min(v.l, l); v.c = c; }
    });
    if (vivo) { setVelas([...dias.values()]); setEstado("ok"); }
   })
   .catch(() => vivo && setEstado("erro"))
   .finally(() => clearTimeout(to));
  return () => { vivo = false; clearTimeout(to); ctrl.abort(); };
 }, [id]);

 if (estado === "loading") return <p className="py-10 text-sm text-zinc-500">{t.velasCarregando}</p>;
 if (estado === "erro" || velas.length < 2) return <p className="py-10 text-sm text-amber-300">{t.velasErro}</p>;
 const W = 640, H = 240, P = { l: 56, r: 12, t: 12, b: 26 };
 const lo = Math.min(...velas.map(v => v.l)), hi = Math.max(...velas.map(v => v.h));
 const mg = (hi - lo) * 0.06, y0 = lo - mg, y1 = hi + mg;
 const Y = v => H - P.b - ((v - y0) / (y1 - y0)) * (H - P.t - P.b);
 const passo = (W - P.l - P.r) / velas.length, larg = Math.max(3, passo * 0.62);
 const curto = new Intl.NumberFormat(loc, { notation: "compact", maximumFractionDigits: 1 });
 const ticks = [0, 1, 2, 3].map(i => y0 + ((y1 - y0) * i) / 3);
 return <div>
  <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
   {ticks.map((tk, i) => <g key={i}><line x1={P.l} x2={W - P.r} y1={Y(tk)} y2={Y(tk)} stroke="#fff" strokeOpacity=".08"/><text x={P.l - 8} y={Y(tk) + 4} textAnchor="end" fontSize="11" fill="#a1a1aa">{curto.format(tk)}</text></g>)}
   {velas.map((v, i) => {
    const x = P.l + passo * i + passo / 2, alta = v.c >= v.o, cor = alta ? "#bef264" : "#fb7185";
    return <g key={v.d}>
     <line x1={x} x2={x} y1={Y(v.h)} y2={Y(v.l)} stroke={cor} strokeWidth="1.5"/>
     <rect x={x - larg / 2} y={Math.min(Y(v.o), Y(v.c))} width={larg} height={Math.max(1.5, Math.abs(Y(v.o) - Y(v.c)))} fill={cor} rx="1"/>
     <title>{`${v.d}\nO ${v.o.toFixed(2)}  H ${v.h.toFixed(2)}\nL ${v.l.toFixed(2)}  C ${v.c.toFixed(2)}`}</title>
    </g>;
   })}
   {[0, Math.floor(velas.length / 2), velas.length - 1].map((i, k) => <text key={i} x={P.l + passo * i + passo / 2} y={H - 6} textAnchor={k === 0 ? "start" : k === 2 ? "end" : "middle"} fontSize="11" fill="#a1a1aa">{new Date(velas[i].d).toLocaleDateString(loc, { day: "2-digit", month: "2-digit", timeZone: "UTC" })}</text>)}
  </svg>
  <p className="mt-2 text-xs text-zinc-500">{t.velasLegenda}</p>
 </div>;
}

// ---------- cripto ----------
function Cripto({ d, t, loc }) {
 const moedas = useMemo(() => d.mercado.filter(r => r.vs_currency === "usd" && r.usd_current_price !== "").sort((a, b) => num(a.market_cap_rank) - num(b.market_cap_rank)), [d]);
 const [id, setId] = useState(() => moedas.find(m => m.coin_id === "bitcoin")?.coin_id || moedas[0]?.coin_id);
 const [modo, setModo] = useState("linha");
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
   <div className="flex items-start justify-between gap-3">
    <div><Rotulo>{modo === "linha" ? t.hist : "OHLC · 30d"}</Rotulo><p className="mt-3 text-3xl font-black tracking-tight">{moedas.find(m => m.coin_id === id)?.name}</p></div>
    <div className="flex shrink-0 gap-1 rounded-full border border-white/15 p-1 text-xs">{["linha", "velas"].map((m, i) => <button key={m} onClick={() => setModo(m)} className={`rounded-full px-3 py-1 transition ${modo === m ? "bg-lime-300 font-bold text-black" : "text-zinc-300 hover:text-white"}`}>{t.linhaVelas[i]}</button>)}</div>
   </div>
   <div className="mt-4">{modo === "velas"
    ? <Velas id={id} t={t} loc={loc}/>
    : pts.length > 1 ? <Linhas series={[{ nome: id, cor: "#bef264", pts }]} formato={v => curto.format(v)}/> : <p className="py-10 text-sm text-zinc-500">{t.sem}</p>}</div>
  </Cartao>
 </div>;
}

// ---------- mapa do Brasil ----------
function MapaBrasil({ cidades, selecionada, onSelect, t, loc }) {
 const [anel, setAnel] = useState([]);
 useEffect(() => { fetch(DADOS + "brasil-uf.json").then(r => r.json()).then(setAnel).catch(() => {}); }, []);
 const W = 420, H = 440, LON = [-74, -34], LAT = [-34, 5.5];
 // projecao equiretangular com correcao pela latitude media
 const k = Math.cos((-14 * Math.PI) / 180);
 const sx = (W - 16) / ((LON[1] - LON[0]) * k), sy = (H - 16) / (LAT[1] - LAT[0]), s = Math.min(sx, sy);
 const X = lon => 8 + (lon - LON[0]) * k * s, Y = lat => 8 + (LAT[1] - lat) * s;
 const caminhos = useMemo(() => anel.map(r => "M" + r.map(([lo, la]) => `${X(lo).toFixed(1)},${Y(la).toFixed(1)}`).join("L") + "Z"), [anel]);
 const vs = cidades.map(c => c.v), mn = Math.min(...vs), mx = Math.max(...vs);
 // escala sequencial azul -> amarelo -> vermelho
 const cor = v => { const f = (v - mn) / (mx - mn || 1); const h = 210 - f * 210; return `hsl(${h} 85% ${52 + (f > .5 ? -4 : 0)}%)`; };
 return <div>
  <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[420px]" role="img">
   {caminhos.map((d, i) => <path key={i} d={d} fill="#ffffff" fillOpacity=".05" stroke="#ffffff" strokeOpacity=".22" strokeWidth=".8"/>)}
   {cidades.map(c => <g key={c.city} onClick={() => onSelect(c.city)} className="cursor-pointer">
    <circle cx={X(c.lon)} cy={Y(c.lat)} r={c.city === selecionada ? 13 : 10} fill={cor(c.v)} stroke={c.city === selecionada ? "#fff" : "#000"} strokeOpacity={c.city === selecionada ? 1 : .5} strokeWidth="2"/>
    <text x={X(c.lon)} y={Y(c.lat) + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#101010" pointerEvents="none">{Math.round(c.v)}</text>
    {c.city === selecionada && <text x={X(c.lon)} y={Y(c.lat) - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="#bef264" pointerEvents="none">{c.city}</text>}
    <title>{`${c.city}: ${c.v.toFixed(1)}°C`}</title>
   </g>)}
  </svg>
  <div className="mx-auto mt-3 flex max-w-[420px] items-center gap-3 text-xs text-zinc-400">
   <span className="tabular-nums">{mn.toFixed(0)}{t.mapaEscala}</span>
   <span className="h-2 flex-1 rounded-full" style={{ background: "linear-gradient(90deg,hsl(210 85% 52%),hsl(150 85% 52%),hsl(60 85% 52%),hsl(0 85% 48%))" }}/>
   <span className="tabular-nums">{mx.toFixed(0)}{t.mapaEscala}</span>
  </div>
 </div>;
}

// ---------- clima ----------
// Temperatura de agora direto da Open-Meteo (uma requisicao para todas as cidades).
function useAgora(pontos) {
 const [estado, setEstado] = useState({ ok: false, erro: false, por: {} });
 const chave = pontos.map(p => `${p.lat},${p.lon}`).join("|");
 useEffect(() => {
  if (!pontos.length) return;
  let vivo = true;
  const busca = () => {
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${pontos.map(p => p.lat).join(",")}&longitude=${pontos.map(p => p.lon).join(",")}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`;
   fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(j => {
    const lista = Array.isArray(j) ? j : [j];
    const por = {}; pontos.forEach((p, i) => { if (lista[i]?.current) por[p.city] = lista[i].current; });
    if (vivo) setEstado({ ok: Object.keys(por).length > 0, erro: false, por });
   }).catch(() => vivo && setEstado(s => ({ ...s, erro: !s.ok })));
  };
  busca(); const id = setInterval(busca, 300000);
  return () => { vivo = false; clearInterval(id); };
 }, [chave]);
 return estado;
}

function Clima({ d, t, loc }) {
 const cidades = useMemo(() => [...new Set(d.clima.map(r => r.city))], [d]);
 const [cidade, setCidade] = useState(cidades[0]);
 const dias = [...new Set(d.clima.map(r => r.date))].sort();
 const ultimo = dias[dias.length - 1];
 const linhas = d.clima.filter(r => r.city === cidade).sort((a, b) => a.date.localeCompare(b.date));
 const hoje = linhas[linhas.length - 1];
 const pontos = d.clima.filter(r => r.date === ultimo).map(r => ({ city: r.city, lat: num(r.latitude), lon: num(r.longitude), v: num(r.temperature_2m_mean) }));
 const f = (v, u, dig = 0) => v == null ? "—" : `${v.toLocaleString(loc, { maximumFractionDigits: dig })}${u}`;
 const agora = useAgora(pontos);
 const cur = agora.por[cidade];
 const pontosMapa = pontos.map(p => ({ ...p, v: agora.por[p.city]?.temperature_2m ?? p.v }));
 return <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
  <Cartao>
   <Rotulo>{t.mapaTitulo}</Rotulo>
   <p className="mt-2 mb-4 text-sm text-zinc-400">{agora.ok ? t.mapaSubAgora : t.mapaSub}</p>
   {agora.erro && <p className="mb-3 text-xs text-amber-300">{t.agoraErro}</p>}
   <MapaBrasil cidades={pontosMapa} selecionada={cidade} onSelect={setCidade} t={t} loc={loc}/>
  </Cartao>
  <Cartao>
   <Rotulo>{t.cidade}</Rotulo>
   <p className="mt-3 text-3xl font-black tracking-tight">{cidade}</p>
   {cur && <div className="mt-4 rounded-2xl border border-lime-300/30 bg-lime-300/[.06] p-5">
    <div className="flex items-end justify-between gap-4">
     <div><p className="text-xs uppercase tracking-wider text-lime-300">{t.agora}</p><p className="mt-1 text-5xl font-black tabular-nums tracking-tight">{f(cur.temperature_2m, "°C", 1)}</p></div>
     <div className="text-right text-sm text-zinc-300"><p>{t.wmo[cur.weather_code] || "—"}</p><p className="mt-1 text-xs text-zinc-500">{t.sensacao} {f(cur.apparent_temperature, "°C", 1)}</p></div>
    </div>
    <p className="mt-3 text-xs text-zinc-400">{t.umid} {f(cur.relative_humidity_2m, "%")} · {t.vento.replace(" máx", "").replace("Max ", "")} {f(cur.wind_speed_10m, " km/h", 1)} · {t.chuva} {f(cur.precipitation, " mm", 1)} · {t.agoraEm} {cur.time.slice(11, 16)}</p>
   </div>}
   {hoje && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
    {[[t.tmax, f(num(hoje.temperature_2m_max), "°C", 1)], [t.tmin, f(num(hoje.temperature_2m_min), "°C", 1)], [t.chuva, f(num(hoje.precipitation_sum), " mm", 1)], [t.umid, f(num(hoje.relative_humidity_2m_mean), "%")], [t.uv, f(num(hoje.uv_index_max), "", 1)], [t.vento, f(num(hoje.windspeed_10m_max), " km/h", 1)]].map(([k, v]) => <div key={k} className="rounded-2xl bg-white/[.05] p-4"><p className="text-xs uppercase tracking-wider text-zinc-500">{k}</p><p className="mt-1 text-2xl font-black tabular-nums">{v}</p></div>)}
   </div>}
   <p className="mt-4 text-xs text-zinc-500">{t.dia}: {hoje && new Date(hoje.date).toLocaleDateString(loc, { timeZone: "UTC" })} · {hoje?.temp_category} · {hoje?.precip_category}</p>
   <div className="mt-6">
    <Seletor itens={cidades.map(c => ({ id: c, nome: c }))} valor={cidade} onChange={setCidade}/>
   </div>
  </Cartao>
 </div>;
}

// ---------- economia: cada indicador com a formula do seu tipo ----------
const GRUPOS = [
 ["cambio", ["dolar_venda", "euro_venda"]],
 ["juros", ["selic_meta", "cdi_anual"]],
 ["inflacao", ["ipca_mensal", "ipca_12m", "igpm_mensal"]],
 ["atividade", ["ibc_br", "desemprego"]],
 ["contas", ["divida_bruta", "divida_liquida", "reservas"]]
];

function fmtValor(v, s, loc) {
 if (v == null) return "—";
 const dec = s.decimals;
 const n = new Intl.NumberFormat(loc, { minimumFractionDigits: dec, maximumFractionDigits: dec });
 if (s.unidade === "R$") return `R$ ${n.format(v)}`;
 if (s.unidade.startsWith("US$")) return `US$ ${new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(v / 1000)} bi`;
 if (s.unidade.startsWith("%")) return `${n.format(v)}%`;
 return n.format(v);
}
function fmtDelta(v, unid, loc) {
 if (v == null) return null;
 const n = new Intl.NumberFormat(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" });
 return unid === "%" ? `${n.format(v)}%` : `${n.format(v)} p.p.`;
}
const seta = v => v == null || Math.abs(v) < 1e-9 ? "→" : v > 0 ? "▲" : "▼";

function Mini({ pts, cor = "#bef264", w = 120, h = 34 }) {
 if (pts.length < 2) return null;
 const ys = pts.map(p => p.y), lo = Math.min(...ys), hi = Math.max(...ys), r = hi - lo || 1;
 const X = i => (i / (pts.length - 1)) * w, Y = y => h - 3 - ((y - lo) / r) * (h - 6);
 return <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-28" aria-hidden="true"><polyline fill="none" stroke={cor} strokeWidth="2" strokeLinejoin="round" points={pts.map((p, i) => `${X(i)},${Y(p.y)}`).join(" ")}/></svg>;
}

function Barras({ barras, linha, formato }) {
 const W = 640, H = 230, P = { l: 48, r: linha.length ? 48 : 12, t: 12, b: 26 };
 const vs = barras.map(b => b.y);
 const lo = Math.min(0, ...vs), hi = Math.max(0, ...vs), mg = (hi - lo) * 0.08;
 const y0 = lo - (lo < 0 ? mg : 0), y1 = hi + mg;
 const Y = v => H - P.b - ((v - y0) / (y1 - y0)) * (H - P.t - P.b);
 // a linha (acumulado em 12 meses) tem ordem de grandeza diferente: eixo proprio, a direita
 const lv = linha.map(l => l.y), l0 = Math.min(...lv, 0), l1 = Math.max(...lv, 0.01), lm = (l1 - l0) * 0.08;
 const YL = v => H - P.b - ((v - (l0 - lm)) / ((l1 + lm) - (l0 - lm))) * (H - P.t - P.b);
 const passo = (W - P.l - P.r) / barras.length, larg = Math.max(2, passo * 0.64);
 const ticks = [0, 1, 2, 3].map(i => y0 + ((y1 - y0) * i) / 3);
 const cx = i => P.l + passo * i + passo / 2;
 const idx = new Map(barras.map((b, i) => [b.x, i]));
 const pl = linha.filter(l => idx.has(l.x)).map(l => `${cx(idx.get(l.x))},${YL(l.y)}`).join(" ");
 return <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
  {ticks.map((tk, i) => <g key={i}><line x1={P.l} x2={W - P.r} y1={Y(tk)} y2={Y(tk)} stroke="#fff" strokeOpacity=".08"/><text x={P.l - 8} y={Y(tk) + 4} textAnchor="end" fontSize="11" fill="#a1a1aa">{formato(tk)}</text></g>)}
  <line x1={P.l} x2={W - P.r} y1={Y(0)} y2={Y(0)} stroke="#fff" strokeOpacity=".3"/>
  {barras.map((b, i) => <rect key={b.x} x={cx(i) - larg / 2} y={Math.min(Y(0), Y(b.y))} width={larg} height={Math.max(1, Math.abs(Y(b.y) - Y(0)))} fill={b.y >= 0 ? "#bef264" : "#fb7185"} rx="1.5"><title>{`${new Date(b.x).toLocaleDateString("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" })}: ${formato(b.y)}`}</title></rect>)}
  {pl && <polyline fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinejoin="round" points={pl}/>}
  {pl && [0, 1, 2, 3].map(i => { const v = l0 - lm + (((l1 + lm) - (l0 - lm)) * i) / 3; return <text key={i} x={W - P.r + 8} y={YL(v) + 4} fontSize="11" fill="#fbbf24">{formato(v)}</text>; })}
  {[0, Math.floor(barras.length / 2), barras.length - 1].map((i, k) => <text key={i} x={cx(i)} y={H - 6} textAnchor={k === 0 ? "start" : k === 2 ? "end" : "middle"} fontSize="11" fill="#a1a1aa">{new Date(barras[i].x).toLocaleDateString("pt-BR", { month: "short", year: "2-digit", timeZone: "UTC" })}</text>)}
 </svg>;
}

function Degrau({ pts, formato }) {
 // taxa que muda por decisao (Selic): mantem o valor ate a proxima mudanca
 const dg = []; pts.forEach((p, i) => { if (i) dg.push({ x: p.x, y: pts[i - 1].y }); dg.push(p); });
 return <Linhas series={[{ nome: "degrau", cor: "#bef264", pts: dg }]} formato={formato}/>;
}

function Detalhe({ s, loc, t, coleta, series }) {
 const nfAx = new Intl.NumberFormat(loc, { maximumFractionDigits: s.decimals > 2 ? 2 : s.decimals });
 const diario = s.frequencia === "daily";
 const todas = s.linhas;
 const corte = diario ? Date.parse(todas[todas.length - 1].date) - 183 * 864e5 : null;
 const janela = diario ? todas.filter(r => Date.parse(r.date) >= corte) : todas.slice(-36);
 const ult = todas[todas.length - 1];
 const pts = janela.map(r => ({ x: Date.parse(r.date), y: num(r.value) })).filter(p => p.y != null);
 const fmtData = (iso, dia) => new Date(iso).toLocaleDateString(loc, dia ? { timeZone: "UTC" } : { month: "long", year: "numeric", timeZone: "UTC" });
 const periodo = `${fmtData(janela[0].date, diario)} ${t.ate} ${fmtData(janela[janela.length - 1].date, diario)}`;
 let grafico, legenda, tabela;
 if (s.kind === "monthly_rate") {
  const ac = janela.filter(r => num(r.acc_12m) != null).map(r => ({ x: Date.parse(r.date), y: num(r.acc_12m) }));
  grafico = <Barras barras={pts} linha={ac} formato={v => nfAx.format(v) + "%"}/>;
  legenda = [["#bef264", t.mensal], ["#fbbf24", t.acumulado]];
 } else if (s.kind === "rate" && s.id === "selic_meta") {
  grafico = <Degrau pts={pts} formato={v => nfAx.format(v) + "%"}/>;
 } else if (s.kind === "price" || s.kind === "stock") {
  const ma = janela.filter(r => num(r.ma_30d) != null).map(r => ({ x: Date.parse(r.date), y: num(r.ma_30d) }));
  grafico = <Linhas series={[{ nome: "v", cor: "#bef264", pts }, { nome: "ma", cor: "#fbbf24", pts: ma, fino: true }]} formato={v => s.unidade.startsWith("US$") ? new Intl.NumberFormat(loc, { notation: "compact" }).format(v) : nfAx.format(v)}/>;
  legenda = [["#bef264", s.nome], ["#fbbf24", t.mediaMovel]];
 } else if (s.id === "divida_bruta" || s.id === "divida_liquida") {
  const br = series.get("divida_bruta"), li = series.get("divida_liquida");
  const jn = l => l.slice(-36).map(r => ({ x: Date.parse(r.date), y: num(r.value) }));
  grafico = <Linhas series={[{ nome: "b", cor: "#bef264", pts: jn(br.linhas) }, { nome: "l", cor: "#fbbf24", pts: jn(li.linhas) }]} formato={v => nfAx.format(v) + "%"}/>;
  legenda = [["#bef264", t.bruta], ["#fbbf24", t.liquida]];
  const mapaL = new Map(li.linhas.map(r => [r.date, num(r.value)]));
  tabela = br.linhas.slice(-12).reverse().map(r => ({ mes: fmtData(r.date, false), b: num(r.value), l: mapaL.get(r.date) }));
 } else {
  grafico = <Linhas series={[{ nome: "v", cor: "#bef264", pts }]} formato={v => nfAx.format(v) + (s.unidade.startsWith("%") ? "%" : "")}/>;
 }
 return <Cartao className="mt-5">
  <div className="flex flex-wrap items-baseline justify-between gap-2">
   <div><Rotulo>{diario ? t.detalheJanela.daily : t.detalheJanela.monthly} · {periodo}</Rotulo><p className="mt-2 text-2xl font-black tracking-tight">{s.nome}</p></div>
   {ult.alert && <span className={`rounded-full px-3 py-1 text-xs ${ult.alert === "Alerta" ? "bg-amber-300 font-bold text-black" : "border border-white/15 text-zinc-400"}`}>{ult.alert === "Alerta" ? t.alertaAlerta : t.alertaNormal}</span>}
  </div>
  <p className="mt-2 text-xs text-zinc-500">{t.ultimoDado}: {fmtData(ult.date, diario)} · {t.coletadoEm} {coleta}</p>
  {t.notas[s.id] && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">{t.notas[s.id]}</p>}
  <div className="mt-4">{grafico}</div>
  {tabela && <div className="mt-5 overflow-x-auto"><p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">{t.dividaTabela} (% PIB)</p>
   <table className="w-full min-w-[420px] text-left text-sm"><thead className="text-xs text-zinc-500"><tr><th className="pb-2 font-normal">{t.mes}</th><th className="pb-2 text-right font-normal">{t.bruta}</th><th className="pb-2 text-right font-normal">{t.liquida}</th><th className="pb-2 text-right font-normal">{t.dividaDif}</th></tr></thead>
   <tbody>{tabela.map(r => <tr key={r.mes} className="border-t border-white/10"><td className="py-2 first-letter:uppercase">{r.mes}</td><td className="py-2 text-right tabular-nums">{r.b?.toFixed(1)}%</td><td className="py-2 text-right tabular-nums">{r.l?.toFixed(1)}%</td><td className="py-2 text-right tabular-nums text-zinc-400">{r.b != null && r.l != null ? (r.b - r.l).toFixed(1) + " p.p." : "—"}</td></tr>)}</tbody></table></div>}
  {legenda && <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">{legenda.map(([c, l]) => <span key={l}><i className="mr-1 inline-block h-0.5 w-4 align-middle" style={{ background: c }}/>{l}</span>)}</p>}
 </Cartao>;
}

function Economia({ d, t, loc }) {
 const coleta = d.meta?.generated_at ? new Date(d.meta.generated_at + "Z").toLocaleString(loc, { dateStyle: "short", timeStyle: "short" }) : "—";
 const series = useMemo(() => {
  const m = new Map();
  d.economia.forEach(r => {
   if (!m.has(r.series_name)) m.set(r.series_name, { id: r.series_name, nome: r.series_description || r.series_name, unidade: r.unit, kind: r.kind, frequencia: r.frequency, decimals: Number(r.decimals || 2), linhas: [] });
   m.get(r.series_name).linhas.push(r);
  });
  m.forEach(s => s.linhas.sort((a, b) => a.date.localeCompare(b.date)));
  return m;
 }, [d]);
 const [id, setId] = useState("dolar_venda");
 const sel = series.get(id) || [...series.values()][0];
 return <div>
  {GRUPOS.map(([g, ids]) => { const lista = ids.map(i => series.get(i)).filter(Boolean); if (!lista.length) return null;
   return <div key={g} className="mb-7">
    <Rotulo>{t.grupos[g]}</Rotulo>
    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
     {lista.map(s => { const u = s.linhas[s.linhas.length - 1]; const mensal = s.frequencia === "monthly";
      const d30 = num(u.delta_30d), d12 = num(u.delta_12m), ac = num(u.acc_12m);
      const spark = s.linhas.slice(mensal ? -24 : -60).map(r => ({ y: num(r.value) })).filter(p => p.y != null);
      return <button key={s.id} onClick={() => setId(s.id)} className={`rounded-[1.25rem] border p-4 text-left transition ${s.id === sel.id ? "border-lime-300 bg-lime-300/[.07]" : "border-white/10 bg-white/[.03] hover:border-white/30"}`}>
       <p className="text-xs text-zinc-400">{s.nome}</p>
       <div className="mt-1 flex items-end justify-between gap-2"><p className="text-2xl font-black tracking-tight tabular-nums">{fmtValor(num(u.value), s, loc)}</p><Mini pts={spark}/></div>
       <div className="mt-2 space-y-0.5 text-xs text-zinc-400">
        {d30 != null && <p><span className="mr-1 text-zinc-300">{seta(d30)}</span>{fmtDelta(d30, u.delta_unit, loc)} {mensal ? t.emMes : t.em30}</p>}
        {d12 != null && <p><span className="mr-1 text-zinc-300">{seta(d12)}</span>{fmtDelta(d12, u.delta_unit, loc)} {t.em12}</p>}
        {ac != null && <p>{fmtValor(ac, { decimals: 2, unidade: "%" }, loc)} {t.acum12}</p>}
       </div>
       <p className="mt-2 text-[11px] text-zinc-600">{t.atualizadoEm} {new Date(u.date).toLocaleDateString(loc, mensal ? { month: "short", year: "numeric", timeZone: "UTC" } : { timeZone: "UTC" })}</p>
      </button>; })}
    </div>
   </div>; })}
  {sel && <Detalhe s={sel} loc={loc} t={t} series={series} coleta={coleta}/>}
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
     {[["10", t.cidades], ["7", t.moedas], ["12", t.series], ["3", t.apis]].map(([n, k]) => <span key={k}><b className="text-2xl font-black text-white">{n}</b> {k}</span>)}
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
