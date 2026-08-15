import { motion, AnimatePresence } from "framer-motion";
import type { Player } from "../../game/types";
import { getCharacter } from "../../game/characters";
import styles from "./MalusChoiceOverlay.module.css";

interface PendingMalus {
  playerId: string;
  amount: number;
}

interface MalusChoiceOverlayProps {
  malus: PendingMalus | null;
  players: Player[];
  onChoose: (targetId: string) => void;
}

export function MalusChoiceOverlay({ malus, players, onChoose }: MalusChoiceOverlayProps) {
  const opponents = malus ? players.filter((p) => p.id !== malus.playerId) : [];

  return (
    <AnimatePresence>
      {malus && (
        <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className={styles.card}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
            </div>
            <p className={styles.title}>Case malus</p>
            <p className={styles.body}>
              Donne {malus.amount} goulée{malus.amount > 1 ? "s" : ""} à qui ?
            </p>
            <ul className={styles.list}>
              {opponents.map((p) => {
                const character = getCharacter(p.characterId);
                return (
                  <li key={p.id}>
                    <button type="button" className={styles.option} onClick={() => onChoose(p.id)}>
                      <span className={styles.avatar} style={{ "--ring": character?.color } as React.CSSProperties}>
                        {character ? (
                          <img src={character.token} alt="" className={styles.avatarImg} />
                        ) : (
                          p.name.charAt(0).toUpperCase()
                        )}
                      </span>
                      <span className={styles.name}>{character?.name ?? p.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
