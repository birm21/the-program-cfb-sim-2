# Chat Carryover - CFB Dynasty Simulator

**Last Updated:** February 1, 2026
**Dev Server:** `npm run dev` (usually port 3000-3005)

---

## Quick Start for New Session

1. Read this file first
2. Read `/Notes for Claude/SESSION_LOG.md` for detailed history
3. Check the plan file: `/Users/birm/.claude/plans/compressed-rolling-crane.md`
4. Main code: `src/App.jsx` (~17,500 lines)

---

## Project Overview

**CFB Dynasty Simulator** - A college football management game built in React (single-file architecture).

**Stack:** React + Vite + Tailwind CSS, localStorage for saves

**Core Systems:**
- Recruiting (comprehensive with NIL, instant commits, AI competition)
- Donor/NIL Management (courting donors, budget management)
- Game Simulation (quarter-by-quarter with game plans)
- Transfer Portal
- Season Calendar (Off-Season → Training Camp → Regular Season → Playoffs)

---

## Current Development Focus: Playoff & Rankings System

We're implementing a complete College Football Playoff system based on the real 12-team CFP format.

### COMPLETED (January 31, 2026)

#### 1. Conference Standings System
**Location:** `App.jsx` lines ~2525-2820

- All 134 FBS schools tracked with W-L, conference record, points for/against, streak
- AI games simulated weekly when player advances
- 9 conferences + Independents
- UI panel on dashboard (collapsible)

**Key Functions:**
- `initializeConferenceStandings(allSchools)`
- `generateAllTeamSchedules(allSchools, playerSchoolId, playerSchedule)`
- `simulateAIWeeklyGames(week, standings, allSchools, playerSchoolId, aiRosters)`
- `updatePlayerGameStandings(standings, playerSchoolId, opponentId, playerWon, scores, isConference)`
- `getConferenceStandings(standings, conference)`

#### 2. National Rankings System
**Location:** `App.jsx` lines ~2822-3030

**Algorithm (weighted):**
| Factor | Weight |
|--------|--------|
| Win/Loss Record | 35% |
| Strength of Schedule | 25% |
| Quality Wins Bonus | 15% |
| Conference Record | 15% |
| Team Rating (OVR) | 10% |

**Tier Weights for SoS:** Blue Blood (1.0), Power 4 (0.8), Group of 5 (0.6)

**Quality Wins:** +3 Top 10, +2 Top 25, +1 Blue Blood, +1 Ranked G5

**Preseason Poll:** BB #1-15, P4 #10-35, G5 #25-50

**Key Functions:**
- `generatePreseasonRankings(allSchools, aiRosters, playerRoster, playerSchoolId)`
- `calculateSoS(schoolId, standings, allSchools)`
- `calculateQualityWins(schoolId, standings, currentRankings, allSchools)`
- `calculateNationalRankings(standings, allSchools, aiRosters, playerRoster, playerSchoolId, prevRankings)`
- `getTop25Rankings(rankings)`

**UI:** Top 25 panel on dashboard with rank changes (▲▼)

#### State Variables Added
```javascript
const [conferenceStandings, setConferenceStandings] = useState({}); // line ~4500
const [nationalRankings, setNationalRankings] = useState([]);       // line ~4501
const [standingsExpanded, setStandingsExpanded] = useState(false);  // line ~4628
const [rankingsExpanded, setRankingsExpanded] = useState(true);     // line ~4629
const [playoffState, setPlayoffState] = useState({...});            // line ~4534
const [showConfChampModal, setShowConfChampModal] = useState(false); // line ~4549
const [showSelectionSundayModal, setShowSelectionSundayModal] = useState(false);
const [showPlayoffBracketModal, setShowPlayoffBracketModal] = useState(false);
```

---

### COMPLETED (February 1, 2026)

#### 3. Playoff Selection Logic ✅
**Location:** `App.jsx` lines ~3048-3245

**12-Team Format:**
- 5 auto-bids: Highest-ranked conference champions
- 7 at-large: Best remaining teams by ranking
- Seeds 1-4 get first-round bye (must be conf champ or independent)
- Notre Dame rule: Independent teams are at-large only, but get bye if top 4

**Implemented:**
- `simulateConferenceChampionships()` - Top 2 in each conference play
- `selectPlayoffField(rankings, confChampions)` - Selects 12 teams
- Conference Championship handling in `simulateToNextEvent()`
- Selection Sunday modal with dramatic reveal
- Conference Championships results modal

#### 4. Playoff Bracket UI ✅
**Location:** `App.jsx` lines ~18350-18750

- Visual bracket showing all rounds
- Clickable "PLAY GAME" for player's games
- Progress tracker with results
- First round: Seeds 5-12 play, seeds 1-4 have bye
- Quarterfinals → Semifinals → Championship structure

---

### COMPLETED (February 1, 2026 - Continued)

#### 5. Enhanced Playoff Game Mode ✅
**Location:** See `/Notes for Claude/ENHANCED_PLAYOFF_SPEC.md` for full spec

