import type { Character } from "../game/types";

import basileCard from "../assets/characters/cards/basile.jpg";
import julesCard from "../assets/characters/cards/jules.jpg";
import lucienCard from "../assets/characters/cards/lucien.jpg";
import cessouCard from "../assets/characters/cards/cessou.jpg";
import antoineCard from "../assets/characters/cards/antoine.jpg";
import erwannCard from "../assets/characters/cards/erwann.jpg";
import germainCard from "../assets/characters/cards/germain.jpg";
import loicCard from "../assets/characters/cards/loic.jpg";
import pierreCard from "../assets/characters/cards/pierre.jpg";
import tmaxCard from "../assets/characters/cards/tmax.jpg";
import vincentCard from "../assets/characters/cards/vincent.jpg";
import nathanaelCard from "../assets/characters/cards/nathanael.jpg";
import etienneCard from "../assets/characters/cards/etienne.jpg";
import damienCard from "../assets/characters/cards/damien.jpg";
import corentinCard from "../assets/characters/cards/corentin.jpg";
import antoninCard from "../assets/characters/cards/antonin.jpg";
import carlCard from "../assets/characters/cards/carl.jpg";

import basileToken from "../assets/characters/tokens/basile.png";
import julesToken from "../assets/characters/tokens/jules.png";
import lucienToken from "../assets/characters/tokens/lucien.png";
import cessouToken from "../assets/characters/tokens/cessou.png";
import antoineToken from "../assets/characters/tokens/antoine.png";
import erwannToken from "../assets/characters/tokens/erwann.png";
import germainToken from "../assets/characters/tokens/germain.png";
import loicToken from "../assets/characters/tokens/loic.png";
import pierreToken from "../assets/characters/tokens/pierre.png";
import tmaxToken from "../assets/characters/tokens/tmax.png";
import vincentToken from "../assets/characters/tokens/vincent.png";
import nathanaelToken from "../assets/characters/tokens/nathanael.png";
import etienneToken from "../assets/characters/tokens/etienne.png";
import damienToken from "../assets/characters/tokens/damien.png";
import corentinToken from "../assets/characters/tokens/corentin.png";
import antoninToken from "../assets/characters/tokens/antonin.png";
import carlToken from "../assets/characters/tokens/carl.png";

/**
 * Final, creator-validated roster (17 characters — see "Fichier Cartes/Liste
 * personnages.rtf"). Names are definitive. Power text is copied verbatim from
 * "Fichier Cartes/Pouvoirs personnages.rtf" (catchphrase + effect, joined by
 * "—"); all 17 are now written. Card/token art is the creator's final
 * illustrated assets, sourced from "Fichier Cartes/Carte Personnages" and
 * "Fichier Cartes/Jeton Personnages" (resized/compressed for the web build).
 *
 * Most of the roster is still reference/flavor only. Ten characters now have
 * a real in-game implementation (see gameStore.ts) — Claude's interpretation
 * of the creator-approved power text, not a confirmed final mechanic:
 *
 * Button-triggered ("Pouvoir" button, `hasInGamePower: true`, once per game,
 * before rolling, greyed out for everyone else):
 * - cessou: pulls the current leader back onto his square.
 * - jules/erwann: mutual dice-duel + swap-places. The two descriptions
 *   disagree on the duel's die count (Jules: "chacun en lançant é" — looks
 *   like a typo for a digit; Erwann: "chacun en lançant 2") — worth the
 *   creator double-checking. Implemented as each side rolling the normal
 *   2d6, higher total wins and swaps places, tie = no effect.
 * - carl: arms a +28 bonus that folds into (and is consumed by) his very
 *   next roll, rather than teleporting 28 squares immediately.
 * - corentin: opens a target picker, swaps position with whoever is chosen.
 *
 * Automatic (no button — triggered by the roll or by landing on a square):
 * - basile: doubles the magnitude of whatever square he lands on (goulées,
 *   event move distance). The source doc adds "(Effet visuel sur la case,
 *   halo autours de la case concernée." (sic, unclosed paren, verbatim) —
 *   implemented as a halo drawn on Basile's current square, see BoardScreen.
 * - antoine / etienne / tmax: permanent passive dice modifiers — halved,
 *   doubled, +6 respectively — applied to every roll they make.
 * - pierre: immune to negative (malus) squares entirely. The creator's
 *   newest note narrows this to "cartes action catégorisées comme malus" —
 *   that category doesn't exist yet in the placeholder action-card data, so
 *   for now this covers board malus squares only; revisit once the real
 *   Action/Event card lists (and their malus tagging) land.
 * - lucien: rolling a double (both dice equal) pops a non-blocking toast
 *   with his power text as a prompt for the group's own real-world action
 *   ("se fait hors application") — doesn't touch game state.
 * - loic: skipped automatically on every 4th of his own turns, with his
 *   power text shown as the reason.
 * - antonin: this game plays the classic jeu-de-l'oie finish rule — a roll
 *   that would overshoot the final square instead bounces the pawn back by
 *   the excess, for every character. Antonin is the one exception: an
 *   overshoot kills him instead of bouncing (`Player.isDead`) — the source
 *   doc adds "Le jeton disparait et le personnage devient grisé" (token
 *   disappears, character greys out), reflected in the pawn/rail rendering.
 *   A dead player is skipped for the rest of the game.
 */
