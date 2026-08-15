---
name: Projet Blackout
description: A jeu-de-l'oie party board game for a shared phone, drawn as a clean modern app object with one owned matte accent color.
colors:
  ground: "#14161d"
  ground-deep: "#0c0d12"
  ground-light: "#1c1f28"
  amber: "#c98a3e"
  amber-deep: "#a06c2c"
  teal: "#4d7d75"
  teal-deep: "#3a5f58"
  paper: "#efe9dc"
  paper-deep: "#ded6c3"
  ink: "#14161a"
  text-on-ground: "#efe9dc"
  text-on-ground-soft: "#8b8779"
typography:
  display:
    fontFamily: "Sora, ui-sans-serif, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Sora, ui-sans-serif, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.09em"
  body:
    fontFamily: "Manrope, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  token: "12px"
  chip: "999px"
  card: "18px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
components:
  button-die:
    backgroundColor: "{colors.ground-deep}"
    textColor: "{colors.amber}"
    rounded: "16px"
    padding: "0"
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.paper}"
    rounded: "{rounded.chip}"
    padding: "13px"
  chip-player:
    backgroundColor: "rgba(239,233,220,0.05)"
    textColor: "{colors.text-on-ground}"
    rounded: "{rounded.chip}"
    padding: "5px 10px 5px 5px"
  chip-player-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "5px 10px 5px 5px"
---

# Design System: Projet Blackout

## Overview

**Creative North Star: "One Owned Accent on a Quiet Ground"**

Projet Blackout was first redesigned from a vintage 70s-80s board-game-box-art world to a restrained modern-minimal system after the creator found the vintage pass "cheap." A second pass then responded to hands-on feedback after playing with that first minimal build: the palette read as too bright/candy-like for the mood wanted, the spiral track didn't match the creator's own reference (a classic jeu-de-l'oie "snake" board of rows that fold back on themselves), and the die needed to visibly roll rather than just land. All three changes preserve the same North Star — restraint, one owned accent, flat geometric tokens — they push it darker and closer to the creator's own reference rather than replacing the world again.

This second pass was chosen from three live coded palette comparisons (Ember, Ink & Amber, Slate Wine — all darker/more muted than the original coral-and-sage pairing), applied on top of the now-settled snake board layout and rolling die, which were built directly from the creator's reference image rather than offered as variants.

A third pass changed what identity means in this game: players now enter a Lobby (name only), then a group Reveal deals each of them a character — from that moment on, the **character's name is the persistent identity** shown everywhere (board, turn banner, score rail, win screen), with the player's real name kept only as small secondary context next to it. Identity color moved from the player (join-order) to the character (fixed per character), since the character — not the join order — is now what's being tracked. The player-photo idea from the second pass was abandoned outright, not deferred: pawns will eventually be small hand-drawn character icons (the creator's own artwork), and until then the initial-letter avatar is the real, permanent look — there is no photo capture anywhere in this product.

A fourth pass brought in real game rules from the creator: two dice are rolled and summed (not one), the scoring resource is called "goulée"/"goulées" everywhere in the UI (not "points" or "score"), and the character roster is now the creator's own final 17 names — no longer draft placeholders. Most of those characters don't have a written power yet, and none of the powers that do exist (Basile, Jules, Lucien, Céssou, Erwann) are wired into gameplay logic — they're shown as reference text only in the Reveal card.

A fifth pass delivered the creator's real illustrated art for all 17 characters, closing out what the third pass had flagged as a placeholder: a full illustrated card (portrait, name banner, catchphrase) per character, and a round token/portrait crop for every small avatar. The initial-letter-in-a-ring look is retired everywhere it's needed a character (it still covers the rare case where a `Player` has no character yet). All 17 powers are now written (previously 5 of 17); none are wired into gameplay logic yet — same caveat as the fourth pass, just now covering the full roster instead of a handful. This pass also made the character roster consultable before a game starts: the Lobby's "Les personnages" list is now tappable, opening the full illustrated card plus its power text, with prev/next navigation across all 17 — so the group can browse who they might get before committing to a game.