**Infrastructure Added:**
- Momentum system (0-100, asymmetric effect, context scaling)
- Halftime adjustment modal (Stay the Course, Air It Out, Ground & Pound, Trick Plays)
- Critical decision modal (4th down with Go/Punt/FG options, two-minute drill)
- Injury decision modal (keep in vs pull, aggravation risk display)
- All state variables and reset logic

**Key Functions:**
- `calculateMomentumModifier()` - Converts momentum to success rate modifier
- `calculateMomentumChange()` - Calculates momentum swing from events
- `updateMomentum()` - Updates state with history tracking
- `generateGameInjury()` - Random injury generation
- `processInjuryDecision()` - Handles keep in/pull decision

#### 6. Bowl Games ✅
**Location:** `App.jsx` lines ~3460-3580

**Implemented:**
- `assignBowlGames()` - Assigns all bowl games to non-playoff teams
- `checkPlayerBowlEligibility()` - Checks if player qualifies
- `determineBowlAssignment()` - Assigns specific bowl based on wins
- Bowl invitation modal with funny sponsor names
- Integration with Selection Sunday (shows bowl if player missed playoff)

**Bowl Tiers:**
- NY6 (10+ wins): Insurance Classic, Auto Dealers Bowl, etc.
- Mid-Tier (8-9 wins): Tire Center Bowl, Regional Bank Classic, etc.
- Lower-Tier (6-7 wins): Local Car Dealer Bowl, Strip Mall Invitational, etc.

#### 7. Playoff Legacy Tracking ✅
**Location:** `App.jsx` lines ~3580-3650, UI at ~12920

**Tracks:**
- Playoff appearances, wins, losses
- Championships, Final Fours, Championship appearances
- Biggest win (margin, opponent, year, round)
- Closest loss (heartbreaker)
- Perfect playoff runs

**Functions:**
- `updatePlayoffLegacy()` - Updates after each playoff game
- `recordPlayoffAppearance()` - Records making the playoff field

**UI:** Collapsible section in Team tab showing all legacy stats

---

### REMAINING TO IMPLEMENT

#### Wire Up Enhanced Mode
The infrastructure is built but needs to be connected to actual gameplay:
1. Trigger halftime modal during playoff games at halftime
2. Trigger critical decision modals at key moments
3. Apply momentum modifier to play outcomes
4. Trigger injury modal when injury occurs
5. Implement blowout skip option (down 28+)

#### Championship Celebration Sequence
Multi-screen sequence when winning national championship:
1. Trophy presentation with confetti
2. Player of the game highlight
3. Dynasty legacy update screen

#### Sound Effects (Optional)
Per spec - crowd roar, whistle, TD horn, tension music

---

## Conferences in the Game

**Power 4:**
- Summit League (SEC-style)
- Great Lakes Conference (Big Ten-style)
- Atlantic Alliance (ACC-style)
- Frontier League (Big 12-style)

**Group of 5:**
- American Athletic
- Conference USA
- Mid-American Conference
- Mountain Division
- Sunbelt Conference

**Independent:**
- Golden Dome University (Notre Dame analog)
- Connecticut State, Massachusetts State

---

## Key File Locations

| Item | Location |
|------|----------|
| Main app code | `src/App.jsx` |
| Game mechanics docs | `INSIDE_THE_PROGRAM.md` |
| Session notes | `/Notes for Claude/SESSION_LOG.md` |
| This carryover | `/Notes for Claude/CHAT_CARRYOVER.md` |
| Implementation plan | `/Users/birm/.claude/plans/compressed-rolling-crane.md` |
| Claude instructions | `CLAUDE.md` |

---

## Important Line References (approximate, may shift)

| Code Section | Lines |
|--------------|-------|
| SCHOOLS data | ~70-355 |
| Conference standings functions | ~2525-2820 |
| Rankings functions | ~2822-3030 |
| State variables | ~3900-4300 |
| Save/Load logic | ~4400-4550, ~5400-5700 |
| advanceToNewSeason() | ~9100-9250 |
| Game completion handler | ~17300-17450 |
| Dashboard UI | ~10700-12200 |
| Rankings UI | ~11900-12030 |
| Standings UI | ~12032-12145 |

---

## Testing Notes

- Start a new game to see preseason rankings
- Play through games to see standings/rankings update
- Rankings update after each game with AI games simulated simultaneously
- Conference standings show championship preview (top 2 teams)

---

## Skills/Guidelines Active

From `.claude/skills/`:
- `clean-code` - Pragmatic coding standards
- `game-development` - Game design principles
- `react-best-practices` - Component structure, hooks, performance

Key rules:
- Keep solutions simple, avoid over-engineering
- Self-check before completing tasks
- Update SESSION_LOG.md at end of sessions

---

## Resume Command

To continue where we left off, tell Claude:

> "Continue implementing the playoff system. Conference championships and 12-team bracket selection are done. Next is enhanced playoff game mode (momentum system, halftime adjustments, critical decisions) and bowl games for non-playoff teams. Read CHAT_CARRYOVER.md and SESSION_LOG.md for context."
