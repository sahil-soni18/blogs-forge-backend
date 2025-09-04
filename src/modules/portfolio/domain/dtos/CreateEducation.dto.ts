import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ description: 'Institution Name' })
  @IsNotEmpty()
  @IsString()
  institution_name!: string;

  @ApiProperty({ description: 'Degree Name' })
  @IsNotEmpty()
  @IsString()
  degree!: string;

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
}
