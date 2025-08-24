import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { CalculatorType } from './Navigation';

interface FooterProps {
  onNavigateToCalculator: (calculator: CalculatorType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCalculator }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/80 backdrop-blur-md border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <a href="https://github.com/aryanmoka" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/aryanmokashi49" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-500">
              &copy; {currentYear} OmniCalc. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => onNavigateToCalculator('contact')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};