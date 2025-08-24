import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpDown, TrendingUp } from 'lucide-react';
import { CurrencyService } from '../../services/currencyService';
import { CurrencyRate } from '../../types/calculator';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  
  const currencyService = new CurrencyService();

  useEffect(() => {
    loadCurrencies();
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const loadCurrencies = async () => {
    try {
      const currencyList = await currencyService.getCurrencies();
      setCurrencies(currencyList);
    } catch (error) {
      console.error('Failed to load currencies:', error);
    }
  };

  const convertCurrency = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      setResult(null);
      setExchangeRate(null);
      return;
    }

    setLoading(true);
    try {
      const convertedAmount = await currencyService.convertCurrency(amountNum, fromCurrency, toCurrency);
      const rate = await currencyService.getExchangeRate(fromCurrency, toCurrency);
      
      setResult(convertedAmount);
      setExchangeRate(rate);
    } catch (error) {
      console.error('Conversion failed:', error);
      setResult(null);
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Dark mode container styling */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Currency Converter</h2>
            <p className="text-gray-400">Convert between different currencies</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-900 text-gray-50"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              title="Swap currencies"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-200" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {loading ? (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Converting...</p>
          </div>
        ) : result && exchangeRate ? (
          <div className="space-y-4">
            {/* Dark mode result display */}
            <div className="p-6 bg-gradient-to-br from-teal-800 to-blue-800 rounded-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">
                  {formatCurrency(result, toCurrency)}
                </div>
                <div className="text-gray-200">
                  {formatCurrency(parseFloat(amount), fromCurrency)} equals
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Exchange Rate</span>
              </div>
              <div className="font-semibold text-gray-100">
                1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
              </div>
            </div>
          </div>
        ) : null}

        {/* Popular Pairs */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Popular Pairs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              ['USD', 'EUR'],
              ['USD', 'GBP'],
              ['USD', 'JPY'],
              ['EUR', 'GBP']
            ].map(([from, to]) => (
              <button
                key={`${from}-${to}`}
                onClick={() => {
                  setFromCurrency(from);
                  setToCurrency(to);
                }}
                className="p-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                {from}/{to}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};