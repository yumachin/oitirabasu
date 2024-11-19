import { SignProps } from "@/types/types";
import { supabase } from "@/utils/supabase";

export const useSignUp = () => {
  const signUp = async ({ name, email, password }: SignProps) => {
    await supabase.auth.signUp({ email, password, options: { data: { name } }});
  };
  return signUp;
};