A sixth pass responded to hands-on feedback after playing with the fifth pass's build: character art and pawns needed to read much larger at a glance (bigger card-draw art, a near-fullscreen high-set detail card in the Characters Overlay, a 48px on-board pawn up from 28px); the dice needed to show their total once rolled, reversing an earlier "no caption" call; four characters (Céssou, Jules, Erwann, Carl) got a first draft of an actual in-game power behind a new "Pouvoir" button, greyed out for the rest of the roster; and the board itself — squares and background — was rebuilt to match the illustrated card's material world (ink-framed parchment medallions on a warm parchment field) instead of sitting on the app's dark chrome ground, on the creator's direction. This is the first genuine split in this system: page chrome (header, footer, every screen outside the board) stays on the original dark "One Owned Accent on a Quiet Ground" system, while the board's own playing surface now belongs to the card world instead.

A seventh pass went deep on rules and character mechanics after another play session: the board grew from 30 to 68 squares (id 67 is now the finish line, and it carries a number like every other square), its numerals moved to a small blackletter/"runic" face (Pirata One) echoing the card banners' lettering; the classic jeu-de-l'oie bounce-back rule now actually applies (overshooting the finish reflects back by the excess instead of clamping) with Antonin dying instead of bouncing, per his card; the character roster's wired-power count went from 4 to 10 (Céssou, Jules, Erwann, Carl, Corentin as button powers; Basile, Antoine/Étienne/T-Max, Pierre, Lucien, and Loïc as automatic ones triggered by a roll or a landed square — see Character Powers below); the camera now zooms out to fit the whole track while a pawn is walking and re-centers on the active player once it settles; and goulées came off the player rail entirely (still tracked internally, just not surfaced mid-game — it stopped being legible once the rail had many chips).

An eighth pass traded screen space back from chrome to the board itself, on the creator's direction: the player rail (the row of name chips below the board) is gone outright — the turn banner at the top already names whose turn it is, so the chips were pure redundancy, and removing them frees a full row of height for the board. The "Pouvoir" button moved with that space cut, from its own pill in the footer to a small circular icon (⚡) directly to the left of the active player's avatar inside the turn banner — same states (Amber when ready, dimmed/greyed when not), just relocated. The walk-camera zoom was also dialed back: it now fits roughly 20 squares (about a third of the 68-square track) instead of the whole board, which read as too small/far to actually see the pawn move — and the scroll-centering math became scale-aware so it centers correctly on the destination square at whatever zoom is active, not just at full scale. Céssou's power moved off the shared "once per game" house rule onto his own written cadence — unlocks after 5 of his own turns, then recharges 5 turns after each use — since that's what his card actually says and it was easy to honor exactly. And the start and finish squares finally got the creator's own illustrated coin-medallion art (`case départ.png` / `case fin.png`) in place of the plain CSS rings that stood in for them since the second pass.

A ninth pass tidied up that new medallion art after more hands-on play: the dice button's caption ("Lancer les dés" / "Le pion avance…" / "Résous la case…") was dropped outright — the "Total : N" line and the board's own animation already say enough, and the extra line felt noisy. The start and finish medallions were tripled in size to actually read as landmarks (138px/186px, up from the original 46px/62px), then the start medallion alone was pulled back down by 20% (to 110px) once the larger finish size was confirmed as right-sized but the start size read as too large next to square 1 — the finish size and every other square's position were left untouched. The `case départ.png` source art itself was also re-cropped tighter (the original canvas had ~12% white padding on every side, visibly more than `case fin.png`'s already-tight crop) before being re-exported, closing out a "too much white ring" note.

A tenth pass gave the group a choice at game start instead of only random assignment: the Lobby now has a "Tirage au sort" / "Choix des joueurs" toggle, and picking the latter routes through a new `CharacterPickScreen` where each player, in turn, picks their own character from the full roster (already-taken characters shown disabled/"Pris") before landing on the same Reveal Summary and board as the random path. This exists mainly so the creator can deliberately pick a specific character to test its power, rather than rerolling the random draw until it comes up.

