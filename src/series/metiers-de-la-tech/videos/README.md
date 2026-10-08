# `metiers-de-la-tech/videos`

Un fichier = une vidéo. Exemple de nommage : `data-analyst.tsx`.

Chaque fichier exporte le composant vidéo **et** sa composition est
enregistrée explicitement dans `../index.tsx` (voir docs/ARCHITECTURE.md).

Une vidéo assemble des composants existants (`GoldenGabIntro`,
`GoldenGabOutro`, `Captions`, éléments de marque, `SafeArea`…) et ne doit
créer un composant local que si celui-ci est réellement spécifique à la série.

L'épisode de référence `mdt-data-analyst` est défini dans
`./reference-episode.tsx`. Sa narration audio-driven est attendue dans
`public/audio/mdt-data-analyst-voice.mp3`. La transcription française et ses
timestamps ont été produits localement avec Whisper.cpp puis reliés aux scènes.
Les illustrations synchronisées avec les idées de la narration sont dans
`./reference-episode-scene.tsx` ; le modèle du storyboard, les captions et les
interventions de la mascotte restent décrits dans `../data/reference-episode.ts`.
Le rendu MP4 final reste à effectuer.
