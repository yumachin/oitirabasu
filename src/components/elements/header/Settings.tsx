import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import Link from "next/link"

const UserInf = () => {
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
  )
}

export default UserInf