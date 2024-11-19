import { supabase } from "@/utils/supabase";

export const useSignOut = () => {
  const signOut = async () => {
    // session終了
    await supabase.auth.signOut();
  };
  return signOut;
};