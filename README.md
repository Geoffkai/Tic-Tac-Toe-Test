# X's & O's

A two-player Tic-Tac-Toe game, built with React and Next.js for the SUpost
"Test 1" coding challenge.

"X's and O's" is what coaches call a play diagram, so the game is played on a
gym floor: maple planks, white court lines, and a painted end zone for each team.

## What it does

- Two players take turns on a 3x3 board, sharing one device.
- The game announces the winner, or a draw, and paints the winning line.
- **New Game** clears the board. The two teams take turns going first.
- The score board counts wins for each team and draws, and remembers them
  after a page reload. **Reset scores** sets them back to zero.
- Works on phones and desktops, and with a keyboard (arrow keys move, Enter places a mark).

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests for the game rules
npm run build   # production build
```

## How the code is organised

| File | What it holds |
|------|---------------|
| `lib/game.ts` | The rules as plain functions: who won, is it a draw, whose turn |
| `lib/game.test.ts` | Tests for the rules (all 8 winning lines, draw, turn order) |
| `lib/useScores.ts` | Saves the score in the browser's localStorage |
| `components/Game.tsx` | The game screen and its state |
| `components/Mark.tsx` | The X and O drawings |
| `app/globals.css` | The gym-floor theme, layout and animations |
| `docs/SPEC.md` | The requirements this was built against |

Built with AI assistance (Claude Code), as the challenge encourages.
