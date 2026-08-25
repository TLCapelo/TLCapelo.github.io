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
      blogUltimo:"Mais recente", blogVazio:"Em breve"
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
      blogUltimo:"Latest", blogVazio:"Coming soon"
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
    tetris:{fechar:"Close", label:"Boredom solved", controles:"← → move · ↑ rotate · ↓ drop · space to pause", pontos:"points", fim:"Game over.", pausado:"Paused.", pausar:"Pause", continuar:"Resume", girar:"Rotate", recomecar:"Restart", descer:"↓ drop"}
  }
};
