import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2025)
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
