/*
  Warnings:

  - You are about to drop the column `sinopsis` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `synopsis` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "sinopsis",
ADD COLUMN     "synopsis" TEXT NOT NULL;
