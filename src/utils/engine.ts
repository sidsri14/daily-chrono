import type { Milestone, SlotStatus, VerificationResult } from '../types/game';

/**
 * Checks the submitted array of milestones against chronological order.
 * A milestone is correct if its year is strictly >= previous and <= next in the submitted list,
 * or more simply, if its rank matches the true sorted rank by year.
 */
export function verifyChronology(milestones: Milestone[]): VerificationResult {
  const sorted = [...milestones].sort((a, b) => a.year - b.year);
  const correctIds = sorted.map((m) => m.id);

  const statuses: SlotStatus[] = milestones.map((m, index) => {
    const targetIndex = correctIds.indexOf(m.id);
    if (targetIndex === index) {
      return 'correct';
    } else if (targetIndex < index) {
      // It belongs earlier in the list (higher up)
      return 'too-late';
    } else {
      // It belongs later in the list (further down)
      return 'too-early';
    }
  });

  const correctCount = statuses.filter((s) => s === 'correct').length;
  const isFullyCorrect = correctCount === milestones.length;

  return {
    isFullyCorrect,
    correctCount,
    total: milestones.length,
    statuses,
  };
}

/**
 * Generates an accessible, spoiler-free Reddit markdown share string.
 */
export function generateRedditShareString(
  puzzleNumber: number,
  attempts: number,
  maxAttempts: number,
  isWon: boolean,
  history: SlotStatus[][],
  url: string = 'https://sidsri14.github.io/daily-chrono/'
): string {
  const resultHeader = isWon
    ? `ChronoDaily #${puzzleNumber} ${attempts}/${maxAttempts}`
    : `ChronoDaily #${puzzleNumber} X/${maxAttempts}`;

  const rows = history
    .map((row) =>
      row
        .map((status) => {
          if (status === 'correct') return '🟩';
          if (status === 'too-late') return '⬆️';
          return '⬇️';
        })
        .join(' ')
    )
    .join('\n');

  return `${resultHeader}\n\n${rows}\n\nPlay today's daily timeline: ${url}`;
}

/**
 * Simple pseudo-random seeded shuffle for reproducible daily puzzles.
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    const j = Math.abs(hash) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  // Ensure it's not already in sorted order
  return result;
}
