import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Column } from './column.model';
import { User } from '../users/user.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([User, Column]),
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
