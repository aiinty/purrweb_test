import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'qwerty123', description: 'User password', nullable: false, required: true})
  @IsString({ message: 'Should be a string' })
  @Length(8, 24, { message: 'The password length must be between 8 and 24 characters' })
  readonly password: string;
}
