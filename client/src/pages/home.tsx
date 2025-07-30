import { useLocation } from 'wouter';
import { INDUSTRIES } from '@/lib/constants';
import { IndustryCard } from '@/components/industry-card';

export default function Home() {
  const [, setLocation] = useLocation();

  const handleIndustrySelect = (industryId: string) => {
    // Store selected industry in localStorage for use in other pages
    localStorage.setItem('selectedIndustry', industryId);
    setLocation('/explorer');
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 isotope-pattern"></div>
      
      {/* Floating Atomic Particles */}
      <div className="absolute top-20 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-500 rounded-full animate-float opacity-30" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 px-12 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center animate-spin-slow">
              <i className="fas fa-atom text-3xl text-white"></i>
            </div>
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
