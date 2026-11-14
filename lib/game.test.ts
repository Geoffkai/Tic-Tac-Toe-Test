import { describe, expect, it } from "vitest";
import { EMPTY_BOARD, getResult, nextPlayer, type Square } from "./game";

// Build a board from a 9-character string: "X", "O" or "-" for empty.
function board(layout: string): Square[] {
  return layout.split("").map((c) => (c === "-" ? null : (c as Square)));
}

describe("getResult", () => {
  it("is still playing on an empty board", () => {
    expect(getResult(EMPTY_BOARD)).toEqual({ status: "playing" });
  });

  it("is still playing when squares remain and nobody has a line", () => {
    expect(getResult(board("XO-OX----"))).toEqual({ status: "playing" });
  });

  it.each([
    ["top row", "XXXOO----", [0, 1, 2]],
    ["middle row", "OO-XXX---", [3, 4, 5]],
    ["bottom row", "OO----XXX", [6, 7, 8]],
    ["left column", "XO-XO-X--", [0, 3, 6]],
    ["middle column", "OX--X-OX-", [1, 4, 7]],
    ["right column", "O-XO-X--X", [2, 5, 8]],
    ["main diagonal", "XO-OX---X", [0, 4, 8]],
    ["anti diagonal", "O-XOX-X--", [2, 4, 6]],
  ])("finds a win on the %s", (_name, layout, line) => {
    expect(getResult(board(layout))).toEqual({
      status: "won",
      winner: "X",
      line,
    });
  });

  it("reports O as the winner when O holds the line", () => {
    expect(getResult(board("OOOXX-X--"))).toMatchObject({ winner: "O" });
  });

  it("is a draw when the board is full with no line", () => {
    expect(getResult(board("XOXXOOOXX"))).toEqual({ status: "draw" });
  });

  it("counts a win on the last square as a win, not a draw", () => {
    expect(getResult(board("XOXOXOOXX"))).toMatchObject({
      status: "won",
      winner: "X",
    });
  });
});

describe("nextPlayer", () => {
  it("gives the starter the first move", () => {
    expect(nextPlayer(EMPTY_BOARD, "X")).toBe("X");
    expect(nextPlayer(EMPTY_BOARD, "O")).toBe("O");
  });

  it("alternates after each move", () => {
    expect(nextPlayer(board("X--------"), "X")).toBe("O");
    expect(nextPlayer(board("XO-------"), "X")).toBe("X");
    expect(nextPlayer(board("O--------"), "O")).toBe("X");
  });
});
