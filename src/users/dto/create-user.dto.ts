import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, {message: 'Invalid email address'})
  readonly email: string;
  @ApiProperty({ example: 'qwerty123', description: 'User password', nullable: false, required: true})
  @IsString({ message: 'Should be a string' })
  @Length(8, 24, { message: 'The password length must be between 8 and 24 characters' })
  readonly password: string;
}
