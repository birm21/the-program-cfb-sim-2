# Claude Session Log - CFB Dynasty Simulator

This file tracks changes, decisions, bugs, and notes across development sessions.

---

## Project Overview

- **Stack:** React + Vite + Tailwind CSS
- **Main File:** `src/App.jsx` (~13,000+ lines, single-file architecture)
- **Documentation:** `INSIDE_THE_PROGRAM.md` contains game mechanics and odds

---

## Session: January 23, 2026

### Changes Made

#### 1. Instant Commit System - Rate Reduction (66% cut)
**Problem:** After Week 1, there were 1451 total commitments (USER had 8). This was catastrophic.

**Root Causes Identified:**
1. Base rates were too high (3-20%)
2. AI was checking ALL dream schools (3-4 per recruit) for instant commit, creating a "lottery effect"
   - 1800 recruits × 3.5 dream schools × ~10% = 630+ instant commits

**Fixes Applied:**
- Reduced `INSTANT_COMMIT_BASE_RATES` (line ~775):
  - 5-star: 3% → 1%
  - 4-star: 6% → 2%
  - 3-star: 12% → 4%
  - 2-star: 20% → 7%

- Changed AI instant commit logic (lines ~1820-1877):
  - Was: `for (const dreamSchool of (recruit.dreamSchools || []))`
  - Now: Only checks TOP dream school via `.find()`
  - Expected AI instant commits now: ~63 (down from 1400+)

#### 2. Prior Session Changes (from context)
- Added Instant Commit system with position-awareness
- Added position depth penalty (-25% per existing commit at position)
- Added "Playing Time Focused" trait blocking instant commits if position has a commit
- Added USER choice modal (Accept vs Ask to Wait) for instant commits
- Added collapsible OL sub-position containers (OT, OG, C)
- Fixed `nilOfferAccepted: true` bug causing immediate decommitments

---

## Known Issues / Watch Items

1. **File Size Warning:** Babel deoptimizes styling due to App.jsx exceeding 500KB. Not a functional issue but worth noting for future refactoring.

2. **Instant Commit Tuning:** New rates (1-7%) may need adjustment based on playtesting. Monitor for:
   - Are there enough instant commits to feel meaningful?
   - Is the USER getting a fair share of instant commits vs AI?

---

## Key Line References (App.jsx)

| Feature | Approximate Lines |
|---------|------------------|
| INSTANT_COMMIT_BASE_RATES | ~775 |
| INSTANT_COMMIT_MODIFIERS | ~783 |
| calculateInstantCommitChance() | ~1540-1660 |
| checkInstantCommit() | ~1720-1755 |
| simulateAIRecruiting() | ~1760-2115 |
| AI instant commit logic | ~1820-1877 |
| State declarations | ~2410-2545 |
| handleOfferScholarship() | ~7205-7260 |
| Instant commit choice modal | Search for "showInstantCommitChoice" |

---

## Design Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-23 | AI only checks top dream school for instant commit | Prevents lottery effect; more realistic (recruit commits to #1 choice) |
| 2026-01-23 | Cut instant commit rates by 66% | Original rates resulted in 80% of class committed by Week 1 |
| 2026-01-23 | Switch to MULTIPLICATIVE instant commit system | Previous 66% cut still resulted in 650+ Week 1 commits; additive bonuses stacked too aggressively |
| 2026-01-23 | Add School Tier Gate multiplier | G5 and low P4 getting instant commits was unrealistic |
| 2026-01-23 | Add Early Season Penalty (×0.5 Weeks 1-2) | Week 1 instant commits on first contact was unrealistic |
| 2026-01-23 | Invert star-rating base rates | Higher stars should be PICKIER, not easier to land instantly |
| 2026-01-23 | `signedCommit` is canonical roster trigger | `verbalCommit` = can flip/decommit; `signedCommit` = binding, triggers roster addition at year transition. UI must clearly show SIGNED vs COMMITTED. |

---

## Session: January 23, 2026 (Continued - Multiplicative Instant Commit Overhaul)

### Problem Statement
After the initial 66% rate cut, Week 1 STILL had 650+ instant commits. The additive system allowed modifiers to stack (e.g., +15% + +8% + +10% = 33% on top of base), making perfect-storm scenarios hit 40-50% chance.

### Solution: Complete System Overhaul

Changed from **ADDITIVE** to **MULTIPLICATIVE** modifiers with additional gates.

#### New Base Rates (Inverted - Higher Stars are Pickier)
```
5-star: 1.5%  (was 1%)  - They have options, take their time
4-star: 3%    (was 2%)  - Knows value but can be swayed
3-star: 5%    (was 4%)  - Excited by big offers
2-star: 8%    (was 7%)  - Jump at Blue Blood attention
```

#### New Multipliers (Replaced Additive Bonuses)
| Modifier | Old (Additive) | New (Multiplicative) |
|----------|----------------|---------------------|
| In-State | +15% | ×1.5 |
| Regional | +8% | ×1.25 |
| Blue Blood | +8% | ×1.4 |
| Tier Above | +10% | ×1.3 |
| Legacy | +15% | ×1.6 |
| Close to Home | +10% | ×1.3 |
| Championship/Dev | +8% | ×1.2 |
| Position U | +10% | ×1.25 |

