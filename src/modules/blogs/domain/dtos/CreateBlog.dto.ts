import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog Title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Blog Content' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ description: 'Blog Image URL (Supabase storage url)' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}


export enum Role {
  ADMIN = "Admin",
  USER = "User"
}