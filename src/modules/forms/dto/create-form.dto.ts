import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FormStatus } from '../../../generated/prisma/enums';

export class CreateFormDto {
  @ApiProperty({ example: 'My Survey' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'A short description of the form' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: FormStatus, example: 'DRAFT', default: 'DRAFT' })
  @IsEnum(FormStatus)
  @IsOptional()
  status?: FormStatus;
}
