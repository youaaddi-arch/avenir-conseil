# Catalogue IT — Couche contenu Sanity

Le catalogue IT (`formations-it.html`) est piloté par un **modèle de contenu Sanity**.
En attendant la connexion à un vrai projet Sanity, la page lit le même dataset depuis
`../data/formations-it.json` (et un repli intégré), si bien que le contenu et le rendu
sont **identiques** une fois Sanity branché.

## Contenu

- `schemaTypes/formationIt.ts` — schéma du document **Formation IT**
- `schemaTypes/index.ts` — export des types
- `formations-it.ndjson` — le dataset (1 document par ligne), prêt à importer

## Brancher un vrai projet Sanity

```bash
# 1. Créer un projet + dataset public
npm create sanity@latest -- --template clean --create-project "Avenir Conseil IT" --dataset production

# 2. Copier le schéma
cp schemaTypes/formationIt.ts <studio>/schemaTypes/
#    et l'enregistrer dans schemaTypes/index.ts

# 3. Importer le dataset
npx sanity dataset import formations-it.ndjson production

# 4. Autoriser le site (CORS) — ajouter les origines
npx sanity cors add http://localhost:8090
npx sanity cors add https://votre-domaine
```

## Connecter le front

Dans `../formations-it.js`, renseigner `SANITY.projectId` et `SANITY.dataset`.
La page interrogera alors l'API publique via GROQ :

```groq
*[_type == "formationIt"] | order(order asc){
  title, slug, category, categoryColor, level,
  durationDays, durationHours, price, isNew,
  summary, objectives, audience, prerequisites, program, tools
}
```

Si la requête Sanity échoue (projet non encore connecté), la page bascule
automatiquement sur le dataset local — aucune page vide.
