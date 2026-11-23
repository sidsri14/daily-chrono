import React from 'react';
import type { Milestone, SlotStatus } from '../types/game';
import { ChevronUp, ChevronDown, Check, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';

interface TimelineCardProps {
  milestone: Milestone;
  index: number;
  total: number;
  status: SlotStatus;
  isRevealed: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isGameOver: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  science: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
  technology: 'bg-cyan-950/60 text-cyan-300 border-cyan-700/50',
  space: 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50',
  history: 'bg-amber-950/60 text-amber-300 border-amber-700/50',
  culture: 'bg-pink-950/60 text-pink-300 border-pink-700/50',
};

export const TimelineCard: React.FC<TimelineCardProps> = ({
  milestone,
  index,
  total,
  status,
  isRevealed,
  onMoveUp,
  onMoveDown,
  isGameOver,
}) => {
  const [showHint, setShowHint] = React.useState(false);

  let statusBorder = 'border-slate-800 hover:border-slate-700 bg-slate-900/90';
  let statusBadge = null;

  if (status === 'correct') {
    statusBorder = 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50';
    statusBadge = (
      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
        <Check className="w-3 h-3" /> Correct Order
      </span>
    );
  } else if (status === 'too-late') {
    statusBorder = 'border-violet-500/60 bg-violet-950/30';
    statusBadge = (
      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
        <ArrowUp className="w-3 h-3" /> Occurred Earlier
      </span>
    );
  } else if (status === 'too-early') {
    statusBorder = 'border-amber-500/60 bg-amber-950/30';
    statusBadge = (
      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
        <ArrowDown className="w-3 h-3" /> Occurred Later
      </span>
    );
  }

  return (
    <div
      className={`relative flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${statusBorder}`}
    >
      {/* Position slot indicator */}
      <div className="flex flex-col items-center justify-center w-8 text-slate-500 font-mono font-bold text-sm">
        <span>#{index + 1}</span>
      </div>

      {/* Main card content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border ${
              CATEGORY_COLORS[milestone.category] || 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {milestone.category}
          </span>
          {statusBadge}
          {isRevealed && (
            <span className="text-xs font-mono font-bold text-emerald-400 ml-auto bg-slate-950 px-2 py-0.5 rounded border border-emerald-900/60">
              {milestone.year > 0 ? `${milestone.year} CE` : `${Math.abs(milestone.year)} BCE`}
            </span>
          )}
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
          {milestone.title}
        </h3>

        {isRevealed ? (
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{milestone.description}</p>
        ) : (
          <div className="mt-1">
            {showHint ? (
              <p className="text-xs text-cyan-400/90 italic flex items-center gap-1">
                <span>💡 Hint:</span> {milestone.hint}
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-[11px] text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" /> Reveal context hint
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reorder control buttons */}
      {!isGameOver && (
        <div className="flex flex-col gap-1 pl-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 disabled:hover:bg-slate-800 text-slate-300 transition-colors"
            title="Move earlier in timeline"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMoveDown(index)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 disabled:hover:bg-slate-800 text-slate-300 transition-colors"
            title="Move later in timeline"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
