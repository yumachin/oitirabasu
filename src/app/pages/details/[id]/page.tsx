"use client";

import CommentButton from '@/components/elements/CommentButton';
import Header from '@/components/Header';
import Space from '@/components/Space';
import { supabase } from '@/lib/supabaseClient';
import { Comment } from '@/types/types';

import { use, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

// npm i lucide-react
import { CircleUser } from 'lucide-react';
// npm i react-icon
import { MdStar } from 'react-icons/md';

export default function CommentDetail({ params }: { params: Promise<{ id : number }> }) {
  const [session, setSession] = useState<Session | null>(null);
  const [comments, setComments] = useState([]);
  const { id } = use(params);
  const [loading, setLoading] = useState(true);

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
  
  useEffect(() => {
    const getDetailComments = async ( id: number ) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/comment/${id}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setComments(data.comments);
      setLoading(false);
    }
    getDetailComments(id);
  }, [id])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          {/* animate-spin: 回転アニメーション適用 */}
          {/* border-t-transparent: 円を上部を欠けさせる */}
          <div className="h-24 w-24 border-4 border-indigo-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
      ) : (
        <></>
      )}
      <Header />
      <Space />
      <div className="max-w-xs sm:max-w-4xl mx-auto py-4">
        {comments.length === 0 ? (
          <div className='flex justify-center items-center'>
            <p className='font-bold'>コメントはまだありません</p>
          </div> ) : (
          <div className='flex justify-center items-center'>
            <p className='text-red-600 font-bold mb-4 mr-2'>{`${comments.length}　件`}</p>
            <p className='mb-4'>ヒットしました</p>
          </div> )
        }
        <ul className="space-y-7">
          {comments.map(( comment: Comment ) => (
            <li key={comment.id} className="bg-white p-4 sm:p-5 rounded-lg">
              <div className='flex justify-between'>
                <div className="flex items-start   mb-5">
                  <div className="mr-3 sm:mr-5">
                    <CircleUser style={{ width: "2rem", height: "2rem" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{comment.author.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {comment.updatedAt === null ? new Date(comment.createdAt).toDateString() : new Date(comment.updatedAt).toDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex">
                  {[...Array(comment.stars)].map((_, index) => (
                    <MdStar key={index} className="w-4 h-4 sm:w-7 sm:h-7 text-yellow-400" />
                  ))}
                  {[...Array(5 - comment.stars)].map((_, index) => (
                    <MdStar key={index} className="w-4 h-4 sm:w-7 sm:h-7 text-gray-400" />
                  ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-800 font-bold text-md sm:text-2xl border-b border-gray-400 mb-2 sm:mb-4 sm:pl-3 pb-1">{comment.title}</p>
              <p className="text-gray-800 text-sm sm:text-lg pl-2 sm:pl-6">{comment.content}</p>
            </li>
          ))}
        </ul>
        {session ? <CommentButton id={id}/> : <p></p>}
      </div>
    </>
  );
};