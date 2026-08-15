import type { Square } from "../../game/types";
import { defaultBoardConfig, type SquarePoint } from "../../game/boardGeometry";
import squareStart from "../../assets/board/square-start.png";
import squareFinish from "../../assets/board/square-finish.png";
import squareAction from "../../assets/board/square-action.png";
import squareEvent from "../../assets/board/square-event.png";
import styles from "./BoardSquare.module.css";

interface BoardSquareProps {
  square: Square;
  point: SquarePoint;
  /** True when Basile currently stands here — his power glows the square he's on. */
  isHalo?: boolean;
}

const { viewBoxWidth: W, viewBoxHeight: H } = defaultBoardConfig;

export function BoardSquare({ square, point, isHalo }: BoardSquareProps) {
  const position = { left: `${(point.x / W) * 100}%`, top: `${(point.y / H) * 100}%` };

  if (square.type === "start") {
    return (
      <div className={`${styles.token} ${styles.start}`} style={position}>
        <img src={squareStart} alt="" className={styles.medallion} />
        <span className={styles.number}>DÉPART</span>
      </div>
    );
  }

  if (square.type === "finish") {
    return (
      <div className={`${styles.token} ${styles.finish}`} style={position}>
        <img src={squareFinish} alt="" className={styles.medallion} />
        <span className={styles.number}>{square.id}</span>
      </div>
    );
  }

  if (square.type === "action" || square.type === "event") {
    const art = square.type === "action" ? squareAction : squareEvent;
    return (
      <div className={`${styles.token} ${styles[square.type]} ${isHalo ? styles.halo : ""}`} style={position}>
        <img src={art} alt="" className={styles.medallion} />
        <span className={styles.number}>{square.id}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.token} ${styles[square.type]} ${isHalo ? styles.halo : ""}`} style={position}>
      <span className={styles.dot} />
      <span className={styles.number}>{square.id}</span>
    </div>
  );
}
