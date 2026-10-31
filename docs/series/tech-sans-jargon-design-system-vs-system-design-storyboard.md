# Storyboard — La tech sans jargon · 4 · « Design System ou System Design ? »

## Source et intention

- Audio : `public/audio/series/tech-sans-jargon/design-system-vs-system-design.mp3` (71,0 s), voix originale (ElevenLabs, voix Guillaume) boostée de +6 dB avec limiteur (−21,5 → −16,0 LUFS, pic −1,2 dBFS).
- Texte : le script fourni par Gabriel avec l'audio ; 195 mots.
- Transcription : Whisper n'est pas accessible dans le bac à sable. Les mots du texte sont placés ainsi : pauses détectées (23 groupes de souffle), mots affectés aux groupes par programmation dynamique (débit constant, pénalité hors ponctuation), répartition des mots de chaque groupe selon les syllabes, frontières recalées sur les creux d'énergie de la voix. Précision ~±150 ms par mot, exacte aux frontières de groupe. Pour des timestamps au mot près : `node scripts/transcribe-audio.mjs` en local, puis remplacer `segments`.
- Intention : deux notions aux noms presque jumeaux, séparées par l'image d'une maison. Le plan (pièces, place de la cuisine, circulation de l'eau et de l'électricité) = System Design, dessiné en plan de maison puis en schéma téléphone → serveur → base de données. La décoration (couleurs, portes, poignées, interrupteurs, matériaux, même style partout) = Design System, dessinée en palette, boutons, police « Aa », espacements, écrans qui se répètent à l'identique. Fin sur « comment ça fonctionne » (engrenage) contre « comment ça se présente » (pinceau), puis la question qui relance les commentaires.
- Aucune marque dessinée ni citée à l'image ; aucun chiffre ; pas de musique.
- Standard de qualité : voir `CLAUDE.md` (un message par plan, 3 mots max, gabarits `Shot`, tout visible dès le début, mascotte seulement quand un mot l'appelle : 4 plans — surprised, thinking, explaining, point).
- SFX (5, 40 à 50 %) : pop ×3, ding ×2.
- Les plans sont définis par l'indice de leur premier mot dans le transcript ; bornes et texte en sont déduits.

## Plans (59)

| # | Temps (s) | Parole | Image |
|---|---|---|---|
| 1 | 0,00–1,10 | Design System | Une carte-palette (couleurs, bouton) : la pastille DESIGN SYSTEM claque sur « Design System » |
| 2 | 1,10–2,77 | ou System Design? | Face à elle, une carte-plan (maison en plan, engrenage) : la pastille SYSTEM DESIGN claque sur « System Design » ; un « ? » sur le dernier mot |
| 3 | 2,77–4,43 | malgré leurs noms presque identiques, | Deux cartes presque jumelles (même cadre, même ton) : les noms se ressemblent, elles s'allument sur « noms » puis « identiques » |
| 4 | 4,43–5,24 | ce sont deux choses | Deux choses distinctes : la carte-palette et la carte-plan, chacune à son tour sur « deux » puis « choses » |
| 5 | 5,24–7,16 | complètement différentes! | Un signe « différent » entre les deux cartes ; mascotte surprise appelée par « différentes » |
| 6 | 7,16–8,16 | Imagine que tu dois | Une personne qui imagine : une bulle de pensée avec une maison en pointillés sur « Imagine » |
| 7 | 8,16–9,25 | construire une maison. | Une maison se dessine trait par trait (toit puis murs) sur « construire », s'allume sur « maison » |
| 8 | 9,25–10,30 | D'abord, tu dois réfléchir | Mascotte pensive appelée par « réfléchir » ; une feuille de plan vierge et un crayon |
| 9 | 10,30–12,07 | à son organisation: | Le plan de la maison s'organise : les murs intérieurs se tracent sur « organisation » |
| 10 | 12,07–13,07 | combien de pièces? | Des pièces qui s'allument une à une sur « combien », « de », « pièces » |
| 11 | 13,07–14,36 | Où placer la cuisine? | Une cuisinière (deux feux) cherche sa place dans le plan : elle saute de pièce en pièce puis s'ancre sur « cuisine » |
| 12 | 14,36–15,13 | Comment faire circuler | Un tuyau d'eau se trace à travers les pièces ; la goutte claque sur « circuler » |
| 13 | 15,13–16,89 | l'eau et l'électricité? | Le tuyau reste ; un fil électrique se trace et un éclair claque sur « électricité » |
| 14 | 16,89–18,89 | Comment tout faire fonctionner ensemble? | Eau et électricité circulent ensemble dans le plan : les pièces s'allument toutes ensemble sur « ensemble » |
| 15 | 18,89–20,18 | Ça, c'est un peu le | La maison en plan (déjà vue) : le cadre s'allume sur « Ça », « c'est », « un peu » |
| 16 | 20,18–21,53 | System Design. | La pastille SYSTEM DESIGN claque sur « System Design » avec un engrenage qui tourne |
| 17 | 21,53–22,45 | En informatique, | Un ordinateur (écran de code fantôme) s'allume sur « informatique » |
| 18 | 22,45–23,86 | c'est réfléchir à la façon | Une loupe sur le plan de la maison devenu plan d'application : la loupe s'allume sur « réfléchir » |
| 19 | 23,86–24,83 | dont les différentes parties | Quatre blocs-parties d'une application s'allument un à un sur « différentes parties » |
| 20 | 24,83–25,76 | d'une application | Un téléphone (l'application) au centre ; ses voisins s'éveillent sur « application » |
| 21 | 25,76–26,79 | communiquent entre elles | Des paquets de données circulent entre téléphone, serveur et base de données sur « communiquent » |
| 22 | 26,79–27,82 | pour que tout fonctionne | Les paquets se croisent sans accroc, une coche se trace sur « fonctionne » |
| 23 | 27,82–28,73 | correctement, | Une coche bien nette dans un cercle sur « correctement » |
| 24 | 28,73–31,16 | même avec des milliers d'utilisateurs. | Une petite foule de silhouettes qui grossit : une silhouette pour dix s'allume sur « milliers », la foule claque sur « utilisateurs » |
| 25 | 31,16–31,83 | Maintenant, | Retour à la maison : une plaque « changement de page » (volet qui glisse) sur « Maintenant » |
| 26 | 31,83–32,76 | imagine que tu dois | La maison dont les murs sont posés attend sa déco : un pinceau s'allume sur « imagine » |
| 27 | 32,76–34,30 | aménager cette maison. | La maison passe de plan à habillée : les couleurs montent sur « aménager » puis « maison » |
| 28 | 34,30–35,39 | Tu choisis les couleurs, | Une palette de couleurs (les tons de la marque) : une pastille s'allume par mot, sur « couleurs » |
| 29 | 35,39–36,06 | les portes, les | Des portes de couleurs différentes ; l'une s'ouvre sur « portes » |
| 30 | 36,06–36,66 | poignées, les | Deux poignées de porte rondes : un éclat sur « poignées » |
| 31 | 36,66–37,62 | interrupteurs | Un interrupteur qui bascule sur « interrupteurs » ; la lampe s'allume |
| 32 | 37,62–38,85 | et les matériaux. | Trois matériaux (bois, brique, carreaux) : ils s'allument sur « matériaux » |
| 33 | 38,85–39,90 | Et tu veux garder | Une pièce où tout est bien rangé dans le même style : les objets se rangent sur « garder » |
| 34 | 39,90–41,55 | le même style partout. | Trois pièces avec la même décoration : un fil les relie sur « même », « style », « partout » |
| 35 | 41,55–42,49 | Ça, c'est le | La carte-palette (couleurs, bouton) : le cadre s'allume sur « Ça », « c'est », « le » |
| 36 | 42,49–43,84 | Design System. | La pastille DESIGN SYSTEM claque sur « Design System » avec un pinceau |
| 37 | 43,84–45,11 | Dans le développement web, | Une fenêtre de navigateur avec une page : le globe s'allume sur « développement web » |
| 38 | 45,11–46,33 | il regroupe les couleurs, | Une pastille de couleur et sa petite carte : le jeu de couleurs s'allume sur « couleurs » |
| 39 | 46,33–47,77 | les boutons, les polices, les | Des boutons arrondis, un clic sur « boutons » ; une police Aa s'allume sur « polices » |
| 40 | 47,77–48,60 | espacements et | Deux blocs et l'espace entre eux (flèches d'espacement) qui s'ouvrent sur « espacements » |
| 41 | 48,60–49,64 | les règles visuelles | Un carnet de règles : des lignes cochées une à une sur « règles », « visuelles » |
| 42 | 49,64–50,77 | pour que toutes les pages | Trois pages de l'application côte à côte : elles s'allument une à une sur « toutes les pages » |
| 43 | 50,77–51,78 | d'une application | Une page-modèle (en-tête, bouton, lignes) devant les autres sur « application » |
| 44 | 51,78–53,29 | aient la même apparence. | Les trois pages ont exactement la même apparence : un signe égal s'allume sur « même apparence » |
| 45 | 53,29–54,89 | Tu vois maintenant la différence? | Mascotte qui explique, appelée par « vois » ; la maison-plan et la maison-déco côte à côte, une loupe passe de l'une à l'autre |
| 46 | 54,89–55,89 | Le System Design | Carte SYSTEM DESIGN : l'engrenage tourne sur « System Design » |
| 47 | 55,89–56,92 | organise le fonctionnement | Des engrenages et un flux de données : « organise » range les blocs, « fonctionnement » lance la rotation |
| 48 | 56,92–58,51 | de ton application. | Le téléphone de l'application s'allume sur « application » ; coche du bon fonctionnement |
| 49 | 58,51–59,30 | Le Design System | Carte DESIGN SYSTEM : le pinceau s'allume sur « Design System » |
| 50 | 59,30–60,61 | organise son apparence | Un œil qui regarde une page : il s'allume sur « apparence » |
| 51 | 60,61–62,00 | et la façon de construire | Des briques (boutons, cartes) qui s'empilent en un écran sur « construire » |
| 52 | 62,00–62,73 | ses interfaces | Une interface (écran avec en-tête et boutons) qui s'allume sur « interfaces » |
| 53 | 62,73–64,40 | de manière cohérente. | Deux écrans cohérents reliés par un fil sur « cohérente » |
| 54 | 64,40–65,37 | L'un s'intéresse à | Carte gauche : engrenage ; elle s'allume sur « L'un » et « fonctionne » |
| 55 | 65,37–66,55 | comment ça fonctionne, | Un engrenage qui tourne sur « fonctionne » |
| 56 | 66,55–67,33 | l'autre à comment | Carte droite : pinceau ; elle s'allume sur « l'autre » |
| 57 | 67,33–68,78 | ça se présente. | Un œil et une page : la page s'embellit sur « présente » |
| 58 | 68,78–69,41 | Et toi, | Mascotte qui désigne le spectateur, appelée par « toi » ; deux cartes (engrenage, pinceau) |
| 59 | 69,41–71,00 | tu connaissais la différence entre les deux? | Les deux cartes s'allument une à une sur « connaissais » puis « deux » ; la question relance les commentaires |