export interface SimulationInputs {
  budget: number;
  timeframe: number;
  facilitySize: number;
  industry: string;
  useCase: string;
}

export interface SimulationResults {
  traditionalCost: number;
  traditionalOperating: number;
  isotopeCost: number;
  isotopeOperating: number;
  roiPercentage: number;
  breakevenTime: number;
  emissionsSaved: number;
  setupTime: {
    traditional: string;
    isotope: string;
  };
}

export function calculateROI(inputs: SimulationInputs): SimulationResults {
  const { budget, timeframe, facilitySize, industry, useCase } = inputs;
  
  // Industry-specific multipliers
  const industryMultipliers = {
    healthcare: { cost: 1.2, operating: 0.8, efficiency: 1.3 },
    agriculture: { cost: 0.9, operating: 0.7, efficiency: 1.1 },
    manufacturing: { cost: 1.0, operating: 0.9, efficiency: 1.2 },
    space: { cost: 2.0, operating: 0.6, efficiency: 1.5 }
  };
  
  const multiplier = industryMultipliers[industry as keyof typeof industryMultipliers] || industryMultipliers.healthcare;
  
  // Base calculations
  const facilityFactor = Math.sqrt(facilitySize / 25000);
  
  // Traditional method costs
  const traditionalCost = budget * 0.74 * multiplier.cost * facilityFactor;
  const traditionalOperating = budget * 0.17 * multiplier.operating * facilityFactor;
  
  // Isotope solution costs
  const isotopeCost = budget * 0.85 * multiplier.cost * facilityFactor;
  const isotopeOperating = budget * 0.074 * multiplier.operating * facilityFactor;
  
  // Annual savings
  const annualSavings = traditionalOperating - isotopeOperating;
  const initialDifference = isotopeCost - traditionalCost;
  
  // ROI calculations
  const totalSavings = annualSavings * timeframe;
  const netBenefit = totalSavings - initialDifference;
  const roiPercentage = (netBenefit / budget) * 100 * multiplier.efficiency;
  
  // Breakeven calculation
  const breakevenTime = initialDifference > 0 ? initialDifference / annualSavings : 0.5;
  
  // Emissions reduction (isotope solutions are typically more efficient)
  const emissionsSaved = 45 + (multiplier.efficiency - 1) * 30;
  
  // Setup time varies by industry and complexity
  const setupTimes = {
    healthcare: { traditional: "8-12 months", isotope: "4-6 months" },
    agriculture: { traditional: "6-10 months", isotope: "3-5 months" },
    manufacturing: { traditional: "10-14 months", isotope: "5-8 months" },
    space: { traditional: "18-24 months", isotope: "12-16 months" }
  };
  
  return {
    traditionalCost,
    traditionalOperating,
    isotopeCost,
    isotopeOperating,
    roiPercentage: Math.max(roiPercentage, 15), // Minimum 15% ROI
    breakevenTime: Math.max(breakevenTime, 0.5), // Minimum 6 months
    emissionsSaved: Math.min(emissionsSaved, 85), // Maximum 85% reduction
    setupTime: setupTimes[industry as keyof typeof setupTimes] || setupTimes.healthcare
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toFixed(0)}`;
  }
}

export function generateChartData(inputs: SimulationInputs, results: SimulationResults) {
  const years = Array.from({ length: inputs.timeframe }, (_, i) => `Year ${i + 1}`);
  
  const traditionalCashFlow = years.map((_, index) => {
    if (index === 0) {
      return -results.traditionalCost;
    }
    return -results.traditionalCost - (results.traditionalOperating * (index + 1));
  });
  
  const isotopeCashFlow = years.map((_, index) => {
    if (index === 0) {
      return -results.isotopeCost;
    }
    const cumulativeOperating = results.isotopeOperating * (index + 1);
    const cumulativeSavings = (results.traditionalOperating - results.isotopeOperating) * index;
    return -results.isotopeCost - cumulativeOperating + cumulativeSavings;
  });
  
  return {
    labels: years,
    datasets: [
      {
        label: 'Traditional Method',
        data: traditionalCashFlow,
        borderColor: 'hsl(215, 16%, 47%)',
        backgroundColor: 'hsla(215, 16%, 47%, 0.1)',
        tension: 0.4
      },
      {
        label: 'Isotope Solution',
        data: isotopeCashFlow,
        borderColor: 'hsl(221, 83%, 53%)',
        backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
        tension: 0.4
      }
    ]
  };
}
