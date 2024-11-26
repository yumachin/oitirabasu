"use client";

import { supabase } from "@/lib/supabaseClient";
import { UserType } from "@/types/types";

import { useEffect, useState } from "react";
// Supabaseのセッション情報を表す型
import { Session } from "@supabase/supabase-js";

export const useUser = () => {
  // Loginしてる時: Sessionオブジェクト, Loginしてない時: null
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  // onAuthStateChangeをuseEffectの中に書かないと、コンポーネントが再レンダリングされるたびにリスナー(イベント発生時に実行する関数)が再登録される
  useEffect(() => {
    // onAuthStateChange: ユーザーの認証状態の変化を監視(sessionが変化するたびに発火)
    // supabase.auth.onAuthStateChangeの返り値のdataプロパティをauthListenerに代入
    const { data: authListener } = supabase.auth.onAuthStateChange(( _, session ) => {
      setSession(session);
    });
    return () => {
      // subscription: リスナーを解除するための手段を提供
      // unsubscribe: コンポーネントのアンマウント時に登録したリスナーを解除
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if ( session?.user.id ) {
        try {
          const { data, error } = await supabase
            .from("User")
            .select("*")
            // auth_id列にsession.user.idが存在するのか
            .eq("auth_id", session.user.id)
            .single();
          if ( error ) throw error;
          setUser(data);
        } catch ( error ) {
          console.error("ユーザー情報の取得に失敗しました。", error);
        }
      }
    };
    setupUser();
  }, [session]);

  return { session, user };
};