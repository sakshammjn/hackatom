import { useEffect } from 'react';
import { EconomicSimulator } from '@/components/economic-simulator';
import { useCalculations } from '@/hooks/use-calculations';

export default function Simulator() {
  const { updateInputs } = useCalculations();

  useEffect(() => {
    // Get selected industry and use case from localStorage
    const industry = localStorage.getItem('selectedIndustry') || 'healthcare';
    const useCase = localStorage.getItem('selectedUseCase') || 'medical-imaging';
    
    updateInputs({ industry, useCase });
  }, [updateInputs]);

  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>
      
      <div className="relative z-10 px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Economic Comparison Simulator</h2>
            <p className="text-xl text-gray-300">Compare isotope solutions vs traditional methods</p>
          </div>

          <EconomicSimulator />
        </div>
      </div>
    </section>
  );
}
