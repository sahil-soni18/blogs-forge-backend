import { Module } from "@nestjs/common";
import { UserCrudModule } from "src/modules/user/crud/user-crud.module";
import { BlogsController } from "./blogs.controller";
import { BlogsDomain } from "../domain/blogs.domain";

@Module({
  imports: [BlogsDomain, UserCrudModule],
  controllers: [BlogsController],
})
export class BlogsControllerMoodule {}
