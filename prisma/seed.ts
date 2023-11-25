import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs'

async function main() {
    const owner = await prisma.user.upsert({
        where: { username: 'uranglearntodrive' },
        update: {
            password: bcrypt.hashSync('uranglearntodrive')
        },
        create: {
            username: 'uranglearntodrive',
            name: 'uranglearntodrive',
            email: 'uranglearntodrive@example.com',
            password: bcrypt.hashSync('uranglearntodrive'),
            role: 'OWNER'
        }

    })
    const hugo = await prisma.user.upsert({
        where: { username: 'tanidisawah' },
        update: {},
        create: {
            username: 'tanidisawah',
            name: 'Hugo',
            email: 'tanidisawah@example.com',
            password: bcrypt.hashSync('tanidisawah'),
            role: 'ADMIN'
        }
    })
    const rubicon = await prisma.kendaraan.upsert({
        where: { id: 1 },
        update: {
            nama: "Rubicon",
            tipe_kendaraan: "Manual",
            status_kendaraan: "Siap",

        },
        create: {
            id: 1,
            nama: "Rubicon",
            tipe_kendaraan: "Manual",
            status_kendaraan: "Siap",
            tanggal_servis: new Date('2023-11-24T00:00:00')
        }
    });

    const brio = await prisma.kendaraan.upsert({
        where: { id: 2 },
        update: {
            nama: "Brio",
            tipe_kendaraan: "Matic",
            status_kendaraan: "Diperbaiki",

        },
        create: {
            id: 2,
            nama: "Brio",
            tipe_kendaraan: "Matic",
            status_kendaraan: "Diperbaiki",
            tanggal_servis: new Date('2023-11-24T00:00:00')
        }
    });

    const kendaraan = [rubicon, brio];

    const rw = await prisma.instruktur.upsert({
        where: { id: 1 },
        update: {
            nama_lengkap: "Rahmat Wibowo",
            nik: "311142151642",
            alamat: "Amazon Street A 16, New Zealand",
            no_telp: "082315672113"
        },
        create: {
            id: 1,
            nama_lengkap: "Rahmat Wibowo",
            nik: "311142151642",
            alamat: "Amazon Street A 16, New Zealand",
            no_telp: "082315672113"
        }
    });
    const instruktur = [rw];
    const kelas1 = await prisma.kelas.upsert({
        where: { id: 1 },
        update: {
            nama: "Kelas Drifting",
            harga: 500000,
            total_jam: 6,
            jumlah_sesi: 3,
            tipe_kendaraan: "Matic"
        },
        create: {
            id: 1,
            nama: "Kelas Drifting",
            harga: 500000,
            total_jam: 6,
            jumlah_sesi: 3,
            tipe_kendaraan: "Matic"
        }
    });


    const kelas2 = await prisma.kelas.upsert({
        where: { id: 2 },
        update: {
            nama: "Kelas Ngedrag",
            harga: 69000,
            total_jam: 23,
            jumlah_sesi: 8,
            tipe_kendaraan: "Manual"
        },
        create: {
            id: 2,
            nama: "Kelas Ngedrag",
            harga: 69000,
            total_jam: 23,
            jumlah_sesi: 8,
            tipe_kendaraan: "Manual"
        }
    });
    const kelas = [kelas1, kelas2]

    const toper = await prisma.pelanggan.upsert({
        where: {id: 1},
        update: {},
        create: {
            id: 1,
            nama_lengkap: "Christopher Febrian Nugraha",
            umur: 20,
            no_telp: '012345678901',
            alamat: 'Gg. Guan Jiwa, Kota Bandung',
            id_kelas: 1
        }
    });

    const jadwal1 = await prisma.jadwal.upsert({
        where:{id: 1},
        update: {},
        create: {
            id:1,
            tanggal: new Date('2023-11-24T00:00:00'),
            start_sesi: new Date('2023-11-24T08:00:00'),
            end_sesi:   new Date('2023-11-24T10:00:00'),
            id_kelas: 1,
            id_instruktur: 1,
            id_pelanggan: 1,
            id_kendaraan: 1
        }
    });

    const jadwal2 = await prisma.jadwal.upsert({
        where:{id: 2},
        update: {},
        create: {
            id:2,
            tanggal: new Date('2023-11-24T00:00:00'),
            start_sesi: new Date('2023-11-24T13:00:00'),
            end_sesi:   new Date('2023-11-24T15:00:00'),
            id_kelas: 2,
            id_instruktur: 1,
            id_pelanggan: 1,
            id_kendaraan: 1
        }
    });

    const jadwal3 = await prisma.jadwal.upsert({
        where:{id: 3},
        update: {},
        create: {
            id:3,
            tanggal: new Date('2023-11-24T00:00:00'),
            start_sesi: new Date('2023-11-24T15:00:00'),
            end_sesi:   new Date('2023-11-24T17:00:00'),
            id_kelas: 2,
            id_instruktur: 1,
            id_pelanggan: 1,
            id_kendaraan: 1
        }
    });

    const jadwal = [jadwal1, jadwal2, jadwal3];

    

    const pelanggan = [toper]

    console.log({ owner, hugo, kendaraan, instruktur, kelas, jadwal, toper });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })