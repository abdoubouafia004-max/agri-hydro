// Illustrations temporaires aux couleurs de la marque, remplacées par les vraies photos
// dès qu'un produit a une image (voir ProductCard).
const C = { blue: '#0A78C8', bright: '#0A98E8', deep: '#0A58A8', navy: '#0A2A5A', leaf: '#58A018', mist: '#EEF6FC' };

const Filter = ({ x, h = 86 }) => (
  <g>
    <rect x={x} y={126 - h} width="30" height={h} rx="9" fill="#fff" stroke={C.deep} strokeWidth="3" />
    <rect x={x + 3} y={126 - h * 0.62} width="24" height={h * 0.62 - 3} rx="6" fill={C.bright} opacity=".35" />
    <rect x={x} y={126 - h} width="30" height="14" rx="7" fill={C.deep} />
  </g>
);

const ART = {
  ro: (<><Filter x={18} /><Filter x={58} /><Filter x={98} />
    <rect x="142" y="48" width="46" height="78" rx="23" fill={C.bright} />
    <rect x="150" y="58" width="9" height="40" rx="4.5" fill="#fff" opacity=".45" />
    <path d="M48 66h10M88 66h10M128 66h14" stroke={C.navy} strokeWidth="4" strokeLinecap="round" /></>),
  cartridge: (<><Filter x={52} h={96} /><Filter x={112} h={96} />
    <path d="M60 80h14M60 92h14M120 80h14M120 92h14" stroke={C.deep} strokeWidth="2.5" opacity=".5" strokeLinecap="round" />
    <rect x="52" y="118" width="30" height="8" rx="4" fill={C.deep} /><rect x="112" y="118" width="30" height="8" rx="4" fill={C.deep} /></>),
  pump: (<><rect x="24" y="62" width="88" height="56" rx="12" fill={C.blue} />
    <path d="M40 70v40M54 70v40M68 70v40M82 70v40" stroke="#fff" strokeWidth="3" opacity=".4" strokeLinecap="round" />
    <circle cx="140" cy="90" r="30" fill={C.deep} /><circle cx="140" cy="90" r="12" fill={C.mist} />
    <rect x="130" y="40" width="20" height="24" rx="4" fill={C.navy} /><rect x="160" y="82" width="30" height="16" rx="4" fill={C.navy} />
    <rect x="18" y="118" width="100" height="8" rx="4" fill={C.navy} /></>),
  drip: (<><rect x="8" y="64" width="184" height="12" rx="6" fill={C.navy} />
    {[40, 100, 160].map((x) => (<g key={x}>
      <path d={`M${x} 82c-6 8-6 14 0 14s6-6 0-14z`} fill={C.bright} />
      <path d={`M${x} 126V108`} stroke={C.leaf} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x} 112c-16-2-18-16-18-16s16-2 18 16zM${x} 108c14-2 18-14 18-14s-16-2-18 14z`} fill={C.leaf} /></g>))}</>),
  tester: (<><rect x="78" y="10" width="44" height="118" rx="16" fill={C.navy} />
    <rect x="86" y="24" width="28" height="26" rx="5" fill={C.mist} />
    <text x="100" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.deep} fontFamily="Arial">TDS</text>
    <circle cx="100" cy="72" r="7" fill={C.bright} /><rect x="94" y="96" width="12" height="26" rx="6" fill={C.blue} /></>),
};

export default function ProductArt({ kind = 'ro', label = 'Illustration du produit' }) {
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={label} className="art">
      {ART[kind] || ART.ro}
      <rect x="10" y="132" width="180" height="6" rx="3" fill={C.navy} opacity=".1" />
    </svg>
  );
}
