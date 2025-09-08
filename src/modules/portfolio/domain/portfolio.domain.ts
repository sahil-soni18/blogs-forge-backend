import { Domain } from "src/common/decorators/module/domain/domain.decorator";
import { Profile } from "../entities/profile.entity";
import { Education } from "../entities/education.entity";
import { Skills } from "../entities/skills.entity";
import { Projects } from "../entities/projects.entity";
import { Experience } from "../entities/experience.entity";
import { User } from "src/modules/user/auth/entities/user.entity";
import { UserCrudModule } from "src/modules/user/crud/user-crud.module";
import { UserBaseModule } from "src/shared/user-base/user-base.module";
import { UserAuthService } from "src/modules/user/auth/services/user-auth.service";
import { PortfolioService } from "./portfolio.service";

@Domain({
    entities: [Profile, Education, Skills, Projects, Experience, User],
    imports: [
        UserCrudModule,
        UserBaseModule
    ],
    services: [
        PortfolioService
    ]
})

export class PortfolioDomain {}