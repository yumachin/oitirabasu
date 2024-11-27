"use client";

import CommentButton from '@/components/elements/CommentButton';
import Header from '@/components/Header';
import Space from '@/components/Space';
import { Comment } from '@/types/types';

import { use, useEffect, useState } from 'react';

import { CircleUser } from 'lucide-react';
import { MdStar } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

export default function CommentDetail({ params }: { params: Promise<{ id : number }> }) {
  const [comments, setComments] = useState([]);
  const { id } = use(params);
  
  useEffect(() => {
    const getDetailComments = async ( id: number ) => {
      const res = await fetch(`http://localhost:3000/api/comment/${id}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setComments(data.comments);
    }
    getDetailComments(id);
  }, [])

  return (
    <>
      <Header />
      <Space />
      <div className="max-w-4xl mx-auto py-8">
        <ul className="space-y-10">
          {comments.map(( comment: Comment ) => (
            <li key={comment.id} className="bg-white p-5 rounded-lg">
              <div className='flex justify-between'>
                <div className="flex items-start mb-5">
                  <div className="mr-5">
                    <CircleUser style={{ width: "2.5rem", height: "2.5rem" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{comment.author.name}</h3>
                    <p className="text-sm text-gray-600">
                      {comment.updatedAt === null ? new Date( comment.createdAt ).toDateString() : new Date( comment.updatedAt ).toDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex">
                  {[...Array(comment.stars)].map((_, index) => (
                    <MdStar key={index} className="w-8 h-8 text-yellow-400" />
                  ))}
                  {[...Array(5 - comment.stars)].map((_, index) => (
                    <MdStar key={index} className="w-8 h-8 text-gray-400" />
                  ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-800 font-bold text-2xl border-b border-gray-400 mb-4 pl-3 pb-1">{comment.title}</p>
              <p className="text-gray-800 text-lg pl-6">{comment.content}</p>
            </li>
          ))}
        </ul>
        <CommentButton />
      </div>
    </>
  );
};