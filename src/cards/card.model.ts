import { BelongsTo, Column as TableColumn, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Column } from '../columns/column.model';
import { Comment } from '../comments/comment.model';
import { ApiProperty } from '@nestjs/swagger';

interface CardCreationAttributes {
  title: string;
  description: string;
  authorId: number;
  columnId: number;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttributes> {
  @TableColumn({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Very interesting title', description: 'Card title', nullable: false, required: true })
  @TableColumn({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Nice description', description: 'Card description', nullable: false, required: true })
  @TableColumn({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @ForeignKey(() => User)
  @TableColumn({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @ApiProperty({ example: '1', description: 'Column id', nullable: false, required: true })
  @ForeignKey(() => Column)
  @TableColumn({ type: DataType.INTEGER, allowNull: false })
  columnId: number;

  @BelongsTo(() => User)
  author: User

  @BelongsTo(() => Column)
  column: Column

  @ApiProperty({ isArray: true,  description: 'Card comments', required: false})
  @HasMany(() => Comment)
  comments: Comment[]
}
