import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Very interesting title', description: 'Card title', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly title: string;
  @ApiProperty({ example: 'Nice description', description: 'Card description', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  readonly description: string;
  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly authorId: number;
  @ApiProperty({ example: '1', description: 'Column id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly columnId: number;
}
