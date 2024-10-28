import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private readonly commentRepository: typeof Comment) {}

  async getComment(id: number) {
    return await this.commentRepository.findByPk(id);
  }

  async getComments(cardId: number) {
    return await this.commentRepository.findAll({ where: { cardId: cardId } });
  }

  async createComment(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.create(createCommentDto);
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepository.findByPk(id)

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return await this.commentRepository.destroy({ where: { id: id } });
  }

  async updateComment(updateCommentDto: UpdateCommentDto, id: number) {
    const comment = await this.commentRepository.findByPk(id)

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return await this.commentRepository.update(updateCommentDto, { where: { id: id } });
  }
}
