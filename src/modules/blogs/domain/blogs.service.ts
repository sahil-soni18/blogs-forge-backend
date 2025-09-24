import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDto } from './dtos/CreateBlog.dto';
import { User } from 'src/modules/user/auth/entities/user.entity';
import BlogResponseDto from './dtos/BlogResponse.dto';
import { UpdateBlogDto } from './dtos/UpdateBlog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createBlog(
    userId: number,
    dto: CreateBlogDto,
  ): Promise<BlogResponseDto> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Author not found...');

    const slug = await this.generateUniqueSlug(dto.title);

    const blog = this.blogRepo.create({
      author: user,
      title: dto.title,
      content: dto.content,
      imageUrl: dto.imageUrl,
      slug,
      description: dto.description,
      read_time: dto.read_time,
      technologies: dto.technologies,
    });

    const savedBlog = await this.blogRepo.save(blog);

    // return only safe fields
    return {
      id: savedBlog.id,
      slug: savedBlog.slug,
      title: savedBlog.title,
      content: savedBlog.content,
      imageUrl: savedBlog.imageUrl,
      createdAt: savedBlog.created_at,
      updatedAt: savedBlog.updated_at,
      read_time: savedBlog.read_time,
      description: savedBlog.description,
      technologies: savedBlog.technologies,
      author: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async updateBlog(slug: string, dto: UpdateBlogDto) {
    const blog = await this.blogRepo.findOne({
      where: { slug },
      relations: ['author'],
    });
    if (!blog) throw new NotFoundException('Blog not found...');

    if (dto.title && dto.title != blog.title) {
      blog.slug = await this.generateUniqueSlug(dto.title);
    }

    blog.title = dto.title ?? blog.title;
    blog.content = dto.content ?? blog.content;
    blog.imageUrl = dto.imageUrl ?? blog.imageUrl;
    blog.description = dto.description ?? blog.description;
    blog.read_time = dto.read_time ?? blog.read_time;
    blog.technologies = dto.technologies ?? blog.technologies;

    const savedBlog = await this.blogRepo.save(blog);

    // return only safe fields
    return {
      id: savedBlog.id,
      slug: savedBlog.slug,
      title: savedBlog.title,
      content: savedBlog.content,
      imageUrl: savedBlog.imageUrl,
      description: savedBlog.description,
      read_time: savedBlog.read_time,
      technologies: savedBlog.technologies,
      createdAt: savedBlog.created_at,
      updatedAt: savedBlog.updated_at,
      author: {
        id: savedBlog.authorId,
        name: savedBlog.author.name,
        email: savedBlog.author.email,
      },
    };
  }

  async getBlogBySlug(slug: string) {
    const blog = await this.blogRepo.findOne({
      where: { slug },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        description: true,
        read_time: true,
        technologies: true,
        created_at: true,
        updated_at: true,
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!blog) throw new NotFoundException('Blog not found...');
    return blog;
  }

  async getAllBlogs() {
    const blogs = await this.blogRepo.find({
      where: { deleted_at: IsNull() },
      relations: ['author'],
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        description: true,
        read_time: true,
        technologies: true,
        created_at: true,
        updated_at: true,
        author: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!blogs) return 'No Blogs Available';
    return blogs;
  }

  async deleteBlogBySlug(slug: string) {
    const result = await this.blogRepo.delete({ slug });

    if (result.affected === 0) throw new NotFoundException('Blog not found...');

    return { success: true };
  }

  private async generateUniqueSlug(title: string) {
    const base = slugify(title);
    let slug = base;
    let i = 0;
    while (await this.blogRepo.findOne({ where: { slug } })) {
      i += 1;
      slug = `${base}-${i}`;
    }
    return slug;
  }
}

function slugify(s: string) {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace to -
    .replace(/-+/g, '-') // collapse dashes
    .slice(0, 200);
}
