import { subjects } from '@/utils/datas';

import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add Card
import { Card, CardContent,CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdStar } from 'react-icons/md';

export default function Subject() {
  return (
    <>
    {subjects.map(subject => (
      <div key={subject.id}>
        <Card 
          className={`
            ${subject.type === "1" ? "bg-gray-100" : ""}
            ${subject.type === "2" ? "bg-slate-300" : ""}
            ${subject.type === "3" ? "bg-custom-gray" : ""}
          `}
        >
          <CardHeader>
            <div className='flex justify-between items-center pb-3'>
              <div className='flex items-center'>
                {subject.require ? <IoIosCheckmarkCircle className='text-red-500 text-2xl mr-1' /> : <></>}
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
            <div className='flex flex-col'>
              {subject.type === "1" && <span className='mr-2'>種類：共用共通科目</span>}
              {subject.type === "2" && <span className='mr-2'>種類：工学関連科目</span>}
              {subject.type === "3" && <span className='mr-2'>種類：専門科目</span>}
              <span className='mr-2'>{`形式：${subject.span}`}</span>
              <span className='mr-2'>評価方法：</span>
            </div>
            <div className='flex flex-col justify-center space-y-1'>
              <div>おススメ度:</div>
              <div className='flex px-3'>
                <MdStar className="w-6 h-6 text-yellow-400" />
                <MdStar className="w-6 h-6 text-yellow-400" />
                <MdStar className="w-6 h-6 text-yellow-400" />
                <MdStar className="w-6 h-6 text-yellow-400" />
                <MdStar className="w-6 h-6 text-yellow-400" />
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