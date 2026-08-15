import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Die.module.css";

interface DieProps {
  values: [number, number];
  isRolling: boolean;
  /** True while the pawn is walking to its square — the roll is spent, so its faces fade out. */
  isResolving: boolean;
  /** True once a roll has settled and its total is still relevant on screen (walking, resolving a malus, or showing the effect). */
  showTotal: boolean;
  /** The move total for the settled roll — dice faces plus any power bonus folded in (e.g. Carl's +28). */
  total: number;
  disabled: boolean;
  onRoll: () => void;
}

export function Die({ values, isRolling, isResolving, showTotal, total, disabled, onRoll }: DieProps) {
  const controls = useAnimation();
  const [displayValues, setDisplayValues] = useState(values);
  // Defensive against a fast real double-tap landing in the same tick, before React has re-rendered
  // the button as disabled — a synchronous ref guard (reset next tick) catches that; React state
  // wouldn't update in time to block the second call on its own.
  const rolling = useRef(false);
  function handleRoll() {
    if (rolling.current) return;
    rolling.current = true;
    window.setTimeout(() => {
      rolling.current = false;
    }, 0);
    onRoll();
  }

  useEffect(() => {
    if (isRolling) {
      controls.start({
        rotate: [0, -12, 14, -8, 0],
        scale: [1, 1.08, 0.96, 1.04, 1],
        transition: { duration: 0.65, ease: "easeInOut" },
      });
      // Numbers flick through random faces before settling on the real roll.
      const interval = window.setInterval(() => {
        setDisplayValues([1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)]);
      }, 70);
      return () => window.clearInterval(interval);
    }
    setDisplayValues(values);
  }, [isRolling, controls, values]);

  return (
    <div className={styles.wrap}>
      <motion.button
        type="button"
        className={styles.diceRow}
        animate={controls}
        whileTap={!disabled ? { scale: 0.92 } : undefined}
        onClick={handleRoll}
        disabled={disabled}
        aria-label="Lancer les dés"
      >
        <motion.span
          className={styles.die}
          animate={{ opacity: isResolving ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {displayValues[0]}
        </motion.span>
        <motion.span
          className={styles.die}
          animate={{ opacity: isResolving ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {displayValues[1]}
        </motion.span>
      </motion.button>
      <motion.span
        className={styles.total}
        initial={false}
        animate={{ opacity: showTotal ? 1 : 0, y: showTotal ? 0 : -4 }}
        transition={{ duration: 0.25 }}
      >
        Total : {total}
      </motion.span>
    </div>
  );
}
