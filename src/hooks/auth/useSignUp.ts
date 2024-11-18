import { SignProps } from "@/types/types";
import { supabase } from "@/utils/supabase";

export default function useSignUp () {
  async function signUp({ email, password }: SignProps) {
    // AuthenticationのUsersテーブルに追加 + session作成
    await supabase.auth.signUp({ email, password });
  };
  return signUp;
};
