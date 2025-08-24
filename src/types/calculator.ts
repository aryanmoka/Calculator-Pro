export interface CalculatorResult {
  value: number | string;
  unit?: string;
  formatted?: string;
}

export interface AIResponse {
  type: 'calculation' | 'navigation' | 'error';
  result?: CalculatorResult;
  calculator?: string;
  message: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
}

export interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}