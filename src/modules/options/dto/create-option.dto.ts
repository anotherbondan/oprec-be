import { IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  questionId: string;

  @IsString()
  text: string;
}