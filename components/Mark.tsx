import type { Player } from "@/lib/game";

type MarkProps = {
  player: Player;
  className?: string;
  // When true the strokes are "painted on" with an animation (see globals.css).
  painted?: boolean;
};

// The X and O drawings. They are decorative: the text label lives on the
// button or heading that contains them, so the SVG is hidden from screen readers.
export function Mark({ player, className = "", painted = false }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`mark ${painted ? "mark-painted" : ""} ${className}`}
      data-player={player}
      aria-hidden="true"
      focusable="false"
    >
      {player === "X" ? (
        <>
          <line x1="24" y1="24" x2="76" y2="76" pathLength={1} />
          <line x1="76" y1="24" x2="24" y2="76" pathLength={1} />
        </>
      ) : (
        <circle
          cx="50"
          cy="50"
          r="28"
          pathLength={1}
          transform="rotate(-90 50 50)"
        />
      )}
    </svg>
  );
}
