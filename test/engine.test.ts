import { describe, it, expect } from 'vitest';
import { verifyChronology, generateRedditShareString, seededShuffle } from '../src/utils/engine';
import { getDailyPuzzle, ALL_MILESTONES } from '../src/data/puzzles';
import { Milestone } from '../src/types/game';

describe('ChronoDaily Engine & Puzzles', () => {
  const mockMilestones: Milestone[] = [
    { id: '1', title: 'Ancient Event', year: 1500, category: 'history', description: '', hint: '' },
    { id: '2', title: 'Renaissance Event', year: 1600, category: 'culture', description: '', hint: '' },
    { id: '3', title: 'Industrial Event', year: 1750, category: 'technology', description: '', hint: '' },
    { id: '4', title: 'Modern Event', year: 1950, category: 'science', description: '', hint: '' },
    { id: '5', title: 'Space Age Event', year: 2020, category: 'space', description: '', hint: '' },
  ];

  it('correctly identifies a perfectly ordered timeline', () => {
    const result = verifyChronology(mockMilestones);
    expect(result.isFullyCorrect).toBe(true);
    expect(result.correctCount).toBe(5);
    expect(result.statuses).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
  });

  it('detects inverted order accurately', () => {
    const inverted = [...mockMilestones].reverse();
    const result = verifyChronology(inverted);
    expect(result.isFullyCorrect).toBe(false);
    expect(result.statuses[0]).toBe('too-early'); // year 2020 should be at index 4, currently at 0
    expect(result.statuses[4]).toBe('too-late');  // year 1500 should be at index 0, currently at 4
  });

  it('identifies partial correctness when only some items are misplaced', () => {
    // Swap 2 and 3: [1500, 1750, 1600, 1950, 2020]
    const swapped = [
      mockMilestones[0],
      mockMilestones[2],
      mockMilestones[1],
      mockMilestones[3],
      mockMilestones[4],
    ];
    const result = verifyChronology(swapped);
    expect(result.isFullyCorrect).toBe(false);
    expect(result.correctCount).toBe(3);
    expect(result.statuses[0]).toBe('correct');
    expect(result.statuses[1]).toBe('too-early'); // 1750 belongs at index 2
    expect(result.statuses[2]).toBe('too-late');  // 1600 belongs at index 1
    expect(result.statuses[3]).toBe('correct');
    expect(result.statuses[4]).toBe('correct');
  });

  it('generates reproducible daily puzzles for identical date seeds', () => {
    const puzzleA = getDailyPuzzle('2026-11-23');
    const puzzleB = getDailyPuzzle('2026-11-23');
    expect(puzzleA.puzzleNumber).toBe(puzzleB.puzzleNumber);
    expect(puzzleA.milestones.map((m) => m.id)).toEqual(puzzleB.milestones.map((m) => m.id));
    expect(puzzleA.milestones.length).toBe(5);
  });

  it('generates different puzzles for different dates', () => {
    const puzzleToday = getDailyPuzzle('2026-11-23');
    const puzzleTomorrow = getDailyPuzzle('2026-11-24');
    expect(puzzleToday.puzzleNumber).not.toBe(puzzleTomorrow.puzzleNumber);
  });

  it('formats clean, spoiler-free Reddit markdown share cards', () => {
    const history = [
      ['correct', 'too-early', 'too-late', 'correct', 'correct'] as any,
      ['correct', 'correct', 'correct', 'correct', 'correct'] as any,
    ];
    const shareString = generateRedditShareString(23, 2, 5, true, history);
    expect(shareString).toContain('ChronoDaily #23 2/5');
    expect(shareString).toContain('🟩 ⬇️ ⬆️ 🟩 🟩');
    expect(shareString).toContain('🟩 🟩 🟩 🟩 🟩');
    expect(shareString).toContain('https://sidsri14.github.io/daily-chrono/');
  });

  it('shuffles arrays deterministically with seed', () => {
    const list = [1, 2, 3, 4, 5];
    const shuffled1 = seededShuffle(list, 'seed-abc');
    const shuffled2 = seededShuffle(list, 'seed-abc');
    expect(shuffled1).toEqual(shuffled2);
  });

  it('has at least 25 unique milestone entries in master catalog', () => {
    expect(ALL_MILESTONES.length).toBeGreaterThanOrEqual(25);
    const ids = new Set(ALL_MILESTONES.map((m) => m.id));
    expect(ids.size).toBe(ALL_MILESTONES.length); // zero duplicate IDs
  });
});
