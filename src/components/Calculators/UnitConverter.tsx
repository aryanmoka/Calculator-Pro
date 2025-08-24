import React, { useState, useEffect } from 'react';
import { Ruler, Thermometer, Weight, Zap, ArrowDownUp } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

interface ConversionUnit {
  name: string;
  symbol: string;
  toBase: number; // multiplier to convert to base unit
  fromBase: number; // multiplier to convert from base unit
}

const unitCategories: Record<UnitCategory, { name: string; icon: any; units: Record<string, ConversionUnit> }> = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: {
      mm: { name: 'Millimeter', symbol: 'mm', toBase: 0.001, fromBase: 1000 },
      cm: { name: 'Centimeter', symbol: 'cm', toBase: 0.01, fromBase: 100 },
      m: { name: 'Meter', symbol: 'm', toBase: 1, fromBase: 1 },
      km: { name: 'Kilometer', symbol: 'km', toBase: 1000, fromBase: 0.001 },
      in: { name: 'Inch', symbol: 'in', toBase: 0.0254, fromBase: 39.3701 },
      ft: { name: 'Foot', symbol: 'ft', toBase: 0.3048, fromBase: 3.28084 },
      yd: { name: 'Yard', symbol: 'yd', toBase: 0.9144, fromBase: 1.09361 },
      mi: { name: 'Mile', symbol: 'mi', toBase: 1609.34, fromBase: 0.000621371 }
    }
  },
  weight: {
    name: 'Weight',
    icon: Weight,
    units: {
      mg: { name: 'Milligram', symbol: 'mg', toBase: 0.000001, fromBase: 1000000 },
      g: { name: 'Gram', symbol: 'g', toBase: 0.001, fromBase: 1000 },
      kg: { name: 'Kilogram', symbol: 'kg', toBase: 1, fromBase: 1 },
      oz: { name: 'Ounce', symbol: 'oz', toBase: 0.0283495, fromBase: 35.274 },
      lb: { name: 'Pound', symbol: 'lb', toBase: 0.453592, fromBase: 2.20462 },
      ton: { name: 'Ton', symbol: 't', toBase: 1000, fromBase: 0.001 }
    }
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: {
      c: { name: 'Celsius', symbol: '°C', toBase: 1, fromBase: 1 },
      f: { name: 'Fahrenheit', symbol: '°F', toBase: 1, fromBase: 1 },
      k: { name: 'Kelvin', symbol: 'K', toBase: 1, fromBase: 1 }
    }
  },
  volume: {
    name: 'Volume',
    icon: Zap,
    units: {
      ml: { name: 'Milliliter', symbol: 'ml', toBase: 0.001, fromBase: 1000 },
      l: { name: 'Liter', symbol: 'l', toBase: 1, fromBase: 1 },
      gal: { name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541, fromBase: 0.264172 },
      qt: { name: 'Quart', symbol: 'qt', toBase: 0.946353, fromBase: 1.05669 },
      pt: { name: 'Pint', symbol: 'pt', toBase: 0.473176, fromBase: 2.11338 },
      cup: { name: 'Cup', symbol: 'cup', toBase: 0.236588, fromBase: 4.22675 }
    }
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    // Reset units when category changes
    const categoryUnits = Object.keys(unitCategories[category].units);
    setFromUnit(categoryUnits[0]);
    setToUnit(categoryUnits[1] || categoryUnits[0]);
  }, [category]);

  useEffect(() => {
    convertValue();
  }, [fromValue, fromUnit, toUnit, category]);

  const convertValue = () => {
    const value = parseFloat(fromValue);
    if (!value || value <= 0) {
      setToValue('');
      return;
    }

    const units = unitCategories[category].units;
    const fromUnitData = units[fromUnit];
    const toUnitData = units[toUnit];

    if (!fromUnitData || !toUnitData) {
      setToValue('');
      return;
    }

    let result: number;

    if (category === 'temperature') {
      // Special handling for temperature conversions
      result = convertTemperature(value, fromUnit, toUnit);
    } else {
      // Standard unit conversion
      const baseValue = value * fromUnitData.toBase;
      result = baseValue * toUnitData.fromBase;
    }

    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;

    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'c': celsius = value; break;
      case 'f': celsius = (value - 32) * 5/9; break;
      case 'k': celsius = value - 273.15; break;
      default: celsius = value;
    }

    // Convert from Celsius to target
    switch (to) {
      case 'c': return celsius;
      case 'f': return celsius * 9/5 + 32;
      case 'k': return celsius + 273.15;
      default: return celsius;
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue || '1');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Dark mode container styling */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {/* Removed the circular icon div */}
          <div>
            <h2 className="text-2xl font-bold text-gray-100">Unit Converter</h2>
            <p className="text-gray-400">Convert between different units</p>
          </div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {Object.entries(unitCategories).map(([key, cat]) => {
            const Icon = cat.icon;
            return (
              <button
                key={key}
                onClick={() => setCategory(key as UnitCategory)}
                className={`flex items-center space-x-2 p-3 rounded-lg font-medium transition-all ${
                  category === key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Conversion Interface */}
        <div className="space-y-4">
          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold bg-gray-900 text-gray-50"
                placeholder="Enter value"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
              >
                {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors text-gray-200"
              title="Swap units"
            >
              <ArrowDownUp className="w-6 h-6" />
            </button>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={toValue}
                readOnly
                className="px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-lg font-semibold text-gray-50"
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 text-gray-50"
              >
                {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {toValue && (
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl border border-blue-800">
            <div className="text-center">
              <div className="text-lg text-gray-100">
                <strong>{fromValue} {unitCategories[category].units[fromUnit].symbol}</strong>
                {' = '}
                <strong>{toValue} {unitCategories[category].units[toUnit].symbol}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Quick Conversions */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Conversions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[1, 10, 100, 1000].map((val) => (
              <button
                key={val}
                onClick={() => setFromValue(val.toString())}
                className="p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-gray-200"
              >
                {val} {unitCategories[category].units[fromUnit].symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};