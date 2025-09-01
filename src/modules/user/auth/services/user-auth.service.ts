import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dtos/signup.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private generateAuthToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  private async generateAuthResponse(user: User) {
    const token = this.generateAuthToken(user);

    await this.userRepository.update(user.id, { token });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async signupUser(dto: SignupDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await this.hashPassword(dto.password);

      // Create new user
      const newUser = this.userRepository.create({
        ...dto,
        password: hashedPassword,
      });

      console.log(`New User: ${JSON.stringify(newUser)}`);
      const savedUser = await this.userRepository.save(newUser);

      console.log(`saved user: ${JSON.stringify(savedUser)}`);

      return this.generateAuthResponse(savedUser);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message || 'Failed to create user'
          : 'Failed to create user',
      );
    }
  }

  async getUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
