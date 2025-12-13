import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Link, useLocation } from "react-router-dom";
import { Compass, FolderKanban, Menu, X, Rocket, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const categories = [
  "Art", "Comics", "Crafts", "Dance", "Design", "Fashion",
  "Film", "Food", "Games", "Journalism", "Music", "Photography",
  "Publishing", "Technology", "Theater", "Other"
];

export function Navbar() {
  const account = useCurrentAccount();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">CrowdFund</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Explore Link */}
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive("/")
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoryDropdownOpen
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/?category=${category.toLowerCase()}`}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* My Projects - Only for connected users (creators) */}
            {account && (
              <Link
                to="/my-projects"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive("/my-projects")
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>My Projects</span>
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Start Campaign Button - Only for connected users */}
            {account && (
              <Link
                to="/my-projects"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
              >
                <Rocket className="w-4 h-4" />
                <span>Start</span>
              </Link>
            )}

            {/* Connect Button */}
            <ConnectButton />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            {/* Explore */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3.5 text-sm font-medium ${
                isActive("/")
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Explore</span>
            </Link>

            {/* Categories in Mobile */}
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/?category=${category.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* My Projects - Only for connected users */}
            {account && (
              <>
                <Link
                  to="/my-projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3.5 text-sm font-medium border-t border-gray-100 ${
                    isActive("/my-projects")
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FolderKanban className="w-5 h-5" />
                  <span>My Projects</span>
                </Link>
                <div className="px-4 py-4 border-t border-gray-100">
                  <Link
                    to="/my-projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    <Rocket className="w-5 h-5" />
                    Start a Campaign
                  </Link>
                </div>
              </>
            )}

            {account && (
              <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
                Connected: {account.address.slice(0, 8)}...{account.address.slice(-6)}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
