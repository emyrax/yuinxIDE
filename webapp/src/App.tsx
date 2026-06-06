import { BackgroundLayers } from './components/BackgroundLayers';
import { TopNav } from './components/TopNav';
import { Hero } from './components/Hero';
import { ProductPreview } from './components/ProductPreview';
import { Workflow } from './components/Workflow';
import { Features } from './components/Features';
import { BuilderShowcase } from './components/BuilderShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { useScrollNav } from './hooks/useScrollNav';
import { useReveal } from './hooks/useReveal';
import { useBuilderShowcase } from './hooks/useBuilderShowcase';
import { useWaitlistForm } from './hooks/useWaitlistForm';
import { useWaitlistCount } from './hooks/useWaitlistCount';

export default function App() {
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