An eleventh pass replaced almost every piece of placeholder game content with the creator's real material, transcribed from `Fichier Cartes/`. The board is now the creator's actual 67-square layout (`Cases plateau.rtf`: id 0 = DÉPART, ids 1–65 exactly as the file lists them — goulée amounts, action/event squares, and two "retour à la case départ" squares at 1 and 60 — id 66 = the finish line), replacing the cycled 68-square placeholder pattern. The "Carte Vérité"/`truth` square type is gone outright — the creator's real board file has no truth squares, so the type, its data, and its rules-overlay entry were removed rather than kept dormant (the creator can reintroduce a discussion-question mechanic later if wanted, but nothing today assumes one). Action and Event cards are now the creator's real 10-card and 29-card lists (`Cartes action et cartes évenements.rtf`) instead of generic placeholders — critically, Action cards now carry a real board *effect* (swap with the last-place player, return to start, jump to a specific square, advance/retreat by a fixed amount, or skip your next turn) rather than being flavor text only, while Event cards stay purely social/off-board, exactly as the creator's own split intends (see Action & Event Cards below). Both decks draw like a real card deck — shuffled, no repeats until exhausted, then reshuffled — via `actionDeck`/`eventDeck` in `gameStore.ts`. The wordmark also became the creator's own illustrated sign (`Logo Blackout.png`) in place of the "BLACK<span>OUT</span>" text lockup, shown at a size fit to each header's available room (a shared `Logo` component, 28px tall on the cramped board header, 44px everywhere else). And the action/event board squares themselves now carry the creator's own round medallion art (`case action.png` / `case évenement.png`), the same circular-clip treatment as the start/finish medallions, replacing the plain color-dot tokens those two types used before.

**Key Characteristics:**
- A single near-black neutral ground (ink-navy) for page chrome — header, footer, every screen shell outside the board itself.
- The board's own playing surface is the one deliberate exception: a warm parchment field with ink-framed medallion tokens, matching the character card material rather than the dark chrome (see Board Token). Everywhere else, color and shape carry meaning without an ink outline or illustrated icon glyph.
- One owned matte accent (amber) for every call-to-action and "negative" meaning; teal is a secondary, purely semantic color for "positive" — it never freelances as a second brand accent.
- The board is a classic jeu-de-l'oie **snake track**: squares run in rows that alternate direction and curve back on themselves at each row end, not a spiral.
- Identity is the **character**, not the player: after the group reveal, a character's fixed color and name are what every screen shows, with the player's real name kept as small secondary text. The avatar is a circular ring in the character's color holding the character's own illustrated portrait token — there is no photo-capture feature anywhere in this product, and no more initial-letter placeholder now that every character has real art.
- The die visibly rolls: its face cycles through random numbers while resolving, then settles on the real result — not an instant swap.
- Soft, blurred ambient shadows only — no hard offset "sticker" shadow.

## Colors

A restrained, matte palette: one near-black neutral ground, one owned accent, one narrow secondary used only for a single semantic meaning.

### Primary
- **Amber** (`#c98a3e`): the one owned accent — the die's numeral, the "Continuer" button, negative-square tokens, the logo's second word, every active/focus state. Its pressed companion is **Amber Deep** (`#a06c2c`). Deliberately matte/muted rather than saturated, per the creator's "less bright" direction.

### Secondary
- **Teal** (`#4d7d75`): positive-square tokens only. This is semantic color, not a second brand accent — it never appears on a button, logo, or chrome element. Its companion is **Teal Deep** (`#3a5f58`).

### Neutral
- **Ground** (`#14161d`): the dominant page/board field — near-black ink-navy, darker than the previous pass. **Ground Deep** (`#0c0d12`) is used for the die tile and "event" tokens; **Ground Light** (`#1c1f28`) lifts inactive chips very slightly off the ground.
- **Paper** (`#efe9dc`): the reveal-card surface only — never the page background. **Paper Deep** (`#ded6c3`) is its shaded companion.
- **Ink** (`#14161a`): text on Paper surfaces.
- **Text on Ground** (`#efe9dc`) / **Text on Ground Soft** (`#8b8779`): the two text colors used directly on the dark ground.

Character identity uses its own 17-color set, one fixed color per character (see `src/data/characters.ts`) generated as evenly-spaced hues at consistent saturation/lightness so all 17 stay mutually distinguishable at a glance — a different job than the brand's restrained accent, the same way a dashboard's status colors sit apart from its brand accent. Because the color is fixed per character rather than per join-order, the same character always reads the same color no matter which player draws it.

### Named Rules
**The One Accent Rule.** Amber is the only color used for action and emphasis (buttons, active states, "negative" meaning). Teal is reserved exclusively for "positive" square meaning and must never be reused as a second accent, however tempting for a button or highlight.

## Typography

**Display Font:** Sora (with ui-sans-serif, sans-serif fallback)
**Body Font:** Manrope (with ui-sans-serif, sans-serif fallback)

**Character:** A bold geometric display face over a warm, slightly rounded humanist body face — confident and legible at a glance, no illustrated or hand-toy lettering anywhere in this world.

