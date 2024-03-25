import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    if (
      'name' in createArtistDto &&
      createArtistDto.name &&
      'grammy' in createArtistDto &&
      typeof createArtistDto.grammy === 'boolean'
    ) {
      return await this.prisma.artist.create({
        data: {
          id: uuidv4(),
          name: createArtistDto.name,
          grammy: createArtistDto.grammy,
        },
      });
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    if (uuidValidate(id)) {
      const track = await this.prisma.artist.findUnique({ where: { id: id } });
      if (track) {
        return track;
      } else {
        throw new NotFoundException('Artist is not found');
      }
    } else {
      throw new BadRequestException('Artist id is not correct');
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (
      'name' in updateArtistDto &&
      updateArtistDto.name &&
      'grammy' in updateArtistDto &&
      typeof updateArtistDto.grammy === 'boolean'
    ) {
      const artist = await this.prisma.artist.findUnique({ where: { id: id } });
      if (artist) {
        return await this.prisma.artist.update({
          where: {
            id: id,
          },
          data: {
            name: updateArtistDto.name,
            grammy: updateArtistDto.grammy,
          },
        });
      } else {
        throw new NotFoundException('Artist is not found');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async remove(id: string) {
    if (uuidValidate(id)) {
      const artist = await this.prisma.artist.findUnique({ where: { id: id } });
      if (artist) {
        return await this.prisma.artist.delete({
          where: {
            id: id,
          },
        });
      } else {
        throw new NotFoundException('Artist is not found');
      }
    } else {
      throw new BadRequestException('Request id is not correct');
    }
  }
}
