import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from "./role.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.create(createRoleDto);
  }

  async getRole(roleId: number) {
    return await this.roleRepository.findOne({ where: { id: roleId } });
  }

  async getRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleByValue(roleValue: string) {
    return await this.roleRepository.findOne({ where: { value: roleValue } });
  }

  async deleteUser(id: number) {
    const role = await this.roleRepository.findByPk(id)

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepository.destroy({ where: { id: id } });
  }

  async updateUser(createRoleDto: CreateRoleDto, id: number) {
    const role = await this.roleRepository.findByPk(id)

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepository.update(createRoleDto, { where: { id: id } });
  }
}
