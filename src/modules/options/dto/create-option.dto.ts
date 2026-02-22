import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({ example: 'question-uuid' })
  @IsString()
  questionId: string;

  @ApiProperty({ example: 'Option A' })
  @IsString()
  text: string;
}
