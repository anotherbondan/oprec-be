import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../../generated/prisma/enums';
import { CreateOptionDto } from '../../options/dto/create-option.dto';

export class CreateQuestionDto {
  @ApiProperty({ example: 'form-uuid' })
  @IsString()
  @IsNotEmpty()
  formId: string;

  @ApiProperty({ example: 'What is your name?' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ enum: QuestionType, example: 'SHORT_TEXT' })
  @IsEnum(QuestionType, { message: 'Invalid question type' })
  @IsNotEmpty()
  type: QuestionType;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @ApiProperty({ example: 0 })
  @IsInt()
  @IsNotEmpty()
  order: number;

  @ApiPropertyOptional({ type: [CreateOptionDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}
