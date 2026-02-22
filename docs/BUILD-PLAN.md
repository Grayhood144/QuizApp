# Build Plan: Dark Mode Toggle

**Feature:** Dark mode toggle with theme persistence across app sessions.
**Project:** QuizAppClean (React Native / Expo)
**Note:** This is a React Native project. Web concepts (localStorage, data-theme, CSS variables) were adapted to their React Native equivalents (AsyncStorage, NavigationContainer theme prop, useTheme hook).

---

## Step 1 — Add theme state and toggle function
Add `theme` state (`'light'`/`'dark'`) to the top-level `App` component and expose a `toggleTheme` function. Add a temporary header button to test the toggle without touching any styling.

**How to test:** Tap the button in the header — confirm the label flips between "Dark" and "Light".

---

## Step 2 — Apply theme to the app root
Pass `DefaultTheme` or `DarkTheme` (from React Navigation) to `NavigationContainer` based on current theme state. This is the React Native equivalent of setting `data-theme` on the HTML root.

**How to test:** Toggle the button — the navigation header and background should visibly switch between light and dark.

---

## Step 3 — Replace temp button with a proper Switch toggle
Swap the debug `Button` in the header with a `Switch` component. `value` reflects current theme, `onValueChange` calls `toggleTheme`.

**How to test:** A Switch (toggle control) appears in the header on all screens. Flipping it changes the nav theme.

---

## Step 4 — Apply theme colors to screen content
Use `useTheme()` from React Navigation inside each screen component to read active theme colors. Apply `colors.background` and `colors.text` to containers and text. Remove hardcoded color values from `StyleSheet`.

**How to test:** Toggle the switch — screen backgrounds and text colors change on both QuestionScreen and SummaryScreen.

---

## Step 5 — Persist theme to storage
Install `@react-native-async-storage/async-storage`. On mount, read the stored theme value and apply it. On every theme change, write the new value to storage. Add an `isReady` flag to prevent a race condition where the write fires before the read completes. Return `null` until ready to eliminate the theme flash on launch.

**How to test:** Set dark mode, close and reopen the app — it should open directly in dark mode. Set light mode, reopen — same behavior.

---

## Step 6 — Verify initialization with safe defaults
Confirm the stored value is validated before applying it (`'light'` or `'dark'` only), so null, missing, or corrupt values fall back to the default. Add `.catch(() => {})` to both async calls.

**How to test:** Clear app storage, reopen — should default to light mode with no crash.

---

## Step 7 — End-to-end verification
No code changes. Verify the full flow: toggle works, theme applies to all screens, preference survives app restart.

**How to test:** Full walkthrough — question screen, summary screen, restart app, confirm theme persists.

---

## Step 8 (Optional) — Respect system color scheme as default
If no stored preference exists, read `Appearance.getColorScheme()` from React Native as the fallback default instead of hardcoding `'light'`.

**How to test:** Clear storage, change OS dark/light mode setting, reopen app — should match OS preference automatically.
