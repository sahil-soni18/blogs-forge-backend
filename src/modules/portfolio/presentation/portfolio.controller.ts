import { Body, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserController } from "src/common/decorators/module/controller/user-controller.decorator";
import { User } from "src/modules/user/auth/entities/user.entity";
import { CurrentUser } from "src/modules/user/decorators/current-user.decorator";
import { CreateProfileDto } from "../domain/dtos/CreateProfile.dto";
import { PortfolioService } from "../domain/portfolio.service";

@ApiTags('Portfolio') 
@UserController('portfolio')
export class PortfolioController {
    constructor(
        private readonly service: PortfolioService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPortfolio(
        @CurrentUser() user: User,
        @Body() dto: CreateProfileDto,
    ) {
        return this.service.createPortfolio(user.id, dto);
    }
}
