import { SignProps } from "@/types/types";
import { supabase } from "@/utils/supabase";

export default function useSignUp () {
  async function signUp({ name, email, password }: SignProps) {
    await supabase.auth.signUp({ email, password, options: { data: { name } }});
  };
  return signUp;
};
