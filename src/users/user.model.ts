import { BelongsToMany, Column as TableColumn, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user-roles.model';
import { Column } from '../columns/column.model';
import { Comment } from '../comments/comment.model';
import { Card } from '../cards/card.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User ID', nullable: false, required: true})
  @TableColumn({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'User email', nullable: false, required: true})
  @TableColumn({ type: DataType.STRING, unique: true,  allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password', nullable: false, required: true})
  @TableColumn({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ isArray: true,  description: 'User roles', required: false})
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Column)
  columns: Column[];

  @HasMany(() => Card)
  cards: Card[];

  @HasMany(() => Comment)
  comments: Comment[];
}
