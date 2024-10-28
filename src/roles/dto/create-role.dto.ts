import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role value', nullable: false, required: true })
  //FIXME: @IsEnum(RoleValues, { message: 'Should be a Role enum value' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly value: string;
  @ApiProperty({ example: 'Wonderful description', description: 'Role description', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly description: string;
}