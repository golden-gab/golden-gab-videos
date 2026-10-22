# Storyboard — La tech sans jargon · 1 · « Vrai ou faux : la navigation privée »

## Source et intention

- Audio : `public/audio/series/tech-sans-jargon/navigation-privee.mp3` (59,74 s), voix originale boostée de +7 dB avec limiteur (−22,0 → −15,8 LUFS, pic −1,7 dBFS).
- Texte : le script final fourni par Gabriel avec l'audio (version relue et modifiée par lui, c'est elle qui fait foi, pas le premier script proposé).
- Transcription : Whisper n'est pas accessible dans le bac à sable. Les mots du texte final sont placés ainsi : pauses détectées (18 groupes de souffle), répartition selon les syllabes et l'énergie de la voix, frontières recalées sur les creux d'énergie. Précision ~±150 ms par mot, exacte aux frontières de groupe. Pour des timestamps au mot près : `node scripts/transcribe-audio.mjs` en local, puis remplacer `segments`.
- Intention : vulgariser sans jargon ce que la navigation privée cache vraiment (l'historique sur ton téléphone) et ce qu'elle ne cache pas (les sites, le fournisseur Internet, le Wi-Fi de l'école ou du travail), avec l'image de la feuille déchirée, puis la question finale qui relance les commentaires.
- Standard de qualité : voir `CLAUDE.md` (un message par plan, 3 mots max, gabarits `Shot`, tout visible dès le début, mascotte seulement quand un mot l'appelle : 4 plans — « Imagine » (pensive), « Sauf que » (surprise), « Imagine » de la feuille (explique), « Alors, dis-moi » (pointe le spectateur)).
- Aucune marque dessinée ni citée à l'image : le masque de navigation privée est un chapeau et des lunettes génériques. Aucun chiffre inventé. Pas de musique.
- Les plans sont définis par l'indice de leur premier mot dans le transcript ; bornes et texte en sont déduits.

## Plans (41)

| # | Temps (s) | Parole | Image |
|---|---|---|---|
| 1 | 0,00–1,40 | Vrai ou faux: | Deux pastilles VRAI / FAUX ; chacune s'allume sur le mot qui la nomme |
| 2 | 1,40–3,09 | quand tu navigues en mode privé sur | Une fenêtre de navigateur ; une seconde fenêtre sombre au masque de navigation privée s'allume sur « privé » |
| 3 | 3,09–4,64 | Internet, personne ne peut savoir | Un globe (« Internet ») ; un œil barré se trace sur « savoir » : la croyance que personne ne voit rien |
| 4 | 4,64–5,74 | ce que tu fais? | Une personne et des lignes d'activité ; un grand « ? » claque sur « fais » |
| 5 | 5,74–6,74 | Faux! | Pastille FAUX qui claque avec une croix et une onde de choc |
| 6 | 6,74–8,79 | Imagine, tu es sur ton téléphone, | Un téléphone ; mascotte pensive appelée par « Imagine » |
| 7 | 8,79–10,48 | tu ouvres une fenêtre de navigation | Un doigt tape (« ouvres ») et une nouvelle fenêtre de navigateur apparaît sur « fenêtre » |
| 8 | 10,48–11,81 | privée et tu te dis: | La fenêtre devient sombre, le masque s'allume sur « privée » ; une bulle de pensée sur « dis » |
| 9 | 11,81–13,08 | Parfait, personne ne saura | Un grand disque coché qui claque sur « Parfait » ; une personne qui se cache sur « personne » |
| 10 | 13,08–14,73 | ce que je suis allé chercher. | Une barre de recherche qui se remplit, une loupe qui brille sur « chercher » |
| 11 | 14,73–16,41 | Sauf que ce n'est pas vraiment | Le masque de navigation privée tremble sur « Sauf » ; mascotte surprise ; une croix se trace sur « pas » |
| 12 | 16,41–17,89 | comme ça que ça fonctionne. | Un engrenage qui tourne derrière une fenêtre ; il s'allume sur « fonctionne » |
| 13 | 17,89–19,36 | La navigation privée empêche | La fenêtre sombre au masque, qui s'allume sur « privée » et tremble sur « empêche » |
| 14 | 19,36–20,59 | surtout ton navigateur | Une fenêtre de navigateur claire avec un globe ; elle s'allume sur « navigateur » |
| 15 | 20,59–21,72 | d'enregistrer les sites | Un point d'enregistrement qui s'allume sur « enregistrer » ; trois pages tombent dans un carnet |
| 16 | 21,72–22,73 | que tu visites dans ton | Une personne et trois tuiles de sites ; la flèche se trace de l'une vers les autres sur « visites » |
| 17 | 22,73–24,18 | historique habituel. | Une liste d'historique (horloge + lignes) qui se remplit ligne à ligne sur « historique » |
| 18 | 24,18–25,38 | Mais ça ne te rend pas | Une personne en pointillés et une croix qui se trace sur « pas » |
| 19 | 25,38–26,29 | invisible. | Une personne sous un projecteur ; un œil la regarde et claque sur « invisible » |
| 20 | 26,29–27,45 | Les sites que tu consultes | Trois tuiles de sites (globe, journal, vidéo) qui s'allument une à une sur « sites » puis « consultes » |
| 21 | 27,45–29,26 | peuvent toujours voir ta visite. | Une tuile de site et un grand œil ; un visiteur arrive sur « visite » |
| 22 | 29,26–30,34 | Ton fournisseur Internet | Une antenne relais qui s'allume sur « fournisseur » ; un globe sur « Internet » |
| 23 | 30,34–32,58 | peut aussi voir une partie de ton activité. | Un œil au-dessus de lignes d'activité ; seules quelques lignes s'allument, sur « partie » puis « activité » |
| 24 | 32,58–34,11 | Et si tu utilises le Wi-Fi | Un téléphone et un grand Wi-Fi qui émet des ondes sur « Wi-Fi » |
| 25 | 34,11–35,93 | de ton école ou de ton travail, | Deux tuiles (école, bureau) sous un Wi-Fi ; elles s'allument sur « école » puis « travail » |
| 26 | 35,93–37,64 | certaines activités peuvent être visibles | Une carte d'activités dont quelques lignes s'ouvrent sur un œil, sur « certaines » puis « visibles » |
| 27 | 37,64–39,56 | par les personnes qui gèrent le réseau. | Une personne-administrateur avec un engrenage devant un réseau de points ; le réseau s'allume sur « réseau » |
| 28 | 39,56–41,32 | Imagine que tu écrives quelque chose | Une feuille et un crayon qui écrit ; mascotte qui explique, appelée par « Imagine » |
| 29 | 41,32–43,32 | sur une feuille, puis que tu la déchires. | Une feuille écrite qui se déchire en deux sur « déchires » |
| 30 | 43,32–44,58 | Tu as effacé la feuille, | Une feuille dont les lignes s'effacent sur « effacé » |
| 31 | 44,58–45,71 | mais ça ne veut pas dire que | Une feuille blanche, un signe « différent de » qui se trace sur « pas », un œil |
| 32 | 45,71–47,40 | personne ne t'a vu écrire. | Une personne qui écrit, un témoin dont l'œil la suit ; l'œil s'allume sur « vu » |
| 33 | 47,40–48,17 | En réalité, | Un disque « ! » qui claque sur « réalité », avec des étincelles |
| 34 | 48,17–49,31 | la navigation privée | La fenêtre sombre au masque de navigation privée s'allume sur « privée » |
| 35 | 49,31–50,69 | sert surtout à éviter | Un bouclier dont la coche se trace sur « éviter » |
| 36 | 50,69–52,26 | que la prochaine personne qui utilise | Une première personne, une flèche, une seconde personne qui s'allume sur « prochaine » |
| 37 | 52,26–53,72 | ton téléphone retrouve facilement | Un téléphone et une loupe qui le parcourt sur « retrouve » |
| 38 | 53,72–55,11 | ton historique. | Une liste d'historique vide, protégée par un bouclier coché, sur « historique » |
| 39 | 55,11–56,16 | Alors, dis-moi: | Mascotte qui pointe le spectateur, appelée par « dis-moi » |
| 40 | 56,16–57,82 | tu pensais vraiment que le mode privé | Une personne pensive et une bulle avec le masque de navigation privée ; « ? » sur « vraiment » |
| 41 | 57,82–59,74 | te rendait invisible sur Internet? | Une personne sous un œil : la bulle de commentaire claque sur « Internet » pour inviter à répondre |

