import Link from "next/link";

// // npx shadcn@latest init
// npx shadcn@latest add ~
import { Button } from "@/components/ui/button";

// npm i lucide-react
import { User } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <div className="flex items-center">
        <Link href={"/pages/sign/signOut"}>
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;