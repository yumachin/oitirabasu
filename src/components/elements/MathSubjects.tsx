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

export default function MathSubjects() {
  const [mathSubjects, setMathSubjects] = useState<NewSubject[]>([]);

  useEffect(() => {
    const getSubjects = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/LpSubject/2`, {
        cache: "no-store"
      });
      const data = await res.json();
      setMathSubjects(data.subjects);
    };
    
    getSubjects();
  }, []);

  return (
    <>
      {mathSubjects.map(( subject: NewSubject ) => (
        <div key={subject.id}>
          <Card >
            <CardHeader className='pb-2 sm:pb-6'>
              <div className='flex justify-between items-center sm:pb-3'>
                <div className='flex items-center'>
                  {subject.requ === 2 ? <IoIosCheckmarkCircle className='text-red-500 mr-1' /> : <></>}
                  <CardTitle className='text-lg sm:text-2xl'>{subject.name}</CardTitle>
                </div>
                {subject.other ? 
                  <p className='font-bold text-gray-500 text-xs'>{`(⊛${subject.other})`}</p> : 
                  <></>
                }
              </div>
              <p className='flex justify-end text-gray-600 text-xs'>{subject.teacher}</p>
            </CardHeader>
            <CardContent className='flex justify-between items-center pb-4 sm:pb-6'>
              <div className='flex flex-col gap-1 sm:gap-2'>
                <div className='flex'>
                  <div>おススメ度：</div>
                  <div className='flex px-3'>
                    {[...Array(subject.stars)].map((_, index) => (
                      <MdStar key={index} className="w-4 h-4 sm:w-7 sm:h-7 text-yellow-400" />
                    ))}
                    {[...Array(5 - subject.stars)].map((_, index) => (
                      <MdStar key={index} className="w-4 h-4 sm:w-7 sm:h-7 text-gray-400" />
                    ))}
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
            <CardFooter className="flex justify-center pb-3 sm:pb-6">
              <Link href={`/pages/details/${subject.id}`} className='text-blue-600 hover:text-blue-400'>Read Comments</Link>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};