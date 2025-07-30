import { useState, useCallback } from 'react';
import { calculateROI, generateChartData, type SimulationInputs, type SimulationResults } from '@/lib/calculations';

export function useCalculations() {
  const [inputs, setInputs] = useState<SimulationInputs>({
    budget: 2500000,
    timeframe: 5,
    facilitySize: 25000,
    industry: 'healthcare',
    useCase: 'medical-imaging'
  });
  
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  
  const updateInputs = useCallback((newInputs: Partial<SimulationInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }));
  }, []);
  
  const calculate = useCallback(() => {
    const newResults = calculateROI(inputs);
    const newChartData = generateChartData(inputs, newResults);
    
    setResults(newResults);
    setChartData(newChartData);
    
    return newResults;
  }, [inputs]);
  
  return {
    inputs,
    results,
    chartData,
    updateInputs,
    calculate
  };
}
