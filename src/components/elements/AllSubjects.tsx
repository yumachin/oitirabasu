import EduSubjects from "./EduSubjects";
import MathSubjects from "./MathSubjects";
import SpecSubjects from "./SpecSubjects";

export default function Subjects() {
  return (
    <>
      <div className="flex justify-center mb-8 sm:mb-16">
        <p className="pt-5 sm:py-5 font-bold text-lg sm:text-3xl">＜システムデザイン工学科１年次前期前半＞</p>
      </div>
      <div className="mb-8 sm:mb-16">
        <p className="px-7 font-bold sm:text-xl">教養共通科目</p>
        <p className="px-8 font-bold text-xs sm:text-lg">(※評価方法：平常点(出席・課題など)、レポート点、テスト点)</p>
        <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3'>
          <EduSubjects />
        </div>
      </div>
      <div className="mb-8 sm:mb-16">
        <p className="px-7 font-bold sm:text-xl">工学関連科目</p>
        <p className="px-8 font-bold text-xs sm:text-lg">(※評価方法：平常点(出席・課題など)、レポート点、テスト点)</p>
        <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3'>
          <MathSubjects />
        </div>
      </div>
      <div className="sm:mb-16">
        <p className="px-7 font-bold sm:text-xl">専門科目</p>
        <p className="px-8 font-bold text-xs sm:text-lg">(※評価方法：平常点(出席・課題など)、レポート点、テスト点)</p>
        <div className="flex flex-col sm:grid sm:grid-cols-3 p-6 gap-3">
          <SpecSubjects />
        </div>
      </div>
    </>
  );
};