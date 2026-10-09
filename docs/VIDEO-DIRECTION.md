# Direction éditoriale et visuelle des vidéos

Ce document est la consigne permanente pour créer, générer ou revoir une vidéo
Golden Gab. Le lire avant de définir un storyboard : l'utilisateur ne devrait
pas avoir à répéter ces attentes dans chaque demande.

## Principe central

La voix raconte ; l'image démontre. Le timing réel de la voix et de sa
transcription pilote les captions, les scènes et les animations. Une scène ne
se résume pas à un titre qui reste affiché pendant toute une phrase.

## Liberté narrative — aucun flow imposé

Chaque vidéo doit trouver sa propre forme à partir de son audio, de son sujet
et de l'émotion recherchée. Il n'existe pas de succession obligatoire de type
« hook → question → explication → exemple → insight → conclusion », ni de
nombre de scènes ou de composants à reproduire d'un épisode à l'autre.

- Les structures et storyboards montrés dans la roadmap, le styleguide ou les
  épisodes existants sont des exemples et des références, jamais des templates
  éditoriaux obligatoires.
- Choisir librement l'ordre, le rythme et la durée des scènes : commencer par
  une image intrigante, une action, un résultat, une question ou toute autre
  entrée adaptée à la narration. Fusionner ou omettre des étapes si elles
  n'apportent rien ; ajouter une scène ou une métaphore si elle clarifie le
  propos.
- Ne pas attribuer mécaniquement un composant différent à chaque phrase et ne
  pas reconduire le même flow simplement parce qu'il a servi dans une vidéo
  précédente. Réutiliser les composants pour leur pertinence, pas pour remplir
  une grille.
- Considérer les champs du storyboard comme des outils de conception : préciser
  les objectifs, durées, visuels, captions, transitions, interventions de la
  mascotte ou assets supplémentaires quand ils aident à réaliser la vidéo,
  sans transformer leur liste en recette de narration.
- Prendre des initiatives visuelles cohérentes avec la DA Golden Gab :
  illustrations originales, formes, objets, métaphores, emoji et assets
  complémentaires pertinents sont possibles. Pour les assets externes, vérifier
  leur adéquation à la DA, leur qualité et leurs droits d'utilisation.

Cette liberté porte sur la mise en scène, pas sur l'exactitude : préserver le
sens de la voix, ne pas inventer de faits ou de chiffres, respecter la direction
artistique et garder le contenu lisible. La mascotte est disponible lorsque sa
présence sert ce récit singulier ; elle n'est ni obligatoire dans chaque vidéo
ni à assigner à une étape fixe.

Pour chaque phrase ou idée importante, se demander :

1. Que doit comprendre le spectateur ?
2. Quel objet, donnée, action, comparaison ou métaphore rend cette idée
   immédiatement visible ?
3. Quel élément doit apparaître ou évoluer pendant que la voix le dit ?
4. La mascotte apporte-t-elle une réaction ou une explication utile ?

## Storyboard et illustration

- Associer à chaque beat narratif au moins une intention visuelle explicite.
- Préférer une illustration concrète à un écran composé uniquement d'un titre :
  par exemple une entreprise, des produits, des ventes qui s'accumulent et un
  indicateur qui monte pour illustrer une question sur l'évolution des ventes.
- Pour une définition, mettre le concept ou le rôle au premier plan ; une
  icône/emoji peut le soutenir, mais ne remplace pas l'explication visuelle.
- Représenter les relations et les transformations avec les composants Motion
  existants (`FlowDiagram`, `AnimatedList`, `Stat`, `BeforeAfter`, etc.) avant
  d'ajouter un nouveau composant.
- Une donnée chiffrée ne doit être animée en compteur que si la narration lui
  donne une quantité ou une progression réelle. Ne pas inventer de chiffres.
- Les illustrations servent le propos et ne doivent pas répéter mot pour mot
  tout le script à l'écran.

## Moyens visuels

La direction décide **ce qu'on montre** ; la bibliothèque décide **comment on
l'anime**. Pour choisir un moyen visuel (réutiliser, paramétrer, créer, ou
sourcer un asset externe), suivre les skills :

