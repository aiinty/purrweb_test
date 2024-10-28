import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'Powerful title', description: 'Column title', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly title: string;
  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly authorId: number;
}
