"use client";

import Header from '@/components/Header';
import Space from '@/components/Space';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabaseClient';
import { Comment } from '@/types/types';

import { useEffect, useState } from 'react';

import { MdStar } from 'react-icons/md';

export default function PastComments() {
  const [pastComments, setPastComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState<number>();
  const { session } = useUser();
  const email = session?.user.email;

  // UserテーブルからauthorIdを取得する
  useEffect(() => {
    const getAuthorId = async () => {
      // 取得したemailとUserテーブルのemailが一致する行のnameを取得
      // data = [{name: 'ゆうま'}]
      const { data } = await supabase.from('User').select('id').eq('email', email); 
      // data/sessionがnullの可能性があるため
      if ( data && session ) {
        setAuthorId(data[0].id);
      }
    };
    getAuthorId();
  }, [session]);

  useEffect(() => {
    // pastCommentsの上書きを防ぐ
    if (authorId === undefined) return; 

    const getPastComments = async ( authorId: number ) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/pastComment/${authorId}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setPastComments(data.pastComments);
      setLoading(false);
    };
    getPastComments(authorId!);
  }, [authorId]);

  const handleDelete = async ( id: number )  => {
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/comment/${id}`, {
      method: 'DELETE'
    });
    setPastComments(( prevPastComments ) => prevPastComments.filter(( pastComment: Comment ) => pastComment.id !== id ));
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <Space />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          {/* animate-spin: 回転アニメーション適用 */}
          {/* border-t-transparent: 円を上部を欠けさせる */}
          <div className="h-24 w-24 border-4 border-indigo-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
        ) : ( pastComments.length === 0 ? (
          <div className='flex justify-center items-center py-4'>
            <p className='font-bold'>過去にポストしたコメントはありません。</p>
          </div> 
         ) : (
          <div className="max-w-4xl mx-auto py-4">
            <ul className="space-y-7">
              {pastComments.map(( pastComment: Comment ) => (
                <li key={pastComment.id} className="bg-white p-5 rounded-lg">
                  <div className='flex justify-between'>
                    <div className="flex items-center mb-5">
                      <p className="text-sm text-gray-600 mr-4">
                        {pastComment.updatedAt === null ? 
                          new Date( pastComment.createdAt ).toDateString() : 
                          new Date( pastComment.updatedAt ).toDateString()
                        }
                      </p>
                      <p className="text-xl text-gray-400 mr-4">/</p>
                      <p className="text-sm text-gray-600">線形代数学Ⅰ</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex">
                      {[...Array(pastComment.stars)].map((_, index) => (
                        <MdStar key={index} className="w-6 h-6 text-yellow-400" />
                      ))}
                      {[...Array(5 - pastComment.stars)].map((_, index) => (
                        <MdStar key={index} className="w-6 h-6 text-gray-400" />
                      ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between mb-2'>
                    <p className="text-gray-800 font-bold text-2xl border-b border-gray-400 mb-4 px-3 pb-1">{pastComment.title}</p>
                    <Button 
                      className='text-xs px-8 bg-red-600 hover:bg-red-500 text-white transition duration-200 ease-in-out'
                      onClick={() => handleDelete(pastComment.id)}
                    >
                      削除
                    </Button>
                  </div>
                  <p className="text-gray-800 text-lg px-6">{pastComment.content}</p>
                </li>
              ))}
            </ul>
          </div>
         )
        )
      }
    </div>
  );
};