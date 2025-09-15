import { Body, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserController } from 'src/common/decorators/module/controller/user-controller.decorator';
import { User } from 'src/modules/user/auth/entities/user.entity';
import { CurrentUser } from 'src/modules/user/decorators/current-user.decorator';
import { CreateBlogDto } from '../domain/dtos/CreateBlog.dto';
import { BlogsService } from '../domain/blogs.service';

@ApiTags('Blogs')
@UserController('blog')
export class BlogsController {
  constructor(private readonly service: BlogsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(
    @CurrentUser() user: User,
    @Body() dto: CreateBlogDto,
  ) {
    return this.service.createBlog(user.id, dto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateBlog(
    @CurrentUser() user: User,
    @Body() dto: CreateBlogDto,
  ) {
    return this.service.updateBlog(user.id, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBlog(@CurrentUser() user: User) {
    return this.service.getBlogBySlug(user.id);
  }
}
