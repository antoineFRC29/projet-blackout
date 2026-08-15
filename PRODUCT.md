# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated, with constraints from the brief: frontend must be a modern, TypeScript-based framework with a good ecosystem and developer experience (final framework choice left to Claude, to be presented with brief tradeoffs rather than imposed). Built and shipped as a **Progressive Web App (PWA)**, mobile-first (and usable on tablet — see Users). Backend should stay light: game-state management, optional persistence, optional auth only if it adds real value — avoid unnecessary complexity. Game content (cards, characters, rules, events, squares, powers) must live outside business logic in an easily editable format (JSON/YAML/DB). Because the whole group shares a single device (see Operating Context), game state lives locally on that device — no cross-device real-time sync is required. Deploy target: Vercel, Netlify, or equivalent.

## Users

Groups of adult friends playing together in person, during a social evening/party, sharing a single screen — one phone (or an iPad for a group) placed on the table or passed around, not one device per player. Not designed as a family or intergenerational game. The audience already knows each other well — humor can reference the specific group (nicknames, in-jokes, shared history).

## Product Purpose

Projet Blackout (aka "Black-out") is a web app for playing a party board game with friends from a phone. The point is not primarily to win — it's to create funny, convivial, memorable social moments and interactions during the evening. Tone: drôle (funny), convivial, adult-oriented (can be edgier/absurder than family games) while staying respectful — the game should never make a player genuinely uncomfortable.

## Positioning

Two things a generic party-game app couldn't truthfully copy: (1) deep personalization — characters, cards, and events are written around this specific friend group's real nicknames, anecdotes, and in-jokes, treated as core game identity rather than generic placeholder content; (2) an artisanal, physical-board-game feel (see Direction artistique) delivered through a fast, mobile-first PWA that plays like a real board game passed around the table, rather than a generic app.

## Operating Context

Played in person, in the same room, during a party/evening — one session, multiple adult players gathered around a single shared device (a phone, or an iPad when the group is larger), not one device each. Sessions are meant to run about 15–30 minutes. Core loop is a "jeu de l'oie" (goose game) mechanic: each turn a player rolls two dice (summed), moves their pawn along a snake-style board, and the landed square's effect resolves immediately. True to that lineage, overshooting the final square bounces the pawn back by the excess instead of just stopping short — the last stretch is meant to feel tense, not clamp to a safe landing.

## Capabilities and Constraints

**Board squares**, real content transcribed from the creator's `Fichier Cartes/Cases plateau.rtf` (mixed across the board):
- *Positive:* gain goulées (amount fixed per square, e.g. "7 gorgées" on square 7).
- *Negative:* give goulées to an opponent of the landing player's choice (a dialog lets them pick who pays; amount fixed per square).
- *Retour à la case départ:* two squares (1 and 60) send the pawn straight back to the start — no card, an immediate effect.
- *Action cards:* drawn on landing on one of the board's 7 action squares — real content from `Fichier Cartes/Cartes action et cartes évenements.rtf`, each with a board-movement effect (swap with the last-place player, return to start, jump to a specific square, advance/retreat by a fixed amount, or skip the next turn).
- *Event cards:* drawn on landing on one of the board's 6 event squares — real content from the same file, resolved entirely between players outside the app (drinking-game-style social prompts); no board effect.

