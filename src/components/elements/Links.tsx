import Link from 'next/link';

export default function Links() {
  return (
    <nav className="hidden lg:flex lg:space-x-4">
      <Link href="/" className="text-gray-500 hover:text-blue-500 duration-300 px-4 py-2 text-sm font-medium">
        Home
      </Link>
      <Link href="/pages/header/members" className="text-gray-500 hover:text-blue-500 duration-300 px-4 py-2 text-sm font-medium">
        Members
      </Link>
      <Link href="/pages/header/about" className="text-gray-500 hover:text-blue-500 duration-300 px-4 py-2 text-sm font-medium">
        About
      </Link>
    </nav>
  );
};