import type { Player } from "../game/types";

export function createPlayer(name: string): Player {
  return {
    id: crypto.randomUUID(),
    name,
    characterId: null,
    position: 0,
    goulees: 0,
  };
}
