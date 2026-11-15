import { Link } from 'react-router-dom';
import { whatsappLink } from '../utils/whatsapp.js';

/** Page provisoire « Bientôt disponible » pour les sections pas encore ouvertes. */
export default function Soon({ title = 'Bientôt disponible' }) {
  return (
    <section className="section">
      <div className="wrap empty notfound">
        <i className="fa-solid fa-person-digging" />
        <h1>{title}</h1>
        <p>Cette page est en cours de préparation et sera bientôt disponible. En attendant, contactez-nous directement pour toute demande.</p>
        <div className="empty-cta">
          <Link className="btn btn-primary" to="/">Retour à l'accueil</Link>
          <a className="btn btn-outline" href={whatsappLink('Bonjour, je souhaite un renseignement.')} target="_blank" rel="noopener noreferrer">
            Écrire sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
