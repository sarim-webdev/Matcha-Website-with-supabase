import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gnjaazooijiktkmewtpp.supabase.co";
const supabaseAnonKey = "sb_publishable_NGKvDsuTJ9sXFbH7CoJqmQ_aY13UITo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);