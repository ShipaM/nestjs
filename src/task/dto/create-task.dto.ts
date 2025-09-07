import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { StartsWidth } from '../decorators/starts-width-decorator';

export enum TaskTag {
  WORK = 'WORK',
  HOME = 'HOME',
  LEARNING = 'LEARNING',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @StartsWidth('Task:')
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber({}, { message: 'Priority should be a number' })
  @IsOptional()
  @IsPositive({ message: 'Priority should be a positive number' })
  @IsInt({ message: 'Priority should be an integer' })
  priority: number;

  @IsArray({ message: 'Tags should be an array' })
  @IsOptional()
  @IsEnum(TaskTag, {
    each: true,
    message: 'Tags should be WORK, HOME or LEARNING',
  })
  tags: TaskTag[];

  @IsString({ message: 'Password should be a string' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;

  @IsUrl(
    {
      protocols: ['http', 'https', 'wss'],
      require_valid_protocol: true,
      host_whitelist: ['coins.bank.gov.ua'],
    },
    { message: 'Website URL should be a valid URL' },
  )
  websiteUrl: string;

  @IsUUID('4', { message: 'User ID should be a valid UUID' })
  userId: string;
}
