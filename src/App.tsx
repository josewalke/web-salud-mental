import React, { useState } from 'react';
import { SplineBackground } from './components/SplineBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { PerformanceMonitor } from './components/PerformanceMonitor';

function App() {
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Spline 3D Background - Fixed position behind everything */}
      <SplineBackground />

      {/* Main content - Positioned above the background */}
      <div className="relative z-20">
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <ServicesSection />
        </main>
        <Footer />
      </div>

      {/* Performance Monitor Toggle Button */}
      <button
        onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
        className="fixed bottom-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Monitor de Performance"
      >
        📊
      </button>

      {/* Performance Monitor Component */}
      <PerformanceMonitor
        isVisible={showPerformanceMonitor}
        onClose={() => setShowPerformanceMonitor(false)}
      />
    </div>
  );
}

export default App;
