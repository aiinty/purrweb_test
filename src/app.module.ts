import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/role.model';
import { AuthModule } from './auth/auth.module';
import { Column } from './columns/column.model';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.model';
import { Card } from './cards/card.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: Number(process.env.POSTGRES_PORT) ?? 5432,
      username: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'root',
      database: process.env.POSTGRES_DB ?? 'postgres',
      models: [User, Role, UserRoles, Column, Card, Comment],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
  ],
})
export class AppModule {}