Both decks are drawn like a real card deck (shuffled, no repeats until the deck's exhausted, then reshuffled) rather than a plain random pick each time. The earlier placeholder "Truth cards" square type has been retired outright — the creator's real board has no such squares, so it isn't a mechanic in the shipped game today (could come back later as a distinct feature if wanted).

**Scoring:** a parallel "goulées" track runs alongside board position (bonuses add goulées, maluses give goulées away — a drinking-game term, not a generic point system), adding interaction — but the win condition is strictly "first to reach the final square," independent of goulées. The count is tracked internally throughout but no longer shown on the board screen's player rail — it stopped being legible with more than a couple of players, per the creator.

**Board length:** 67 squares (id 0 = DÉPART, id 66 = finish), matching the creator's real `Cases plateau.rtf` layout exactly rather than a cycled placeholder pattern.

**Characters:** at game start, the lobby lets the group pick either random draw or manual choice (each player picks their own character in turn, no duplicates) — random remains the default; manual is mainly there to let the creator deliberately pick a character when testing a specific power. Either way each player ends up with one unique active ability for the whole game. Max player count is bounded by how many characters exist in the roster. The roster is finalized at 17 named characters (see `Fichier Cartes/Liste personnages.rtf`), each with finished illustrated card art, a round token portrait, and full power text (catchphrase + effect, see `Fichier Cartes/Pouvoirs personnages.rtf`). Ten now have a first-draft in-game implementation (see `gameStore.ts` and the note atop `src/data/characters.ts`) — everyone else is still reference/flavor only:
  - Button-triggered ("Pouvoir" button during your turn): Céssou, Jules, Erwann, Carl, Corentin.
  - Automatic (triggered by the roll or by landing on a square, no button): Basile, Antoine, Étienne, T-Max, Pierre, Lucien, Loïc.

  This is Claude's interpretation of the creator-approved text, not confirmed final — most button powers were simplified to "usable once per game, before rolling," which isn't literally what any of their texts say (e.g. Carl's "à tout moment"); worth the creator confirming or adjusting the rhythm per character. Céssou is the one exception already running on his card's own cadence: unlocks after 5 of his own turns, then recharges 5 turns after each use. The full roster is browsable from the Lobby before a game starts, and now also from the in-game Rules Overlay's "i" button. Open items for the creator to confirm:
  - Jules's duel die-count reads "chacun en lançant é" (likely a typo, vs. Erwann's mirrored power which says "2" — read for now as "2 dice each," reusing the game's own 2d6 roll).
  - Antonin's "votre personnage meurt" is now wired to the jeu-de-l'oie bounce-back rule above: an overshoot kills him instead of bouncing (pawn removed from the board entirely, skipped for the rest of the game) — matches his source doc's "Le jeton disparait et le personnage devient grisé" note.
  - Basile's source doc note "(Effet visuel sur la case, halo autours de la case concernée" is now implemented as a pulsing amber glow on whatever square he currently occupies.

**Content ownership:** Claude may propose game mechanics, balancing, card ideas, characters, rule improvements, and can flag gameplay inconsistencies — but every proposal is a draft/inspiration only. Final rules, characters, character powers, board squares, Action cards, Event cards, bonuses, maluses, all player-facing text, and the game's tone/humor are decided and written exclusively by the project creator, to preserve their humor, style, and group-specific references. Claude should present proposals as editable ideas, not finished versions.

**Security constraint:** the shipped web app's code must never expose or let end users obtain the Claude API key used during development.

**Undecided:** exact min player count; whether/what persistence and auth are needed (e.g. saving past games, character rosters across sessions).

## Brand Commitments

Name: "Projet Blackout" / "Black-out". Voice: funny, convivial, adult, can be sharp/absurd/personal but always respectful of participants. Art direction inspiration: the board game **Faraway** — colorful, warm, fantastical, heavily illustrated, premium; the app should feel like handling a real board game, not a typical app.

## Evidence on Hand

The creator's real content now covers characters, the board, and Action/Event cards (see `Fichier Cartes/` — `Liste personnages.rtf`, `Pouvoirs personnages.rtf`, `Cases plateau.rtf`, `Cartes action et cartes évenements.rtf`, plus the character/card/logo art). Truth cards and any remaining placeholder text are the only content still Claude-authored filler; names, jokes, and personal references belong to the creator and must not be invented as generic filler by Claude. UI inspiration reference supplied by the user: https://21st.dev/community/templates/s/dashboard (free quality interface templates). Source brief: `Projet-Blackout-pour-Claude.rtf` (project root).

## Product Principles

1. Fun and memorable moments outrank winning or perfectly balanced mechanics — a slightly imperfect but very fun rule beats a balanced but boring one.
2. Keep it simple: avoid mechanics that are hard to explain; keep sessions to roughly 15–30 minutes; mobile-first, fast interactions so players spend more time laughing/talking than handling the phone.
3. Every proposed feature should answer yes to: "does this make the game funnier and more memorable for a group of friends?"
4. Personalization (in-jokes, nicknames, group references) is the game's identity, not generic content — always drafted by Claude at most, authored/validated by the creator.
5. When several valid technical solutions exist, present tradeoffs briefly and recommend rather than imposing a technology.

## Accessibility & Inclusion

Interface must be mobile-first, responsive, fluid, and accessible on small screens; animations should enrich the experience without slowing the game down. No formal accessibility standard (e.g. WCAG level) specified.
