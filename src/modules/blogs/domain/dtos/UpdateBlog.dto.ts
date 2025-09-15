import { PartialType } from "@nestjs/swagger";
import { CreateBlogDto } from "./CreateBlog.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {};