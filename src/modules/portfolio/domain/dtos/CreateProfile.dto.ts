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
import { CreateProjectDto } from './CreateProject.dto';
import { CreateExperienceDto } from './CreateExperience.dto';
import { CreateSkillsDto } from './CreateSkills.dto';
import { CreateEducationDto } from './CreateEducation.dto';

export class CreateProfileDto {
  @ApiProperty({ description: 'Profession Title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Profile Bio' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: 'Profile Image URL' })
  @IsString()
  @IsOptional()
  profile_image_url?: string;

  @ApiPropertyOptional({ description: 'Projects' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @ApiPropertyOptional({ description: 'Experience' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDto)
  experience?: CreateExperienceDto[];

  @ApiPropertyOptional({ description: 'Skills' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillsDto)
  skills?: CreateSkillsDto[];

  @ApiPropertyOptional({ description: 'Education' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  education?: CreateEducationDto[];
}
