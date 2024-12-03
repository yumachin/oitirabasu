"use client";

import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/types";

import { useEffect, useState } from "react";
// Supabaseのセッション情報を表す型
import { Session } from "@supabase/supabase-js";

export default function useUser() {
  // Loginしてる時  : Sessionオブジェクト
  // Loginしてない時: null
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // session情報を取得
  // onAuthStateChangeをuseEffectの中に書く（コンポーネントが再レンダリングされるたびにリスナー(イベント発生時に実行する関数)が再登録される）
  useEffect(() => {
    // onAuthStateChange: ユーザーの認証状態の変化を監視（sessionが変化するたびに発火）
    const { data } = supabase.auth.onAuthStateChange(( _, session ) => {
      setSession(session);
    });
    return () => {
      // subscription.unsubscribe(): コンポーネントのアンマウント時に、登録したリスナーを解除
      data.subscription.unsubscribe();
    };
  }, []);

  // ユーザー情報を取得
  useEffect(() => {
    const getUser = async () => {
      if ( session?.user.id ) {
        try {
          // [auth_idとログインユーザーのidとが一致するレコード]のオブジェクトから、dataを分割代入
          const { data } = await supabase.from("User").select("*").eq("auth_id", session.user.id).single();
          setUser(data);
        }
        catch ( error ) {
          console.error("ユーザー情報の取得に失敗しました。", error);
        }
      }
    };
    getUser();
  }, [session]);

  return { session, user };
};