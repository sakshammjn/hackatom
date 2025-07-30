import { KNOWLEDGE_SECTIONS } from '@/lib/constants';
import { KnowledgeAccordion } from '@/components/knowledge-accordion';
import { InteractiveAtom } from '@/components/interactive-atom';
import { AtomicScene } from '@/components/atomic-scene';

export default function Knowledge() {
  return (
    <section className="min-h-screen relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <AtomicScene intensity={0.3} particleCount={80} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/70"></div>
      
      <div className="relative z-10 px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Isotope Knowledge Center</h2>
            <p className="text-xl text-gray-300">Learn about nuclear technologies and their applications</p>
          </div>

          {/* Interactive Isotope Showcase */}
          <div className="mb-16 bg-gray-900/30 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-center mb-8 text-white">Interactive Isotope Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
              {['Tc-99m', 'Co-60', 'I-131', 'Lu-177', 'Pu-238'].map((isotope) => (
                <div key={isotope} className="text-center relative">
                  <InteractiveAtom 
                    isotope={isotope} 
                    size={180} 
                    interactive={true}
                    className="relative"
                  />
                  <p className="text-sm text-gray-300 mt-4 font-medium">{isotope}</p>
                </div>
              ))}
            </div>
          </div>

          <KnowledgeAccordion sections={KNOWLEDGE_SECTIONS} />
        </div>
      </div>
    </section>
  );
}