### Hierarchy
- **Display** (700, 21px, 1.1, -0.01em): headings and card titles. The BLACKOUT wordmark itself is no longer type — see Logo below.
- **Title** (700, 20px, 1.35): the reveal-card message and win-state title — the two things read across a table.
- **Body** (700, 14px, 1.4): turn-banner name, button labels, player-chip names/scores. Manrope never drops below weight 600 in this interface.
- **Label** (700, 10px, uppercase, 0.09em): the turn-banner kicker and reveal-card category tag.

### Named Rules
**The Bold-Only Rule.** Body text never drops below weight 600 — a light weight reads as thin and washed-out against the dark ground.

## Layout

Mobile-first, fixed `100svh` three-row flex shell (header / scrollable board / footer). The board is a single responsive SVG (`viewBox 0 0 360 790`) with every token and pawn positioned in percentages of its container. Tablet-width viewports (≥768px) show substantially more of the board without scrolling. Wide desktop landscape stays out of scope — single shared device, mobile-first per the brief.

## Elevation & Depth

Flat-by-default with soft ambient lift only. Every token, the die, and the reveal card use one soft blurred shadow; nothing in this system uses a second, hard-edged shadow layer.

### Shadow Vocabulary
- **Token shadow** (`0 6px 16px -6px rgba(2,2,3,0.6)`): board tokens, the die.
- **Card shadow** (`0 20px 44px -18px rgba(1,1,2,0.7)`): the reveal overlay card only, floating above the board.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat; a shadow appears only to lift an element that is genuinely floating above the board (a token off the ground plane, the reveal card), never as ambient decoration on static chrome.

## Shapes

Board tokens and the die are rounded squares (12–16px radius). Start, finish, and player avatars stay circular because they represent people/endpoints rather than board spaces. Buttons and chips stay full pills. Nothing in this system uses a hard 0-radius corner or an ink border — shape and color carry the object's identity, not an outline.

### Board Track (signature layout — snake, not spiral)
Squares run in rows of 5, alternating left-to-right and right-to-left (a classic jeu-de-l'oie boustrophedon), each row curving back on itself into the next — built directly from the creator's reference image, not a mockup-compared choice. A smooth Catmull-Rom spline connects the squares in sequence so the turns at each row end read as curved "snake" bends rather than sharp right angles. See `generateBoardPoints()` in `src/game/boardGeometry.ts`. The track is 67 squares long (id 0 = DÉPART, id 66 = the finish line), matching the creator's real `Cases plateau.rtf` layout exactly (ids 1–65 as written there) rather than a cycled placeholder pattern.

## Components

### Buttons
- **Dice:** two rounded-square (14px) dark tiles side by side, one button. While rolling, both faces cycle independently through random 1–6 faces (with a small rotate/scale wobble on the pair) before settling on the real result in Amber, Sora 800; no pips. Once the roll settles the pawn starts walking (see Turn Sequencing below) and the two faces fade to 0 opacity, clearing the dice off-focus while the board does the talking; they fade back in once the square's effect is ready to show. Below the dice, a small Amber "Total : N" line (Sora 800, 15px) fades in the moment a roll settles and stays through the walk and the effect card. N already includes any power bonus folded into the move (e.g. Carl's +28), not just the two raw faces. The dice button no longer carries a text caption ("Lancer les dés" / "Le pion avance…" / "Résous la case…") — dropped on the creator's direction once the total line and the board's own motion made it redundant noise.
- **Primary ("Continuer"):** Amber fill, Paper text, full pill, no border; `:active` presses down 1px.
- **Power ("Pouvoir"):** a small circular icon button (⚡, 30px) sitting inside the turn banner itself, immediately to the left of the active player's avatar — moved out of the footer in the eighth pass to give the board more vertical room. Only rendered at all for a character with `hasInGamePower`; Amber border/fill when usable, a muted/greyed variant (dim border, `text-on-ground-soft`) when not — spent, on cooldown, or not the character's turn to use it. The label lives in its `title`/`aria-label` rather than as visible text now that it's icon-only: "Utiliser le pouvoir" → "Pouvoir déjà utilisé" once spent (or "Pouvoir dans N tour(s)" for Céssou's recharge countdown), "Pas de pouvoir actif" for characters that aren't wired up.

### Logo
Every screen header shows the creator's own illustrated sign (`Logo Blackout.png` — an ornate wooden/gem tavern-sign graphic, dark background baked into the art) via a shared `Logo` component (`src/components/Logo/Logo.tsx`), in place of the earlier "BLACK<span>OUT</span>" text lockup. It renders at a `height` fit to each screen's available room: 28px on the board header (the most space-constrained, chrome-vs-board tradeoff described above), 44px everywhere else (Lobby, Card Draw, Reveal Summary, Character Pick).

