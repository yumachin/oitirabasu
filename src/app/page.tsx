import Header from '@/components/layouts/header/Header';
import Space from '@/components/layouts/space/Space';
import CardList from '@/components/elements/body/CardList';

const Home = () => {
  return (
    <main className='bg-gray-200'>
      <Header />
      <Space />
      <CardList />
    </main>
  );
};

export default Home;