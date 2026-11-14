"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  EMPTY_BOARD,
  getResult,
  nextPlayer,
  otherPlayer,
  type Player,
  type Square,
} from "@/lib/game";
import { useScores } from "@/lib/useScores";
import { Mark } from "./Mark";

type ZoneState = "to-play" | "winner" | "idle";

export function Game() {
  // The only game state: what is in each square, and who started this game.
  // Whose turn it is and whether someone won are worked out from these.
  const [squares, setSquares] = useState<Square[]>(EMPTY_BOARD);
  const [starter, setStarter] = useState<Player>("X");
  const { scores, addResult, resetScores } = useScores();
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const result = getResult(squares);
  const current = nextPlayer(squares, starter);
  const playing = result.status === "playing";
  const winningLine = result.status === "won" ? result.line : [];

  function play(index: number) {
    if (!playing || squares[index]) return;

    const next = squares.slice();
    next[index] = current;
    setSquares(next);

    // Count the score here, at the moment the game ends, so each game is
    // counted exactly once.
    const outcome = getResult(next);
    if (outcome.status === "won") addResult(outcome.winner);
    if (outcome.status === "draw") addResult("draws");
  }

  function newGame() {
    const gameWasStarted = squares.some((square) => square !== null);
    setSquares(EMPTY_BOARD);
    // Take turns going first, so neither team always has the advantage.
    if (gameWasStarted) setStarter(otherPlayer(starter));
  }

  // Arrow keys move focus around the board like a grid.
  function handleBoardKeys(event: KeyboardEvent<HTMLDivElement>) {
    const from = cellRefs.current.indexOf(event.target as HTMLButtonElement);
    if (from === -1) return;
    const row = Math.floor(from / 3);
    const col = from % 3;
    const moves: Record<string, number> = {
      ArrowLeft: col > 0 ? from - 1 : from,
      ArrowRight: col < 2 ? from + 1 : from,
      ArrowUp: row > 0 ? from - 3 : from,
      ArrowDown: row < 2 ? from + 3 : from,
    };
    const to = moves[event.key];
    if (to === undefined) return;
    event.preventDefault();
    cellRefs.current[to]?.focus();
  }

  function zoneState(player: Player): ZoneState {
    if (result.status === "won") {
      return result.winner === player ? "winner" : "idle";
    }
    return playing && current === player ? "to-play" : "idle";
  }

  const noScoresYet = scores.X + scores.O + scores.draws === 0;

  return (
    <main className="court">
      <h1 className="title font-display">X&rsquo;s &amp; O&rsquo;s</h1>

      <Zone player="X" wins={scores.X} state={zoneState("X")} />
      <div className="draws">
        <span className="draws-label">Draws</span>
        <span key={scores.draws} className="draws-count font-display score-tick">
          {scores.draws}
        </span>
      </div>
      <Zone player="O" wins={scores.O} state={zoneState("O")} />

      <p className="status" role="status" aria-live="polite">
        {result.status === "won" && (
          <>
            <Mark player={result.winner} className="status-mark" />
            <span>{result.winner} wins!</span>
          </>
        )}
        {result.status === "draw" && <span>It&rsquo;s a draw</span>}
        {playing && (
          <>
            <Mark player={current} className="status-mark" />
            <span>{current} to play</span>
          </>
        )}
      </p>

      <div className="board-wrap">
        <div className="center-circle" aria-hidden="true" />
        <div
          className="board"
          role="group"
          aria-label="Tic-tac-toe board"
          data-over={!playing}
          onKeyDown={handleBoardKeys}
        >
          {squares.map((square, index) => {
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;
            const winOrder = winningLine.indexOf(index);
            return (
              <button
                key={index}
                ref={(element) => {
                  cellRefs.current[index] = element;
                }}
                type="button"
                className="cell"
                data-mark={square ?? undefined}
                data-win={winOrder >= 0 ? winOrder : undefined}
                aria-label={`Row ${row}, column ${col}: ${square ?? "empty"}`}
                // aria-disabled (not disabled) keeps filled squares focusable,
                // so arrow keys and screen readers can still move across them.
                aria-disabled={!playing || square !== null}
                onClick={() => play(index)}
              >
                {square ? (
                  <Mark player={square} painted />
                ) : (
                  playing && <Mark player={current} className="ghost" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={newGame}>
          New Game
        </button>
        <button
          type="button"
          className="btn-text"
          onClick={resetScores}
          disabled={noScoresYet}
        >
          Reset scores
        </button>
      </div>

      <footer className="credit">Built by Geoff with React and Next.js</footer>
    </main>
  );
}

function Zone({
  player,
  wins,
  state,
}: {
  player: Player;
  wins: number;
  state: ZoneState;
}) {
  return (
    <section className={`zone zone-${player.toLowerCase()}`} data-state={state}>
      <h2 className="zone-name font-display">Team {player}</h2>
      <p className="zone-row">
        <Mark player={player} className="zone-mark" />
        {/* The key restarts the tick animation each time the number changes. */}
        <span key={wins} className="zone-score font-display score-tick">
          {wins}
        </span>
        <span className="zone-unit">{wins === 1 ? "win" : "wins"}</span>
      </p>
      <p className="zone-tag" aria-hidden="true">
        {state === "winner" ? "Winner" : "To play"}
      </p>
    </section>
  );
}
