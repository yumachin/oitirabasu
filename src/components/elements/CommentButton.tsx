import Link from "next/link";

// npm i lucide-react
import { CirclePlus } from "lucide-react";

export default function CommentButton({ id }: { id: number }) {
  return (
    // href={1/comment}: 相対パスを指定
    // href={/1/comment}: 絶対パスを指定
    <Link href={`${id}/comment`} className="fixed bottom-12 right-28">
      <CirclePlus style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#4e5e53", color: "white"}} /> 
    </Link>
  );
};