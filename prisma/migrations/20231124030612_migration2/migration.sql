/*
  Warnings:

  - You are about to drop the column `email` on the `Pelanggan` table. All the data in the column will be lost.
  - Added the required column `id_instruktur` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_kendaraan` to the `Jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_pelanggan` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPelanggan" AS ENUM ('Calon', 'Lulus', 'Siswa');

-- CreateEnum
CREATE TYPE "StatusKendaraan" AS ENUM ('Dipakai', 'Diperbaiki', 'Siap');

-- DropIndex
DROP INDEX "Pelanggan_email_key";

-- AlterTable
ALTER TABLE "Jadwal" ADD COLUMN     "id_instruktur" INTEGER NOT NULL,
ADD COLUMN     "id_kendaraan" INTEGER NOT NULL,
ADD COLUMN     "id_pelanggan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kendaraan" ADD COLUMN     "status_kendaraan" "StatusKendaraan" NOT NULL DEFAULT 'Siap',
ADD COLUMN     "tanggal_servis" DATE;

-- AlterTable
ALTER TABLE "Pelanggan" DROP COLUMN "email",
ADD COLUMN     "status" "StatusPelanggan" NOT NULL DEFAULT 'Calon';

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_kendaraan_fkey" FOREIGN KEY ("id_kendaraan") REFERENCES "Kendaraan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_instruktur_fkey" FOREIGN KEY ("id_instruktur") REFERENCES "Instruktur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
