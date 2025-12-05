import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Loan from "./pages/Loan";
import Apply from "./pages/Apply";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashbord"; // route still accessible via URL

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/loans", name: "Loans" },
    { path: "/apply", name: "Apply" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <>
      {/* Fixed Glass Navbar with Dark Blue-Silver Gradient */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-slate-600/90 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo with Image */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-bold text-white tracking-wide hover:opacity-90 transition-opacity"
          >
            <img 
              src="/SterlingLogo.png" 
              alt="Sterling Logo" 
              className="h-10 w-auto"
            />
            Sterling<span className="text-blue-200"> & Co Financials</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.path}
                className={({ isActive }) =>
                  `text-white hover:text-blue-200 transition-all font-medium ${
                    isActive ? "font-semibold border-b-2 border-blue-200 pb-1" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-600/90 via-blue-700/90 to-slate-600/90 backdrop-blur-xl border-t border-white/20 px-6 py-4 rounded-b-xl">
            {navLinks.map((link, i) => (
              <NavLink
                key={i}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-white text-lg hover:text-blue-200 transition-all"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<Loan />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Admin route still accessible via URL */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>


    </>
  );
}