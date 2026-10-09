---
name: asset-sourcing
description: Trouver, récupérer et enregistrer les assets visuels d'une vidéo Golden Gab (icônes, photos, b-roll, lottie, illustrations, poses de mascotte) avec licence tracée. À utiliser dès qu'un storyboard demande un visuel qui n'existe pas encore dans le repo.
---

# Asset sourcing — Golden Gab Videos

Un asset n'est jamais « inventé » ni collé depuis une URL : il est **choisi, téléchargé, tracé** dans le manifeste, puis lu via `src/config/assets.ts` (règle 21).

## 1. Avant de chercher

1. Dans le storyboard, liste chaque visuel nécessaire (une ligne par beat).
2. Pour chacun, applique l'arbre ci-dessous **dans l'ordre** et arrête-toi à la première option qui rend l'idée clairement.
3. Vérifie d'abord `src/config/assets.manifest.json` (`node scripts/fetch-asset.mjs list`) : l'asset existe peut-être déjà.

## 2. Arbre de décision

| Besoin | Option | Commande / méthode |
|---|---|---|
| Interface, écran, navigateur, résultats Google, chat, réseau social | **Mock dessiné en code** (SVG/CSS). Pas d'asset externe. | composants `*Mock` de `src/components/motion` ; sinon les construire localement |
| Pictogramme, symbole, objet simple | **Icône Iconify** (lucide, tabler, ph, mdi) | `search icon "…"` puis `get icon set:nom --id … --tags …` |
| Schéma, trait qui se dessine, forme géométrique | **SVG écrit à la main** + `@remotion/paths` (`evolvePath`) / `@remotion/shapes` | local à la vidéo |
| Photo d'ambiance, lieu, personne réelle | **Pexels ou Pixabay** (photo) | `search photo "…" [--orientation portrait]` puis `get photo <fournisseur:id> --id …` |
| B-roll, geste, écran animé | **Pexels ou Pixabay** (vidéo) | `search video "…"` puis `get video <fournisseur:id> --id …` |
| Animation toute faite (loader, confettis, check) | **Lottie** | choisir un fichier libre (LottieFiles), puis `add-url <url> --kind lottie --id … --license "…" --source-url …` ; rendu via `@remotion/lottie` |
| Illustration vectorielle, objet précis introuvable | **Génération IA** + détourage | brief court, sortie dans `public/assets/library/image/`, validation humaine si c'est un élément récurrent |
| Pose de la mascotte | **Workflow `mascot-pose`** (jamais ici) | voir `docs/MASCOT-POSES.md` ; sortie dans `mascot/_pending/` tant que non validée |

Règle d'or : **si un mock ou un SVG peut exprimer l'idée, c'est lui qu'on préfère** à une photo. Les photos servent l'ambiance, pas l'explication.

## 3. Récupération

Toujours depuis la racine du repo :

```bash
node scripts/fetch-asset.mjs search icon "receipt"
node scripts/fetch-asset.mjs get icon lucide:receipt --id receipt --tags facture,paiement

node scripts/fetch-asset.mjs search photo "restaurant kitchen" --orientation portrait
node scripts/fetch-asset.mjs get photo pixabay:7654321 --id kitchen-pass --tags cuisine
```

- `id` en kebab-case, descriptif (`kitchen-pass`, pas `photo1`) ; `--tags` en français, 2 à 5 mots-clés.
- **Deux fournisseurs photo/vidéo** : Pexels (`PEXELS_API_KEY`) et Pixabay (`PIXABAY_API_KEY`). Le script essaie par défaut Pexels puis Pixabay ; si le premier est en panne, sans clé ou sans résultat, il bascule seul sur le suivant. `--provider pixabay` force un fournisseur, `--all` interroge tous ceux qui ont une clé, `ASSET_PROVIDERS=pixabay,pexels` inverse l'ordre.
- Les références renvoyées sont préfixées (`pexels:123`, `pixabay:456`) : les passer telles quelles à `get`. Elles sont propres à chaque fournisseur ; si `get` échoue, refaire une recherche avec l'autre.
- Pixabay n'a pas de filtre d'orientation pour les vidéos : lire les dimensions affichées et préférer le portrait quand il existe.
- Si aucune clé n'est configurée, **dis-le à l'utilisateur** (le script indique où en créer une) au lieu de contourner.
- Un jeu d'icônes hors liste permissive (lucide, tabler, ph, mdi) n'est accepté qu'avec `--license` vérifiée à la source.
- Jamais de **hotlink** : une vidéo doit se rendre identique dans un an, sans réseau (Pixabay l'interdit d'ailleurs pour les images).

## 4. Utilisation dans une scène

- Lire l'asset via les helpers de `src/config/assetLibrary.ts` (`libraryIcon(id)`, `libraryAsset(id)`), jamais via un chemin en dur.
- **Intégrer à la DA** : une photo brute jure avec le bleu nuit. Appliquer le traitement de `LibraryImage` (voile/duotone issu des tokens) ; recolorer les icônes avec les tokens (`currentColor`), jamais une hexadécimale libre.
- Les icônes sont des `<svg>` inline : on peut animer `strokeDashoffset`, l'opacité, l'échelle.

## 5. Licences et traçabilité

- Chaque entrée du manifeste porte `source`, `licence`, `auteur`, `tags`. Une entrée sans licence est un bug.
- Pexels et Pixabay : usage libre, attribution non obligatoire — conserver quand même l'auteur et la source dans le manifeste.
- Ne jamais importer : logos de marques tierces (hors mock générique), personnes identifiables célèbres, contenu sous licence incertaine. En cas de doute → ne pas l'ajouter et le signaler.

## 6. Fin de tâche

- Lister dans la réponse : assets ajoutés (id, source, licence) et assets **manquants** (avec la raison).
- Ne pas committer `.env`.
