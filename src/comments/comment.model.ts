import { BelongsTo, Column as TableColumn, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Card } from '../cards/card.model';
import { ApiProperty } from '@nestjs/swagger';

interface CommentCreationAttributes {
  content: string;
  authorId: number;
  cardId: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Comment ID', nullable: false, required: true})
  @TableColumn({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'In my humble opinion...', description: 'Comment content', nullable: false, required: true })
  @TableColumn({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @ForeignKey(() => User)
  @TableColumn({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @ApiProperty({ example: '1', description: 'Card id', nullable: false, required: true })
  @ForeignKey(() => Card)
  @TableColumn({ type: DataType.INTEGER, allowNull: false })
  cardId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => Card)
  card: Card;
}
