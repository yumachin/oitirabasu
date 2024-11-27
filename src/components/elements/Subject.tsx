import { subjects } from '@/utils/datas';

import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add Card
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
            <span className='mr-2'>{`形式：${subject.type}`}</span>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={`/pages/details/${subject.id}`} className='text-blue-600 hover:text-blue-400'>Read More</Link>
          </CardFooter>
        </Card>
      </div>
    ))}
    </>
  );
};