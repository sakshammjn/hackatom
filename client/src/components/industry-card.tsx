import { cn } from '@/lib/utils';

interface IndustryCardProps {
  industry: {
    name: string;
    icon: string;
    color: string;
    description: string;
    isotopes: string;
  };
  onClick: () => void;
}

export function IndustryCard({ industry, onClick }: IndustryCardProps) {
  return (
    <div 
      className="glass-effect rounded-2xl p-8 atomic-hover transition-all duration-500 cursor-pointer group"
      onClick={onClick}
    >
      <div className="text-center">
        <div className={cn(
          "w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300",
          industry.color
        )}>
          <i className={`${industry.icon} text-3xl text-white`}></i>
        </div>
        
        <h3 className="text-2xl font-semibold mb-4">{industry.name}</h3>
        <p className="text-gray-300 mb-6">{industry.description}</p>
        
        <div className={cn(
          "rounded-lg p-3 text-sm",
          industry.name === 'Healthcare' && "bg-red-500/20 text-red-200",
          industry.name === 'Agriculture' && "bg-green-500/20 text-green-200",
          industry.name === 'Manufacturing' && "bg-blue-500/20 text-blue-200",
          industry.name === 'Space & R&D' && "bg-purple-500/20 text-purple-200"
        )}>
          <i className="fas fa-flask mr-2"></i>
          {industry.isotopes}
        </div>
      </div>
    </div>
  );
}
