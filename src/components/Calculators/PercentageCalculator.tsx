import React, { useState, useEffect } from 'react';
import { Percent, TrendingUp, Calculator } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [mode, setMode] = useState<'basic' | 'increase' | 'decrease' | 'difference'>('basic');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    calculateResult();
  }, [mode, value1, value2, percentage]);

  const calculateResult = () => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    const percent = parseFloat(percentage);

    try {
      switch (mode) {
        case 'basic': {
          if (val1 && percent) {
            const res = (val1 * percent) / 100;
            setResult(`${percent}% of ${val1} = ${res.toFixed(2)}`);
          } else {
            setResult(null);
          }
          break;
        }
        case 'increase': {
          if (val1 && percent) {
            const increase = (val1 * percent) / 100;
            const total = val1 + increase;
            setResult(`${val1} + ${percent}% = ${total.toFixed(2)} (increase of ${increase.toFixed(2)})`);
          } else {
            setResult(null);
          }
          break;
        }
        case 'decrease': {
          if (val1 && percent) {
            const decrease = (val1 * percent) / 100;
            const total = val1 - decrease;
            setResult(`${val1} - ${percent}% = ${total.toFixed(2)} (decrease of ${decrease.toFixed(2)})`);
          } else {
            setResult(null);
          }
          break;
        }
        case 'difference': {
          if (val1 && val2) {
            const diff = Math.abs(val2 - val1);
            const percentDiff = (diff / val1) * 100;
            const direction = val2 > val1 ? 'increase' : 'decrease';
            setResult(`${direction.charAt(0).toUpperCase() + direction.slice(1)} of ${percentDiff.toFixed(2)}% (difference: ${diff.toFixed(2)})`);
          } else {
            setResult(null);
          }
          break;
        }
      }
    } catch (error) {
      setResult('Invalid calculation');
    }
  };

  const modes = [
    { id: 'basic', label: 'Percentage of Value', icon: Calculator },
    { id: 'increase', label: 'Percentage Increase', icon: TrendingUp },
    { id: 'decrease', label: 'Percentage Decrease', icon: TrendingUp },
    { id: 'difference', label: 'Percentage Difference', icon: Percent }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Dark mode container styling */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Percentage Calculator</h2>
            <p className="text-gray-400">Calculate percentages and changes</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id as any)}
              className={`flex items-center space-x-3 p-4 rounded-lg font-medium transition-all text-left ${
                mode === id
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {mode === 'basic' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Value
                </label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder="Enter the value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder="Enter the percentage"
                />
              </div>
            </>
          )}

          {(mode === 'increase' || mode === 'decrease') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original Value
                </label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder="Enter the original value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Percentage {mode === 'increase' ? 'Increase' : 'Decrease'} (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder={`Enter the percentage to ${mode}`}
                />
              </div>
            </>
          )}

          {mode === 'difference' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original Value
                </label>
                <input
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder="Enter the original value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Value
                </label>
                <input
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg bg-gray-900 text-gray-50"
                  placeholder="Enter the new value"
                />
              </div>
            </>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-xl border border-yellow-800">
            <h3 className="text-lg font-semibold text-gray-100 mb-2">Result:</h3>
            <div className="text-gray-200 font-mono text-lg break-words">
              {result}
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-gray-100 mb-3">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => {
                setMode('basic');
                setValue1('200');
                setPercentage('15');
              }}
              className="text-left p-2 hover:bg-gray-800 rounded transition-colors text-gray-200"
            >
              15% of 200
            </button>
            <button
              onClick={() => {
                setMode('increase');
                setValue1('100');
                setPercentage('25');
              }}
              className="text-left p-2 hover:bg-gray-800 rounded transition-colors text-gray-200"
            >
              25% increase of 100
            </button>
            <button
              onClick={() => {
                setMode('decrease');
                setValue1('150');
                setPercentage('20');
              }}
              className="text-left p-2 hover:bg-gray-800 rounded transition-colors text-gray-200"
            >
              20% decrease of 150
            </button>
            <button
              onClick={() => {
                setMode('difference');
                setValue1('80');
                setValue2('120');
              }}
              className="text-left p-2 hover:bg-gray-800 rounded transition-colors text-gray-200"
            >
              Difference: 80 to 120
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};