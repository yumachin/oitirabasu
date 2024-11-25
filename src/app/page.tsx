import Header from '@/components/header/Header';
import Space from '@/components/space/Space';
import Subjects from '@/components/elements/Subjects';

const Home = () => {
  return (
    <main className='bg-gray-200'>
      <Header />
      <Space />
      <Subjects />
    </main>
  );
};

export default Home;