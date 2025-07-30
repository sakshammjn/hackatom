import { useEffect } from 'react';
import { EconomicSimulator } from '@/components/economic-simulator';
import { useCalculations } from '@/hooks/use-calculations';
import { AtomicScene } from '@/components/atomic-scene';
import { InteractiveAtom } from '@/components/interactive-atom';

export default function Simulator() {
  const { updateInputs, inputs } = useCalculations();

  useEffect(() => {
    // Get selected industry and use case from localStorage
    const industry = localStorage.getItem('selectedIndustry') || 'healthcare';
    const useCase = localStorage.getItem('selectedUseCase') || 'medical-imaging';
    
    updateInputs({ industry, useCase });
  }, [updateInputs]);

  // Get isotope for the current use case
  const getIsotopeForUseCase = (useCase: string) => {
    if (useCase.includes('imaging')) return 'Tc-99m';
    if (useCase.includes('cancer') || useCase.includes('treatment')) return 'Lu-177';
    if (useCase.includes('sterilization') || useCase.includes('irradiation')) return 'Co-60';
    if (useCase.includes('rtg') || useCase.includes('power')) return 'Pu-238';
    return 'I-131';
  };

  return (
    <section className="min-h-screen relative">
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 opacity-15">
        <AtomicScene intensity={1.2} particleCount={120} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/80"></div>
      
      {/* Floating 3D Isotope Display */}
      <div className="absolute top-8 right-8 z-20">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-300 mb-2">Current Isotope</p>
          <InteractiveAtom 
            isotope={getIsotopeForUseCase(inputs.useCase)}
            size={120}
            interactive={false}
          />
        </div>
      </div>
      
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
