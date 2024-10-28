import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleValues } from '../enums/roles.enum';
import { CommentsService } from './comments.service';

@Injectable()
export class CommentsGuard implements CanActivate {
  constructor(private commentsService: CommentsService) {}

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
      const comment = await this.commentsService.getComment(params.id);
      return comment.authorId === user.id;
    } catch (e) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  }
}
