import React from 'react';
import { Calculator, Bot } from 'lucide-react';

interface HeaderProps {
  onToggleAI: () => void;
  isAIOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleAI, isAIOpen }) => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10">
              <Calculator className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-100">OmniCalc</h1>
              <p className="text-xs text-gray-400">All-in-One Calculator Suite</p>
            </div>
          </div>
          
          <button
            onClick={onToggleAI}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isAIOpen 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        </div>
      </div>
    </header>
  );
};