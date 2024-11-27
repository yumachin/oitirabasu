import Subject from "./Subject";
import Space from "../Space";

export default function Subjects() {
  return (
    <>
      <p className="pl-6 pt-3 font-bold text-2xl">＜システムデザイン工学科１年前期＞</p>
      <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-7'>
        <Subject />
      </div>
      <Space />
    </>
  );
};