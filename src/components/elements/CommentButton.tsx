import Link from "next/link";

import { CirclePlus } from "lucide-react";

export default function CommentButton() {
  return (
    <Link href={`${1}/comment`} className="fixed bottom-12 right-28">
      <CirclePlus style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", backgroundColor: "#4e5e53", color: "white"}} /> 
    </Link>
  );
};