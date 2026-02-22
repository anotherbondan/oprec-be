import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}