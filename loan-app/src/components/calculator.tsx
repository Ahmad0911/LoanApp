import { useState } from "react";

const Calculator = () => {
  const [amount, setAmount] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateLoan = () => {
    if (amount <= 0 || interest <= 0 || duration <= 0) {
      alert("Please enter valid values for all fields.");
      return;
    }

    const monthlyRate = interest / 100 / 12;
    const totalMonths = duration * 12;

    const x = Math.pow(1 + monthlyRate, totalMonths);
    const monthly = (amount * x * monthlyRate) / (x - 1);

    setMonthlyPayment(parseFloat(monthly.toFixed(2)));
    setTotalPayment(parseFloat((monthly * totalMonths).toFixed(2)));
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Loan Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Duration (Years)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 2"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Calculate
        </button>
      </div>

      {monthlyPayment !== null && totalPayment !== null && (
        <div className="mt-6 border-t pt-4">
          <p className="text-gray-700 text-lg">
            Monthly Payment:{" "}
            <span className="font-semibold">${monthlyPayment}</span>
          </p>
          <p className="text-gray-700 text-lg">
            Total Payment:{" "}
            <span className="font-semibold">${totalPayment}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
