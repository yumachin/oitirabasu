import Space from "../Space";
import EduSubjects from "./EduSubjects";
import MathSubjects from "./MathSubjects";
import SpecSubjects from "./SpecSubjects";

export default function Subjects() {
  return (
    <>
      <div className="flex justify-center">
        <p className="py-5 font-bold text-2xl">＜システムデザイン工学科１年次前期前半＞</p>
      </div>
      <Space />
      <div>
        <p className="px-7 font-bold text-lg">教養共通科目（※評価方法：　平常点(出席・課題など)、レポート点、テスト点の割合（%））</p>
        <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3'>
          <EduSubjects />
        </div>
        <Space />
      </div>
      <div>
        <p className="px-7 font-bold text-lg">工学関連科目（※評価方法：　平常点(出席・課題など)、レポート点、テスト点の割合（%））</p>
        <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3'>
          <MathSubjects />
        </div>
        <Space />
      </div>
      <div>
        <p className="px-7 font-bold text-lg">専門科目（※評価方法：　平常点(出席・課題など)、レポート点、テスト点の割合（%））</p>
        <div className="flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3">
          <SpecSubjects />
        </div>
      </div>
      <Space />
    </>
  );
};