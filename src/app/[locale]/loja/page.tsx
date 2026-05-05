import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/site/Footer";
import { PageHeader } from "@/components/page/PageHeader";
import { PageSection } from "@/components/page/PageSection";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Publicacoes, replicas e produtos editoriais ligados as colecoes e investigacao do Museu da Lourinha.",
};

export default async function LojaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const products = [
    {
      name: isEn ? "Museum Guidebook" : "Guia do Museu",
      price: isEn ? "EUR12" : "12 EUR",
      category: isEn ? "Editorial" : "Editorial",
      desc: isEn
        ? "Complete walkthrough of permanent galleries with collection highlights."
        : "Percurso completo pelas galerias permanentes com destaques de colecao.",
      imageSrc: "/assets/home/expo-1.png",
    },
    {
      name: isEn ? "Atalaia Dinosaur Replica" : "Replica de Dinossauro Atalaia",
      price: isEn ? "EUR24" : "24 EUR",
      category: isEn ? "Replica" : "Replica",
      desc: isEn
        ? "Desk-scale educational replica inspired by featured exhibition pieces."
        : "Replica educativa em escala de secretaria inspirada nas pecas em destaque.",
      imageSrc: "/assets/home/featured.png",
    },
    {
      name: isEn ? "Field Notebook" : "Caderno de Campo",
      price: isEn ? "EUR8" : "8 EUR",
      category: isEn ? "Stationery" : "Papelaria",
      desc: isEn
        ? "Durable notebook for observation notes, sketches and visit records."
        : "Caderno resistente para notas de observacao, esbocos e registos de visita.",
      imageSrc: "/assets/home/expo-3.png",
    },
    {
      name: isEn ? "Educational Postcard Set" : "Conjunto de Postais Educativos",
      price: isEn ? "EUR10" : "10 EUR",
      category: isEn ? "Print" : "Impressao",
      desc: isEn
        ? "Curated postcard series featuring specimens and heritage highlights."
        : "Serie de postais com selecao curada de exemplares e destaques patrimoniais.",
      imageSrc: "/assets/home/team-1.png",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={isEn ? "Store" : "Loja"}
        title={isEn ? "Museum Store." : "Loja do Museu."}
        lead={
          isEn
            ? "Books, replicas and editorial products connected to the collections and scientific work of Museu da Lourinha."
            : "Livros, replicas e produtos editoriais ligados as colecoes e ao trabalho cientifico do Museu da Lourinha."
        }
        imageSrc="/assets/home/featured.png"
        imageAlt={isEn ? "Museum store products" : "Produtos da loja do museu"}
        caption={isEn ? "Editorial and educational products" : "Produtos editoriais e educativos"}
      />

      <PageSection
        id="catalogo"
        eyebrow={isEn ? "Collection" : "Colecao"}
        title={isEn ? "Curated catalog." : "Catalogo curado."}
        description={
          isEn
            ? "A premium selection inspired by paleontology, archaeology and local cultural heritage."
            : "Uma selecao premium inspirada em paleontologia, arqueologia e patrimonio cultural local."
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((item) => (
            <article key={item.name} className="overflow-hidden border border-[var(--color-rule)] bg-paper-soft">
              <div
                className="h-48 w-full bg-paper-deep bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imageSrc})` }}
                aria-hidden="true"
              />
              <div className="p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">{item.category}</p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{item.name}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-ink-soft">{item.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">
                    {item.price}
                  </p>
                  <Button href="/contactos" size="md">
                    {isEn ? "Reserve" : "Reservar"}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="informacoes"
        eyebrow={isEn ? "Information" : "Informacoes"}
        title={isEn ? "Orders and pickup." : "Encomendas e levantamento."}
        description={
          isEn
            ? "Contact the museum to confirm availability, reserve products, and arrange pickup."
            : "Contacte o museu para confirmar disponibilidade, reservar produtos e combinar levantamento."
        }
        tone="soft"
      >
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
          {[
            {
              label: isEn ? "Reservations" : "Reservas",
              value: "geral@museulourinha.org",
            },
            {
              label: isEn ? "Phone" : "Telefone",
              value: "+351 261 414 003",
            },
            {
              label: isEn ? "Pickup hours" : "Horario de levantamento",
              value: isEn ? "Tue-Sun · 10:00-18:00" : "Ter-Dom · 10h00-18h00",
            },
          ].map((item) => (
            <article key={item.label} className="bg-paper p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">{item.label}</p>
              <p className="mt-2 font-display text-xl font-medium tracking-tight">{item.value}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contactos" size="lg">
            {isEn ? "Ask about availability" : "Pedir disponibilidade"}
          </Button>
        </div>
      </PageSection>

      <Footer />
    </>
  );
}
