import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { useState } from "react"
import Link from "next/link"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="-ml-4 mr-4 sm:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px]">
        <SheetHeader className="mt-8">
          <SheetTitle className="font-bold text-3xl border-b-2 border-black pb-2">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-8 mt-6">
          <Link
            href={"/"}
            className="text-xl font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href={"/pages/about"}
            className="text-xl font-medium"
            onClick={() => setIsOpen(false)}
          >
            about
          </Link>
          <Link
            href={"/pages/pastComment"}
            className="text-xl font-medium"
            onClick={() => setIsOpen(false)}
          >
            My Comments
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};