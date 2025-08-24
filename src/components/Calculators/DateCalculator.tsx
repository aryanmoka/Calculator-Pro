import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Minus } from 'lucide-react';

export const DateCalculator: React.FC = () => {
  const [mode, setMode] = useState<'difference' | 'add' | 'subtract'>('difference');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [days, setDays] = useState('0');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    calculateResult();
  }, [mode, startDate, endDate, baseDate, years, months, days]);

  const calculateResult = () => {
    try {
      if (mode === 'difference') {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = Math.floor(diffDays / 365.25);

        setResult(`
          ${diffDays} days
          ${diffWeeks} weeks
          ${diffMonths} months
          ${diffYears} years
        `);
      } else {
        const base = new Date(baseDate);
        const yearsToAdd = parseInt(years) || 0;
        const monthsToAdd = parseInt(months) || 0;
        const daysToAdd = parseInt(days) || 0;

        const resultDate = new Date(base);

        if (mode === 'add') {
          resultDate.setFullYear(resultDate.getFullYear() + yearsToAdd);
          resultDate.setMonth(resultDate.getMonth() + monthsToAdd);
          resultDate.setDate(resultDate.getDate() + daysToAdd);
        } else {
          resultDate.setFullYear(resultDate.getFullYear() - yearsToAdd);
          resultDate.setMonth(resultDate.getMonth() - monthsToAdd);
          resultDate.setDate(resultDate.getDate() - daysToAdd);
        }

        setResult(resultDate.toDateString());
      }
    } catch (error) {
      setResult('Invalid date calculation');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Container with dark background, shadow, and border */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Date Calculator</h2>
            <p className="text-gray-400">Calculate differences and add/subtract dates</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'difference', label: 'Date Difference', icon: Clock },
            { id: 'add', label: 'Add Time', icon: Plus },
            { id: 'subtract', label: 'Subtract Time', icon: Minus }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                mode === id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Date Difference Mode */}
        {mode === 'difference' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Add/Subtract Mode */}
        {(mode === 'add' || mode === 'subtract') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Base Date
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Years
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Months
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Days
                </label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl border border-blue-800">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Result:</h3>
            <div className="text-gray-200 whitespace-pre-line font-mono text-lg">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};