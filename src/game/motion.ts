/** Duration of a single square-to-square hop in the pawn's walking animation. */
export const HOP_DURATION_MS = 280;

/** Extra pause after the pawn finishes walking, before the square's effect reveals. */
export const WALK_BUFFER_MS = 350;

/** Caps how long any single walk animation can run — without this, a long jump (Carl's
 *  +28 roll bonus, an Action card's "avancez de 55 cases") would crawl square by square
 *  for many seconds instead of reading as a brisk, visible move. */
export const MAX_WALK_MS = 1600;
