import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Player } from "../../game/types";
import { getCharacter } from "../../game/characters";
import { defaultBoardConfig, type SquarePoint } from "../../game/boardGeometry";
import { HOP_DURATION_MS, MAX_WALK_MS } from "../../game/motion";
import styles from "./Pawn.module.css";

interface PawnProps {
  player: Player;
  /** Every square's board position, indexed by square id, so a move can hop through each one in between. */
  points: SquarePoint[];
  isActive: boolean;
  /** Small offset so pawns sharing a square don't fully overlap. */
  offset: { x: number; y: number };
}

const { viewBoxWidth: W, viewBoxHeight: H } = defaultBoardConfig;

function squareStyle(point: SquarePoint, offset: { x: number; y: number }) {
  return {
    left: `calc(${(point.x / W) * 100}% + ${offset.x}px)`,
    top: `calc(${(point.y / H) * 100}% + ${offset.y}px)`,
  };
}

interface Walk {
  key: number;
  left: string[];
  top: string[];
  duration: number;
}

function buildWalk(key: number, from: number, to: number, points: SquarePoint[], offset: { x: number; y: number }): Walk {
  const path: number[] = [];
  if (from === to) {
    path.push(to);
  } else {
    const step = to > from ? 1 : -1;
    for (let i = from; ; i += step) {
      path.push(i);
      if (i === to) break;
    }
  }
  return {
    key,
    left: path.map((i, idx) => squareStyle(points[i], idx === path.length - 1 ? offset : { x: 0, y: 0 }).left),
    top: path.map((i, idx) => squareStyle(points[i], idx === path.length - 1 ? offset : { x: 0, y: 0 }).top),
    duration: from === to ? 0.3 : Math.min((path.length - 1) * HOP_DURATION_MS, MAX_WALK_MS) / 1000,
  };
}

export function Pawn({ player, points, isActive, offset }: PawnProps) {
  const character = getCharacter(player.characterId);
  const lastPosition = useRef(player.position);
  const walkId = useRef(0);
  const [walk, setWalk] = useState<Walk>(() => buildWalk(0, player.position, player.position, points, offset));

  useEffect(() => {
    const from = lastPosition.current;
    const to = player.position;
    lastPosition.current = to;
    walkId.current += 1;
    // A plain state update (not an imperative controls.start()/promise chain) so React
    // StrictMode's dev-only double-invoke of this effect is harmless: worst case it computes
    // the same walk twice and re-applies it, rather than racing two animations that can
    // leave the hop sequence stuck (the imperative version of this hit exactly that bug).
    setWalk(buildWalk(walkId.current, from, to, points, offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.position, offset, points]);

  // "Le jeton disparait" — Antonin's token is removed from the board entirely once he dies.
  if (player.isDead) return null;

  return (
    <motion.div
      className={styles.pawn}
      initial={false}
      animate={{ left: walk.left, top: walk.top }}
      transition={{ duration: walk.duration, ease: "easeInOut" }}
    >
      <motion.div
        animate={isActive ? { y: [0, -3, 0] } : { y: 0 }}
        transition={isActive ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : undefined}
        className={styles.avatar}
        style={{ "--pawn-color": character?.color } as React.CSSProperties}
        title={character ? `Jeton de ${character.name}` : `Jeton de ${player.name}`}
      >
        {character ? (
          <img src={character.token} alt="" className={styles.avatarImg} />
        ) : (
          player.name.charAt(0).toUpperCase()
        )}
      </motion.div>
    </motion.div>
  );
}
