import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsInt()
  @IsNotEmpty()
  order: number;
}