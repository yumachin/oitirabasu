// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckPastPosts() {
  return (
    <Link href="/pages/pastComment/">
      <Button size="sm" className="hidden lg:px-6 lg:flex bg-gray-500 hover:bg-gray-600">
        過去の投稿
      </Button>
    </Link>
  );
};