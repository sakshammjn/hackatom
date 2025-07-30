import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const KNOWLEDGE_CONTENT = {
  'isotopes-basics': {
    title: "What are Isotopes?",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-300 mb-4">
            Isotopes are variants of chemical elements that have the same number of protons but different numbers of neutrons. 
            This difference in neutron count gives isotopes unique properties that make them valuable for various applications.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <i className="fas fa-check text-emerald-400 mr-2 mt-1"></i>
              <span>Same chemical properties as the parent element</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-emerald-400 mr-2 mt-1"></i>
              <span>Different nuclear properties and stability</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-emerald-400 mr-2 mt-1"></i>
              <span>Can be radioactive or stable</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h4 className="font-semibold mb-3 text-white">Common Medical Isotopes</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Tc-99m</span>
              <span className="text-emerald-400 text-sm">Medical Imaging</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">I-131</span>
              <span className="text-blue-400 text-sm">Thyroid Treatment</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Lu-177</span>
              <span className="text-purple-400 text-sm">Cancer Therapy</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'production-methods': {
    title: "How Isotopes are Produced",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-900/30 rounded-xl p-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-circle-radiation text-white"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Cyclotron Production</h4>
          <p className="text-gray-300 text-sm mb-3">Particle accelerators that bombard targets with high-energy particles.</p>
          <div className="text-xs text-blue-300">
            <span>Examples: F-18, Tc-99m, I-123</span>
          </div>
        </div>
        <div className="bg-emerald-900/30 rounded-xl p-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-atom text-white"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Reactor Production</h4>
          <p className="text-gray-300 text-sm mb-3">Nuclear reactors that produce isotopes through neutron activation.</p>
          <div className="text-xs text-emerald-300">
            <span>Examples: Mo-99, Co-60, I-131</span>
          </div>
        </div>
        <div className="bg-purple-900/30 rounded-xl p-4">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-flask text-white"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Generator Systems</h4>
          <p className="text-gray-300 text-sm mb-3">On-site production systems using parent-daughter isotope pairs.</p>
          <div className="text-xs text-purple-300">
            <span>Examples: Mo-99/Tc-99m generators</span>
          </div>
        </div>
      </div>
    )
  },
  'industry-applications': {
    title: "Industry Applications",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-heartbeat text-white text-2xl"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Healthcare</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>SPECT/PET imaging</li>
            <li>Cancer treatment</li>
            <li>Sterilization</li>
            <li>Blood irradiation</li>
          </ul>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-leaf text-white text-2xl"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Agriculture</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Food irradiation</li>
            <li>Pest control (SIT)</li>
            <li>Plant breeding</li>
            <li>Soil studies</li>
          </ul>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-cogs text-white text-2xl"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Industrial</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>NDT testing</li>
            <li>Thickness gauging</li>
            <li>Level measurement</li>
            <li>Leak detection</li>
          </ul>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-rocket text-white text-2xl"></i>
          </div>
          <h4 className="font-semibold mb-2 text-white">Space</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>RTG power systems</li>
            <li>Satellite instruments</li>
            <li>Deep space missions</li>
            <li>Mars rovers</li>
          </ul>
        </div>
      </div>
    )
  },
  'safety-regulations': {
    title: "Safety & Regulations",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-4 text-white">Regulatory Bodies</h4>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
              <i className="fas fa-flag-usa text-blue-400 mr-3"></i>
              <div>
                <p className="font-medium text-white">NRC (USA)</p>
                <p className="text-sm text-gray-400">Nuclear Regulatory Commission</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
              <i className="fas fa-globe text-emerald-400 mr-3"></i>
              <div>
                <p className="font-medium text-white">IAEA</p>
                <p className="text-sm text-gray-400">International Atomic Energy Agency</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-800/50 rounded-lg">
              <i className="fas fa-certificate text-yellow-400 mr-3"></i>
              <div>
                <p className="font-medium text-white">ISO Standards</p>
                <p className="text-sm text-gray-400">International quality standards</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Safety Principles</h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h5 className="font-medium text-white">ALARA Principle</h5>
                <p className="text-sm text-gray-400">As Low As Reasonably Achievable radiation exposure</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h5 className="font-medium text-white">Defense in Depth</h5>
                <p className="text-sm text-gray-400">Multiple independent safety barriers</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h5 className="font-medium text-white">Waste Management</h5>
                <p className="text-sm text-gray-400">Proper handling and disposal protocols</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

interface KnowledgeAccordionProps {
  sections: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
  }>;
}

export function KnowledgeAccordion({ sections }: KnowledgeAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.id} className="glass-effect border-gray-600 bg-transparent overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mr-4", section.color)}>
                <i className={`${section.icon} text-white text-xl`}></i>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                <p className="text-gray-400 text-sm">{section.subtitle}</p>
              </div>
            </div>
            <i className={cn(
              "fas fa-chevron-down text-gray-400 transform transition-transform",
              openSection === section.id && "rotate-180"
            )}></i>
          </button>
          
          {openSection === section.id && (
            <CardContent className="p-6 pt-0 border-t border-gray-700">
              {KNOWLEDGE_CONTENT[section.id as keyof typeof KNOWLEDGE_CONTENT]?.content}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
