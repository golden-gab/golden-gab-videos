# Storyboard — Data Analyst (épisode test)

## Source et intention

- Audio : `public/audio/mdt-data-analyst-voice.mp3` (25,08 s).
- Le transcript français mot à mot est déjà produit localement par Whisper.cpp
  (`base`, `fr`) et sert de source temporelle. Il sera réutilisé sans
  réécriture ni nouveau décalage manuel.
- Intention : faire voir le passage de données de vente brutes à une décision
  compréhensible, dans la DA bleu nuit Golden Gab.
- Captions : preset `highlight`, dérivé du transcript.
- Mascotte : aucune ; les interfaces et les transformations de données
  expliquent mieux ces beats, sans pose réelle nécessaire.
- Son : `whoosh` à l’ouverture du tableau de bord et `ding` à la révélation
  finale seulement (fichiers SFX présents). Aucun fichier musical n’est
  actuellement déposé dans `public/audio/music/` ; pas de musique tant qu’un
  fichier n’y est pas ajouté.

## Storyboard

| Beat / temps audio | Phrase (transcript réel) | Visuel | Source | Animation | SFX |
|---|---|---|---|---|---|
| 1 · 0,00–5,44 s | « Imaginez une entreprise qui vend des milliers de produits chaque mois, mais lesquels se vendent vraiment. » | Plein cadre bleu nuit : des silhouettes de produits s’accumulent, puis un repère de calendrier évoque les ventes mensuelles. Sur « lesquels », un mock de résultats de ventes montre un produit qui remonte d’une ligne à la première position ; il s’agit d’un schéma, sans classement chiffré ni donnée de vente inventée. | **Crée local** — aucun composant existant ne matérialise l’abondance puis le tri des résultats ; silhouettes et interface génériques évitent tout asset externe. | Les produits arrivent sur « milliers » (1,86 s), le calendrier apparaît sur « chaque mois » (2,94 s), puis une ligne remonte dans les résultats sur « lesquels » (3,90 s). Accent unique sur le résultat sélectionné. | Aucun : garder le hook lisible. |
| 2 · 5,44–7,88 s | « C’est là qu’intervient le data analyst. » | Le mock navigateur s’ouvre sur un tableau de bord sobre ; titre cinétique « DATA ANALYST », avec un seul mot accentué. | **Crée local** — le mock d’interface est spécifique à la démonstration et ne requiert ni logo ni asset externe. Réutilise les tokens et le système de captions. | Ouverture du navigateur au début du beat ; à « data » (7,05 s), le premier mot du titre entre ; à « analyst » (7,33 s), le mot accentué entre avec le graphique d’aperçu. | `whoosh` à l’ouverture du navigateur (5,44 s). |
| 3 · 7,88–12,48 s | « Son rôle est de transformer des données brutes en informations utiles. » | Lignes et cellules anonymes quittent le tableau, traversent une transformation graphique, puis deviennent un graphique et une synthèse lisible côte à côte. | **Crée local** — une transformation avant/après rend le verbe concret ; aucune statistique fictive n’est affichée. | Le flux démarre sur « transformer » (8,87 s) ; les cellules apparaissent sur « données » (9,78 s), se désorganisent sur « brutes » (10,34 s), puis se recomposent en visuels sur « informations » (10,95 s) et se simplifient sur « utiles » (11,91 s). | Aucun. |
| 4 · 12,48–19,28 s | « Identifier les tendances, comprendre les comportements et aider l’entreprise à prendre de meilleures décisions. » | Le graphique révèle une tendance, une grille de comportements reste volontairement qualitative, puis un embranchement conduit à une décision. Trois étiquettes empilées : « tendances », « comportements », « décisions ». | **Crée local** — le triptyque visuel traduit les trois idées exactes de la phrase sans transformer une composition générique en faux tableau de bord. Réutilise `AnimatedAppear` et les tokens. | Le tracé se dessine sur « identifier » (12,48 s), l’étiquette « tendances » arrive au mot (13,48 s), la grille s’allume sur « comprendre » (14,36 s), « comportements » s’empile à 15,22 s, puis une branche apparaît sur « aider » (16,23 s) et l’étiquette « décisions » se pose autour de 18,42 s. | Aucun : les révélations restent synchronisées à la voix. |
| 5 · 19,28–22,68 s | « En clair, il ne se contente pas de regarder des chiffres. » | Gros plan sur une grille de chiffres abstraits ; le cadrage recule et une loupe/zone de sélection révèle un motif dans les cellules, plutôt qu’un simple tableau figé. | **Crée local** — la métaphore de la loupe montre la différence entre consulter des chiffres et les analyser ; chiffres décoratifs non interprétables, donc aucun faux résultat. | Les cellules défilent brièvement sur « chiffres » (22,00 s), le mouvement s’arrête, puis une zone cohérente se met en relief avant la coupe. | Aucun. |
| 6 · 22,68–25,08 s | « Il cherche ce qu’il raconte. » (transcript horodaté ; le référent visuel reste le graphique de données) | La zone révélée devient une ligne de tendance et une courte bulle de synthèse visuelle : les données « racontent » une évolution, sans ajouter de conclusion factuelle. | **Crée local** — cette métaphore de clôture répond au dernier verbe et n’existe pas comme composition réutilisable. | Le graphique se rassemble sur « cherche » (22,83 s), puis la ligne forme une bulle/insight sur « raconte » (23,88 s). Fin tenue jusqu’à la fin réelle de la piste. | `ding` discret à la révélation de l’insight (23,88 s). |

## Contrôles prévus après accord

- Chaque scène sera enveloppée dans `SceneShell`; scènes et durée resteront
  bornées par l’audio réel.
- Les captions et les révélations utiliseront les timestamps du transcript ;
  aucune durée ne sera réestimée à partir du script indicatif.
- Au moins 12 changements visuels sont prévus à l’intérieur des beats
  (accumulation, calendrier, tri, ouverture d’interface, sélection, flux,
  recomposition, tracé, étiquettes empilées, embranchement, loupe, insight).
- Stills à rendre à quatre instants distincts : 4,2 s (accumulation/classement), 7,6 s
  (navigateur/titre), 11,2 s (transformation), 17,5 s (étiquettes/décision).
- Après implémentation : passer `npm run lint`, les tests pertinents, la liste
  des compositions Remotion et les vérifications de `docs/RULES.md` §7.
