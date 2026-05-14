import { PBIcon, PBLogo } from "../brand";
import DateDisplay from "../ui/DateDisplay";
import HamburgerComponent from "./Hamburger";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Open PRs", path: "/open-prs" },
    { name: "Closed PRs", path: "/closed-prs" },
    { name: "Dashboard", path: "/dashboard" },
  ];

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
                      ? "text-hestia-accent bg-hestia-accent/10" 
                      : "text-hestia-muted hover:text-hestia-text hover:bg-white/50"
                    }
                  `}
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info & Profile */}
        <div className="hidden md:flex items-center gap-6">
          <DateDisplay format="MMM Do, YYYY" className="text-[13px] font-medium text-hestia-muted/70 uppercase tracking-wider" />
          
          <Link 
            to="/auth" 
            className="p-1 rounded-full border border-transparent hover:border-hestia-accent/20 hover:bg-white/50 transition-all duration-300"
          >
            <PBIcon width={32} height={32} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
