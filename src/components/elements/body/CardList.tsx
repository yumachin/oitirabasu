import ACard from "./ACard";

const CardList = () => {
  return (
    <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-4'>
      <ACard />
    </div>
  );
};

export default CardList;