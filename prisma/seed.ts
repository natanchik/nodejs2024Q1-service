import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { login: 'defaultUser1' },
    update: {},
    create: {
      login: 'defaultUser1',
      password: 'defaultPassword',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'defaultUser2' },
    update: {},
    create: {
      login: 'defaultUser2',
      password: 'defaultPassword2',
    },
  });

  const track = await prisma.track.upsert({
    where: { name: 'defaultTrack' },
    update: {},
    create: {
      name: 'defaultTrack',
      duration: 1,
    },
  });

  const album = await prisma.album.upsert({
    where: { name: 'defaultAlbum' },
    update: {},
    create: {
      name: 'defaultAlbum',
      year: 2000,
    },
  });

  const artist = await prisma.artist.upsert({
    where: { name: 'defaultArtist' },
    update: {},
    create: {
      name: 'defaultArtist',
      grammy: false,
    },
  });

  console.log({ user1, user2, track, album, artist });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
