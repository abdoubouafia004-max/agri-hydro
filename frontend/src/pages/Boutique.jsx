import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, categories, categoryBySlug } from '../data/mock.js';
import { normalize, hasPromo, hasPrice, effectivePrice } from '../utils/format.js';
import ProductCard from '../components/common/ProductCard.jsx';
import PageHead from '../components/common/PageHead.jsx';
import AnimatedContent from '../components/common/AnimatedContent.jsx';

const SORTS = [
  ['', 'Pertinence'],
  ['nouveautes', 'Nouveautés'],
  ['prix-asc', 'Prix croissant'],
  ['prix-desc', 'Prix décroissant'],
];

// Les produits « prix sur demande » sont toujours placés en fin de liste lors d'un tri par prix.
const byPrice = (dir) => (a, b) => {
  if (hasPrice(a) !== hasPrice(b)) return hasPrice(a) ? -1 : 1;
  return dir * (effectivePrice(a) - effectivePrice(b));
};

export default function Boutique() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('categorie') || '';
  const promo = params.get('promo') === '1';
  const sort = params.get('tri') || '';
  const current = categoryBySlug(cat);

  const list = useMemo(() => {
    const nq = normalize(q);
    const out = products.filter((p) => {
      const haystack = normalize(`${p.name} ${p.ref || ''} ${categoryBySlug(p.category)?.name || ''}`);
      return (!nq || haystack.includes(nq)) && (!cat || p.category === cat) && (!promo || hasPromo(p));
    });
    if (sort === 'nouveautes') out.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === 'prix-asc') out.sort(byPrice(1));
    if (sort === 'prix-desc') out.sort(byPrice(-1));
    return out;
  }, [q, cat, promo, sort]);

  // Met à jour un paramètre d'URL en conservant les autres.
  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const title = q ? `Résultats pour « ${q} »` : promo ? 'Promotions' : current ? current.name : 'Tous les produits';
  const hasFilters = q || cat || promo;

  return (
    <>
      <PageHead title={title} crumbs={current ? [{ label: 'Boutique', to: '/boutique' }, { label: current.name }] : [{ label: 'Boutique' }]} />
      <section className="section shop">
        <div className="wrap">
          <div className="shop-bar">
            <div className="chips" role="group" aria-label="Filtrer par catégorie">
              <button type="button" className={!cat ? 'chip on' : 'chip'} aria-pressed={!cat} onClick={() => set('categorie', '')}>Tout</button>
              {categories.map((c) => (
                <button key={c.slug} type="button" className={cat === c.slug ? 'chip on' : 'chip'} aria-pressed={cat === c.slug}
                  onClick={() => set('categorie', cat === c.slug ? '' : c.slug)}>
                  <i className={`fa-solid ${c.icon}`} /> {c.name}
                </button>
              ))}
              <button type="button" className={promo ? 'chip chip-promo on' : 'chip chip-promo'} aria-pressed={promo} onClick={() => set('promo', promo ? '' : '1')}>
                <i className="fa-solid fa-tag" /> Promotions
              </button>
            </div>
            <div className="shop-meta">
              <span className="count" aria-live="polite">{list.length} produit{list.length > 1 ? 's' : ''}</span>
              <label className="sort">
                <span>Trier</span>
                <select value={sort} onChange={(e) => set('tri', e.target.value)}>
                  {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            </div>
          </div>

          {list.length > 0 ? (
            // key : la grille rejoue l'animation à chaque changement de filtre ou de tri.
            <AnimatedContent key={`${q}|${cat}|${promo}|${sort}`} className="grid" trigger="mount" distance={40} duration={0.6} stagger={0.05}>
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </AnimatedContent>
          ) : (
            <div className="empty">
              <i className="fa-solid fa-magnifying-glass" />
              <h2>Aucun produit trouvé</h2>
              <p>Essayez un autre mot-clé ou une autre catégorie. Vous ne trouvez pas ce qu'il vous faut ? Demandez-nous, nous pouvons le commander.</p>
              <div className="empty-cta">
                {hasFilters && <Link className="btn btn-primary" to="/boutique">Voir tous les produits</Link>}
                <Link className="btn btn-outline" to="/contact">Nous contacter</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
