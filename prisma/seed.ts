import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { login: 'defaultUser1' },
    update: {},
    create: {
      id: uuidv4(),
      login: 'defaultUser1',
      password: 'defaultPassword',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'defaultUser2' },
    update: {},
    create: {
      id: uuidv4(),
      login: 'defaultUser2',
      password: 'defaultPassword2',
    },
  });

  const track = await prisma.track.upsert({
    where: { name: 'defaultTrack' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'defaultTrack',
      duration: 1,
    },
  });

  const album = await prisma.album.upsert({
    where: { name: 'defaultAlbum' },
    update: {},
    create: {
      id: uuidv4(),
      name: 'defaultAlbum',
      year: 2000,
    },
  });

  const artist = await prisma.artist.upsert({
    where: { name: 'defaultArtist' },
    update: {},
    create: {
      id: uuidv4(),
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
