import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: 200, type: Role })
  @ApiBody({ type: CreateRoleDto })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "Lookup role based on role id" })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Get(':roleId')
  getRole(@Param('roleId') roleId: number) {
    return this.rolesService.getRole(roleId);
  }

  @ApiOperation({ summary: "List of all roles" })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @ApiOperation({ summary: "Lookup role based on role id" })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Get(':value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: "Delete a role" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1'})
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Delete(':id')
  deleteUser(@Param(':id') id: number) {
    return this.rolesService.deleteUser(id);
  }

  @ApiOperation({ summary: "Updates a role" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1'})
  @Roles('admin')
  @UseGuards(JwtAuthGuard, /* RolesGuard*/)
  @Put(':id')
  updateUser(@Body() createRoleDto: CreateRoleDto, @Param(':id') id: number) {
    return this.rolesService.updateUser(createRoleDto, id);
  }
}
