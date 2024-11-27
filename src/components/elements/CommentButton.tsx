import Link from "next/link";

import { CirclePlus } from "lucide-react";

export default function CommentButton() {
  return (
    <Link href={`${1}/comment`} className="fixed bottom-12 right-28">
      <CirclePlus style={{ width: "3rem", height: "3rem" }} /> 
    </Link>
  );
};