import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, productBySlug, categoryBySlug, settings } from '../data/mock.js';
import { formatPrice, effectivePrice, discount, hasPrice } from '../utils/format.js';
import { orderLink } from '../utils/whatsapp.js';
import ProductArt from '../components/common/ProductArt.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import PageHead from '../components/common/PageHead.jsx';
import AnimatedContent from '../components/common/AnimatedContent.jsx';
import NotFound from './NotFound.jsx';

const PERKS = [
  ['fa-comments', 'Conseil avant achat', 'Nous vérifions avec vous que le produit convient à votre usage.'],
  ['fa-screwdriver-wrench', 'Installation possible', 'Mise en service et entretien par notre équipe à Oujda.'],
  ['fa-box', 'Pièces de rechange', 'Cartouches, membranes et pièces disponibles en magasin.'],
];

export default function Product() {
  const { slug } = useParams();
  const p = productBySlug(slug);
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [slug]);

  if (!p) return <NotFound what="Ce produit n'existe pas ou n'est plus au catalogue." />;

  const cat = categoryBySlug(p.category);
  const off = discount(p);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id);
  const clamp = (n) => Math.min(99, Math.max(1, Number.isFinite(n) ? Math.round(n) : 1));

  return (
    <>
      <PageHead crumbs={[{ label: 'Boutique', to: '/boutique' }, ...(cat ? [{ label: cat.name, to: `/boutique?categorie=${cat.slug}` }] : []), { label: p.name }]} />
      <section className="section pdp-section">
        <AnimatedContent key={slug} className="wrap pdp" trigger="mount" distance={40} duration={0.7} stagger={0.12}>
          <div className="pdp-media">
            {p.image ? <img src={p.image} alt={p.name} /> : <ProductArt kind={p.kind} label={p.name} />}
            <span className="badges">
              {off > 0 && <span className="badge badge-promo">-{formatPrice(off)}</span>}
              {p.tag && !(p.tag === 'Promo' && off > 0) && <span className="badge badge-tag">{p.tag}</span>}
            </span>
          </div>

          <div className="pdp-info">
            {cat && <Link className="pdp-cat" to={`/boutique?categorie=${cat.slug}`}><i className={`fa-solid ${cat.icon}`} /> {cat.name}</Link>}
            <h1>{p.name}</h1>
            {p.ref && <p className="ref">Réf. {p.ref}</p>}

            <p className={`price pdp-price${hasPrice(p) ? '' : ' on-demand'}`}>
              <strong>{formatPrice(effectivePrice(p))}</strong>
              {off > 0 && <s>{formatPrice(p.price)}</s>}
            </p>
            {off > 0 && <p className="save">Vous économisez {formatPrice(off)}</p>}

            <div className="buy">
              <div className="qty" role="group" aria-label="Quantité">
                <button type="button" onClick={() => setQty((n) => clamp(n - 1))} aria-label="Diminuer la quantité" disabled={qty <= 1}><i className="fa-solid fa-minus" /></button>
                <input type="number" inputMode="numeric" min="1" max="99" value={qty} aria-label="Quantité"
                  onChange={(e) => setQty(clamp(parseInt(e.target.value, 10)))} />
                <button type="button" onClick={() => setQty((n) => clamp(n + 1))} aria-label="Augmenter la quantité" disabled={qty >= 99}><i className="fa-solid fa-plus" /></button>
              </div>
              <a className="btn btn-wa btn-lg" href={orderLink([{ product: p, quantity: qty }])} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" /> {hasPrice(p) ? 'Commander sur WhatsApp' : 'Demander le prix sur WhatsApp'}
              </a>
            </div>
            <p className="buy-note">
              Pas de paiement en ligne : nous confirmons la disponibilité et le prix avec vous, puis convenons de la livraison ou du retrait.
              Vous préférez appeler ? <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
            </p>

            <ul className="perks">
              {PERKS.map(([ic, t, d]) => (
                <li key={t}><i className={`fa-solid ${ic}`} /><div><strong>{t}</strong><span>{d}</span></div></li>
              ))}
            </ul>
          </div>
        </AnimatedContent>
      </section>

      {related.length > 0 && (
        <section className="section alt">
          <div className="wrap">
            <div className="section-head">
              <div><h2>Dans la même catégorie</h2></div>
              <Link className="link-more" to={`/boutique?categorie=${p.category}`}>Tout voir <i className="fa-solid fa-arrow-right" /></Link>
            </div>
            <AnimatedContent key={slug} className="grid" distance={60} stagger={0.08}>{related.map((x) => <ProductCard key={x.id} product={x} />)}</AnimatedContent>
          </div>
        </section>
      )}
    </>
  );
}
