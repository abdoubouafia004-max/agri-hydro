import Hero from '../components/home/Hero.jsx';
import { CategoryGrid, ProductRail, PromoBanners, About, WhyUs, Testimonials, ContactCta } from '../components/home/Sections.jsx';
import { products } from '../data/mock.js';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductRail title="Les plus demandés" sub="Notre sélection du moment." products={products.filter((p) => p.bestSeller)} to="/boutique" />
      <PromoBanners />
      <ProductRail alt title="Nouveautés" sub="Derniers arrivages au catalogue." products={products.filter((p) => p.isNew)} to="/boutique?tri=nouveautes" />
      <About />
      <WhyUs />
      <Testimonials />
      <ContactCta waveFill="var(--mist)" />
    </>
  );
}
