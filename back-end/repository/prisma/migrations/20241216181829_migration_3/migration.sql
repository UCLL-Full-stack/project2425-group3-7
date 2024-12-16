/*
  Warnings:

  - Added the required column `genre` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filmId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Film" ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "filmId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "FK_Review_Film" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
