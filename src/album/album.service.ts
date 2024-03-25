import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (
      'name' in createAlbumDto &&
      createAlbumDto.name &&
      'year' in createAlbumDto &&
      typeof createAlbumDto.year === 'number'
    ) {
      return await this.prisma.album.create({
        data: {
          id: uuidv4(),
          name: createAlbumDto.name,
          year: createAlbumDto.year,
          artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
        },
      });
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (uuidValidate(id)) {
      const album = await this.prisma.album.findUnique({ where: { id: id } });
      if (album) {
        return album;
      } else {
        throw new NotFoundException('Album is not found');
      }
    } else {
      throw new BadRequestException('Album id is not correct');
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (
      'name' in updateAlbumDto &&
      updateAlbumDto.name &&
      'year' in updateAlbumDto &&
      typeof updateAlbumDto.year === 'number'
    ) {
      const album = await this.prisma.album.findUnique({ where: { id: id } });
      if (album) {
        return await this.prisma.album.update({
          where: {
            id: id,
          },
          data: {
            name: updateAlbumDto.name,
            year: updateAlbumDto.year,
            artistId: updateAlbumDto.artistId ? updateAlbumDto.artistId : null,
          },
        });
      } else {
        throw new NotFoundException('Album is not found');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async remove(id: string) {
    if (uuidValidate(id)) {
      const album = await this.prisma.album.findUnique({ where: { id: id } });
      if (album) {
        return await this.prisma.album.delete({
          where: {
            id: id,
          },
        });
      } else {
        throw new NotFoundException('Album is not found');
      }
    } else {
      throw new BadRequestException('Request id is not correct');
    }
  }
}
