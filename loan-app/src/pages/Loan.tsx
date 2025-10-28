import React from "react";
import { Link } from "react-router-dom";

const loans = [
  {
    title: "Personal Loan",
    description:
      "Get quick cash for personal needs — education, travel, emergencies, or bills — with flexible repayment options.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Auto Loan",
    description:
      "Finance your dream car with affordable monthly payments and low interest rates.",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Home Loan",
    description:
      "Own your home sooner with our low-interest housing loans and extended repayment plans.",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Business Loan",
    description:
      "Empower your business with working capital, equipment funding, or startup support loans.",
    color: "from-orange-500 to-red-600",
  },
];

export default function Loans() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Our Loan Options
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our range of loan services designed to meet your personal and professional needs.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loans.map((loan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-md bg-gradient-to-br ${loan.color} text-white p-6 flex flex-col justify-between`}
            >
              <div>
                <h2 className="text-2xl font-bold mb-3">{loan.title}</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {loan.description}
                </p>
              </div>
              <Link
                to="/apply"
                className="mt-6 inline-block bg-white text-gray-800 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
