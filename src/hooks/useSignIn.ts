"use client";

import { supabase } from "@/lib/supabaseClient";
import { SignProps } from "@/types/types";

// keyof: 存在しないプロパティ名が指定されるのを防ぐ
export const useSignIn = ( setError: ( field: keyof SignProps, error: { type: string; message: string } ) => void ) => {
  const signIn = async ({ email, password }: SignProps) => {
    try {
      // まずemailのエラーをcheck
      const { error: emailError } = await supabase
        // UserDBを参照
        .from('User')
        // email列を参照
        .select('email')
        // email列の中で引数emailと一致するものがあるかどうか
        .eq('email', email)
        // 返されるレコードが1件のみであることを期待
        .single();
      if (emailError) {
        // 第１引数に、エラーを表示させたいフォームフィールドの名前指定
        // type: "manual": 手動で設定したエラーとして扱う
        setError("email", { type: "manual", message: "存在しないメールアドレスです。" });
        return null;
      }

      // 次にpasswordをcheck
      const { error: passwordError } = await supabase.auth.signInWithPassword({ email, password });
      if (passwordError) {
        setError("password", { type: "manual", message: "パスワードが間違っています。" });
        return null;
      }
      return { error: null };
  
    } catch ( error ) {
      console.error("エラー発生:", error);
      return null;
    }
  };
  return signIn;
};