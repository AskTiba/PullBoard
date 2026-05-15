import { useEffect, useState } from "react";
import { PBLogo } from "../brand";
import DateDisplay from "../ui/DateDisplay";
import HamburgerComponent from "./Hamburger";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("auth_token"));
    
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const navLinks = isAuthenticated 
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "PR Board", path: "/board" },
        { name: "Analytics", path: "/analytics" },
        { name: "Team", path: "/team" },
      ]
    : [];

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-500 border-b
        ${scrolled 
          ? "bg-white/90 backdrop-blur-xl border-slate-200 py-3 shadow-sm" 
          : "bg-transparent border-transparent py-5"}
      `}
    >
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        {/* Left: Branding */}
        <div className="flex items-center gap-12">
          <Link to="/" className="transition-transform active:scale-95 cursor-pointer">
            <PBLogo width={130} />
          </Link>

          {/* Center-Left: Navigation (Hidden on mobile) */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-900/5 p-1 rounded-2xl border border-slate-900/5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} className="relative px-5 py-2 cursor-pointer group">
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill-final"
                        className="absolute inset-0 bg-white rounded-xl shadow-premium border border-slate-100"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span 
                      className={`
                        relative z-10 text-[14px] font-bold tracking-tight transition-colors duration-200
                        ${isActive ? "text-blue-700" : "text-slate-500 group-hover:text-gray-950"}
                      `}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Identity & Mission */}
        <div className="flex items-center gap-8">
          <DateDisplay format="TECH" className="hidden xl:flex" />
          
          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer text-slate-500 hover:text-blue-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-gray-950 text-white rounded-xl text-[13px] font-bold shadow-lg hover:bg-red-600 transition-all active:scale-95 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="group flex items-center gap-3 px-8 py-2.5 bg-blue-600 text-white rounded-xl text-[13px] font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:rotate-12 transition-transform">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Connect</span>
              </Link>
            )}
          </AnimatePresence>

          <div className="md:hidden">
            <HamburgerComponent />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
