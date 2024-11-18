"use client";

import Title from '@/components/elements/header/Title';
import Selecions from '@/components/elements/header/Selections';
import CreatePost from '@/components/elements/header/CreatePost';
import SignIn from '@/components/elements/header/SignIn';
import Settings from '@/components/elements/header/Settings';
import { supabase } from '@/utils/supabase';

import { useEffect, useState } from 'react';

import { Menu } from 'lucide-react';
// セッション状態を知るための型定義
import { Session } from '@supabase/supabase-js';

export default function Header() {
  // 認証状態か否か
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 認証状態の初期チェック
    // .then(): 非同期処理(セッション情報を取得が非同期)が成功したときの挙動
    // getSession()の結果には、dataオブジェクトの中にsessionプロパティが含まれており、これには現在のセッション情報が格納
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Headerのdataは", data);
      setSession(session);
    });

    // hooks/useSignInと同じ挙動
    // 認証状態の変更を監視
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
        setSession(session);
      }
    );

    // クリーンアップ
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 w-full z-100">
      <div className="flex justify-between items-center h-16 px-6 sm:px-8 lg:px-16 ">
        <div className="flex items-center">
          <Menu className='mr-6 lg:hidden'/>
          <Title />
          <Selecions />
        </div>
        <div className="flex items-center sm:space-x-10">
          {session ? <CreatePost /> : <></>}
          {session ? <></> : <SignIn />}
          {session ? <Settings /> : <></>}
        </div>
      </div>
    </header>
  );
};