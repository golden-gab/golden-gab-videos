# La tech sans jargon · 5 · « C'est quoi un nom de domaine ? » — storyboard

Composition `tech-sans-jargon-nom-de-domaine` · 66 plans · 78,13 s (2344 images) · voix ElevenLabs (Guillaume), script final fourni avec l'audio.

**Fil rouge visuel.** Les trois éléments d'un site sont d'abord montrés tels quels (barre d'adresse, serveur, fenêtre de site), puis racontés par une maison : l'adresse (nom de domaine), le terrain (hébergement), la maison (le site). Un disque 1 / 2 / 3 et une pastille (NOM DE DOMAINE, HÉBERGEMENT, SITE INTERNET) annoncent chaque élément. Aucune marque dessinée : Google.com, Facebook.com et YouTube.com ne sont que des mots (barre d'adresse générique « nom + .com »).

**Mascotte** (5 plans, appelée par un mot) : plan 9 « Imagine » (pensive), 40 « attention » (surprise), 58 « exactement » (explique), 63 « sauras » (joyeuse), 66 « connaissais » (désigne).

**Réutilisé** : moteur et kit de la série (`Shot`, `Art`, `At`, `Pill`, `Disc`, `Thought`, `Padlock`, `CheckMark`, `Loupe`, `EyeIcon`, `PersonIcon`, `MapPin`, `Lines`…), `House`, `ServerNode` et `UiButton` de l'épisode 4, `Calendar`, `FileIcon`, `PicFrame`, `Warning` de l'épisode cache.
**Créé localement** (`helpers.tsx`) : `AddressBar` (nom + « .com », ou texte clair), `SiteWindow`, `Plot` (terrain en perspective), `AddressSign` (plaque d'adresse sur poteau), `Visitors`, `Numbered`, `LoopArrow`.
**À promouvoir** (2ᵉ épisode qui les utilise) : `House`, `ServerNode`, `Calendar`.

| # | Temps (s) | Phrase | Visuel et réaction | Voie captions | Source |
|---|---|---|---|---|---|
| 1 | 0.00–0.96 | Google.com, | Une barre d'adresse (un nom + « .com ») : « .com » s'allume sur « Google.com » | low | local |
| 2 | 0.96–2.42 | Facebook.com, | Deux barres d'adresse : la nouvelle s'allume sur « Facebook.com » | top | local |
| 3 | 2.42–4.03 | YouTube.com… | Trois barres d'adresse empilées : la dernière s'allume sur « YouTube.com » | low | local |
| 4 | 4.03–5.13 | Tu vois ce genre de termes | Un œil qui regarde la pile d'adresses : l'iris s'allume sur « vois » | top | local |
| 5 | 5.13–6.11 | tous les jours. | Un soleil et sept jours : ils s'allument un à un sur « tous les jours » | low | local |
| 6 | 6.11–7.12 | Mais est-ce que tu sais | Une personne et un « ? » qui claque sur « est-ce que tu sais » | top | local |
| 7 | 7.12–8.38 | vraiment ce qui se cache | Une barre d'adresse dont un rideau se lève sur « cache » : derrière, une forme en pointillés | low | local |
| 8 | 8.38–9.97 | derrière ces adresses? | Une loupe passe derrière une adresse : elle s'allume sur « adresses » | top | local |
| 9 | 9.97–11.12 | Imagine que tu veuilles | Mascotte pensive appelée par « Imagine » ; une bulle de pensée avec une fenêtre de site vide | low | mascotte (pose réelle) |
| 10 | 11.12–12.76 | lancer ton propre site Internet. | Une fenêtre de site qui décolle (flèche vers le haut) : le site s'allume sur « lancer » | top | local |
| 11 | 12.76–14.21 | Avant même que quelqu'un puisse le | Un visiteur devant la fenêtre de site, cadenas fermé : le cadenas claque sur « Avant » | low | local |
| 12 | 14.21–15.37 | visiter, il y a | Le cadenas s'ouvre et le visiteur entre dans le site sur « visiter » | top | local |
| 13 | 15.37–16.59 | trois éléments essentiels | Trois disques 1, 2, 3 : ils s'allument un à un sur « trois », « éléments », « essentiels » | low | local |
| 14 | 16.59–18.07 | que tu dois connaître. | Une toque de savoir (casquette) et les trois disques : elle s'allume sur « connaître » | top | local |
| 15 | 18.07–18.96 | Le premier, c'est le | Un grand disque « 1 » qui claque sur « premier » | low | local |
| 16 | 18.96–20.14 | nom de domaine. | La pastille NOM DE DOMAINE claque sur « nom » puis « domaine » ; la barre d'adresse derrière | top | local |
| 17 | 20.14–20.98 | C'est tout simplement | Une barre d'adresse en grand : elle s'allume sur « simplement » | low | local |
| 18 | 20.98–22.08 | l'adresse que les gens tapent | Une barre de recherche où le nom se tape : il se remplit sur « tapent » | top | local |
| 19 | 22.08–23.15 | dans leur navigateur | Une fenêtre de navigateur qui s'allume sur « navigateur » | low | local |
| 20 | 23.15–24.57 | pour accéder à ton site. | Une flèche de la barre d'adresse vers un site qui s'ouvre sur « accéder » | top | local |
| 21 | 24.57–26.68 | Comme monsite.com. | La barre d'adresse avec « monsite.com » écrit en clair : elle s'allume sur « monsite.com » | low | local |
| 22 | 26.68–27.43 | Le deuxième, c'est | Un grand disque « 2 » qui claque sur « deuxième » | top | local |
| 23 | 27.43–28.61 | l'hébergement. | La pastille HÉBERGEMENT claque sur « hébergement » avec un serveur | low | réutilise `ServerNode` (ép. 4) |
| 24 | 28.61–29.34 | C'est l'endroit où | Une épingle de lieu qui s'allume sur « endroit » | top | local |
| 25 | 29.34–30.26 | les fichiers de ton site | Trois fichiers qui s'allument un à un sur « fichiers » | low | local |
| 26 | 30.26–31.39 | sont conservés. | Une boîte de stockage fermée avec une coche sur « conservés » | top | local |
| 27 | 31.39–32.62 | Imagine un ordinateur | Un ordinateur (serveur) dans une bulle de pensée : il s'allume sur « ordinateur » | low | réutilise `ServerNode` (ép. 4) |
| 28 | 32.62–33.87 | qui garde ton site disponible | Le serveur et la mini-fenêtre du site posée dessus : ils s'allument sur « garde » puis « disponible » | top | réutilise `ServerNode` (ép. 4) |
| 29 | 33.87–35.18 | pour que les visiteurs puissent | Trois visiteurs qui arrivent vers le serveur : ils s'allument un à un sur « visiteurs » | low | réutilise `ServerNode` (ép. 4) |
| 30 | 35.18–36.32 | le consulter. | Un œil devant la page du site : il s'allume sur « consulter » | top | local |
| 31 | 36.32–37.73 | Et enfin, le troisième, | Un grand disque « 3 » qui claque sur « troisième » | low | local |
| 32 | 37.73–38.87 | c'est le site Internet | La pastille SITE INTERNET claque sur « site » avec une fenêtre de site | top | local |
| 33 | 38.87–39.68 | lui-même. | Une flèche circulaire autour du site (lui-même) qui s'allume sur « lui-même » | low | local |
| 34 | 39.68–40.47 | C'est tout ce que les | Un site entier, tout allumé sur « tout » | top | local |
| 35 | 40.47–41.87 | visiteurs vont découvrir: | Un visiteur et une loupe sur le site : la loupe s'allume sur « découvrir » | low | local |
| 36 | 41.87–42.52 | les pages, les | Une pile de pages qui s'allume sur « pages » | top | local |
| 37 | 42.52–43.23 | images, les | Un cadre d'image (montagne, soleil) qui s'allume sur « images » | low | local |
| 38 | 43.23–43.86 | textes et les | Des lignes de texte qui se remplissent sur « textes » | top | local |
| 39 | 43.86–45.41 | fonctionnalités. | Un bouton et un interrupteur : un clic sur « fonctionnalités » | low | local |
| 40 | 45.41–46.29 | Mais attention, | Mascotte surprise appelée par « attention » ; un panneau « ! » | top | mascotte (pose réelle) |
| 41 | 46.29–47.47 | ces trois éléments ne | Trois disques 1, 2, 3 côte à côte : ils s'allument un à un sur « trois », « éléments » | low | local |
| 42 | 47.47–49.39 | désignent pas la même chose! | Les trois disques séparés par des signes « différent de » : ils claquent sur « pas » et « chose » | top | local |
| 43 | 49.39–50.17 | Imagine que tu | Une bulle de pensée avec une maison en pointillés sur « Imagine » | low | réutilise `House` (ép. 4) + local |
| 44 | 50.17–51.32 | construises une maison. | Une maison qui se construit trait par trait sur « construises », se remplit sur « maison » ; un marteau | top | réutilise `House` (ép. 4) + local |
| 45 | 51.32–52.30 | Le nom de domaine, | La pastille NOM DE DOMAINE au-dessus de la maison : elle claque sur « nom » | low | réutilise `House` (ép. 4) + local |
| 46 | 52.30–53.58 | c'est son adresse. | Une plaque d'adresse sur son poteau devant la maison : elle s'allume sur « adresse » | top | réutilise `House` (ép. 4) + local |
| 47 | 53.58–54.70 | L'hébergement, c'est le | La pastille HÉBERGEMENT claque sur « hébergement » ; un terrain en pointillés dessous | low | réutilise `House` (ép. 4) + local |
| 48 | 54.70–55.61 | terrain sur lequel | Le terrain en perspective s'allume sur « terrain » | top | réutilise `House` (ép. 4) + local |
| 49 | 55.61–56.54 | elle est construite. | La maison descend et se pose sur le terrain : elle s'ancre sur « construite » | low | réutilise `House` (ép. 4) + local |
| 50 | 56.54–57.53 | Et le site Internet, | La pastille SITE INTERNET claque sur « site » ; la maison est derrière | top | réutilise `House` (ép. 4) + local |
| 51 | 57.53–59.32 | c'est la maison elle-même. | La maison s'allume sur « maison » et une mini-fenêtre de site s'allume sur « elle-même » | low | réutilise `House` (ép. 4) + local |
| 52 | 59.32–60.44 | Tu peux avoir une adresse | Un poteau d'adresse seul sur un terrain vide : il s'allume sur « adresse » | top | réutilise `House` (ép. 4) + local |
| 53 | 60.44–62.21 | sans avoir construit ta maison. | Le même terrain avec une maison en pointillés (pas construite) : une croix s'allume sur « construit » | low | réutilise `House` (ép. 4) + local |
| 54 | 62.21–63.60 | Et tu peux avoir une maison | Une maison sur son terrain, sans aucune plaque : elle s'allume sur « maison » | top | réutilise `House` (ép. 4) + local |
| 55 | 63.60–64.59 | sans que les gens sachent | Trois personnes perdues, des « ? » qui claquent sur « gens » puis « sachent » | low | local |
| 56 | 64.59–65.61 | où la trouver. | Une épingle et une loupe qui cherchent : la loupe balaye jusqu'à « trouver » | top | local |
| 57 | 65.61–66.73 | Sur Internet, c'est | Un globe terrestre qui s'allume sur « Internet » | low | local |
| 58 | 66.73–68.76 | exactement le même principe. | Mascotte qui explique, appelée par « exactement » ; trois paires qui s'égalent : plaque = adresse, terrain = serveur, maison = site | top | réutilise `House` (ép. 4) + local |
| 59 | 68.76–70.12 | Alors, la prochaine fois | Un calendrier dont le jour suivant s'allume sur « prochaine fois » | low | réutilise `Calendar` (ép. cache) |
| 60 | 70.12–71.15 | que tu taperas | Une barre d'adresse où le nom se tape sur « taperas » | top | local |
| 61 | 71.15–71.96 | Google.com ou | La barre d'adresse (nom + « .com ») s'allume sur « Google.com » | low | local |
| 62 | 71.96–72.97 | YouTube.com, | Une seconde barre d'adresse s'allume sur « YouTube.com » | top | local |
| 63 | 72.97–74.19 | tu sauras qu'il y a | Mascotte joyeuse appelée par « sauras » ; une barre d'adresse allumée | low | mascotte (pose réelle) |
| 64 | 74.19–75.28 | bien plus qu'un simple nom | La barre d'adresse devant, et derrière elle les trois pièces (plaque, terrain, maison) qui s'allument sur « plus » | top | réutilise `House` (ép. 4) + local |
| 65 | 75.28–76.81 | derrière cette adresse. | Le rideau de la barre d'adresse se lève sur « derrière » : la maison sur son terrain apparaît | low | réutilise `House` (ép. 4) + local |
| 66 | 76.81–78.13 | Tu connaissais cette différence? | Les trois disques 1, 2, 3 (domaine, hébergement, site) s'allument un à un sur « connaissais » puis « différence » ; la question relance les commentaires | top | local |
