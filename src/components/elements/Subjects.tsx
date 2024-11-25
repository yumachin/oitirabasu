import Subject from "./Subject";

export default function Subjects() {
  return (
    <div className='flex flex-col sm:grid sm:grid-cols-3 p-6 gap-7'>
      <Subject />
    </div>
  );
};