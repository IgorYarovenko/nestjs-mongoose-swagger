import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  pages: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(250)
  @MaxLength(1000)
  @ApiProperty()
  overview: string;
}
