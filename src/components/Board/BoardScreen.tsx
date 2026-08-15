import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore, isPowerReady } from "../../state/gameStore";
import { squares } from "../../data/squares";
import { generateBoardPoints, defaultBoardConfig } from "../../game/boardGeometry";
import { getCharacter } from "../../game/characters";
import type { Player } from "../../game/types";
import { BoardScene } from "./BoardScene";
import { BoardSquare } from "./BoardSquare";
import { Pawn } from "../Pawn/Pawn";
import { Die } from "../Die/Die";
import { TurnBanner } from "./TurnBanner";
import { CardRevealOverlay } from "../CardReveal/CardRevealOverlay";
import { MalusChoiceOverlay } from "../Malus/MalusChoiceOverlay";
import { PowerChoiceOverlay } from "../PowerChoice/PowerChoiceOverlay";
import { CharactersOverlay } from "../Characters/CharactersOverlay";
import { ConfirmDialog } from "../Confirm/ConfirmDialog";
import { Logo } from "../Logo/Logo";
import styles from "./BoardScreen.module.css";

const points = generateBoardPoints();
const lastIndex = squares.length - 1;
const { viewBoxHeight: H } = defaultBoardConfig;

const pawnOffsets = [
  { x: 0, y: 0 },
  { x: -19, y: -10 },
  { x: 19, y: -10 },
  { x: -19, y: 13 },
  { x: 19, y: 13 },
  { x: 0, y: -22 },
  { x: -29, y: 3 },
  { x: 29, y: 3 },
];

interface BoardScreenProps {
  onEndGame: (players: Player[]) => void;
}

