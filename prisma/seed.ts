import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL mangler");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


const genres = [
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery",
  "Thriller",
  "Adventure",
  "Young Adult",
  "Hitorical Fiction",
  "Biography",
  "Self-development",
  "Horror",
  "Psychology"
];

const interests = [
  "Gaming",
  "Football",
  "Music",
  "Pschology",
  "Technology",
  "Art",
  "Science",
  "History",
  "Travel",
  "Fitness"
];

async function main() {
  // 1. Opprett sjangre
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 2. Opprett interesser
  for (const name of interests) {
    await prisma.interest.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 3. Hent bøker fra Open Library
  const queries = [
    "young adult fantasy",
    "young adult romance",
    "young adult mystery",
    "science fiction adventure",
  ];

  for (const query of queries) {
    const url = new URL("https://openlibrary.org/search.json");
    url.searchParams.set("q", query);
    url.searchParams.set(
      "fields",
      "key,title,author_name,first_publish_year,cover_i"
    );
    url.searchParams.set("limit", "10");

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Kunne ikke hente bøker for: ${query}`);
      continue;
    }

    const data = await response.json();

    for (const item of data.docs ?? []) {
      if (!item.key || !item.title) continue;

      const openLibraryId = item.key
        .replace(/^\/works\//, "");

      await prisma.book.upsert({
        where: { openLibraryId },
        update: {
          title: item.title,
          author: item.author_name?.[0] ?? null,
          publishedYear: item.first_publish_year ?? null,
          coverId: item.cover_i ?? null,
        },
        create: {
          openLibraryId,
          title: item.title,
          author: item.author_name?.[0] ?? null,
          publishedYear: item.first_publish_year ?? null,
          coverId: item.cover_i ?? null,
        },
      });
    }
  }

  console.log("Seed fullført!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });