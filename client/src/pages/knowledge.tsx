import { KNOWLEDGE_SECTIONS } from '@/lib/constants';
import { KnowledgeAccordion } from '@/components/knowledge-accordion';

export default function Knowledge() {
  return (
    <section className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-blue-900/70"></div>
      
      <div className="relative z-10 px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Isotope Knowledge Center</h2>
            <p className="text-xl text-gray-300">Learn about nuclear technologies and their applications</p>
          </div>

          <KnowledgeAccordion sections={KNOWLEDGE_SECTIONS} />
        </div>
      </div>
    </section>
  );
}
