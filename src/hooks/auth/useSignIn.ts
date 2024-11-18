"use client";

import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { SignProps, UserType } from "@/types/types";

// Supabaseのセッション情報を表す型
import { Session } from "@supabase/supabase-js";

export default function useSignIn( setError: (field: keyof SignProps, error: { type: string; message: string }) => void ) {
  // Loginしてない時: null, Loginしてる時: Sessionオブジェクトが入る
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);


  // onAuthStateChangeをuseEffectの中に書かないと、コンポーネントが再レンダリングされるたびにリスナー(イベントが発生した瞬間に「反応する」役割のもの)が再登録される
  useEffect(() => {
    // onAuthStateChange: ユーザーの認証状態の変化を監視(sessionが変化するたびに発火)
    // supabase.auth.onAuthStateChangeの返り値には、subscriptionオブジェクトが含まれており、その中のdataプロパティをauthListenerに代入
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    return () => {
      // subscription: リスナーを解除するための手段を提供
      // unsubscribe: コンポーネントのアンマウント時にリスナーを解除
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      // session?.user.id: セッションにuserオブジェクトが存在するかを確認
      // ?を付けているのは、sessionがnullの場合もあるため
      if (session?.user.id) {
        const response = await fetch(`/api/user/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          // APIから取得したユーザー情報（data.user）をuserに保存
          setUser(data.user);
        } else {
          console.error("ユーザー情報の取得に失敗しました。");
        }
      }
    };
    setupUser();
  }, [session]);

  async function signIn({ email, password }: SignProps) {
    try {
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
        // メールアドレスが間違っている場合
        // 第１引数に、エラーを表示させたいフォームフィールドの名前指定
        // type: "manual": 手動で設定したエラーとして扱う
        setError("email", { type: "manual", message: "存在しないメールアドレスです。" });
        return null;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // パスワードが間違っている場合
        setError("password", { type: "manual", message: "パスワードが間違っています。" });
        return null;
      }
      return { error: null };
  
    } catch (error) {
      console.error("ログイン処理中に何らかのエラー発生:", error);
      alert("ログイン処理に失敗しました。");
      return null;
    }
  }
  return { session, user, signIn };
}
