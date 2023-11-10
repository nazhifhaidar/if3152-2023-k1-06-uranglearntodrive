-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelanggan" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "umur" INTEGER NOT NULL,
    "no_telp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tipe_kendaraan" TEXT NOT NULL,
    "id_kelas" INTEGER NOT NULL,

    CONSTRAINT "Pelanggan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kendaraan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tipe_kendaraan" TEXT NOT NULL,

    CONSTRAINT "Kendaraan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipeKendaraan" (
    "tipe" TEXT NOT NULL,

    CONSTRAINT "TipeKendaraan_pkey" PRIMARY KEY ("tipe")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "total_jam" INTEGER NOT NULL,
    "jumlah_sesi" INTEGER NOT NULL,
    "id_kendaraan" INTEGER NOT NULL,
    "id_instruktur" INTEGER NOT NULL,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruktur" (
    "id" SERIAL NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,

    CONSTRAINT "Instruktur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" SERIAL NOT NULL,
    "tanggal" DATE NOT NULL,
    "start_sesi" TIME NOT NULL,
    "end_sesi" TIME NOT NULL,
    "id_kelas" INTEGER NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pelanggan_email_key" ON "Pelanggan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_id_kendaraan_key" ON "Kelas"("id_kendaraan");

-- AddForeignKey
ALTER TABLE "Pelanggan" ADD CONSTRAINT "Pelanggan_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelanggan" ADD CONSTRAINT "Pelanggan_tipe_kendaraan_fkey" FOREIGN KEY ("tipe_kendaraan") REFERENCES "TipeKendaraan"("tipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kendaraan" ADD CONSTRAINT "Kendaraan_tipe_kendaraan_fkey" FOREIGN KEY ("tipe_kendaraan") REFERENCES "TipeKendaraan"("tipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_id_kendaraan_fkey" FOREIGN KEY ("id_kendaraan") REFERENCES "Kendaraan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_id_instruktur_fkey" FOREIGN KEY ("id_instruktur") REFERENCES "Instruktur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
