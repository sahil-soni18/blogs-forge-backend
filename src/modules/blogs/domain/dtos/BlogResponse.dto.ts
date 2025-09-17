class BlogResponseDto {
  id: number;
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

export default BlogResponseDto;
