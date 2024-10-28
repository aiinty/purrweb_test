import { BelongsTo, Column as TableColumn, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Card } from '../cards/card.model';
import { ApiProperty } from '@nestjs/swagger';

interface ColumnCreationAttributes {
  title: string;
  authorId: number;
}

@Table({ tableName: 'columns' })
export class Column extends Model<Column, ColumnCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Column ID', nullable: false, required: true})
  @TableColumn({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Powerful title', description: 'Column title', nullable: false, required: true })
  @TableColumn({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '1', description: 'Author id', nullable: false, required: true })
  @ForeignKey(() => User)
  @TableColumn({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ isArray: true,  description: 'Column cards', required: false })
  @HasMany(() => Card)
  cards: Card[];
}
