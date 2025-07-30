import { ReportGenerator } from '@/components/report-generator';
import { AtomicScene } from '@/components/atomic-scene';

export default function Generator() {
  return (
    <section className="min-h-screen relative">
      {/* 3D Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <AtomicScene intensity={0.6} particleCount={90} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-gray-900/80"></div>
      
      <div className="relative z-10 px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Business Case Generator</h2>
            <p className="text-xl text-gray-300">Create professional reports for boardroom presentations</p>
          </div>

          <ReportGenerator />
        </div>
      </div>
    </section>
  );
}
