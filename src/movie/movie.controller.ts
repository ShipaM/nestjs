import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Get all movies', description: 'Get all movies' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movies found' })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }
  @ApiParam({ name: 'id', type: 'string', description: 'Movie id' })
  @ApiQuery({ name: 'year', type: 'number', description: 'Release year' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Bearer token' })
  @ApiOperation({ summary: 'Get movie by id', description: 'Get movie by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movies found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Movies not found',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: 'Create movie', description: 'Create movie' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Movie created' })
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
