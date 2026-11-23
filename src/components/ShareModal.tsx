import React, { useState } from 'react';
import { Share2, Check, ExternalLink } from 'lucide-react';
import { generateRedditShareString } from '../utils/engine';
import type { SlotStatus } from '../types/game';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleNumber: number;
  attempts: number;
  maxAttempts: number;
  isWon: boolean;
  history: SlotStatus[][];
  streak: number;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  puzzleNumber,
  attempts,
  maxAttempts,
  isWon,
  history,
  streak,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = generateRedditShareString(puzzleNumber, attempts, maxAttempts, isWon, history);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const shareToRedditUrl = `https://www.reddit.com/submit?title=${encodeURIComponent(
    `ChronoDaily #${puzzleNumber} Daily Solution`
  )}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl">
            {isWon ? '🏆' : '⏳'}
          </div>

          <h2 className="text-xl font-bold text-slate-100">
            {isWon ? 'Timeline Restored!' : 'Out of Attempts!'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isWon
              ? `You synchronized all 5 historical events in ${attempts} ${
                  attempts === 1 ? 'attempt' : 'attempts'
                }.`
              : 'The chronological continuum remains disrupted. Return tomorrow!'}
          </p>
        </div>

        {/* Stats Summary Card */}
        <div className="grid grid-cols-3 gap-2 my-5 text-center">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-lg font-bold font-mono text-emerald-400">
              {isWon ? `${attempts}/${maxAttempts}` : 'X'}
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Attempts</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-lg font-bold font-mono text-amber-400">{streak}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Day Streak</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-lg font-bold font-mono text-cyan-400">#{puzzleNumber}</div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Puzzle ID</div>
          </div>
        </div>

        {/* Share Preview Snippet */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4 whitespace-pre-wrap leading-relaxed select-all">
          {shareText}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied to Clipboard!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" /> Copy Shareable Reddit Card
              </>
            )}
          </button>

          <a
            href={shareToRedditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Post Score to Reddit
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Close Window & Review Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
