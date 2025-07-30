import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Explorer from "@/pages/explorer";
import Simulator from "@/pages/simulator";
import Generator from "@/pages/generator";
import Knowledge from "@/pages/knowledge";
import NotFound from "@/pages/not-found";

// Add Font Awesome
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(link);
}

function Router() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-700 to-gray-900">
      <Navigation />
      <main className="ml-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/simulator" component={Simulator} />
          <Route path="/generator" component={Generator} />
          <Route path="/knowledge" component={Knowledge} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* Footer */}
      <footer className="ml-20 bg-gray-900/95 border-t border-gray-700 py-12">
        <div className="px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                    <i className="fas fa-atom text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Isospire</h3>
                    <p className="text-gray-400 text-sm">Aspiring the Isotopes</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Empowering decision-makers with comprehensive business intelligence for nuclear technology adoption across healthcare, agriculture, manufacturing, and space research sectors.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <i className="fab fa-linkedin text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <i className="fas fa-envelope text-white"></i>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Solutions</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Healthcare</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Agriculture</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Manufacturing</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Space & R&D</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Knowledge Center</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Case Studies</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">White Papers</a></li>
                  <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Support</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 Isospire. All rights reserved.</p>
              <p className="text-gray-400 text-sm">Powered by Rosatom Technologies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
