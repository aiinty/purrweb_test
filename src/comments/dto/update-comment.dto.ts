import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ example: 'In my humble opinion...', description: 'Comment content', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly content: string;
}