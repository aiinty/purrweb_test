import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleValues } from '../enums/roles.enum';
import { UsersService } from './users.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const user = req.user
      const params = req.params;

      if (user.roles.some(role => role.value === RoleValues.Admin )) {
        return true;
      }
      const findUser = await this.usersService.getUser(params.id);
      return findUser.id === user.id;
    } catch (e) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  }
}
