import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @ApiOperation({ summary: 'User creation' })
  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.UserService.getUserById(id);
  }

  @Post()
  CreateUserDto(@Body() CreateUserDto: CreateUserDto) {
    return this.UserService.CreateUserDto(CreateUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  UpdatePasswordDto(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
  ) {
    return this.UserService.UpdatePasswordDto(UpdatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  DeleteUserById(@Param('id') id: string) {
    return this.UserService.DeleteUserById(id);
  }
}
