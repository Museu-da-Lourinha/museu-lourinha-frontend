import { algoliasearch } from "algoliasearch";
import { getStaticRecords } from "../src/data/static-search-entries";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

if (!APP_ID || !ADMIN_KEY) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY are required."
  );
  process.exit(1);
}

const client = algoliasearch(APP_ID, ADMIN_KEY);

async function syncLocale(locale: "pt" | "en") {
  const indexName = `content_${locale}`;
  const records = getStaticRecords(locale);

  console.log(`[${locale}] pushing ${records.length} static records to ${indexName}`);

  await client.saveObjects({
    indexName,
    objects: records,
  });

  console.log(`[${locale}] done.`);
}

async function main() {
  await Promise.all([syncLocale("pt"), syncLocale("en")]);
  console.log("All locales synced.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
