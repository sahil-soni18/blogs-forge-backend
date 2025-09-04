import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Project Description ' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [String], description: 'Technologies Used in Project' })
  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @ApiPropertyOptional({ description: 'Project Image URL' })
  @IsOptional()
  @IsString()
  project_image_url?: string;

  @ApiPropertyOptional({ description: 'Project Github URL' })
  @IsOptional()
  @IsString()
  github_url?: string;

  @ApiPropertyOptional({ description: 'Project Live URL' })
  @IsOptional()
  @IsString()
  live_url?: string;
}
