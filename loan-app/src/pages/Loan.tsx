import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Home, Briefcase, Check, ArrowRight } from "lucide-react";

const loans = [
  {
    title: "Personal Loan",
    description:
      "Get quick cash for personal needs — education, travel, emergencies, or bills — with flexible repayment options.",
    color: "from-blue-500 to-indigo-600",
    icon: Sparkles,
    features: ["Up to $50,000", "Quick approval", "Flexible terms"],
    rate: "5.99%"
  },
  {
    title: "Auto Loan",
    description:
      "Finance your dream car with affordable monthly payments and low interest rates.",
    color: "from-green-500 to-emerald-600",
    icon: TrendingUp,
    features: ["New & used cars", "Low rates", "Fast processing"],
    rate: "4.99%"
  },
  {
    title: "Home Loan",
    description:
      "Own your home sooner with our low-interest housing loans and extended repayment plans.",
    color: "from-purple-500 to-pink-600",
    icon: Home,
    features: ["Up to 30 years", "Low down payment", "Fixed rates"],
    rate: "3.99%"
  },
  {
    title: "Business Loan",
    description:
      "Empower your business with working capital, equipment funding, or startup support loans.",
    color: "from-orange-500 to-red-600",
    icon: Briefcase,
    features: ["Up to $500K", "Growth capital", "Equipment financing"],
    rate: "6.99%"
  },
];

export default function Loans() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 text-white py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Competitive Rates Starting from 3.99%</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Loan Solutions
            <span className="block bg-gradient-to-r from-blue-200 to-slate-200 bg-clip-text text-transparent">
              Tailored for You
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose from our flexible loan options designed to help you achieve your personal and professional goals
          </p>

          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Loans Grid */}
      <section className="py-20 px-6 -mt-10 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loans.map((loan, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-br ${loan.color} p-6 text-white relative`}>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                    from {loan.rate} APR
                  </div>
                  <loan.icon className="w-12 h-12 mb-4 opacity-90" />
                  <h2 className="text-2xl font-bold mb-2">{loan.title}</h2>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {loan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`bg-gradient-to-br ${loan.color} rounded-full p-1`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/apply"
                    className={`block text-center bg-gradient-to-r ${loan.color} text-white font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Why Choose Our Loans?
            </h2>
            <p className="text-gray-600 text-lg">Experience the Sterling difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Approval</h3>
              <p className="text-gray-600">Get approved in as little as 24 hours with minimal documentation</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-500 to-slate-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Rates</h3>
              <p className="text-gray-600">Enjoy some of the lowest interest rates in the industry</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-slate-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Terms</h3>
              <p className="text-gray-600">Choose repayment plans that fit your budget and lifestyle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who achieved their dreams with Sterling & Co
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              {/* Logo in Footer */}
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/SterlingLogo.png" 
                  alt="Sterling Logo" 
                  className="h-10 w-auto"
                />
                <h3 className="text-white font-bold text-lg">Sterling & Co</h3>
              </div>
              <p className="text-sm">Your trusted partner in financial solutions since 2010.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Personal Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Loans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home Loans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © {new Date().getFullYear()} Sterling & Co Financials. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

