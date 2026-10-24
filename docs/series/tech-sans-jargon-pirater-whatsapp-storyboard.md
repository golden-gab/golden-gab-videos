# Storyboard — La tech sans jargon · 2 · « Comment pirater un compte WhatsApp en une minute ? »

## Source et intention

- Audio : `public/audio/series/tech-sans-jargon/pirater-whatsapp.mp3` (78,47 s), voix originale boostée de +6,5 dB avec limiteur (−21,7 → −15,9 LUFS, pic −1,5 dBFS).
- Texte : le script final fourni par Gabriel avec l'audio (c'est lui qui fait foi).
- Transcription : Whisper n'est pas accessible dans le bac à sable. Les mots du texte final sont placés ainsi : pauses détectées (20 groupes de souffle), répartition des mots de chaque groupe selon les syllabes, frontières recalées sur les creux d'énergie de la voix. Précision ~±150 ms par mot, exacte aux frontières de groupe. Pour des timestamps au mot près : `node scripts/transcribe-audio.mjs` en local, puis remplacer `segments`.
- Intention : un hook « comment pirater un compte WhatsApp en une minute » qui promet un tutoriel (liste en 3 étapes, « prends un cahier »), puis se retourne (« Désolé ») : il n'existe pas de logiciel magique, les pirates manipulent la personne pour qu'elle donne elle-même son code de vérification reçu par SMS. Le concept est nommé (l'ingénierie sociale : confiance, peur, curiosité), élargi (comptes bancaires, réseaux sociaux, e-mails, téléphone) et la vidéo se termine sur le bon réflexe (prendre quelques secondes pour vérifier un lien, un code, une information) et la question qui relance les commentaires.
- Aucune marque dessinée ni citée à l'image : « WhatsApp » n'est que dit ; le téléphone, la bulle de discussion, la carte bancaire et le masque du pirate sont génériques. Aucun chiffre ni code réel : les cases du code sont des points. Pas de musique. Le pas-à-pas du tutoriel est volontairement vide (barres fantômes) : rien d'exploitable n'est montré.
- Standard de qualité : voir `CLAUDE.md` (un message par plan, 3 mots max, gabarits `Shot`, tout visible dès le début, mascotte seulement quand un mot l'appelle : 6 plans).
- Durée : 78,47 s, au-dessus de la limite d'une minute visée pour la série ; à raccourcir côté script si besoin.
- Les plans sont définis par l'indice de leur premier mot dans le transcript ; bornes et texte en sont déduits.

## Plans (65)

| # | Temps (s) | Parole | Image |
|---|---|---|---|
| 1 | 0,00–1,26 | Comment pirater un compte | Un pirate au masque devant un téléphone ; le cadenas s'ouvre sur « pirater », le téléphone claque sur « compte » |
| 2 | 1,26–2,91 | WhatsApp en une minute? | Un chronomètre dont l'aiguille fait un tour complet sur « minute » ; un téléphone avec une bulle de discussion |
| 3 | 2,91–4,40 | Tu penses que c'est impossible? | Une bulle de pensée avec un cadenas : « impossible » ; mascotte pensive appelée par « penses » |
| 4 | 4,40–5,55 | Alors, prends un cahier | Un cahier à spirale qui se pose sur « cahier » |
| 5 | 5,55–7,00 | et note tout ce qui va suivre. | Une feuille où le crayon écrit ligne à ligne sur « note », « tout », « suivre » |
| 6 | 7,00–8,48 | Parce qu'aujourd'hui, je vais te montrer | Un soleil (« aujourd'hui ») ; mascotte qui désigne le spectateur sur « montrer » |
| 7 | 8,48–9,71 | comment les pirates s'y | Un pirate au masque devant un ordinateur portable ; il s'allume sur « pirates » |
| 8 | 9,71–11,27 | prennent réellement. | Une loupe passe sur le pirate et révèle ce qu'il fait vraiment sur « réellement » |
| 9 | 11,27–12,12 | De 1: | Le chiffre 1 dans un disque, coché dans une liste ; il claque sur « 1 » |
| 10 | 12,12–13,03 | Il te faut le numéro | Un clavier de téléphone dont les touches s'allument une à une sur « numéro » |
| 11 | 13,03–15,62 | de téléphone de la personne que tu veux pirater. | Une carte « numéro » relie une personne ; un viseur se verrouille sur elle sur « pirater » |
| 12 | 15,62–16,14 | De 2: | Le chiffre 2 dans un disque ; il claque sur « 2 » |
| 13 | 16,14–17,06 | Il te faut un moyen | Une clé (« un moyen ») qui s'allume sur « moyen » |
| 14 | 17,06–18,07 | de la convaincre | Un pirate envoie une bulle de discussion vers une personne ; la bulle voyage sur « convaincre » |
| 15 | 18,07–19,68 | de te faire confiance. | Deux personnes et un cœur entre elles, qui s'allume sur « confiance » |
| 16 | 19,68–20,60 | Et de 3: | Le chiffre 3 dans un disque ; il claque sur « 3 » |
| 17 | 20,60–21,26 | Désolé, | La liste qui s'arrête net ; mascotte surprise appelée par « Désolé » |
| 18 | 21,26–22,36 | mais il n'existe pas | Une fenêtre de logiciel en pointillés (qui n'existe pas) ; un cercle barré se trace sur « pas » |
| 19 | 22,36–23,44 | de logiciel magique | Une fenêtre de logiciel et une baguette magique qui lance des étincelles sur « magique » |
| 20 | 23,44–25,25 | capable de pirater n'importe | Un cadenas fermé qui résiste : il tremble sur « pirater », la baguette rebondit |
| 21 | 25,25–26,01 | quel compte WhatsApp | Un téléphone avec une bulle de discussion ; il s'allume sur « WhatsApp » |
| 22 | 26,01–27,38 | en quelques secondes. | Un chronomètre qui s'emballe puis barré d'une croix sur « secondes » |
| 23 | 27,38–28,15 | En réalité, | Un grand « ! » qui claque sur « réalité » avec des étincelles |
| 24 | 28,15–28,97 | beaucoup de pirates | Trois pirates au masque qui s'allument un à un sur « beaucoup » |
| 25 | 28,97–29,76 | ne cassent même pas | Un cadenas intact : le marteau rebondit sur « cassent », cercle barré sur « pas » |
| 26 | 29,76–31,39 | la sécurité de WhatsApp. | Un téléphone protégé par un bouclier coché ; la coche se trace sur « sécurité » |
| 27 | 31,39–32,72 | Ils manipulent leurs victimes | Un pirate tient des fils attachés à une personne (marionnette) ; les fils bougent sur « manipulent » |
| 28 | 32,72–33,78 | pour qu'elles leur donnent elles-mêmes | La personne tend elle-même une carte-code vers le pirate : la flèche se trace sur « donnent » |
| 29 | 33,78–35,14 | le code de vérification | Une carte de code : six cases qui se remplissent sur « vérification » |
| 30 | 35,14–36,73 | reçu par SMS. | Un téléphone qui reçoit un message : la cloche se balance sur « SMS » |
| 31 | 36,73–37,82 | Et une fois ce code | La carte de code vole de la personne vers le pirate sur « code » |
| 32 | 37,82–38,37 | récupéré, | Le pirate tient la carte de code ; une coche claque sur « récupéré » |
| 33 | 38,37–39,14 | ils peuvent tenter | Un cadenas qui tressaille, à moitié ouvert, sur « tenter » |
| 34 | 39,14–40,30 | de prendre le contrôle | L'avatar d'un téléphone bascule de la personne au masque sur « contrôle » |
| 35 | 40,30–41,08 | du compte. | Un grand cadenas ouvert qui s'allume sur « compte » |
| 36 | 41,08–41,98 | C'est ce qu'on appelle | Mascotte qui explique, appelée par « appelle » |
| 37 | 41,98–43,62 | l'ingénierie sociale. | Un engrenage (ingénierie) et des personnes (sociale) ; deux pastilles « INGÉNIERIE » « SOCIALE » |
| 38 | 43,62–44,53 | En gros, c'est quand | Deux personnes ; des points de frappe dans une bulle sur « gros » |
| 39 | 44,53–45,44 | quelqu'un utilise | Un pirate et trois cartes retournées ; elles tremblent sur « utilise » |
| 40 | 45,44–46,38 | la confiance, | La première carte se retourne : un cœur s'allume sur « confiance » |
| 41 | 46,38–47,85 | la peur ou la curiosité | La carte « peur » (« ! ») tremble sur « peur », puis l'œil s'allume sur « curiosité » |
| 42 | 47,85–48,69 | pour te pousser à | Des flèches poussent une personne vers un bouton sur « pousser » |
| 43 | 48,69–50,72 | faire quelque chose que tu n'aurais normalement | La personne clique ; la pensée « jamais » barrée apparaît sur « n'aurais » |
| 44 | 50,72–51,81 | jamais fait. | Un cercle barré sur « jamais » puis une grande coche sur « fait » |
| 45 | 51,81–52,82 | Et ça ne concerne pas | Une tuile de discussion ; une onde de choc sur « concerne » et un cercle barré sur « pas » |
| 46 | 52,82–53,91 | seulement WhatsApp. | La tuile de discussion à côté de trois tuiles en pointillés qui attendent ; elle s'allume sur « WhatsApp » |
| 47 | 53,91–55,13 | Ça peut arriver avec | Quatre tuiles (carte, réseaux, e-mail, téléphone) autour d'un « ! » qui claque sur « arriver » |
| 48 | 55,13–55,81 | tes comptes bancaires, | Une carte bancaire dessinée qui s'allume sur « comptes » |
| 49 | 55,81–56,83 | tes réseaux sociaux, | Un cercle de personnes reliées qui s'allument sur « réseaux » |
| 50 | 56,83–57,52 | tes e-mails | Une enveloppe qui s'ouvre sur « e-mails » |
| 51 | 57,52–59,01 | ou même au téléphone. | Un combiné de téléphone qui sonne sur « téléphone » |
| 52 | 59,01–60,15 | Le pirate ne cherche pas | Un pirate et une loupe ; un cercle barré sur « pas » |
| 53 | 60,15–61,88 | toujours à casser un système. | Une fenêtre de système qui se fissure sur « casser » |
| 54 | 61,88–63,54 | Parfois, il cherche simplement | Un pirate et une bulle de discussion qui se remplit sur « simplement » |
| 55 | 63,54–65,09 | à te convaincre. | Une personne reçoit la bulle et se range de son côté : coche sur « convaincre » |
| 56 | 65,09–66,03 | Alors, avant de | Mascotte qui désigne le spectateur, appelée par « avant » |
| 57 | 66,03–67,10 | cliquer sur un lien, | Un lien (chaîne) et un curseur qui hésite au-dessus ; le lien s'allume sur « lien » |
| 58 | 67,10–68,03 | de donner un code | Une carte de code qu'on tend vers la sortie ; elle s'allume sur « code » |
| 59 | 68,03–70,39 | ou de partager une information personnelle, | Une carte d'identité : l'information s'envole sur « partager » et s'allume sur « personnelle » |
| 60 | 70,39–71,29 | prends quelques secondes | Un chronomètre calme : l'aiguille avance sur « secondes » |
| 61 | 71,29–72,52 | pour vérifier. | Un bouclier, une loupe et une coche qui se trace sur « vérifier » |
| 62 | 72,52–73,60 | Parce que sur Internet, | Un globe entouré de personnes ; il s'allume sur « Internet » |
| 63 | 73,60–74,87 | la personne qui te piège | Un avatar sympathique qui se fend et révèle un masque sur « piège » |
| 64 | 74,87–77,19 | n'est pas toujours celle que tu imagines. | La personne imaginée dans une bulle de pensée, un signe « différent » vers le masque sur « pas » |
| 65 | 77,19–78,47 | Tu connaissais cette technique? | Mascotte qui sourit et appelle à commenter ; un « ? » dans une bulle de discussion sur « technique » |
