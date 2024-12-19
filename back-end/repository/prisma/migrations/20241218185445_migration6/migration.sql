/*
  Warnings:

  - You are about to drop the `FilmWatchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilmWatchlist" DROP CONSTRAINT "FilmWatchlist_filmId_fkey";

-- DropForeignKey
ALTER TABLE "FilmWatchlist" DROP CONSTRAINT "FilmWatchlist_watchlistId_fkey";

-- DropIndex
DROP INDEX "Watchlist_userId_key";

-- DropTable
DROP TABLE "FilmWatchlist";

-- CreateTable
CREATE TABLE "_WatchlistFilms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WatchlistFilms_AB_unique" ON "_WatchlistFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_WatchlistFilms_B_index" ON "_WatchlistFilms"("B");

-- RenameForeignKey
ALTER TABLE "Watchlist" RENAME CONSTRAINT "FK_Watchlist_User" TO "Watchlist_userId_fkey";

-- AddForeignKey
ALTER TABLE "_WatchlistFilms" ADD CONSTRAINT "_WatchlistFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WatchlistFilms" ADD CONSTRAINT "_WatchlistFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
