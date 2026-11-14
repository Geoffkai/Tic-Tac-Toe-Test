# Spec: X's & O's (Test 1, Tic-Tac-Toe)

Source: the "Test 1: Tic-Tac-Toe React App" brief at tictactoe.capm.us.

## 1. Goal

Ship a two-player Tic-Tac-Toe game on a public Vercel URL that passes the three
"What Counts as Done" checks, includes the optional score board, and has a theme
of its own.

## 2. Requirements from the brief

| ID | Requirement | Source | Priority |
|----|-------------|--------|----------|
| R1 | Built with React + Next.js | "Stack" | Must |
| R2 | Deployed on Vercel, public production URL (not a preview URL) | "Deployment", "Tips" | Must |
| R3 | Two players take turns placing marks on a 3x3 board | Done #1 | Must |
| R4 | The game shows who won, or that it is a draw | Done #2 | Must |
| R5 | A button labelled "New Game" starts over | Done #3 | Must |
| R6 | Score board that counts wins and draws | "Bonus (optional)" | Should |
| R7 | Style and personality; custom marks and theme are welcome | "we love style and personality" | Should |
| R8 | Public GitHub repository | Submission #2 | Must |
| R9 | Screenshots of the game | Submission #3 | Must |
| R10 | Demo video | Submission #4 | Optional |

Not asked for, and not built: a computer opponent, online play, accounts, move
history or undo, sound.

## 3. Game rules (acceptance criteria)

- AC1. The board starts with 9 empty squares. Team X moves first in the first game.
- AC2. Clicking or tapping an empty square places the current team's mark, then the turn passes to the other team.
- AC3. A filled square cannot be changed. Clicking it does nothing.
- AC4. A team wins when it holds any of the 8 lines (3 rows, 3 columns, 2 diagonals). The three winning squares are highlighted and the status reads "X wins!" or "O wins!".
- AC5. If all 9 squares are filled with no line, the status reads "It's a draw".
- AC6. After a win or a draw, no more marks can be placed.
- AC7. "New Game" clears the board at any time, mid-game included. It never changes the scores.
- AC8. The starting team alternates each game, so neither side always goes first. The status always says whose turn it is.
- AC9. A win adds 1 to that team's score. A draw adds 1 to the draw count. Each finished game is counted exactly once.
- AC10. Scores survive a page reload (saved in the browser's localStorage). "Reset scores" sets all three counts to 0.

## 4. Design direction

Tic-tac-toe is "X's and O's", the coach's phrase for a play diagram. The page is
a school gym floor seen from above.

- Ground: varnished maple planks with grain and plank seams.
- Board: white court-line paint on the wood, sitting inside the centre circle.
- Teams: Team X owns a cobalt painted end zone, Team O a red one. Each zone
  carries the team's mark and its win count in varsity block numerals.
- Marks: painted onto the floor stroke by stroke when placed.
- Win: the three winning squares are painted in the winner's colour and their
  marks turn white. The other marks fade.
- Turn: the team to play has its zone at full colour with a "To play" tag. The
  other zone dims. Colour is never the only signal; the status line says it in words.
- Type: Graduate (collegiate block lettering) for names and numerals, Barlow for interface text.
- One theme only: a lit gym. No dark mode.

## 5. Layout

- Phone (portrait): title, then a score band (Team X | Draws | Team O), status
  line, board, "New Game" and "Reset scores", credit line. Everything fits one
  screen without scrolling at 390x844.
- Desktop (1024px and up): Team X zone fills the left edge, Team O the right,
  full height. The centre column holds title, status, board, buttons and the
  draw count.
- The board is square and scales with the smaller of the viewport width and height.

## 6. Accessibility

- Every square is a real button with a label such as "Row 2, column 3: empty".
- Arrow keys move between squares; Enter or Space places a mark.
- Turn and result are announced through a live region.
- Tap targets are at least 44px. Text contrast meets WCAG AA.
- Animations are disabled under "prefers-reduced-motion".

## 7. Technical design

- Next.js (App Router) + React + TypeScript + Tailwind CSS. No other runtime dependencies.
- `lib/game.ts`: pure functions, no React. `getResult(squares)` returns
  playing / won (with winner and line) / draw. `nextPlayer(squares, starter)`
  works out whose turn it is from the board itself.
- `lib/useScores.ts`: reads and writes the score in localStorage.
- `components/Game.tsx`: the only stateful component. State is just the 9
  squares and who started; turn and result are derived from them, never stored twice.
- `components/Mark.tsx`: the X and O drawings (SVG).
- `lib/game.test.ts`: unit tests for the rules.

## 8. Verification

- Unit tests cover all 8 winning lines, a draw, turn order and an unfinished game.
- `npm run lint` and `npm run build` pass.
- Manual run in a browser at phone and desktop sizes: X win, O win, draw,
  New Game mid-game, score persistence after reload, reset, keyboard-only play.

## 9. Submission checklist

- [ ] Push to a public GitHub repository
- [ ] Deploy to Vercel and copy the production URL
- [ ] Take screenshots (phone and desktop, mid-game and a win)
- [ ] Optional: record a short demo video
- [ ] Submit at https://apply.capm.us, choosing "1) Tic-Tac-Toe"
