import { CurrencyRate } from '../types/calculator';

export class CurrencyService {
  private exchangeRates: Record<string, CurrencyRate> = {
    'USD': { code: 'USD', name: 'US Dollar', rate: 1.0 },
    'EUR': { code: 'EUR', name: 'Euro', rate: 0.85 },
    'GBP': { code: 'GBP', name: 'British Pound', rate: 0.73 },
    'JPY': { code: 'JPY', name: 'Japanese Yen', rate: 110.0 },
    'CAD': { code: 'CAD', name: 'Canadian Dollar', rate: 1.25 },
    'AUD': { code: 'AUD', name: 'Australian Dollar', rate: 1.35 },
    'CHF': { code: 'CHF', name: 'Swiss Franc', rate: 0.92 },
    'CNY': { code: 'CNY', name: 'Chinese Yuan', rate: 6.45 },
    'INR': { code: 'INR', name: 'Indian Rupee', rate: 74.5 },
    'BTC': { code: 'BTC', name: 'Bitcoin', rate: 0.000025 }
  };

  async getCurrencies(): Promise<CurrencyRate[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return Object.values(this.exchangeRates);
  }

  async convertCurrency(amount: number, from: string, to: string): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const fromRate = this.exchangeRates[from]?.rate;
    const toRate = this.exchangeRates[to]?.rate;

    if (!fromRate || !toRate) {
      throw new Error('Currency not supported');
    }

    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  async getExchangeRate(from: string, to: string): Promise<number> {
    const fromRate = this.exchangeRates[from]?.rate;
    const toRate = this.exchangeRates[to]?.rate;

    if (!fromRate || !toRate) {
      throw new Error('Currency not supported');
    }

    return toRate / fromRate;
  }
}