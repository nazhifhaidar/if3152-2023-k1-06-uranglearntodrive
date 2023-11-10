import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs'

async function main() {
    const owner = await prisma.user.upsert({
        where: {username:'uranglearntodrive'},
        update: {
            password: bcrypt.hashSync('uranglearntodrive')
        },
        create: {
            username: 'uranglearntodrive',
            name:   'uranglearntodrive',
            email: 'uranglearntodrive@example.com',
            password: bcrypt.hashSync('uranglearntodrive'),
            role: 'OWNER'
        }

    })
    const hugo = await prisma.user.upsert({
        where: {username: 'tanidisawah'},
        update: {},
        create: {
            username: 'tanidisawah',
            name:   'Hugo',
            email: 'tanidisawah@example.com',
            password: bcrypt.hashSync('tanidisawah'),
            role: 'ADMIN' 
        }
    })
    console.log({owner, hugo});
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