import { supabase } from "@/lib/supabaseClient";
import { SignProps } from "@/types/types";

export const useSignUp = () => {
  const signUp = async ({ name, email, password }: SignProps) => {
    // options: { data: {} }: ユーザーに{}というデータを付加する
    await supabase.auth.signUp({ email, password, options: { data: { name } }});
  };
  return signUp;
};