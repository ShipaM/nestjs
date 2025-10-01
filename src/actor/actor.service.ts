import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Actor } from 'generated/prisma';

@Injectable()
export class ActorService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;

    const actor = await this.PrismaService.actor.create({ data: { name } });

    return actor;
  }
}
