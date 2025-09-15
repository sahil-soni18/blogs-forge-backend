import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDto } from './dtos/CreateBlog.dto';
import { User } from 'src/modules/user/auth/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createBlog(userId: number, dto: CreateBlogDto) {
  
  }

  async updateBlog(userId: number, dto: CreateBlogDto) {
   
  }

  async getBlogBySlug(userId: number) {

  }
}
