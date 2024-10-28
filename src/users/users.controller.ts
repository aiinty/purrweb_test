import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from "./user.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Creates a new user" })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Gets all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Give role to user" })
  @ApiResponse({ status: 200, type: [AddRoleDto] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Post("role")
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1'})
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Delete(':id')
  deleteUser(@Param(':id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: "Updates a user" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1'})
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Put(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto,@Param(':id') id: number) {
    return this.usersService.updateUser(updateUserDto, id);
  }
}
