# Golden Gab Vidéos : contexte pour Claude

Projet Remotion, shorts TikTok 9:16, marque Golden Gab. L'utilisateur écrit en français. Lire `docs/RULES.md`, `docs/VIDEO-DIRECTION.md` (section « Zones d'un plan ») et `docs/DECISION_LOG.md` avant de produire.

## Standard de qualité des animations (épisodes pilotés par l'audio)

Référence : « Tu dors déjà » et « C'est quoi un site web » (`src/series/web-story`).

1. **Un message par plan, 3 mots de texte au maximum.** Pas de texte forcé ni de faux paragraphes : on dessine des blocs fantômes (`Skeleton`, `Lines`). Les captions portent déjà la parole.
2. **Aucun chevauchement** entre captions, mascotte et illustration. Chaque plan déclare un gabarit (`Shot layout="art | side-left | side-right | stack-left | stack-right | mascot"`) ; les rectangles viennent de `src/components/motion/stage/zones.ts` (testé). Ne jamais placer ces trois éléments à la main.
3. **Tout est visible dès le début du plan** (jamais de plan vide ni de `scale(0)` qui attend un mot). Les mots déclenchent des *réactions* (`punch`, `lit`, `shake`, `useWordClock().at(mot, n)`), pas des apparitions.
4. **Mascotte seulement quand un mot l'appelle** (surprise, explication, joie), dans sa zone (`ZoneMascot`) ; mirrored si placée à gauche.
5. **Illustration dans sa zone** via `Art w h` (mise à l'échelle automatique). Pas de pilule plus large que sa carte, pas de contenu qui déborde (`overflow:hidden` pour les défilements).
6. Éviter le layout `stack-*` avec la voie captions `center` : utiliser `side-*` ou `art`.
7. Le bas de l'écran reste vide (interface TikTok).

## Méthode de travail

- Transcript mot à mot dans `data/transcript.ts` ; les clés de `clock.at("mot")` doivent exister dans la scène (ponctuation normalisée).
- Briques partagées dans `src/series/web-story/kit.tsx` ; promouvoir un composant réutilisé dans `src/components/motion` (règle 46).
- Tokens uniquement (`colors`, `radius`, `strokeWidths`), pas d'animations CSS, séries en kebab-case.
- Vérifier : `npm run lint` et `npm test`, puis rendre un still par plan et **regarder** des planches (montage) avant de conclure. Corriger tout chevauchement ou débordement.
- Toujours ajouter une entrée dans `docs/DECISION_LOG.md`.

## Environnement de rendu (sandbox cloud)

- Réseau restreint : Google Fonts et HuggingFace bloqués → Whisper impossible ici (l'utilisateur lance `node scripts/transcribe-audio.mjs` chez lui) ; polices servies par un petit serveur local sur 127.0.0.1:8765 qui doit tourner pendant les rendus.
- Chromium : `--browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`, `--concurrency=2`.
- Les rendus complets durent 30 à 60 min : les lancer détachés (`setsid nohup … & disown`) et surveiller le log.
- Git : trailers de commit `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` et `Claude-Session: <url de session>`. Ne pas réécrire les commits de l'utilisateur sans son accord.
