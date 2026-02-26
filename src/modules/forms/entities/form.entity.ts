import { ApiProperty } from '@nestjs/swagger';
import { FormStatus } from '../../../generated/prisma/enums';

export class Form {
  @ApiProperty({ example: 'f3a2c0...' })
  id: string;

  @ApiProperty({ example: 'Oprec Ristek 2024' })
  title: string;

  @ApiProperty({
    example: 'Registration form for...',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ enum: FormStatus, example: FormStatus.DRAFT })
  status: FormStatus;

  @ApiProperty({ example: 'user-uuid' })
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
