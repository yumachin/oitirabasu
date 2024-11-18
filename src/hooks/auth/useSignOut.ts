import { supabase } from "@/utils/supabase";

export default function useSignOut () {
  async function signOut() {
    // session終了
    await supabase.auth.signOut();
  }
  return signOut
};