# Process Documentation: Dark Mode Toggle

**Tier:** Complete
**Tool:** Claude Code (VS Code Extension)
**Feature:** Dark mode toggle with AsyncStorage persistence
**Steps completed:** 6 (Steps 7–8 were verification/optional)

---

## What I Built

<!-- Write 2-3 sentences in your own words describing the feature.
     What does it do? How does a user interact with it? -->

[YOUR ANSWER HERE]

---

## Micro-Iteration Experience

<!-- How did working one step at a time feel — natural or frustrating? Why?
     Give a specific example of a moment where the small-step approach helped or slowed you down. -->

[YOUR ANSWER HERE]

---

## Self-Review Findings

<!-- You used self-review twice during this exercise.
     Pick at least one specific example: what did Claude catch? What was the actual bug or issue?
     How did the fix change the code? -->

**Example 1 — Step 1 self-review:**
[YOUR ANSWER HERE — hint: isMultiArray typo, what would have happened at runtime?]

**Example 2 — Step 5 self-review:**
[YOUR ANSWER HERE — hint: race condition, theme flash, missing error handling — pick one and explain it in your own words]

---

## Self-Review Patterns (Complete Tier)

<!-- Did Claude tend to catch the same kinds of issues (edge cases, async bugs, dead code)?
     Did it ever miss something YOU caught yourself?
     Be specific — "it caught X but missed Y" is better than "it was pretty good." -->

[YOUR ANSWER HERE]

---

## Tool Impressions

<!-- What did you like or dislike about using Claude Code (VS Code Extension)?
     Mention at least one thing that worked well and one limitation you noticed. -->

[YOUR ANSWER HERE]

---

## Browser Tool vs. CLI Comparison (Complete Tier)

<!-- How did this browser/extension experience compare to using a CLI tool or doing it manually?
     What's better about each? What's worse? -->

[YOUR ANSWER HERE]

---

## When I'd Use This Workflow Again

<!-- For what kinds of tasks does micro-iteration + self-review make sense?
     When would you skip it and use a different approach? -->

[YOUR ANSWER HERE]

---

## Plan Changes

One thing worth noting: this project turned out to be **React Native / Expo**, not a standard web React app. The original plan used web concepts (localStorage, CSS variables, data-theme attribute). Each step had to be adapted:

| Original Plan | React Native Equivalent Used |
|---|---|
| CSS custom properties | React Navigation DefaultTheme / DarkTheme |
| `data-theme` on HTML root | `theme` prop on `NavigationContainer` |
| localStorage | AsyncStorage |
| CSS class toggle | `useTheme()` hook in each screen |

Step 6 (read saved theme on load) turned out to already be fully implemented as part of Step 5, so no separate code change was needed.
