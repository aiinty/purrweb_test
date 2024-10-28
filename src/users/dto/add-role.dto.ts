import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'admin', description: 'User role value', nullable: false, required: true })
  //FIXME: @IsEnum(RoleValues, { message: 'Should be a Role enum value' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly value: string;
  @ApiProperty({ example: '1', description: 'User id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly userId: number;
}