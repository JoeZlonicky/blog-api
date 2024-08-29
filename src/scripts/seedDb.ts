import { hashPassword } from '../auth/hashPassword';
import { db } from '../db/db';

async function seed() {
  console.log('Seeding database...');

  const alice = await db.author.upsert({
    where: { username: 'alice123' },
    include: {
      posts: true,
    },
    update: {},
    create: {
      username: 'alice123',
      firstName: 'Alice',
      lastName: 'Adams',
      password: await hashPassword('1234'),

      posts: {
        create: {
          title: 'First post',
          content: 'Hmm... what should I say?',
          published: true,
        },
      },
    },
  });

  await db.comment.deleteMany();
  await db.comment.create({
    data: {
      firstName: 'Connor',
      lastInitial: 'C',
      content: 'First!',
      postId: alice.posts[0].id,
    },
  });

  await db.author.upsert({
    where: { username: 'bob234' },
    include: {
      posts: true,
    },
    update: {},
    create: {
      username: 'bob234',
      firstName: 'Bob',
      lastName: 'Billy',
      password: await hashPassword('1234'),

      posts: {
        create: {
          title: 'Second post',
          content: 'My first post as admin!',
          published: true,
        },
      },
    },
  });

  console.log('Done!');
}

(async () => {
  try {
    await seed();
  } catch (err) {
    console.error(err);
  }
})();
