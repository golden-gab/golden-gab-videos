---
name: visual-storytelling
description: Direction créative pour les vidéos Golden Gab — traduire chaque phrase en image, choisir entre réutiliser et créer, et tenir le rythme d'un Short. À lire avant tout storyboard ou toute scène.
---

# Visual storytelling — Golden Gab Videos

Ce skill tranche le conflit entre **liberté créative** (`docs/VIDEO-DIRECTION.md`, règles 68-73) et **réutilisation** (règles 8, 44, 46, 48).

## 1. Principe : on réutilise le moteur, pas la composition

- **Toujours réutilisé** (aucune liberté) : `AnimatedAppear`, `getStaggerDelay`, `src/config/animation.ts`, tokens de couleur, `Connector`, captions, structure audio-driven, validation d'épisode.
- **Jamais forcé** : les compositions de haut niveau (cartes, listes, `FlowDiagram`, `Callout`…). On les utilise **seulement si elles expriment exactement l'idée de la phrase**.
- En cas de conflit : la direction vidéo décide **quoi montrer** ; la bibliothèque décide **comment l'animer**.

## 2. Échelle de décision (à appliquer à chaque visuel)

1. Un composant existant exprime-t-il l'idée **telle quelle** ? → l'utiliser.
2. Convient-il avec **une prop ou un preset** ? → le paramétrer.
3. Sinon → **le construire dans la vidéo** (JSX/SVG local) avec les primitives et les tokens. C'est le cas normal d'une nouvelle idée visuelle, pas une exception.
4. Le même besoin revient dans une 2ᵉ scène ou une 2ᵉ vidéo ? → **promouvoir** dans `src/components/motion` (données en entrée, pas de `children`).

Interdits : déformer un composant pour qu'il « passe » ; choisir la carte générique par réflexe alors qu'une métaphore plus forte existe ; créer `variant1…N`.

**Test final d'une scène** : si on peut la résumer par « un titre et une carte », elle est probablement trop pauvre. Chercher une image (objet, mock, schéma, mouvement) qui *montre* l'idée.

## 3. Traduire une phrase en image

| La phrase parle de… | Vocabulaire visuel |
|---|---|
| un chiffre, un pourcentage | compteur qui monte, jauge, barre qui se remplit |
| une comparaison | écran scindé, « A vs B », deux colonnes qui se remplissent |
| une liste | éléments qui arrivent un par un, calés sur chaque mot-clé |
| un processus, une cause→effet | chemin tracé (`evolvePath`), flèches, étapes qui s'allument |
| une position, un classement | liste/résultats avec **saut de rang** (ex. de #2 à #62), échelle, podium |
| un outil, un site, une app | **mock d'interface** (navigateur, résultats Google, chat, notification) |
| un problème, une erreur | tremblement bref, accent d'alerte, élément barré |
| une personne, une émotion | mascotte (pose réelle) ou photo détourée |
| avant / après | wipe, bascule, double état du même objet |
| une idée abstraite | métaphore concrète (balance, pont, entonnoir, clé, loupe) |

## 4. Rythme et mouvement

- Un **changement visible toutes les 1 à 2 secondes** : nouvel élément, zoom, déplacement, surbrillance. Un cadre immobile plus de 2 s est une faute.
- **Synchroniser** : chaque élément clé apparaît sur le mot qui le nomme (`visual.revealOffsets` depuis le transcript).
- Ne pas enchaîner deux scènes de même disposition. Alterner : plein cadre typo → mock → objet → mascotte.
- Toute scène passe par `SceneShell` quand il existe : caméra lente, parallaxe, grain léger, transitions. Une scène « posée » sans mouvement de caméra est incomplète.
- Accent de couleur : **un seul mot ou chiffre par plan** porte l'accent, c'est lui que l'œil doit lire.
- Son : prévoir un SFX aux apparitions fortes seulement, jamais à chaque élément, et une musique discrète sous la voix (duckée pendant les mots du transcript).

## 5. Mascotte

Elle intervient quand elle **réagit ou accompagne** l'explication (surprise, validation, doute), pas par défaut. Pose réelle uniquement (registre `mascotPoses`). Si la pose voulue manque : la noter « pose à générer » dans le storyboard et passer par `docs/MASCOT-POSES.md`.

## 6. Méthode de travail

1. Lire la transcription, découper en **beats** (une idée = un beat).
2. Écrire le storyboard : `beat | phrase | visuel | source (existant / local / asset-sourcing) | animation | sfx`.
3. Marquer chaque ligne « réutilise » ou « crée local » **avec la raison**.
4. Construire, rendre quelques *stills* aux moments clés, corriger.
5. Fin de tâche : indiquer ce qui a été réutilisé, créé localement, et ce qui mérite une promotion.

## 7. Checklist

- [ ] Chaque idée importante a une image qui l'explique.
- [ ] Aucune scène « titre + carte » par défaut.
- [ ] Changement visuel toutes les 1-2 s, calé sur la narration.
- [ ] Aucune couleur hors tokens, aucun chemin d'asset en dur.
- [ ] Assets externes tracés dans le manifeste.
- [ ] Mascotte : pose réelle, intention narrative.
