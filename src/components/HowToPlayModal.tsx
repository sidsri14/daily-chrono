import React from 'react';
import { X, Check, ArrowUp, ArrowDown } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>⏳</span> How to Play ChronoDaily
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Reconstruct historical chronology! Every day at midnight UTC, a new seed of 5 historical
            milestones is presented in shuffled order.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">Rules of Chronology:</h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>
                Arrange all 5 events from <strong className="text-slate-200">Earliest (Top)</strong>{' '}
                to <strong className="text-slate-200">Latest (Bottom)</strong>.
              </li>
              <li>Use the ⬆️ and ⬇️ arrows to reorder items in the timeline.</li>
              <li>You have up to <strong className="text-slate-200">5 verification attempts</strong>.</li>
            </ul>
          </div>

          <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <h3 className="font-bold text-slate-200 text-xs">Feedback Clues:</h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Check className="w-3 h-3" /> Correct Order
                </span>
                <span className="text-[11px] text-slate-400">Event is in the exact right chronological position.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  <ArrowUp className="w-3 h-3" /> Occurred Earlier
                </span>
                <span className="text-[11px] text-slate-400">Belongs higher up in the timeline.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <ArrowDown className="w-3 h-3" /> Occurred Later
                </span>
                <span className="text-[11px] text-slate-400">Belongs lower down in the timeline.</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic">
            A new ChronoDaily puzzle releases daily. Built for the Reddit Developer Platform and browser web.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors"
        >
          Got it, let’s play!
        </button>
      </div>
    </div>
  );
};
