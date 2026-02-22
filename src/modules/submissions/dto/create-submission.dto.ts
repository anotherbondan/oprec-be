import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @ApiProperty({ example: 'question-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ example: 'My answer text' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateSubmissionDto {
  @ApiProperty({ type: [AnswerDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
