import { settings } from '../data/mock.js';

const siteOrigin = () => (settings.siteUrl || window.location.origin).replace(/\/$/, '');
export const productUrl = (p) => `${siteOrigin()}/produit/${p.slug}`;

/** items = [{ product, quantity }] */
export function buildOrderMessage(items) {
  const lines = items.map(({ product, quantity }) =>
    [`• ${product.name}`, `  Réf : ${product.ref}`, `  Quantité : ${quantity}`, `  Lien : ${productUrl(product)}`].join('\n'));
  return `Bonjour, je souhaite commander :\n\n${lines.join('\n\n')}\n\nMerci de me confirmer la disponibilité et le prix.`;
}

export const whatsappLink = (text, number = settings.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const orderLink = (items) => whatsappLink(buildOrderMessage(items));
