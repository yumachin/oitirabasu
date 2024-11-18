"use client"

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

// セッション状態を知るための型定義
import { Session } from '@supabase/supabase-js';
import Title from '@/components/elements/header/Title';
import CreatePost from '@/components/elements/header/CreatePost';
import Settings from '@/components/elements/header/Settings';
import Selecions from '@/components/elements/header/Selections';
import SignIn from '@/components/elements/header/SignIn';

export default function Header() {
  // 認証状態か否か
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 認証状態の初期チェック
    // .then()を使って非同期でデータを取得
    // getSession()の結果には、dataオブジェクトの中にsessionプロパティが含まれており、これには現在のセッション情報が格納
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 認証状態の変更を監視
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
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
  )
}