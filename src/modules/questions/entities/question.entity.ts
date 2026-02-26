import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../../../generated/prisma/enums';

export class Question {
  @ApiProperty({ example: 'q-uuid' })
  id: string;

  @ApiProperty({ example: 'form-uuid' })
  formId: string;

  @ApiProperty({ example: 'What is your name?' })
  text: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.SHORT_TEXT })
  type: QuestionType;

  @ApiProperty({ example: true })
  isRequired: boolean;

  @ApiProperty({ example: 0 })
  order: number;
}
