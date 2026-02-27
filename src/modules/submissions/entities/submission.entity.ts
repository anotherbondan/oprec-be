import { ApiProperty } from '@nestjs/swagger';

export class AnswerEntity {
  @ApiProperty({ example: 'ans-uuid' })
  id: string;

  @ApiProperty({ example: 'sub-uuid' })
  submissionId: string;

  @ApiProperty({ example: 'q-uuid' })
  questionId: string;

  @ApiProperty({ example: 'My Answer' })
  value: string;
}

export class Submission {
  @ApiProperty({ example: 'sub-uuid' })
  id: string;

  @ApiProperty({ example: 'form-uuid' })
  formId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [AnswerEntity], required: false })
  answers?: AnswerEntity[];
}
