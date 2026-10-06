// Motor da demo do simulador. Versão enxuta e independente do estudo original:
// cada versão do sistema tem um "valor real" (que só o simulador conhece) e as políticas
// só enxergam esse valor através de uma medição com ruído.

export const POLITICAS = ["ingenua", "holdout", "aleatoria", "sem_evolucao"];
export const CICLOS = 40;
const GANHO_MINIMO = 0.01;
const DESVIO_CANDIDATOS = 0.04;   // quanto os candidatos variam em torno da versão ativa
const N_HOLDOUT = 30;
const Z95 = 1.6449;
const MAX_PONTOS = 250;            // pontos desenhados no gráfico de dispersão

// Gerador pseudoaleatório com semente (mulberry32): mesma semente, mesma história.
function rng(semente) {
  let a = semente >>> 0;
  const unif = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const normal = (mu = 0, sd = 1) => {
    const u = Math.max(unif(), 1e-12), v = unif();
    return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  return { unif, normal };
}

function media(xs) { return xs.reduce((s, x) => s + x, 0) / xs.length; }
function desvio(xs) {
  const m = media(xs);
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1));
}

/**
 * Roda uma política por CICLOS ciclos.
 * Devolve, por ciclo: valor real da versão ativa, ganho que a política "acreditou"
 * ter obtido (acumulado), promoções e promoções falsas (ganho real <= 0).
 * Para "ingenua" e "holdout" guarda também a nuvem de candidatos do ciclo.
 */
export function simula(politica, { ruido, tentativas, capacidade, semente }) {
  const r = rng(semente * 7919 + POLITICAS.indexOf(politica) * 104729 + 13);
  let real = 0, acreditado = 0, promocoes = 0, falsas = 0, medicoes = 0;
  const serie = [{ real: 0, acreditado: 0, promocoes: 0, falsas: 0, medicoes: 0, nuvem: null }];

  for (let c = 1; c <= CICLOS; c++) {
    let nuvem = null;
    if (politica !== "sem_evolucao") {
      const eAtiva = r.normal(0, ruido);                 // uma medição da versão ativa
      const cands = [];
      for (let i = 0; i < tentativas; i++) {
        const ganhoReal = r.normal(capacidade, DESVIO_CANDIDATOS);
        const ganhoMedido = ganhoReal + r.normal(0, ruido) - eAtiva;
        cands.push({ ganhoReal, ganhoMedido });
      }
      let melhor = 0;
      for (let i = 1; i < cands.length; i++) if (cands[i].ganhoMedido > cands[melhor].ganhoMedido) melhor = i;
      if (politica === "aleatoria") melhor = Math.floor(r.unif() * cands.length);
      const w = cands[melhor];

      let promove = false, crenca = w.ganhoMedido;
      if (politica === "ingenua") {
        promove = w.ganhoMedido >= GANHO_MINIMO;
        medicoes += 1;
      } else if (politica === "holdout") {
        // re-mede vencedor e ativa em pares, com medições novas e independentes
        const difs = [];
        for (let k = 0; k < N_HOLDOUT; k++) difs.push((w.ganhoReal + r.normal(0, ruido)) - r.normal(0, ruido));
        const m = media(difs), ep = desvio(difs) / Math.sqrt(N_HOLDOUT);
        promove = m - Z95 * ep >= GANHO_MINIMO;
        crenca = m;
        medicoes += 2 * N_HOLDOUT;
      } else {
        promove = true; crenca = 0;
      }
      if (promove) {
        real += w.ganhoReal;
        acreditado += crenca;
        promocoes++;
        if (w.ganhoReal <= 0) falsas++;
      }
      if (politica !== "aleatoria") {
        nuvem = {
          pontos: cands.slice(0, MAX_PONTOS).map(p => [p.ganhoReal, p.ganhoMedido]),
          vencedor: [w.ganhoReal, w.ganhoMedido],
          promovido: promove,
        };
      }
    }
    serie.push({ real, acreditado, promocoes, falsas, medicoes, nuvem });
  }
  return serie;
}

export function simulaTudo(params) {
  return Object.fromEntries(POLITICAS.map(p => [p, simula(p, params)]));
}

/** Média sobre várias sementes: o que realmente se pode afirmar, ao contrário de uma rodada só. */
export function replicas(params, n = 40) {
  const acc = Object.fromEntries(POLITICAS.map(p => [p, { real: 0, acreditado: 0, promocoes: 0, falsas: 0 }]));
  for (let s = 0; s < n; s++) {
    for (const p of POLITICAS) {
      const fim = simula(p, { ...params, semente: 1000 + s }).at(-1);
      acc[p].real += fim.real; acc[p].acreditado += fim.acreditado;
      acc[p].promocoes += fim.promocoes; acc[p].falsas += fim.falsas;
    }
  }
  return Object.fromEntries(POLITICAS.map(p => [p, {
    real: acc[p].real / n,
    acreditado: acc[p].acreditado / n,
    taxaFalsa: acc[p].promocoes ? acc[p].falsas / acc[p].promocoes : 0,
    promocoes: acc[p].promocoes / n,
  }]));
}
