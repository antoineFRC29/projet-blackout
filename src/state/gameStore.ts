import { create } from "zustand";
import type { ActionCard, EventCard, Player, Reveal } from "../game/types";
import { squares } from "../data/squares";
import { actionCards, eventCards } from "../data/cards";
import { getCharacter } from "../game/characters";
import { HOP_DURATION_MS, WALK_BUFFER_MS, MAX_WALK_MS } from "../game/motion";

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

/** Fisher-Yates shuffle of a card list's ids — the draw order for a fresh deck. */
function shuffledIds<T extends { id: string }>(list: T[]): string[] {
  const ids = list.map((c) => c.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}

/** Draws the next card from a shuffled deck, reshuffling a fresh one once it's exhausted —
 *  same behavior as a real card deck: no repeats until every card has been seen. */
function drawCard<T extends { id: string }>(deck: string[], all: T[]): { card: T; deck: string[] } {
  const remaining = deck.length > 0 ? deck : shuffledIds(all);
  const [id, ...rest] = remaining;
  const card = all.find((c) => c.id === id)!;
  return { card, deck: rest };
}

function characterName(player: Player): string {
  return getCharacter(player.characterId)?.name ?? player.name;
}

function rollTwoDice(): number {
  return 1 + Math.floor(Math.random() * 6) + (1 + Math.floor(Math.random() * 6));
}

function alive(players: Player[]): Player[] {
  return players.filter((p) => !p.isDead);
}

/** Turns Céssou must wait before his power unlocks, and again between each use. */
const CESSOU_POWER_COOLDOWN_TURNS = 5;

/** Whether a player's character power is currently usable — most button powers are once-per-game
 *  (`powerUsed`), but Céssou's recharges on a turn-count timer instead. */
export function isPowerReady(player: Player, character: ReturnType<typeof getCharacter>): boolean {
  if (!character?.hasInGamePower) return false;
  if (character.id === "cessou") {
    const turnsPlayed = player.turnsPlayed ?? 0;
    return turnsPlayed >= (player.powerAvailableAtTurn ?? CESSOU_POWER_COOLDOWN_TURNS);
  }
  return !player.powerUsed;
}

interface PendingMalus {
  playerId: string;
  amount: number;
}

interface PendingPowerChoice {
  characterId: string;
  playerId: string;
}

interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  /** The two individual die faces from the last roll. */
  dieValues: [number, number];
  isRolling: boolean;
  /** True while the pawn is walking to its new square, before the square's effect is revealed. */
  isResolving: boolean;
  /** Set when a malus square is landed on and the player must pick who receives the goulées. */
  pendingMalus: PendingMalus | null;
  /** Set when a power needs a target player picked (currently Corentin's swap). */
  pendingPowerChoice: PendingPowerChoice | null;
  reveal: Reveal | null;
  winnerId: string | null;
  /** Squares armed by a power (Carl) to add onto the very next roll's total, then consumed. */
  pendingDiceBonus: number;
  /** The full adjusted total (dice + character modifier + power bonus) behind the last settled roll. */
  lastMoveTotal: number;
  /** Feedback shown after using a power — separate from `reveal` so dismissing it doesn't advance the turn. */
  powerResult: Reveal | null;
  /** Flavor toast (Lucien's double) — stacks above a same-time regular reveal; dismissed by tapping it, same as any other reveal. */
  flavorReveal: Reveal | null;
  /** Shuffled draw order (remaining card ids) for Action/Event cards — reshuffled once exhausted. */
  actionDeck: string[];
  eventDeck: string[];
  startGame: (players: Player[]) => void;
  rollDie: () => void;
  chooseMalusTarget: (targetId: string) => void;
  choosePowerTarget: (targetId: string) => void;
  dismissReveal: () => void;
  usePower: () => void;
  dismissPowerResult: () => void;
  dismissFlavorReveal: () => void;
}

const lastSquareId = squares.length - 1;

/** Clamps a delta move within the board, bouncing back off the finish line like a normal
 *  roll would (the same jeu-de-l'oie overshoot rule) — used for Action-card advance/retreat. */
function boundedMove(position: number, delta: number): number {
  const raw = position + delta;
  if (raw > lastSquareId) return Math.max(0, lastSquareId - (raw - lastSquareId));
  return Math.max(0, raw);
}