#### NEW: School Tier Gate (Critical Change)
```
Blue Blood:       ×1.0   (full rate)
Top P4 (>$30M):   ×0.5   (half rate)
Regular P4:       ×0.25  (quarter rate)
Group of 5:       ×0.05  (nearly impossible)
```

#### NEW: Early Season Penalty
```
Week 1-2:  ×0.5   (50% reduction)
Week 3-4:  ×0.75  (25% reduction)
Week 5+:   ×1.0   (full rate)
```

#### NEW: Hard Cap
Changed from 60% to **20%** maximum.

### Example Calculation
**Blue Blood, 4-star, in-state, Championship trait, Week 1:**
```
3% × 1.5 × 1.4 × 1.3 × 1.2 × 0.5 × 1.0 = ~4.9%
```

**Same recruit for G5 school:**
```
3% × 1.5 × 1.3 × 1.2 × 0.5 × 0.05 = ~0.18%
```

### Files Modified
- `src/App.jsx`:
  - Lines ~775-815: New constants (INSTANT_COMMIT_BASE_RATES, INSTANT_COMMIT_MULTIPLIERS, SCHOOL_TIER_GATE, EARLY_SEASON_MULTIPLIER, INSTANT_COMMIT_CAP)
  - Lines ~1540-1700: Rewrote `calculateInstantCommitChance()` with multiplicative logic
  - Lines ~1770: Updated `checkInstantCommit()` to accept `offSeasonWeek`
  - Lines ~1803: Updated `simulateAIRecruiting()` to accept and pass `offSeasonWeek`
  - Lines ~6966, ~7059, ~8134: Updated call sites to pass `offSeasonWeek`
  - Line ~7281: Updated user's scholarship offer call

- `INSIDE_THE_PROGRAM.md`:
  - Complete rewrite of Instant Commits section with new formulas and examples

### Expected Impact
- Week 1 total commits should drop from ~650 to ~50-100
- Blue Bloods should still get meaningful instant commits
- G5 and low P4 will almost never get instant commits early
- Later in the season, more commits can happen naturally

---

## Session: January 23, 2026 (Continued - Visual Redesign)

### Visual Redesign Project

**IMPORTANT:** All redesign work is in a SEPARATE directory to protect production:
- Production: `/Users/birm/Documents/cfb-sim-production/` (UNCHANGED)
- Redesign: `/Users/birm/Documents/cfb-sim-redesign/` (ALL visual changes here)

**Goal:** Transform from retro 8-bit arcade aesthetic to premium sports broadcast look (ESPN/Fox Sports style)

### Changes Made in Redesign Directory

#### Design System Foundation (`src/index.css`)
- Added CSS custom properties:
  - Gold palette: `--gold-primary: #C9A227`, `--gold-light: #E8D48B`, `--gold-dark: #8B7320`
  - Dark backgrounds: `--bg-darkest: #0A0A0A`, `--bg-dark: #121212`, `--bg-medium: #1A1A1A`, `--bg-light: #242424`
  - Accent colors: success (green), danger (red), warning (amber), info (blue)
