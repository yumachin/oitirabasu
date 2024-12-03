"use client";

import { supabase } from "@/lib/supabaseClient";
import { SignInProps } from "@/types/types";

// keyof: fieldにはSignPropsのプロパティのみ渡されるようにする
export default function useSignIn( setError: (field: keyof SignInProps, error: { type: string, message: string }) => void ) {
  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const { error: emailError } = await supabase.from('User').select('email').eq('email', email);
      if ( emailError ) {
        // 第１引数に、エラーを表示させたいフォームフィールドの名前指定
        // [type: "manual"]: 手動で設定したエラーとして扱う
        setError("email", { type: "manual", message: "存在しないメールアドレスです。" });
        // この時点でsignInは終了し、signInにはnullが返される
        return null;
      }
      const { error: passwordError } = await supabase.auth.signInWithPassword({ email, password });
      if ( passwordError ) {
        setError("password", { type: "manual", message: "パスワードが間違っています。" });
        return null
      }
      // signInには{ error: null }が返される
      return { error: null };
    }
    catch ( error ) {
      console.error("エラー発生:", error);
      return null;
    }
  };
  return signIn;
};