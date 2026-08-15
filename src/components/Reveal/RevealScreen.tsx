import { motion } from "framer-motion";
import type { Player } from "../../game/types";
import { getCharacter } from "../../game/characters";
import { Logo } from "../Logo/Logo";
import styles from "./RevealScreen.module.css";

interface RevealScreenProps {
  players: Player[];
  onContinue: () => void;
}

export function RevealScreen({ players, onContinue }: RevealScreenProps) {
  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Logo />
        <p className={styles.kicker}>Vos personnages</p>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {players.map((p, i) => {
            const character = getCharacter(p.characterId);
            const initial = (character?.name ?? p.name).charAt(0).toUpperCase();
            return (
              <motion.li
                key={p.id}
                className={styles.card}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.avatar} style={{ "--ring": character?.color } as React.CSSProperties}>
                  {character ? <img src={character.token} alt="" className={styles.avatarImg} /> : initial}
                </span>
                <span className={styles.text}>
                  <span className={styles.characterName}>{character?.name ?? "—"}</span>
                  <span className={styles.realName}>{p.name}</span>
                  <span className={`${styles.power} ${!character?.power ? styles.powerPending : ""}`}>
                    {character?.power || "Pouvoir à venir"}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.continueBtn} onClick={onContinue}>
          C'est parti !
        </button>
      </footer>
    </div>
  );
}