- Added Google Fonts: Oswald (display), Inter (body)
- Created component classes: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-success`, `.card`, `.card-elevated`, `.modal`, `.modal-overlay`, `.modal-header`, `.nav-tab`, `.heading-display`

#### Tailwind Config (`tailwind.config.js`)
- Extended colors with gold and surface palettes
- Added font families (display, body)
- Added custom shadows (gold-glow, card, elevated, modal)
- Added animations (fade-in, slide-up, scale-in, gold-pulse, shimmer, confettiFall, confettiSway)

#### Component Updates (`src/App.jsx`)
- **Splash Screen:** Completely redesigned with premium sports broadcast aesthetic:
  - "THE PROGRAM" title: 2x larger (10rem/14rem), 3D text-shadow depth effect
  - Skewed and rotated (-10deg skewY, -3deg rotate) for dynamic angle
  - Tighter kerning on "PROGRAM" (-0.02em)
  - Textured gradient background with radial gold accents
  - Noise texture overlay for gritty premium feel
  - Dark vignette effect around edges
  - **Falling confetti system:** 70 gold/silver pieces with depth-of-field:
    - Close pieces: Large (12-20px), sharp, fast fall, bright glow
    - Far pieces: Small (3-6px), blurry (2-4px blur), slow fall, transparent
    - CSS animations: confettiFall + confettiSway
- **Main Game Container:** Removed Press Start 2P font, using font-body class
- **Navigation:** Updated with nav-tab classes, gold accents
- **Modals Updated:**
  - Options Modal
  - Coach Name Input Modal
  - Event Decision Modal
  - Transfer Decisions Modal
  - Decommitment Alert Modal
  - Instant Commit Choice/Success Modals
  - Flip Offer Modal
  - Weekly Recruiting Report Modal
- **Dashboard Panels:** Updated card styling, removed pixel shadows
- **Buttons:** Replaced retro border-4 buttons with .btn classes

#### Retro Elements Removed
- Removed all 8px, 6px, 4px, 3px pixel shadows (boxShadow patterns)
- Removed Press Start 2P font references from main container
- Updated border-4 patterns to use new card classes

### Remaining Work (Redesign)
- ~38 border-4 patterns still need updating
- Some smaller boxShadow patterns remain
- UI sound effects not yet added
- Polish pass on remaining modals

### Dev Server Status
- Redesign running on: http://localhost:3001/
- Production unchanged (port 3000 if running)

---

## CRITICAL BUG FIX: "Advance to Next Season" Appearing Too Early

**Problem:** On the user's FIRST season, after completing off-season recruiting (June 30, 2026), the button showed "ADVANCE TO NEXT SEASON" instead of "SIM TO NEXT EVENT". Pressing it would reset the entire roster/recruiting prematurely.

**Root Cause:** The `isEndOfSeason()` function (line ~7704) only checked:
- Current event is "The Off-Season"
- 16 off-season weeks completed
- Next event is "Training Camp"

But it didn't check if any games had actually been played! So the FIRST off-season (before any games) was treated as "end of season."

**Fix Applied:** Added check at the start of `isEndOfSeason()`:
```javascript
const hasPlayedAnyGames = (coachRecord.wins + coachRecord.losses) > 0;
if (!hasPlayedAnyGames) {
  return false;
}
```

Now the function returns `false` (normal "SIM TO NEXT EVENT") until at least one game has been played.

**Location:** `/Users/birm/Documents/cfb-sim-production/src/App.jsx` line ~7704-7720

---

## Session: January 23, 2026 (Skill Audit - Accessibility, Motion, Baseline UI)

### Skill Audit Applied

Ran three refinement skills against the redesign codebase:
- `/baseline-ui` - UI baseline constraints
- `/fixing-motion-performance` - Animation performance guidelines
- `/fixing-accessibility` - Accessibility guidelines

### Fixes Applied

#### Accessibility Fixes (`src/App.jsx`, `src/index.css`)
1. Added `aria-label` to icon-only remove button (`Remove ${recruit.name} from My Recruits`)
2. Added `aria-hidden="true"` to decorative ChevronUp/ChevronDown icons
3. Added `sr-only` class with screen reader text for expand/collapse buttons
4. Added `aria-expanded` attribute to all expandable sections:
   - PositionGroup component
   - School tier toggles (Blue Bloods, Power 4, Group of 5)
5. Added `aria-hidden="true"` to decorative expand/collapse arrows (▼/▶)
6. Added visible focus styles for keyboard users (`:focus-visible` with gold outline)

#### Motion Performance Fixes (`src/index.css`, `src/App.jsx`)
1. Replaced 60px blur on lens flare with opacity gradient (no blur, better perf)
2. Added `prefers-reduced-motion: reduce` media query to disable animations
3. Kept 4px backdrop-filter blur on modals (acceptable - small, temporary)

#### Baseline UI Fixes (`src/App.jsx`, `src/index.css`)
1. Replaced all `min-h-screen` with `min-h-dvh` (mobile-friendly viewport)
2. Replaced all `max-h-screen` with `max-h-dvh`
3. Added `text-wrap: balance` to `.heading-display` and `.heading-display-italic`
4. Added `.text-pretty` utility class for body text
5. Added `.tabular-nums` utility class for numeric data alignment

### New CSS Utilities Added (`src/index.css`)
- `.sr-only` - Screen reader only content
- `.tabular-nums` - Tabular number alignment
- `.text-pretty` - Text wrap pretty for paragraphs
- `:focus-visible` styles - Gold outline for keyboard focus
- `@media (prefers-reduced-motion: reduce)` - Disables animations

---

## Session: January 23, 2026 (Continued - Commit Parity System)

### Problem Statement
USER could "luck into" commits at 70%+ interest even when AI schools had 100% interest. AI only committed at 85% threshold. This was asymmetric and allowed USER to steal recruits unfairly.

### Solution: Full Commit Parity Between USER and AI

Changed both USER and AI to use **identical commit mechanics**:

#### Commit Paths (Both USER and AI)
1. **Auto-Commit**: 90%+ interest AND 25%+ lead over next closest → guaranteed commit
2. **Random Commit**: 80%+ interest (was 70% for USER, 85% for AI)
   - 5-star: 15% chance
   - 4-star: 30% chance
   - 3-star/2-star: 75% chance
   - Trailing penalty applies if opponent leads

#### Trailing Penalty
| Opponent Lead | Modifier |
|---------------|----------|
| 1-9% | ×0.75 |
| 10-19% | ×0.50 |
| 20%+ | ×0.25 |

#### NIL Skip Rates Updated (User Feedback)
Per user feedback: "There are few, very few, five-star or even four-star prospects who are going to make a college decision without an NIL agreement."

Changed NIL skip rates for dream school + in-state recruits:
| Stars | Old Skip Rate | New Skip Rate |
|-------|--------------|---------------|
| 5-star | 20% | 0% (ALWAYS negotiate) |
| 4-star | 40% | 5% (very rare) |
| 3-star | 60% | 30% |
| 2-star | 60% | 50% |

### Files Modified
- `src/App.jsx`:
  - Lines ~7566-7685: USER commit logic rewritten with parity system
  - Lines ~2041-2150: AI commit logic updated (previous session)
  - Lines ~7637-7644: NIL skip rates reduced for 4-5 stars
- `INSIDE_THE_PROGRAM.md`: Updated commit system documentation
- `Notes for Claude/SESSION_LOG.md`: This entry

### Key Line References (Updated)
| Feature | Approximate Lines |
|---------|------------------|
| USER commit logic | ~7566-7685 |
| AI commit logic | ~2041-2150 |
| NIL skip rates | ~7637-7644 |

---

## Session: January 23, 2026 (Continued - AI Commit Maintenance Bug)

### Problem Statement
User reported: Recruit has 92% interest in USER but is committed to Peach State University with only 14% interest. AI instant committed in Week 1 but never recruited the player afterward.

### Root Cause Analysis
Two bugs found:

1. **Line 1809**: `if (recruit.verbalCommit) return recruit;` - AI skipped ALL verbally committed recruits, including their own commits. This meant AI never built interest with commits after landing them.

2. **Instant commit interest**: When AI got an instant commit, the school's interest in `recruitingSchools` array stayed at initial contact level (10-25%) instead of being set to 100%.

### Fixes Applied

1. **AI Commit Maintenance** (lines ~1808-1860):
   - AI schools now CONTINUE recruiting their own commits each week
   - Dream schools take 3 actions/week, others take 2 actions/week
   - Standard diminishing returns apply
   - This prevents stagnant interest after early commits

2. **Instant Commit Interest Fix** (lines ~1959-1982):
   - When AI instant commits, school's interest in `recruitingSchools` is now set to 100%
   - Previously only `commitmentInterest` was set to 100, but display showed recruitingSchools interest

### Files Modified
- `src/App.jsx`:
  - Lines ~1808-1860: New AI commit maintenance logic
  - Lines ~1959-1982: Fixed instant commit to set interest to 100% in recruitingSchools
- `INSIDE_THE_PROGRAM.md`: Added "AI Commit Maintenance" section
- `Notes for Claude/SESSION_LOG.md`: This entry

### Key Line References (Updated)
| Feature | Approximate Lines |
|---------|------------------|
| AI commit maintenance | ~1808-1860 |
| AI instant commit fix | ~1959-1982 |

---

## Session: January 23, 2026 (Continued - NIL Finalization & Off-Season Blocking)

### Bug 1: Instant Commits Decommitting for "NIL deal not finalized"

**Problem:** Three instant commit players decommitted with reason "NIL deal not finalized" even though they were instant commits. User had no way to finalize these deals.

**Root Cause:** The hometown auto-commit path (line ~7621) was missing `nilOfferAccepted: true`. The decommitment check (line ~3745) requires this flag.

**Fix:** Added `nilOfferAccepted: true` and `acceptedNILAmount` to hometown auto-commit (line ~7621-7628).

### Bug 2: Recruiting Available After "COMPLETE OFF-SEASON"

**Problem:** After clicking "COMPLETE OFF-SEASON", user could navigate back to recruiting tab and continue using recruiting points. This is an exploit.

**Root Cause:** `isRecruitingOpen()` checked the calendar event "The Off-Season" which has `recruitingOpen: true`. But June 30 (after completion) is still within that date range.

**Fix:** Added check in `isRecruitingOpen()` (line ~4969-4984):
```javascript
if (currentEvent === 'The Off-Season' && offSeasonWeeksCompleted >= 16 && offSeasonWeek === null) {
  return false;
}
```

### Files Modified
- `src/App.jsx`:
  - Lines ~7621-7628: Added `nilOfferAccepted: true` to hometown auto-commit
  - Lines ~4969-4984: Block recruiting after off-season completion
- `Notes for Claude/SESSION_LOG.md`: This entry

---

## Session: January 23, 2026 (Continued - AI Recruiting Parity Overhaul)

### Problem Statement
AI recruiting was NOT following the same rules as USER. Example: AI school at 97% interest for out-of-state 4-star in just 4 weeks - impossible for USER.

### Root Causes Identified
1. **No budget constraints**: AI had unlimited actions (3-4/week for dream schools)
2. **Wrong actions**: AI used "Coach Visit" (12-27 gain) and "Home Visit" - USER doesn't have these
3. **No action limits**: AI could use Official Visit every week (USER: once per recruit EVER)
4. **No monthly limits**: AI could use any action every week
5. **Easier diminishing returns**: AI had 0.85/0.70/0.50/0.35 vs USER's 0.80/0.60/0.40/0.20

### Solution: Complete AI Recruiting Rewrite

AI now uses **EXACT SAME** rules as USER:

**Same Actions:**
| Action | Cost | Gain | Limit |
|--------|------|------|-------|
| Social Media | 5 | 5 | Weekly |
| Call | 10 | 10 | Weekly |
| School Visit | 15 | 12 | Monthly |
| Campus Visit | 25 | 20 | Monthly |
| Official Visit | 50 | 30 | Once ever, 75%+ req |

**Same Budget by Tier:**
- Blue Blood: 600/week
- Power 4: 400/week
- Group of 5: 200/week

**Same Cost Multipliers:**
- 5-star: 3.0x, 4-star: 2.0x, 3-star: 1.0x, 2-star: 0.5x

**Same Diminishing Returns:**
- 0-29%: 1.0x, 30-49%: 0.8x, 50-69%: 0.6x, 70-84%: 0.4x, 85%+: 0.2x

**Budget Allocation per Recruit:**
- Dream schools: 40-60% of weekly budget on priority recruits
- Other schools: 20-40% (spreading across multiple recruits)

### Expected Impact
- AI progression should now match USER pace
- 4-star out-of-state in 4 weeks: ~40-50% interest (not 97%)
- Makes recruiting battles feel fair and competitive

### Files Modified
- `src/App.jsx`:
  - Lines ~2000-2140: Complete rewrite of AI weekly recruiting logic
  - Lines ~1808-1890: Updated AI commit maintenance to use same rules
- `Notes for Claude/SESSION_LOG.md`: This entry

### Key Line References (Updated)
| Feature | Approximate Lines |
|---------|------------------|
| AI recruiting actions | ~2000-2140 |
| AI commit maintenance | ~1808-1890 |

---

## Session: January 23, 2026 (Continued - Flip Attempt Restrictions)

### Problem Statement
USER could repeatedly attempt to flip an AI commit in the same week with no cost or consequences. This created an exploit where players could spam flip attempts until successful.

### Solution: Flip Attempt Cost & Restrictions

**Flip Attempt Point Costs (Recruiting Points):**
| Star Rating | Point Cost |
|-------------|------------|
| 5-Star | 200 pts |
| 4-Star | 150 pts |
| 3-Star | 100 pts |
| 2-Star | 75 pts |

**New Restrictions:**
- **Once per week per recruit** - Cannot retry flip on same recruit in same week
- **Blocks all other actions** on that recruit for the rest of the week
- Points deducted regardless of flip success or failure
- Visual indicator shows "Already attempted this week" when blocked
- All action buttons show "🔄 FLIP USED" when flip was attempted

### Files Modified
- `src/App.jsx`:
  - Line ~4458: Added `FLIP_ATTEMPT_COSTS` constant
  - Lines ~4755-4800: Updated "MAKE OFFER" button with cost display and disable logic
  - Lines ~12912-12975: Added point deduction and `flipAttemptThisWeek: true` tracking in modal
  - Lines ~4839-4842: Added `flipAttemptedThisWeek` to disabled conditions for recruiting actions
  - Lines ~4890-4910: Added styling for flip-blocked buttons
  - Lines ~7150-7170: Added weekly reset for `flipAttemptThisWeek`
  - Multiple locations: Added `flipAttemptThisWeek: false` to all weekly action resets

- `INSIDE_THE_PROGRAM.md`:
  - Updated "Flip Offers" section with new costs and restrictions table

### Expected Behavior
- Player sees flip cost on MAKE OFFER button (e.g., "MAKE OFFER (150 pts)")
- After flip attempt (success or fail), button becomes disabled
- All recruiting action buttons for that recruit show "🔄 FLIP USED"
- Next week, the recruit can be targeted again with fresh actions

---

## Session: January 23, 2026 (Continued - Transfer Portal Crash Fix)

### Problem Statement
When transitioning from Playoffs to Transfer Portal Open (transfer decisions, NFL decisions), the game crashed with:
```
Uncaught ReferenceError: totalBudget is not defined
    at App (App.jsx:11633:40)
