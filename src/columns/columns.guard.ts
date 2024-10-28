import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleValues } from '../enums/roles.enum';
import { ColumnsService } from './columns.service';

@Injectable()
export class ColumnsGuard implements CanActivate {
  constructor(private columnsService: ColumnsService) {}

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
      const column = await this.columnsService.getColumn(params.id);
      return column.authorId === user.id;
    } catch (e) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  }
}
