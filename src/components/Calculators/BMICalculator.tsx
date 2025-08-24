import React, { useState, useEffect } from 'react';
import { Scale, Activity } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [isMetric, setIsMetric] = useState(true);
  const [bmi, setBMI] = useState<number | null>(null);

  useEffect(() => {
    calculateBMI();
  }, [weight, height, isMetric]);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setBMI(null);
      return;
    }

    let bmiValue: number;
    
    if (isMetric) {
      // kg and cm
      const heightInMeters = heightNum / 100;
      bmiValue = weightNum / (heightInMeters * heightInMeters);
    } else {
      // lbs and inches
      bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    }

    setBMI(parseFloat(bmiValue.toFixed(1)));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400', bg: 'bg-blue-900 border-blue-800' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-400', bg: 'bg-green-900 border-green-800' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-900 border-yellow-800' };
    return { category: 'Obese', color: 'text-red-400', bg: 'bg-red-900 border-red-800' };
  };

  const getBMIProgress = (bmi: number) => {
    return Math.min((bmi / 40) * 100, 100);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Container with dark background, shadow, and border */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">BMI Calculator</h2>
            <p className="text-gray-400">Calculate your Body Mass Index</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 rounded-lg p-1 flex">
            <button
              onClick={() => setIsMetric(true)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                isMetric 
                  ? 'bg-gray-700 shadow-sm text-gray-50' 
                  : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setIsMetric(false)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                !isMetric 
                  ? 'bg-gray-700 shadow-sm text-gray-50' 
                  : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Scale className="w-4 h-4 inline mr-2" />
              Weight ({isMetric ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-900 text-gray-50"
              placeholder={`Enter weight in ${isMetric ? 'kg' : 'lbs'}`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Activity className="w-4 h-4 inline mr-2" />
              Height ({isMetric ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-900 text-gray-50"
              placeholder={`Enter height in ${isMetric ? 'cm' : 'inches'}`}
            />
          </div>
        </div>

        {/* BMI Result */}
        {bmi && (
          <div className="space-y-4">
            <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="text-5xl font-bold text-blue-400 mb-2">{bmi}</div>
              <div className="text-gray-400">Your BMI</div>
            </div>

            <div className={`p-4 rounded-xl border ${getBMICategory(bmi).bg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-100">Category:</span>
                <span className={`font-bold ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).category}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getBMIProgress(bmi)}%` }}
                ></div>
              </div>
            </div>

            {/* BMI Scale Reference */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded-lg text-center bg-blue-900 border-blue-800 text-blue-400">
                <div className="font-semibold">Underweight</div>
                <div className="text-gray-400">&lt; 18.5</div>
              </div>
              <div className="p-2 rounded-lg text-center bg-green-900 border-green-800 text-green-400">
                <div className="font-semibold">Normal</div>
                <div className="text-gray-400">18.5 - 24.9</div>
              </div>
              <div className="p-2 rounded-lg text-center bg-yellow-900 border-yellow-800 text-yellow-400">
                <div className="font-semibold">Overweight</div>
                <div className="text-gray-400">25.0 - 29.9</div>
              </div>
              <div className="p-2 rounded-lg text-center bg-red-900 border-red-800 text-red-400">
                <div className="font-semibold">Obese</div>
                <div className="text-gray-400">≥ 30.0</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};