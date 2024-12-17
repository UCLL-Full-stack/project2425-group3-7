/*
  Warnings:

  - You are about to drop the `FilmWatchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilmWatchlist" DROP CONSTRAINT "FilmWatchlist_filmId_fkey";

-- DropForeignKey
ALTER TABLE "FilmWatchlist" DROP CONSTRAINT "FilmWatchlist_watchlistId_fkey";

-- DropTable
DROP TABLE "FilmWatchlist";

-- CreateTable
CREATE TABLE "_FilmToWatchlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToWatchlist_AB_unique" ON "_FilmToWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToWatchlist_B_index" ON "_FilmToWatchlist"("B");

-- AddForeignKey
ALTER TABLE "_FilmToWatchlist" ADD CONSTRAINT "_FilmToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToWatchlist" ADD CONSTRAINT "_FilmToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
