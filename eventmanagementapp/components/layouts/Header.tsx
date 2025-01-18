import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [query, setQuery] = useState(""); // State to store the search query
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (query.trim()) {
      // Redirect to a search results page with the query
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      {/* Top Row: Login and Sign-Up */}
      <div className="flex justify-end items-center p-4 border-b border-gray-200">
        <Link href="/login" legacyBehavior>
          <a className="text-sm text-blue-600 hover:text-blue-800 mr-4">Login</a>
        </Link>
        <Link href="/signup" legacyBehavior>
          <a className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign Up
          </a>
        </Link>
      </div>

      {/* Bottom Row: Company Name, Navigation Links, and Search Bar */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Company Name */}
        <h1 className="text-xl font-bold text-white ">EventHub</h1>

        {/* Navigation Links and Search Bar */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="text-white hover:text-pink-600">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/venue" legacyBehavior>
                  <a className="text-white hover:text-pink-600">Venue</a>
                </Link>
              </li>
              <li>
                <Link href="/suppliers" legacyBehavior>
                  <a className="text-white hover:text-pink-600">Suppliers</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="text-white hover:text-pink-600">About Media</a>
                </Link>
              </li>
              <li>
                <Link href="/media" legacyBehavior>
                  <a className="text-white hover:text-pink-600">About Media</a>
                </Link>
              </li>
              <li>
                <Link href="/contactus" legacyBehavior>
                  <a className="text-white hover:text-pink-600">Contact Us</a>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update state on input change
              placeholder="Search..."
              className="text-sm bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
              aria-label="Search"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
