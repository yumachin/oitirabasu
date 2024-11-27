"use client";

import CommentButton from '@/components/elements/CommentButton';
import Header from '@/components/Header';
import Space from '@/components/Space';
import { supabase } from '@/lib/supabaseClient';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import { CircleUser } from 'lucide-react';
import { IoMdStar } from 'react-icons/io';
import { IoStarOutline } from 'react-icons/io5';

export default function PostDetail() {
  const comments = [
    { id: 3, author: "中井裕麻", content: "テストの配点が結構重いから、出席しなくても単位はとれるよ。", date: "November 26, 2024" },
    { id: 2, author: "工藤構成", content: "全然シラバス通りの授業内容ではないから、シラバスに記載されてるような授業を期待している人は履修しない方がいいかも。", date: "November 16, 2024" },
    { id: 1, author: "高橋清や", content: "単位はとれるけど、成績A取るのはめちゃくちゃ難しいから、GPA気にしている人にはお勧めできません。", date: "November 2, 2023" }
  ];

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
    <>
      <Header />
      <Space />
      <div className="max-w-4xl mx-auto py-8">
        <ul className="space-y-10">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-white p-5 rounded-lg">
              <div className='flex justify-between'>
                <div className="flex items-start mb-5">
                  <div className="mr-5">
                    <CircleUser style={{ width: "2.5rem", height: "2.5rem" }}/>
                  </div>
                  <div>
                    <h3 className="font-semibold">{comment.author}</h3>
                    <p className="text-sm text-gray-600">{comment.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <IoMdStar className='text-yellow-400 text-2xl border-black' />
                  <IoMdStar className='text-yellow-400 text-2xl border-black' />
                  <IoMdStar className='text-yellow-400 text-2xl border-black' />
                  <IoStarOutline className='text-xl'/>
                  <IoStarOutline className='text-xl'/>
                </div>
              </div>
              <p className="text-gray-800 font-semibold text-xl border-b border-gray-400 mb-4 pb-1">これは酷いです。</p>
              <p className="text-gray-800">{comment.content}</p>
            </li>
          ))}
        </ul>
        {session ? <CommentButton /> : <></>}
      </div>
    </>
  );
};