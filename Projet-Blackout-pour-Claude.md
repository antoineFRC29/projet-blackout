# Objectif de la webapp « Projet Black-out »

_(Fichier reconstitué par Claude après suppression accidentelle du .rtf original le 04/08 — contenu identique, mis en Markdown.)_

## Vision

Projet Blackout est une web application permettant de jouer à un jeu de société directement depuis un téléphone, entre amis, lors d'une soirée.
L'objectif principal n'est pas uniquement de gagner la partie, mais de créer des moments amusants, des interactions sociales et des situations mémorables.
Le ton du jeu est :
- drôle ;
- convivial ;
- destiné à un public adulte ;

L'expérience doit rappeler les soirées entre amis où les blagues, les références communes et les anecdotes font partie intégrante du plaisir de jouer.

## Public cible

Projet Blackout est conçu pour un groupe d'amis adultes.
Le jeu n'est **pas** pensé comme un jeu familial ou intergénérationnel.
L'humour peut être plus piquant, absurde ou basé sur des références personnelles au groupe de joueurs, tout en restant respectueux des participants.
Le jeu doit encourager les discussions, les défis et les situations amusantes sans mettre un joueur mal à l'aise.

## Personnalisation

L'une des particularités du projet est qu'il est fortement personnalisé.
Les personnages, cartes et événements pourront contenir des références à des amis, des anecdotes, des surnoms ou des blagues internes.
Ces références font partie de l'identité du jeu et ne doivent pas être considérées comme des données génériques.
Claude peut proposer des idées de personnages, de cartes ou de mécaniques, mais elles doivent toujours être vues comme des brouillons ou des sources d'inspiration.
La version finale du contenu sera toujours rédigée et validée par le créateur du projet afin de conserver son humour, son style et les références propres à son groupe d'amis.

## Rôle de Claude

Claude agit comme un assistant de conception et de développement.
Il peut :
- proposer des mécaniques de jeu ;
- suggérer des équilibrages ;
- imaginer des idées de cartes ;
- proposer des personnages ;
- aider à améliorer une règle ;
- détecter les incohérences du gameplay.

En revanche, Claude ne doit jamais considérer ses propositions comme définitives.
Les éléments suivants restent entièrement sous le contrôle du créateur du projet :
- les règles du jeu ;
- les personnages ;
- les pouvoirs des personnages ;
- les cases Événements ;
- les cartes Action ;
- les cartes Vérité ;
- les bonus ;
- les malus ;
- les textes affichés aux joueurs ;
- le ton et l'humour du jeu.

Lorsqu'une proposition est faite, Claude doit la présenter comme une idée modifiable et encourager son adaptation plutôt que de chercher à imposer une version finale.

## Concept du jeu

Le fonctionnement est inspiré des jeux de l'oie.
Chaque joueur possède un pion qui progresse sur un plateau composé de différentes cases.
Le but est d'atteindre la dernière case afin de remporter la partie.
À chaque tour :
1. le joueur lance un dé ;
2. il avance sur le plateau ;
3. l'effet de la case est immédiatement appliqué.

Les parties doivent rester rapides, dynamiques et générer régulièrement des interactions entre les joueurs.

## Types de cases

Le plateau mélange plusieurs catégories de cases.

### Cases positives

Récompensent le joueur.
Exemples :
- +1 point
- +2 points
- +3 points
- avancer de X cases

### Cases négatives

Imposent au joueur de donner des points à d'autres joueurs.
Exemples :
- +1 point pour un adversaire
- +2 points pour un adversaire
- +3 points pour un adversaire
- reculer de X cases

### Cases Événement

Déclenchent un effet particulier.
Exemples :
- avancer
- reculer
- échanger de place
- revenir au départ
- rejouer
- perdre un tour

### Cartes Action

Permettent d'interagir directement avec les autres joueurs. Cela peut être des actions à faire en dehors de la web-app, entre les joueurs.

### Cartes Vérité

Questions destinées à faire rire, lancer des discussions ou rappeler des anecdotes du groupe.

## Système de points

En plus de la progression sur le plateau, chaque joueur possède un score.
Principe :
- un bonus ajoute des points au joueur ;
- un malus lui fait distribuer des points aux autres joueurs.

Le score apporte des interactions supplémentaires mais la victoire reste déterminée par l'arrivée sur la dernière case.

## Cartes Personnage

