# STE Agri Hydro Solution : catalogue e-commerce

État : **Étape 4** (identité visuelle, accueil, boutique, fiche produit, à propos, contact — données d'exemple).
Backend PHP/MySQL et admin : étapes 5 et 6 (le dossier `backend/` n'existe pas encore).

## Lancer le frontend
```
cd frontend
npm install
npm run dev      # http://localhost:5173 (port fixe)
npm run build    # génère frontend/dist
```
Prérequis : Node.js 18+.

## Pages
- `/` accueil · `/boutique` (paramètres `q`, `categorie`, `promo=1`, `tri=nouveautes|prix-asc|prix-desc`)
- `/produit/:slug` · `/a-propos` · `/contact` (le formulaire prépare un message WhatsApp)

## Où modifier quoi
- Couleurs : `frontend/src/styles/tokens.css`
- Coordonnées, horaires, URL du site, catégories, produits d'exemple, slides : `frontend/src/data/mock.js`
  (règles des produits en commentaire dans ce fichier : slug sans accents, prix absent = « Prix sur demande »…)
- Message WhatsApp : `frontend/src/utils/whatsapp.js`
- Logo : `frontend/public/brand/logo.png` (extrait d'une image, à remplacer par l'original)

## Mise en ligne (Cloudflare) — production actuelle
Site en ligne : https://agri-hydro.agri-hydro-frontend.workers.dev
```
cd frontend
npx wrangler login   # une seule fois
npm run deploy       # build + wrangler deploy (config : frontend/wrangler.jsonc)
```
Les URL de l'application (`/boutique`, `/produit/...`) sont renvoyées vers `index.html`
grâce à `not_found_handling: "single-page-application"` dans `wrangler.jsonc`.

## Mise en ligne (Apache)
`frontend/public/.htaccess` est copié dans `dist/` : il renvoie les URL de l'application vers `index.html`.
Renseigner `settings.siteUrl` dans `mock.js` pour que les liens produits envoyés sur WhatsApp pointent vers le vrai site.

⚠️ Tout ce qui est dans `frontend/public/` est publié tel quel : n'y placez aucun document personnel.
