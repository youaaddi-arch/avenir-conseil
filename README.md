# Avenir Conseil — Refonte premium (site multi-pages)

Refonte moderne, **sobre et premium** du site **avenir-conseil.fr** : un vrai site
**multi-pages** présentant l'offre de déploiement des **SI Métiers / PLM** d'Avenir
Conseil, spécialiste de la transformation numérique des industriels (groupe ALTEN).

Identité : **noir + blanc cassé + accent doré** (charte du logo), images, typographie
Sora + Inter. Aucune dépendance, aucun build — du HTML/CSS/JS natif.

## 🗂️ Pages

| Page | Fichier |
|------|---------|
| Accueil | `index.html` |
| Notre offre | `offre.html` |
| Expertises | `project.html` · `change.html` · `training.html` · `operations.html` · `support.html` |
| Digital Learning (edufactory) | `digital-learning.html` |
| Fournisseur exclusif UGAP | `ugap.html` |
| Catalogue formation | `catalogue.html` → `catia.html` · `3dexperience.html` |
| À propos | `a-propos.html` |
| Nous rejoindre | `nous-rejoindre.html` |
| Contact | `contact.html` |

Ressources partagées : `styles.css` (design system) et `script.js` (menu, scroll
reveal, compteurs animés, repli des images, validation du formulaire).

## ✨ Contenu réel intégré

- Citation de la Directrice Générale, les 5 expertises détaillées (domaines + chiffres
  clés + **réalisations clients**), edufactory, référence **UGAP 2023–2026**.
- Catalogues **CATIA V5** (12 formations) et **3DEXPERIENCE** (8 formations) extraits
  des PDF officiels (références, durées, tarifs, modalités, accessibilité).
- Agences Paris / Lyon / Madrid et coordonnées réelles.

## 🚀 Aperçu en local

```bash
cd avenir-conseil
python3 -m http.server 8080
# puis http://localhost:8080
```

> Les images utilisent des photos de banque (Unsplash) avec repli automatique ; à
> remplacer par les visuels et le logo officiels avant mise en production. Les contenus
> proviennent des pages publiques et des catalogues PDF d'Avenir Conseil, à valider
> avant diffusion.
