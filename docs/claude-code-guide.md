# Manual do Projecto -- Museu da Lourinha

> Este manual explica tudo o que foi configurado neste projecto e porque.
> Foi escrito para que qualquer pessoa, mesmo sem experiencia, consiga perceber
> as decisoes tomadas e trabalhar no projecto com confianca.

---

## Indice

1. [Antes de comecar: conceitos basicos](#1-antes-de-comecar-conceitos-basicos)
2. [O nosso projecto](#2-o-nosso-projecto)
3. [O que e o Claude Code e porque o usamos](#3-o-que-e-o-claude-code-e-porque-o-usamos)
4. [CLAUDE.md -- a "ficha tecnica" do projecto](#4-claudemd--a-ficha-tecnica-do-projecto)
5. [Agentes -- os nossos especialistas virtuais](#5-agentes--os-nossos-especialistas-virtuais)
6. [Hooks -- automacoes que nos protegem](#6-hooks--automacoes-que-nos-protegem)
7. [Permissoes -- o que o Claude pode e nao pode fazer](#7-permissoes--o-que-o-claude-pode-e-nao-pode-fazer)
8. [Fundacoes do site](#8-fundacoes-do-site)
9. [Como criar Pull Requests](#9-como-criar-pull-requests)
10. [Como usar tudo isto no dia-a-dia](#10-como-usar-tudo-isto-no-dia-a-dia)
11. [Mapa completo dos ficheiros](#11-mapa-completo-dos-ficheiros)

---

## 1. Antes de comecar: conceitos basicos

Se algum destes termos e novo para ti, le esta seccao. Se ja os conheces, avanca.

### O que e um terminal / CLI?

O **terminal** e uma janela onde escreves comandos em texto em vez de clicar em botoes.
**CLI** (Command Line Interface) e qualquer programa que funciona no terminal.
Exemplo: quando escreves `npm run dev`, estas a usar o terminal para iniciar o servidor de desenvolvimento.

### O que e uma "stack"?

E o conjunto de tecnologias que usamos no projecto. A nossa stack e:

| Tecnologia | O que faz | Analogia simples |
|-----------|-----------|-----------------|
| **Next.js** | Framework para construir o site | O esqueleto da casa |
| **React** | Biblioteca para criar interfaces | Os tijolos e janelas |
| **TypeScript** | JavaScript com verificacao de tipos | Um corrector ortografico para codigo |
| **Tailwind CSS** | Estilos visuais (cores, espacamentos) | A tinta e decoracao |
| **Strapi** | Gestor de conteudo (CMS) | O backoffice onde se escreve texto e mete imagens |
| **GraphQL** | Linguagem para pedir dados ao Strapi | A "pergunta" que fazemos ao backoffice |
| **next-intl** | Internacionalizacao (PT/EN) | O tradutor automatico |

### O que e linting?

**Linting** e uma verificacao automatica do codigo. Como o corrector ortografico do Word,
mas para codigo. Apanha erros como variaveis nao usadas, imports esquecidos, ou
formatacao incorrecta. No nosso projecto usamos o **ESLint**.

### O que e um build?

**Build** e o processo de transformar o nosso codigo de desenvolvimento numa versao
optimizada para publicar na internet. Se o build falhar, significa que ha um erro
que impede o site de funcionar. E como tentar imprimir um documento com erros --
a impressora recusa.

### O que e SEO?

**SEO** (Search Engine Optimization) e o conjunto de tecnicas para que o Google
encontre e mostre o nosso site nos resultados de pesquisa. Se alguem pesquisar
"museu lourinha", queremos aparecer nos primeiros resultados.

### O que e acessibilidade (a11y)?

**Acessibilidade** significa que o site funciona para todas as pessoas, incluindo:
- Pessoas cegas (que usam leitores de ecra)
- Pessoas com mobilidade reduzida (que navegam so com teclado)
- Pessoas daltonicas (que precisam de bom contraste de cores)
- Pessoas com epilepsia (que nao podem ver animacoes rapidas)

O "a11y" e uma abreviatura: **a** + 11 letras + **y** = accessibility.

---

## 2. O nosso projecto

Estamos a construir o **site do Museu da Lourinha**. E um site publico, bilingue
(Portugues e Ingles), que mostra informacao sobre o museu, as suas seccoes,
noticias e informacoes praticas (horarios, contactos, etc.).

### Estrutura das pastas

```
museu-lourinha-frontend/
├── src/                          # Todo o codigo fonte
│   ├── app/                      # Paginas do site (Next.js App Router)
│   │   ├── [locale]/             # Paginas por lingua (pt ou en)
│   │   │   ├── [section]/        # Paginas das seccoes (museu, visitar, etc.)
│   │   │   ├── layout.tsx        # Layout comum a todas as paginas
│   │   │   ├── page.tsx          # Pagina inicial
│   │   │   ├── loading.tsx       # O que aparece enquanto carrega
│   │   │   ├── error.tsx         # O que aparece quando ha um erro
│   │   │   └── not-found.tsx     # O que aparece quando a pagina nao existe
│   │   ├── sitemap.ts            # Mapa do site para o Google
│   │   ├── robots.ts             # Regras para os motores de busca
│   │   └── globals.css           # Estilos globais e cores do museu
│   ├── components/               # Componentes reutilizaveis
│   │   ├── Navbar.tsx            # Barra de navegacao
│   │   └── Footer.tsx            # Rodape
│   ├── i18n/                     # Configuracao de linguas
│   ├── lib/                      # Utilitarios (cliente GraphQL)
│   └── types/                    # Tipos TypeScript partilhados
├── messages/                     # Ficheiros de traducao
│   ├── pt.json                   # Textos em Portugues
│   └── en.json                   # Textos em Ingles
├── CLAUDE.md                     # Contexto do projecto para o Claude
├── .env.example                  # Variaveis de ambiente (modelo)
└── .claude/                      # Configuracao do Claude Code
    ├── settings.json             # Configuracoes da equipa
    └── agents/                   # Agentes especializados
```

### O que e o `[locale]` e o `[section]`?

Os parenteses rectos significam que e **dinamico**. Em vez de criar uma pasta `pt/`
e outra `en/`, criamos uma pasta `[locale]/` que funciona para qualquer lingua.
O Next.js substitui `[locale]` pelo valor real (pt ou en) quando alguem visita o site.

Assim:
- `museu-lourinha.pt/pt` -> usa locale = "pt"
- `museu-lourinha.pt/en` -> usa locale = "en"
- `museu-lourinha.pt/pt/museu` -> usa locale = "pt", section = "museu"

---

## 3. O que e o Claude Code e porque o usamos

O **Claude Code** e um assistente de programacao que funciona no terminal.
Em vez de pesquisar no Google ou no ChatGPT e copiar/colar respostas,
o Claude Code trabalha directamente no projecto: le ficheiros, edita codigo,
corre comandos e verifica erros.

### Porque o configuramos?

Sem configuracao, o Claude Code e generico -- nao sabe nada sobre o nosso projecto.
Com a configuracao que fizemos, ele:

- **Conhece a stack** (sabe que usamos Next.js, Tailwind, etc.)
- **Segue as convencoes** (usa as fontes certas, cria componentes como nos queremos)
- **Tem especialistas** (agentes para seguranca, acessibilidade, traducoes, etc.)
- **Protege-nos de erros** (corre lint e build automaticamente)

E como ter um colega experiente sempre disponivel que conhece o projecto de cor.

### Onde esta a configuracao?

Toda a configuracao vive em ficheiros dentro do projecto:

| Ficheiro | O que faz | Quem o le |
|----------|-----------|-----------|
| `CLAUDE.md` | Descreve o projecto | O Claude, automaticamente |
| `.claude/settings.json` | Permissoes e automacoes | O Claude Code (programa) |
| `.claude/agents/*.md` | Instrucoes dos especialistas | O Claude, quando invocados |

---

## 4. CLAUDE.md -- a "ficha tecnica" do projecto

O `CLAUDE.md` e o ficheiro mais importante. E lido **automaticamente** no inicio
de cada conversa com o Claude. Funciona como um briefing:

> "Ola Claude, este projecto usa Next.js 16 com TypeScript. Os componentes ficam
> em src/components/. As traducoes ficam em messages/. Usa Tailwind para estilos.
> A fonte para titulos e Dosis, para corpo e Barlow."

### Porque e que isto importa?

**Sem CLAUDE.md:** Se pedires "cria um componente para mostrar o horario do museu",
o Claude pode criar algo com CSS normal, sem traducoes, com a estrutura errada.

**Com CLAUDE.md:** O Claude ja sabe que deve usar Tailwind, `useTranslations()`,
a fonte Dosis para o titulo, e colocar o ficheiro em `src/components/`.

### O que contem?

- Stack (tecnologias)
- Estrutura de pastas
- Comandos (`npm run dev`, `npm run build`, `npm run lint`)
- Convencoes (fontes, estilos, quando usar `"use client"`)
- Path alias (`@/*` mapeia para `src/*`)
- Variavel de ambiente do Strapi

---

## 5. Agentes -- os nossos especialistas virtuais

Imagina que tens uma equipa com 5 especialistas, cada um com conhecimento profundo
numa area. Os agentes sao exactamente isso, mas virtuais.

Cada agente e um ficheiro `.md` na pasta `.claude/agents/` com instrucoes
detalhadas sobre o que verificar e como reportar.

### Seguranca (`security.md`)

**Papel:** O guarda de seguranca do projecto.

**O que faz:** Procura falhas que hackers poderiam explorar.

**Exemplos do que encontra:**
- Passwords ou chaves secretas escritas directamente no codigo
  (em vez de estarem em variaveis de ambiente)
- Codigo que permite a alguem injectar scripts maliciosos no site (XSS)
- Dados sensiveis que sao enviados para o browser sem necessidade

**Porque precisamos disto?**
O site do museu e publico -- qualquer pessoa na internet pode acede-lo.
Se houver uma falha de seguranca, alguem poderia alterar o conteudo do site
ou roubar dados. E melhor prevenir do que remediar.

**Como usar:**
```
@security audita todo o projecto
```

---

### Refactoring (`refactor.md`)

**Papel:** O revisor de qualidade do codigo.

**O que faz:** Encontra codigo que funciona mas que podia ser mais limpo,
mais simples ou mais eficiente.

**Exemplos do que encontra:**
- O mesmo bloco de codigo copiado em 3 sitios diferentes
  (devia ser uma funcao reutilizavel)
- Uma funcao com 100 linhas (devia ser dividida em funcoes mais pequenas)
- Um componente que esta marcado como "client" mas nao precisa de ser
  (componentes "server" sao mais rapidos)

**Porque precisamos disto?**
Codigo desorganizado cria problemas: e dificil de perceber, dificil de alterar,
e quando altera uma coisa parte outra. Manter o codigo limpo desde o inicio
poupa muito tempo no futuro.

**Como usar:**
```
@refactor analisa o ficheiro src/components/Navbar.tsx
```

---

### Traducoes (`i18n.md`)

**Papel:** O tradutor e verificador de consistencia.

**O que faz:** Garante que todas as traducoes estao completas e correctas
entre Portugues e Ingles.

**Exemplos do que encontra:**
- Uma chave "openingHours" existe em `pt.json` mas nao em `en.json`
  (visitantes ingleses veriam um erro)
- Uma traducao no codigo (`t("schedule")`) que nao existe em nenhum ficheiro JSON
- Texto escrito directamente no codigo ("Aberto das 10h as 18h") em vez
  de usar o sistema de traducoes

**Porque precisamos disto?**
O site e bilingue. Se uma traducao falhar, o visitante ve uma chave tecnica
como "Nav.museu" em vez de "Museum". Isso parece pouco profissional e confuso.

**Como usar:**
```
@i18n verifica se ha traducoes em falta
```

---

### Componentes (`component.md`)

**Papel:** O arquitecto de componentes.

**O que faz:** Cria novos componentes React seguindo exactamente os padroes
do projecto.

**O que garante:**
- Usa Tailwind para estilos (nao CSS normal)
- Usa o sistema de traducoes (nao texto directo)
- Usa as fontes certas (Dosis para titulos, Barlow para corpo)
- Cria o ficheiro no sitio certo (`src/components/`)
- Adiciona as traducoes a ambos os ficheiros (PT e EN)

**Porque precisamos disto?**
Consistencia. Se cada pessoa criar componentes a sua maneira, o projecto
torna-se uma manta de retalhos. Este agente garante que tudo segue o mesmo padrao,
como uma receita que todos seguem.

**Como usar:**
```
@component cria um componente CardNoticia com titulo, imagem e data
```

---

### Acessibilidade (`a11y.md`)

**Papel:** O defensor dos utilizadores com necessidades especiais.

**O que faz:** Verifica se o site cumpre as normas **WCAG 2.1 AA** --
o padrao internacional de acessibilidade para sites.

**Exemplos do que verifica:**

| Verificacao | Porque | Quem beneficia |
|-------------|--------|----------------|
| Texto tem contraste suficiente com o fundo | Se o texto for cinzento claro num fundo branco, ninguem le bem | Todos, especialmente pessoas com baixa visao |
| Imagens tem texto alternativo (`alt`) | Leitores de ecra descrevem a imagem para pessoas cegas | Pessoas cegas |
| Tudo funciona so com teclado | Nem todos usam rato | Pessoas com mobilidade reduzida |
| Botoes parecem botoes no codigo | Leitores de ecra precisam de saber que e um botao | Pessoas cegas |
| Animacoes podem ser desligadas | Animacoes rapidas causam desconforto | Pessoas com epilepsia ou vestibulares |

**Porque precisamos disto?**
Um museu e um espaco publico -- o site tambem. Se uma pessoa cega nao consegue
navegar o site para ver o horario, estamos a excluir essa pessoa.
Acessibilidade nao e um "extra" -- e um requisito.

**Como usar:**
```
@a11y audita a pagina inicial
```

---

## 6. Hooks -- automacoes que nos protegem

Os **hooks** sao comandos que correm automaticamente quando algo acontece.
Funcionam como regras automaticas: "sempre que X acontecer, faz Y".

### Hook 1: Lint automatico apos cada edicao

```
QUANDO: O Claude edita ou cria um ficheiro
ENTAO: Corre o ESLint automaticamente
```

**Na pratica:** Cada vez que o Claude muda uma linha de codigo, o linting
corre nos bastidores. Se houver um erro (por exemplo, uma variavel que ja nao
e usada), aparece imediatamente.

**Porque:** E como ter um corrector ortografico que funciona em tempo real.
Sem isto, so descobriamos os erros muito mais tarde.

---

### Hook 2: Build obrigatorio antes de commits

```
QUANDO: O Claude tenta fazer git commit
ENTAO: Corre o build de producao primeiro
SE: O build falhar -> BLOQUEIA o commit
```

**Na pratica:** Antes de guardar as alteracoes no git, o projecto inteiro
e compilado. Se houver um erro que impeca o site de funcionar, o commit
nao acontece. O Claude tem de corrigir o erro primeiro.

**Porque:** Imagina fazer commit de codigo que parte o site. Toda a equipa fica
bloqueada. Este hook garante que so codigo funcional entra no repositorio.

---

## 7. Permissoes -- o que o Claude pode e nao pode fazer

O Claude Code pode correr comandos no terminal, mas nem todos sao seguros.
Por isso, definimos uma lista de comandos **permitidos automaticamente**
e tudo o resto **precisa de confirmacao**.

### Permitidos automaticamente (sem perguntar)

| Comando | Porque e seguro |
|---------|----------------|
| `npm run lint` | So verifica codigo, nao altera nada |
| `npm run build` | Compila o projecto, nao altera ficheiros fonte |
| `npm run dev` | Inicia o servidor local |
| `npm audit` | Verifica vulnerabilidades, so leitura |
| `npx tsc --noEmit` | Verifica tipos TypeScript, so leitura |
| `git status` | Mostra estado do repositorio |
| `git log*` | Mostra historico |
| `git diff*` | Mostra diferencas |
| `git branch*` | Lista branches |

### Precisam de confirmacao (o Claude pergunta antes)

- Instalar pacotes (`npm install`)
- Fazer push para o repositorio remoto (`git push`)
- Apagar ficheiros
- Qualquer outro comando

**Porque fazemos isto?**
Seguranca. Um comando errado pode apagar codigo, publicar algo incompleto,
ou instalar um pacote malicioso. Ao limitar o que e automatico, mantemos
o controlo sobre accoes perigosas.

---

## 8. Fundacoes do site

Alem da configuracao do Claude, preparamos as fundacoes para que o site
funcione bem desde o primeiro dia.

### 8.1 Paginas de erro -- nao deixar o utilizador perdido

Quando algo corre mal num site (pagina nao encontrada, erro do servidor),
o utilizador precisa de saber o que aconteceu e o que fazer a seguir.

| Situacao | Ficheiro | O que o utilizador ve |
|----------|----------|-----------------------|
| A pagina esta a carregar | `loading.tsx` | Um spinner (circulo a rodar) |
| A pagina nao existe | `not-found.tsx` | "Pagina nao encontrada" + botao para o inicio |
| Houve um erro tecnico | `error.tsx` | "Algo correu mal" + botao "Tentar novamente" |

**Sem estes ficheiros:** O utilizador veria uma pagina branca ou um erro tecnico
confuso cheio de codigo. Com eles, ve uma mensagem clara com uma accao que pode tomar.

### 8.2 SEO -- ser encontrado no Google

Para o Google mostrar o nosso site, precisa de o "conhecer". Criamos 4 coisas:

**Sitemap (`sitemap.ts`):** Um ficheiro que lista todas as paginas do site.
E como um indice de um livro -- o Google le este ficheiro e sabe que paginas existem.
O nosso sitemap inclui as versoes PT e EN de cada pagina.

**Robots.txt (`robots.ts`):** Regras para os motores de busca.
No nosso caso, simplesmente dizemos "podes indexar tudo" e apontamos para o sitemap.

**OpenGraph:** Quando alguem partilha o link do museu no Facebook, WhatsApp ou Twitter,
aparece um "cartao" com titulo e descricao em vez de so o URL. O OpenGraph controla
o que aparece nesse cartao. Configuramo-lo para mostrar informacao diferente
consoante a lingua (PT ou EN).

**JSON-LD:** Dados estruturados que dizem ao Google "este site e de um museu".
O Google pode usar esta informacao para mostrar um cartao especial nos resultados
de pesquisa (com morada, horario, etc.) em vez de so o link normal.

### 8.3 Tipos partilhados -- evitar erros com dados

Quando pedimos dados ao Strapi (por exemplo, noticias), precisamos de saber
que formato esses dados tem. O TypeScript permite-nos definir isso:

```typescript
// src/types/strapi.ts
type NewsItem = {
  documentId: string;      // ID unico
  title: string;           // Titulo da noticia
  content: string;         // Conteudo
  slug: string;            // URL amigavel (ex: "dinossauro-descoberto")
  publishedAt: string;     // Data de publicacao
};
```

**Sem tipos:** Se o Strapi mudar o nome de um campo de `title` para `titulo`,
o erro so aparece quando alguem visita o site. Com tipos, o TypeScript
avisa-nos imediatamente durante o desenvolvimento.

**Porque ficam num ficheiro separado?**
Antes, estes tipos estavam definidos dentro da pagina inicial. Mas quando
tivermos 10 paginas a usar noticias, seria preciso copiar os tipos 10 vezes.
Com um ficheiro central (`src/types/strapi.ts`), todas as paginas importam
do mesmo sitio.

### 8.4 Footer -- o rodape do site

O Footer aparece em **todas** as paginas do site. Contem:
- Morada do museu
- Telefone e email
- Links de navegacao
- Horario de funcionamento
- Copyright

E um componente reutilizavel com traducoes em PT e EN. Foi adicionado
ao layout principal para aparecer automaticamente em todas as paginas.

### 8.5 Configuracao do Next.js -- seguranca e imagens

**Dominios de imagens:** O Next.js, por seguranca, bloqueia imagens de dominios
desconhecidos. Configuramos o dominio do Strapi para que as imagens do CMS
aparecam no site.

**Headers de seguranca:** Adicionamos proteccoes automaticas:

| Header | Protege contra |
|--------|---------------|
| `X-Frame-Options: DENY` | O site ser embutido num iframe malicioso (clickjacking) |
| `X-Content-Type-Options: nosniff` | O browser interpretar ficheiros de forma errada |
| `Referrer-Policy` | Enviar URLs internas para sites externos |
| `Permissions-Policy` | Acesso nao autorizado a camera/microfone/localizacao |

### 8.6 Variaveis de ambiente -- `.env.example`

As variaveis de ambiente sao configuracoes que mudam entre ambientes
(o teu computador, o servidor de testes, o servidor de producao).

O ficheiro `.env.example` documenta quais variaveis sao necessarias:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337    # URL do Strapi
NEXT_PUBLIC_SITE_URL=https://museu-lourinha.pt  # URL publica do site
```

**Nota importante:** O ficheiro `.env` (sem "example") contem os valores reais
e **nunca** deve ir para o git. O `.env.example` e apenas um modelo.

---

## 9. Como criar Pull Requests

### O que e um Pull Request (PR)?

Um **Pull Request** e um pedido para juntar o teu trabalho ao projecto principal.
Imagina que o projecto e um livro e tu escreveste um capitulo novo. O PR e quando
dizes a equipa: "Escrevi isto, podem rever e adicionar ao livro?"

O PR permite que outras pessoas **revejam** o teu codigo antes de ele entrar
no projecto. Isto evita erros e garante qualidade.

### O que e um ticket?

Um **ticket** e uma tarefa registada num sistema de gestao de projecto (como Jira,
Linear ou GitHub Issues). Cada ticket tem um numero unico (ex: `ML-42`).
Quando trabalhas numa tarefa, o teu branch e PR devem referenciar esse numero
para que toda a gente saiba **o que** estavas a resolver.

### Formato obrigatorio dos nossos PRs

Cada PR neste projecto **deve** seguir este formato:

#### Titulo

```
[ML-42] Adicionar componente de horario do museu
```

O titulo comeca **sempre** com o numero do ticket entre parenteses rectos,
seguido de uma descricao curta do que foi feito.

#### Corpo do PR

O corpo tem 4 seccoes obrigatorias:

```markdown
## Description
O que foi feito neste PR.
Exemplo: "Criado o componente ScheduleCard que mostra o horario
de funcionamento do museu com suporte para PT e EN."

## Motivation
Porque e que esta alteracao era necessaria.
Exemplo: "Os visitantes precisam de saber o horario antes de
se deslocarem ao museu. Esta informacao estava em falta no site."

## Files Changed
- `src/components/ScheduleCard.tsx` -- novo componente de horario
- `messages/pt.json` -- adicionadas traducoes do horario
- `messages/en.json` -- adicionadas traducoes do horario
- `src/app/[locale]/page.tsx` -- integrado o ScheduleCard na homepage

## Test Plan
- [ ] Verificar que o horario aparece na homepage em PT
- [ ] Verificar que o horario aparece na homepage em EN
- [ ] Verificar que funciona em mobile
```

### Porque cada seccao?

| Seccao | Pergunta que responde | Quem beneficia |
|--------|----------------------|----------------|
| **Titulo com ticket** | "Que tarefa e esta?" | Toda a equipa -- liga o codigo a tarefa |
| **Description** | "O que foi feito?" | O revisor -- percebe o que vai ver |
| **Motivation** | "Porque foi feito?" | O revisor -- percebe se a abordagem faz sentido |
| **Files Changed** | "Onde devo olhar?" | O revisor -- guia a revisao ficheiro a ficheiro |
| **Test Plan** | "Como verifico que funciona?" | O revisor e o QA -- sabem o que testar |

### O que acontece automaticamente

Quando crias um PR com o Claude Code, **5 verificacoes** correm automaticamente
nos bastidores, antes do PR ser criado:

| Ordem | Agente | O que verifica | Pode bloquear o PR? |
|-------|--------|---------------|---------------------|
| 1 | Seguranca | XSS, segredos expostos, injecao, headers | Sim, se houver problemas criticos |
| 2 | Acessibilidade | Alt text, HTML semantico, contraste, teclado | Sim, se faltar alt text ou botoes nao semanticos |
| 3 | Traducoes | Chaves em falta entre PT/EN, strings hardcoded | Sim, se houver chaves que causam erro |
| 4 | Qualidade | Codigo duplicado, `any` types, componentes mal classificados | Sim, se houver problemas graves |
| 5 | Documentacao | Actualiza este manual com o que foi feito | Nao |

**Se algum agente encontrar um problema critico, o PR e bloqueado.**
O Claude mostra o problema e tens de o corrigir antes de tentar novamente.
Isto garante que codigo com falhas de seguranca, acessibilidade ou traducoes
nunca chega ao projecto principal.

Alem destas verificacoes, o Claude segue o formato obrigatorio de PR
(esta descrito no `CLAUDE.md`) e gera o titulo, descricao, motivacao
e lista de ficheiros automaticamente.

### Exemplo pratico

Se o Claude criar o PR por ti, o resultado sera algo assim:

```
Titulo: [ML-42] Add museum schedule component

## Description
Added the ScheduleCard component displaying museum opening hours
with full PT/EN translation support.

## Motivation
Visitors need to check opening hours before planning their visit.
This information was missing from the website.

## Files Changed
- `src/components/ScheduleCard.tsx` -- new component with weekday/weekend hours
- `messages/pt.json` -- added Footer.hours, Footer.closedDay keys
- `messages/en.json` -- added Footer.hours, Footer.closedDay keys
- `src/app/[locale]/page.tsx` -- integrated ScheduleCard in homepage

## Test Plan
- [ ] Homepage shows hours in PT at /pt
- [ ] Homepage shows hours in EN at /en
- [ ] Layout is responsive on mobile
```

---

## 10. Como usar tudo isto no dia-a-dia

### Comecar a trabalhar

```bash
# 1. Abrir o terminal na pasta do projecto
cd museu-lourinha-frontend

# 2. Iniciar o Claude Code
claude

# 3. Comecar a trabalhar -- o Claude ja conhece o projecto
```

### Usar os agentes

Ha 3 formas, da mais directa a mais automatica:

**1. @-mention (tu decides qual agente usar)**
```
@security verifica o Navbar
@a11y audita a pagina de visitas
@i18n ha traducoes em falta?
@component cria um CardHorario com dias e horas
@refactor melhora o ficheiro strapi.ts
```

**2. Linguagem natural (o Claude decide se precisa de um agente)**
```
Verifica se ha problemas de seguranca
Cria um componente para mostrar noticias
```

**3. Sessao dedicada (todo o trabalho usa um agente)**
```bash
claude --agent security    # sessao inteira focada em seguranca
```

### Fluxo recomendado para uma feature nova

```
1. Pede ao @component para criar a estrutura base
   -> Ele cria o ficheiro, adiciona traducoes, segue os padroes

2. Desenvolve a feature
   -> O lint corre automaticamente a cada edicao do Claude

3. Quando achares que esta pronto, pede revisoes:
   @a11y verifica o novo componente
   @i18n estao todas as traducoes?
   @security ha algum problema?

4. Faz commit
   -> O build corre automaticamente e bloqueia se falhar

5. Periodicamente, pede ao @refactor para rever o codigo
```

---

## 11. Mapa completo dos ficheiros

Referencia rapida de tudo o que foi criado e porque:

### Configuracao Claude Code

| Ficheiro | O que faz |
|----------|-----------|
| `CLAUDE.md` | Briefing permanente -- o Claude conhece o projecto |
| `.claude/settings.json` | Permissoes + hooks automaticos (partilhado pela equipa) |
| `.claude/settings.local.json` | Configuracoes pessoais (nao vai para o git) |
| `.claude/agents/security.md` | Especialista em seguranca (OWASP, XSS, dados expostos) |
| `.claude/agents/refactor.md` | Especialista em qualidade de codigo |
| `.claude/agents/i18n.md` | Especialista em traducoes PT/EN |
| `.claude/agents/component.md` | Gerador de componentes padronizado |
| `.claude/agents/a11y.md` | Especialista em acessibilidade (WCAG 2.1 AA) |

### Fundacoes do site

| Ficheiro | O que faz |
|----------|-----------|
| `src/app/[locale]/loading.tsx` | Spinner enquanto a pagina carrega |
| `src/app/[locale]/error.tsx` | Pagina de erro com botao de retry |
| `src/app/[locale]/not-found.tsx` | Pagina 404 com link para o inicio |
| `src/app/not-found.tsx` | 404 para rotas fora do sistema de linguas |
| `src/app/sitemap.ts` | Mapa do site para o Google |
| `src/app/robots.ts` | Permissoes para motores de busca |
| `src/types/strapi.ts` | Tipos TypeScript para dados do CMS |
| `src/components/Footer.tsx` | Rodape com info do museu |
| `next.config.ts` | Imagens do Strapi + headers de seguranca |
| `.env.example` | Modelo das variaveis de ambiente |

### Traducoes adicionadas

| Chave | Portugues | Ingles |
|-------|-----------|--------|
| `Error.title` | Algo correu mal | Something went wrong |
| `Error.description` | Ocorreu um erro inesperado... | An unexpected error occurred... |
| `Error.retry` | Tentar novamente | Try again |
| `NotFound.title` | Pagina nao encontrada | Page not found |
| `NotFound.description` | A pagina que procura nao existe... | The page you are looking for... |
| `NotFound.home` | Voltar ao inicio | Back to home |
| `Footer.address` | Rua Joao Luis de Moura... | (mesmo) |
| `Footer.explore` | Explorar | Explore |
| `Footer.schedule` | Horario | Opening hours |
| `Footer.hours` | Ter - Dom: 10h00 - 18h00 | Tue - Sun: 10:00 AM - 6:00 PM |
| `Footer.closedDay` | Encerrado a segunda-feira | Closed on Mondays |
| `Footer.rights` | Todos os direitos reservados. | All rights reserved. |

---

> **Ultima actualizacao:** Abril 2025
>
> Este manual e actualizado automaticamente pelo agente de documentacao.
> Se fizeres algo significativo no projecto, pede:
> `@docs documenta o que foi feito e porque`
