import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { TimelineCard } from './components/TimelineCard';
import { ShareModal } from './components/ShareModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { getDailyPuzzle } from './data/puzzles';
import { verifyChronology, seededShuffle } from './utils/engine';
import type { Milestone, SlotStatus } from './types/game';
import { CheckCircle2, Share2, Sparkles } from 'lucide-react';

const MAX_ATTEMPTS = 5;

export const App: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const puzzle = getDailyPuzzle(today);

  // Local storage keys
  const STORAGE_KEY_STATE = `chronodaily_state_${today}`;
  const STORAGE_KEY_STREAK = 'chronodaily_streak';

  // Game state
  const [currentOrder, setCurrentOrder] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentOrder;
      } catch {}
    }
    // Deterministic initial shuffle so it starts disordered
    return seededShuffle(puzzle.milestones, `shuffle-${today}`);
  });

  const [statuses, setStatuses] = useState<SlotStatus[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.statuses || Array(5).fill('untested');
      } catch {}
    }
    return Array(5).fill('untested');
  });

  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.attempts || 0;
      } catch {}
    }
    return 0;
  });

  const [attemptHistory, setAttemptHistory] = useState<SlotStatus[][]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.attemptHistory || [];
      } catch {}
    }
    return [];
  });

  const [isWon, setIsWon] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.isWon || false;
      } catch {}
    }
    return false;
  });

  const [isGameOver, setIsGameOver] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.isGameOver || false;
      } catch {}
    }
    return false;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STREAK);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    const stateToSave = {
      currentOrder,
      statuses,
      attempts,
      attemptHistory,
      isWon,
      isGameOver,
    };
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(stateToSave));
  }, [currentOrder, statuses, attempts, attemptHistory, isWon, isGameOver, STORAGE_KEY_STATE]);

  // Reorder card upwards
  const handleMoveUp = (index: number) => {
    if (index === 0 || isGameOver) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCurrentOrder(newOrder);
    setStatuses(Array(5).fill('untested'));
  };

  // Reorder card downwards
  const handleMoveDown = (index: number) => {
    if (index === currentOrder.length - 1 || isGameOver) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setCurrentOrder(newOrder);
    setStatuses(Array(5).fill('untested'));
  };

  // Verify chronology
  const handleVerify = () => {
    if (isGameOver) return;

    const newAttempts = attempts + 1;
    const result = verifyChronology(currentOrder);

    setStatuses(result.statuses);
    setAttempts(newAttempts);

    const newHistory = [...attemptHistory, result.statuses];
    setAttemptHistory(newHistory);

    if (result.isFullyCorrect) {
      setIsWon(true);
      setIsGameOver(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem(STORAGE_KEY_STREAK, newStreak.toString());

      // Trigger victory celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      setTimeout(() => setIsShareModalOpen(true), 1200);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      setIsGameOver(true);
      setStreak(0);
      localStorage.setItem(STORAGE_KEY_STREAK, '0');
      setTimeout(() => setIsShareModalOpen(true), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header
        puzzleNumber={puzzle.puzzleNumber}
        date={today}
        attempts={attempts}
        maxAttempts={MAX_ATTEMPTS}
        streak={streak}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenStats={() => setIsShareModalOpen(true)}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 flex flex-col justify-between">
        {/* Instruction banner */}
        <div className="mb-4 text-center">
          <p className="text-xs sm:text-sm text-slate-400">
            {isGameOver ? (
              isWon ? (
                <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4" /> Perfect chronology! Timeline restored in {attempts} attempt(s).
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">
                  Max attempts reached. All years and context are now revealed below.
                </span>
              )
            ) : (
              'Arrange the 5 milestones from Earliest (Top) to Latest (Bottom).'
            )}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-2.5">
          {currentOrder.map((milestone, idx) => (
            <TimelineCard
              key={milestone.id}
              milestone={milestone}
              index={idx}
              total={currentOrder.length}
              status={statuses[idx]}
              isRevealed={isGameOver}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isGameOver={isGameOver}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col gap-3">
          {!isGameOver ? (
            <button
              type="button"
              onClick={handleVerify}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Lock In &amp; Verify Chronology</span>
              <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded font-mono">
                {attempts}/{MAX_ATTEMPTS}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Score to Reddit</span>
            </button>
          )}

          {/* Footer branding */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-2">
            <span>Reddit Devvit Web Edition</span>
            <span>Created by Siddharth Srivastava</span>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        puzzleNumber={puzzle.puzzleNumber}
        attempts={attempts}
        maxAttempts={MAX_ATTEMPTS}
        isWon={isWon}
        history={attemptHistory}
        streak={streak}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
    </div>
  );
};

export default App;
