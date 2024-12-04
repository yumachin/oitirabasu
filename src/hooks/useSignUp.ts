import { supabase } from "@/lib/supabaseClient";
import { SignUpProps } from "@/types/types";

export default function useSignUp() {
  const signUp = async ({ name, email, password }: SignUpProps) => {
    // [options: { data: {} }]: ユーザーに{}というデータを付加
    await supabase.auth.signUp({ email, password, options: { data: { name } }});
  };
  return signUp;
};