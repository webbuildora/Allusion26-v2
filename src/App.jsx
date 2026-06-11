import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatsTicker from './components/StatsTicker';
import About from './components/About';
import Categories from './components/Categories';
import Committee from './components/Committee';
import Register from './components/Register';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import useIntersection from './hooks/useIntersection';

function AnimatedSection({ children }) {
  const [ref, isVisible] = useIntersection();
  return (
    <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      <AnimatedSection>
        <StatsTicker />
      </AnimatedSection>
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Categories />
      </AnimatedSection>
      <AnimatedSection>
        <Committee />
      </AnimatedSection>
      <AnimatedSection>
        <Register />
      </AnimatedSection>
      <AnimatedSection>
        <FAQ />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  );
}
