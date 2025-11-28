import React, { useState, useEffect } from "react";
import { ArrowRight, Shield, Zap, TrendingUp, CheckCircle, Star, Clock, Award, ChevronRight } from "lucide-react";

// Calculator Component (embedded)
function Calculator() {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(5.5);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const r = rate / 100 / 12;
    const n = term;
    const calculatedPayment = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthly(calculatedPayment.toFixed(2));
  }, [amount, term, rate]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-blue-100">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Loan Amount: ${amount.toLocaleString()}
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={amount}
            onChange={(evt) => setAmount(Number(evt.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-400 to-slate-400 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Term: {term} months
          </label>
          <input
            type="range"
            min="6"
            max="60"
            step="6"
            value={term}
            onChange={(evt) => setTerm(Number(evt.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-400 to-slate-400 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Interest Rate: {rate}%
          </label>
          <input
            type="range"
            min="3"
            max="15"
            step="0.5"
            value={rate}
            onChange={(evt) => setRate(Number(evt.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-400 to-slate-400 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Monthly Payment:</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-slate-500 bg-clip-text text-transparent">
              ${monthly}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (evt) => {
      setMousePosition({ x: evt.clientX, y: evt.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    { icon: Zap, title: "Fast Approval", desc: "Get approved in minutes, not days" },
    { icon: Shield, title: "Secure & Safe", desc: "Bank-level encryption protects your data" },
    { icon: TrendingUp, title: "Flexible Terms", desc: "Choose terms that fit your budget" },
    { icon: Award, title: "Best Rates", desc: "Competitive rates starting at 3.5%" }
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "$2B+", label: "Loans Approved" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Small Business Owner", text: "Sterling helped me expand my business with a loan that fit my budget perfectly. The process was seamless!", rating: 5 },
    { name: "Michael Chen", role: "Homeowner", text: "Best loan experience I've ever had. Transparent, fast, and the team was incredibly supportive.", rating: 5 },
    { name: "Emily Rodriguez", role: "Entrepreneur", text: "I got approved in under 30 minutes! The calculator helped me plan my finances before applying.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated Floating Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large floating orbs - Intermixed blue and silver */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400/25 via-gray-400/30 to-slate-400/25 rounded-full blur-3xl animate-float"
          style={{
            top: '10%',
            left: '5%',
            animation: 'float 20s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-slate-500/30 via-blue-300/25 to-gray-500/25 rounded-full blur-3xl animate-float-delay"
          style={{
            top: '60%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite 5s',
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-br from-gray-400/30 via-blue-400/25 to-slate-500/25 rounded-full blur-3xl animate-float"
          style={{
            bottom: '15%',
            left: '15%',
            animation: 'float 30s ease-in-out infinite 10s',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Medium floating elements - Silver-blue blend */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/30 via-slate-400/35 to-gray-400/30 rounded-full blur-2xl animate-float-slow"
          style={{
            top: '40%',
            left: '40%',
            animation: 'float 18s ease-in-out infinite 3s'
          }}
        />
        <div 
          className="absolute w-56 h-56 bg-gradient-to-br from-gray-500/30 via-blue-400/30 to-slate-500/30 rounded-full blur-2xl animate-float-slow"
          style={{
            top: '20%',
            right: '25%',
            animation: 'float 22s ease-in-out infinite 7s'
          }}
        />
        
        {/* Accent orbs - Blue-silver transitions */}
        <div 
          className="absolute w-48 h-48 bg-gradient-to-br from-blue-300/25 via-gray-400/30 to-slate-400/25 rounded-full blur-2xl animate-pulse"
          style={{
            top: '70%',
            left: '60%',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute w-40 h-40 bg-gradient-to-br from-slate-500/25 via-blue-300/20 to-gray-400/25 rounded-full blur-xl animate-pulse"
          style={{
            top: '30%',
            left: '70%',
            animationDuration: '5s',
            animationDelay: '2s'
          }}
        />
        
        {/* Small shimmer particles */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-br from-gray-300/35 via-blue-200/30 to-slate-300/35 rounded-full blur-xl animate-pulse"
          style={{
            top: '50%',
            right: '40%',
            animationDuration: '3s',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-36 h-36 bg-gradient-to-br from-blue-400/20 via-slate-400/30 to-gray-300/25 rounded-full blur-xl animate-pulse"
          style={{
            bottom: '40%',
            right: '15%',
            animationDuration: '6s'
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(20px, 30px) scale(1.02); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25px, 25px) scale(1.03); }
          50% { transform: translate(25px, -20px) scale(0.97); }
          75% { transform: translate(-30px, -25px) scale(1.01); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -25px) rotate(3deg); }
          66% { transform: translate(-25px, 20px) rotate(-3deg); }
        }
      `}} />

      {/* Content - add relative z-10 to stay above background */}
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        {/* Silver/White patches scattered throughout the blue background */}
        <div className="absolute top-10 left-20 w-40 h-40 bg-white/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-32 right-32 w-32 h-32 bg-gray-100/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-white/12 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-slate-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-44 h-44 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gray-200/18 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-38 h-38 bg-white/14 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 right-1/2 w-50 h-50 bg-slate-100/16 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.2s' }} />
        <div className="absolute bottom-20 left-40 w-42 h-42 bg-white/11 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '3s' }} />
        <div className="absolute top-20 left-1/2 w-34 h-34 bg-gray-100/17 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3.8s', animationDelay: '0.3s' }} />
        <div className="absolute bottom-32 right-1/4 w-46 h-46 bg-white/13 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4.8s', animationDelay: '1.8s' }} />
        <div className="absolute top-2/3 left-1/3 w-35 h-35 bg-slate-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '2.2s' }} />
        
        {/* Additional floating elements for hero */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/25 via-gray-400/25 to-slate-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-slate-400/25 via-blue-300/20 to-gray-400/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-10 w-28 h-28 bg-gradient-to-br from-gray-300/30 via-blue-200/25 to-slate-300/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6 border border-white/20">
              <Award className="w-4 h-4" />
              <span>Trusted by 50,000+ customers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
              Your Financial Future
              <span className="block bg-gradient-to-r from-blue-200 via-slate-200 to-blue-300 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience transparent, fast, and flexible loan solutions designed around your needs. 
              Calculate, apply, and get approved in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/apply"
                className="group bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Why Choose Sterling & Co?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver the best loan experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-blue-500 to-slate-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Calculate Your Loan
            </h2>
            <p className="text-gray-600 text-lg">
              See your monthly payments instantly with our smart calculator
            </p>
          </div>
          <Calculator />
          
          <div className="mt-12 text-center">
            <a href="/apply" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Ready to apply? Get started now
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Clock className="w-16 h-16 text-blue-200 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your Loan in Minutes
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Sterling & Co for their financial needs
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Sterling & Co</h3>
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
    </div>
  );
}