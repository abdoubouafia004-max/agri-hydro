import { Link } from 'react-router-dom';

export default function NotFound({ what = "La page que vous cherchez n'existe pas ou a été déplacée." }) {
  return (
    <section className="section">
      <div className="wrap empty notfound">
        <i className="fa-solid fa-droplet-slash" />
        <h1>Page introuvable</h1>
        <p>{what}</p>
        <div className="empty-cta">
          <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
          <Link className="btn btn-outline" to="/boutique">Voir la boutique</Link>
        </div>
      </div>
    </section>
  );
}
