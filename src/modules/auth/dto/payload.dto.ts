import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}