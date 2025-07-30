import { cn } from '@/lib/utils';

interface UseCaseCardProps {
  useCase: {
    id: string;
    name: string;
    description: string;
    icon: string;
    roi: string;
    isotope: string;
    color: string;
  };
  onClick: () => void;
}

export function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  const getRoiColor = (roi: string) => {
    switch (roi) {
      case 'Very High': return 'text-emerald-400';
      case 'High': return 'text-emerald-500';
      case 'Medium': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getIsotopeColor = (isotope: string) => {
    if (isotope.includes('99m') || isotope.includes('131')) return 'bg-red-500/20 text-red-200';
    if (isotope.includes('177')) return 'bg-orange-500/20 text-orange-200';
    if (isotope.includes('60')) return 'bg-blue-500/20 text-blue-200';
    if (isotope.includes('238')) return 'bg-purple-500/20 text-purple-200';
    return 'bg-gray-500/20 text-gray-200';
  };

  return (
    <div 
      className="glass-effect rounded-2xl p-8 atomic-hover transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={cn(
          "w-16 h-16 bg-gradient-to-br rounded-xl flex items-center justify-center",
          useCase.color
        )}>
          <i className={`${useCase.icon} text-2xl text-white`}></i>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">ROI Potential</div>
          <div className={cn("text-lg font-bold", getRoiColor(useCase.roi))}>{useCase.roi}</div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{useCase.name}</h3>
      <p className="text-gray-300 mb-4">{useCase.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={cn("text-sm px-3 py-1 rounded-full", getIsotopeColor(useCase.isotope))}>
          {useCase.isotope}
        </span>
        <i className="fas fa-arrow-right text-blue-500"></i>
      </div>
    </div>
  );
}
