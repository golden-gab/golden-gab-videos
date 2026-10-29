# Storyboard — La tech sans jargon · 3 · « C'est quoi le cache ? »

## Source et intention

- Audio : `public/audio/series/tech-sans-jargon/cache.mp3` (63,82 s), voix originale (ElevenLabs, voix Guillaume) boostée de +5,3 dB avec limiteur (−21,5 → −16,2 LUFS, pic −1,7 dBFS).
- Texte : le script final fourni par Gabriel avec l'audio (c'est lui qui fait foi) ; 207 mots.
- Transcription : Whisper n'est pas accessible dans le bac à sable. Les mots du texte final sont placés ainsi : pauses détectées (18 groupes de souffle), répartition des mots de chaque groupe selon les syllabes, frontières recalées sur les creux d'énergie de la voix. Précision ~±150 ms par mot, exacte aux frontières de groupe. Pour des timestamps au mot près : `node scripts/transcribe-audio.mjs` en local, puis remplacer `segments`.
- Intention : expliquer le cache à quelqu'un qui a déjà entendu « vide ton cache » sans comprendre. L'image fil rouge est celle du sel : plutôt que d'aller au marché à chaque fois, on en garde un peu dans sa cuisine ; le téléphone garde de la même façon des copies temporaires (des images, des pages) de ce qu'il a déjà chargé. Puis le revers : ces fichiers prennent de la place, vider le cache les supprime, mais cela ne rend pas forcément le téléphone plus rapide, ne libère pas énormément d'espace et ne touche ni aux comptes ni aux photos. Fin sur la question qui relance les commentaires : « tu le savais déjà ou tu viens de le découvrir ? ».
- Aucune marque dessinée ni citée à l'image : le téléphone, les applications (icônes génériques), la page de site, le pot de sel et l'étal de marché sont génériques. Aucun chiffre : les jauges ne portent aucune valeur, la part libérée est volontairement minuscule. Pas de musique.
- Standard de qualité : voir `CLAUDE.md` (un message par plan, 3 mots max, gabarits `Shot`, tout visible dès le début, mascotte seulement quand un mot l'appelle : 5 plans — thinking, explaining, surprised, happy, point).
- SFX (7, 30 à 50 %) : ding ×2, pop ×3, whoosh, error.
- Les plans sont définis par l'indice de leur premier mot dans le transcript ; bornes et texte en sont déduits.

## Plans (54)

| # | Temps (s) | Parole | Image |
|---|---|---|---|
| 1 | 0,00–1,58 | Quelqu'un t'a déjà dit: | Une personne dit quelque chose : sa bulle de discussion claque sur « dit » |
| 2 | 1,58–2,52 | Vide ton cache? | Un téléphone avec un message qui clignote ; un « ? » claque sur « cache » |
| 3 | 2,52–3,60 | Et toi, tu as fait | Le spectateur (« toi ») s'allume ; une coche de façade se pose sur « fait » |
| 4 | 3,60–4,73 | semblant de comprendre? | Une bulle de pensée avec une coche qui hoche et un « ? » ; mascotte pensive appelée par « semblant » |
| 5 | 4,73–5,75 | Pourtant, c'est beaucoup | Un nœud de fils emmêlés qui tremble sur « beaucoup » |
| 6 | 5,75–7,63 | plus simple que tu ne le penses. | Le nœud se détend en une ligne droite sur « simple » ; une coche se trace |
| 7 | 7,63–8,83 | Imagine que tu cuisines | Une casserole sur le feu, la vapeur monte sur « cuisines » |
| 8 | 8,83–9,72 | tous les jours. | Une semaine : sept jours qui s'allument un à un sur « tous », « les », « jours » |
| 9 | 9,72–11,16 | Chaque fois que tu as besoin de sel, | Un pot de sel qui se vide ; un « ! » éclate sur « sel » |
| 10 | 11,16–12,17 | tu dois aller au marché | Un chemin jusqu'à un étal de marché ; la personne marche, l'étal claque sur « marché » |
| 11 | 12,17–13,14 | pour en acheter. | Une carte bancaire paie ; le pot se remplit sur « acheter » |
| 12 | 13,14–14,45 | C'est fatigant, non? | Une personne épuisée : gouttes de sueur et « Z » sur « fatigant » |
| 13 | 14,45–15,36 | Alors, tu décides | Une ampoule s'allume sur « décides » |
| 14 | 15,36–16,82 | d'en garder un peu dans ta cuisine | Le pot tombe sur une étagère de cuisine, qui s'allume sur « cuisine » |
| 15 | 16,82–18,35 | pour l'avoir sous la main. | La personne attrape le pot d'un geste : la flèche est courte, coche sur « main » |
| 16 | 18,35–19,68 | Eh bien, ton téléphone | Un téléphone qui claque avec des étincelles sur « téléphone » |
| 17 | 19,68–21,54 | fait presque la même chose! | Le téléphone et le pot de sel côte à côte, un signe « égal » qui s'allume sur « même » |
| 18 | 21,54–23,03 | Quand tu visites un site Internet | Une fenêtre de navigateur avec une page ; elle s'allume sur « site », le globe sur « Internet » |
| 19 | 23,03–24,84 | ou que tu utilises une application, | Un écran d'accueil de téléphone : une application s'allume sur « application » |
| 20 | 24,84–25,92 | ton téléphone garde | Une flèche de téléchargement tombe dans le téléphone qui s'allume sur « garde » |
| 21 | 25,92–26,50 | temporairement | Un chronomètre qui tourne : « temporairement » |
| 22 | 26,50–27,63 | certains éléments, | Six tuiles dont quelques-unes seulement s'allument sur « certains » |
| 23 | 27,63–28,68 | comme des images, | Trois cadres d'images ; ils s'allument un à un sur « images » |
| 24 | 28,68–29,72 | pour éviter de devoir | Un téléchargement barré d'un cercle qui se trace sur « éviter » |
| 25 | 29,72–31,46 | tout recharger la prochaine fois. | Une flèche de rechargement tourne puis est barrée d'un cercle sur « prochaine » ; la page s'affiche d'un coup, un éclair claque sur « fois » |
| 26 | 31,46–32,52 | C'est ce qu'on appelle | Mascotte qui explique, appelée par « appelle » ; un grand « ? » au-dessus de la tête |
| 27 | 32,52–33,35 | le cache. | Une boîte-réserve s'ouvre : la pastille CACHE claque sur « cache » |
| 28 | 33,35–34,11 | Grâce à lui, | La boîte rayonne : des rayons partent sur « lui » |
| 29 | 34,11–34,78 | certaines pages | Trois pages dont une s'allume sur « pages » |
| 30 | 34,78–35,51 | s'ouvrent plus vite | Un chronomètre qui file et un éclair sur « vite » |
| 31 | 35,51–36,65 | et tes applications | Quatre applications qui s'allument une à une sur « applications » |
| 32 | 36,65–37,48 | peuvent fonctionner | Deux engrenages qui tournent sur « fonctionner » |
| 33 | 37,48–38,75 | plus efficacement. | Cinq barres montantes qui s'allument une à une ; une coche claque sur « efficacement » |
| 34 | 38,75–39,35 | Mais parfois, | Un « ! » qui claque sur « parfois » |
| 35 | 39,35–40,02 | ces fichiers | Une pile de fichiers qui s'allume sur « fichiers » |
| 36 | 40,02–41,03 | prennent de la place | Une jauge de stockage qui se remplit jusqu'au rouge sur « place » |
| 37 | 41,03–42,67 | ou deviennent inutiles. | Les fichiers se ternissent et une croix tombe sur « inutiles » |
| 38 | 42,67–44,27 | Vider le cache permet alors de | La boîte se vide : les objets s'envolent sur « vider » |
| 39 | 44,27–46,24 | supprimer ces fichiers temporaires. | Une poubelle : les fichiers tombent dedans sur « supprimer », étincelles sur « temporaires » |
| 40 | 46,24–47,89 | Attention, ça ne veut pas dire | Mascotte surprise appelée par « Attention » ; un panneau d'avertissement qui tremble |
| 41 | 47,89–50,01 | que ton téléphone sera forcément plus rapide, | Un téléphone et un éclair ; un cercle barré se trace sur « forcément » |
| 42 | 50,01–51,48 | ni que tu vas récupérer | Une jauge de stockage presque pleine : une toute petite part se libère sur « récupérer » |
| 43 | 51,48–52,87 | énormément d'espace. | Une jauge à peine entamée et une grande part rêvée en pointillés (qui réagit sur « énormément ») barrée d'un cercle sur « espace » |
| 44 | 52,87–53,78 | Et vider le cache | Un balai qui nettoie la boîte sur « vider » |
| 45 | 53,78–55,14 | ne supprime normalement pas | Une poubelle barrée d'un cercle sur « pas » ; un bouclier dont la coche se trace sur « normalement » |
| 46 | 55,14–55,70 | tes comptes ou | Une carte de profil protégée ; elle s'allume sur « comptes » |
| 47 | 55,70–56,75 | tes photos. | Trois photos avec un cœur qui s'allume sur « photos » |
| 48 | 56,75–57,50 | La prochaine fois | Un calendrier : le jour suivant s'allume sur « prochaine » |
| 49 | 57,50–58,29 | qu'on te dit | La personne du début redit la phrase : la bulle claque sur « dit » |
| 50 | 58,29–59,07 | vide ton cache, | Le téléphone du début : le « ? » devient une coche sur « cache » |
| 51 | 59,07–60,70 | tu sauras de quoi on parle! | Mascotte contente, appelée par « sauras » ; une grande coche et des confettis sur « parle » |
| 52 | 60,70–61,44 | Mais dis-moi, | Mascotte qui désigne le spectateur, appelée par « dis-moi » ; deux cartes DÉJÀ / NOUVEAU |
| 53 | 61,44–62,50 | tu le savais déjà | La carte DÉJÀ s'allume sur « déjà » |
| 54 | 62,50–63,82 | ou tu viens de le découvrir? | La carte NOUVEAU s'allume sur « découvrir » ; étincelles, la question relance les commentaires |
