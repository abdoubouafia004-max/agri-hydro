const isAmount = (n) => typeof n === 'number' && Number.isFinite(n) && n > 0;

export const hasPrice = (p) => isAmount(p.price);
// Une promo n'est valide que si elle est inférieure au prix normal.
export const hasPromo = (p) => hasPrice(p) && isAmount(p.promoPrice) && p.promoPrice < p.price;
export const effectivePrice = (p) => (hasPromo(p) ? p.promoPrice : p.price);
export const discount = (p) => (hasPromo(p) ? p.price - p.promoPrice : 0);
export const formatPrice = (n) => (isAmount(n) ? `${n.toLocaleString('fr-FR')} DH` : 'Prix sur demande');

// Minuscules sans accents, pour une recherche tolérante (« pompe » trouve « Pompé »).
export const normalize = (s = '') => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
