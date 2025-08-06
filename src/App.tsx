import React from 'react';
import { SplineBackground } from './components/SplineBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';

function App() {
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
    </div>
  );
}

export default App;
