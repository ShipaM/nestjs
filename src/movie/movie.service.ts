import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePosterEntity)
    private readonly posterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      // where: {
      //   isAvailable: true,
      // },
      order: {
        createdAt: 'DESC',
      },
      select: ['id', 'title', 'releaseYear'],
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('Actors not found');

    let poster: MoviePosterEntity | null = null;

    if (imageUrl) {
      poster = this.posterRepository.create({
        url: imageUrl,
      });
      await this.posterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    await this.movieRepository.save(movie);
    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    await this.movieRepository.delete(id);
    return movie.id;
  }
}
