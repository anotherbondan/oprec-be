import { 
  IsBoolean, 
  IsEnum, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  ValidateNested, 
  IsArray 
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../../generated/prisma/enums'; 
import { CreateOptionDto } from '../../options/dto/create-option.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType, { message: 'Invalid question type' })
  @IsNotEmpty()
  type: QuestionType;

  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @IsInt()
  @IsNotEmpty()
  order: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}