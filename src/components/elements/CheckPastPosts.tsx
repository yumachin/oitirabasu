import Link from "next/link";

// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from "@/components/ui/button";

export default function CheckPastPosts() {
  return (
    <Link href={"/pages/pastComment"}>
      <Button size="sm" className="hidden lg:flex lg:px-6 bg-gray-500 hover:bg-gray-600">
        過去の投稿
      </Button>
    </Link>
  );
};