import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user)
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST)
    }
    const salt = await bcrypt.genSalt();
    const hash_password = await bcrypt.hash(userDto.password, salt);
    const user = await this.userService.createUser({...userDto, password: hash_password });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' })
  }
}
