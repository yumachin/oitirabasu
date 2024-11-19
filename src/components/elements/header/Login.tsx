import Link from 'next/link';

// npx shadcn@latest init
// npx shadcn@latest add ~
import { Button } from '@/components/ui/button';

// npm i lucide-react
import { LogIn } from 'lucide-react';

const Login = () => {
  return (
    <div>
      <div className="flex items-center">
        <Link href={"/pages/sign/signIn"}>
          <Button variant="ghost" size="icon">
            <LogIn />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;