import { AIResponse } from '../types/calculator';

export class AIService {
  private mathOperations = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    'x': (a: number, b: number) => a * b,
    '×': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
    '÷': (a: number, b: number) => a / b,
    '%': (a: number, b: number) => (a * b) / 100,
    '^': (a: number, b: number) => Math.pow(a, b),
    '**': (a: number, b: number) => Math.pow(a, b),
  };

  async processQuery(query: string): Promise<AIResponse> {
    const normalizedQuery = query.toLowerCase().trim();

    try {
      // Handle percentage calculations
      if (this.isPercentageQuery(normalizedQuery)) {
        return this.handlePercentageCalculation(normalizedQuery);
      }

      // Handle basic math expressions
      if (this.isMathExpression(normalizedQuery)) {
        return this.handleMathCalculation(normalizedQuery);
      }

      // Handle calculator navigation
      const calculatorMatch = this.matchCalculator(normalizedQuery);
      if (calculatorMatch) {
        return {
          type: 'navigation',
          calculator: calculatorMatch,
          message: `I'll help you with ${calculatorMatch} calculations. Navigating to the ${calculatorMatch} calculator.`
        };
      }

      // Handle unit conversion queries
      if (this.isUnitConversionQuery(normalizedQuery)) {
        return this.handleUnitConversion(normalizedQuery);
      }

      return {
        type: 'error',
        message: "I can help you with calculations and navigate between calculators. Try asking me to 'calculate 15% of 200' or 'open the BMI calculator'."
      };
    } catch (error) {
      return {
        type: 'error',
        message: 'Sorry, I encountered an error processing your request. Please try again.'
      };
    }
  }

  private isPercentageQuery(query: string): boolean {
    return /(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/.test(query) ||
           /what\s+is\s+(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/.test(query);
  }

  private handlePercentageCalculation(query: string): AIResponse {
    const match = query.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/);
    if (match) {
      const percentage = parseFloat(match[1]);
      const value = parseFloat(match[2]);
      const result = (percentage * value) / 100;
      
      return {
        type: 'calculation',
        result: { 
          value: result,
          formatted: `${percentage}% of ${value} = ${result}`
        },
        message: `${percentage}% of ${value} equals ${result}`
      };
    }
    
    throw new Error('Invalid percentage query');
  }

  private isMathExpression(query: string): boolean {
    const mathPattern = /^[\d\s+\-*/().\^%]+$/;
    const hasNumbers = /\d/.test(query);
    const hasOperators = /[+\-*/^%]/.test(query);
    
    return mathPattern.test(query) && hasNumbers && hasOperators;
  }

  private handleMathCalculation(query: string): AIResponse {
    try {
      // Simple expression evaluation (safe for basic operations)
      const sanitized = query.replace(/[^0-9+\-*/().\s]/g, '');
      const result = Function('"use strict"; return (' + sanitized + ')')();
      
      return {
        type: 'calculation',
        result: { 
          value: result,
          formatted: `${query} = ${result}`
        },
        message: `${query} equals ${result}`
      };
    } catch (error) {
      throw new Error('Invalid math expression');
    }
  }

  private matchCalculator(query: string): string | null {
    const calculatorKeywords = {
      'standard': ['basic', 'simple', 'standard', 'normal'],
      'scientific': ['scientific', 'advanced', 'sine', 'cosine', 'logarithm'],
      'bmi': ['bmi', 'body mass index', 'weight', 'health'],
      'currency': ['currency', 'exchange', 'convert money', 'dollars', 'euros'],
      'date': ['date', 'days between', 'age', 'time'],
      'loan': ['loan', 'mortgage', 'interest', 'payment'],
      'tip': ['tip', 'gratuity', 'restaurant'],
      'age': ['age', 'how old', 'born'],
      'unit': ['convert', 'units', 'meters', 'feet', 'inches', 'temperature'],
      'percentage': ['percent', 'percentage', '%']
    };

    for (const [calculator, keywords] of Object.entries(calculatorKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return calculator;
      }
    }

    return null;
  }

  private isUnitConversionQuery(query: string): boolean {
    const unitPattern = /(convert|change)\s+(\d+(?:\.\d+)?)\s+(\w+)\s+to\s+(\w+)/i;
    return unitPattern.test(query);
  }

  private handleUnitConversion(query: string): AIResponse {
    const match = query.match(/(convert|change)\s+(\d+(?:\.\d+)?)\s+(\w+)\s+to\s+(\w+)/i);
    if (!match) throw new Error('Invalid conversion query');

    const [, , value, fromUnit, toUnit] = match;
    const numValue = parseFloat(value);

    // Simple unit conversions
    const conversions: Record<string, Record<string, number>> = {
      'feet': { 'meters': 0.3048, 'inches': 12, 'cm': 30.48 },
      'meters': { 'feet': 3.28084, 'inches': 39.3701, 'cm': 100 },
      'inches': { 'feet': 0.0833333, 'meters': 0.0254, 'cm': 2.54 },
      'cm': { 'meters': 0.01, 'feet': 0.0328084, 'inches': 0.393701 }
    };

    const fromConversions = conversions[fromUnit.toLowerCase()];
    if (!fromConversions || !fromConversions[toUnit.toLowerCase()]) {
      return {
        type: 'navigation',
        calculator: 'unit',
        message: `I'll help you convert ${fromUnit} to ${toUnit}. Opening the unit converter.`
      };
    }

    const result = numValue * fromConversions[toUnit.toLowerCase()];
    return {
      type: 'calculation',
      result: {
        value: result,
        formatted: `${numValue} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`
      },
      message: `${numValue} ${fromUnit} equals ${result.toFixed(4)} ${toUnit}`
    };
  }
}