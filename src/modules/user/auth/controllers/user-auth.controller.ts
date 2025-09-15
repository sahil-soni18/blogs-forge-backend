import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserAuthService } from '../services/user-auth.service';
import { SignupDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../entities/user.entity';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async registerUser(@Body() dto: SignupDto) {
    return this.userAuthService.signupUser(dto);
  }


  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 200, description: 'User Logged in...'})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User Not Found...!' })
  async loginUser(@Body() dto: LoginDto) {
    return this.userAuthService.loginUser(dto);
  }

  @Post('logout')
  @ApiResponse({ status: 200, description: 'User Logged out...'})
  async logoutUser(@CurrentUser() user: User) {
    return this.userAuthService.logoutUser(user.id);
  }

}
