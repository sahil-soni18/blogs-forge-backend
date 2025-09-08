import { Module } from "@nestjs/common";
import { UserCrudModule } from "src/modules/user/crud/user-crud.module";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioDomain } from "../domain/portfolio.domain";

@Module({
  imports: [PortfolioDomain, UserCrudModule],
  controllers: [PortfolioController],
})
export class PortfolioControllerModule {}
