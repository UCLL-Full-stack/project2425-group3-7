/*
  Warnings:

  - You are about to drop the `_FilmToWatchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FilmToWatchlist" DROP CONSTRAINT "_FilmToWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToWatchlist" DROP CONSTRAINT "_FilmToWatchlist_B_fkey";

-- DropTable
DROP TABLE "_FilmToWatchlist";

-- CreateTable
CREATE TABLE "FilmWatchlist" (
    "filmId" INTEGER NOT NULL,
    "watchlistId" INTEGER NOT NULL,

    CONSTRAINT "FilmWatchlist_pkey" PRIMARY KEY ("filmId","watchlistId")
);

-- AddForeignKey
ALTER TABLE "FilmWatchlist" ADD CONSTRAINT "FilmWatchlist_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmWatchlist" ADD CONSTRAINT "FilmWatchlist_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
