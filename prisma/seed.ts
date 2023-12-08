// This will create:
// mysql> SELECT u.name, p.title, p.content FROM User u JOIN Post p ON p.authorId = u.id;
// +-------+---------------------+-------------------------+
// | name  | title               | content                 |
// +-------+---------------------+-------------------------+
// | Alice | Article1 from alice | HEY I AM ALICE          |
// | Bob   | Article1 from bob   | HEY I AM BOB            |
// | Bob   | Article2 from bob   | HEY I AM BOB(duplicate) |
// +-------+---------------------+-------------------------+

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedUsers: Prisma.UserUpsertArgs[] = [
  {
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Article1 from alice',
          content: 'HEY I AM ALICE',
          published: true,
        },
      },
    }, 
  },
  {
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Article1 from bob',
            content: 'HEY I AM BOB',
            published: true,
          },
          {
            title: 'Article2 from bob',
            content: 'HEY I AM BOB(duplicate)',
            published: true,
          },
        ],
      },
    }, 
  }
] 

async function main() {
  console.log('Seeding...')
  for (const seedUser of seedUsers) {
    const user = await prisma.user.upsert(seedUser)
    console.log(`Created: ${user.name}`)
  }
  console.log('Seeding finished!')
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
