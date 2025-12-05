import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, Facebook, Instagram } from "lucide-react";
import { Send as Telegram } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showTelegramMessage, setShowTelegramMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCardClick = (url: string | null, title: string) => {
    if (url === null && title === "Telegram") {
      setShowTelegramMessage(true);
      setTimeout(() => setShowTelegramMessage(false), 3000);
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Facebook,
      title: "Facebook",
      detail: "Sterling & Co Financials",
      subdtail: "Follow us for updates",
      color: "from-blue-500 to-blue-600",
      url: "https://www.facebook.com/share/1ACNyZDj8Y/?mibextid=wwXIfr"
    },
    {
      icon: Instagram,
      title: "Instagram",
      detail: "@sterlingandcofinancials",
      subdtail: "See our latest posts",
      color: "from-pink-500 to-purple-600",
      url: "https://www.instagram.com/sterlingandcofinancials?igsh=MTM5YjVoZ25wNG13Ng%3D%3D&utm_source=qr"
    },
    {
      icon: Telegram,
      title: "Telegram",
      detail: "Sterling & Co Chat",
      subdtail: "Coming soon",
      color: "from-blue-400 to-blue-500",
      url: null
    },
    {
      icon: Mail,
      title: "Email",
      detail: "Sterlingandcofinancials@gmail.com",
      subdtail: "We reply within 24 hours",
      color: "from-red-500 to-red-600",
      url: "mailto:Sterlingandcofinancials@gmail.com"
    }
  ];

  const faqs = [
    { q: "How long does approval take?", a: "Most applications are approved within 24-48 hours." },
    { q: "What documents do I need?", a: "Valid ID, proof of income, and bank statements." },
    { q: "Can I pay off my loan early?", a: "Yes, with no prepayment penalties." }
  ];

  const socialLinks = [
    {
      icon: Phone,
      name: "Phone",
      url: "tel:+18652499849",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50"
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      url: "https://wa.me/18652499849",
      color: "hover:text-green-600",
      bgColor: "hover:bg-green-50"
    },
    {
      icon: MapPin,
      name: "Location",
      url: "https://maps.google.com/?q=Los+Angeles+USA",
      color: "hover:text-slate-600",
      bgColor: "hover:bg-slate-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 text-white py-20">
        <div className="absolute inset-0 opacity-30 bg-grid-pattern" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6 border border-white/20">
              <Clock className="w-4 h-4" />
              <span>We typically respond within 2 hours</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Get In Touch
              <span className="block bg-gradient-to-r from-blue-200 to-slate-200 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Have questions or need assistance? Our team at Sterling & Co Financials 
              is always ready to help you achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 -mt-10 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCardClick(info.url, info.title)}
                className={`bg-white rounded-2xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${info.url || info.title === "Telegram" ? "cursor-pointer" : ""}`}
              >
                <div className={`bg-gradient-to-br ${info.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-700 font-semibold text-sm mb-1">{info.detail}</p>
                <p className="text-gray-500 text-xs">{info.subdtail}</p>
                {showTelegramMessage && info.title === "Telegram" && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                    <p className="text-blue-700 text-xs font-semibold">Coming Soon!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-blue-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
                </div>

                {submitted && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <p className="text-green-700 font-semibold">Message sent successfully! We'll respond soon.</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-slate-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-600 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Need Quick Help?</h3>
                <p className="text-blue-100 mb-6">
                  Contact us directly via WhatsApp for instant responses to your questions.
                </p>
                <a
                  href="https://wa.me/18652499849"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Connect With Us</h3>
                <div className="flex gap-4 justify-center">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`p-4 rounded-xl transition-all duration-300 ${social.bgColor} text-gray-600 ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">{faq.q}</h4>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <a href="/about" className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm mt-4 hover:underline">
                  View all FAQs
                  <span>→</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-slate-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-800">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-blue-100">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Visit Our Office</h3>
                <p className="text-gray-600">Los Angeles, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
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