function applyActionCardEffect(
  card: ActionCard,
  player: Player,
  players: Player[]
): { player: Player; players: Player[]; extra?: string } {
  let updated = { ...player };
  let all = players;
  let extra: string | undefined;

  switch (card.effect.kind) {
    case "swapWithLast": {
      const others = alive(players).filter((p) => p.id !== player.id);
      if (others.length > 0) {
        const minPos = Math.min(...others.map((p) => p.position));
        const target = randomFrom(others.filter((p) => p.position === minPos));
        const myPos = updated.position;
        all = players.map((p) => (p.id === target.id ? { ...p, position: myPos } : p));
        updated.position = target.position;
        extra = `Échange avec ${characterName(target)}.`;
      }
      break;
    }
    case "returnToStart":
      updated.position = 0;
      break;
    case "goToSquare":
      updated.position = Math.min(lastSquareId, Math.max(0, card.effect.square));
      break;
    case "advance": {
      const character = getCharacter(updated.characterId);
      const raw = updated.position + card.effect.amount;
      if (character?.id === "antonin" && raw > lastSquareId) {
        updated.isDead = true;
        extra = "Score dépassé — votre personnage meurt.";
      } else {
        updated.position = boundedMove(updated.position, card.effect.amount);
      }
      break;
    }
    case "retreat":
      updated.position = boundedMove(updated.position, -card.effect.amount);
      break;
    case "skipNextTurn":
      updated.skipNextTurn = true;
      break;
  }

  return { player: updated, players: all, extra };
}

