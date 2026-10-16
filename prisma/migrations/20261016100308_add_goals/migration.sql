/*
  Warnings:

  - A unique constraint covering the columns `[openLibraryId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `openLibraryId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BelongsTo" DROP CONSTRAINT "BelongsTo_bookid_fkey";

-- DropForeignKey
ALTER TABLE "BelongsTo" DROP CONSTRAINT "BelongsTo_genreid_fkey";

-- DropForeignKey
ALTER TABLE "InterestBook" DROP CONSTRAINT "InterestBook_bookid_fkey";

-- DropForeignKey
ALTER TABLE "InterestBook" DROP CONSTRAINT "InterestBook_interestid_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverId" INTEGER,
ADD COLUMN     "openLibraryId" TEXT NOT NULL,
ADD COLUMN     "publishedYear" INTEGER,
ALTER COLUMN "author" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Goal" (
    "goalid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("goalid")
);

-- CreateTable
CREATE TABLE "UserGoal" (
    "userid" INTEGER NOT NULL,
    "goalid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("userid","goalid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_name_key" ON "Goal"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_openLibraryId_key" ON "Book"("openLibraryId");

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_goalid_fkey" FOREIGN KEY ("goalid") REFERENCES "Goal"("goalid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BelongsTo" ADD CONSTRAINT "BelongsTo_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BelongsTo" ADD CONSTRAINT "BelongsTo_genreid_fkey" FOREIGN KEY ("genreid") REFERENCES "Genre"("genreid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestBook" ADD CONSTRAINT "InterestBook_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestBook" ADD CONSTRAINT "InterestBook_interestid_fkey" FOREIGN KEY ("interestid") REFERENCES "Interest"("interestid") ON DELETE CASCADE ON UPDATE CASCADE;
