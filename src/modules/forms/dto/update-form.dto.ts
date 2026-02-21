import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
