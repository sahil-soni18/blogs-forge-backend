import { Module } from '@nestjs/common';
import { StorageController } from './supabase-storage.controller';
import { StorageService } from '../services/supabase-storage.service';
import { SupabaseProvider } from 'src/config/Supabase/supabase.provider';
import { SupabaseModule } from 'src/config/Supabase/supabase.module';

@Module({
    imports: [SupabaseModule],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
