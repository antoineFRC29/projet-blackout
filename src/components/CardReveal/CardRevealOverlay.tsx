import { motion, AnimatePresence } from "framer-motion";
import type { Reveal } from "../../game/types";
import cardAction from "../../assets/board/card-action.png";
import cardEvent from "../../assets/board/card-event.png";
import styles from "./CardRevealOverlay.module.css";

interface CardRevealOverlayProps {
  reveal: Reveal | null;
  onDismiss: () => void;
  /** Stack this above a same-time regular reveal — used for Lucien's roll-triggered flavor toast, which can land on screen at the same moment as the square's own effect card. */
  priority?: boolean;
}

const onDarkKinds = new Set(["event", "info"]);
const cardArt: Partial<Record<Reveal["kind"], string>> = { action: cardAction, event: cardEvent };

export function CardRevealOverlay({ reveal, onDismiss, priority }: CardRevealOverlayProps) {
  // A character-specific reveal (a power result, Loïc's skip…) shows that character's own
  // card; a genuinely drawn Action/Event card shows its own art; anything else (goulée
  // amounts, "retour à la case départ") stays plain — no card justifies a picture there.
  const illustration = reveal ? reveal.image ?? cardArt[reveal.kind] : undefined;

  return (
    <AnimatePresence>
      {reveal && (
        <motion.div
          className={styles.backdrop}
          style={priority ? { zIndex: 25 } : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <motion.div
            className={`${styles.card} ${illustration ? styles.cardIllustrated : ""}`}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {illustration ? (
              <img src={illustration} alt="" className={styles.illustration} />
            ) : (
              <div className={`${styles.badge} ${styles[reveal.kind]}`}>
                <span className={`${styles.badgeDot} ${onDarkKinds.has(reveal.kind) ? styles.onDark : ""}`} />
              </div>
            )}
            <p className={`${styles.title} ${reveal.kind === "event" ? styles.titleEvent : ""}`}>{reveal.title}</p>
            <p className={`${styles.body} ${reveal.kind === "event" ? styles.bodyEvent : ""}`}>{reveal.body}</p>
            <button type="button" className={styles.button} onClick={onDismiss}>
              Continuer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
