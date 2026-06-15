# Avenir Conseil — Refonte moderne du site vitrine

Maquette de refonte du site **avenir-conseil.fr** : une vitrine moderne, rapide et
responsive pour présenter l'offre PLM / MES / SI Métier d'Avenir Conseil.

> Réalisée comme démonstration de prestation. Les contenus (chiffres, descriptions)
> sont une reconstitution à partir d'informations publiques et restent à valider
> avec l'entreprise.

## ✨ Points forts

- **Design moderne** : thème sombre, dégradés, glassmorphism, typographie soignée (Sora + Inter).
- **Animations** : apparition au scroll, compteurs animés, header dynamique — respect de `prefers-reduced-motion`.
- **100 % responsive** : du mobile au grand écran, avec menu mobile.
- **Sans build, sans dépendance** : HTML/CSS/JS natif. Ouvrez `index.html` et c'est tout.
- **Accessible & SEO-ready** : balises sémantiques, méta Open Graph, contrastes soignés.

## 🗂️ Structure

```
index.html    Structure et contenu des sections
styles.css    Design system + mise en page responsive
script.js     Interactions (scroll reveal, compteurs, menu, formulaire)
```

## 🚀 Aperçu en local

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## 🧩 Sections

Hero · Expertises (Project, Change, Training, Operations, Support) · Approche ·
Secteurs (Automobile, Énergie, Santé) · Chiffres clés · Contact.

## 🔧 Personnalisation rapide

- **Couleurs** : variables CSS en haut de `styles.css` (`--brand`, `--brand-2`, `--accent`).
- **Contenu** : directement dans `index.html`.
- **Formulaire** : `script.js` gère une validation front ; brancher un endpoint
  (email, CRM…) pour un envoi réel.
