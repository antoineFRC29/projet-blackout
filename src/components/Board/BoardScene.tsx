import { defaultBoardConfig, pathThroughPoints, type SquarePoint } from "../../game/boardGeometry";

interface BoardSceneProps {
  points: SquarePoint[];
}

const { viewBoxWidth: W, viewBoxHeight: H } = defaultBoardConfig;

export function BoardScene({ points }: BoardSceneProps) {
  const trail = pathThroughPoints(points);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Plateau en serpent"
    >
      <defs>
        <radialGradient id="ground" cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor="var(--color-paper)" />
          <stop offset="60%" stopColor="var(--color-paper-deep)" />
          <stop offset="100%" stopColor="var(--color-paper-shadow)" />
        </radialGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.05 0" />
        </filter>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#ground)" />
      <rect x="0" y="0" width={W} height={H} filter="url(#grain)" />

      <path
        d={trail}
        fill="none"
        stroke="rgba(20,22,26,0.32)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="1 14"
      />
    </svg>
  );
}
