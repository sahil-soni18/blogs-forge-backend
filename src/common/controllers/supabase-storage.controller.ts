import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { StorageService } from "../services/supabase-storage.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from "@nestjs/swagger";
import { ApiFile } from "../decorators/module/controller/api-file.decorator";


@ApiTags('Supabase Storage')
@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post('upload')
    @ApiFile()
    // @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        const bucket = 'BlogsMedia';
        const path = `${Date.now()}-${file.originalname}`;

        const result = await this.storageService.uploadFile(
            bucket, 
            path, 
            file.buffer, 
            file.mimetype,
        );

        const publicUrl = await this.storageService.getPublicUrl(bucket, path);

        return { result, publicUrl };
    }
}