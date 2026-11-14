"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Player } from "./game";

export type Scores = { X: number; O: number; draws: number };

const ZERO: Scores = { X: 0, O: 0, draws: 0 };
const STORAGE_KEY = "xo-scores";
const CHANGE_EVENT = "xo-scores-change";

// Used when localStorage is blocked (some private windows), so the score
// still counts for as long as the page is open.
let memoryCopy: string | null = null;

function read(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryCopy;
  } catch {
    return memoryCopy;
  }
}

function write(scores: Scores) {
  const raw = JSON.stringify(scores);
  memoryCopy = raw;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Storage unavailable: memoryCopy above still holds the score.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function parse(raw: string | null): Scores {
  if (!raw) return ZERO;
  try {
    const value = JSON.parse(raw);
    const count = (n: unknown) =>
      typeof n === "number" && Number.isInteger(n) && n >= 0 ? n : 0;
    return { X: count(value.X), O: count(value.O), draws: count(value.draws) };
  } catch {
    return ZERO;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange); // another tab changed it
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// localStorage lives outside React, so useSyncExternalStore is the hook that
// reads it safely: the server renders zeros (it has no localStorage) and the
// browser swaps in the saved score without a hydration mismatch.
export function useScores() {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  const scores = useMemo(() => parse(raw), [raw]);

  function addResult(outcome: Player | "draws") {
    const latest = parse(read());
    write({ ...latest, [outcome]: latest[outcome] + 1 });
  }

  function resetScores() {
    write(ZERO);
  }

  return { scores, addResult, resetScores };
}
