import React, { useState, useEffect } from 'react';
import { Calendar, Cake } from 'lucide-react'; // Note: Removed 'Baby' icon

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: string;
    daysToNextBirthday: number;
  } | null>(null);

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      setResult(null);
      return;
    }

    // Calculate age in years, months, and days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const daysInPreviousMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += daysInPreviousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Calculate next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: nextBirthday.toDateString(),
      daysToNextBirthday
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* The div with the icon has been removed */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Age Calculator</h2>
            <p className="text-gray-400">Calculate exact age and time periods</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Birth Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-900 text-gray-50"
            />
          </div>

          {/* Target Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Calculate Age On (Target Date)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-900 text-gray-50"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setTargetDate(new Date().toISOString().split('T')[0])}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition-colors text-gray-200"
              >
                Today
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            {/* Main Age Display */}
            <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {result.years} Years
                </div>
                <div className="text-lg text-gray-300">
                  {result.months} months and {result.days} days old
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-teal-400">{result.totalDays.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Days</div>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-400">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Weeks</div>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-violet-400">{result.totalMonths}</div>
                <div className="text-sm text-gray-400">Total Months</div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="p-4 bg-gray-900 border border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Cake className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-500">Next Birthday</h3>
              </div>
              <div className="text-gray-300">
                <p><strong>{result.nextBirthday}</strong></p>
                <p className="text-sm">
                  {result.daysToNextBirthday === 0 
                    ? "🎉 Happy Birthday! 🎉" 
                    : `${result.daysToNextBirthday} days to go`
                  }
                </p>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-2">Fun Facts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                <div>• Hours lived: ~{(result.totalDays * 24).toLocaleString()}</div>
                <div>• Minutes lived: ~{(result.totalDays * 24 * 60).toLocaleString()}</div>
                <div>• Seconds lived: ~{(result.totalDays * 24 * 60 * 60).toLocaleString()}</div>
                <div>• Age in dog years: ~{Math.round(result.years * 7)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};