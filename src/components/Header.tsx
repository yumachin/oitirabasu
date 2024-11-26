"use client";

import CreatePost from './elements/CreatePost';
import Links from './elements/Links';
import LoginForm from './elements/LoginForm';
import Setting from './elements/Setting';
import { supabase } from '@/lib/supabaseClient';

import { useEffect, useState } from 'react';
// セッション状態を知るための型定義
import { Session } from '@supabase/supabase-js';

// npm i lucide-react
import { Menu } from 'lucide-react';

export default function Header() {
  // 認証状態か否か
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 初回レンダリング時にセッション情報を更新
    // supabase.auth.getSession(): セッション情報を取得
    // dataプロパティの中のsessionプロパティを分割代入で直接取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    // 認証状態の変更時にセッション情報を更新(hooks/useUser.tsと同じ挙動)
    const { data } = supabase.auth.onAuthStateChange(( _, session ) => {
        setSession(session);
      }
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 w-full z-100">
      <div className="flex justify-between items-center h-16 px-6 sm:px-8 lg:px-16 ">
        <div className="flex items-center">
          <Menu className='mr-6 lg:hidden'/>
          <span className="text-2xl font-bold tracking-tighter mr-16">
            OITirabasu
          </span>
          <Links />
        </div>
        <div className="flex items-center sm:space-x-10">
          {session ? <CreatePost /> : <></>}
          {session ? <></> : <LoginForm />}
          {session ? <Setting /> : <></>}
        </div>
      </div>
    </header>
  );
};