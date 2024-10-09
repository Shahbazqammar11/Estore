import Link from 'next/link'; // Import the Link component from Next.js
import { ShoppingCart, User } from "lucide-react"; // Importing Lucide icons

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Store Name */}
        <h1 className="text-xl font-bold">Perfume Store</h1>

        {/* Navigation Links */}
        <nav className="ml-4 space-x-8">
          <Link href="/." className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/newarrivals" className="text-gray-700 hover:text-gray-900">New Arrival</Link> {/* Updated Link */}
          <Link href="/topselling" className="text-gray-700 hover:text-gray-900">Top Selling</Link>
        </nav>

        {/* Search Bar */}
        <div className="w-full max-w-md mx-8">
         
        </div>

        {/* Cart and Account Icons using Lucide */}
        <div className="flex space-x-4">
          <ShoppingCart className="text-xl cursor-pointer" />
          <User className="text-xl cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
