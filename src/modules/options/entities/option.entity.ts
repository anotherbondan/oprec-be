import { ApiProperty } from '@nestjs/swagger';

export class Option {
  @ApiProperty({ example: 'opt-uuid' })
  id: string;

  @ApiProperty({ example: 'question-uuid' })
  questionId: string;

  @ApiProperty({ example: 'Option A' })
  text: string;

  @ApiProperty({ example: 0 })
  order: number;
}
