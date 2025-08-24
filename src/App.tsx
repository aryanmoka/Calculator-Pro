import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation, CalculatorType } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer'; // Import the new Footer
import { AIAssistant } from './components/AI/AIAssistant';
import { StandardCalculator } from './components/Calculators/StandardCalculator';
import { ScientificCalculator } from './components/Calculators/ScientificCalculator';
import { BMICalculator } from './components/Calculators/BMICalculator';
import { CurrencyConverter } from './components/Calculators/CurrencyConverter';
import { DateCalculator } from './components/Calculators/DateCalculator';
import { LoanCalculator } from './components/Calculators/LoanCalculator';
import { TipCalculator } from './components/Calculators/TipCalculator';
import { AgeCalculator } from './components/Calculators/AgeCalculator';
import { UnitConverter } from './components/Calculators/UnitConverter';
import { PercentageCalculator } from './components/Calculators/PercentageCalculator';
import { ContactForm } from './components/Contact/ContactForm';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('standard');
  const [isAIOpen, setIsAIOpen] = useState(false);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'standard':
        return <StandardCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'currency':
        return <CurrencyConverter />;
      case 'date':
        return <DateCalculator />;
      case 'loan':
        return <LoanCalculator />;
      case 'tip':
        return <TipCalculator />;
      case 'age':
        return <AgeCalculator />;
      case 'unit':
        return <UnitConverter />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'contact':
        return <ContactForm />;
      default:
        return <StandardCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased flex flex-col">
      <Header
        onToggleAI={() => setIsAIOpen(!isAIOpen)}
        isAIOpen={isAIOpen}
      />

      <Navigation
        activeCalculator={activeCalculator}
        onCalculatorChange={setActiveCalculator}
      />

      <main className="container mx-auto px-4 py-12 md:py-16 flex-1">
        {activeCalculator === 'standard' && (
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-400 mb-4 tracking-tight">
              OmniCalc
            </h1>
          </div>
        )}
        {renderCalculator()}
      </main>

      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onNavigateToCalculator={(calculator) => {
          setActiveCalculator(calculator);
        }}
      />

      {/* Add the Footer component here */}
      <Footer onNavigateToCalculator={setActiveCalculator} />
    </div>
  );
}

export default App;