import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useCalculations } from '@/hooks/use-calculations';
import { REAL_INDUSTRIES_DATA, calculateRealROI, marketTrendData } from '@/lib/real-data';
import { formatCurrency } from '@/lib/calculations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function EconomicSimulator() {
  const { inputs, results, chartData, updateInputs, calculate } = useCalculations();
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleBudgetChange = (value: number[]) => {
    updateInputs({ budget: value[0] });
  };

  const handleTimeframeChange = (value: number[]) => {
    updateInputs({ timeframe: value[0] });
  };

  const handleFacilityChange = (value: number[]) => {
    updateInputs({ facilitySize: value[0] });
  };

  const handleCalculate = () => {
    // Use real data for calculations
    const industryData = REAL_INDUSTRIES_DATA.find(
      ind => ind.name.toLowerCase() === inputs.industry.toLowerCase()
    );
    
    if (industryData) {
      const realResults = calculateRealROI(
        industryData,
        inputs.budget,
        inputs.timeframe,
        inputs.facilitySize
      );
      
      // Update the calculations hook with real data
      updateInputs({ 
        ...inputs,
        realData: realResults,
        industryInfo: industryData
      });
    }
    
    calculate();
    setHasCalculated(true);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Cash Flow Comparison',
        color: '#ffffff'
      }
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      },
      y: {
        ticks: { 
          color: '#9CA3AF',
          callback: function(value: any) {
            return formatCurrency(value);
          }
        },
        grid: { color: 'rgba(156, 163, 175, 0.1)' }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Controls */}
      <Card className="glass-effect border-gray-600 bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            Simulation Parameters
            <div className="text-sm text-blue-400 font-normal mt-1 flex items-center">
              <i className="fas fa-database mr-2"></i>
              Powered by real market data from NCBI, IAEA, NASA
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Investment Budget Slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white">Investment Budget</label>
            <Slider
              value={[inputs.budget]}
              onValueChange={handleBudgetChange}
              max={10000000}
              min={100000}
              step={100000}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>$100K</span>
              <span className="text-blue-500 font-semibold">{formatCurrency(inputs.budget)}</span>
              <span>$10M</span>
            </div>
          </div>

          {/* Time Frame Slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white">Time Frame (Years)</label>
            <Slider
              value={[inputs.timeframe]}
              onValueChange={handleTimeframeChange}
              max={15}
              min={1}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 Year</span>
              <span className="text-blue-500 font-semibold">{inputs.timeframe} Years</span>
              <span>15 Years</span>
            </div>
          </div>

          {/* Facility Size Slider */}
          <div>
            <label className="block text-sm font-medium mb-3 text-white">Facility Size (sq ft)</label>
            <Slider
              value={[inputs.facilitySize]}
              onValueChange={handleFacilityChange}
              max={100000}
              min={1000}
              step={1000}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1K</span>
              <span className="text-blue-500 font-semibold">{(inputs.facilitySize / 1000).toFixed(0)}K sq ft</span>
              <span>100K</span>
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl"
          >
            <i className="fas fa-calculator mr-2"></i>
            Calculate ROI
          </Button>
        </CardContent>
      </Card>

      {/* Comparison and Results */}
      <div className="lg:col-span-2 space-y-8">
        {/* Side-by-side Comparison */}
        <Card className="glass-effect border-gray-600 bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">
              Cost Comparison
              {(() => {
                const industryData = REAL_INDUSTRIES_DATA.find(
                  ind => ind.name.toLowerCase() === inputs.industry.toLowerCase()
                );
                return industryData && (
                  <div className="text-sm text-green-400 font-normal mt-1">
                    {industryData.name} Market: ${industryData.marketSize.toLocaleString()}M 
                    ({industryData.growthRate}% CAGR)
                  </div>
                );
              })()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Method */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-industry text-white"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Traditional Method</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Initial Cost:</span>
                    <span className="font-semibold text-white">
                      {results ? formatCurrency(results.traditionalCost) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Operating:</span>
                    <span className="font-semibold text-white">
                      {results ? formatCurrency(results.traditionalOperating) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environmental Impact:</span>
                    <span className="text-red-400">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Setup Time:</span>
                    <span className="font-semibold text-white">
                      {results ? results.setupTime.traditional : '--'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Isotope Solution */}
              <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-atom text-white"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Isotope Solution</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Initial Cost:</span>
                    <span className="font-semibold text-emerald-400">
                      {results ? formatCurrency(results.isotopeCost) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Operating:</span>
                    <span className="font-semibold text-emerald-400">
                      {results ? formatCurrency(results.isotopeOperating) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environmental Impact:</span>
                    <span className="text-emerald-400">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Setup Time:</span>
                    <span className="font-semibold text-emerald-400">
                      {results ? results.setupTime.isotope : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Results */}
        <Card className="glass-effect border-gray-600 bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">ROI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-500/20 rounded-xl p-6 text-center">
                <i className="fas fa-percentage text-emerald-400 text-2xl mb-3"></i>
                <p className="text-3xl font-bold text-emerald-400">
                  {results ? `${results.roiPercentage.toFixed(0)}%` : '--'}
                </p>
                <p className="text-gray-400 text-sm">{inputs.timeframe}-Year ROI</p>
              </div>
              <div className="bg-yellow-400/20 rounded-xl p-6 text-center">
                <i className="fas fa-clock text-yellow-400 text-2xl mb-3"></i>
                <p className="text-3xl font-bold text-yellow-400">
                  {results ? results.breakevenTime.toFixed(1) : '--'}
                </p>
                <p className="text-gray-400 text-sm">Breakeven (Years)</p>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-6 text-center">
                <i className="fas fa-leaf text-emerald-400 text-2xl mb-3"></i>
                <p className="text-3xl font-bold text-emerald-400">
                  {results ? `${results.emissionsSaved.toFixed(0)}%` : '--'}
                </p>
                <p className="text-gray-400 text-sm">Emissions Reduction</p>
              </div>
            </div>

            {/* Chart Container */}
            {hasCalculated && chartData && (
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            )}
            
            {!hasCalculated && (
              <div className="bg-gray-800/50 rounded-xl p-6 flex items-center justify-center h-64">
                <p className="text-gray-400">Click "Calculate ROI" to view detailed analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
