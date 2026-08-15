import { useState, type FormEvent } from "react";
import type { Player } from "../../game/types";
import { createPlayer } from "../../data/players";
import { characters } from "../../data/characters";
import { assignCharacters } from "../../game/characters";
import { CharactersOverlay } from "../Characters/CharactersOverlay";
import { Logo } from "../Logo/Logo";
import styles from "./LobbyScreen.module.css";

export type CharacterAssignMode = "random" | "manual";

interface LobbyScreenProps {
  onStart: (players: Player[], mode: CharacterAssignMode) => void;
  initialPlayers?: Player[];
}

const MAX_PLAYERS = characters.length;
const MIN_PLAYERS = 2;

export function LobbyScreen({ onStart, initialPlayers = [] }: LobbyScreenProps) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [name, setName] = useState("");
  const [showCharacters, setShowCharacters] = useState(false);
  const [mode, setMode] = useState<CharacterAssignMode>("random");

  const atCap = players.length >= MAX_PLAYERS;

  function addPlayer(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || atCap) return;
    setPlayers((prev) => [...prev, createPlayer(trimmed)]);
    setName("");
  }

  function removePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function handleStart() {
    if (players.length < MIN_PLAYERS) return;
    onStart(mode === "random" ? assignCharacters(players) : players, mode);
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Logo height={80} />
        <div className={styles.headerLinks}>
          <button type="button" className={styles.rulesLink} onClick={() => setShowCharacters(true)}>
            Les personnages
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {players.length === 0 ? (
          <p className={styles.empty}>Ajoutez au moins {MIN_PLAYERS} joueurs pour commencer.</p>
        ) : (
          <ul className={styles.list}>
            {players.map((p) => (
              <li key={p.id} className={styles.row}>
                <span className={styles.avatar}>{p.name.charAt(0).toUpperCase()}</span>
                <span className={styles.name}>{p.name}</span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removePlayer(p.id)}
                  aria-label={`Retirer ${p.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <form className={styles.form} onSubmit={addPlayer}>
          <input
            type="text"
            className={styles.input}
            placeholder={atCap ? "Effectif complet" : "Prénom du joueur"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={atCap}
            maxLength={20}
          />
          <button type="submit" className={styles.addBtn} disabled={atCap || !name.trim()}>
            Ajouter
          </button>
        </form>
        {atCap && (
          <p className={styles.capNote}>
            {MAX_PLAYERS} personnages sur {MAX_PLAYERS} — effectif maximum atteint.
          </p>
        )}

        <div className={styles.modePicker}>
          <p className={styles.modeLabel}>Attribution des personnages</p>
          <div className={styles.modeToggle}>
            <button
              type="button"
              className={`${styles.modeBtn} ${mode === "random" ? styles.modeBtnActive : ""}`}
              onClick={() => setMode("random")}
            >
              Tirage au sort
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${mode === "manual" ? styles.modeBtnActive : ""}`}
              onClick={() => setMode("manual")}
            >
              Choix des joueurs
            </button>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.startBtn} disabled={players.length < MIN_PLAYERS} onClick={handleStart}>
          Commencer la partie
        </button>
        <p className={styles.helper}>
          {players.length < MIN_PLAYERS
            ? `Encore ${MIN_PLAYERS - players.length} joueur${MIN_PLAYERS - players.length > 1 ? "s" : ""} pour lancer la partie.`
            : `${players.length} joueur${players.length > 1 ? "s" : ""} prêt${players.length > 1 ? "s" : ""}.`}
        </p>
      </footer>

      <CharactersOverlay open={showCharacters} onClose={() => setShowCharacters(false)} />
    </div>
  );
}
