// The rules of tic-tac-toe as plain functions. No React in this file, so the
// rules can be tested on their own.

export type Player = "X" | "O";
export type Square = Player | null;

export type Result =
  | { status: "playing" }
  | { status: "won"; winner: Player; line: readonly number[] }
  | { status: "draw" };

export const EMPTY_BOARD: Square[] = Array(9).fill(null);

// Squares are numbered 0-8, left to right, top to bottom.
const LINES: readonly (readonly number[])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getResult(squares: readonly Square[]): Result {
  for (const line of LINES) {
    const [a, b, c] = line;
    const mark = squares[a];
    if (mark && mark === squares[b] && mark === squares[c]) {
      return { status: "won", winner: mark, line };
    }
  }
  if (squares.every((square) => square !== null)) {
    return { status: "draw" };
  }
  return { status: "playing" };
}

export function otherPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}

// Whose turn it is follows from the board: the starter moves on even counts.
// Deriving it means there is no separate "turn" state to keep in sync.
export function nextPlayer(squares: readonly Square[], starter: Player): Player {
  const movesMade = squares.filter((square) => square !== null).length;
  return movesMade % 2 === 0 ? starter : otherPlayer(starter);
}
