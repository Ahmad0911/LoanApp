import { Target, Eye, Heart, Shield, Lightbulb, Users, TrendingUp, Award, Globe, Zap, Clock } from "lucide-react";

export default function About() {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold honesty, transparency, and fairness in all our operations and client relationships.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously adapt and innovate to deliver modern financial solutions that meet today's challenges.",
      color: "from-slate-500 to-slate-600"
    },
    {
      icon: Heart,
      title: "Trust",
      description: "Our clients trust us because we deliver on our promises and prioritize their long-term success.",
      color: "from-blue-600 to-slate-500"
    }
  ];

  const achievements = [
    { icon: Users, value: "50,000+", label: "Happy Clients" },
    { icon: TrendingUp, value: "$2B+", label: "Loans Disbursed" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Globe, value: "25+", label: "Cities Served" }
  ];

  const features = [
    { icon: Zap, text: "Fast approval process" },
    { icon: Shield, text: "Bank-level security" },
    { icon: Users, text: "Dedicated support team" },
    { icon: Clock, text: "24/7 customer service" }
  ];

  const timeline = [
    { year: "2010", title: "Founded", desc: "Sterling & Co was established with a vision to revolutionize lending" },
    { year: "2015", title: "Expansion", desc: "Reached 10,000 satisfied customers across 10 cities" },
    { year: "2020", title: "Digital Transformation", desc: "Launched our online platform for seamless loan applications" },
    { year: "2025", title: "Industry Leader", desc: "Recognized as one of the top financial institutions in the region" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6 border border-white/20">
              <Award className="w-4 h-4" />
              <span>Trusted Financial Partner Since 2010</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              About Sterling & Co
              <span className="block bg-gradient-to-r from-blue-200 to-slate-200 bg-clip-text text-transparent">
                Financials
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in achieving financial growth, stability, and freedom. 
              We provide reliable, transparent, and innovative loan solutions tailored to your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 -mt-10 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-slate-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To empower individuals, families, and businesses by providing accessible, secure, and affordable financial solutions. We aim to simplify borrowing and build lasting relationships through trust, innovation, and transparency.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-slate-500 to-slate-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the leading financial institution that bridges the gap between ambition and opportunity, enabling every client to achieve sustainable financial success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:-translate-y-3"
              >
                <div className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg">Growing together, year after year</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-slate-500 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                      <div className={`inline-block bg-gradient-to-r from-blue-600 to-slate-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-3`}>
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-slate-500 rounded-full border-4 border-white shadow-lg -translate-x-1/2 hidden md:block" />
                  
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Sterling & Co?
            </h2>
            <p className="text-blue-100 text-lg">Experience the difference with our exceptional service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-white mb-4" />
                <p className="text-white font-semibold">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-blue-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Sterling & Co for their financial needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply"
                className="bg-gradient-to-r from-blue-600 to-slate-600 text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Apply for a Loan
              </a>
              <a
                href="/"
                className="bg-slate-100 text-gray-700 font-semibold px-8 py-4 rounded-full hover:bg-slate-200 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
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
  );
}