# `metiers-de-la-tech/videos`

Un fichier = une vidéo. Exemple de nommage : `data-analyst.tsx`.

Chaque fichier exporte le composant vidéo **et** sa composition est
enregistrée explicitement dans `../index.tsx` (voir docs/ARCHITECTURE.md).

Une vidéo assemble des composants existants (`GoldenGabIntro`,
`GoldenGabOutro`, `Captions`, éléments de marque, `SafeArea`…) et ne doit
créer un composant local que si celui-ci est réellement spécifique à la série.

Aucune vidéo n'est encore définie : cette tâche construit uniquement le socle.
