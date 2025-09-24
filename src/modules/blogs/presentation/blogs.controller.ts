import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserController } from 'src/common/decorators/module/controller/user-controller.decorator';
import { User } from 'src/modules/user/auth/entities/user.entity';
import { CurrentUser } from 'src/modules/user/decorators/current-user.decorator';
import { CreateBlogDto, Role } from '../domain/dtos/CreateBlog.dto';
import { BlogsService } from '../domain/blogs.service';
import { RoleGuard } from 'src/modules/user/guards/role-guard';
import { Roles } from 'src/common/decorators/module/controller/rbac.controller';
import { UserGuard } from 'src/modules/user/guards/user-guard';
import { UpdateBlogDto } from '../domain/dtos/UpdateBlog.dto';

@ApiTags('Blogs')
@UserController('blog')
@UseGuards(UserGuard, RoleGuard)
export class BlogsController {
  constructor(private readonly service: BlogsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@CurrentUser() user: User, @Body() dto: CreateBlogDto) {
    return this.service.createBlog(user.id, dto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  // @Roles(Role.ADMIN)
  async updateBlog(
    @CurrentUser() user: User,
    @Param('slug') slug: string,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.service.updateBlog(slug, dto);
  }

  @Get('slug')
  @HttpCode(HttpStatus.OK)
  async getBlog(@CurrentUser() user: User, @Param('slug') slug: string) {
    return this.service.getBlogBySlug(slug);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  async deleteBlog(@Param('slug') slug: string) {
    return this.service.deleteBlogBySlug(slug);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs() {
    return this.service.getAllBlogs();
  }
}
