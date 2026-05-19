import { algoliasearch } from "algoliasearch";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

if (!APP_ID || !ADMIN_KEY) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY are required."
  );
  process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);

const LOCALE_LANGUAGE: Record<"pt" | "en", "pt" | "en"> = {
  pt: "pt",
  en: "en",
};

async function configureLocale(locale: "pt" | "en") {
  const indexName = `content_${locale}`;
  const language = LOCALE_LANGUAGE[locale];

  console.log(`[${locale}] applying settings to ${indexName}`);

  await client.setSettings({
    indexName,
    indexSettings: {
      searchableAttributes: ["title", "excerpt"],
      attributesForFaceting: ["filterOnly(type)"],
      customRanking: ["desc(publishedAt)"],
      queryLanguages: [language],
      indexLanguages: [language],
      attributesToHighlight: ["title", "excerpt"],
      ignorePlurals: true,
      removeStopWords: [language],
      typoTolerance: true,
    },
  });

  console.log(`[${locale}] settings applied.`);
}

async function main() {
  await Promise.all([configureLocale("pt"), configureLocale("en")]);
  console.log("All indexes configured.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
