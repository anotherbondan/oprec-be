import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @ApiProperty({ example: 'My Survey' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'A short description of the form' })
  @IsString()
  @IsOptional()
  description?: string;
}
