import { Routes, Route } from 'react-router-dom';
import { BackgroundLayers } from './components/BackgroundLayers';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { ProductPreview } from './components/ProductPreview';
import { Workflow } from './components/Workflow';
import { Features } from './components/Features';
import { BuilderShowcase } from './components/BuilderShowcase';
import { CircuitEditor } from './components/CircuitEditor';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { AuthPage } from './components/AuthPage';
import { IDE } from './components/IDE';
import { useScrollNav } from './hooks/useScrollNav';
import { useReveal } from './hooks/useReveal';
import { useBuilderShowcase } from './hooks/useBuilderShowcase';
import { useWaitlistForm } from './hooks/useWaitlistForm';
import { useWaitlistCount } from './hooks/useWaitlistCount';

function Landing() {
  useScrollNav();
  useReveal();
  useBuilderShowcase();
  useWaitlistForm();
  useWaitlistCount();

  return (
    <>
      <BackgroundLayers />
      <TopNav />
      <main>
        <Hero />
        <CircuitEditor />
        <ProductPreview />
        <Workflow />
        <Features />
        <BuilderShowcase />
        <Contact />
      </main>
      <Footer />
      <WaitlistModal />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/ide" element={<IDE />} />
    </Routes>
  );
}
