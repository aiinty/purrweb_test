import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login endpoint" })
  @ApiResponse({ status: 200, type: typeof String, example: { token : 'real-jwt-token' } })
  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Register endpoint" })
  @ApiResponse({ status: 200, type: typeof String, example: { token : 'real-jwt-token' } })
  @Post('register')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
