import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Loan from "./pages/Loan"; 
import Apply from "./pages/Apply"; 
import About from "./pages/About"; 
import Contact from "./pages/Contact"; 
import AdminDashboard from "./pages/AdminDashbord";

export default function App() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container flex justify-between items-center px-6">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            Sterling & Co Financials
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/loans" className="text-gray-700 hover:text-blue-600">
              Loans
            </Link>
            <Link to="/apply" className="text-gray-700 hover:text-blue-600">
              Apply
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            
            {/* 🔐 Admin Button - Hidden in plain sight */}
            <Link 
              to="/admin" 
              className="ml-4 px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
            >
              🔐 Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<Loan />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}