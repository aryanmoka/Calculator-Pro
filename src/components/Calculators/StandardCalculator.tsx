import React, { useState } from 'react';
import { Delete } from 'lucide-react';

export const StandardCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operator: string) => {
    switch (operator) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  const handleEquals = () => {
    if (operator && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operator);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];
  
  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="bg-gray-900 text-white p-6">
        <div className="text-right">
          <div className="text-4xl font-light mb-2 min-h-[48px] flex items-end justify-end break-all">
            {display}
          </div>
          {operator && previousValue && (
            <div className="text-gray-400 text-sm">
              {previousValue} {operator}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => {
            const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
            const isSpecial = ['C', '%', '⌫'].includes(btn);
            const isEquals = btn === '=';
            
            let buttonClass = `
              h-16 rounded-xl font-medium text-lg transition-all duration-150 active:scale-95
              ${isEquals ? 'col-span-2' : ''}
              ${isOperator ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              ${isSpecial ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : ''}
              ${!isOperator && !isSpecial ? 'bg-gray-700 hover:bg-gray-600 text-gray-50' : ''}
            `;

            return (
              <button
                key={btn}
                onClick={() => {
                  if (btn === 'C') clear();
                  else if (btn === '⌫') handleBackspace();
                  else if (btn === '=') handleEquals();
                  else if (isOperator) inputOperator(btn);
                  else if (btn === '.') {
                    if (!display.includes('.')) {
                      inputNumber('.');
                    }
                  }
                  else if (btn === '%') {
                    // Placeholder for percentage logic
                    const percentageValue = parseFloat(display) / 100;
                    setDisplay(String(percentageValue));
                  }
                  else {
                    inputNumber(btn);
                  }
                }}
                className={buttonClass}
              >
                {btn === '⌫' ? <Delete className="mx-auto" /> : btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};