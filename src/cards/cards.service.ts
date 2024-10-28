import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './card.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Comment } from '../comments/comment.model';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private readonly cardRepository: typeof Card) {}

  async createCard(createCardDto: CreateCardDto) {
    return await this.cardRepository.create(createCardDto);
  }

  async getCard(id: number) {
    return await this.cardRepository.findByPk(id, { include: Comment });
  }

  async getCards(columnId: number) {
    return await this.cardRepository.findAll({ where: { columnId: columnId }, include: Comment });
  }

  async deleteCard(id: number) {
    const card = await this.cardRepository.findByPk(id);

    if (!card) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    return this.cardRepository.destroy({ where: { id: id } });
  }

  async updateCard(updateCardDto: UpdateCardDto, id: number) {
    const card = await this.cardRepository.findByPk(id);

    if (!card) {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
    return this.cardRepository.update(updateCardDto, { where: { id: id } });
  }
}
