import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  Res,
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

  @Get()
  getMovies(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Get('headers')
  @Get('headers')
  getHeaders(@Headers() headers: Record<string, string>) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body as Record<string, string>,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(200).json({ message: 'Response details' });
  }
}
