import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add ~
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// npm i react-icons
import { IoMdStar } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";

const ACard = () => {
  return (
    <div>
      <Card className='bg-white border'>
        <CardHeader>
          <CardTitle>線形代数学Ⅰ</CardTitle>
          <div className='flex justify-end'>
            <CardDescription></CardDescription> 
          </div>
        </CardHeader>
        <CardContent className='flex items-center '>
          <span className='mr-2'>おススメ度:</span>
          <IoMdStar className='text-yellow-400 text-2xl border-black' />
          <IoMdStar className='text-yellow-400 text-2xl border-black' />
          <IoMdStar className='text-yellow-400 text-2xl border-black' />
          <IoMdStar className='text-yellow-400 text-2xl border-black' />
          <IoStarOutline className='text-xl'/>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/"}>Read More</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ACard;