En début de partie, chaque joueur reçoit aléatoirement un personnage possédant une capacité unique active pendant toute la partie.
Claude peut proposer des idées de capacités ou d'équilibrage, mais le choix final du personnage, de son nom, de son pouvoir et de son texte appartient exclusivement au créateur du projet.

## Philosophie de gameplay

Le jeu ne cherche pas à être un jeu de stratégie complexe.
Les priorités sont :
- provoquer des rires ;
- favoriser les interactions entre amis ;
- créer des retournements de situation ;
- générer des anecdotes mémorables ;
- maintenir une partie dynamique.

Le fun passe avant l'équilibrage parfait.
Une règle légèrement imparfaite mais très amusante est préférable à une mécanique parfaitement équilibrée mais peu divertissante.

## Direction artistique

L'inspiration principale est le jeu de société **Faraway**.
La direction artistique recherchée est :
- colorée ;
- chaleureuse ;
- fantastique ;
- très illustrée ;
- premium.

L'application doit donner l'impression de manipuler un véritable jeu de société plutôt qu'une application classique.

## UX

Le jeu est conçu en **mobile-first**.
Chaque interaction doit être rapide.
Les joueurs doivent passer davantage de temps à rire et discuter qu'à manipuler le téléphone.

## Principes de développement

Lors de chaque proposition technique ou fonctionnelle :
- privilégier la simplicité ;
- privilégier le plaisir de jeu ;
- éviter les mécaniques difficiles à expliquer ;
- favoriser les interactions entre joueurs ;
- conserver des parties d'environ 15 à 30 minutes ;
- penser mobile-first ;
- produire un code propre, fortement typé et facilement extensible.

Avant toute proposition de contenu (cartes, personnages, règles ou événements), Claude doit garder à l'esprit que ces éléments constituent l'identité du jeu et seront systématiquement revus, adaptés ou réécrits par le créateur afin de conserver son humour, son style d'écriture et les références propres à son groupe d'amis.
Chaque nouvelle fonctionnalité doit répondre à la question :
« Est-ce que cela rend la partie plus drôle et plus mémorable pour un groupe d'amis ? »

## Stack technique

Le projet est développé comme une **Progressive Web App (PWA)** pensée en priorité pour les smartphones.

### Principes

- Architecture moderne et maintenable.
- Code fortement typé.
- Séparation claire entre la logique métier, les données du jeu et l'interface.
- Favoriser les solutions simples et éprouvées avant d'ajouter de la complexité.
- Les contenus du jeu (cartes, personnages, règles, événements...) doivent être facilement modifiables sans toucher à la logique métier.

### Frontend

Privilégier un framework moderne avec un bon écosystème et une excellente expérience développeur.
Le choix final du framework reste ouvert, mais les solutions basées sur TypeScript sont à privilégier.

### Backend

Le backend doit rester léger et répondre uniquement aux besoins du jeu :
- gestion des parties ;
- persistance des données si nécessaire ;
- authentification si elle apporte une réelle valeur.

Éviter toute complexité inutile.

### Données

Les données du jeu (cartes, personnages, événements, cases, pouvoirs, etc.) doivent être indépendantes du code métier.
Privilégier un format facilement éditable (JSON, YAML, base de données ou équivalent) afin de permettre des ajustements fréquents de l'équilibrage et du contenu.

### Temps réel

Le choix de la technologie reste libre tant qu'elle est simple, fiable.

### Interface

L'interface doit être :
- mobile-first ;
- responsive ;
- fluide ;
- accessible ;
- agréable à utiliser sur de petits écrans.

Les animations doivent enrichir l'expérience sans ralentir le jeu.

### Qualité du code

Claude doit produire un code :
- lisible ;
- modulaire ;
- documenté lorsque cela apporte de la valeur ;
- facilement testable ;
- évolutif.

Lorsqu'il existe plusieurs solutions techniques pertinentes, Claude doit expliquer brièvement les avantages et inconvénients de chacune avant de proposer une recommandation, sans imposer une technologie particulière.

## Autres précisions

Pour cela je souhaite faire fonctionner la webapp avec Vercel, Netlify ou un autre. Le code de la webapp ne doit pas permettre à des utilisateurs de voir et d'obtenir la clef claude ayant permit le développement de la webapp.
Le site https://21st.dev/community/templates/s/dashboard peut être consulté pour s'inspirer d'interfaces gratuites de qualité.
