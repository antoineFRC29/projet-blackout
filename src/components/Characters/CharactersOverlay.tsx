import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { characters } from "../../data/characters";
import { powerEffect } from "../../game/characters";
import styles from "./CharactersOverlay.module.css";

interface CharactersOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function CharactersOverlay({ open, onClose }: CharactersOverlayProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClose() {
    onClose();
    // Reset after the close animation finishes so the list is what reopens, not the last card.
    window.setTimeout(() => setSelected(null), 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`${styles.sheet} ${selected !== null ? styles.sheetDetail : ""}`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.header}>
              {selected === null ? (
                <div>
                  <h2 className={styles.title}>Les personnages</h2>
                  <p className={styles.subtitle}>{characters.length} personnages — tirés au sort ou choisis en début de partie.</p>
                </div>
              ) : (
                <button type="button" className={styles.backBtn} onClick={() => setSelected(null)}>
                  ‹ Tous les personnages
                </button>
              )}
              <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Fermer">
                ×
              </button>
            </header>

            {selected === null ? (
              <div className={styles.body}>
                <ul className={styles.list}>
                  {characters.map((c, i) => (
                    <li key={c.id}>
                      <button type="button" className={styles.card} onClick={() => setSelected(i)}>
                        <span className={styles.avatar} style={{ "--ring": c.color } as React.CSSProperties}>
                          <img src={c.token} alt="" className={styles.avatarImg} />
                        </span>
                        <span className={styles.text}>
                          <span className={styles.characterName}>{c.name}</span>
                          <span className={`${styles.power} ${!c.power ? styles.powerPending : ""}`}>
                            {c.power || "Pouvoir à venir"}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.detailBody}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={characters[selected].id}
                    className={styles.detail}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img src={characters[selected].image} alt={characters[selected].name} className={styles.cardImage} />
                    <p className={`${styles.detailPower} ${!characters[selected].power ? styles.powerPending : ""}`}>
                      {characters[selected].power ? powerEffect(characters[selected].power) : "Pouvoir à venir"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            <footer className={styles.footer}>
              {selected === null ? (
                <button type="button" className={styles.closeAction} onClick={handleClose}>
                  Compris
                </button>
              ) : (
                <div className={styles.nav}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={() => setSelected((i) => ((i ?? 0) - 1 + characters.length) % characters.length)}
                    aria-label="Personnage précédent"
                  >
                    ‹
                  </button>
                  <span className={styles.navCount}>
                    {selected + 1} / {characters.length}
                  </span>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={() => setSelected((i) => ((i ?? 0) + 1) % characters.length)}
                    aria-label="Personnage suivant"
                  >
                    ›
                  </button>
                </div>
              )}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
