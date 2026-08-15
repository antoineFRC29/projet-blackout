import { characters } from "../data/characters";
import type { Player } from "./types";

export function getCharacter(characterId: string | null) {
  return characters.find((c) => c.id === characterId);
}

/**
 * Power text is written as "« catchphrase » — effect". The catchphrase is
 * already baked into the character's card art, so anywhere the full card
 * image is shown, only the effect half should repeat alongside it.
 */
export function powerEffect(power: string): string {
  const marker = "» —";
  const idx = power.indexOf(marker);
  return idx === -1 ? power : power.slice(idx + marker.length).trim();
}

/**
 * Deals one unique character to each player — capped by the roster size,
 * since duplicate characters aren't allowed. The lobby enforces the same
 * cap when adding players.
 */
export function assignCharacters(players: Player[]): Player[] {
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  return players.map((player, i) => ({ ...player, characterId: shuffled[i].id }));
}
