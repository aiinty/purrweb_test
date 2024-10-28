import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    JwtModule,
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService,
  ]
})
export class RolesModule {}
