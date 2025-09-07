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
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type { Request, Response } from 'express';

@Controller({ path: 'movies', host: 'localhost' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return `Movie ${body.title} created with genre ${body.genre}`;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
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
      body: req.body,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(200).json({ message: 'Response details' });
  }
}
