import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog Title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Blog Description (max 250 characters)' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(250, { message: 'Description must not exceed 250 characters' })
  description!: string;

  @ApiProperty({ description: 'Blog Content' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiPropertyOptional({ description: 'Blog Image URL (Supabase storage url)' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ 
    description: 'Technologies used in the blog', 
    type: [String],
    example: ['React', 'TypeScript', 'Next.js'] 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ 
    description: 'Estimated reading time in minutes',
    minimum: 1 
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Read time must be at least 1 minute' })
  read_time!: number;

}

export enum Role {
  ADMIN = "Admin",
  USER = "User"
}