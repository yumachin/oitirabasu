"use client";

import { NewSubject } from '@/types/types';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// npx shadcn@latest init
// npx shadcn@latest add Card
import { Card, CardContent,CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// npm i react-icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdStar } from 'react-icons/md';

export default function EduSubjects() {
  const [eduSubjects, setEduSubjects] = useState<NewSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubjects = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/LpSubject/1`, {
        cache: "no-store"
      });
      const data = await res.json();
      setEduSubjects(data.subjects)
      setLoading(false);
    };

    getSubjects();
  }, []);
  
  return (
    <>
      {loading && 
      // inset-0: top, bottom, left, rightを0に
      <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-100">
        {/* animate-spin: 回転アニメーション適用 */}
        {/* border-t-transparent: 円を上部を欠けさせる */}
        <div className="h-24 w-24 border-4 border-indigo-400 rounded-full animate-spin border-t-transparent"></div>
      </div> 
      }
      {eduSubjects.map(( subject: NewSubject ) => (
        <div key={subject.id}>
          <Card >
            <CardHeader>
              <div className='flex justify-between items-center pb-3'>
                <div className='flex items-center'>
                  {subject.requ === 2 ? <IoIosCheckmarkCircle className='text-red-500 text-2xl mr-1' /> : <></>}
                  <CardTitle>{subject.name}</CardTitle>
                </div>
                {subject.other ? 
                  <p className='font-bold text-gray-500 text-xs'>{`(⊛${subject.other})`}</p> : 
                  <></>
                }
              </div>
              <p className='flex justify-end text-gray-600 text-xs'>{subject.teacher}</p>
            </CardHeader>
            <CardContent className='flex justify-between items-center'>
              <div className='flex flex-col gap-2'>
                <div className='flex'>
                  <div>おススメ度：</div>
                  <div className='flex px-3'>
                    <MdStar className="w-6 h-6 text-yellow-400" />
                    <MdStar className="w-6 h-6 text-yellow-400" />
                    <MdStar className="w-6 h-6 text-yellow-400" />
                    <MdStar className="w-6 h-6 text-yellow-400" />
                    <MdStar className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div className='flex'>
                  <div>評価方法：</div>
                  {subject.evaluate === 1 ? 
                    <span className='px-3'>20%　80%　0%</span> : 
                    subject.evaluate === 2 ? 
                    <span className='px-3'>100%　0%　0%</span> :
                    subject.evaluate === 3 ? 
                    <span className='px-3'>50%　0%　50%</span> :
                    subject.evaluate === 4 ? 
                    <span className='px-3'>40%　60%　0%</span> :
                    <span className='px-3'>30%　0%　70%</span>
                  }
                </div>
                <div className='flex'>
                  <div>授業期間：</div>
                  {subject.span === 1 ? 
                    <span className='px-3'>セメスター</span> :
                    <span className='px-3'>クウォーター</span>
                  }
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={`/pages/details/${subject.id}`} className='text-blue-600 hover:text-blue-400'>Read Comments</Link>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};
