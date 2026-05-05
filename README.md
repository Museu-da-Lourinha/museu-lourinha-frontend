# Museu da Lourinhã – Frontend

Site institucional do Museu da Lourinhã.
Stack: **Next.js (App Router) + React + TypeScript + Tailwind CSS** com `next-intl` para PT/EN.

## 1. Arquitetura do site

Locale-prefixed (`pt` por defeito, `en` disponível):

```
/{locale}                Home (3 pilares)
/{locale}/visita         Bilheteira / Exposições / Informação Prática
/{locale}/investigacao   Laboratório / Coleções / Artigos Científicos / Equipa
/{locale}/educacao       Programas Escolares / Apoio ao Conhecimento / Estágios
/{locale}/sobre          Missão, Visão, Enquadramento Institucional
/{locale}/contactos      Morada, Contactos e Horário
```

## 2. Component tree

```
src/app/[locale]/layout.tsx
└─ Navbar (fixo, PT/EN switcher, mobile hamburger)
   main
   └─ Page
      ├─ Home (page.tsx)
      │   ├─ Hero
      │   ├─ TopicPillar × 3
      │   └─ Footer
      └─ Inner pages (visita, investigacao, educacao, sobre, contactos)
          ├─ InnerPageHero
          ├─ Section
          │   └─ TopicCard × N
          └─ Footer
```

Componentes reutilizáveis:

- `src/components/Navbar.tsx`
- `src/components/InnerPageHero.tsx`
- `src/components/home/Footer.tsx`
- `src/components/home/Section.tsx`
- `src/components/home/TopicPillar.tsx`
- `src/components/home/TopicCard.tsx`

## 3. Design system

Tokens definidos em `src/app/globals.css`:

- **Cores principais:** Azulão `#25408F` (primary), Verde Lima `#DFDA57` (secondary), com variantes `primary-dark`, `secondary-dark` e suporte de paleta institucional completa.
- **Neutros:** `stone-50` / `stone-100` para superfícies, `stone-700/900` para texto.
- **Raios:** `sm` 4px, `md` 6px.
- **Sombras:** `--shadow-card` para cartões.
- **Tipografia:** Barlow (sans) e Dosis (display) via `next/font`.
- **Foco visível:** `:focus-visible` global em azul primário com offset.

CTA principal: amarelo sobre azul (hero / fundos escuros) e azul sobre claro (com texto amarelo) em superfícies claras.

## 4. Acessibilidade & SEO

- `<html lang>` por locale.
- Skip link "Saltar para o conteúdo" no Navbar.
- `aria-current="page"` nos links de navegação ativos.
- `aria-label` em landmarks e botões de ícone.
- `metadataBase`, título e descrição por página + Open Graph configurados.
- Imagens otimizadas via `next/image` com `priority` apenas em heroes.

## 5. Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npm run build    # produção
npm start        # servir produção
```

## 6. Onde substituir conteúdo

- **Páginas:** `src/app/[locale]/(home, visita, investigacao, educacao, sobre, contactos)/page.tsx`
- **Navegação:** `src/components/Navbar.tsx`
- **Rodapé:** `src/components/home/Footer.tsx`
- **Imagens locais:** `public/assets/home/` (logo + fotografias institucionais)
- **Tokens / cores:** `src/app/globals.css`
- **Traduções:** `messages/pt.json`, `messages/en.json`

## 7. CMS-ready

A camada de dados está isolada nos componentes de página. Para integração com CMS:

- substituir os arrays/strings hardcoded por chamadas server-side a uma API/CMS;
- preservar os componentes (`TopicCard`, `Section`, `TopicPillar`) como camada de apresentação;
- manter o sistema de `metadata` por página para SEO server-rendered.

## 8. Deployment

- Pronto para Vercel (App Router + `next-intl`).
- Antes de publicar:
  - `npm run lint`
  - `npm run build`
  - validar rotas PT/EN (`/pt`, `/en` e subrotas)
  - revisar metadados Open Graph
  - comprimir/otimizar novas imagens em `public/assets/home`
