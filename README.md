# Avenir Conseil — Refonte premium du site vitrine

Refonte moderne et **premium** du site **avenir-conseil.fr** : une vitrine rapide,
responsive et soignée pour présenter l'offre de déploiement des **SI Métiers / PLM**
d'Avenir Conseil, spécialiste de la transformation numérique des industriels (membre du
groupe ALTEN).

## ✨ Points forts

- **Design premium** : thème sombre, dégradés, glassmorphism, grille lumineuse, typographie Sora + Inter.
- **Explorateur d'expertises à onglets** : les 5 domaines (Project, Change, Training, Operations, Support) avec leurs domaines couverts et chiffres clés réels.
- **Section Digital Learning / edufactory** et mise en avant de la référence **UGAP**.
- **Compteurs animés**, apparition au scroll, header dynamique, menu mobile — respect de `prefers-reduced-motion`.
- **Contenu réel** : citation de la DG, agences (Paris / Lyon / Madrid), coordonnées, mentions du groupe ALTEN.
- **Sans build, sans dépendance** : HTML/CSS/JS natif. Ouvrez `index.html` et c'est tout.

## 🗂️ Structure

```
index.html    Structure et contenu des sections
styles.css    Design system premium + responsive
script.js     Onglets d'expertises, compteurs, scroll reveal, menu, formulaire
```

## 🚀 Aperçu en local

```bash
cd avenir-conseil
python3 -m http.server 8080
# puis ouvrir http://localhost:8080 dans le navigateur
```

Ou plus simple, sans serveur :

```bash
open index.html
```

## 🧩 Sections

Hero (positionnement + citation DG) · Notre offre (5 expertises) · Approche ·
Digital Learning / edufactory · Secteurs (Automobile, Énergie, Santé) · Chiffres clés ·
Agences · Contact.

## 🔧 Personnalisation rapide

- **Couleurs** : variables CSS en haut de `styles.css` (`--brand`, `--brand-2`, `--accent`, `--gold`).
- **Expertises** : objet `EXPERTISES` en haut de `script.js`.
- **Contenu** : directement dans `index.html`.
- **Formulaire** : validation front dans `script.js` ; brancher un endpoint (email / CRM) pour un envoi réel.

> Les contenus proviennent des pages publiques d'avenir-conseil.fr. À valider avec
> l'entreprise avant mise en production (visuels, logos et photos réels à intégrer).