function resolveSquare(
  player: Player,
  players: Player[],
  multiplier: number,
  actionCard?: ActionCard,
  eventCard?: EventCard
): { player: Player; players: Player[]; reveal: Reveal | null } {
  const square = squares[player.position];
  let updated = { ...player };
  let all = players;
  let reveal: Reveal | null = null;

  switch (square.type) {
    case "positive": {
      const amount = (square.goulees ?? 1) * multiplier;
      updated.goulees += amount;
      reveal = { kind: "positive", title: "Case bonus", body: `+${amount} goulée${amount > 1 ? "s" : ""} !` };
      break;
    }
    case "negative": {
      // Only reached when there's no living opponent to choose from — resolve on the spot.
      const amount = (square.goulees ?? 1) * multiplier;
      updated.goulees = Math.max(0, updated.goulees - amount);
      reveal = { kind: "negative", title: "Case malus", body: `Perd ${amount} goulée${amount > 1 ? "s" : ""}.` };
      break;
    }
    case "returnToStart":
      updated.position = 0;
      reveal = { kind: "info", title: "Retour à la case départ", body: "Vous retournez à la case départ !" };
      break;
    case "event": {
      if (eventCard) {
        reveal = { kind: "event", title: `« ${eventCard.title} »`, body: eventCard.text };
      }
      break;
    }
    case "action": {
      if (actionCard) {
        const result = applyActionCardEffect(actionCard, updated, players);
        updated = result.player;
        all = result.players;
        reveal = {
          kind: "action",
          title: `« ${actionCard.title} »`,
          body: result.extra ? `${actionCard.text} ${result.extra}` : actionCard.text,
        };
      }
      break;
    }
    case "finish":
      reveal = { kind: "positive", title: "Victoire !", body: `${characterName(player)} atteint la dernière case !` };
      break;
  }

  all = all.map((p) => (p.id === updated.id ? updated : p));
  return { player: updated, players: all, reveal };
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  dieValues: [1, 1],
  isRolling: false,
  isResolving: false,
  pendingMalus: null,
  pendingPowerChoice: null,
  reveal: null,
  winnerId: null,
  pendingDiceBonus: 0,
  lastMoveTotal: 0,
  powerResult: null,
  flavorReveal: null,
  actionDeck: [],
  eventDeck: [],

  startGame: (players) => {
    set({
      players,
      currentPlayerIndex: 0,
      dieValues: [1, 1],
      isRolling: false,
      isResolving: false,
      pendingMalus: null,
      pendingPowerChoice: null,
      reveal: null,
      winnerId: null,
      pendingDiceBonus: 0,
      lastMoveTotal: 0,
      powerResult: null,
      flavorReveal: null,
      actionDeck: shuffledIds(actionCards),
      eventDeck: shuffledIds(eventCards),
    });
  },

  rollDie: () => {
    // Check-and-set as one atomic zustand update rather than a separate get() + set(): if this
    // is ever somehow re-entered before the first call's own set() has committed, the functional
    // form still evaluates against the true current state, so only one call can ever proceed.
    let canRoll = false;
    set((state) => {
      if (state.isRolling || state.isResolving || state.reveal || state.pendingMalus || state.pendingPowerChoice || state.powerResult) {
        return state;
      }
      canRoll = true;
      return { ...state, isRolling: true };
    });
    if (!canRoll) return;

    const rollA = 1 + Math.floor(Math.random() * 6);
    const rollB = 1 + Math.floor(Math.random() * 6);
    window.setTimeout(() => {
      const { players, currentPlayerIndex, pendingDiceBonus } = get();
      const player = players[currentPlayerIndex];
      const character = getCharacter(player.characterId);

      // Permanent per-character dice modifiers (Antoine/Étienne/T-Max) — unconditional, no button.
      let total = rollA + rollB;
      if (character?.id === "antoine") total = Math.floor(total / 2);
      if (character?.id === "etienne") total *= 2;
      if (character?.id === "tmax") total += 6;
      // Fold in and consume any power-armed bonus (Carl's +28) on this roll.
      total += pendingDiceBonus;

      // Lucien's double is a real-world flavor cue — non-blocking, doesn't touch movement.
      let flavorReveal: Reveal | null = null;
      if (rollA === rollB && character?.id === "lucien" && character.power) {
        flavorReveal = { kind: "info", title: "Double !", body: character.power, image: character.image };
      }

      set({
        dieValues: [rollA, rollB],
        isRolling: false,
        isResolving: true,
        pendingDiceBonus: 0,
        lastMoveTotal: total,
        flavorReveal,
      });

      const rawNext = player.position + total;
      const isAntoninDeath = character?.id === "antonin" && rawNext > lastSquareId;

      let nextPosition: number;
      if (isAntoninDeath) {
        nextPosition = player.position; // his move is cancelled — he dies instead of bouncing
      } else if (rawNext > lastSquareId) {
        // Classic jeu-de-l'oie rule: overshooting the finish bounces back by the excess.
        nextPosition = Math.max(0, lastSquareId - (rawNext - lastSquareId));
      } else {
        nextPosition = rawNext;
      }

      const squaresCrossed = Math.max(1, Math.abs(nextPosition - player.position));
      const moved = { ...player, position: nextPosition };
      const withMove = players.map((p) => (p.id === moved.id ? moved : p));
      set({ players: withMove });

      // Matches how long the pawn actually takes to hop square by square (see Pawn.tsx),
      // so the effect never appears before the walk has visibly finished. Capped at
      // MAX_WALK_MS so a big total (T-Max, Carl's +28) still reads as a brisk move.
      const walkMs = Math.min(squaresCrossed * HOP_DURATION_MS, MAX_WALK_MS) + WALK_BUFFER_MS;
      window.setTimeout(() => {
        const { players: current } = get();
        const currentMoved = current.find((p) => p.id === moved.id) ?? moved;

        if (isAntoninDeath) {
          const withDeath = current.map((p) => (p.id === currentMoved.id ? { ...p, isDead: true } : p));
          set({
            isResolving: false,
            players: withDeath,
            reveal: {
              kind: "negative",
              title: "Antonin Sans-Frein",
              body: "Score dépassé, pas d'atterrissage exact sur la dernière case — votre personnage meurt.",
              image: character?.image,
            },
          });
          return;
        }

        const landedSquare = squares[currentMoved.position];
        const actingCharacter = getCharacter(currentMoved.characterId);
        const multiplier = actingCharacter?.id === "basile" ? 2 : 1;

        if (landedSquare.type === "negative") {
          if (actingCharacter?.id === "pierre") {
            set({
              isResolving: false,
              reveal: {
                kind: "negative",
                title: "Case malus",
                body: "«Trop beau.. Trop merveilleux» — Aucun malus ne peut atteindre Pierre !",
                image: actingCharacter.image,
              },
            });
            return;
          }
          const opponents = alive(current).filter((p) => p.id !== currentMoved.id);
          if (opponents.length > 0) {
            // Let the player pick who pays the price, rather than picking for them.
            set({
              isResolving: false,
              pendingMalus: { playerId: currentMoved.id, amount: (landedSquare.goulees ?? 1) * multiplier },
            });
            return;
          }
        }

        let actionCard: ActionCard | undefined;
        let eventCard: EventCard | undefined;
        let { actionDeck, eventDeck } = get();
        if (landedSquare.type === "action") {
          const drawn = drawCard(actionDeck, actionCards);
          actionCard = drawn.card;
          actionDeck = drawn.deck;
        }
        if (landedSquare.type === "event") {
          const drawn = drawCard(eventDeck, eventCards);
          eventCard = drawn.card;
          eventDeck = drawn.deck;
        }

        const { players: resolved, reveal, player: finalPlayer } = resolveSquare(currentMoved, current, multiplier, actionCard, eventCard);
        const winnerId = finalPlayer.position === lastSquareId ? finalPlayer.id : get().winnerId;

        // A card/square effect (Action-card advance, "retour à la case départ") can move the
        // pawn again beyond where it just walked to — apply that move now, so it's visible,
        // and hold the reveal card until that second hop has actually finished playing out.
        const extraSquares = Math.abs(finalPlayer.position - currentMoved.position);
        if (extraSquares > 0) {
          set({ players: resolved, actionDeck, eventDeck });
          const extraWalkMs = Math.min(extraSquares * HOP_DURATION_MS, MAX_WALK_MS) + WALK_BUFFER_MS;
          window.setTimeout(() => {
            set({ isResolving: false, reveal, winnerId });
          }, extraWalkMs);
        } else {
          set({ isResolving: false, players: resolved, reveal, actionDeck, eventDeck, winnerId });
        }
      }, walkMs);
    }, 650);
  },

  // From here down, every action uses the functional set(state => ...) form and reads
  // exclusively from that `state` argument (never a get() taken before the update) — the same
  // defensive-atomicity habit as rollDie, so a re-entrant call always sees what the previous
  // one just committed instead of racing it off a shared, pre-update snapshot.

  chooseMalusTarget: (targetId) => {
    set((state) => {
      const { pendingMalus, players } = state;
      if (!pendingMalus) return state;
      const { playerId, amount } = pendingMalus;
      const target = players.find((p) => p.id === targetId);
      const resolved = players.map((p) => {
        if (p.id === playerId) return { ...p, goulees: Math.max(0, p.goulees - amount) };
        if (p.id === targetId) return { ...p, goulees: p.goulees + amount };
        return p;
      });
      return {
        ...state,
        pendingMalus: null,
        players: resolved,
        reveal: {
          kind: "negative",
          title: "Case malus",
          body: `Donne ${amount} goulée${amount > 1 ? "s" : ""} à ${target ? characterName(target) : "un adversaire"}.`,
        },
      };
    });
  },

  choosePowerTarget: (targetId) => {
    set((state) => {
      const { pendingPowerChoice, players } = state;
      if (!pendingPowerChoice) return state;
      const { playerId, characterId } = pendingPowerChoice;
      const player = players.find((p) => p.id === playerId);
      const target = players.find((p) => p.id === targetId);
      if (!player || !target) return { ...state, pendingPowerChoice: null };

      if (characterId === "corentin") {
        const myPosition = player.position;
        const updated = players.map((p) => {
          if (p.id === playerId) return { ...p, position: target.position };
          if (p.id === targetId) return { ...p, position: myPosition };
          return p;
        });
        return {
          ...state,
          pendingPowerChoice: null,
          players: updated,
          powerResult: {
            kind: "info",
            title: "Pouvoir de Corentin",
            body: `Échange de place avec ${characterName(target)} !`,
            image: getCharacter(characterId)?.image,
          },
        };
      }
      return state;
    });
  },

  dismissReveal: () => {
    set((state) => {
      if (state.winnerId) return { ...state, reveal: null };
      if (!state.reveal) return state;

      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      const nextPlayer = state.players[nextIndex];

      if (nextPlayer.isDead) {
        return {
          ...state,
          currentPlayerIndex: nextIndex,
          reveal: {
            kind: "info",
            title: "Élimination",
            body: `${characterName(nextPlayer)} est éliminé et ne joue plus.`,
            image: getCharacter(nextPlayer.characterId)?.image,
          },
        };
      }

      const nextChar = getCharacter(nextPlayer.characterId);
      const turnsPlayed = (nextPlayer.turnsPlayed ?? 0) + 1;
      const loicSkip = nextChar?.id === "loic" && turnsPlayed % 4 === 0;
      const eventSkip = !!nextPlayer.skipNextTurn;
      const players = state.players.map((p) => (p.id === nextPlayer.id ? { ...p, turnsPlayed, skipNextTurn: false } : p));

      if (loicSkip || eventSkip) {
        return {
          ...state,
          players,
          currentPlayerIndex: nextIndex,
          reveal: {
            kind: "info",
            title: loicSkip ? "Pouvoir de Loïc" : "Tour passé",
            body: loicSkip
              ? "« Tu veux pas t'inscrire à la croisade Hyrox ? » — Faut se coucher avant 18h pour bien récupérer. Loïc passe son tour."
              : `${characterName(nextPlayer)} passe son tour.`,
            image: loicSkip ? nextChar?.image : undefined,
          },
        };
      }

      return { ...state, reveal: null, currentPlayerIndex: nextIndex, players };
    });
  },

  /**
   * Draft mechanics for the characters wired up so far — Claude's reading of the
   * creator-approved power text, not a confirmed final version (see the note atop
   * data/characters.ts). Every button-triggered power here is usable only on your
   * own turn, only before rolling (guarded the same way rollDie is) — once per
   * game, except Céssou, whose power unlocks and then recharges every 5 turns
   * (see isPowerReady).
   */
  usePower: () => {
    // Atomically claim the use (see rollDie for why a plain get()-then-set() guard isn't enough)
    // by marking powerUsed as part of the same functional update that checks eligibility.
    let player = get().players[get().currentPlayerIndex];
    let character = getCharacter(player.characterId);
    let players = get().players;
    let canUse = false;
    set((state) => {
      const p = state.players[state.currentPlayerIndex];
      const c = getCharacter(p.characterId);
      if (state.isRolling || state.isResolving || state.reveal || state.pendingMalus || state.pendingPowerChoice || state.powerResult) return state;
      if (!isPowerReady(p, c)) return state;
      canUse = true;
      player = p;
      character = c;
      players = state.players.map((pl) => (pl.id === p.id ? { ...pl, powerUsed: true } : pl));
      return { ...state, players };
    });
    if (!canUse || !character) return;

    if (character.id === "carl") {
      set({
        pendingDiceBonus: 28,
        powerResult: {
          kind: "positive",
          title: "Pouvoir de Carl",
          body: "+28 seront ajoutés à son prochain lancer de dés !",
          image: character.image,
        },
      });
      return;
    }

    if (character.id === "jules" || character.id === "erwann") {
      const opponentId = character.id === "jules" ? "erwann" : "jules";
      const opponent = alive(players).find((p) => p.characterId === opponentId);
      if (!opponent) return;
      const mine = rollTwoDice();
      const theirs = rollTwoDice();
      let updated = players;
      let body: string;
      if (mine > theirs) {
        const myPosition = player.position;
        updated = updated.map((p) => {
          if (p.id === player.id) return { ...p, position: opponent.position };
          if (p.id === opponent.id) return { ...p, position: myPosition };
          return p;
        });
        body = `${character.name} gagne le duel (${mine} contre ${theirs}) et échange de place avec ${characterName(opponent)} !`;
      } else if (mine < theirs) {
        body = `${character.name} perd le duel (${mine} contre ${theirs}). Rien ne se passe.`;
      } else {
        body = `Égalité (${mine} partout) ! Rien ne se passe.`;
      }
      set({ players: updated, powerResult: { kind: "info", title: "Duel de dés", body, image: character.image } });
      return;
    }

    if (character.id === "cessou") {
      const others = alive(players).filter((p) => p.id !== player.id);
      const leader = others.reduce((a, b) => (b.position > a.position ? b : a), others[0]);
      const nextAvailableAtTurn = (player.turnsPlayed ?? 0) + CESSOU_POWER_COOLDOWN_TURNS;
      let updated = players.map((p) => (p.id === player.id ? { ...p, powerAvailableAtTurn: nextAvailableAtTurn } : p));
      let body: string;
      if (!leader || leader.position <= player.position) {
        body = "Céssou est déjà en tête (ou à égalité) — rien ne se passe.";
      } else {
        updated = updated.map((p) => (p.id === leader.id ? { ...p, position: player.position } : p));
        body = `${characterName(leader)} est ramené sur la case de Céssou !`;
      }
      set({ players: updated, powerResult: { kind: "info", title: "Pouvoir de Céssou", body, image: character.image } });
      return;
    }

    if (character.id === "corentin") {
      const others = alive(players).filter((p) => p.id !== player.id);
      if (others.length === 0) return;
      set({ pendingPowerChoice: { characterId: "corentin", playerId: player.id } });
    }
  },

  dismissPowerResult: () => set({ powerResult: null }),
  dismissFlavorReveal: () => set({ flavorReveal: null }),
}));
