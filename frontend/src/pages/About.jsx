import { Link } from 'react-router-dom';
import { settings, categories } from '../data/mock.js';
import PageHead from '../components/common/PageHead.jsx';
import AnimatedContent from '../components/common/AnimatedContent.jsx';
import { WhyUs, ContactCta } from '../components/home/Sections.jsx';

const AUDIENCES = [
  ['fa-house', 'Particuliers', "Une eau plus pure à la maison : choix de l'osmoseur, installation sous l'évier et remplacement régulier des cartouches."],
  ['fa-mug-hot', 'Professionnels', "Cafés, restaurants, boulangeries, cabinets : des systèmes dimensionnés pour un usage intensif, avec un suivi d'entretien."],
  ['fa-tractor', 'Agriculteurs', "Pompage, goutte-à-goutte et tuyauterie : nous vous aidons à dimensionner une installation qui économise l'eau."],
];

export default function About() {
  return (
    <>
      <PageHead title="À propos" sub={settings.tagline} crumbs={[{ label: 'À propos' }]} />
      <section className="section">
        <AnimatedContent className="wrap about" trigger="mount" distance={40} duration={0.7} stagger={0.15}>
          <div>
            <h2>Une entreprise d'Oujda qui connaît l'eau</h2>
            <p>
              {settings.legal} accompagne les particuliers, les professionnels et les agriculteurs de l'Oriental dans le choix,
              l'installation et l'entretien de leurs équipements : osmoseurs, filtration, pompes et irrigation.
            </p>
            <p>
              Notre approche est simple : comprendre votre eau et votre usage avant de proposer un équipement,
              puis rester disponibles après l'installation pour l'entretien et les pièces de rechange.
            </p>
            <div className="hero-cta about-cta">
              <Link className="btn btn-primary" to="/boutique">Voir le catalogue</Link>
              <Link className="btn btn-outline" to="/contact">Nous contacter</Link>
            </div>
          </div>
          <blockquote className="tagline">{settings.tagline}</blockquote>
        </AnimatedContent>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head"><div><h2>Pour qui ?</h2></div></div>
          <AnimatedContent className="aud" distance={50} stagger={0.1}>
            {AUDIENCES.map(([ic, t, d]) => (
              <div key={t} className="aud-card"><span className="cat-ico"><i className={`fa-solid ${ic}`} /></span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </AnimatedContent>
        </div>
      </section>

      <WhyUs />

      <section className="section alt">
        <div className="wrap">
          <div className="section-head"><div><h2>Nos gammes</h2><p>Tout ce qu'il faut, du robinet au champ.</p></div></div>
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

      <ContactCta waveFill="var(--mist)" />
    </>
  );
}
