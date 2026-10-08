# Direction éditoriale et visuelle des vidéos

Ce document est la consigne permanente pour créer, générer ou revoir une vidéo
Golden Gab. Le lire avant de définir un storyboard : l'utilisateur ne devrait
pas avoir à répéter ces attentes dans chaque demande.

## Principe central

La voix raconte ; l'image démontre. Le timing réel de la voix et de sa
transcription pilote les captions, les scènes et les animations. Une scène ne
se résume pas à un titre qui reste affiché pendant toute une phrase.

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
- Seules les poses présentes dans `mascotPoses` sont disponibles au rendu. Les
  fichiers émotionnels présents dans
  `public/assets/images/mascot/` (thinking, surprised, happy, explaining)
  doivent d'abord être ajoutés au registre des assets et des poses avant usage.
  Ne pas simuler une expression par une attitude.

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
