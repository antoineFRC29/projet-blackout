import { useState } from "react";
import type { Player } from "../../game/types";
import { characters } from "../../data/characters";
import { Logo } from "../Logo/Logo";
import styles from "./CharacterPickScreen.module.css";

interface CharacterPickScreenProps {
  players: Player[];
  onComplete: (players: Player[]) => void;
}

export function CharacterPickScreen({ players, onComplete }: CharacterPickScreenProps) {
  const [assigned, setAssigned] = useState<Player[]>(players);
  const [turnIndex, setTurnIndex] = useState(0);

  const takenIds = new Set(assigned.map((p) => p.characterId).filter((id): id is string => !!id));
  const currentPlayer = assigned[turnIndex];

  function pick(characterId: string) {
    if (takenIds.has(characterId)) return;
    const next = assigned.map((p, i) => (i === turnIndex ? { ...p, characterId } : p));
    setAssigned(next);
    if (turnIndex + 1 < next.length) {
      setTurnIndex(turnIndex + 1);
    } else {
      onComplete(next);
    }
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Logo />
        <p className={styles.kicker}>
          Au tour de <strong>{currentPlayer.name}</strong> de choisir — joueur {turnIndex + 1}/{assigned.length}
        </p>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {characters.map((c) => {
            const taken = takenIds.has(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={`${styles.card} ${taken ? styles.cardTaken : ""}`}
                  onClick={() => pick(c.id)}
                  disabled={taken}
                >
                  <span className={styles.avatar} style={{ "--ring": c.color } as React.CSSProperties}>
                    <img src={c.token} alt="" className={styles.avatarImg} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.characterName}>{c.name}</span>
                    <span className={`${styles.power} ${!c.power ? styles.powerPending : ""}`}>
                      {c.power || "Pouvoir à venir"}
                    </span>
                  </span>
                  {taken && <span className={styles.takenTag}>Pris</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
