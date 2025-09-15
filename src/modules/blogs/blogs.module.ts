import { Module } from "@nestjs/common";
import { BlogsControllerMoodule } from "./presentation/blogs-controller.module";
import { BlogsDomain } from "./domain/blogs.domain";

@Module({
  imports: [BlogsControllerMoodule, BlogsDomain],
  exports: [BlogsDomain], 
})
export class BlogsModule {}
