// Todo o texto do site vive aqui, em pt e en. Nenhuma string solta no JSX:
// para traduzir ou corrigir uma frase, só este arquivo precisa ser tocado.

export const copy = {
  pt: {
    meta:{title:"Matheus Capelo | Portfólio", desc:"Matheus Capelo, analista de dados e engenheiro de software. Business Intelligence, Power BI, SQL e automação de processos.", htmlLang:"pt-BR"},
    switchTo:"Ver o site em inglês",
    nav:{sobre:"Sobre", trajetoria:"Trajetória", projetos:"Projetos", vida:"Vida", tedio:"Tédio?", menu:"Menu"},
    hero:{
      eyebrow:"Analista de dados · engenheiro de software · BI e automação",
      h1a:"Eu transformo", h1b:"processos", h1c:"em software.",
      lead:"Sou Matheus “Maximilian” Capelo. Analista de dados e desenvolvedor: estruturo BI, modelo indicadores e construo automações confiáveis, do entendimento da regra de negócio ao executável documentado.",
      cta:"Ver trabalho"
    },
    sobre:{
      label:"01 · Sobre",
      h2a:"Código é a parte fácil.", h2b:"Os melhores engenheiros não escrevem um código melhor, eles fazem perguntas melhores.",
      p1:"Comecei em análise de dados: tráfego, campanhas, indicadores. Depois vieram os processos, o Business Intelligence e, por fim, o software que sustenta tudo isso. Hoje faço as duas pontas. Entendo o número e construo a ferramenta que o produz.",
      p2:"Converso com quem executa o processo, traduzo regras de negócio, construo a solução e valido contra dados reais. Não entrego apenas scripts nem apenas dashboards: entrego ferramentas que pessoas não técnicas conseguem usar.",
      p3:"Meus princípios são simples: nunca falhar em silêncio, manter regras fora do código e tornar cada resultado auditável. O que eu construo precisa continuar útil mesmo quando eu não estiver na sala.",
      stats:[{n:"3 anos",l:"em dados e BI"},{n:"15+",l:"automações em uso"},{n:"62+",l:"empresas impactadas"},{n:"100%",l:"validação real"},{n:"h→min",l:"ganho operacional"}]
    },
    palco:{
      label:"Palco · Outubro 2025",
      h2:"Palestrante convidado na SESCOMP.",
      talk:"“O que é BI e por que ele importa”",
      text:"Uma introdução ao conceito de Business Intelligence e ao impacto dele nas decisões do dia a dia, para uma plateia de estudantes de computação da Universidade Federal do Ceará, Campus de Russas.",
      when:"20 a 23 de outubro · Russas, CE",
      alt:"Card de divulgação da SESCOMP 2025 anunciando Matheus Capelo como palestrante confirmado"
    },
    trajetoria:{
      label:"02 · Trajetória", h2a:"De dados", h2b:"para software.",
      formacao:"Formação", ferramentas:"Ferramentas"
    },
    roles:[
      {period:"2026 — hoje", place:"Florianópolis, SC", role:"Assistente de desenvolvimento de sistemas", org:"Orsitec Assessoria Contábil", text:"Construo automações e aplicativos internos que substituem rotinas manuais de fechamento contábil, fiscal e de departamento pessoal. É de onde vêm os projetos listados abaixo.", tags:["Python","Automação","Integrações","Excel/OOXML"]},
      {period:"2025 — 2026", place:"1 ano e 5 meses", role:"Analista de BI", org:"EBMQUINTTO", text:"Fiz parte do setor de Business Intelligence: extração e tratamento de dados via API e Excel, modelagem, definição de indicadores e dashboards em Power BI para apoiar a decisão de clientes de alto ticket.", tags:["Power BI","SQL","APIs","KPIs","Modelagem"]},
      {period:"2024 — 2025", place:"Fortaleza, CE", role:"Analista de Processos", org:"Concentrix", text:"Auditoria de fluxos operacionais de atendimento, identificação de gargalos e monitoramento de indicadores de desempenho. Atuei como analista interino durante a ausência do titular.", tags:["Análise de processos","KPIs","Melhoria contínua"]},
      {period:"2024", place:"Fortaleza, CE", role:"Freelancer · mídia paga", org:"Autônomo", text:"Planejamento e otimização de campanhas com foco em conversão e ROI: segmentação de público, análise de métricas e relatórios de performance.", tags:["Mídia paga","ROI","Analytics"]},
      {period:"2023 — 2024", place:"Russas, CE", role:"Estagiário em Análise de Dados", org:"DATTA BÚSINESS", text:"Onde a parte de dados começou. Análise de tráfego e campanhas, relatórios analíticos de performance e gestão de campanhas internacionais, incluindo reuniões técnicas com clientes em inglês.", tags:["Google Ads","Google Analytics","Inglês"]}
    ],
    education:[
      {course:"Análise e Desenvolvimento de Sistemas", school:"Estácio", period:"2025 — 2027 · em andamento"},
      {course:"Data Analytics", school:"Digital College Brasil", period:"2024 — 2025"},
      {course:"Engenharia de Software", school:"Universidade Federal do Ceará", period:"2019 — 2024"}
    ],
    toolGroups:[
      {label:"Dados e BI", items:["Power BI","SQL","PostgreSQL","Excel","Power Query","Google Analytics"]},
      {label:"Engenharia", items:["Python","REST APIs","Playwright","openpyxl","Git"]},
      {label:"Análise", items:["Modelagem de dados","KPIs","Análise exploratória","Análise de processos"]}
    ],
    projetos:{
      label:"03 · Projetos selecionados", h2a:"Impacto,", h2b:"não features.",
      nota:"Projetos profissionais descritos sem dados confidenciais. Arquiteturas, decisões técnicas e exemplos genéricos podem ser apresentados em uma conversa."
    },
    projects:[
      {type:"Auditoria com IA", title:"Auditoria automática de balancetes", metric:"294 testes automatizados", detail:"com as duas integrações validadas ponta a ponta contra dados reais", text:"Monitora o encerramento do fechamento, extrai as peças contábeis do sistema e gera um relatório técnico com IA, usando uma skill criada para a função de auditoria contábil, para o contador revisar. Antes, o contador tinha que fazer o relatório manualmente, balancete por balancete.", stack:["Python","pywinauto","PostgreSQL","IA"]},
      {type:"Conferência fiscal", title:"Conferência de INSS judicial", metric:"0 divergência em 39.634 valores", detail:"132 competências reconferidas, com o depósito batendo exato contra a fonte", text:"Reconstrói as competências a partir das planilhas originais de cada estabelecimento e marca cada valor que divergia do levantamento anterior. A conferência antiga comparava totais por ano, e os valores trocados entre eventos não apareciam.", stack:["Python","openpyxl","Excel","Testes automatizados"]},
      {type:"Análise documental em escala", title:"Triagem de retenções em notas", metric:"100% de acerto no XML", detail:"nos 6 layouts testados, incluindo MEI, nota cancelada, multi-serviço e tag fora de ordem", text:"Lê o XML da nota e classifica cada uma por semáforo de retenção. Quando o XML não vem, ou vem gerado a partir do próprio PDF, a leitura passa para o PDF interpretado por geometria.", stack:["Python","XML NFS-e","PyMuPDF","PySide6"]},
      {type:"IA + documentos", title:"Leitor de Notas Fiscais", metric:"100% de precisão", detail:"no lote de homologação, sem intervenção manual", text:"Lê notas com layouts completamente diferentes entre si. Parsing determinístico primeiro, OCR para documentos digitalizados e IA apenas como último recurso. Essa ordem derrubou a taxa de erro em 62% nos casos mais difíceis.", stack:["PySide6","PyMuPDF","OCR","IA"]},
      {type:"Consolidação contábil", title:"Consolidador de Balancetes", metric:"100% de conferência", detail:"em 62 empresas, zero divergência contra o fechamento manual", text:"Reconstrói a hierarquia de contas, gera as sintéticas como fórmulas auditáveis e monta o mapa consolidado. Substituiu uma planilha manual que era refeita a cada fechamento.", stack:["Python","openpyxl","Tkinter"]},
      {type:"Automação web", title:"Robô de recibos fiscais", metric:"92% menos tempo ocioso", detail:"por execução, com 0% de documentos duplicados ou perdidos", text:"Percorre o portal, baixa os documentos da competência e envia cada um ao sistema de obrigações. A espera fixa virou tempo proporcional ao lote, e a deduplicação por hash garante que nada é reenviado nem descartado em silêncio.", stack:["Playwright","SHA-256","PyInstaller"]},
      {type:"Integração de sistemas", title:"RH para folha via API", metric:"100% dos testes aprovados", detail:"134 casos automatizados, incluindo aceite ponta a ponta", text:"Conecta um sistema de RH em nuvem ao sistema de folha: converte as admissões em arquivo de leiaute posicional, valida a saída antes do envio e isola configuração por cliente e por ambiente. Coleções de requisições versionadas cobrem homologação e produção separadamente, e nenhum campo entra no conversor sem estar documentado na especificação oficial.", stack:["REST","Postman","Python","pytest"]},
      {type:"Engenharia reversa", title:"Relatório para conselho", metric:"100% das 132 células", detail:"reproduzidas sem divergência antes da primeira entrega", text:"Uma cadeia de fórmulas encadeadas virou um fluxo reproduzível e configurável, com seis validações contábeis automáticas e relatório de contas órfãs a cada execução.", stack:["Python","Excel","OOXML"]},
      {type:"Performance", title:"Power Query otimizado", metric:"100% dos itens preservados", detail:"e o travamento indefinido eliminado, sem mudar a regra de negócio", text:"O diagnóstico foi a parte difícil: a mesma linha era reprocessada em cada coluna, sem materialização intermediária. Calcular uma vez só destravou a consulta e manteve os itens que uma simplificação ingênua descartaria.", stack:["Power Query","Excel","Debug"]}
    ],
    vida:{
      label:"04 · Fora do terminal",
      h2:"Eu gosto de histórias.",
      p:"Mangás, jogos, filmes, séries e literatura clássica. Formatos diferentes para a mesma obsessão: entender pessoas, mundos e escolhas.",
      livroLabel:"Um livro",
      livroQuote:"“On the Road mudou minha vida.”",
      livroText:"Talvez pela estrada, pela inquietação, ou pela ideia de que a vida também acontece enquanto tentamos descobrir para onde ir.",
      verdeH3:"Tecnologia com mundo ao redor.",
      verdeP:"Também me importo com meio ambiente e com a forma como aquilo que construímos afeta o que existe fora da tela.",
      filmesLabel:"Pseudo cinéfilo · favoritos",
      films:["Shrek 2","The Iron Claw","O Lutador (2008)","Paris, Texas","Blade Runner 2049","Drive (2011)"]
    },
    contato:{label:"05 · Próxima conversa", cta:"Vamos construir?", copyright:"© 2026 Matheus “Maximilian” Capelo"},
    entrada:{
      eyebrow:"Matheus “Maximilian” Capelo",
      h1a:"Construo sistemas.", h1b:"E escrevo sobre o resto.",
      lead:"Analista de dados e desenvolvedor. De um lado, o que eu construo. Do outro, o que eu penso. Escolha por onde começar.",
      portfolioLabel:"O trabalho", portfolioTitulo:"Portfólio",
      portfolioTexto:"Automações, BI e integrações que substituíram rotinas manuais inteiras. Com número medido, não com estimativa.",
      portfolioRodape:"Projetos, trajetória e contato",
      blogLabel:"As ideias", blogTitulo:"Blog",
      blogTexto:"Onde visões diferentes se encontram. Tecnologia, negócios, cultura, sociedade.",
      blogUltimo:"Mais recente", blogVazio:"Em breve",
      jogoLabel:"O protótipo", jogoTitulo:"Juramento de 20 Anos",
      jogoTexto:"Um RPG narrativo que estou construindo. Memória, guerra e escolhas que fecham caminhos.",
      jogoRodape:"Em desenvolvimento · acesso com chave",
      simLabel:"O estudo", simTitulo:"Simulador",
      simTexto:"Um sistema que tenta se melhorar sozinho e a armadilha estatística que quase me enganou. Demonstração para mexer.",
      simRodape:"Interativo · estudo, não produto"
    },
    blog:{
      nav:"Blog",
      label:"Blog · textos e opinião",
      tituloA:"Onde visões diferentes", tituloB:"se encontram.",
      lede:"Algumas certezas desaparecem quando observamos o mesmo tema por outro ângulo.",
      intro:"Este blog é uma coleção de reflexões sobre tecnologia, negócios, cultura, sociedade e outros assuntos que considero interessantes. Uma tentativa de organizar ideias e entender melhor perspectivas diferentes da minha.",
      ler:"Ler", min:"min de leitura", voltar:"Voltar para o blog",
      vazioTitulo:"Ainda não tem post por aqui.",
      vazioTexto:"Os textos publicados até agora estão em português. Troque o idioma na bandeira do topo para lê-los.",
      faleTitulo:"Quer conversar sobre isso?",
      faleTexto:"Se o texto te tocou, discordou de você ou lembrou de alguma coisa, me escreve. Leio tudo e respondo.",
      assunto:"Sobre o post",
      comentarios:"Comentários",
      comentariosNota:"Os comentários usam sua conta do GitHub e ficam guardados nas Discussions do repositório deste site.",
      rodapeApoio:"Se você está passando por sofrimento emocional, o CVV atende de graça, 24 horas por dia, pelo telefone 188 e no site cvv.org.br.",
      naoAchou:"Post não encontrado."
    },
    sim:{
      eyebrow:"Estudo · simulação",
      h1a:"Quando o melhor", h1b:"de muitos é sorte.",
      lead:"Um sistema que tenta se melhorar sozinho gera dezenas de versões candidatas por ciclo. Se ele escolher a que parece melhor, vai promover sorte e achar que evoluiu. Mexa nos controles e veja isso acontecer.",
      demoLabel:"Demonstração interativa",
      ruido:"Ruído da medição", ruidoHint:"O quanto cada medição erra. Zero seria um mundo perfeito.",
      tentativas:"Tentativas por ciclo", tentativasHint:"Quantos candidatos são gerados e comparados a cada ciclo.",
      capacidade:"Melhora média real", capacidadeHint:"O quanto um candidato típico é realmente melhor que a versão atual.",
      tocar:"Tocar", pausar:"Pausar", repetir:"Repetir", reiniciar:"Reiniciar", novaSemente:"Outra rodada", ciclo:"Ciclo",
      curvaTitulo:"O meu primeiro teste", curvaSub:"x = x0 · e^(k · y). Sem custo, sem ruído, sem trava. (Me senti muito inteligente pensando nesse algoritmo, tenho que admitir)", curvaK:"Taxa de melhora por versão (k)",
      curvaLegenda:"Com uma taxa fixa, a curva só sobe. Nada nela segura o processo, por isso ela não diz nada sobre o que o post argumentava.",
      graficoTitulo:"Valor real da versão ativa", graficoSub:"Só o simulador sabe esse número. As políticas nunca o veem direto.",
      eixoX:"ciclos",
      pol:{ingenua:"Ingênua", holdout:"Com holdout", aleatoria:"Aleatória", sem_evolucao:"Sem evolução"},
      nuvemTitulo:"Os candidatos deste ciclo",
      semNuvem:"Aperte tocar para ver os candidatos.",
      nuvemInicio:"Cada ponto é um candidato. Aperte tocar.",
      nuvemPromovido:"O vencedor foi promovido.", nuvemRecusado:"O vencedor foi recusado.",
      nuvemVencedor:"Ele parecia ganhar", nuvemReal:"mas o ganho real é",
      eixoReal:"ganho real (invisível ao sistema)", eixoMedido:"ganho medido",
      dispersaoAria:"Dispersão dos candidatos: ganho real contra ganho medido",
      barrasTitulo:"O que achou contra o que aconteceu", barrasSub:"Soma dos ganhos ao longo dos ciclos.",
      achou:"Achou que ganhou", ganhou:"Ganhou de verdade",
      contadorTitulo:"Promoções que pioraram o sistema", contadorSub:"Versões promovidas cujo ganho real era zero ou negativo.",
      falsasLabel:"promoções falsas / promoções",
      multTitulo:"Uma rodada engana. Quarenta não.",
      multTexto:"A mesma configuração dos controles, rodada 40 vezes com sementes diferentes. Esta tabela muda quando você mexe nos controles lá em cima.",
      colPolitica:"Política", colReal:"Valor real final", colAchou:"Achou que ganhou", colFalsas:"Promoções falsas", colPromo:"Promoções",
      multHonesto:"Repare que a política com holdout nem sempre termina com o maior valor real. Ela erra menos, mas promove menos. Segurança tem preço, e escondê-lo seria o mesmo erro que o estudo tenta evitar.",
      secoes:[
        {titulo:"De onde veio a ideia",
         paragrafos:[
          "Vi um post dizendo que, mesmo que o primeiro modelo capaz de iniciar um processo de melhoria recursiva já existisse, ainda levaria muito tempo até vermos melhoras significativas. O motivo seria o custo do treinamento e os próprios parâmetros que fazem dessa área um mundo novo.",
          "Tudo ali é muito recente e os pesquisadores aprendem por partes. Quanto menos travas de segurança, mais rápido eles aprendem, mas maior o perigo.",
          "Quis testar com algo bem simples: uma curva de crescimento exponencial, sem custos, sem ruído e sem nenhuma trava. O resultado, claro, mostrava um crescimento bem mais rápido do que eu imaginava. Foi aí que percebi que um teste assim não mede o que o post argumentava, porque não tem nenhum dos parâmetros que seguram o processo na vida real. Decidi então ir acrescentando esses parâmetros, um a um, até chegar ao que está nesta página."
         ]},
        {titulo:"Uma sala de aula",
         paragrafos:[
          "Todos nós já fomos crianças numa sala de aula, com outras crianças aprendendo. Cada uma era diferente: contexto familiar, QI, interesse. Agora imagine que todo mundo saísse da mesma linha de largada, e que a única diferença fosse o professor ensinar de um jeito um pouco diferente a cada aluno, para ver como cada abordagem facilita ou dificulta o aprendizado. No fim do ano letivo, ele escolheria o método que deu o melhor resultado.",
          "Quanto daquele resultado foi melhora real por causa do método? Quanto foi sorte? Quanto foi um fator que ninguém estava vendo? Quanto foi um erro que o professor não percebeu na hora de medir?",
          "É o mesmo problema da recursividade em IA. Cada candidato é um aluno, cada ciclo é um ano letivo, e a nota medida é só uma estimativa do que cada um realmente aprendeu."
         ]},
        {titulo:"O que a demonstração faz",
         paragrafos:[
          "Montei este simulador com algumas métricas que achei justas para o caso e outras que pesquisei. Ele é escrito como algoritmo, sem nenhuma IA rodando por trás, só para ilustrar o raciocínio: o quanto a IA erraria nas medições, a sorte envolvida, como os números mudam a cada ciclo, como o ruído da medição atrapalha o crescimento e, claro, qual é a melhora no final.",
          "Em cada ciclo, o sistema gera candidatos a nova versão. Cada candidato tem um ganho real sobre a versão atual, que o simulador conhece e o sistema não. O sistema só enxerga uma medição, e toda medição tem algum nível de ruído.",
          "Coloquei duas formas de decidir lado a lado. A ingênua não tem travas: pega o candidato que parece melhor e o promove se o ganho medido passar de um mínimo. A com holdout é a que tem a trava de segurança: mede de novo, em pares, o candidato e a versão atual, e só promove se o ganho se sustentar com 95% de confiança. As outras duas são referências: uma promove um candidato sorteado, a outra nunca promove nada.",
          "Como a confiança é calculada: a política com holdout faz 30 medições novas do candidato e 30 da versão atual, e em cada par calcula a diferença. Tira a média dessas 30 diferenças e mede o quanto essa média ainda balança por acaso, que é o desvio das diferenças dividido pela raiz de 30. Depois desconta da média 1,64 vezes essa oscilação. O 1,64 é o número que corresponde a 95% de confiança numa curva normal, olhando só para um lado. O resultado é o pior ganho razoável: com 95% de confiança, o ganho real é pelo menos esse valor. A promoção só acontece se esse pior caso ainda passar do mínimo. Exemplo: se o ganho médio medido foi 0,05 e a oscilação ficou em 0,03, o pior caso é 0,05 − 1,64 × 0,03, ou seja, cerca de 0,00. Isso não passa do mínimo de 0,01, então o candidato é recusado, mesmo com uma média que parecia boa. A ingênua, que olha uma medição só, o promoveria."
         ]},
        {titulo:"A armadilha: o vencedor entre muitos",
         paragrafos:[
          "Olhe o gráfico de pontos. Os candidatos que parecem mais fortes, lá em cima, são em boa parte candidatos que tiveram sorte na medição. É o professor premiando o aluno que foi bem na prova por acaso. Quanto mais tentativas e quanto mais ruído, mais o topo da lista é composto por erro de medição, e não por qualidade.",
          "Isso é chamado de maldição do vencedor. Escolher o máximo de muitas medições ruidosas superestima o vencedor de forma sistemática. Nas barras, a política ingênua registra um ganho enorme, enquanto o valor real quase não sai do lugar. Ela acredita que evoluiu, e não evoluiu."
         ]},
        {titulo:"Como eu notei",
         paragrafos:[
          "Meu primeiro teste era uma curva simples de crescimento, e ela subia rápido demais. Ao aumentar o nível, vi que aumentar o número de tentativas por ciclo aumentava o ganho quase sozinho, sem o sistema ficar melhor em nada. Isso me incomodou, porque um crescimento desse deveria ter mais empecilhos.",
          "Fui verificar. E então me dei conta: o que o sistema sabe, e o que só o simulador sabe? Quando separei o valor real do valor medido, o problema apareceu. A decisão era tomada com o número medido, e o simulador nunca conferia contra o número verdadeiro.",
          "Daí veio a correção: re-medir o candidato escolhido com medições novas e independentes, comparar em pares com a versão atual e exigir que o limite inferior do intervalo de confiança do ganho passe do mínimo. No estudo original, com ruído de medição 0,20, a política ingênua errou 10,5% das promoções. A com holdout errou 0%."
         ]},
        {titulo:"O que mais eu precisava medir",
         paragrafos:["Corrigir a promoção não bastava. Para confiar em qualquer resultado do simulador, faltavam estas peças:"],
         lista:[
          {t:"Uma referência que não evolui.", d:"Sem ela, não dá para saber se o sistema melhorou ou se o ambiente é que mudou."},
          {t:"Várias sementes, com intervalo de confiança.", d:"Uma rodada só conta uma versão. A tabela acima existe por isso."},
          {t:"Valor real separado do valor medido.", d:"Só assim dá para contar quantas promoções foram falsas."},
          {t:"Olhar o pior cenário, não só a média.", d:"Uma falha grave no cenário crítico não pode ser compensada por um bom cenário normal."},
          {t:"Custos separados.", d:"Pesquisa, validação e tempo de relógio são coisas diferentes, e o holdout gasta mais validação."},
          {t:"Rollback com destino verificado.", d:"Reverter só para a versão anterior, depois de medir que ela é de fato melhor, e com um período de espera para não oscilar."},
          {t:"Monitor de drift.", d:"PSI, distância de Wasserstein, CUSUM e EWMA para perceber quando o ambiente muda de regime."},
          {t:"Calibração do risco.", d:"Um risco previsto de 20% precisa corresponder a cerca de 20% de incidentes reais."}
         ]},
        {titulo:"O que fica de fora",
         paragrafos:[
          "Esta demonstração não mede o custo de treinamento. Pois isso é algo óbvio: todo mundo sabe que treinar modelos grandes é caro e lento, e que isso pesa em qualquer processo de melhoria recursiva. Deixei de fora de propósito, como ponto de partida, e não como algo que eu pudesse testar ou validar.",
          "O risco funciona do mesmo jeito. Aqui o perigo é só a promoção falsa, um dano pequeno e abstrato. O perigo de verdade é tratado como fato por quem está no centro do assunto: em junho de 2026, uma ordem executiva do governo dos EUA passou a convidar as empresas a entregar ao governo, até 30 dias antes do lançamento, os modelos de ponta com capacidade em cibersegurança, para avaliação. Isso já mostra o quanto o risco é levado a sério.",
          "O que a demonstração mostra é só a parte que dá para medir sem dados reais: a trava tem preço. Na tabela, a política com holdout promove bem menos e, em vários cenários, termina com um valor real menor que o da ingênua. Quem tem trava erra menos e avança mais devagar. Quem não tem aprende mais depressa e corre mais risco. Quanto isso vale? Só com dados do mundo real para responder."
         ]}
      ],
      aviso:"Este não é um simulador completo, nem algo que possa ser levado a nível profissional. Nenhum parâmetro aqui vem de dados reais: todos os números são hipóteses para ilustrar o método. A demonstração mostra uma armadilha estatística real, mas não prevê o comportamento de nenhum sistema de verdade."
    },
    tetris:{fechar:"Fechar", label:"Tédio resolvido", controles:"← → mover · ↑ girar · ↓ descer · espaço pausar", pontos:"pontos", fim:"Fim de jogo.", pausado:"Pausado.", pausar:"Pausar", continuar:"Continuar", girar:"Girar", recomecar:"Recomeçar", descer:"↓ descer"}
  },

  en: {
    meta:{title:"Matheus Capelo | Portfolio", desc:"Matheus Capelo, data analyst and software engineer. Business Intelligence, Power BI, SQL and process automation.", htmlLang:"en"},
    switchTo:"View this site in Portuguese",
    nav:{sobre:"About", trajetoria:"Experience", projetos:"Work", vida:"Life", tedio:"Bored?", menu:"Menu"},
    hero:{
      eyebrow:"Data analyst · software engineer · BI and automation",
      h1a:"I turn", h1b:"processes", h1c:"into software.",
      lead:"I'm Matheus “Maximilian” Capelo. Data analyst and developer: I build BI practices, model the indicators that matter and ship dependable automation, from understanding the business rule to a documented executable.",
      cta:"See the work"
    },
    sobre:{
      label:"01 · About",
      h2a:"Code is the easy part.", h2b:"The best engineers don't write better code. They ask better questions.",
      p1:"I started in data analysis: traffic, campaigns, metrics. Then came processes, Business Intelligence and, finally, the software that holds all of it up. Today I work both ends. I understand the number and I build the tool that produces it.",
      p2:"I talk to the people who actually run the process, translate business rules, build the solution and validate it against real data. I don't ship just scripts or just dashboards: I ship tools that non-technical people can actually use.",
      p3:"My principles are simple: never fail silently, keep business rules out of the code and make every result auditable. What I build has to stay useful even when I'm not in the room.",
      stats:[{n:"3 years",l:"in data and BI"},{n:"15+",l:"automations in production"},{n:"62+",l:"companies impacted"},{n:"100%",l:"validated on real data"},{n:"h→min",l:"operational gain"}]
    },
    palco:{
      label:"Stage · October 2025",
      h2:"Invited speaker at SESCOMP.",
      talk:"“What BI is and why it matters”",
      text:"An introduction to Business Intelligence and to the difference it makes in everyday decisions, for an audience of computing students at the Federal University of Ceará, Russas campus.",
      when:"October 20–23 · Russas, Brazil",
      alt:"SESCOMP 2025 announcement card naming Matheus Capelo as a confirmed speaker"
    },
    trajetoria:{
      label:"02 · Experience", h2a:"From data", h2b:"to software.",
      formacao:"Education", ferramentas:"Tools"
    },
    roles:[
      {period:"2026 — now", place:"Florianópolis, Brazil", role:"Systems Development Assistant", org:"Orsitec Accounting Services", text:"I build internal automation and desktop apps that replace manual routines in the accounting, tax and payroll close. This is where the projects below come from.", tags:["Python","Automation","Integrations","Excel/OOXML"]},
      {period:"2025 — 2026", place:"1 year and 5 months", role:"BI Analyst", org:"EBMQUINTTO", text:"I was part of the Business Intelligence team: data extraction and cleaning through APIs and Excel, modeling, KPI definition and Power BI dashboards to support decisions for high-ticket clients.", tags:["Power BI","SQL","APIs","KPIs","Modeling"]},
      {period:"2024 — 2025", place:"Fortaleza, Brazil", role:"Process Analyst", org:"Concentrix", text:"Audited customer-service operational flows, identified bottlenecks and monitored performance indicators. Stood in as acting analyst while the role holder was away.", tags:["Process analysis","KPIs","Continuous improvement"]},
      {period:"2024", place:"Fortaleza, Brazil", role:"Freelancer · paid media", org:"Self-employed", text:"Planned and optimized campaigns for conversion and ROI: audience segmentation, metric analysis and performance reporting.", tags:["Paid media","ROI","Analytics"]},
      {period:"2023 — 2024", place:"Russas, Brazil", role:"Data Analysis Intern", org:"DATTA BÚSINESS", text:"Where the data side started. Traffic and campaign analysis, performance reporting and management of international campaigns, including technical client meetings in English.", tags:["Google Ads","Google Analytics","English"]}
    ],
    education:[
      {course:"Systems Analysis and Development", school:"Estácio University", period:"2025 — 2027 · in progress"},
      {course:"Data Analytics", school:"Digital College Brasil", period:"2024 — 2025"},
      {course:"Software Engineering", school:"Federal University of Ceará", period:"2019 — 2024"}
    ],
    toolGroups:[
      {label:"Data and BI", items:["Power BI","SQL","PostgreSQL","Excel","Power Query","Google Analytics"]},
      {label:"Engineering", items:["Python","REST APIs","Playwright","openpyxl","Git"]},
      {label:"Analysis", items:["Data modeling","KPIs","Exploratory analysis","Process analysis"]}
    ],
    projetos:{
      label:"03 · Selected work", h2a:"Impact,", h2b:"not features.",
      nota:"Professional projects described without confidential data. Architecture, technical decisions and generic examples can be walked through in a conversation."
    },
    projects:[
      {type:"AI-assisted audit", title:"Automated trial balance audit", metric:"294 automated tests", detail:"with both integrations validated end to end against real data", text:"Watches for the monthly close to be signed off, pulls the accounting reports from the system and produces a technical report with AI, using a skill built for accounting audit, for the accountant to review. Before, the accountant had to write that report by hand, one trial balance at a time.", stack:["Python","pywinauto","PostgreSQL","AI"]},
      {type:"Tax reconciliation", title:"Court-ordered social security review", metric:"0 variances across 39,634 values", detail:"132 monthly periods rechecked, with the deposit matching the source exactly", text:"Rebuilds the monthly periods from the original spreadsheets of each establishment and flags every value that diverged from the previous survey. The old check compared yearly totals, so values swapped between line items never showed up.", stack:["Python","openpyxl","Excel","Automated tests"]},
      {type:"Document analysis at scale", title:"Withholding triage on invoices", metric:"100% accuracy on XML", detail:"across the 6 layouts tested, including cancelled, multi-service and out-of-order tags", text:"Reads the invoice XML and sorts each note into a withholding traffic light. When the XML is missing, or was itself generated from the PDF, the reading falls back to the PDF interpreted by geometry.", stack:["Python","XML NFS-e","PyMuPDF","PySide6"]},
      {type:"AI + documents", title:"Invoice Reader", metric:"100% accuracy", detail:"on the acceptance batch, with no manual intervention", text:"Reads invoices whose layouts have nothing in common. Deterministic parsing first, OCR for scanned documents and AI only as a last resort. That order cut the error rate by 62% on the hardest cases.", stack:["PySide6","PyMuPDF","OCR","AI"]},
      {type:"Accounting consolidation", title:"Trial Balance Consolidator", metric:"100% reconciled", detail:"across 62 companies, zero variance against the manual close", text:"Rebuilds the chart-of-accounts hierarchy, generates roll-up accounts as auditable formulas and assembles the consolidated map. It replaced a spreadsheet that was rebuilt by hand every close.", stack:["Python","openpyxl","Tkinter"]},
      {type:"Web automation", title:"Tax Receipt Robot", metric:"92% less idle time", detail:"per run, with 0% duplicated or lost documents", text:"Walks the government portal, downloads the period's documents and files each one into the compliance system. A fixed wait became time proportional to the batch, and hash-based deduplication guarantees nothing is resent or silently dropped.", stack:["Playwright","SHA-256","PyInstaller"]},
      {type:"Systems integration", title:"HR to Payroll via API", metric:"100% of tests passing", detail:"134 automated cases, including end-to-end acceptance", text:"Connects a cloud HR system to the payroll system: turns new hires into a fixed-width layout file, validates the output before sending and isolates configuration per client and per environment. Versioned request collections cover staging and production separately, and no field enters the converter without being documented in the official spec.", stack:["REST","Postman","Python","pytest"]},
      {type:"Reverse engineering", title:"Board Report", metric:"100% of the 132 cells", detail:"reproduced with no variance before the first delivery", text:"A chain of nested spreadsheet formulas became a reproducible, configurable pipeline, with six automatic accounting checks and an orphan-account report on every run.", stack:["Python","Excel","OOXML"]},
      {type:"Performance", title:"Power Query optimization", metric:"100% of items preserved", detail:"and the indefinite hang eliminated, without touching the business rule", text:"The diagnosis was the hard part: the same row was being reprocessed for every column, with no intermediate materialization. Computing it once unblocked the query and kept the items a naive simplification would have thrown away.", stack:["Power Query","Excel","Debug"]}
    ],
    vida:{
      label:"04 · Off the terminal",
      h2:"I like stories.",
      p:"Manga, games, films, series and classic literature. Different formats for the same obsession: understanding people, worlds and choices.",
      livroLabel:"One book",
      livroQuote:"“On the Road changed my life.”",
      livroText:"Maybe for the road, for the restlessness, or for the idea that life also happens while we're trying to work out where to go.",
      verdeH3:"Technology with a world around it.",
      verdeP:"I also care about the environment and about how what we build affects what exists outside the screen.",
      filmesLabel:"Wannabe cinephile · favorites",
      films:["Shrek 2","The Iron Claw","The Wrestler (2008)","Paris, Texas","Blade Runner 2049","Drive (2011)"]
    },
    contato:{label:"05 · Next conversation", cta:"Let's build something?", copyright:"© 2026 Matheus “Maximilian” Capelo"},
    entrada:{
      eyebrow:"Matheus “Maximilian” Capelo",
      h1a:"I build systems.", h1b:"And I write about the rest.",
      lead:"Data analyst and developer. On one side, what I build. On the other, what I think. Pick where to start.",
      portfolioLabel:"The work", portfolioTitulo:"Portfolio",
      portfolioTexto:"Automation, BI and integrations that replaced entire manual routines. With measured numbers, not estimates.",
      portfolioRodape:"Projects, experience and contact",
      blogLabel:"The ideas", blogTitulo:"Blog",
      blogTexto:"Where different views meet. Technology, business, culture, society.",
      blogUltimo:"Latest", blogVazio:"Coming soon",
      jogoLabel:"The prototype", jogoTitulo:"Juramento de 20 Anos",
      jogoTexto:"A narrative RPG I am building, in Portuguese. Memory, war and choices that close paths.",
      jogoRodape:"In development · access key required",
      simLabel:"The study", simTitulo:"Simulator",
      simTexto:"A system that tries to improve itself, and the statistical trap that almost fooled me. A demo you can play with.",
      simRodape:"Interactive · a study, not a product"
    },
    blog:{
      nav:"Blog",
      label:"Blog · essays and opinion",
      tituloA:"Where different", tituloB:"views meet.",
      lede:"Some certainties disappear when we look at the same subject from another angle.",
      intro:"This blog is a collection of reflections on technology, business, culture, society and other subjects I find interesting. An attempt to organize ideas and to better understand perspectives other than my own.",
      ler:"Read", min:"min read", voltar:"Back to the blog",
      vazioTitulo:"Nothing here yet.",
      vazioTexto:"Everything published so far is in Portuguese. Switch the language on the flag at the top to read it.",
      faleTitulo:"Want to talk about it?",
      faleTexto:"If the piece moved you, annoyed you or reminded you of something, write to me. I read everything and I answer.",
      assunto:"About the post",
      comentarios:"Comments",
      comentariosNota:"Comments use your GitHub account and live in the Discussions of this site's repository.",
      rodapeApoio:"If you are going through emotional distress, help is available. In Brazil, CVV answers free of charge, 24 hours a day, on 188 and at cvv.org.br.",
      naoAchou:"Post not found."
    },
    sim:{
      eyebrow:"Study · simulation",
      h1a:"When the best", h1b:"of many is luck.",
      lead:"A system that tries to improve itself produces dozens of candidate versions per cycle. If it picks the one that looks best, it will promote luck and believe it evolved. Play with the controls and watch it happen.",
      demoLabel:"Interactive demo",
      ruido:"Measurement noise", ruidoHint:"How much each measurement is off. Zero would be a perfect world.",
      tentativas:"Tries per cycle", tentativasHint:"How many candidates are generated and compared in each cycle.",
      capacidade:"Real average improvement", capacidadeHint:"How much better a typical candidate really is than the current version.",
      tocar:"Play", pausar:"Pause", repetir:"Replay", reiniciar:"Restart", novaSemente:"Another run", ciclo:"Cycle",
      curvaTitulo:"My first test", curvaSub:"x = x0 · e^(k · y). No cost, no noise, no safeguards. (I felt very smart coming up with this algorithm, I have to admit)", curvaK:"Improvement rate per version (k)",
      curvaLegenda:"With a fixed rate the curve only goes up. Nothing in it holds the process back, so it says nothing about what the post argued.",
      graficoTitulo:"Real value of the active version", graficoSub:"Only the simulator knows this number. The policies never see it directly.",
      eixoX:"cycles",
      pol:{ingenua:"Naive", holdout:"With holdout", aleatoria:"Random", sem_evolucao:"No evolution"},
      nuvemTitulo:"This cycle's candidates",
      semNuvem:"Press play to see the candidates.",
      nuvemInicio:"Each dot is a candidate. Press play.",
      nuvemPromovido:"The winner was promoted.", nuvemRecusado:"The winner was rejected.",
      nuvemVencedor:"It looked like a gain of", nuvemReal:"but the real gain is",
      eixoReal:"real gain (invisible to the system)", eixoMedido:"measured gain",
      dispersaoAria:"Candidate scatter: real gain against measured gain",
      barrasTitulo:"What it believed against what happened", barrasSub:"Sum of gains over the cycles.",
      achou:"Believed it gained", ganhou:"Actually gained",
      contadorTitulo:"Promotions that made the system worse", contadorSub:"Promoted versions whose real gain was zero or negative.",
      falsasLabel:"false promotions / promotions",
      multTitulo:"One run misleads. Forty do not.",
      multTexto:"The same control settings, run 40 times with different seeds. This table changes when you move the controls above.",
      colPolitica:"Policy", colReal:"Final real value", colAchou:"Believed it gained", colFalsas:"False promotions", colPromo:"Promotions",
      multHonesto:"Notice that the holdout policy does not always end with the highest real value. It errs less, but promotes less. Safety has a price, and hiding it would be the same mistake this study tries to avoid.",
      secoes:[
        {titulo:"Where the idea came from",
         paragrafos:[
          "I saw a post saying that even if the first model capable of starting a recursive self-improvement process already existed, it would still take a long time before we saw significant gains. The reasons given were the cost of training and the very parameters that make this field a brand new world.",
          "Everything there is very recent and researchers learn piece by piece. The fewer safety nets, the faster they learn, but the greater the danger.",
          "I wanted to test it with something very simple: an exponential growth curve, with no costs, no noise and no safeguards at all. The result, of course, showed growth much faster than I had imagined. That is when I realized a test like that does not measure what the post argued, because it has none of the parameters that hold the process back in real life. So I started adding those parameters one by one, until it became what is on this page."
         ]},
        {titulo:"A classroom",
         paragrafos:[
          "All of us were once children in a classroom with other children learning. Each one was different: family background, IQ, interests. Now imagine everyone started from the same line, and the only difference was the teacher teaching each student in a slightly different way, to see how each approach helps or hinders learning. At the end of the school year, the teacher would pick the method that gave the best result.",
          "How much of that result was a real improvement from the method? How much was luck? How much was a factor nobody was seeing? How much was an error the teacher did not notice when measuring?",
          "It is the same problem as recursive AI improvement. Each candidate is a student, each cycle is a school year, and the measured grade is only an estimate of what each one really learned."
         ]},
        {titulo:"What the demo does",
         paragrafos:[
          "I built this simulator with some metrics I thought were fair for the case and others I researched. It is written as a plain algorithm, with no AI running behind it, only to illustrate the reasoning: how much an AI would get its measurements wrong, the luck involved, how the numbers change from cycle to cycle, how measurement noise hurts growth and, of course, what the final improvement is.",
          "In each cycle the system generates candidates for a new version. Each candidate has a real gain over the current version, which the simulator knows and the system does not. The system only sees one measurement, and every measurement carries some level of noise.",
          "I put two ways of deciding side by side. The naive one has no safeguards: it takes the candidate that looks best and promotes it if the measured gain passes a minimum. The holdout one has the safety net: it measures the candidate and the current version again, in pairs, and only promotes if the gain holds up at 95% confidence. The other two are references: one promotes a randomly drawn candidate, the other never promotes anything.",
          "How the confidence is calculated: the holdout policy takes 30 fresh measurements of the candidate and 30 of the current version, and computes the difference in each pair. It averages those 30 differences and measures how much that average could still wobble by chance, which is the spread of the differences divided by the square root of 30. Then it subtracts 1.64 times that wobble from the average. The 1.64 is the number that corresponds to 95% confidence on a normal curve, looking at one side only. The result is the worst reasonable gain: with 95% confidence, the real gain is at least this value. Promotion only happens if that worst case still passes the minimum. Example: if the measured average gain was 0.05 and the wobble was 0.03, the worst case is 0.05 − 1.64 × 0.03, which is about 0.00. That does not pass the minimum of 0.01, so the candidate is rejected, even with an average that looked good. The naive policy, which looks at a single measurement, would promote it."
         ]},
        {titulo:"The trap: the winner among many",
         paragrafos:[
          "Look at the dot chart. The candidates that seem strongest, near the top, are in large part candidates that got lucky in the measurement. It is the teacher rewarding the student who did well on the test by chance. The more tries and the more noise, the more the top of the list is made of measurement error and not of quality.",
          "This is called the winner's curse. Picking the maximum of many noisy measurements systematically overestimates the winner. In the bars, the naive policy records a huge gain while the real value barely moves. It believes it evolved, and it did not."
         ]},
        {titulo:"How I noticed",
         paragrafos:[
          "My first test was a simple growth curve, and it climbed far too fast. When I raised the level, I saw that increasing the number of tries per cycle raised the gain almost by itself, without the system getting better at anything. That bothered me, because growth like that should have more obstacles.",
          "I went to check it. And then it hit me: what does the system know, and what does only the simulator know? Once I separated the real value from the measured value, the problem showed up. Decisions were made on the measured number, and the simulator never checked against the true one.",
          "The fix followed: re-measure the chosen candidate with fresh, independent measurements, compare in pairs against the current version, and require the lower bound of the gain's confidence interval to pass the minimum. In the original study, with measurement noise of 0.20, the naive policy got 10.5% of its promotions wrong. The holdout policy got 0%."
         ]},
        {titulo:"What else I needed to measure",
         paragrafos:["Fixing promotion was not enough. To trust any result from the simulator, these pieces were missing:"],
         lista:[
          {t:"A reference that does not evolve.", d:"Without it there is no way to tell whether the system improved or the environment changed."},
          {t:"Many seeds, with a confidence interval.", d:"One run only tells one version. The table above exists for this reason."},
          {t:"Real value kept apart from measured value.", d:"Only then can you count how many promotions were false."},
          {t:"Looking at the worst scenario, not just the average.", d:"A severe failure in the critical scenario cannot be offset by a good normal scenario."},
          {t:"Separate costs.", d:"Research, validation and wall-clock time are different things, and holdout spends more on validation."},
          {t:"Rollback with a verified destination.", d:"Revert only to the previous version, after measuring that it is really better, with a cooldown to avoid flip-flopping."},
          {t:"A drift monitor.", d:"PSI, Wasserstein distance, CUSUM and EWMA to notice when the environment changes regime."},
          {t:"Risk calibration.", d:"A predicted risk of 20% has to match about 20% of real incidents."}
         ]},
        {titulo:"What is left out",
         paragrafos:[
          "This demo does not measure training cost. That is something obvious: everyone knows that training large models is expensive and slow, and that this weighs on any recursive improvement process. I left it out on purpose, as a starting point and not as something I could test or validate.",
          "Risk works the same way. Here the danger is only the false promotion, a small and abstract harm. The real danger is treated as fact by the people at the center of the subject: in June 2026, a US executive order began inviting companies to hand the government, up to 30 days before release, frontier models with cybersecurity capabilities for evaluation. That already shows how seriously the risk is taken.",
          "What the demo shows is only the part that can be measured without real data: the safeguard has a price. In the table, the holdout policy promotes far less and, in several settings, ends with a lower real value than the naive one. Whoever has safeguards errs less and moves more slowly. Whoever does not learns faster and takes more risk. How much is that worth? Only real-world data can answer."
         ]}
      ],
      aviso:"This is not a complete simulator, nor something that could be taken to a professional level. No parameter here comes from real data: every number is an assumption used to illustrate the method. The demo shows a real statistical trap, but it does not predict the behavior of any actual system."
    },
    tetris:{fechar:"Close", label:"Boredom solved", controles:"← → move · ↑ rotate · ↓ drop · space to pause", pontos:"points", fim:"Game over.", pausado:"Paused.", pausar:"Pause", continuar:"Resume", girar:"Rotate", recomecar:"Restart", descer:"↓ drop"}
  }
};
