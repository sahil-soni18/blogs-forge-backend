import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ description: 'Company Name' })
  @IsString()
  @IsNotEmpty()
  company_name!: string;

  @ApiProperty({ description: 'Role at Company' })
  @IsString()
  @IsNotEmpty()
  role!: string;

  @ApiProperty({
    description: 'start date',
    example: '2025-04-17T18:10:00',
  })
  @IsString()
  start_date: string;

  @ApiPropertyOptional({
    description: 'end date',
    example: '2025-04-17T18:10:00',
  })
  @IsString()
  @IsOptional()
  end_date?: string;

  @ApiProperty({ description: 'Job Description ' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
