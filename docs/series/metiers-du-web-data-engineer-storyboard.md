# Storyboard — Les métiers du web · 3 · « Data Engineer »

## Source et intention

- Audio : `public/audio/series/metiers-du-web/data-engineer.mp3` (48,27 s), voix originale boostée de +6,8 dB avec limiteur (−21,4 → −15,3 LUFS, pic −1,2 dBFS).
- Transcription : Whisper `small` (fr), répartition mot à mot recalée sur l'énergie de la voix (précision ~±100 ms par mot, exacte aux frontières de phrase). Aucune correction de texte nécessaire. Pour des timestamps au mot près : `node scripts/transcribe-audio.mjs` en local.
- Intention : faire comprendre qu'un data engineer construit les coulisses qui font circuler les données jusqu'au bon endroit, avec l'exemple fil rouge de la vidéo regardée sur TikTok (informations enregistrées, acheminées, prêtes à être utilisées), puis « sans lui, beaucoup d'entreprises auraient du mal » et la question finale au spectateur.
- Standard de qualité : voir `CLAUDE.md` (un message par plan, 3 mots max, gabarits `Shot`, tout visible dès le début, mascotte seulement quand un mot l'appelle : 4 plans).
- Aucune marque dessinée : Facebook, TikTok et Netflix ne sont que des mots de la voix, illustrés par des icônes génériques. Aucun chiffre inventé. Pas de musique.
- Les plans sont définis par l'indice de leur premier mot dans le transcript ; bornes et texte en sont déduits.

## Plans (39)

| # | Temps (s) | Parole | Image |
|---|---|---|---|
| 1 | 0,00–1,34 | Imagine que demain | Un calendrier dont la case du lendemain s'allume sur « demain » |
| 2 | 1,34–2,61 | Facebook, TikTok et | Trois tuiles d'apps génériques (réseau, vidéo, écran) ; les deux premières s'allument sur « Facebook » puis « TikTok » |
| 3 | 2,61–3,45 | Netflix perdent | La troisième tuile s'allume sur « Netflix » puis les trois tuiles tremblent sur « perdent » |
| 4 | 3,45–4,83 | toutes les informations | Une base de données entourée de petites cartes d'infos qui s'allument ; la base claque sur « informations » |
| 5 | 4,83–6,62 | sur leurs utilisateurs. | La base de données au centre, trois personnes autour qui s'allument sur « utilisateurs » |
| 6 | 6,62–7,61 | plus d'historique, | Une horloge et une liste de lignes ; la liste est barrée sur « historique » |
| 7 | 7,61–9,10 | plus de vidéos regardées, | Un téléphone qui diffuse une vidéo ; l'écran est barré sur « regardées » |
| 8 | 9,10–10,65 | plus de recommandations. | Trois cartes recommandées avec un cœur ; elles sont barrées sur « recommandations » |
| 9 | 10,65–12,48 | Pour éviter ce genre de situation, | Un bouclier dont la coche se trace sur « éviter » |
| 10 | 12,48–14,10 | certaines entreprises ont besoin | Un immeuble de bureaux dont les fenêtres s'allument sur « entreprises » ; une pièce de puzzle s'allume sur « besoin » |
| 11 | 14,10–15,54 | d'un data engineer. | Carte-métier « DATA ENGINEER » avec une base de données ; la carte claque sur « engineer » |
| 12 | 15,54–16,39 | Son travail, c'est de | Deux engrenages qui tournent ; mascotte qui explique, appelée par « travail » |
| 13 | 16,39–17,55 | construire les systèmes | Trois briques (base, engrenage, graphique) reliées par des flèches qui se tracent sur « construire » ; l'ensemble s'allume sur « systèmes » |
| 14 | 17,55–19,18 | qui permettent de récupérer, | Un entonnoir ; des points éparpillés y tombent sur « récupérer » |
| 15 | 19,18–19,97 | organiser et | Des points éparpillés se rangent en grille, colonne par colonne, sur « organiser » |
| 16 | 19,97–21,01 | transporter de grandes | Un tuyau où des points voyagent d'une tuile source vers une base ; le tuyau claque sur « transporter » |
| 17 | 21,01–21,94 | quantités de données | Trois bases de données qui grossissent ; elles claquent sur « données » |
| 18 | 21,94–24,34 | pour qu'elles puissent être utilisées. | Un graphique dans une fenêtre dont les barres montent sur « puissent » ; la fenêtre claque sur « utilisées » |
| 19 | 24,34–25,41 | Par exemple, chaque fois | Étiquette « EXEMPLE » qui claque ; un téléphone avec une vidéo et une flèche circulaire qui tourne sur « chaque fois » |
| 20 | 25,41–26,76 | que tu regardes une vidéo | Une personne, un œil qui se tourne vers une tuile vidéo sur « regardes » ; la tuile s'allume sur « vidéo » |
| 21 | 26,76–27,35 | sur TikTok, | Un téléphone avec une vidéo et un cœur qui claque sur « TikTok » |
| 22 | 27,35–28,38 | certaines informations | Trois petites cartes d'infos sortent du téléphone vers une base sur « informations » |
| 23 | 28,38–30,07 | peuvent être enregistrées. | Une carte tombe dans la base de données ; la coche se trace sur « enregistrées » |
| 24 | 30,07–31,20 | Le Data Engineer aide | Une personne allumée sur « Engineer », un engrenage qui tourne, une base de données sur « aide » |
| 25 | 31,20–32,26 | à faire en sorte que | Un itinéraire se trace d'un téléphone à une base de données à partir de « faire » |
| 26 | 32,26–33,44 | ces informations arrivent | Des points parcourent l'itinéraire et la base s'allume sur « arrivent » |
| 27 | 33,44–34,04 | au bon endroit | Une épingle tombe sur la base de données sur « endroit » |
| 28 | 34,04–34,72 | et soient prêtes | Trois cartes dont les coches se tracent à la suite ; la dernière sur « prêtes » |
| 29 | 34,72–36,26 | à être utilisées. | Un tableau de bord (graphique, cœur, cartes) qui s'allume sur « utilisées » |
| 30 | 36,26–37,76 | En gros, il construit les coulisses | Un rideau de scène : un engrenage tourne sur « construit », le rideau s'ouvre sur « coulisses » |
| 31 | 37,76–39,67 | qui permettent aux données de circuler | Des points circulent en anneau autour d'une base ; ils accélèrent sur « circuler » |
| 32 | 39,67–40,76 | correctement. | Un grand disque coché qui claque sur « correctement » ; mascotte joyeuse |
| 33 | 40,76–41,42 | Sans lui, beaucoup | Une personne grisée et barrée sur « lui » |
| 34 | 41,42–42,73 | d'entreprises auraient du mal | Un immeuble qui tremble avec une alerte « ! » sur « mal » |
| 35 | 42,73–43,91 | à exploiter toutes les | Un tas de cartes d'infos grisées ; une loupe les parcourt sur « exploiter » |
| 36 | 43,91–45,88 | informations qu'elles collectent. | Quatre icônes d'infos convergent vers la base de données sur « collectent » |
| 37 | 45,88–46,69 | Quel est le métier | Trois cartes-métiers empilées, la dernière s'allume sur « métier » ; mascotte qui pointe le spectateur |
| 38 | 46,69–47,66 | que tu veux découvrir | Une loupe sur un grand « ? » corail qui claque sur « découvrir » |
| 39 | 47,66–48,27 | par la suite? | Un « ? » et des flèches vers la suite ; mascotte pensive sur « suite » |
