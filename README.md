# Golden Gab — production vidéo

Chaîne de production des vidéos courtes verticales (TikTok / 9:16) de la marque
**Golden Gab**, construite sur Remotion.

Ce repository fournit l'architecture, le design system, le système de captions
et les composants réutilisables nécessaires pour produire rapidement plusieurs
séries de vidéos.

## Documentation (à lire avant de coder)

| Fichier | Contenu |
| --- | --- |
| [docs/CONTEXT.md](docs/CONTEXT.md) | le projet, sa mission, sa philosophie |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | structure, systèmes internes, où placer un fichier |
| [docs/RULES.md](docs/RULES.md) | règles à respecter |
| [docs/ROADMAP.md](docs/ROADMAP.md) | priorités, état du projet et roadmap |
| [docs/DECISION_LOG.md](docs/DECISION_LOG.md) | mémoire de décisions et changements récents des agents IA |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | direction artistique, tokens, usages |
| [docs/VIDEO-DIRECTION.md](docs/VIDEO-DIRECTION.md) | principes éditoriaux, liberté de storyboard et direction visuelle |

## Commandes

**Installer les dépendances**

```console
npm i
```

**Ouvrir le Studio Remotion**

```console
npm run dev
```

**Vérifier le code**

```console
npm run lint        # eslint src && tsc
```

**Vérifier les compositions détectées**

```console
npx remotion compositions
```

**Rendre une frame (QA visuelle rapide)**

```console
npx remotion still Styleguide out/frame.png --frame=420
```

**Rendre une vidéo**

```console
npx remotion render
```

**Mettre à jour Remotion**

```console
npx remotion upgrade
```

## Organisation en un coup d'œil

```text
src/
├── config/          design system (couleurs, typographies, format, assets)
├── captions/        système de captions réutilisable
├── components/      composants réutilisables (marque, intro, outro, communs)
├── compositions/    assemblage des compositions Remotion
├── series/          contenu, une série = un dossier
└── utils/           helpers purs
```

Ajouter une vidéo = créer un fichier dans `src/series/<serie>/videos/` et
l'enregistrer dans `src/series/<serie>/index.tsx`.
Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#organisation-des-vidéos).

## Assets externes (icônes, photos, b-roll)

Le script `npm run asset` récupère les assets dans
`public/assets/library/` et les trace dans `src/config/assets.manifest.json`.
Ils se lisent ensuite via `src/config/assetLibrary.ts` (jamais un chemin en
dur). Les icônes (Iconify) ne demandent aucune clé.

Pour les photos et le b-roll, une clé **gratuite** suffit — **une seule des
deux** ; le script bascule automatiquement de l'une à l'autre :

- **Pixabay** : <https://pixabay.com/api/docs/> (la clé s'affiche après connexion)
- **Pexels** : <https://www.pexels.com/api/>

Copier `.env.example` en `.env` et renseigner la valeur :

```console
cp .env.example .env
# puis dans .env : PIXABAY_API_KEY=… et/ou PEXELS_API_KEY=…
```

`.env` est ignoré par Git (voir `.gitignore`) : ne jamais le committer.

```console
npm run asset -- search icon "receipt"
npm run asset -- get icon lucide:receipt --id receipt --tags facture,paiement
npm run asset -- search photo "restaurant kitchen" --orientation portrait
npm run asset -- get photo pixabay:7654321 --id kitchen-pass --tags cuisine
npm run asset -- list
```

## Captioning (transcription Whisper)

Remplacez `sample-video.mp4` par votre fichier vidéo, puis transcrivez les
vidéos présentes dans `public/` :

```console
node sub.mjs
```

Transcrire une seule vidéo :

```console
node sub.mjs <chemin-vers-la-video>
```

Transcrire un dossier :

```console
node sub.mjs <chemin-vers-le-dossier>
```

Le pipeline télécharge Whisper.cpp et le modèle `medium.en`. Voir
`whisper-config.mjs`. Pour le français, changez `WHISPER_MODEL` en un modèle
sans suffixe `.en` et `WHISPER_LANG` en `fr`.

Les captions produites (format `Caption[]`) se branchent sur le design system
Golden Gab via `fromRemotionCaptions()` de `src/captions` — voir
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#système-de-captions).

## Docs Remotion

- [Les fondamentaux](https://www.remotion.dev/docs/the-fundamentals)
- [Discord](https://remotion.dev/discord)
- [Issues](https://github.com/remotion-dev/remotion/issues/new)

## License

Note that for some entities a company license is needed.
[Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
