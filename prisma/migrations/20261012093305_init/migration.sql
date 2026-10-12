-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genreid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genreid")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookid")
);

-- CreateTable
CREATE TABLE "Interest" (
    "interestid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("interestid")
);

-- CreateTable
CREATE TABLE "HasInterest" (
    "interestid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HasInterest_pkey" PRIMARY KEY ("interestid","userid")
);

-- CreateTable
CREATE TABLE "BelongsTo" (
    "bookid" INTEGER NOT NULL,
    "genreid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BelongsTo_pkey" PRIMARY KEY ("bookid","genreid")
);

-- CreateTable
CREATE TABLE "Prefer" (
    "userid" INTEGER NOT NULL,
    "genreid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prefer_pkey" PRIMARY KEY ("userid","genreid")
);

-- CreateTable
CREATE TABLE "InterestBook" (
    "bookid" INTEGER NOT NULL,
    "interestid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterestBook_pkey" PRIMARY KEY ("bookid","interestid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- AddForeignKey
ALTER TABLE "HasInterest" ADD CONSTRAINT "HasInterest_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasInterest" ADD CONSTRAINT "HasInterest_interestid_fkey" FOREIGN KEY ("interestid") REFERENCES "Interest"("interestid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BelongsTo" ADD CONSTRAINT "BelongsTo_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BelongsTo" ADD CONSTRAINT "BelongsTo_genreid_fkey" FOREIGN KEY ("genreid") REFERENCES "Genre"("genreid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prefer" ADD CONSTRAINT "Prefer_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prefer" ADD CONSTRAINT "Prefer_genreid_fkey" FOREIGN KEY ("genreid") REFERENCES "Genre"("genreid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestBook" ADD CONSTRAINT "InterestBook_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestBook" ADD CONSTRAINT "InterestBook_interestid_fkey" FOREIGN KEY ("interestid") REFERENCES "Interest"("interestid") ON DELETE RESTRICT ON UPDATE CASCADE;