export function BoardScreen({ onEndGame }: BoardScreenProps) {
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((s) => s.currentPlayerIndex);
  const dieValues = useGameStore((s) => s.dieValues);
  const isRolling = useGameStore((s) => s.isRolling);
  const isResolving = useGameStore((s) => s.isResolving);
  const pendingMalus = useGameStore((s) => s.pendingMalus);
  const pendingPowerChoice = useGameStore((s) => s.pendingPowerChoice);
  const reveal = useGameStore((s) => s.reveal);
  const winnerId = useGameStore((s) => s.winnerId);
  const lastMoveTotal = useGameStore((s) => s.lastMoveTotal);
  const powerResult = useGameStore((s) => s.powerResult);
  const flavorReveal = useGameStore((s) => s.flavorReveal);
  const rollDie = useGameStore((s) => s.rollDie);
  const chooseMalusTarget = useGameStore((s) => s.chooseMalusTarget);
  const choosePowerTarget = useGameStore((s) => s.choosePowerTarget);
  const dismissReveal = useGameStore((s) => s.dismissReveal);
  const usePower = useGameStore((s) => s.usePower);
  const dismissPowerResult = useGameStore((s) => s.dismissPowerResult);
  const dismissFlavorReveal = useGameStore((s) => s.dismissFlavorReveal);

  const [showCharacters, setShowCharacters] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentPlayer = players[currentPlayerIndex];
  const winner = players.find((p) => p.id === winnerId);
  const currentCharacter = getCharacter(currentPlayer.characterId);

  const powerReady = isPowerReady(currentPlayer, currentCharacter);
  const powerBusy = isRolling || isResolving || !!reveal || !!winnerId || !!pendingMalus || !!pendingPowerChoice || !!powerResult;
  const powerDisabled = !currentCharacter?.hasInGamePower || !powerReady || powerBusy;
  const basileSquareId = players.find((p) => p.characterId === "basile" && !p.isDead)?.position;
  const powerLabel = !currentCharacter?.hasInGamePower
    ? "Pas de pouvoir actif"
    : powerReady
      ? "Utiliser le pouvoir"
      : currentCharacter.id === "cessou"
        ? `Pouvoir dans ${Math.max(1, (currentPlayer.powerAvailableAtTurn ?? 5) - (currentPlayer.turnsPlayed ?? 0))} tour(s)`
        : "Pouvoir déjà utilisé";

  const bySquare = useMemo(() => {
    const map = new Map<number, typeof players>();
    for (const p of players) {
      const list = map.get(p.position) ?? [];
      list.push(p);
      map.set(p.position, list);
    }
    return map;
  }, [players]);

  // How many squares should stay visible on screen while a pawn is walking — enough
  // to see the movement land (~1/3 of the board), not the whole 68-square track.
  const VISIBLE_SQUARES_WHILE_WALKING = 20;

  // The scale that fits that many squares in the viewport — used to zoom the camera
  // out a bit while a pawn is walking, so the group can see where it's headed.
  const [fitScale, setFitScale] = useState(1);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      const rowsVisible = VISIBLE_SQUARES_WHILE_WALKING / defaultBoardConfig.cols;
      const visibleViewBoxHeight = rowsVisible * defaultBoardConfig.rowGap;
      const visiblePixelHeight = el.scrollWidth * (visibleViewBoxHeight / defaultBoardConfig.viewBoxWidth);
      setFitScale(Math.min(1, el.clientHeight / visiblePixelHeight));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // The CSS scale animation shrinks content around the top-center origin without
    // changing the scroll container's own (unscaled) layout size — so the target
    // point's on-screen position has to be scaled down to match before centering.
    const scale = isResolving ? fitScale : 1;
    const point = points[currentPlayer.position];
    const containerHeight = el.clientHeight;
    const boardPixelHeight = el.scrollWidth * (H / defaultBoardConfig.viewBoxWidth);
    const targetY = (point.y / H) * boardPixelHeight * scale - containerHeight / 2;
    el.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  }, [currentPlayer.position, currentPlayer.id, isResolving, fitScale]);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerActions}>
          <button type="button" className={styles.quitBtn} onClick={() => setShowQuitConfirm(true)}>
            Quitter
          </button>
          <button
            type="button"
            className={styles.rulesBtn}
            onClick={() => setShowCharacters(true)}
            aria-label="Les personnages"
          >
            i
          </button>
        </div>
        <Logo height={28} />
        <TurnBanner
          player={currentPlayer}
          hasPower={!!currentCharacter?.hasInGamePower}
          powerDisabled={powerDisabled}
          powerLabel={powerLabel}
          onUsePower={usePower}
        />
      </header>

      <div className={styles.boardScroll} ref={scrollRef}>
        <motion.div
          className={styles.boardInner}
          animate={{ scale: isResolving ? fitScale : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top center" }}
        >
          <BoardScene points={points} />
          {squares.map((square, i) => (
            <BoardSquare key={square.id} square={square} point={points[i]} isHalo={square.id === basileSquareId} />
          ))}
          {players.map((p) => {
            const group = bySquare.get(p.position) ?? [];
            const idx = group.findIndex((gp) => gp.id === p.id);
            return (
              <Pawn
                key={p.id}
                player={p}
                points={points}
                isActive={p.id === currentPlayer.id}
                offset={pawnOffsets[idx] ?? { x: 0, y: 0 }}
              />
            );
          })}
        </motion.div>

        {winner && (
          <div className={styles.winOverlay}>
            <div className={styles.winCard}>
              <p className={styles.winTitle}>{getCharacter(winner.characterId)?.name ?? winner.name} gagne !</p>
              <p className={styles.winSubtitle}>{winner.name}</p>
              <p className={styles.winBody}>Case {lastIndex} atteinte la première.</p>
              <button type="button" className={styles.newGameBtn} onClick={() => onEndGame(players)}>
                Nouvelle partie
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Die
          values={dieValues}
          isRolling={isRolling}
          isResolving={isResolving}
          showTotal={isResolving || !!pendingMalus || !!reveal}
          total={lastMoveTotal}
          disabled={isRolling || isResolving || !!reveal || !!winnerId || !!pendingMalus || !!pendingPowerChoice || !!powerResult}
          onRoll={rollDie}
        />
      </footer>

      <CardRevealOverlay reveal={reveal} onDismiss={dismissReveal} />
      <CardRevealOverlay reveal={powerResult} onDismiss={dismissPowerResult} />
      <CardRevealOverlay reveal={flavorReveal} onDismiss={dismissFlavorReveal} priority />
      <MalusChoiceOverlay malus={pendingMalus} players={players} onChoose={chooseMalusTarget} />
      <PowerChoiceOverlay choice={pendingPowerChoice} players={players} onChoose={choosePowerTarget} />
      <CharactersOverlay open={showCharacters} onClose={() => setShowCharacters(false)} />
      <ConfirmDialog
        open={showQuitConfirm}
        title="Quitter la partie ?"
        body="La partie en cours sera arrêtée pour tout le monde. Vous pourrez relancer avec les mêmes joueurs."
        confirmLabel="Quitter la partie"
        cancelLabel="Annuler"
        onCancel={() => setShowQuitConfirm(false)}
        onConfirm={() => onEndGame(players)}
      />
    </div>
  );
}
