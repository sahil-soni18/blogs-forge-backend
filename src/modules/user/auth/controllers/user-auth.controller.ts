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
}
