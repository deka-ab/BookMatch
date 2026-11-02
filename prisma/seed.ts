import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { GENRES, INTERESTS, GOALS } from "../data";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL mangler");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Each search adds a small, predictable batch of books and tags them with the
// genre that led to the search. Open Library can return the same book for
// multiple searches; openLibraryId and the compound relation key deduplicate it.
const imports = [
  { genreId: "fantasy", query: "fantasy" },
  { genreId: "sci-fi", query: "science fiction" },
  { genreId: "romance", query: "romance fiction" },
  { genreId: "thriller", query: "thriller fiction" },
  { genreId: "mystery", query: "mystery fiction" },
  { genreId: "horror", query: "horror fiction" },
  { genreId: "historical", query: "historical fiction" },
  { genreId: "adventure", query: "adventure fiction" },
  { genreId: "ya", query: "young adult fiction" },
  { genreId: "biography", query: "biography" },
  { genreId: "self-dev", query: "self help" },
  { genreId: "psychology", query: "psychology" },
] as const;

type SearchResult = {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

async function importGenreBooks(genreId: string, query: string) {
  const genre = GENRES.find((item) => item.id === genreId);
  if (!genre) throw new Error(`Ukjent sjanger-id: ${genreId}`);

  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set(
    "fields",
    "key,title,author_name,first_publish_year,cover_i",
  );
  url.searchParams.set("limit", "10");

  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) {
    throw new Error(`Open Library svarte ${response.status} for «${query}»`);
  }

  const data = (await response.json()) as { docs?: SearchResult[] };
  const genreRecord = await prisma.genre.findUniqueOrThrow({
    where: { name: genre.label },
  });
  let imported = 0;

  for (const item of data.docs ?? []) {
    if (!item.key?.startsWith("/works/") || !item.title?.trim()) continue;

    const openLibraryId = item.key.slice("/works/".length);
    const book = await prisma.book.upsert({
      where: { openLibraryId },
      update: {
        title: item.title.trim(),
        author: item.author_name?.[0] ?? undefined,
        publishedYear: item.first_publish_year ?? undefined,
        coverId: item.cover_i ?? undefined,
      },
      create: {
        openLibraryId,
        title: item.title.trim(),
        author: item.author_name?.[0] ?? null,
        publishedYear: item.first_publish_year ?? null,
        coverId: item.cover_i ?? null,
      },
    });

    await prisma.belongsTo.upsert({
      where: {
        bookid_genreid: { bookid: book.bookid, genreid: genreRecord.genreid },
      },
      update: {},
      create: { bookid: book.bookid, genreid: genreRecord.genreid },
    });
    imported += 1;
  }

  console.log(`«${query}»: ${imported} bøker koblet til ${genre.label}`);
}

async function main() {
  // Rename legacy misspellings when the canonical row does not exist yet.
  // If both rows already exist, leave the legacy row intact to avoid a unique
  // name collision; all new imports and UI selections use the canonical name.
  const canonicalHistorical = await prisma.genre.findUnique({
    where: { name: "Historical Fiction" },
  });
  if (!canonicalHistorical) {
    await prisma.genre.updateMany({
      where: { name: "Hitorical Fiction" },
      data: { name: "Historical Fiction" },
    });
  }
  const canonicalPsychology = await prisma.interest.findUnique({
    where: { name: "Psychology" },
  });
  if (!canonicalPsychology) {
    await prisma.interest.updateMany({
      where: { name: "Pschology" },
      data: { name: "Psychology" },
    });
  }

  // Keep these records in sync with the choices shown in the onboarding UI.
  for (const { label } of GENRES) {
    await prisma.genre.upsert({
      where: { name: label },
      update: {},
      create: { name: label },
    });
  }

  for (const { label } of INTERESTS) {
    await prisma.interest.upsert({
      where: { name: label },
      update: {},
      create: { name: label },
    });
  }

  for (const { label, desc } of GOALS) {
    await prisma.goal.upsert({
      where: { name: label },
      update: { description: desc },
      create: { name: label, description: desc },
    });
  }

  for (const { genreId, query } of imports) {
    await importGenreBooks(genreId, query);
  }

  console.log("Seed fullført!");
}

main()
  .catch((error) => {
    console.error("Seed feilet:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
