import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { INDUSTRIES } from '@/lib/constants';
import { UseCaseCard } from '@/components/use-case-card';
import { Card, CardContent } from '@/components/ui/card';

export default function Explorer() {
  const [, setLocation] = useLocation();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('healthcare');

  useEffect(() => {
    // Get selected industry from localStorage
    const stored = localStorage.getItem('selectedIndustry');
    if (stored && INDUSTRIES[stored as keyof typeof INDUSTRIES]) {
      setSelectedIndustry(stored);
    }
  }, []);

  const industry = INDUSTRIES[selectedIndustry as keyof typeof INDUSTRIES];

  const handleUseCaseSelect = (useCaseId: string) => {
    // Store selected use case in localStorage for use in simulator
    localStorage.setItem('selectedUseCase', useCaseId);
    localStorage.setItem('selectedIndustry', selectedIndustry);
    setLocation('/simulator');
  };

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Industry not found</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-gray-900/80"></div>
      
      <div className="relative z-10 px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white">Use Case Explorer</h2>
              <p className="text-xl text-gray-300">{industry.description}</p>
            </div>
            <Card className="glass-effect border-gray-600 bg-transparent">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <i className={`${industry.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Selected Industry</p>
                    <p className="text-lg font-semibold text-white">{industry.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.useCases.map((useCase) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                onClick={() => handleUseCaseSelect(useCase.id)}
              />
            ))}
          </div>

          {/* Industry Insights Panel */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-effect border-gray-600 bg-transparent">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-chart-line text-emerald-400 text-xl mr-3"></i>
                  <h4 className="text-lg font-semibold text-white">Market Growth</h4>
                </div>
                <p className="text-3xl font-bold text-emerald-400 mb-2">12.4%</p>
                <p className="text-gray-400 text-sm">Annual growth in {industry.name.toLowerCase()}</p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-gray-600 bg-transparent">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-dollar-sign text-yellow-400 text-xl mr-3"></i>
                  <h4 className="text-lg font-semibold text-white">Average ROI</h4>
                </div>
                <p className="text-3xl font-bold text-yellow-400 mb-2">285%</p>
                <p className="text-gray-400 text-sm">Over 5-year implementation</p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-gray-600 bg-transparent">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-clock text-blue-500 text-xl mr-3"></i>
                  <h4 className="text-lg font-semibold text-white">Payback Period</h4>
                </div>
                <p className="text-3xl font-bold text-blue-500 mb-2">18</p>
                <p className="text-gray-400 text-sm">Months average</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
