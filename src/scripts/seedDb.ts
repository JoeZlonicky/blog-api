import { db } from '../db/db.js';

async function seed() {
  console.log('Seeding database...');

  const alice = await db.user.upsert({
    where: { username: 'alice123' },
    include: {
      posts: true,
    },
    update: {},
    create: {
      username: 'alice123',
      password: 'verySecretPassword',
      isAdmin: true,

      posts: {
        create: {
          title: 'First post',
          content: 'Hmm... what should I say?',
          published: true,
        },
      },
    },
  });

  const bob = await db.user.upsert({
    where: { username: 'bob234' },
    include: {
      posts: true,
    },
    update: {},
    create: {
      username: 'bob234',
      password: 'anotherVerySecretPassword',
      isAdmin: true,

      posts: {
        create: {
          title: 'Second post',
          content: 'My first post as admin!',
          published: true,
        },
      },
      comments: {
        create: {
          content: 'First!',
          postId: alice.posts[0].id,
        },
      },
    },
  });

  await db.user.upsert({
    where: { username: 'caitlyn345' },
    update: {},
    create: {
      username: 'caitlyn345',
      password: 'pass1234',

      comments: {
        create: {
          content: 'Just found this blog! Big fan!',
          postId: bob.posts[0].id,
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

