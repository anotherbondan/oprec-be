import { ApiProperty } from '@nestjs/swagger';

export class AuthUser {
  @ApiProperty({ example: 'user-uuid' })
  id: string;

  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class Auth {
  @ApiProperty({ example: 'jwt-token-string' })
  access_token: string;

  @ApiProperty({ type: AuthUser })
  user: AuthUser;
}
