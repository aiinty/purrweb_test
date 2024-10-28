import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateColumnDto } from "./dto/create-column.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Column } from "./column.model";
import { UpdateColumnDto } from "./dto/update-column.dto";
import { Card } from '../cards/card.model';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column) private readonly columnRepository: typeof Column) {}

  async createColumn(createColumnDto: CreateColumnDto) {
    return await this.columnRepository.create(createColumnDto);
  }

  async getColumn(id: number) {
    return await this.columnRepository.findByPk(id, { include: Card });
  }

  async getColumns(ownerId: number) {
    return await this.columnRepository.findAll({ where: { authorId: ownerId }, include: Card });
  }

  async deleteColumn(id: number) {
    const column = await this.columnRepository.findByPk(id);

    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    return this.columnRepository.destroy({ where: { id: id } });
  }

  async updateColumn(updateColumnDto: UpdateColumnDto, id: number) {
    const column = await this.columnRepository.findByPk(id);

    if (!column) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
    return this.columnRepository.update(updateColumnDto, { where: { id: id } });
  }
}
