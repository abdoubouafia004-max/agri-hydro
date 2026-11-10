import { Link } from 'react-router-dom';
import { categories, settings, testimonials } from '../../data/mock.js';
import ProductCard from '../common/ProductCard.jsx';
import ProductArt from '../common/ProductArt.jsx';
import Wave from '../common/Wave.jsx';
import AnimatedContent from '../common/AnimatedContent.jsx';
import { whatsappLink } from '../../utils/whatsapp.js';

const Head = ({ title, sub, to, more = 'Tout voir' }) => (
  <AnimatedContent className="section-head" distance={40} duration={0.7}>
    <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
    {to && <Link className="link-more" to={to}>{more} <i className="fa-solid fa-arrow-right" /></Link>}
  </AnimatedContent>
);

export function CategoryGrid() {
  return (
    <section className="section">
      <div className="wrap">
        <Head title="Nos univers" sub="De l'eau du robinet à l'irrigation, trouvez le bon équipement." />
        <AnimatedContent className="cat-grid" distance={40} stagger={0.06}>
          {categories.map((c) => (
            <Link key={c.slug} to={`/boutique?categorie=${c.slug}`} className="cat-tile">
              <span className="cat-ico"><i className={`fa-solid ${c.icon}`} /></span>
              <strong>{c.name}</strong>
            </Link>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}

export function ProductRail({ title, sub, products, to, alt, limit = 8 }) {
  if (!products.length) return null;
  return (
    <section className={`section${alt ? ' alt' : ''}`}>
      <div className="wrap">
        <Head title={title} sub={sub} to={to} />
        <AnimatedContent className="grid" distance={60} stagger={0.08}>{products.slice(0, limit).map((p) => <ProductCard key={p.id} product={p} />)}</AnimatedContent>
      </div>
    </section>
  );
}

export function PromoBanners() {
  return (
    <section className="section tight">
      <AnimatedContent className="wrap banners" distance={50} stagger={0.12}>
        <Link to="/boutique?categorie=filtres" className="banner b-blue">
          <div><h3>Entretenez votre osmoseur</h3><p>Cartouches, membranes et packs d'entretien.</p><span className="btn btn-light">Voir les filtres</span></div>
          <ProductArt kind="cartridge" label="Cartouches" />
        </Link>
        <Link to="/boutique?categorie=irrigation" className="banner b-green">
          <div><h3>Irrigation et pompage</h3><p>Du goutte-à-goutte aux pompes de surface.</p><span className="btn btn-light">Voir l'irrigation</span></div>
          <ProductArt kind="drip" label="Irrigation" />
        </Link>
      </AnimatedContent>
    </section>
  );
}

export function About() {
  const services = [
    ['fa-droplet', 'Solutions hydrauliques'], ['fa-leaf', 'Agriculture durable'], ['fa-handshake-angle', 'Conseil et accompagnement'],
  ];
  return (
    <section className="section alt">
      <AnimatedContent className="wrap about" distance={50} stagger={0.15}>
        <div>
          <h2>Une entreprise d'Oujda qui connaît l'eau</h2>
          <p>{settings.legal} accompagne les particuliers, les professionnels et les agriculteurs dans le choix, l'installation et l'entretien de leurs équipements : osmoseurs, filtration, pompes et irrigation.</p>
          <ul className="svc">{services.map(([ic, t]) => <li key={t}><i className={`fa-solid ${ic}`} /> {t}</li>)}</ul>
          <Link className="btn btn-primary" to="/a-propos">Découvrir l'entreprise</Link>
        </div>
        <blockquote className="tagline">{settings.tagline}</blockquote>
      </AnimatedContent>
    </section>
  );
}

export function WhyUs() {
  const items = [
    ['fa-comments', 'Conseil personnalisé', 'Nous choisissons avec vous la solution adaptée à votre eau et à votre usage.'],
    ['fa-screwdriver-wrench', 'Installation et entretien', 'Mise en service, remplacement des filtres et pièces de rechange.'],
    ['fa-seedling', 'Pensé pour le durable', "Des équipements qui économisent l'eau et durent dans le temps."],
    ['fa-location-dot', 'Service de proximité', 'Une équipe locale à Oujda, joignable directement sur WhatsApp.'],
  ];
  return (
    <section className="section">
      <div className="wrap">
        <Head title="Pourquoi nous choisir" />
        <AnimatedContent className="why" distance={40} stagger={0.1}>{items.map(([ic, t, d]) => (
          <div key={t}><i className={`fa-solid ${ic}`} /><h3>{t}</h3><p>{d}</p></div>
        ))}</AnimatedContent>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section alt">
      <div className="wrap">
        <Head title="Ils nous font confiance" />
        <AnimatedContent className="testi" distance={40} stagger={0.1}>{testimonials.map((t) => (
          <figure key={t.id}>
            <div className="stars" role="img" aria-label="5 étoiles sur 5">{'★★★★★'}</div>
            <blockquote>{t.text}</blockquote>
            <figcaption>{t.name}, {t.city}</figcaption>
          </figure>
        ))}</AnimatedContent>
      </div>
    </section>
  );
}

// waveFill = couleur de fond de la section précédente, pour un raccord sans liseré.
export function ContactCta({ waveFill = '#fff' }) {
  return (
    <section className="cta">
      <Wave fill={waveFill} flip />
      <AnimatedContent className="wrap cta-in" distance={40} stagger={0.1}>
        <h2>Un projet, une question ? Parlons-en.</h2>
        <p>{settings.contactName} vous répond {settings.hours.toLowerCase()}. Décrivez votre besoin, nous vous conseillons.</p>
        <div className="hero-cta">
          <a className="btn btn-wa" href={whatsappLink('Bonjour, j’ai une question.')} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp" /> WhatsApp</a>
          <a className="btn btn-ghost" href={`tel:${settings.phoneHref}`}><i className="fa-solid fa-phone" /> {settings.phone}</a>
          <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-location-dot" /> {settings.address}</a>
        </div>
      </AnimatedContent>
    </section>
  );
}
