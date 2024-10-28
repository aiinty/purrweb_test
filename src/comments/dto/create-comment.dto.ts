import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'In my humble opinion...', description: 'Comment content', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly content: string;
  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly authorId: number;
  @ApiProperty({ example: '1', description: 'Card id', nullable: false, required: true })
  @IsNumber({}, { message: 'Should be a number' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly cardId: number;
}