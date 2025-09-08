import { Module } from "@nestjs/common";
import { PortfolioControllerModule } from "./presentation/portfolio-controller.module";
import { PortfolioDomain } from "./domain/portfolio.domain";

@Module({
  imports: [PortfolioControllerModule, PortfolioDomain],
  exports: [PortfolioDomain], 
})
export class PortfolioModule {}
