export interface Milestone {
  id: string;
  title: string;
  year: number;
  category: 'science' | 'technology' | 'history' | 'culture' | 'space';
  description: string;
  hint: string;
}

export interface DailyPuzzle {
  date: string; // YYYY-MM-DD
  puzzleNumber: number;
  milestones: Milestone[]; // in correct chronological order
}

export type SlotStatus = 'correct' | 'too-early' | 'too-late' | 'untested';

export interface VerificationResult {
  isFullyCorrect: boolean;
  correctCount: number;
  total: number;
  statuses: SlotStatus[];
}

export interface GameState {
  date: string;
  puzzleNumber: number;
  currentOrder: Milestone[];
  attempts: number;
  maxAttempts: number;
  isGameOver: boolean;
  isWon: boolean;
  attemptHistory: SlotStatus[][];
  startTime: number;
  endTime?: number;
}
