import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillsDto {
  @ApiProperty({ description: 'Skill Name' })
  @IsNotEmpty()
  @IsString()
  skill!: string;
}
