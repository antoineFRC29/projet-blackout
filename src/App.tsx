import { useState } from "react";
import { LobbyScreen } from "./components/Lobby/LobbyScreen";
import { CharacterPickScreen } from "./components/Pick/CharacterPickScreen";
import { CardDrawScreen } from "./components/Draw/CardDrawScreen";
import { RevealScreen } from "./components/Reveal/RevealScreen";
import { BoardScreen } from "./components/Board/BoardScreen";
import { useGameStore } from "./state/gameStore";
import type { Player } from "./game/types";

type Phase = "lobby" | "pick" | "draw" | "summary" | "board";

function resetRoster(players: Player[]): Player[] {
  return players.map((p) => ({
    ...p,
    characterId: null,
    position: 0,
    goulees: 0,
    powerUsed: false,
    turnsPlayed: 0,
    powerAvailableAtTurn: undefined,
    skipNextTurn: false,
    isDead: false,
  }));
}

function App() {
  const [phase, setPhase] = useState<Phase>("lobby");
  const [roster, setRoster] = useState<Player[]>([]);

  function endGame(players: Player[]) {
    setRoster(resetRoster(players));
    setPhase("lobby");
  }

  if (phase === "lobby") {
    return (
      <LobbyScreen
        initialPlayers={roster}
        onStart={(players, mode) => {
          setRoster(players);
          if (mode === "manual") {
            setPhase("pick");
            return;
          }
          useGameStore.getState().startGame(players);
          setPhase("draw");
        }}
      />
    );
  }

  if (phase === "pick") {
    return (
      <CharacterPickScreen
        players={roster}
        onComplete={(players) => {
          setRoster(players);
          useGameStore.getState().startGame(players);
          setPhase("summary");
        }}
      />
    );
  }

  if (phase === "draw") {
    return <CardDrawScreen players={roster} onComplete={() => setPhase("summary")} />;
  }

  if (phase === "summary") {
    return <RevealScreen players={roster} onContinue={() => setPhase("board")} />;
  }

  return <BoardScreen onEndGame={endGame} />;
}

export default App;
