import type { Square, SquareType } from "../game/types";

/**
 * The real board layout, transcribed from the creator's "Cases plateau.rtf".
 * id 0 = DÉPART and id 66 = arrivée aren't listed in that file (they're the
 * dedicated start/finish squares); ids 1–65 match the file's numbering exactly.
 */
type Def = SquareType | [SquareType, number];

const defs: Def[] = [
  "start", // 0
  "returnToStart", // 1
  ["positive", 2], // 2
  ["positive", 1], // 3
  ["negative", 1], // 4
  "event", // 5
  "event", // 6
  ["positive", 7], // 7
  ["positive", 1], // 8
  ["negative", 1], // 9
  ["positive", 2], // 10
  "action", // 11
  ["negative", 1], // 12
  "action", // 13
  "event", // 14
  ["negative", 1], // 15
  ["negative", 1], // 16
  "action", // 17
  ["positive", 1], // 18
  ["positive", 3], // 19
  ["negative", 1], // 20
  "event", // 21
  ["positive", 2], // 22
  "event", // 23
  ["negative", 1], // 24
  "event", // 25
  ["positive", 1], // 26
  "action", // 27
  ["positive", 1], // 28
  "action", // 29
  "event", // 30
  "event", // 31
  ["positive", 1], // 32
  ["positive", 9], // 33
  ["positive", 1], // 34
  ["negative", 1], // 35
  ["positive", 1], // 36
  "event", // 37
  "action", // 38
  "action", // 39
  ["positive", 2], // 40
  ["positive", 1], // 41
  ["negative", 1], // 42
  ["positive", 2], // 43
  ["positive", 1], // 44
  "event", // 45
  "event", // 46
  ["positive", 5], // 47
  ["negative", 5], // 48
  ["positive", 5], // 49
  "action", // 50
  ["negative", 1], // 51
  ["positive", 1], // 52
  "event", // 53
  "action", // 54
  ["positive", 2], // 55
  "action", // 56
  "event", // 57
  "event", // 58
  ["positive", 2], // 59
  "returnToStart", // 60
  ["positive", 1], // 61
  "action", // 62
  ["negative", 1], // 63
  ["negative", 2], // 64
  ["positive", 3], // 65
  "finish", // 66
];

export const squares: Square[] = defs.map((def, id) => {
  if (Array.isArray(def)) {
    const [type, goulees] = def;
    return { id, type, goulees };
  }
  return { id, type: def };
});
