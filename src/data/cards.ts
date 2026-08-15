import type { ActionCard, EventCard } from "../game/types";

/**
 * The creator's real Action card list ("Cartes action et cartes évenements.rtf") —
 * each affects pawn movement on the board. Drawn without replacement from a
 * shuffled deck that reshuffles once exhausted (see gameStore's actionDeck).
 */
export const actionCards: ActionCard[] = [
  { id: "a1", title: "Après vous monseigneur", text: "Échangez de place avec le dernier.", effect: { kind: "swapWithLast" } },
  { id: "a2", title: "Oublié des clefs", text: "Retour à la case départ.", effect: { kind: "returnToStart" } },
  { id: "a3", title: "Comme le pastis", text: "Allez à la case 51.", effect: { kind: "goToSquare", square: 51 } },
  { id: "a4", title: "Suuuuuuu", text: "Avancez de 7 cases.", effect: { kind: "advance", amount: 7 } },
  {
    id: "a5",
    title: "Tu dois retourner dans le passé pour b***** ta mère Marty",
    text: "Reculez de 17 cases.",
    effect: { kind: "retreat", amount: 17 },
  },
  { id: "a6", title: "Doodle Jump", text: "Avancez de 10 cases.", effect: { kind: "advance", amount: 10 } },
  { id: "a7", title: "Ce soir je suis superman", text: "Reculez de 20 cases.", effect: { kind: "retreat", amount: 20 } },
  { id: "a8", title: "GdB", text: "Passez votre prochain tour.", effect: { kind: "skipNextTurn" } },
  { id: "a9", title: "Glazart", text: "Avancez de 55 cases.", effect: { kind: "advance", amount: 55 } },
  { id: "a10", title: "Airball…", text: "Reculez de 3 cases.", effect: { kind: "retreat", amount: 3 } },
];

/**
 * The creator's real Event card list — resolved between players, off the board
 * (drinking-game style social prompts). No board effect. Same shuffled-deck
 * draw policy as Action cards (see gameStore's eventDeck).
 */
export const eventCards: EventCard[] = [
  { id: "e1", title: "Accent circonspect", text: "Veuillez prendre un accent pour le reste de la partie ! Allez on t'écoute Michel Leeb." },
  { id: "e2", title: "One More", text: "Mettez « One More Time » ou re-remplissez votre verre." },
  {
    id: "e3",
    title: "BARI",
    text: "Placez la ville de Bari sur une carte, en cas d'erreur votre voisin de droite gagne le droit de vous biffler (bon expirant sous 24h).",
  },
  {
    id: "e4",
    title: "Théorie du ruissellement",
    text: "Tout le monde boit une gorgée dans le verre du voisin de gauche (contrairement à cette théorie).",
  },
  { id: "e5", title: "Imposition à la source", text: "Un petit shot de pur, idéalement de l'absinthe mais un rhum de pirate fera l'affaire." },
  { id: "e6", title: "Elle répondait au nom de Bella…", text: "Votez entre Edward ou Jacob, l'équipe majoritaire s'envoie 4 gorgées." },
  {
    id: "e7",
    title: "Je suis trop vieux pour ces conneries…",
    text: "Proposez une activité pour laquelle vous êtes devenu décidément trop vieux… La majorité approuve ou vous offre 3 gorgées.",
  },
  { id: "e8", title: "Jsuis Spiderman filsdepute", text: "Faites un salto ! Comment ça non ? Bon très bien, prenez 3 gorgées." },
  { id: "e9", title: "Je suis japonais, je suis japonais…", text: "Le fils du soleil levant doit désormais s'assoir en tailleur." },
  { id: "e10", title: "Pour faire la fête je suis le meilleur", text: "Prouvez-le en faisant un petit cul sec." },
  {
    id: "e11",
    title: "Je l'avais sécurisé avec le cadenas",
    text: "Aïe aïe aïe, dommage pour ce beau verre que votre voisin de droite vous a dérobé… Il vous le rend vide.",
  },
  { id: "e12", title: "Dans 20-30 ans il n'y en aura plus", text: "Un grand verre d'eau pour vous." },
  { id: "e13", title: "J'aime me battre", text: "Défiez un joueur au bras de fer chinois, le perdant boit 5 gorgées." },
  { id: "e14", title: "Georgette", text: "Reproduisez comme bon vous semble le bruit d'une georgette claquée… après, rien ne vaut l'original." },
  {
    id: "e15",
    title: "Palmashowpédie",
    text: "Tour à tour donnez des noms de sketchs du Palmashow. Le perdant boit 3 gorgées et se remet en question.",
  },
  {
    id: "e16",
    title: "Tu joues à LOL toi ?",
    text: "Tour à tour donnez des noms de personnages dans LOL. Non, Sophie Marceau ça marche pas… le perdant boit 3 gorgées.",
  },
  { id: "e17", title: "Information non vérifiée", text: "Partagez une information vous concernant à l'assemblée. Vrai ou fausse, interdit de le dire." },
  {
    id: "e18",
    title: "Manuel Ferrara ou Luchino Visconti ?",
    text: "Tour à tour donnez des noms de films grand public qui auraient pu convenir pour un film avec Manu. 3 gorgées pour « monsieur je ne regarde pas ça… ».",
  },
  {
    id: "e19",
    title: "Lugubre joueur de foot",
    text: "Donnez le nom d'un joueur de foot. Si la majorité le connaît, prenez 2 gorgées. N'est pas Arsène Wenger qui veut !",
  },
  { id: "e20", title: "Biskit", text: "Beugler tous « Biskit » avec le pouce au front, le dernier boit 7 gorgées." },
  {
    id: "e21",
    title: "24 Jump Street",
    text: "Proposez un scénario et un casting pour le prochain Jump Street. La majorité approuve ou vous offre 3 gorgées.",
  },
  {
    id: "e22",
    title: "M'enfin… jsuis quand même le parrain de ton fils",
    text: "Pointez un joueur qui ferait un bon parrain pour votre fils (pas nécessaire de lui avouer votre amour pour autant).",
  },
  { id: "e23", title: "Calimucho à toi étranger", text: "Il est temps de ruiner un verre, ajoutez ce que vous souhaitez dans le verre de votre voisin de gauche." },
  { id: "e24", title: "Quiz disney !", text: "Je déconne, bois 5 gorgées tocard." },
  {
    id: "e25",
    title: "Sans les croisés tu connais…",
    text: "Donnez un sport dans lequel vous auriez pu être pro (clairement pas le foot vu tes contrôles…).",
  },
  {
    id: "e26",
    title: "Je peux vous portez vous !",
    text: "Un grand merci aux Sams de la vie. Ceux qui ne l'ont jamais été sont redevables de 4 gorgées.",
  },
  { id: "e27", title: "LE ROCHER", text: "Tour à tour donnez des titres de films avec The Rock. L'inculte boit 3 gorgées et montre ses biceps." },
  { id: "e28", title: "JAUUUUNE", text: "Tour à tour donnez du Tour de France. Le perdant remporte 3 gorgées." },
  { id: "e29", title: "Débat parallèle", text: "Proposez un vote à 2 choix. L'équipe gagnante évite 3 gorgées." },
];
