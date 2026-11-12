# La tech sans jargon · 6 · « Le faux message “tu as gagné un iPhone” » — storyboard

Composition `tech-sans-jargon-phishing` · 53 plans · 65,36 s (1961 images) · voix ElevenLabs (Guillaume), script final fourni avec l'audio.

**Fil rouge visuel.** La boîte-cadeau est l'appât : elle arrive (confettis, coupe, téléphone générique), on doit cliquer sur un lien et remplir un formulaire ; puis le doute (manette, formulaire, ticket : trois « non »), « le piège » (mascotte surprise) ; le lien mène à une fausse fenêtre de site, jumelle d'une vraie ; nom, numéro, e-mail et mot de passe partent chez un inconnu (masque du pirate, silhouette en pointillés) ; la boîte s'ouvre et révèle le masque ; enfin le mot « hameçonnage » prend son image : un hameçon, la boîte en appât, un poisson qui mord. Le réflexe se dit avec le cercle barré (manette, bouton-lien, formulaire verrouillé) et le drapeau « signaler ». Aucune marque dessinée : « iPhone » n'est qu'un mot, le téléphone est générique.

**Mascotte** (5 plans, appelée par un mot) : 8 « Franchement » (joyeuse), 11 « Mais » (pensive), 19 « piège » (surprise), 37 « principe » (explique), 53 « message » (désigne).

