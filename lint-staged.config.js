export default {
  "*.{ts,tsx}": ["prettier --write", "tsc --noEmit", "vitest related --run"],
  "*.{js,jsx,json,md}": ["prettier --write"],
};
