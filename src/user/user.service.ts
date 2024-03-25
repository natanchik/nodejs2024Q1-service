import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    console.log('hi from getUsers');
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    if (uuidValidate(id)) {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('User id is not correct');
    }
  }

  async CreateUserDto(CreateUserDto: CreateUserDto) {
    if ('login' in CreateUserDto && 'password' in CreateUserDto) {
      return await this.prisma.user.create({
        data: {
          id: uuidv4(),
          login: CreateUserDto.login,
          password: CreateUserDto.password,
        },
      });
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async UpdatePasswordDto(UpdatePasswordDto: UpdatePasswordDto, id: string) {
    if (
      'oldPassword' in UpdatePasswordDto &&
      'newPassword' in UpdatePasswordDto &&
      uuidValidate(id)
    ) {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (user) {
        if (user.password === UpdatePasswordDto.oldPassword) {
          return await this.prisma.user.update({
            where: {
              id: id,
            },
            data: {
              password: UpdatePasswordDto.newPassword,
              version: {
                increment: 1,
              },
            },
          });
        } else {
          throw new ForbiddenException('Password is not correct');
        }
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('Request is not correct');
    }
  }

  async DeleteUserById(id: string) {
    if (uuidValidate(id)) {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (user) {
        return await this.prisma.user.delete({
          where: {
            id: id,
          },
        });
      } else {
        throw new NotFoundException('User is not found');
      }
    } else {
      throw new BadRequestException('User id is not correct');
    }
  }
}
