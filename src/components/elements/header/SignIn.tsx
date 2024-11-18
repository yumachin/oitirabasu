import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const SignIn = () => {
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

export default SignIn;