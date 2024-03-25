import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favsService.addTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return await this.favsService.addAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return await this.favsService.addArtist(id);
  }

  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    return await this.favsService.removeTrack(id);
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    return await this.favsService.removeAlbum(id);
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    return await this.favsService.removeArtist(id);
  }
}
