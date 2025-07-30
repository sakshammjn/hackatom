import { useLocation } from 'wouter';
import { INDUSTRIES } from '@/lib/constants';
import { IndustryCard } from '@/components/industry-card';
import { AtomicScene } from '@/components/atomic-scene';
import { AnimatedLogo } from '@/components/animated-logo';

export default function Home() {
  const [, setLocation] = useLocation();

  const handleIndustrySelect = (industryId: string) => {
    // Store selected industry in localStorage for use in other pages
    localStorage.setItem('selectedIndustry', industryId);
    setLocation('/explorer');
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* 3D Atomic Background Scene */}
      <div className="absolute inset-0 opacity-20">
        <AtomicScene intensity={0.5} particleCount={150} />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 isotope-pattern"></div>
      
      <div className="relative z-10 px-12 py-16">
        {/* Hero Section with 3D Animated Logo */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <AnimatedLogo size={300} interactive={true} />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Isospire
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Aspiring the Isotopes</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Empowering decision-makers to explore the economic feasibility of adopting non-energy nuclear technologies in healthcare, agriculture, manufacturing, and space research.
          </p>
        </div>

        {/* Industry Selector */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">Choose Your Industry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(INDUSTRIES).map(([id, industry]) => (
              <IndustryCard
                key={id}
                industry={industry}
                onClick={() => handleIndustrySelect(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
