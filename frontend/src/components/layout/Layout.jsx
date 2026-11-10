import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { settings, categories } from '../../data/mock.js';
import { whatsappLink } from '../../utils/whatsapp.js';
import LogoLoop from '../common/LogoLoop.jsx';
import SiteCursor from '../common/SiteCursor.jsx';

// Éléments du bandeau défilant (référence stable : LogoLoop se re-mesure quand `logos` change).
const catnavItems = [
  ...categories.map((c) => ({ key: c.slug, title: c.name, icon: c.icon, to: `/boutique?categorie=${c.slug}` })),
  { key: 'promo', title: 'Promotions', icon: 'fa-tag', to: '/boutique?promo=1', promo: true },
];

function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span><i className="fa-solid fa-phone" /> <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a></span>
        <span className="hide-sm"><i className="fa-solid fa-location-dot" /> {settings.address}</span>
        <nav className="topbar-links" aria-label="Informations">
          <Link to="/a-propos">À propos</Link>
          <Link to="/contact">Contact</Link>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
        </nav>
      </div>
    </div>
  );
}

function Header() {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const onShop = pathname === '/boutique';
  const urlQ = onShop ? params.get('q') || '' : '';
  const activeCat = onShop ? params.get('categorie') : null;
  const promoOn = onShop && params.get('promo') === '1';

  const [q, setQ] = useState(urlQ);
  useEffect(() => { setQ(urlQ); }, [urlQ]); // le champ reflète la recherche en cours
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const t = q.trim();
    navigate(t ? `/boutique?q=${encodeURIComponent(t)}` : '/boutique');
  };
  const renderCat = useCallback((item, key, isPrimary) => {
    const on = item.promo ? promoOn : activeCat === item.key;
    const cls = [item.promo && 'promo', on && 'on'].filter(Boolean).join(' ') || undefined;
    return (
      <Link to={item.to} className={cls} aria-current={on && isPrimary ? 'page' : undefined}
        tabIndex={isPrimary ? undefined : -1} draggable={false}>
        <i className={`fa-solid ${item.icon}`} /> {item.title}
      </Link>
    );
  }, [activeCat, promoOn]);
  return (
    <header className="header">
      <div className="wrap head-row">
        <Link to="/" className="logo"><img src="/brand/logo.png" alt={settings.legal} /></Link>
        <form className="search" onSubmit={submit} role="search">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un osmoseur, une cartouche, une pompe…" aria-label="Rechercher un produit" />
          <button type="submit" aria-label="Lancer la recherche"><i className="fa-solid fa-magnifying-glass" /></button>
        </form>
        <a className="btn btn-leaf hide-sm" href={whatsappLink('Bonjour, je souhaite un conseil.')} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp" /> Un conseil ?
        </a>
      </div>
      <nav className="catnav" aria-label="Catégories">
        <div className="wrap">
          <LogoLoop logos={catnavItems} renderItem={renderCat} speed={45} gap={8} logoHeight={16}
            fadeOutWidth={0.08} ariaLabel="Catégories de produits" />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <span className="logo-pill"><img src="/brand/logo.png" alt={settings.legal} /></span>
          <p className="footer-tag">{settings.tagline}</p>
          <a className="social" href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
        </div>
        <div>
          <h4>Boutique</h4>
          <ul>{categories.map((c) => <li key={c.slug}><Link to={`/boutique?categorie=${c.slug}`}>{c.name}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Société</h4>
          <ul>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/boutique?promo=1">Promotions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="contact-list">
            <li><i className="fa-solid fa-location-dot" /> {settings.address}</li>
            <li><i className="fa-solid fa-phone" /> <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a></li>
            <li><i className="fa-brands fa-whatsapp" /> <a href={whatsappLink('Bonjour,')} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            {settings.email && <li><i className="fa-solid fa-envelope" /> <a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">© {new Date().getFullYear()} {settings.legal}. Tous droits réservés.</div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  // 'instant' : évite le défilement animé (html{scroll-behavior:smooth}) à chaque changement de page.
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return (
    <>
      <SiteCursor />
      <TopBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
      <a className="wa-float" href={whatsappLink('Bonjour, je souhaite un conseil.')} target="_blank" rel="noopener noreferrer" aria-label="Écrire sur WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>
    </>
  );
}
