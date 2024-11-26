import { subjects } from '@/utils/datas';

import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add Card
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// npm i react-icons
import { IoMdStar } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";

export default function Subject() {
  return (
    <>
    {subjects.map(subject => (
      <div key={subject.id}>
        <Card className='bg-white border'>
          <CardHeader>
            <CardTitle>{subject.name}</CardTitle>
            <CardDescription className='flex justify-end'>{subject.teacher}</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center '>
            <span className='mr-2'>おススメ度:</span>
            <IoMdStar className='text-yellow-400 text-2xl border-black' />
            <IoMdStar className='text-yellow-400 text-2xl border-black' />
            <IoMdStar className='text-yellow-400 text-2xl border-black' />
            <IoStarOutline className='text-xl'/>
            <IoStarOutline className='text-xl'/>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={`/pages/details/${subject.id}`} className='text-blue-600 hover:text-blue-900'>Read More</Link>
          </CardFooter>
        </Card>
      </div>
    ))}
    </>
  );
};