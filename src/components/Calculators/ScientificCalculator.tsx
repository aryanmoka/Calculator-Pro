import React, { useState } from 'react';

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [isRadians, setIsRadians] = useState(true);

  const calculate = (expression: string) => {
    try {
      // Replace mathematical functions with JavaScript equivalents
      let processedExpression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**')
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      const result = Function('"use strict"; return (' + processedExpression + ')')();
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  };

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      const result = calculate(display);
      setDisplay(result);
    } else if (value === '⌫') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else {
      if (display === '0' && !['sin', 'cos', 'tan', 'log', 'ln', '√', 'π', 'e', '(', '-'].includes(value)) {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
    }
  };

  const scientificButtons = [
    ['C', '⌫', 'sin', 'cos', 'tan'],
    ['(', ')', 'log', 'ln', '^'],
    ['7', '8', '9', '÷', '√'],
    ['4', '5', '6', '×', 'π'],
    ['1', '2', '3', '-', 'e'],
    ['0', '.', '=', '+']
  ];

  return (
    <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="bg-gray-900 text-white p-6">
        <div className="text-right">
          <div className="text-4xl font-mono mb-2 min-h-[40px] flex items-end justify-end break-all">
            {display}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsRadians(!isRadians)}
              className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition-colors"
            >
              {isRadians ? 'RAD' : 'DEG'}
            </button>
            <span className="text-gray-400 text-sm">Scientific Calculator</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {scientificButtons.flat().map((btn, index) => {
            const isOperator = ['÷', '×', '-', '+', '^'].includes(btn);
            const isEquals = btn === '=';
            
            return (
              <button
                key={index}
                onClick={() => handleButtonClick(btn)}
                className={`
                  h-12 rounded-lg font-medium text-lg transition-all duration-150 active:scale-95
                  ${isEquals 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white col-span-2' 
                    : isOperator 
                      ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-50'
                  }
                  ${btn === 'C' && 'bg-red-600 hover:bg-red-700 text-white'}
                  ${btn === '⌫' && 'bg-gray-600 hover:bg-gray-500 text-white'}
                `}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};