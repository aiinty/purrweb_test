import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiProperty({ example: 'Very interesting title', description: 'Card title', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Shouldn\'t be empty' })
  readonly title: string;
  @ApiProperty({ example: 'Nice description', description: 'Card description', nullable: false, required: true })
  @IsString({ message: 'Should be a string' })
  readonly description: string;
}