- **`visual-storytelling`** — échelle de décision et vocabulaire visuel :
traduire chaque idée en image, tenir le rythme, faire intervenir la mascotte
avec intention.
- **`asset-sourcing`** — recherche et enregistrement d'assets externes (icônes,
photos, vidéos, lottie) avec licence et provenance.

Échelle de décision, à appliquer à chaque visuel :

1. un composant existant exprime l'idée telle quelle → **l'utiliser** ;
2. il convient avec une prop ou un preset → **paramétrer** ;
3. sinon → **créer localement** dans la vidéo avec les primitives et les
tokens (cas normal d'une nouvelle idée, pas une exception) ;
4. le besoin revient dans une 2e scène ou une 2e vidéo → **promouvoir** dans
`src/components/motion` (règle 46).

## Rythme et animation

- Maintenir du mouvement **à l'intérieur** des scènes, pas uniquement lors des
  changements de scène.
- Synchroniser les révélations à la phrase ou au mot couvert par les timestamps
  du transcript : une liste s'affiche point par point, un diagramme se construit,
  un chiffre progresse, une transformation se révèle.
- Pour `FlowDiagram` et `AnimatedList` dans une scène audio-driven, renseigner
  `visual.revealOffsets` : une liste croissante d'offsets en secondes depuis le
  début de la scène, un offset par élément. Leur validation rejette les valeurs
  hors scène ; sans ce champ, les composants gardent leur stagger habituel.
- Garder les éléments visibles assez longtemps pour être lus ; éviter les
  apparitions simultanées de tout le contenu au début de la scène.
- Utiliser les animations Remotion déterministes du projet, `AnimatedAppear`,
  `getStaggerDelay` et les props temporelles des composants. Pas d'animations
  CSS ni de timing arbitraire qui contredit la voix.
- Une transition de scène et l'animation interne sont deux outils différents ;
  animer une scène ne dispense pas de faire progresser son contenu.

## Captions

- Pour une vidéo audio-driven, choisir le preset `highlight` de
  `src/captions/styles.ts` : le mot prononcé est blanc sur un cartouche bleu
  nuit Golden Gab ; les autres mots sont blancs avec contour sombre.
- Le mot actif vient des timestamps mot à mot ; ne pas simuler le karaoké par
  une seule couleur fixe sur une phrase entière.
- Garder les captions courtes, lisibles sur mobile et dans leur zone sûre.
- La référence visuelle fournie montre un fond bleu vif. Le preset utilise le
  bleu nuit (`colors.secondary`) pour respecter la palette actuellement
  documentée ; ne pas introduire une nouvelle couleur de marque sans décision
  explicite.

## Mascotte

- La mascotte intervient ponctuellement quand elle clarifie, questionne,
  réagit ou conclut ; elle ne doit ni apparaître dans chaque scène ni servir
  d'ornement.
- Choisir pose, attitude, position et durée selon le beat narratif ; préserver
  les titres, les données, les visuels et les captions.
- Les attitudes actuelles (`curious`, `surprised`, `confident`, etc.) modulent
  le mouvement, mais ne changent pas l'expression du PNG.
- Seules les poses présentes dans `mascotPoses` sont disponibles au rendu :
  `thinking`, `surprised`, `happy`, `explaining` et `point`. Les poses encore
  absentes du registre ne doivent pas être simulées par une attitude.
- Ne jamais brancher un candidat de `public/assets/images/mascot/_pending/` dans
  une scène : ce dossier est une salle d'attente, pas une source. Un candidat
  n'entre dans une vidéo qu'après promotion (`docs/MASCOT-POSES.md`).

## Revue avant rendu

- Chaque phrase clé a-t-elle une représentation visuelle pertinente ?
- Les éléments progressent-ils au rythme de la narration à l'intérieur des
  scènes ?
- Les données, exemples et chiffres sont-ils exacts et non inventés ?
- Le mot courant est-il mis en évidence avec le style choisi et lisible sur
  chaque fond ?
- La mascotte intervient-elle avec intention sans masquer le contenu ?
- Le storyboard respecte-t-il la durée réelle de l'audio, ses timestamps et la
  zone sûre verticale ?
