"use client";

import CheckPastPosts from './elements/CheckPastPosts';
import HamburgerMenu from './elements/HambergerMenu';
import Links from './elements/Links';
import LoginForm from './elements/LoginForm';
import Setting from './elements/Setting';
import { supabase } from '@/lib/supabaseClient';

import { useEffect, useState } from 'react';
// Supabaseのセッション情報を表す型
import { Session } from '@supabase/supabase-js';


export default function Header() {
  // Loginしてる時  : Sessionオブジェクト
  // Loginしてない時: null
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // supabase.auth.getSession(): セッション情報を取得
    // dataプロパティの中のsessionプロパティを分割代入で直接取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    // hooks/useUser.tsと同じ挙動
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
          <HamburgerMenu />
          {/* tracking-tighter: 文字間隔を狭く */}
          <span className="text-2xl font-bold tracking-tighter mr-16">
            OITirabasu
          </span>
          <Links />
        </div>
        <div className="flex items-center sm:space-x-10">
          {session ? <CheckPastPosts /> : <></>}
          {session ? <></> : <LoginForm />}
          {session ? <Setting /> : <></>}
        </div>
      </div>
    </header>
  );
};