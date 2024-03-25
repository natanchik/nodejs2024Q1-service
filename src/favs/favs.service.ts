import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.fav.findMany();
  }

  async addTrack(id: string) {
    if (uuidValidate(id)) {
      const track = await this.prisma.track.findUnique({ where: { id: id } });
      if (track) {
        const favs = await this.prisma.fav.findUnique({
          where: { id },
          select: {
            tracks: true,
          },
        });
        await this.prisma.fav.update({
          data: {
            tracks: {
              set: [...favs.tracks, id],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException(`Track doesn't exist`);
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async addAlbum(id: string) {
    if (uuidValidate(id)) {
      const album = await this.prisma.album.findUnique({ where: { id: id } });
      if (album) {
        const favs = await this.prisma.fav.findUnique({
          where: { id },
          select: {
            albums: true,
          },
        });
        await this.prisma.fav.update({
          data: {
            albums: {
              set: [...favs.albums, id],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException(`Album doesn't exist`);
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async addArtist(id: string) {
    if (uuidValidate(id)) {
      const artist = await this.prisma.artist.findUnique({ where: { id: id } });
      if (artist) {
        const favs = await this.prisma.fav.findUnique({
          where: { id },
          select: {
            artists: true,
          },
        });
        await this.prisma.fav.update({
          data: {
            artists: {
              set: [...favs.artists, id],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException(`Artist doesn't exist`);
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async removeTrack(id: string) {
    if (uuidValidate(id)) {
      const favs = await this.prisma.fav.findUnique({
        where: { id },
        select: {
          tracks: true,
        },
      });
      if (favs.tracks.includes(id)) {
        await this.prisma.fav.update({
          data: {
            tracks: {
              set: [...favs.tracks.filter((track) => track !== id)],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async removeAlbum(id: string) {
    if (uuidValidate(id)) {
      const favs = await this.prisma.fav.findUnique({
        where: { id },
        select: {
          albums: true,
        },
      });
      if (favs.albums.includes(id)) {
        await this.prisma.fav.update({
          data: {
            albums: {
              set: [...favs.albums.filter((album) => album !== id)],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Album id is not correct');
    }
  }

  async removeArtist(id: string) {
    if (uuidValidate(id)) {
      const favs = await this.prisma.fav.findUnique({
        where: { id },
        select: {
          artists: true,
        },
      });
      if (favs.artists.includes(id)) {
        await this.prisma.fav.update({
          data: {
            artists: {
              set: [...favs.artists.filter((artist) => artist !== id)],
            },
          },
          where: { id },
        });
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Artist id is not correct');
    }
  }
}
