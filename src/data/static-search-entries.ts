import type { SearchRecord } from "@/types/search";

type StaticEntrySeed = {
  slug: string;
  url: string;
  pt: { title: string; excerpt: string };
  en: { title: string; excerpt: string };
};

const STATIC_ENTRIES: StaticEntrySeed[] = [
  {
    slug: "horarios",
    url: "/visitar#horarios",
    pt: {
      title: "Horários e bilhetes",
      excerpt:
        "Horário de abertura do Museu da Lourinhã e informação sobre bilhetes de entrada.",
    },
    en: {
      title: "Hours and tickets",
      excerpt:
        "Museu da Lourinhã opening hours and entry ticket information.",
    },
  },
  {
    slug: "como-chegar",
    url: "/visitar#como-chegar",
    pt: {
      title: "Como chegar",
      excerpt:
        "Direções e indicações para chegar ao Museu da Lourinhã, de carro ou transportes públicos.",
    },
    en: {
      title: "How to arrive",
      excerpt:
        "Directions to Museu da Lourinhã by car or public transport.",
    },
  },
  {
    slug: "acessibilidade",
    url: "/visitar#acessibilidade",
    pt: {
      title: "Acessibilidade",
      excerpt:
        "Informação sobre acessibilidade no museu para visitantes com mobilidade reduzida.",
    },
    en: {
      title: "Accessibility",
      excerpt:
        "Accessibility information for visitors with reduced mobility.",
    },
  },
  {
    slug: "tipos-de-visita",
    url: "/visitar#tipos-de-visita",
    pt: {
      title: "Tipos de visita",
      excerpt:
        "Visitas individuais, escolares e guiadas disponíveis no Museu da Lourinhã.",
    },
    en: {
      title: "Visit types",
      excerpt:
        "Individual, school, and guided visits available at Museu da Lourinhã.",
    },
  },
  {
    slug: "museu",
    url: "/museu",
    pt: {
      title: "Museu",
      excerpt:
        "Conheça o Museu da Lourinhã, um guardião do tempo no coração da Lourinhã.",
    },
    en: {
      title: "Museum",
      excerpt:
        "Learn about Museu da Lourinhã, a guardian of time in the heart of Lourinhã.",
    },
  },
  {
    slug: "sobre-nos",
    url: "/museu#sobre-nos",
    pt: {
      title: "Sobre Nós",
      excerpt: "Conheça o Museu da Lourinhã.",
    },
    en: {
      title: "About Us",
      excerpt: "Learn about Museu da Lourinhã.",
    },
  },
  {
    slug: "missao",
    url: "/museu#missao",
    pt: {
      title: "Missão",
      excerpt:
        "A missão do Museu da Lourinhã: preservar e partilhar a memória do território.",
    },
    en: {
      title: "Mission",
      excerpt:
        "Museu da Lourinhã's mission: preserving and sharing the memory of the territory.",
    },
  },
  {
    slug: "equipa",
    url: "/museu#equipa",
    pt: {
      title: "Equipa",
      excerpt: "Conheça a equipa do Museu da Lourinhã.",
    },
    en: {
      title: "Team",
      excerpt: "Meet the Museu da Lourinhã team.",
    },
  },
  {
    slug: "contacte-nos",
    url: "/museu",
    pt: {
      title: "Contacte-nos",
      excerpt: "Como entrar em contacto com o Museu da Lourinhã.",
    },
    en: {
      title: "Contact us",
      excerpt: "How to get in touch with Museu da Lourinhã.",
    },
  },
  {
    slug: "geal",
    url: "/geal",
    pt: {
      title: "GEAL",
      excerpt:
        "Grupo de Estudos de Arqueologia e Lourinhã — investigação e conservação do património.",
    },
    en: {
      title: "GEAL",
      excerpt:
        "Group for Archaeological Studies of Lourinhã — heritage research and conservation.",
    },
  },
  {
    slug: "guardioes",
    url: "/guardioes",
    pt: {
      title: "Guardiões",
      excerpt:
        "Torne-se um Guardião do Museu da Lourinhã e apoie a missão de preservar o nosso património.",
    },
    en: {
      title: "Guardians",
      excerpt:
        "Become a Guardian of Museu da Lourinhã and support our mission to preserve heritage.",
    },
  },
  {
    slug: "loja-online",
    url: "/loja-online",
    pt: {
      title: "Loja Online",
      excerpt:
        "Livros, recordações e produtos do Museu da Lourinhã.",
    },
    en: {
      title: "Online Shop",
      excerpt:
        "Books, souvenirs, and products from Museu da Lourinhã.",
    },
  },
];

export function getStaticRecords(locale: "pt" | "en"): SearchRecord[] {
  return STATIC_ENTRIES.map((entry) => {
    const localized = entry[locale];
    return {
      objectID: `static:${locale}:${entry.slug}`,
      type: "static",
      title: localized.title,
      excerpt: localized.excerpt,
      url: `/${locale}${entry.url}`,
      locale,
    };
  });
}
