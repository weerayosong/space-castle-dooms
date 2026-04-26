# https://space-castle-dooms.vercel.app/

# Mini #5: Space Castle Dooms | React Game Project

## JavaScript Browser-based Rogue-like game

**Practice myself by make game with React + Vite**

- Training with Hooks (I'll use useState, useEffect, useContext,useCallBack and useRef for this Project)
- Apply use of CSS with Tailwind CSS v4
- Apply use of JS in game logics, and play with data in Array and Object

### Reminders:

- อะไรก็ตามที่คำนวณพร้อมกันได้ใน Event Handler (เช่น ตอนคลิก) ให้ทำตรงนั้นเลย อย่าผลักภาระไปให้ useEffect ช่วยตามเช็กทีหลัง

## What's I had learened by made this project?

This project represents a massive leap from basic programming exercises to writing production-grade application architecture. You didn't just build a game; you solved real-world engineering pain points that React developers face daily.

### 1. React Architecture & State Management

- **Centralized State Management (Context API):** Instead of scattering state across multiple components (prop drilling), you engineered a centralized "Single Source of Truth" via `GameContext.jsx`. This allowed components like `Header`, `Stage`, and `DPad` to become clean, "Presentational" (Dumb) components that only handle UI and user inputs. This is the foundational architecture of large-scale applications.
- **Event-Driven Architecture:** By creating a Centralized Evaluator (`checkAchievements` using a `switch/case` statement) rather than scattering `useEffect` hooks everywhere, you built a highly scalable system. This architectural choice prevents infinite render loops and makes adding new game mechanics drastically easier.
- **Pure Functions & Side Effects:** You learned the strict rules of React's lifecycle (highlighted by Strict Mode's "double logging" behavior). You successfully refactored state updaters (like `setUnlockedAchv`) into Pure Functions and extracted Side Effects (like timeouts or UI alerts) into dedicated Observers using `useEffect` and `useRef`.

### 2. Advanced React Hooks Mastery

- **`useCallback` Optimization:** You grasped exactly when and why to memoize functions (`addLog`, `unlockAchv`, `movePlayer`). By doing so, you prevented React from constantly recreating functions on every render, ensuring the application remains highly performant and lag-free.
- **Advanced `useRef` Implementation:** You utilized `useRef` beyond its basic DOM manipulation purpose (like the auto-scroll feature). You leveraged it as a "mutable instance variable" (`prevUnlockedRef`) to store previous states and compare data across renders without triggering a re-render itself—a quintessential Senior React Developer technique.
- **Lazy Initialization:** When retrieving data from `localStorage`, you optimized performance by passing a callback function into `useState(() => localStorage.getItem(...))`. This ensures the application only performs the "expensive" disk-read operation exactly once upon initialization, rather than on every single state change.

### 3. Game Logic & Algorithms

- **Procedural Generation:** Writing the `generateMap` function demonstrated a strong grasp of mathematical operators (`Math.random`, `Math.min`, `Math.max`) to dynamically generate a 4x4 grid where hazard and loot probabilities scale intelligently based on the current `level`.
- **Optimal Data Structures (`Set`):** Choosing a `Set` to store discovered map coordinates (`discovered.has(...)`) instead of an Array was a highly optimized decision. It ensures that coordinate lookups operate at an O(1) constant time complexity, regardless of how large the map gets.
- **Data-Driven Design:** By isolating the game's data tables (`DB.loot`, `DB.hazard`) from the core logic and linking them to a single dice roll (`D6()`), you created a system where balancing the game (adjusting damage or text) requires zero changes to the underlying code.

### 4. Modern UI Engineering & Tailwind CSS v4

- **Zero-Config Tailwind v4:** You successfully adopted cutting-edge tooling by migrating to Tailwind CSS v4. By utilizing the `@theme` directive directly in `index.css`, you bypassed the need for a bulky `tailwind.config.js` file, resulting in a cleaner and more modern codebase.
- **Full-Screen Optimization (`100dvh`):** You tackled a notorious mobile web development issue by implementing Dynamic Viewport Height (`dvh`). This ensures the game interface fits perfectly on mobile screens without being pushed out of bounds by the browser's address bar.
- **CSS Keyframes & UI Layering:** You engineered a deep, immersive "Sci-Fi Horror" aesthetic using advanced CSS. By layering custom keyframes (CRT scanlines, flickering, glitch text, and radar sweeps) using `pointer-events-none`, you achieved a visually complex UI that doesn't interfere with user interactions.

### 5. Developer Mindset & CI/CD

- **Debugging & Linter Mastery:** You developed the ability to accurately interpret and resolve strict Linter warnings, such as fixing `unreachable code` and adhering to React Fast Refresh export rules.
- **Continuous Deployment (Vercel):** You gained practical experience with modern CI/CD pipelines. Understanding how Vercel generates snapshot previews, maintains deployment histories, and allows for instant rollbacks gives you a strong foundation in real-world deployment workflows.
