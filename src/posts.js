import { marked } from "marked";

// Varre a pasta em tempo de build. Adicionar post = criar um .md aqui e dar push.
// Nada mais precisa ser tocado: nem lista, nem rota, nem indice.
const arquivos = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

// Frontmatter na mao de proposito: gray-matter depende de Buffer e nao roda
// no navegador sem polyfill. Aqui basta chave: valor, uma por linha.
function separa(bruto){
 const m = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
 if(!m) return { meta:{}, corpo:bruto };
 const meta = {};
 for(const linha of m[1].split(/\r?\n/)){
  const i = linha.indexOf(":");
  if(i > 0) meta[linha.slice(0,i).trim()] = linha.slice(i+1).trim();
 }
 return { meta, corpo:m[2] };
}

marked.setOptions({ gfm:true, breaks:false });

export const posts = Object.entries(arquivos).map(([caminho, bruto]) => {
 const { meta, corpo } = separa(bruto);
 // O prefixo de data no nome do arquivo serve so para ordenar na pasta; sai do slug.
 const arquivo = caminho.split("/").pop().replace(/\.md$/,"");
 const palavras = corpo.trim().split(/\s+/).length;
 return {
  slug: meta.slug || arquivo.replace(/^\d{4}-\d{2}-\d{2}-/,""),
  titulo: meta.titulo || arquivo,
  subtitulo: meta.subtitulo || "",
  resumo: meta.resumo || "",
  data: meta.data || "",
  lang: meta.lang || "pt",
  tags: meta.tags ? meta.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
  minutos: Math.max(1, Math.round(palavras/200)),
  palavras,
  html: marked.parse(corpo)
 };
}).sort((a,b) => b.data.localeCompare(a.data));

export const postsDe = lang => posts.filter(p => p.lang === lang);
export const achaPost = slug => posts.find(p => p.slug === slug);

export const formataData = (iso, lang) => {
 const [a,m,d] = String(iso).split("-").map(Number);
 if(!a || !m || !d) return iso;
 return new Date(Date.UTC(a, m-1, d)).toLocaleDateString(lang==="en"?"en-US":"pt-BR",
  { day:"numeric", month:"long", year:"numeric", timeZone:"UTC" });
};
