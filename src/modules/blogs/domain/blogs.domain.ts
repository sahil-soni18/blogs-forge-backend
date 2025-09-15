import { Domain } from "src/common/decorators/module/domain/domain.decorator";
import { Blog } from "../entities/blog.entity";
import { User } from "src/modules/user/auth/entities/user.entity";
import { UserCrudModule } from "src/modules/user/crud/user-crud.module";
import { UserBaseModule } from "src/shared/user-base/user-base.module";
import { UserAuthService } from "src/modules/user/auth/services/user-auth.service";
import { BlogsService } from "./blogs.service";

@Domain({
    entities: [Blog, User],
    imports: [
        UserCrudModule,
        UserBaseModule
    ],
    services: [
        BlogsService
    ]
})

export class BlogsDomain {}