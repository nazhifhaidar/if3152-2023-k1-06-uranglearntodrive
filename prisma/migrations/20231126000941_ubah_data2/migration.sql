/*
  Warnings:

  - You are about to drop the column `id_instruktur` on the `Kelas` table. All the data in the column will be lost.
  - You are about to drop the column `id_kendaraan` on the `Kelas` table. All the data in the column will be lost.
  - You are about to drop the column `tipe_kendaraan` on the `Pelanggan` table. All the data in the column will be lost.
  - You are about to drop the `TipeKendaraan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipe_kendaraan` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipe_kendaraan` on the `Kendaraan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipeKendaraan" AS ENUM ('Matic', 'Manual');

-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_id_instruktur_fkey";

-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_id_kendaraan_fkey";

-- DropForeignKey
ALTER TABLE "Kendaraan" DROP CONSTRAINT "Kendaraan_tipe_kendaraan_fkey";

-- DropForeignKey
ALTER TABLE "Pelanggan" DROP CONSTRAINT "Pelanggan_tipe_kendaraan_fkey";

-- DropIndex
DROP INDEX "Kelas_id_kendaraan_key";

-- AlterTable
ALTER TABLE "Kelas" DROP COLUMN "id_instruktur",
DROP COLUMN "id_kendaraan",
ADD COLUMN     "tipe_kendaraan" "TipeKendaraan" NOT NULL;

-- AlterTable
ALTER TABLE "Kendaraan" DROP COLUMN "tipe_kendaraan",
ADD COLUMN     "tipe_kendaraan" "TipeKendaraan" NOT NULL;

-- AlterTable
ALTER TABLE "Pelanggan" DROP COLUMN "tipe_kendaraan";

-- DropTable
DROP TABLE "TipeKendaraan";
