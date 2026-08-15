export type SquareType =
  | "start"
  | "finish"
  | "positive"
  | "negative"
  | "returnToStart"
  | "action"
  | "event";

export interface Square {
  id: number;
  type: SquareType;
  /** Goulées gained (positive) or given away (negative). */
  goulees?: number;
}

export interface Character {
  id: string;
  name: string;
  /** Fixed identity color — the character carries it, not the player who draws it. */
  color: string;
  /** Power description; empty string where the creator hasn't written one yet. */
  power: string;
  /** Full illustrated character card (portrait, name + catchphrase baked into the art). */
  image: string;
  /** Round token/portrait crop used for every small avatar (pawn, banner, chips, lists). */
  token: string;
  /** True for the handful of characters whose power is wired into an actual in-game action (see gameStore.usePower). Draft: all others stay reference-only until confirmed. */
  hasInGamePower?: boolean;
}

export interface Player {
  id: string;
  /** Real name, entered at setup — kept as secondary context once the character is revealed. */
  name: string;
  /** Assigned at the group reveal; null while still in the lobby. */
  characterId: string | null;
  position: number;
  goulees: number;
  /** True once this player has spent their character's in-game power for the game (draft: one use per game — not used by characters with a recharging power, e.g. Céssou). */
  powerUsed?: boolean;
  /** How many of this player's own turns have started — drives Loïc's every-4th-turn skip, and Céssou's unlock/recharge timing. */
  turnsPlayed?: number;
  /** Turn count (compared against turnsPlayed) at which a recharging power becomes usable again — currently only Céssou. */
  powerAvailableAtTurn?: number;
  /** Set by a "skipTurn" event square; consumed (and cleared) the next time this player's turn comes up. */
  skipNextTurn?: boolean;
  /** True once Antonin overshoots the finish square — eliminated from movement/turns for the rest of the game. */
  isDead?: boolean;
}

export type ActionCardEffect =
  | { kind: "swapWithLast" }
  | { kind: "returnToStart" }
  | { kind: "goToSquare"; square: number }
  | { kind: "advance"; amount: number }
  | { kind: "retreat"; amount: number }
  | { kind: "skipNextTurn" };

/** Cards that affect pawn movement on the board — drawn on landing on a "case action". */
export interface ActionCard {
  id: string;
  /** The card's quote/catchphrase. */
  title: string;
  /** Plain-language description of the effect, as printed on the card. */
  text: string;
  effect: ActionCardEffect;
}

/** Cards resolved between players, off the board (drinking-game style) — drawn on a "case événement". */
export interface EventCard {
  id: string;
  title: string;
  text: string;
}

/** "event" is reserved for a genuinely drawn Event card (shows its illustration).
 *  "info" is every other neutral/mechanical announcement — a character power result,
 *  a skipped turn, an elimination — none of which have a card to show. */
export type RevealKind = "action" | "event" | "positive" | "negative" | "info";

export interface Reveal {
  kind: RevealKind;
  title: string;
  body: string;
  /** Optional character card art — shown for reveals tied to a specific character's power/trait. */
  image?: string;
}
