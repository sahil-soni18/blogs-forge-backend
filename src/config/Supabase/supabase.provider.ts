import { Provider } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';



export const SupabaseProvider: Provider = {
  provide: SUPABASE_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): SupabaseClient => {
    const supabaseUrl = configService.get<string>('SUPABASE_URL');
    const supabaseKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    console.log(`supabase url: ${supabaseUrl}, supabasekey: ${supabaseKey}`)
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL is missing in environment variables');
    }
    if (!supabaseKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in environment variables');
    }

    return createClient(supabaseUrl, supabaseKey);
  },
};