### Player Rail — retired
The row of name chips below the board (idle/active/dead states, no goulée count) was removed outright in the eighth pass: the turn banner at the top of the screen already names whose turn it is, so the rail was pure redundancy competing with the board for vertical space on a small phone screen. `PlayerRail.tsx`/`.module.css` were deleted rather than kept dormant. A player's dead/eliminated state (Antonin) no longer has a persistent visual anywhere between turns — it's called out in the reveal card at the moment of death and by `dismissReveal()` silently skipping them from then on.

### Cards / Containers
- **Corner Style:** 18px (`{rounded.card}`).
- **Background:** Paper only.
- **Shadow:** Card shadow (see Elevation).
- **Border:** none.
- **Internal Padding:** 28px top, 24px sides/bottom.

### Board Token (signature component, redesigned to match the character card material)
A 34px rounded-square, ink-framed parchment medallion — `--color-paper` fill, `2px solid var(--color-ink)` border — carrying a single centered dot in the square-type's semantic color (Teal = positive, Amber = negative, Amber-Deep = "retour au départ") rather than an icon glyph, for the three square types that don't carry illustrated art. Its number sits as a small caption directly below the square (not a corner badge) in `--font-rune` (Pirata One, a blackletter face echoing the card banners' gothic lettering) — the finish square carries one too ("66"). "Retour au départ" squares (ids 1 and 60 only) use the deeper `--color-paper-deep` fill and an Amber-Deep border to read as more consequential than a plain bonus/malus square. Start, finish, action, and event squares all carry the creator's own illustrated medallion art instead of a dot (`src/assets/board/square-start.png` / `square-finish.png` / `square-action.png` / `square-event.png`, sourced from the matching files in `Fichier Cartes/Carte et Cases autres/`) — same technique throughout: `overflow: hidden` on the circular token frame plus the image `object-fit: cover`-filling it, so the frame's own circular clip crops away the art's square white canvas without needing the source images pre-masked. Start and finish stay triple-sized landmark medallions (110px start, 186px finish, Amber border + halo ring on finish); action and event stay at the regular 34px token size, just with art instead of a dot. Start's caption reads "DÉPART" below the medallion the same way every other square shows its number. The board's own surface (`BoardScene.tsx`) paints a warm parchment radial gradient (`--color-paper` → `--color-paper-deep` → the new `--color-paper-shadow` vignette edge) with a faint SVG-turbulence grain for an aged-paper feel, and an ink-toned dashed track line instead of the previous light-on-dark one. The header/footer chrome stays on the original dark system unchanged — only the scrollable board field itself changed material, which reads like a parchment map inside a dark frame.

### Action & Event Cards (real content, illustrated reveal)
Landing on an action or event square draws from a shuffled deck (`actionDeck`/`eventDeck` in `gameStore.ts`, reshuffled once exhausted so nothing repeats until the whole deck's been seen) and shows the creator's own card artwork (`src/assets/board/card-action.png` / `card-event.png`, from `Fichier Cartes/Carte et Cases autres/carte action.png` / `carte évenement.png`) bleeding to the reveal card's own rounded edges, in place of the small color badge used for plain bonus/malus reveals. The card's quote (e.g. « Après vous monseigneur ») sits as the title below the art, with its plain-language effect as the body — same `CardRevealOverlay` component and Paper-card vocabulary as every other reveal, just with an illustration slotted in above the text instead of the small icon badge. Action cards carry a real board effect (`ActionCardEffect` in `src/game/types.ts`): swap positions with whoever's currently in last place, return to start, jump straight to a specific square, advance or retreat by a fixed amount (bouncing off the finish line the same way a dice roll would, including Antonin's death-instead-of-bounce rule), or skip the player's next turn. Event cards never touch board state — they're resolved entirely between players, off the app, the same "no state, no tracking" philosophy as the retired Truth cards.

### Turn Sequencing (roll → walk → effect)
A turn deliberately unfolds in three beats instead of resolving all at once, so the group has time to watch the pawn actually travel the board rather than jump straight to a result:
1. **Roll** (~0.65s) — the dice cycle through random faces and settle on the real result.
2. **Walk** — the pawn's position updates immediately after the roll settles, and it hops square by square along the actual board track to get there (one ~280ms tween per square, not a single spring cutting straight from A to B) — it should read as a token being walked across the board, never as teleporting to the result. The dice faces fade out at the same moment so attention isn't split between two numbers and a moving token.
3. **Effect** — after a pause sized to the walk's real length (squares crossed × hop duration, plus a short buffer), the square's effect card appears and the dice faces fade back in behind it, showing the settled roll for reference.
This choreography spans two files that must stay in step: `rollDie()` in `src/state/gameStore.ts` owns the phase timing (`isRolling` → `isResolving` → `reveal`), and `Pawn.tsx` owns the actual hop-by-hop tween — both import their shared timing constants from `src/game/motion.ts` (`HOP_DURATION_MS`, `WALK_BUFFER_MS`) so the effect reveal never outruns the walk, however many squares it crosses.

The walk step now also drives the camera: `BoardScreen.tsx` scales `.boardInner` down for the walk's duration to whatever fits roughly 20 squares (`VISIBLE_SQUARES_WHILE_WALKING`, about a third of the 68-square track) rather than the whole board — the earlier full-board fit zoomed out so far the pawn and its destination read as nearly invisible. The scroll-centering effect is scale-aware: since the CSS scale animation shrinks `.boardInner` around its own top-center origin without changing the scroll container's unscaled layout size, the target square's on-screen Y has to be multiplied by the active scale before computing the scroll offset, or centering on a zoomed-out board would land on the wrong spot. It scales back to 1 and re-centers on the active player's square once the walk ends — so the group can watch a multi-square move happen in a wider view without losing legibility, but still gets a close view the rest of the turn.

### Malus Target Choice
Landing on a negative square no longer picks a random opponent to receive the goulées — the acting player chooses. A dedicated bottom-sheet dialog (`MalusChoiceOverlay`, same Paper-card vocabulary as the Reveal card) lists every other player as a tappable row (token avatar + character name); picking one resolves the square exactly like any other reveal. If there's only one possible opponent the same flow still shows (a real choice with one option), and with zero opponents the square resolves immediately as a plain loss, no dialog. This sits between the walk finishing and the reveal card appearing — `rollDie()` in `gameStore.ts` intercepts negative squares before calling `resolveSquare()` and parks the game in a `pendingMalus` state (dice disabled, same as during a reveal) until `chooseMalusTarget()` is called.

### Character Powers (draft, ten characters wired up)
A first, explicitly-draft pass at making powers actually do something — Claude's interpretation of the creator-approved power text, not a confirmed final version (see the note atop `data/characters.ts` for the specific assumptions on each one). Two families:

- **Button-triggered** (`hasInGamePower: true`, the "Pouvoir" button, your own turn, before rolling): **Céssou** pulls the leader back to his square, on his own written cadence rather than the shared once-per-game rule — unlocks after 5 of his own turns (`Player.turnsPlayed`) and recharges 5 turns after each use (`Player.powerAvailableAtTurn`, checked by the shared `isPowerReady()` helper in `gameStore.ts`, which both `usePower()` and the button's label/disabled state read from); **Jules/Erwann** duel on 2d6 each and swap places on a win; **Carl** arms a `pendingDiceBonus` that `rollDie()` folds into (and clears from) the very next roll rather than moving the pawn on the spot; **Corentin** opens a target picker (`PowerChoiceOverlay`, same vocabulary as the Malus picker below) and swaps position with whoever's chosen. Every button power besides Céssou stays once-per-game (`Player.powerUsed`). Feedback reuses the Reveal card's look through a separate `powerResult` state (not `reveal`) — dismissing it returns control to the same player's turn instead of advancing, since using a power isn't the same act as resolving a landed square.
- **Automatic** (no button — triggered by the roll itself or by landing on a square): **Basile** doubles whatever square he lands on and gets a pulsing amber halo on his current square (`isHalo` in `BoardSquare`, following his live position); **Antoine/Étienne/T-Max** get a permanent passive dice modifier (halved, doubled, +6) applied to every roll; **Pierre** is immune to negative squares outright, shown as its own flavor reveal instead of the malus picker; **Lucien** rolling a double pops a non-blocking `flavorReveal` toast (stacked above a same-time regular reveal via `priority`, since both can land at once) prompting the group's own real-world action; **Loïc** is auto-skipped on every 4th of his own turns (`Player.turnsPlayed`), his power text shown as the reason.

Most still share a house-rule simplification for the button powers that isn't literally what their text says (Carl's "à tout moment" became "once, before rolling") — Céssou is now the one exception, running on his card's own "tous les 5 tours" cadence exactly. Automatic powers apply every time their trigger condition is met, no cooldown. Worth the creator confirming or adjusting the rhythm on the rest.

### Finish-Line Bounce-Back & Antonin's Death
This is a real jeu-de-l'oie rule, not house-invented: a roll that would overshoot square 67 no longer clamps to the finish — it reflects the pawn back by the excess (`rollDie()` in `gameStore.ts`), so a near-exact roll can genuinely bounce a leader backward instead of just stopping short. Antonin is the one character who doesn't bounce: an overshoot on his turn kills him (`Player.isDead`) instead, per his card text. His pawn is removed from the board entirely ("le jeton disparait" — `Pawn.tsx` renders nothing for a dead player), and `dismissReveal()` skips him for the rest of the game the same way it skips a `skipTurn` event or Loïc's periodic rest.

### Character Avatar (signature component, used by the pawn, the turn banner, and the Reveal screen)
A circle with a 2.5px ring in the **character's** fixed color, holding the character's round illustrated token (the creator's own art, `character.token`, cover-fit and clipped to the circle). Falls back to a dark gradient fill with the initial letter only when a `Player` has no `character` yet (shouldn't happen once assigned) — there is no photo-capture feature in this product. The on-board pawn is the one place this avatar goes large — 48px (up from an initial 28px, per the creator's "much bigger" call) with a 3px ring, since it has to read clearly at a glance across a table rather than sit inside a compact chip like the turn banner or score rail.

### Character Card (signature component, used by the Card Draw screen and the Characters Overlay's detail view)
The creator's full illustrated card art (`character.image` — portrait orientation, ~2:3, name banner and catchphrase baked into the artwork itself, black border and rounded corners already part of the illustration). Rendered edge-to-edge with a soft drop-shadow for lift — no extra Paper-card frame around it, since the art already reads as a physical card. The card only ever carries the *catchphrase*; the mechanical *power* text is separate creator copy shown below it (or as its own row in a list), since the two serve different purposes — one is flavor, the other is what the power actually does. Wherever the card art is visible, the catchphrase half of `character.power` (the leading `« … » —`) is stripped before display via `powerEffect()` in `src/game/characters.ts` — the art already shows it, so repeating it in text would be redundant. Rows without the card art (the Characters Overlay list, the Reveal Summary) keep the full string, catchphrase included, since nothing else supplies that context there.

### Confirm Dialog
A small centered Paper card (title, body, a plain-text cancel action, an Amber-filled confirm pill) — the same vocabulary as the Reveal Card, scaled down for a yes/no decision. Used today for "Quitter la partie ?"; the destructive action reuses Amber rather than introducing a danger color, since Amber already carries "negative" meaning under the One Accent Rule.

### End of Game
The win card gained a real "Nouvelle partie" pill (Amber, full-width) — previously a dead end requiring a page reload. Both winning and quitting return to the Lobby with the same roster pre-filled (names kept, character/position/score reset), ready to relaunch for another round the same evening.

### Rules Overlay
A bottom sheet (Paper surface, rounded top corners only) reachable from a "Comment jouer ?" text link in the Lobby header and a small circular "i" icon in the board header — same content either way, dismissible by the "×", the "Compris" pill, or reopening doesn't affect game state. Explains the objective, a turn's sequence, each square type (using the same color+dot swatch vocabulary as the real board tokens, not new iconography), and the character mechanic in general terms — never hardcodes the current draft characters' names or powers. Sheet height is `min(94svh, 860px)` (up from 88svh/720px) to cut down the top margin the creator flagged as too large.

### Characters Overlay
A second bottom sheet, same vocabulary as the Rules Overlay, reachable two ways: the "Les personnages" text link right next to "Comment jouer ?" in the Lobby header (separated by a small "·"), and now also a "Voir les personnages" link inside the in-game Rules Overlay's footer (so the "i" button in the board header reaches the roster too, not just the Lobby menu). Lets the group browse the full 17-character roster — token, name, and full power text in a scrollable list — *before* anyone commits to starting, since characters are dealt randomly and players can't otherwise know what they might get. Each row is now a tappable button: it opens a detail view showing the character's full illustrated card plus its power text, with "‹ Tous les personnages" to go back and "‹ ›" pagers (with an "X / 17" count) to browse straight through the whole roster without returning to the list each time. The "×" always closes the overlay outright and resets it back to the list for next time. The list sheet is `min(94svh, 860px)` (up from 88svh/720px, same top-margin fix as the Rules Overlay). The detail view goes further: a **fixed** `height: min(97svh, 920px)` — not `max-height` — so its top edge stays put as you page through characters with "‹ ›"; a shrink-to-fit sheet drifted its own top edge up and down with every character's differing power-text length, which is what the creator was seeing as "the panel changes position." Its card art is scaled up to `min(340px, 88vw)` too, so the card sits high and large rather than stranded low in a sheet barely taller than its content.

### Lobby, Character Pick, Card Draw & Reveal Summary (setup flow, same visual world)
Up to four screens run before the board:
1. **Lobby** — players type their real name into a simple add/remove list (neutral, uncolored avatars — no character or color exists yet), plus a pill-style "Attribution des personnages" toggle (Tirage au sort / Choix des joueurs), then a "Commencer la partie" pill disabled below 2 players and capped at 17 (the final, validated character roster — this ceiling won't grow).
2. **Character Pick** *(only when "Choix des joueurs" is selected)* — a full-screen list of every character (token avatar, name, power blurb, reusing the Characters Overlay's row style but on the dark ground rather than a Paper sheet), one player picking at a time ("Au tour de {name} de choisir — joueur N/M" in the kicker); already-picked characters gray out and carry a "PRIS" tag. Picking the last player's character hands off straight to the Reveal Summary, same as the random path.
3. **Card Draw** *(random path only)* — the dramatic moment: one full illustrated character card at a time (see Character Card, sized `min(320px, 100%)`, up slightly from 280px), full-screen, with the receiving player's real name pinned below a short accent-colored divider ("Pour {name}"). A "X / N" progress counter sits in the header. The stage anchors the card near the top of the available space (not vertically centered) so its position stays stable turn to turn regardless of how long the current player's real name is — a vertically-centered stage would otherwise drift up or down as the name below the card wraps to one or two lines. Advancing is an explicit tap on the pill button below the card ("Carte suivante", or "Voir le résumé" on the last one) — not a timer — so the group can linger on each reveal. Cards cross-fade/scale in one at a time (`AnimatePresence mode="wait"`), matching this system's established "rise into place" motion rather than a 3D flip.
4. **Reveal Summary** — every player's character shown together as a staggered list of Paper cards (character name primary, real name secondary, power text or an italic "Pouvoir à venir" placeholder, colored avatar ring), ending on a "C'est parti !" pill that hands off straight into the board. Both setup paths (random draw or manual pick) converge here.

All four reuse the header/footer shell, type scale, and button/card components already defined above — no new tokens were introduced for them.

## Do's and Don'ts

### Do:
- **Do** keep Amber as the only accent used for action/emphasis; treat Teal as semantic-only (positive meaning).
- **Do** keep every board token a rounded-square carrying its meaning through the dot's color, not an icon glyph — the ink border and parchment fill are now part of that shared shape language (see Board Token).
- **Do** use a soft blurred shadow only on elements that float above the board plane (tokens, the die, the reveal card) — never on static chrome.
- **Do** keep Manrope at weight 600+ everywhere.
- **Do** keep the board a snake track (alternating rows) — this came directly from the creator's own reference, not an open choice.
- **Do** let the die cycle through faces while rolling; it should never jump straight to the result.
- **Do** treat the character (not the player) as the persistent on-screen identity after the Reveal — real names stay secondary, never primary.
- **Do** keep identity color tied to the character, fixed regardless of who draws it.

### Don't:
- **Don't** reuse Teal for a button, logo, or chrome element — it is reserved for "positive" square meaning only (One Accent Rule).
- **Don't** draw an illustrated icon glyph for square types — the confirmed choice is pure color + shape, not pictograms.
- **Don't** reintroduce a hard offset "sticker" shadow on tokens — the soft token shadow stays; only the ink border and parchment fill are new (board only, see Board Token).
- **Don't** use Paper as a page or chrome background outside the board — it's the reveal-card surface plus the board's own playing field now, never the header/footer/screen shell.
- **Don't** revert the board to a spiral — the snake layout is a settled structural decision, not a style variant.
- **Don't** treat the initial-letter avatar as provisional filler needing a caveat in copy — it's a real, permanent option in the finished product.
- **Don't** reintroduce photo capture in any form — it was abandoned, not deferred.
- **Don't** show a player's real name as the primary label anywhere after the Reveal — the character name leads, the real name is secondary at most.