**Réutilisé** : moteur et kit de la série (`Shot`, `Art`, `At`, `Pill`, `Card`, `Padlock`, `CheckMark`, `CrossMark`, `Arrow`, `Skeleton`, `PersonIcon`, `PersonOutline`, `Incognito`, `LinkChain`, `Keypad`, `Handset`, `KeyIcon`, `Stopwatch`, `Bell`, `Sheet`, `Pencil`, `BankCard`, `Chat`, `Thought`), `Coin`, `MsgPhone`, `Veto`, `Warning`, `EqualSign` de l'épisode cache, `AddressBar`, `SiteWindow`, `Numbered` de l'épisode 5, `UiButton` de l'épisode 4, `PhoneMock`.
**Créé localement** (`helpers.tsx`) : `Gift` (couvercle qui s'envole), `Trophy`, `Cursor`, `GamePad`, `TicketIcon`, `FormCard`, `Envelope`, `InfoCard`, `IdCard`, `NameTag`, `Hook`, `Fish`, `Flag`, `BigDisc`.
**À promouvoir** (2ᵉ épisode qui les utilise) : `Gift`, `Cursor`, `FormCard`, `Envelope`.

**Calage des mots** : Whisper inaccessible ici ; 198 mots placés sur 26 groupes de souffle (pauses), répartis par syllabes, frontières recalées sur les creux d'énergie (±150 ms par mot, exact aux frontières de groupe). 0,96 s de silence initial retirées pour que « Félicitations » parte dès la première seconde.

| # | Temps (s) | Phrase | Visuel et réaction | Voie captions | Source |
|---|---|---|---|---|---|
| 1 | 0.00–0.85 | Félicitations! | Une boîte-cadeau qui secoue son couvercle, confettis : tout s'allume sur « Félicitations » | low | local |
| 2 | 0.85–1.84 | Vous venez de gagner un | Une coupe de vainqueur et une personne : la coupe s'allume sur « gagner » | top | local |
| 3 | 1.84–2.84 | iPhone 17! | Un téléphone générique et un disque « 17 » qui claque sur « 17 » | low | local |
| 4 | 2.84–3.72 | Pour le récupérer, | La boîte-cadeau et une flèche vers la personne : la flèche se trace sur « récupérer » | top | local |
| 5 | 3.72–5.25 | il vous suffit de cliquer sur ce lien | Un lien (chaîne) et un curseur qui clique dessus sur « cliquer » | low | local |
| 6 | 5.25–6.06 | et de renseigner | Un formulaire dont les champs se remplissent sur « renseigner » | top | local |
| 7 | 6.06–7.51 | quelques informations. | Trois cartes d'informations (nom, numéro, e-mail) qui s'allument sur « informations » | low | local |
| 8 | 7.51–8.60 | Franchement, qui n'aimerait | Mascotte joyeuse appelée par « Franchement » ; trois personnes s'allument un à un sur « n'aimerait » *(mascotte happy)* | top | mascotte (pose réelle) + local |
| 9 | 8.60–9.25 | pas recevoir | Une enveloppe qui tombe dans un téléphone sur « recevoir » | low | local |
| 10 | 9.25–10.72 | un message pareil? | Un téléphone, une bulle de message qui s'allume en corail sur « pareil » | top | local |
| 11 | 10.72–12.05 | Mais tu as participé | Mascotte pensive appelée par « Mais » ; une personne et un « ? » qui claque sur « participé » *(mascotte thinking)* | low | mascotte (pose réelle) + local |
| 12 | 12.05–13.47 | à quel jeu exactement? | Une manette de jeu et un « ? » : la manette s'allume sur « jeu » | top | local |
| 13 | 13.47–14.87 | Tu as rempli un formulaire? | Un formulaire vide et un « ? » : le formulaire s'allume sur « formulaire » | low | local |
| 14 | 14.87–16.10 | Tu as acheté un ticket? | Un ticket et un « ? » : le ticket s'allume sur « ticket » | top | local |
| 15 | 16.10–16.87 | Non? | Manette, formulaire, ticket : une grande croix les barre sur « Non » | low | local |
| 16 | 16.87–18.03 | Alors pourquoi est-ce qu'on t'offre un | Une personne et une boîte-cadeau tendue vers elle : un « ? » claque sur « pourquoi » | top | local |
| 17 | 18.03–19.37 | téléphone aussi cher? | Un téléphone et une pile de pièces : les pièces s'allument sur « cher » | low | local |
| 18 | 19.37–20.53 | C'est justement là que | Une flèche qui tombe sur la boîte-cadeau : elle se trace sur « là » | top | local |
| 19 | 20.53–21.94 | se trouve le piège. | Mascotte surprise appelée par « piège » ; la boîte-cadeau sous un panneau d'avertissement *(mascotte surprised)* | low | mascotte (pose réelle) + local |
| 20 | 21.94–22.92 | Le lien te redirige vers | Un lien (chaîne) puis une flèche vers une fenêtre de site : la flèche se trace sur « redirige » | top | local |
| 21 | 22.92–23.92 | une fausse page qui ressemble | Une fenêtre de site portant le masque du pirate : il s'allume sur « fausse » | low | local |
| 22 | 23.92–25.40 | parfois parfaitement à un vrai site. | Deux fenêtres identiques côte à côte (vrai / faux), un signe égal qui s'allume sur « parfaitement » | top | local |
| 23 | 25.40–27.04 | On te demande ton nom, | Un formulaire dont le champ « nom » se remplit sur « nom » | low | local |
| 24 | 27.04–28.98 | ton numéro de téléphone, | Un clavier de téléphone dont les touches s'allument sur « numéro », « téléphone » | top | local |
| 25 | 28.98–30.26 | ton adresse e-mail | Une enveloppe qui s'ouvre sur « e-mail » | low | local |
| 26 | 30.26–31.28 | et parfois même ton | Le formulaire a trois champs remplis et un quatrième qui s'allume en secouant sur « parfois » | top | local |
| 27 | 31.28–32.71 | mot de passe. | Une clé et un champ de points : le cadenas s'ouvre sur « passe » | low | local |
| 28 | 32.71–34.03 | Tu penses remplir un simple | Une personne et sa bulle de pensée : un formulaire anodin avec une coche sur « simple » | top | local |
| 29 | 34.03–35.46 | formulaire pour récupérer | Le formulaire, une flèche, la boîte-cadeau : la flèche se trace sur « récupérer » | low | local |
| 30 | 35.46–36.89 | ton cadeau, mais en réalité, | La boîte-cadeau s'ouvre et révèle le masque du pirate sur « réalité » | top | local |
| 31 | 36.89–38.35 | tu es en train de transmettre | Une personne, une flèche, le pirate : la flèche se trace sur « transmettre » | low | local |
| 32 | 38.35–39.17 | tes informations | Trois cartes d'informations qui s'envolent vers la droite sur « informations » | top | local |
| 33 | 39.17–40.60 | à un inconnu. | Une silhouette en pointillés (l'inconnu) et un « ? » qui claque sur « inconnu » | low | local |
| 34 | 40.60–42.18 | Cette arnaque porte un nom: | Un panneau d'avertissement et une étiquette de nom vide : l'étiquette s'allume sur « nom » | top | local |
| 35 | 42.18–43.22 | le phishing, | La pastille PHISHING claque sur « phishing » ; un hameçon pend avec la boîte-cadeau en appât | low | local |
| 36 | 43.22–44.62 | ou hameçonnage. | La pastille HAMEÇONNAGE claque sur « hameçonnage » ; un poisson mord l'appât | top | local |
| 37 | 44.62–45.81 | Le principe est simple: | Mascotte qui explique appelée par « principe » ; trois pastilles appât → clic → informations *(mascotte explaining)* | low | mascotte (pose réelle) + local |
| 38 | 45.81–47.32 | on t'attire avec une promesse, | La boîte-cadeau sur un hameçon, une personne qui se penche vers elle sur « attire » | top | local |
| 39 | 47.32–47.88 | un cadeau | La boîte-cadeau, grande, qui claque sur « cadeau » | low | local |
| 40 | 47.88–48.82 | ou même une urgence | Un chronomètre dont l'aiguille tourne sur « urgence » | top | local |
| 41 | 48.82–50.20 | pour te pousser à cliquer | Un bouton-lien et un curseur poussé vers lui : le bouton s'enfonce sur « cliquer » | low | local |
| 42 | 50.20–51.03 | et à donner des | Une personne, une flèche, un pirate : une enveloppe voyage sur « donner » | top | local |
| 43 | 51.03–52.93 | informations personnelles. | Une carte d'identité (visage + lignes) qui s'allume sur « personnelles » | low | local |
| 44 | 52.93–54.78 | Alors, retiens bien ceci: | Un carnet : le crayon écrit une ligne sur « retiens » | top | local |
| 45 | 54.78–56.14 | si tu n'as participé | Une personne devant une manette : le cercle barré se trace sur « participé » | low | local |
| 46 | 56.14–56.95 | à aucun jeu, | La manette barrée : une secousse sur « aucun » | top | local |
| 47 | 56.95–58.07 | tu n'as probablement rien | Une coupe en pointillés et un « ? » : tout s'allume sur « probablement » | low | local |
| 48 | 58.07–58.95 | gagné. | La boîte-cadeau vide, barrée d'une croix qui claque sur « gagné » | top | local |
| 49 | 58.95–59.89 | Ne clique pas, | Un bouton-lien barré : le cercle se trace sur « pas » | low | local |
| 50 | 59.89–61.79 | ne renseigne aucune information | Un formulaire verrouillé : le cadenas se ferme sur « information » | top | local |
| 51 | 61.79–63.58 | et signale le message. | Un message sur un téléphone, un drapeau planté sur « signale », une coche sur « message » | low | local |
| 52 | 63.58–64.41 | Tu as déjà reçu un | Un téléphone qui reçoit une bulle de message, la cloche sonne sur « reçu » | top | local |
| 53 | 64.41–65.36 | message de ce genre? | Mascotte qui désigne appelée par « message » ; une bulle de discussion et un « ? » qui relancent les commentaires *(mascotte point)* | low | mascotte (pose réelle) + local |
