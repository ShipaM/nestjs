import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Title should be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @Length(3, 50, { message: 'Title should be between 3 and 50 characters' })
  title: string;

  @IsBoolean({ message: 'isCompleted should be a boolean' })
  isCompleted: boolean;
}
