import React from 'react';
import { Calendar, Flame, HelpCircle, Trophy } from 'lucide-react';

interface HeaderProps {
  puzzleNumber: number;
  date: string;
  attempts: number;
  maxAttempts: number;
  streak: number;
  onOpenHowToPlay: () => void;
  onOpenStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  puzzleNumber,
  date,
  attempts,
  maxAttempts,
  streak,
  onOpenHowToPlay,
  onOpenStats,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-emerald-500/20">
            ⏳
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-100 text-lg leading-tight tracking-tight">
                ChronoDaily
              </h1>
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                #{puzzleNumber}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Attempt gauge */}
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Attempts
            </div>
            <div className="text-xs font-mono font-bold text-slate-200">
              {attempts} / {maxAttempts}
            </div>
          </div>

          {/* Streak indicator */}
          <div className="flex items-center gap-1 bg-amber-950/40 border border-amber-800/40 px-2 py-1 rounded-lg text-amber-300 text-xs font-bold font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{streak}</span>
          </div>

          <button
            type="button"
            onClick={onOpenStats}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Statistics"
          >
            <Trophy className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenHowToPlay}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="How to Play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
