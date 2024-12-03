import { supabase } from "@/lib/supabaseClient";

export default function useSignOut() {
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return signOut;
};