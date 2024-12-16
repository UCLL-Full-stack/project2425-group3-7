/*
  Warnings:

  - You are about to drop the column `genre` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `filmId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `releaseDate` to the `Film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "FK_Review_Film";

-- DropIndex
DROP INDEX "Film_description_key";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "genre",
DROP COLUMN "rating",
DROP COLUMN "releaseDate",
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "comment",
DROP COLUMN "filmId",
ADD COLUMN     "content" TEXT NOT NULL;
