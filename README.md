# ChronoDaily ⏳
> **The Daily Timeline Deduction Game — Built for Reddit Devvit Web & Browser Web**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React: 19](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev)
[![TypeScript: 5.7+](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![Tests: 8/8 Passing](https://img.shields.io/badge/tests-8%2F8%20passing-brightgreen.svg)](test/)
[![Live Game](https://img.shields.io/badge/Live%20Game-Play%20Now-emerald)](https://sidsri14.github.io/daily-chrono/)
[![Challenge: Reddit Game of the Day](https://img.shields.io/badge/Hackathon-Reddit's%20Game%20of%20the%20Day-orange.svg)](https://redditgameofday2026.devpost.com/)

**ChronoDaily** is a bite-sized, interactive daily deduction game where players restore historical chronology. Every calendar day at midnight UTC, a new seed of 5 historical, scientific, or cultural milestones is presented in shuffled order. Players rearrange the cards from earliest to latest in 5 or fewer attempts.

Designed specifically for **Reddit's Game of the Day Hackathon 2026** ($35,000 Cash Prize Pool) and engineered to run both natively embedded inside Reddit Interactive Posts (via Devvit Web) and as a standalone web application.

---

## 🎮 How to Play

1. **The Objective:** Arrange the 5 historical events in order from **Earliest (Top)** to **Latest (Bottom)**.
2. **Reordering:** Click the ⬆️ and ⬇️ chevron controls to swap any event's position in the timeline.
3. **Context Hints:** Tap *"Reveal context hint"* on any card for an era clue if you're stuck.
4. **Lock In & Verify:** Submit your guess. You have up to **5 attempts**.
5. **Clues & Feedback:**
   - 🟩 **Correct Order:** The event is in its exact chronological position.
   - ⬆️ **Occurred Earlier:** The event belongs higher up in the timeline.
   - ⬇️ **Occurred Later:** The event belongs lower down in the timeline.
6. **Victory & Share:** When solved, celebratory confetti triggers, all exact years and historical context snippets are revealed, and you can copy a 1-click spoiler-free Reddit markdown share card!

---

## 📋 Reddit Share Card Format

```markdown
ChronoDaily #23 2/5

🟩 ⬇️ ⬆️ 🟩 🟩
🟩 🟩 🟩 🟩 🟩

Play today's daily timeline: https://sidsri14.github.io/daily-chrono/
```

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** React 19 + TypeScript + Vite 8
* **Styling:** Tailwind CSS v4 with cyber-retro dark theme and accessible WCAG contrast
* **Physics / Celebration:** `canvas-confetti`
* **Testing:** Vitest with 8 automated unit tests verifying the sorting verification algorithm, deterministic daily seed generation, and Reddit share string formatting
* **Platform:** Compatible with Reddit Devvit Web iframe bridges and standard browser environments

---

## 🧪 Test Suite

```bash
bun vitest run
```

```text
 ✓ test/engine.test.ts (8 tests) 5ms

 Test Files  1 passed (1)
      Tests  8 passed (8)
   Duration  214ms
```

---

## 📄 License

MIT License. Created by Siddharth Srivastava ([@sidsri14](https://github.com/sidsri14)).