export const characters: Character[] = [
  {
    id: "basile",
    name: "Basile des Mille Tournées",
    color: "#d67966",
    power:
      "« Goutez à ces longues îles messires » — Lorsque Basile s’arrête sur une case, ses effets s’en retrouvent doublés.",
    image: basileCard,
    token: basileToken,
  },
  {
    id: "jules",
    name: "Jules le Galant",
    color: "#d6a066",
    power:
      "«Erwann, tu vas pas voter Hugues Capet ?! » — Si le personnage « Erwann » est dans la partie alors il peut le convier à un duel de dé (chacun en lançant é). Si Jules gagne ce duel, il échange de place avec Erwann.",
    image: julesCard,
    token: julesToken,
    hasInGamePower: true,
  },
  {
    id: "lucien",
    name: "Lucien l'Alchimiste",
    color: "#d6c866",
    power:
      "« Ouais mais c’est pas toi qui décide » — Quand Lucien fait un double avec les dés, il peut ajouter un élément dans la potion du joueur de son choix. (se fait hors application, entre joueurs).",
    image: lucienCard,
    token: lucienToken,
  },
  {
    id: "cessou",
    name: "Céssou le Connétable",
    color: "#bdd666",
    power: "« Hop Hop Hop mon garçon » — Tous les 5 tours, au début de son tour, Céssou ramène le personnage en tête sur sa case.",
    image: cessouCard,
    token: cessouToken,
    hasInGamePower: true,
  },
  {
    id: "antoine",
    name: "Antoine le Boiteux",
    color: "#95d666",
    power: "«C’est encore loin?» — Tous ses scores de dés sont divisés par deux. Sale lent !",
    image: antoineCard,
    token: antoineToken,
  },
  {
    id: "erwann",
    name: "Erwann Beau-Parleur",
    color: "#6ed666",
    power:
      "« Jules, je vais t’expliquer un truc.. » — Si le personnage « Jules » est dans la partie alors il peut le convier à un duel de dé (chacun en lançant 2). Si Erwann gagne ce duel, il échange de place avec Jules.",
    image: erwannCard,
    token: erwannToken,
    hasInGamePower: true,
  },
  {
    id: "germain",
    name: "Germain Langue-Acérée",
    color: "#66d686",
    power:
      "« Ta stratégie c’est de perdre donc ? » — Le joueur se moque du dernier de la partie! Il n’y a pas idée d’être aussi nul.. (se fait hors application, entre joueurs).",
    image: germainCard,
    token: germainToken,
  },
  {
    id: "loic",
    name: "Loïc le Colosse",
    color: "#66d6ae",
    power:
      "« Tu veux pas t’inscrire à la croisade Hyrox ? » — Tous les 4 tours il doit passer son tour. Faut se coucher avant 18h pour bien récupérer.",
    image: loicCard,
    token: loicToken,
  },
  {
    id: "pierre",
    name: "Pierre le Magnifique",
    color: "#66d6d5",
    power: "« Trop beau.. Trop merveilleux » — C’est vrai qu’il est si beau.. Aucun malus ne peut l’atteindre.",
    image: pierreCard,
    token: pierreToken,
  },
  {
    id: "tmax",
    name: "T-Max le Vrombissant",
    color: "#66b0d6",
    power: "« Vroum Vroum » — MoI allER VITE ! mOI RaPIDe! Théo va vite, ses résultats ont toujours +6.",
    image: tmaxCard,
    token: tmaxToken,
  },
  {
    id: "vincent",
    name: "Vincent l'Erudit",
    color: "#6688d6",
    power:
      "«Tout Homme plongé dans du pastis en ressort bleu bite » — Récitez un article de droit ou bien servez-vous un petit jaune ! (se fait hors application, entre joueurs).",
    image: vincentCard,
    token: vincentToken,
  },
  {
    id: "nathanael",
    name: "Nathanael l'Apothicaire",
    color: "#6b66d6",
    power:
      "« PLUS FORT LE SON !!» — Vous avez la main sur le son pendant toute la partie, pensez à mettre trop fort. (se fait hors application, entre joueurs).",
    image: nathanaelCard,
    token: nathanaelToken,
  },
  {
    id: "etienne",
    name: "Etienne Pied-Léger",
    color: "#9366d6",
    power: "«C’est à deux jours de marche, j’y suis dans une heure » — Tous ses scores de dés sont doublés par deux.",
    image: etienneCard,
    token: etienneToken,
  },
  {
    id: "damien",
    name: "Damien du Triskell",
    color: "#bb66d6",
    power:
      "«L’hydromel c’est de l’eau » — Vous ne pouvez boire que de l’eau jusque la fin de la partie. (se fait hors application, entre joueurs sobres).",
    image: damienCard,
    token: damienToken,
  },
  {
    id: "corentin",
    name: "Corentin le Portraitiste",
    color: "#d666ca",
    power:
      "« Madame, vous me rappelez la marquise de Pompadour ..» — Charmeur vous pouvez échanger votre position 1 fois avec n’importe qui dans la partie.",
    image: corentinCard,
    token: corentinToken,
    hasInGamePower: true,
  },
  {
    id: "antonin",
    name: "Antonin Sans-Frein",
    color: "#d666a3",
    power:
      "« Tu finis pas ton Poppers? » — Vous n’avez décidément aucune limite .. Si vous ne faites pas un score exacte pour atterrir sur la case de fin votre personnage meurt.",
    image: antoninCard,
    token: antoninToken,
  },
  {
    id: "carl",
    name: "Carl le Bien Armé",
    color: "#d6667b",
    power: "«Carl XXVIII, en centimètres » — A tout moment, ajoutez 28 à votre score de dés.",
    image: carlCard,
    token: carlToken,
    hasInGamePower: true,
  },
];
