import React from 'react';
import {
  Calculator,
  FlaskConical,
  Heart,
  DollarSign,
  Calendar,
  Home,
  Percent,
  Baby,
  Ruler,
  PieChart,
  Mail // Import the Mail icon
} from 'lucide-react';

export type CalculatorType =
  | 'standard'
  | 'scientific'
  | 'bmi'
  | 'currency'
  | 'date'
  | 'loan'
  | 'tip'
  | 'age'
  | 'unit'
  | 'percentage'
  | 'contact'; // Add the new type

interface NavigationProps {
  activeCalculator: CalculatorType;
  onCalculatorChange: (calculator: CalculatorType) => void;
}

const calculators = [
  { id: 'standard' as CalculatorType, name: 'Standard', icon: Calculator },
  { id: 'scientific' as CalculatorType, name: 'Scientific', icon: FlaskConical },
  { id: 'bmi' as CalculatorType, name: 'BMI', icon: Heart },
  { id: 'currency' as CalculatorType, name: 'Currency', icon: DollarSign },
  { id: 'date' as CalculatorType, name: 'Date', icon: Calendar },
  { id: 'loan' as CalculatorType, name: 'Loan', icon: Home },
  { id: 'tip' as CalculatorType, name: 'Tip', icon: PieChart },
  { id: 'age' as CalculatorType, name: 'Age', icon: Baby },
  { id: 'unit' as CalculatorType, name: 'Unit', icon: Ruler },
  { id: 'percentage' as CalculatorType, name: 'Percentage', icon: Percent },
  { id: 'contact' as CalculatorType, name: 'Contact', icon: Mail }, // Add this new object
];

export const Navigation: React.FC<NavigationProps> = ({ activeCalculator, onCalculatorChange }) => {
  return (
    <nav className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            const isActive = activeCalculator === calc.id;
            
            return (
              <button
                key={calc.id}
                onClick={() => onCalculatorChange(calc.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{calc.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};