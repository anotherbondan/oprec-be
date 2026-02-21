import { PartialType } from '@nestjs/swagger';
import { CreateFormDto } from './create-form.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @ApiPropertyOptional({ type: [CreateQuestionDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
