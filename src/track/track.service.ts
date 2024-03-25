import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    if (
      'name' in createTrackDto &&
      createTrackDto.name &&
      'duration' in createTrackDto &&
      typeof createTrackDto.duration === 'number'
    ) {
      // if (createTrackDto.artistId) {data.artistId = createTrackDto.artistId}
      // artistId: createTrackDto.artistId || null, // refers to Artist
      // albumId: createTrackDto.albumId || null, // refers to Album
      return await this.prisma.track.create({
        data: {
          id: uuidv4(),
          name: createTrackDto.name,
          duration: createTrackDto.duration, // integer number
        },
      });
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (uuidValidate(id)) {
      const track = await this.prisma.track.findUnique({ where: { id: id } });
      if (track) {
        return track;
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Track id is not correct');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (
      'name' in updateTrackDto &&
      updateTrackDto.name &&
      'duration' in updateTrackDto &&
      typeof updateTrackDto.duration === 'number' &&
      uuidValidate(id)
    ) {
      const track = await this.prisma.track.findUnique({ where: { id: id } });
      if (track) {
        return await this.prisma.track.update({
          where: {
            id: id,
          },
          data: {
            name: updateTrackDto.name,
            duration: updateTrackDto.duration,
          },
        });
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async remove(id: string) {
    if (uuidValidate(id)) {
      const track = await this.prisma.track.findUnique({ where: { id: id } });
      if (track) {
        return await this.prisma.track.delete({
          where: {
            id: id,
          },
        });
      } else {
        throw new NotFoundException('Track is not found');
      }
    } else {
      throw new BadRequestException('Request id is not correct');
    }
  }
}
