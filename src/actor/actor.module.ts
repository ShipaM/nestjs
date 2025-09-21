import { ActorEntity } from 'src/actor/entities/actor.entity';
import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
