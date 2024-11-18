
import CreatePost from '@/components/elements/header/CreatePost';
import SignIn from '@/components/elements/header/SignIn';
import Selections from '@/components/elements/header/Selections';
import Title from '@/components/elements/header/Title';
import Settings from '@/components/elements/header/Settings';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 w-full z-100">
      <div className="flex justify-between items-center h-16 px-6 sm:px-8 lg:px-16 ">
        <div className="flex items-center">
          <Menu className='mr-6 lg:hidden'/>
          <Title />
          <Selections />
        </div>
        <div className="flex items-center sm:space-x-10">
          <CreatePost />
          <SignIn />
          <Settings />
        </div>
      </div>
    </header>
  )
}