import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @IsString()
  @IsOptional()
  text?: string;
}