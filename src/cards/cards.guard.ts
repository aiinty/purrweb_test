import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardsService } from './cards.service';
import { RoleValues } from '../enums/roles.enum';

@Injectable()
export class CardsGuard implements CanActivate {
  constructor(private cardsService: CardsService) {}

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
      const card = await this.cardsService.getCard(params.id);
      return card.authorId === user.id;
    } catch (e) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  }
}
