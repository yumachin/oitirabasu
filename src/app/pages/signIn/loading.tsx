export default function Loading() {
  return(
    <div className="flex justify-center items-center min-h-screen">
      {/* animate-spin: 回転アニメーション適用 */}
      {/* border-t-transparent: 円を上部を欠けさせる */}
      <div className="h-24 w-24 border-4 border-indigo-400 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};