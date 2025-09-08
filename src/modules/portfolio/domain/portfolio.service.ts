import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Profile } from "../entities/profile.entity";
import { CreateProfileDto } from "./dtos/CreateProfile.dto";
import { Projects } from "../entities/projects.entity";
import { Skills } from "../entities/skills.entity";
import { Experience } from "../entities/experience.entity";
import { Education } from "../entities/education.entity";
import { User } from "src/modules/user/auth/entities/user.entity";

@Injectable()
export class PortfolioService {
    constructor(
        private readonly datasource: DataSource,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async createPortfolio(userId: number, dto: CreateProfileDto) {
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const profileRepo = queryRunner.manager.getRepository(Profile);
            const projectRepo = queryRunner.manager.getRepository(Projects);
            const skillsRepo = queryRunner.manager.getRepository(Skills);
            const experienceRepo = queryRunner.manager.getRepository(Experience);
            const educationRepo = queryRunner.manager.getRepository(Education);

            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

            // ✅ Create portfolio
            const portfolio = profileRepo.create({
                user,
                title: dto.title,
                bio: dto.bio,
                profile_image_url: dto.profile_image_url,
            });

            const savedPortfolio = await profileRepo.save(portfolio);

            // ✅ Projects
            if (dto.projects?.length) {
                const projects = dto.projects.map((project) =>
                    projectRepo.create({ profile: savedPortfolio, ...project })
                );
                await projectRepo.save(projects);
            }

            // ✅ Experience
            if (dto.experience?.length) {
                const experiences = dto.experience.map((e) =>
                    experienceRepo.create({ profile: savedPortfolio, ...e })
                );
                await experienceRepo.save(experiences);
            }

            // ✅ Education
            if (dto.education?.length) {
                const educationData = dto.education.map((edu) =>
                    educationRepo.create({ profile: savedPortfolio, ...edu })
                );
                await educationRepo.save(educationData);
            }

            // ✅ Skills
            if (dto.skills?.length) {
                const skillsData = dto.skills.map((ski) =>
                    skillsRepo.create({ profile: savedPortfolio, ...ski })
                );
                await skillsRepo.save(skillsData);
            }

            await queryRunner.commitTransaction();

            // ✅ Fetch with queryRunner (safer within transaction)
            return queryRunner.manager.getRepository(Profile).findOne({
                where: { id: savedPortfolio.id },
                relations: ['projects', 'experience', 'skills', 'education'],
            });
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
