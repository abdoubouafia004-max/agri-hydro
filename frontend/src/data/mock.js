// Données temporaires (EXEMPLES). À l'étape 5 elles viennent de l'API PHP / MySQL.
export const settings = {
  name: 'STE Agri Hydro Solution',
  legal: 'STE Agri Hydro Solution SARL',
  tagline: "L'eau, notre expertise… pour un avenir durable",
  phone: '06 72 85 41 29',
  phoneHref: '+212672854129',
  whatsapp: '212672854129', // format international, sans + ni espaces
  email: '',                 // à confirmer
  address: '40 Bd Ahfir Casa Espana, Oujda',
  instagram: 'https://www.instagram.com/steagrihydrosolution',
  contactName: 'Abbaoui Abdenbi',
  hours: 'Du lundi au samedi',
  // URL publique du site (ex. https://www.agrihydro.ma). Utilisée dans les liens produits
  // envoyés sur WhatsApp ; si vide, l'adresse courante du navigateur est utilisée.
  siteUrl: 'https://agri-hydro.agri-hydro-frontend.workers.dev',
};

export const categories = [
  { slug: 'osmoseurs', name: 'Osmoseurs', icon: 'fa-faucet-drip' },
  { slug: 'pompes', name: 'Pompes', icon: 'fa-gauge-high' },
  { slug: 'irrigation', name: 'Irrigation', icon: 'fa-seedling' },
  { slug: 'testeurs', name: 'Testeurs', icon: 'fa-vial' },
  { slug: 'accessoires', name: 'Accessoires', icon: 'fa-screwdriver-wrench' },
];

export const heroSlides = [
  { id: 1, kind: 'ro', title: "L'eau pure, directement à votre robinet",
    points: ['Osmoseurs pour la maison et les professionnels', 'Solutions hydrauliques adaptées à votre eau', 'Conseil et accompagnement à Oujda'],
    cta: 'Voir les osmoseurs', to: '/boutique?categorie=osmoseurs' },
  { id: 3, kind: 'drip', title: 'Irrigation et pompage pour une agriculture durable',
    points: ['Goutte-à-goutte et tuyauterie', 'Pompes de surface et immergées', 'Conseil pour votre exploitation'],
    cta: "Voir l'irrigation", to: '/boutique?categorie=irrigation' },
];

// Prix et références d'exemple.
// - slug : minuscules, sans accents ni espaces (utilisé dans l'URL /produit/:slug)
// - price absent ou 0 => « Prix sur demande »
// - promoPrice doit être inférieur à price, sinon il est ignoré
// - image absente => illustration générée selon `kind` (ro, cartridge, pump, drip, tester)
export const products = [
  { id: 1, slug: 'osmoseur-6-etapes-encastrable', name: 'Osmoseur 6 étapes encastrable', ref: 'AHS-OS-501', category: 'osmoseurs', kind: 'ro', price: 1890, promoPrice: 1690, tag: 'Promo', image: '/products/p3.jpg', bestSeller: true },
  { id: 2, slug: 'osmoseur-7-etapes-pompe-booster', name: 'Osmoseur 7 étapes avec pompe booster', ref: 'AHS-OS-701', category: 'osmoseurs', kind: 'ro', price: 900, image: '/products/p2.jpg', bestSeller: true },
  { id: 3, slug: 'groupe-electrogene-delta-max', name: 'Groupe électrogène Delta Max', ref: 'AHS-FL-P03', category: 'accessoires', kind: 'pump', price: 1000, promoPrice: 999, tag: 'Promo', image: '/products/p4.jpg', bestSeller: true },
  { id: 4, slug: 'motopompe-a-eau', name: 'Motopompe à eau', ref: 'AHS-IR-500', category: 'pompes', kind: 'pump', price: 1600, promoPrice: 1100, tag: 'Promo', image: '/products/p5.jpg.jpeg', bestSeller: true },
  { id: 5, slug: 'semoir-manuel', name: 'Semoir manuel', ref: 'AHS-OS-C01', category: 'accessoires', kind: 'drip', price: 1300, image: '/products/p6.jpg.jpeg', bestSeller: true },
  { id: 6, slug: 'compresseur-d-air', name: 'Compresseur d’air', ref: 'AHS-FL-M75', category: 'accessoires', kind: 'pump', price: 1500, tag: 'Nouveau', image: '/products/p7.jpg.jpeg', bestSeller: true, isNew: true },
  { id: 7, slug: 'tuyau-d-arrosage', name: 'Tuyau d’arrosage', ref: 'AHS-PO-075', category: 'irrigation', kind: 'drip', price: 400, tag: 'Nouveau', image: '/products/p8.jpg.jpeg', bestSeller: true, isNew: true },
  { id: 8, slug: 'testeur-tds-numerique', name: 'Testeur TDS numérique', ref: 'AHS-TE-TDS', category: 'testeurs', kind: 'tester', price: 120, bestSeller: true },
  { id: 9, slug: 'pompe-immergee-vide-cave', name: 'Pompe immergée vide-cave avec flotteur', ref: 'AHS-PO-VC1', category: 'pompes', kind: 'pump', tag: 'Nouveau', image: '/products/p9.jpg.jpeg', isNew: true },
  { id: 10, slug: 'pompes-immergees-forage', name: 'Pompes immergées pour forage', ref: 'AHS-PO-FR4', category: 'pompes', kind: 'pump', tag: 'Nouveau', image: '/products/p10.jpg.jpeg', isNew: true },
];

// Exemples à remplacer par de vrais avis (gérés depuis l'admin à l'étape 6).
export const testimonials = [
  { id: 1, name: 'Client particulier', city: 'Oujda', text: "Explications claires et installation propre. L'eau a vraiment meilleur goût au quotidien." },
  { id: 2, name: 'Café-restaurant', city: 'Oujda', text: 'Un conseil adapté à notre usage professionnel, et un suivi sérieux après l’installation.' },
  { id: 3, name: 'Exploitant agricole', city: 'Oriental', text: "Ils ont dimensionné notre système d'irrigation et fourni les pièces rapidement." },
];

export const categoryBySlug = (slug) => categories.find((c) => c.slug === slug);
export const productBySlug = (slug) => products.find((p) => p.slug === slug);