```

The console showed departures being processed (NFL departures, retirements, portal entries), but the game froze before the user could interact with any transfer decisions.

### Root Cause
The Transfer Decisions Modal (lines ~11980-11995) used a non-existent variable `totalBudget` instead of the actual state variable `budget`.

Three occurrences:
- Line 11982: `{formatCurrency(totalBudget)}` - display text
- Line 11991: `budgetRemaining / totalBudget` - bar width calculation
- Line 11992: `budgetRemaining / totalBudget` - bar color calculation

### Fix Applied
Replaced all `totalBudget` references with `budget` (the correct state variable).

### Files Modified
- `src/App.jsx`:
  - Lines ~11980-11995: Changed `totalBudget` → `budget` (3 occurrences)

---

## Session: January 23, 2026 (Playtest Bug Summary)

### All Bugs Found & Fixed This Session

| Bug | Root Cause | Fix Applied |
|-----|------------|-------------|
| **Flip attempt exploit** | No cost, could spam indefinitely | Added point costs (200/150/100/75 by star), weekly limit per recruit, blocks other actions |
| **100% interest, no NIL button** | Button hidden when `interest < 100` | Added NIL offer button inside the "locked at 100%" message |
| **Regular Season actions not resetting** | Race condition - `setRecruits()` reset overwritten by AI simulation | Build `recruitsWithResetActions` first, pass to AI simulation |
| **"COMMITTED" showing instead of "SIGNED"** | Badge only checked `verbalCommit` | Added `signedCommit` check, shows "✅ SIGNED" when true |
| **SIGNING DAY tag persisting after signing** | `signingDayDecision` not cleared on sign | Added `signingDayDecision: false` to all signing paths |
| **Game simulation missing** | Schedule could be empty when entering Regular Season | Added safety check + regeneration, visible error banner with REGENERATE button |
| **Transfer Portal crash** | `totalBudget` undefined in Transfer Decisions modal | Changed to `budget` (3 occurrences) |

### Key Design Decision
**`signedCommit` is the canonical roster trigger:**
- `verbalCommit: true` = committed but can flip/decommit
- `signedCommit: true` = binding, triggers roster addition at year transition
- UI clearly distinguishes "✓ COMMITTED" vs "✅ SIGNED"
- "SIGNING DAY" tag only shows on verbal commits (not signed)

### Documentation Updated
- `INSIDE_THE_PROGRAM.md`: Added "Commitment Status" section explaining verbal vs signed states
- `SESSION_LOG.md`: This comprehensive summary

---

## Required Features (Blocking)

- [x] **NIL Management Tab** - COMPLETE (see Session: NIL Management Tab Expansion)
  - Three sub-tabs: RECRUITS, ROSTER, DONORS
  - Full donor courting and retention system
  - Budget overview, alerts for pending NIL, roster NIL management
  - Regional donor types based on school state

---

## Future Considerations

- [ ] **Cap interest at 99% until NIL finalized** - 100% should only be reachable after NIL deal is accepted. This prevents confusing states where multiple schools show 100% interest but recruit hasn't committed.
- [ ] Consider adding instant commit tracking stats (how many per week, by star rating)
- [x] Balance USER vs AI instant commit opportunities (commit parity implemented)
- [ ] Game simulation system is planned (see plan file at `~/.claude/plans/compressed-rolling-crane.md`)
- [x] Complete visual redesign polish pass
- [ ] Add UI sound effects to redesign

---

## Session: January 23, 2026 (Continued - NIL Management Tab Expansion)

### Overview
Expanded the NIL Management tab from recruit-only to a full three-column NIL ecosystem:
1. **RECRUITS** - Incoming class NIL management (already built)
2. **ROSTER** - Current player NIL with alerts + browse
3. **DONORS** - Court donors to increase NIL budget

### Features Implemented

#### Sub-Tab Navigation
- Added `nilSubTab` state ('recruits', 'roster', 'donors')
- Three clickable sub-tabs with alert badges for pending items
- Each column displays its own content when selected

#### ROSTER Column (lines ~12870-13150)
- **Critical Alerts Section**: Shows players with Low satisfaction (NIL < 70% market value)
- **Full Roster Browser**: Collapsible section to view all players
- **Sort Options**: Position, Satisfaction, NIL Amount, Market Value, Gap %
- **Filter Options**: All, Low satisfaction, Medium, High
- **NIL Actions**: Raise +10%, Raise +20%, Raise to Market, Custom Amount

#### DONORS Column (lines ~13150-13500)
- **Secured Donors List**: Shows active donors with annual contributions
- **Available Donors List**: Regional + universal donors to court
- **Courting Actions**:
  | Action | Cost | Relationship Gain |
  |--------|------|-------------------|
  | Initial Outreach | 25 pts | +5-10 |
  | Phone Call | 50 pts | +8-15 |
  | Lunch Meeting | 100 pts | +15-25 |
  | Campus Tour | 150 pts | +20-30 |
  | Game Day Invite | 200 pts | +25-40 |
  | Gala Event | 300 pts | +30-50 |
- Donors commit at 80+ relationship

#### Donor Types (lines ~308-360)
**Regional Donors** (based on school state):
| Type | States | Contribution Range |
|------|--------|-------------------|
| Tech Mogul | CA, WA, TX, MA, CO, OR | $2-10M |
| Oil Baron | TX, OK, LA, ND, WY, NM | $2-8M |
| Finance Titan | NY, CT, NJ, IL, PA, MA | $3-10M |
| Real Estate Developer | FL, AZ, NV, CA, GA, NC | $1-5M |
| Agribusiness Magnate | NE, IA, KS, AR, MO, IN | $1-4M |
| Auto/Manufacturing Exec | MI, OH, IN, TN, KY | $1-5M |
| Entertainment Mogul | CA, TN, GA, NY, FL | $2-6M |
| Healthcare CEO | NJ, NC, MA, PA, MD | $2-6M |

**Universal Donors** (all schools):
- Local Car Dealer ($50-200K)
- Restaurant Chain Owner ($100-300K)
- Successful Attorney ($50-150K)
- Former NFL Player ($100-500K)
- Wealthy Alumni ($200-500K)

#### Donor Point System
- **Base weekly points by tier**:
  - Blue Blood: 500/week
  - Power 4: 300/week
  - Group of 5: 150/week

- **Weekly Win Bonuses** (line ~15679):
  - +25 points per win
  - +50 points for rivalry wins

- **Season Bonuses** (line ~8371):
  - +100 points for 10+ win season
  - +250 total for 12+ win season

#### Donor Retention Logic (lines ~8315-8378)
End-of-season checks in `advanceToNewSeason`:
- Compare season wins vs donor's `minWins` expectation
- -20 relationship if below expectations
- +10 relationship if exceeded by 3+ wins
- Donor leaves if relationship drops below 40
- New season alert shows retained/departed donors

### State Variables Added (lines ~3488-3495)
```javascript
const [nilSubTab, setNilSubTab] = useState('recruits');
const [rosterNilSort, setRosterNilSort] = useState('satisfaction');
const [rosterNilFilter, setRosterNilFilter] = useState('all');
const [showFullRoster, setShowFullRoster] = useState(false);
const [donors, setDonors] = useState([]);
const [donorPoints, setDonorPoints] = useState(0);
const [donorPointsPerWeek, setDonorPointsPerWeek] = useState(300);
```

### Save/Load Integration
- Donors, donorPoints, donorPointsPerWeek added to save object
- Old saves get donors generated on load (fallback logic)

### Key Line References
| Feature | Approximate Lines |
|---------|------------------|
| DONOR_TYPES constant | ~308-330 |
| UNIVERSAL_DONOR_TYPES | ~332-345 |
| Donor name arrays | ~347-360 |
| NIL sub-tab state | ~3488-3495 |
| Donor generation (school select) | ~4260-4330 |
| Donor retention logic | ~8315-8378 |
| Weekly win donor bonus | ~15679-15686 |
| NIL tab sub-navigation | ~12750-12820 |
| ROSTER column UI | ~12870-13150 |
| DONORS column UI | ~13150-13500 |

### Donor Courting Season (Off-Season Weeks 1-4)
- Auto-switches to NIL > DONORS tab when entering off-season
- **Full donor points** during weeks 1-4 (courting season)
- **Half donor points** during weeks 5-16
- Visual banner shows current courting status:
  - Yellow banner: "DONOR COURTING SEASON - Week X of 4"
  - Gray banner: "OFF-SEASON - Week X of 16" (after week 4)
  - Gray banner: "IN-SEASON" (during regular season)
- Lines modified: ~4184-4195 (off-season init), ~7435-7445 (week advance)

### Donor Personality Traits System (lines ~330-380)
Added realistic donor psychology with trait-based behavior:

**Positive Traits (Old Money):**
| Trait | Effect |
|-------|--------|
| `loyalAlum` | Leave threshold 25, half decay penalty |
| `patient` | Leave threshold 30, expects 2 fewer wins |

**Demanding Traits (New Money):**
| Trait | Effect |
|-------|--------|
| `rivalryObsessed` | +20 for rivalry win, -30 for rivalry loss |
| `impatient` | Leave threshold 50, expects 2 more wins |
| `recruitingFocused` | Expects top 25 class, -15 if missed |
| `spotlightSeeker` | Expects team ranked, -20 if unranked |
| `handson` | Future: triggers demand events |

**Donor Generation Updates:**
- Regional donors: 25% chance of being "new money"
- Universal donors: 15% chance of being "new money"
- New money donors have stricter expectations (+1-2 wins)
- Lower loyalty (25-40 vs 50-80 for old money)
- Trait-based `leaveThreshold` (40-50 depending on traits)

**Retention Logic Updates:**
- Checks rivalry results from `gameResults`
- Applies trait-specific bonuses/penalties
- Uses per-donor `leaveThreshold` instead of hardcoded 40
- Tracks reasons for departures

### New Money Emergence Events (lines ~4260-4310)
Random chance each off-season for wealthy new donor to appear:
- Base 15% chance + winning bonus + tier bonus (max 40%)
- New money types: Crypto Investor, Tech Founder, Plaintiff's Attorney, Private Equity, Trust Fund Heir
- Contributions: $2-20M/year range
- Always have demanding traits (rivalryObsessed, impatient, etc.)
- Alert popup notifies user of new donor

### Donor UI Updates
- Shows "NEW MONEY" badge for new money donors
- Displays trait badges (blue = positive, red = demanding)
- Shows expectations summary ("Expects: 8+ wins | Beat rival")
- Secured donors show relationship % and years retained

### Blocking Feature Status
- [x] **NIL Management Tab** - NOW COMPLETE
  - Sub-tabs for Recruits, Roster, Donors
  - Budget overview with total allocation
  - Alerts for pending NIL finalization
  - Full donor courting and retention system
  - Donor courting season (off-season weeks 1-4)
  - Donor personality traits (old money vs new money)
  - New money emergence events

---

## Session: January 24, 2026 (Critical Bug Fixes from Audit)

### Overview
Implemented the first batch of critical fixes from the comprehensive game audit conducted in the previous session.

### Bugs Fixed

#### 1. Duplicate `calculateTeamRating()` Function (CRITICAL)
**Problem:** Two functions with the same name existed:
- Line ~3540: Star-based calculation, returned 0 for empty roster
- Line ~6632: Position-weighted calculation, returned 70 for empty roster

The second function shadowed the first, causing inconsistent behavior.

**Fix:** Removed the first (star-based) function entirely. The position-weighted version at line ~6620 is now the only `calculateTeamRating()` function.

#### 2. Array Index Out of Bounds - Injury Event (CRITICAL)
**Problem:** Line ~1370 accessed `roster.filter(p => p.isStarter)[randomIndex]` without checking if starters existed.

**Fix:** Added guard clause at start of `INJURY_REPORT` case:
```javascript
if (!roster || roster.length === 0) {
  return { title: 'No Injury Report', message: 'No players available...', type: 'info', ... };
}
const starters = roster.filter(p => p.isStarter);
const player = starters.length > 0 ? starters[randomIndex] : roster[randomIndex];
```

#### 3. Recruit Decommit Logic Too Aggressive (HIGH)
**Problem:** Recruits decommitted if interest dropped below 70%, even temporarily. This was frustrating for players who had legitimately secured commits.

**Fix:** Lowered threshold from 70% to 50% (lines ~3958, ~3972, ~3994). Recruits now only decommit if interest drops below 50%.

#### 4. No Save File Version Control (HIGH)
**Problem:** No version number in saves. Schema changes could break old saves silently.

**Fix:**
- Added `SAVE_VERSION = 1` constant at top of file (line ~3539)
- Save now includes `saveVersion: SAVE_VERSION` field
- Load function checks version and logs migration needed:
```javascript
const savedVersion = gameData.saveVersion || 0;
if (savedVersion < SAVE_VERSION) {
  console.log(`Migrating save from v${savedVersion} to v${SAVE_VERSION}`);
  // Future migration logic goes here
}
```

### Updated Line References

| Feature | Approximate Lines |
|---------|------------------|
| SAVE_VERSION constant | ~3539 |
| calculateTeamRating() (position-weighted) | ~6620-6670 |
| Injury event guard | ~1369-1380 |
| Recruit decommit threshold (50%) | ~3958, ~3972, ~3994 |
| Save version in gameData | ~4720 |
| Load version migration | ~3760-3770 |

### Remaining Audit Items (Future Sessions)

**Short-Term:**
- Implement rankings system (Top 25 poll)
- Add conference standings
- Fix useEffect dependency bloat
- Add individual player stats

**Medium-Term:**
- Bowl games & playoff bracket
- Player development system
- Coaching staff system
- Improved game simulation

---

## Session: January 24, 2026 (Continued - UX Improvements)

### Issues Found During Pre-Test

#### 1. New Money Donor Appearing on Title Screen (BUG)
**Problem:** New money donor emergence event was triggering on game load even when on title screen.

**Root Cause:** The off-season useEffect ran whenever `currentDate` matched the off-season period, regardless of whether user was actually playing.

**Fix:**
- Added `gameState !== 'playing'` guard at start of off-season useEffect
- Added `gameState` to dependency array
- Lines modified: ~4248-4252

#### 2. Browser `alert()` Replaced with In-Game Modal
**Problem:** New money donor notification used browser's native `alert()`, which looks like an OS dialog.

**Fix:**
- Created new state: `showNewMoneyDonorModal`, `newMoneyDonorData`
- Created styled in-game modal with green color scheme
- Shows donor name, type, icon, contribution, and personality traits
- Includes "New Money Warning" tip box
- Lines added: ~3650-3653 (state), ~13835-13905 (modal UI)

### UX Improvement: ADVANCE WEEK Button Centralization

**Problem:** "ADVANCE WEEK" button was on Recruiting tab, making it easy to skip NIL management.

**Solution:** Moved all time advancement to Dashboard for consistency.

**Changes:**
1. **Dashboard Calendar Section** (lines ~10001-10070):
   - Now shows ADVANCE WEEK button with progress bar during off-season
   - Shows pending task reminders (NIL deals, donors to court)
   - SIM TO NEXT EVENT button appears when not in off-season

2. **Recruiting Tab** (lines ~12480-12495):
   - Removed ADVANCE WEEK button
   - Now shows info-only banner: "Use DASHBOARD to advance week →"
   - Still shows progress bar for awareness

3. **Tab Indicators** (lines ~9718-9765):
   - Added yellow notification badges to tabs with pending tasks
   - RECRUITING tab: Shows indicator if unspent recruiting points (>50)
   - NIL tab: Shows count of pending NIL deals + uncourted donors
   - Indicator hidden when tab is active

### Updated Line References

| Feature | Approximate Lines |
|---------|------------------|
| newMoneyDonorModal state | ~3650-3653 |
| Off-season gameState guard | ~4248-4252 |
| Dashboard ADVANCE WEEK | ~10001-10070 |
| Tab indicators logic | ~9718-9765 |
| Recruiting tab info banner | ~12480-12495 |
| New Money Donor Modal UI | ~13835-13905 |

### Donor System Fixes

#### 1. Per-Week Action Limits on Donor Courting
**Problem:** Users could spam the same action (Call, Meeting, Game Invite) on a donor multiple times in a single week, making it too easy to secure donors.

**Fix:**
- Added `weeklyActionsUsed` array to each donor object
- Each action (call, meeting, gameInvite) can only be used once per donor per week
- Buttons show "✓ Called", "✓ Met", "✓ Invited" when used
- Actions reset when week advances via `advanceRecruitingWeek`
- Lines modified: ~11915-12000 (action buttons), ~7635-7637 (reset on week advance)

#### 2. Donor Money Applies to Next Season Budget
**Problem:** Unclear when secured donor contributions actually apply to budget.

**Design Decision:** Donor contributions apply to NEXT season's budget (more realistic - pledges take time to materialize).

**Implementation:**
- In `advanceToNewSeason()`:
  - Calculate base budget from school budget + win bonus
  - Add all secured donor `annualContribution` amounts
  - Show breakdown in new season summary
- Lines modified: ~8521-8528 (budget calculation), ~8686-8705 (summary message)

**Budget Formula:**
```
newBudget = baseBudget + donorContributions
baseBudget = schoolBudget * (1 + winBonus)
donorContributions = sum of all secured donor annualContribution
```

### Updated Line References

| Feature | Approximate Lines |
|---------|------------------|
| Donor weekly actions tracking | ~11915-12000 |
| Reset weekly actions | ~7635-7637 |
| Donor contribution to budget | ~8521-8528 |
| New season summary with donors | ~8686-8705 |

---
