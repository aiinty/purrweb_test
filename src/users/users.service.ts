import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleValues } from '../enums/roles.enum';
import { Role } from '../roles/role.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService,) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue(RoleValues.User)

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: Role })
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: Role });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId)
    const role = await this.roleService.getRoleByValue(addRoleDto.value)
    if (role && user) {
      await user.$add('roles', [role.id])
      return addRoleDto;
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.destroy({ where: { id: id } });
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.userRepository.findByPk(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.update(updateUserDto, { where: { id: id } });
  }
}
