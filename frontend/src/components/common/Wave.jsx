// Vague décorative (reprise du motif de la carte de visite) entre les sections.
// fill accepte une couleur ou une variable CSS (ex. 'var(--mist)').
export default function Wave({ fill = '#fff', flip = false }) {
  return (
    <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}>
      <path style={{ fill }} d="M0 48c120-34 240-34 360-8s240 40 360 14 240-52 360-40 240 40 360 30V80H0z" />
    </svg>
  );
}
