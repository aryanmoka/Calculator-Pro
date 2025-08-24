import React, { useState, useEffect } from 'react';
import { Home, DollarSign, Calendar, Percent } from 'lucide-react';
import { LoanCalculation } from '../../types/calculator';

export const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [result, setResult] = useState<LoanCalculation | null>(null);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const payments = parseFloat(loanTerm) * 12; // Total number of payments

    if (!principal || !rate || !payments || principal <= 0 || rate < 0 || payments <= 0) {
      setResult(null);
      return;
    }

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2))
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Dark mode container styling */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Loan Calculator</h2>
            <p className="text-gray-400">Calculate mortgage and loan payments</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
              Loan Amount
            </label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-2 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>$50K</span>
              <span>$1M</span>
            </div>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold bg-gray-900 text-gray-50"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Percent className="w-4 h-4 mr-2 text-blue-400" />
              Annual Interest Rate (%)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-2 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>1%</span>
              <span>10%</span>
            </div>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold bg-gray-900 text-gray-50"
              step="0.1"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-400" />
              Loan Term (Years)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-2 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>5 years</span>
              <span>40 years</span>
            </div>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold bg-gray-900 text-gray-50"
            />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl border border-blue-800">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {formatCurrency(result.monthlyPayment)}
                </div>
                <div className="text-gray-300">Monthly Payment</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-xl font-semibold text-gray-100">
                    {formatCurrency(result.totalPayment)}
                  </div>
                  <div className="text-sm text-gray-400">Total Payment</div>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-xl font-semibold text-gray-100">
                    {formatCurrency(result.totalInterest)}
                  </div>
                  <div className="text-sm text-gray-400">Total Interest</div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-2">Payment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Principal:</span>
                  <span className="font-medium text-gray-100">{formatCurrency(parseFloat(loanAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interest Rate:</span>
                  <span className="font-medium text-gray-100">{interestRate}% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Loan Term:</span>
                  <span className="font-medium text-gray-100">{loanTerm} years ({parseInt(loanTerm) * 12} payments)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};