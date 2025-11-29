import React, { useState } from "react";
import {
  Check,
  User,
  DollarSign,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  Award,
  Upload,
  FileText,
} from "lucide-react";

export default function Apply() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    houseAddress: "",
    workAddress: "",
    idFront: null as File | null,
    idBack: null as File | null,
    ssnFront: null as File | null,
    ssnBack: null as File | null,
    loanAmount: "",
    loanType: "",
    loanDuration: "",
  });

  const API_BASE_URL = "https://sterling-financials-backend.onrender.com/api/loans";

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formPayload.append(key, value as string | Blob);
    });

    const response = await fetch(`${API_BASE_URL}/apply`, {
      method: "POST",
      body: formPayload,
    });

    const data = await response.json();
    if (data.success) {
      alert("🚀 Application submitted successfully! Check your email for confirmation.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        houseAddress: "",
        workAddress: "",
        idFront: null,
        idBack: null,
        ssnFront: null,
        ssnBack: null,
        loanAmount: "",
        loanType: "",
        loanDuration: "",
      });
      setStep(1);
    } else {
      alert("❌ Failed: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error submitting application.");
  } finally {
    setIsSubmitting(false);
  }
};

  const steps = [
    { num: 1, title: "Personal Info", icon: User },
    { num: 2, title: "Documents", icon: FileText },
    { num: 3, title: "Loan Details", icon: DollarSign },
    { num: 4, title: "Review", icon: FileCheck },
  ];

  const trustBadges = [
    { icon: Shield, text: "Bank-Level Security" },
    { icon: Clock, text: "Quick Approval" },
    { icon: Award, text: "Trusted by 50K+" },
  ];

  const getProgressColor = () => {
    switch (step) {
      case 1:
        return "from-blue-600 via-blue-700 to-slate-600";
      case 2:
        return "from-purple-600 via-blue-600 to-purple-700";
      case 3:
        return "from-green-500 via-blue-600 to-green-700";
      case 4:
        return "from-green-600 via-emerald-600 to-green-800";
      default:
        return "from-blue-600 via-blue-700 to-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-slate-600 bg-clip-text text-transparent">
          Apply for Your Loan
        </h1>
        <p className="text-gray-600 text-lg">
          Complete your application in just 4 simple steps
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-md border border-blue-100 flex items-center gap-3"
            >
              <div className="bg-gradient-to-br from-blue-500 to-slate-500 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
          <div
            className={`bg-gradient-to-r ${getProgressColor()} p-8 transition-all duration-500`}
          >
            <div className="flex justify-between items-center relative">
              {steps.map((s, idx) => (
                <div key={s.num} className="flex-1 flex items-center relative z-10">
                  <div className="flex flex-col items-center w-full">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        step >= s.num
                          ? "bg-white text-blue-700 shadow-lg scale-110"
                          : "bg-white/20 text-white/60"
                      }`}
                    >
                      {step > s.num ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <s.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-3 text-xs md:text-sm font-semibold ${
                        step >= s.num ? "text-white" : "text-white/60"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-7 w-full h-1 transition-all duration-300 ${
                        step > s.num ? "bg-white" : "bg-white/20"
                      }`}
                      style={{ marginLeft: "28px" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Personal Information
                </h2>
                <p className="text-gray-600 mb-6">
                  Please provide your personal details
                </p>

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
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    House Address *
                  </label>
                  <input
                    type="text"
                    name="houseAddress"
                    value={formData.houseAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Address *
                  </label>
                  <input
                    type="text"
                    name="workAddress"
                    value={formData.workAddress}
                    onChange={handleInputChange}
                    placeholder="Company Name, City"
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 800 000 0000"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                      placeholder="you@example.com"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Upload Required Documents
                </h2>
                <p className="text-gray-600 mb-6">
                  Please upload clear photos of your identification documents
                </p>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    ID Card / Driver's License
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Front Side *
                      </label>
                      <input
                        type="file"
                        name="idFront"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {formData.idFront && (
                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          {formData.idFront.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Back Side *
                      </label>
                      <input
                        type="file"
                        name="idBack"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {formData.idBack && (
                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          {formData.idBack.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Social Security Card
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Front Side *
                      </label>
                      <input
                        type="file"
                        name="ssnFront"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      {formData.ssnFront && (
                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          {formData.ssnFront.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Back Side (Optional)
                      </label>
                      <input
                        type="file"
                        name="ssnBack"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full border-2 border-gray-300 rounded-xl p-4 bg-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      {formData.ssnBack && (
                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          {formData.ssnBack.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800 flex items-start gap-2">
                    <Upload className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Tips:</strong> Ensure images are clear, well-lit, and all text is readable. 
                      Accepted formats: JPG, PNG (max 5MB each)
                    </span>
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loan Details</h2>
                <p className="text-gray-600 mb-6">
                  Provide details about the loan you're applying for
                </p>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Amount (₦) *
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    placeholder="Enter desired loan amount"
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Type *
                  </label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select loan type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="education">Education Loan</option>
                    <option value="mortgage">Mortgage Loan</option>
                    <option value="car">Car Loan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Duration *
                  </label>
                  <select
                    name="loanDuration"
                    value={formData.loanDuration}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select duration</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                    <option value="18">18 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                  </select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
                    🧾 Review & Submit
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Take a moment to review your details before submitting.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-xl rounded-2xl border border-blue-100 p-6">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p><strong>Full Name:</strong> {formData.fullName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Address:</strong> {formData.houseAddress}</p>
                      <p><strong>Date of Birth:</strong> {formData.dob}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 via-white to-green-100 shadow-xl rounded-2xl border border-green-100 p-6">
                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Loan Details
                    </h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p><strong>Loan Type:</strong> {formData.loanType}</p>
                      <p>
                        <strong>Amount:</strong>{" "}
                        <span className="text-green-700 font-bold text-lg bg-green-100 px-2 py-1 rounded-md">
                          ₦{Number(formData.loanAmount).toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <strong>Duration:</strong>{" "}
                        <span className="text-blue-700 font-semibold">
                          {formData.loanDuration} Months
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Uploaded Documents
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <strong>ID Front:</strong> {formData.idFront?.name || "Not uploaded"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <strong>ID Back:</strong> {formData.idBack?.name || "Not uploaded"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <strong>SSN Front:</strong> {formData.ssnFront?.name || "Not uploaded"}
                    </p>
                    <p className="flex items-center gap-2 text-gray-500">
                      {formData.ssnBack ? <Check className="w-4 h-4 text-green-600" /> : "○"}
                      <strong>SSN Back:</strong> {formData.ssnBack?.name || "Optional"}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                  <Shield className="mx-auto w-10 h-10 text-blue-500 mb-3" />
                  <p className="text-gray-700">
                    By clicking <span className="font-semibold text-blue-700">Submit</span>, you confirm
                    that all details are correct and consent to loan verification.
                  </p>
                </div>

                <div className="flex justify-center">
                 <button
  onClick={handleSubmit}
  disabled={isSubmitting}
  className="bg-gradient-to-r from-blue-700 to-green-600 text-white px-12 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
>
  {isSubmitting ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Processing...
    </>
  ) : (
    <>
      <FileCheck className="w-5 h-5" />
      Submit Application
    </>
  )}
</button>
                </div>
              </div>
            )}
          </div>

          {step !== 4 && (
            <div className="px-8 md:px-12 pb-8 flex justify-between gap-4">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                  step === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-slate-100 text-gray-700 hover:bg-slate-200 hover:shadow-lg"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-slate-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help?{" "}
            <a href="/contact" className="text-blue-600 font-semibold hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}