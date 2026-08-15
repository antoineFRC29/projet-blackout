import { motion, AnimatePresence } from "framer-motion";
import type { Player } from "../../game/types";
import { getCharacter } from "../../game/characters";
import styles from "./TurnBanner.module.css";

interface TurnBannerProps {
  player: Player;
  hasPower?: boolean;
  powerDisabled?: boolean;
  powerLabel?: string;
  onUsePower?: () => void;
}

export function TurnBanner({ player, hasPower, powerDisabled, powerLabel, onUsePower }: TurnBannerProps) {
  const character = getCharacter(player.characterId);
  const displayName = character?.name ?? player.name;
  const initial = (character?.name ?? player.name).charAt(0).toUpperCase();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={player.id}
        className={styles.banner}
        style={{ "--player-color": character?.color } as React.CSSProperties}
        initial={{ opacity: 0, y: -10, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.94 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {hasPower && (
          <button
            type="button"
            className={styles.powerBtn}
            onClick={onUsePower}
            disabled={powerDisabled}
            aria-label={powerLabel}
            title={powerLabel}
          >
            ⚡
          </button>
        )}
        <span className={styles.avatar}>{character ? <img src={character.token} alt="" className={styles.avatarImg} /> : initial}</span>
        <span className={styles.text}>
          <span className={styles.kicker}>À toi de jouer</span>
          <span className={styles.name}>{displayName}</span>
          {character && <span className={styles.realName}>{player.name}</span>}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
