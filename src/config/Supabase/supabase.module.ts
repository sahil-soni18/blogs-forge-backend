import { Global, Module } from "@nestjs/common";
import { SUPABASE_CLIENT, SupabaseProvider } from "./supabase.provider";

@Global()
@Module({
    providers: [SupabaseProvider],
    exports: [SUPABASE_CLIENT]
})
export class SupabaseModule {};