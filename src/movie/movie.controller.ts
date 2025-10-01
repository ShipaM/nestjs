import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type { Request, Response } from 'express';
import { MovieDto } from './dto/movie.dto';

@Controller({ path: 'movies', host: 'localhost' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
