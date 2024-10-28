import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { RoleValues } from "../enums/roles.enum";
import { Role } from "../roles/role.model";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const role = await this.roleService.getRoleByValue(RoleValues.User);

    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getUser(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: Role });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: Role, });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      await user.$add("roles", [role.id]);
      return addRoleDto;
    }
    throw new HttpException("User or Role not found", HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.destroy({ where: { id: id } });
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(updateUserDto.password, salt);

    return await this.userRepository.update({...updateUserDto, password: hash_password }, { where: { id: id } });
  }
}
