export interface SquarePoint {
  x: number;
  y: number;
  /** Tangent direction in degrees (0 = row runs left-to-right, 180 = right-to-left). */
  angle: number;
}

export interface BoardLayoutConfig {
  count: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  /** Squares per row before the track turns back on itself. */
  cols: number;
  marginX: number;
  startY: number;
  rowGap: number;
}

export const defaultBoardConfig: BoardLayoutConfig = {
  count: 68,
  viewBoxWidth: 360,
  viewBoxHeight: 1860,
  cols: 5,
  marginX: 50,
  startY: 70,
  rowGap: 130,
};

/**
 * Classic jeu-de-l'oie "snake" track: squares run in rows that alternate
 * direction (boustrophedon) and turn back on themselves at each row end,
 * matching the creator's reference board rather than a spiral.
 */
export function generateBoardPoints(config: BoardLayoutConfig = defaultBoardConfig): SquarePoint[] {
  const { count, cols, marginX, viewBoxWidth, startY, rowGap } = config;
  const colGap = (viewBoxWidth - marginX * 2) / (cols - 1);
  const points: SquarePoint[] = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const colInRow = i % cols;
    const leftToRight = row % 2 === 0;
    const col = leftToRight ? colInRow : cols - 1 - colInRow;
    points.push({
      x: marginX + col * colGap,
      y: startY + row * rowGap,
      angle: leftToRight ? 0 : 180,
    });
  }
  return points;
}

/**
 * Smooth Catmull-Rom spline through the squares, converted to cubic Bezier
 * segments — this is what gives the track its curved "snake" turns at each
 * row end instead of sharp right angles.
 */
export function pathThroughPoints(points: SquarePoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  const d: string[] = [`M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(
      `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    );
  }
  return d.join(" ");
}
