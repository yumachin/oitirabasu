import Link from "next/link";

// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from "@/components/ui/button";
// npm i lucide-react
import { User } from 'lucide-react';

export default function Setting() {
  return (
    <div>
      <div className="flex items-center">
        <Link href={"/pages/signOut"}>
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </Link>
      </div>
    </div>
  );
};