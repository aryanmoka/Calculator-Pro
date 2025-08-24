import React, { useState, useEffect } from 'react';
import { DollarSign, Users, Percent } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState('50.00');
  const [tipPercentage, setTipPercentage] = useState('18');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
    tipPerPerson: number;
  } | null>(null);

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople, customTip]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numberOfPeople);
    const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercentage);

    if (!bill || !people || bill <= 0 || people <= 0 || tip < 0) {
      setResult(null);
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount: parseFloat(tipAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      perPerson: parseFloat(perPerson.toFixed(2)),
      tipPerPerson: parseFloat(tipPerPerson.toFixed(2))
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const tipPresets = [10, 15, 18, 20, 25];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Dark mode container styling */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Tip Calculator</h2>
            <p className="text-gray-400">Calculate tips and split bills</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Bill Amount */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
              Bill Amount
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold bg-gray-900 text-gray-50"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          {/* Tip Percentage */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
              <Percent className="w-4 h-4 mr-2 text-emerald-400" />
              Tip Percentage
            </label>
            
            {/* Preset Tips */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setTipPercentage(preset.toString());
                    setCustomTip('');
                  }}
                  className={`p-3 rounded-lg font-medium transition-all ${
                    tipPercentage === preset.toString() && !customTip
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>

            {/* Custom Tip */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 whitespace-nowrap">Custom:</span>
              <input
                type="number"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  if (e.target.value) {
                    setTipPercentage('');
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-900 text-gray-50"
                placeholder="Enter custom %"
                step="0.1"
              />
              <span className="text-sm text-gray-400">%</span>
            </div>

            {/* Tip Slider */}
            <div className="mt-3">
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={customTip || tipPercentage}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  setTipPercentage('');
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>
          </div>

          {/* Number of People */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Users className="w-4 h-4 mr-2 text-emerald-400" />
              Number of People
            </label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold bg-gray-900 text-gray-50"
              min="1"
            />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-gradient-to-br from-emerald-900 to-teal-900 rounded-xl border border-emerald-800">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">
                    {formatCurrency(result.tipAmount)}
                  </div>
                  <div className="text-sm text-gray-300">Total Tip</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">
                    {formatCurrency(result.totalAmount)}
                  </div>
                  <div className="text-sm text-gray-300">Total Amount</div>
                </div>
              </div>

              {parseInt(numberOfPeople) > 1 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-800">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-100">
                      {formatCurrency(result.tipPerPerson)}
                    </div>
                    <div className="text-xs text-gray-400">Tip per person</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-100">
                      {formatCurrency(result.perPerson)}
                    </div>
                    <div className="text-xs text-gray-400">Total per person</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-2">Bill Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-medium text-gray-100">{formatCurrency(parseFloat(billAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tip ({customTip || tipPercentage}%):</span>
                  <span className="font-medium text-gray-100">{formatCurrency(result.tipAmount)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="font-semibold text-gray-100">Total:</span>
                  <span className="font-bold text-emerald-400">{formatCurrency(result.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};