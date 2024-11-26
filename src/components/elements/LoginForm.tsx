import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from '@/components/ui/button';
// npm i lucide-react
import { LogIn } from 'lucide-react';

export default function LoginForm() {
  return (
    <div>
      <div className="flex items-center">
        <Link href={"/pages/signIn"}>
          <Button variant="ghost" size="icon">
            <LogIn />
          </Button>
        </Link>
      </div>
    </div>
  );
};