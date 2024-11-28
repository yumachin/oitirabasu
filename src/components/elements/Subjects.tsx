import Subject from "./Subject";
import Space from "../Space";

export default function Subjects() {
  return (
    <>
      <div className="flex justify-center">
        <p className="py-5 font-bold text-2xl">＜システムデザイン工学科１年次前期前半＞</p>
      </div>
      <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-7'>
        <Subject />
      </div>
      <Space />
    </>
  );
};