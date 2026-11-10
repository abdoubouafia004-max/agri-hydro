import { Link } from 'react-router-dom';
import ProductArt from './ProductArt.jsx';
import { formatPrice, effectivePrice, discount, hasPrice } from '../../utils/format.js';
import { orderLink } from '../../utils/whatsapp.js';

export default function ProductCard({ product: p }) {
  const off = discount(p);
  return (
    <article className="card">
      <Link to={`/produit/${p.slug}`} className="card-media" aria-label={p.name}>
        {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <ProductArt kind={p.kind} label={p.name} />}
        <span className="badges">
          {off > 0 && <span className="badge badge-promo">-{formatPrice(off)}</span>}
          {p.tag && !(p.tag === 'Promo' && off > 0) && <span className="badge badge-tag">{p.tag}</span>}
        </span>
      </Link>
      <div className="card-body">
        <h3><Link to={`/produit/${p.slug}`}>{p.name}</Link></h3>
        {p.ref && <p className="ref">Réf. {p.ref}</p>}
        <p className={`price${hasPrice(p) ? '' : ' on-demand'}`}>
          <strong>{formatPrice(effectivePrice(p))}</strong>
          {off > 0 && <s>{formatPrice(p.price)}</s>}
        </p>
        <a className="btn btn-wa btn-sm" href={orderLink([{ product: p, quantity: 1 }])} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp" /> {hasPrice(p) ? 'Commander' : 'Demander le prix'}
        </a>
      </div>
    </article>
  );
}
