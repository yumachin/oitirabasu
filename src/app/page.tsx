import Header from '@/components/Header';
import Space from '@/components/Space';
import AllSubjects from '@/components/elements/AllSubjects';

export default function Home() {
  return (
    <main className='bg-gray-200'>
      <Header />
      <Space />
      <AllSubjects />
    </main>
  );
};