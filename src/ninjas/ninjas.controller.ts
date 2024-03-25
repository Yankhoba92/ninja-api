import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){}
  // Get /ninjas --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars'|'nunchucks') {
    // const service = new NinjasService
    return this.ninjasService.getNinjas(weapon);
  }

  // Get /ninjas/:id --> {}
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
        return this.ninjasService.getNinja(id);
    } catch (error) {
        throw new NotFoundException()
    }
  }

  @Post()
  createNinjas(@Body(new ValidationPipe()) createNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id, );
  }
}
