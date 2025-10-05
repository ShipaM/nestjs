import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: 'The title of the movie',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '1994',
    description: 'The release year of the movie',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2025)
  releaseYear: number;

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'The URL of the movie poster',
    type: String,
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: ['actor1', 'actor2', 'actor3'],
    description: 'The IDs of the actors in the movie',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}
