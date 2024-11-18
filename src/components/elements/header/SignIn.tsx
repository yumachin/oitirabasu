import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

const In = () => {
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
  )
}

export default In