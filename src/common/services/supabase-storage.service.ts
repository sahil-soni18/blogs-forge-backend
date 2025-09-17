import { Inject, Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "src/config/Supabase/supabase.provider";

@Injectable()
export class StorageService {
    constructor(
        @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
    ) {}

    async uploadFile(bucket: string, path: string, file: Buffer, contentType: string) {
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(path, file, {
                contentType,
                upsert: true,
            });

            if ( error ) {
                throw new Error(`Upload failed: ${error.message}`);
            }

            return data;
    }

    async getPublicUrl(bucket: string, path: string) {
        const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    }
}