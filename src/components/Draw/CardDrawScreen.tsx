import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Player } from "../../game/types";
import { getCharacter } from "../../game/characters";
import { Logo } from "../Logo/Logo";
import styles from "./CardDrawScreen.module.css";

interface CardDrawScreenProps {
  players: Player[];
  onComplete: () => void;
}

export function CardDrawScreen({ players, onComplete }: CardDrawScreenProps) {
  const [index, setIndex] = useState(0);
  const player = players[index];
  const character = getCharacter(player.characterId);
  const isLast = index === players.length - 1;

  function handleNext() {
    if (isLast) {
      onComplete();
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Logo />
        <p className={styles.progress}>
          {index + 1} / {players.length}
        </p>
      </header>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={player.id}
            className={styles.card}
            style={{ "--ring": character?.color } as React.CSSProperties}
            initial={{ opacity: 0, y: 28, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {character ? (
              <img src={character.image} alt={character.name} className={styles.cardImage} />
            ) : (
              <div className={styles.cardFallback}>
                <span className={styles.characterName}>—</span>
              </div>
            )}
            <span className={styles.divider} />
            <span className={styles.forLabel}>Pour</span>
            <span className={styles.playerName}>{player.name}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.nextBtn} onClick={handleNext}>
          {isLast ? "Voir le résumé" : "Carte suivante"}
        </button>
      </footer>
    </div>
  );
}
