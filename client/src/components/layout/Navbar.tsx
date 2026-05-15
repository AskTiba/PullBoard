import { useEffect, useState } from "react";
import { PBIcon, PBLogo } from "../brand";
import DateDisplay from "../ui/DateDisplay";
import HamburgerComponent from "./Hamburger";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token on initial mount and route change
    setIsAuthenticated(!!localStorage.getItem("auth_token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Open PRs", path: "/open-prs" },
    { name: "Closed PRs", path: "/closed-prs" },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: "Dashboard", path: "/dashboard" });
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect px-6 py-2">
      <div className="flex justify-between max-w-7xl mx-auto items-center">
        {/* Logo */}
        <Link to="/" className="transition-opacity hover:opacity-80">
          <div className="flex items-center gap-2">
            <PBLogo width={140} />
          </div>
        </Link>

        {/* Mobile Navigation */}
        <div className="block md:hidden">
          <HamburgerComponent />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <div 
                  className={`
                    px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-200
                    ${isActive 
                      ? "text-blue-700 bg-blue-50" 
                      : "text-slate-600 hover:text-gray-950 hover:bg-gray-100"
                    }
                  `}
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-6">
          <DateDisplay format="MMM Do, YYYY" className="text-[13px] font-bold text-slate-500 uppercase tracking-wider" />
          
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="px-6 py-2.5 bg-gray-950 text-white rounded-full text-sm font-bold shadow-sm hover:bg-gray-800 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              to="/auth" 
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-all"
            >
              <PBIcon width={20} height={20} />
              <span>Connect</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
