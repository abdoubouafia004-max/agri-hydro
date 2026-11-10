import { Link } from 'react-router-dom';

/** crumbs = [{ label, to? }] — la page courante est le dernier élément, sans `to`. */
export default function PageHead({ title, sub, crumbs = [] }) {
  return (
    <div className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label="Fil d'Ariane">
          <ol>
            <li><Link to="/">Accueil</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        {title && <h1>{title}</h1>}
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}
