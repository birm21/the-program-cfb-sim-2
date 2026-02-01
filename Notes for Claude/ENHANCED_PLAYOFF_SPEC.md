# Enhanced Playoff Game Mode & Bowl Games - Implementation Spec

**Created:** February 1, 2026
**Based on:** Interview with product owner

---

## 1. Enhanced Playoff Game Mode Overview

Enhanced mode is **CFP-exclusive by default**, with an **optional toggle** to enable it for any regular season game (pure preference, no gameplay difference).

---

## 2. Momentum System

### Core Mechanics
- **Range:** 0-100 (50 = neutral)
- **Carryover:** Momentum carries over fully between quarters (no reset, no decay)
- **Effect:** Asymmetric multiplicative - your momentum boosts YOUR plays only, opponent unaffected
  - At momentum 70: ~+4% success rate boost
  - At momentum 30: ~-4% success rate penalty
  - Formula suggestion: `(momentum - 50) * 0.002` = percentage modifier

### Visual Display
- **Real-time animation** - bar visibly shifts after each key play
- Displayed prominently in the "stadium view" broadcast UI

### Momentum Events
Combination of diminishing returns, context-scaling, and opponent-tier scaling:

| Event | Base Value | Notes |
|-------|------------|-------|
| Touchdown | +12 | Diminishes: 2nd TD = +10, 3rd = +8, etc. |
| Turnover forced | +15 | Bigger swing; quality of opponent defense matters |
| 3-and-out forced | +6 | |
| Sack | +4 | |
| Big play (25+ yards) | +5 | |
| Score allowed | -10 | |
| Turnover committed | -15 | |
| 3-and-out (offense) | -6 | |

**Context Scaling:**
- Close games (within 10 points): +25% momentum effect
- 4th quarter: +50% momentum effect
- These stack multiplicatively

**Opponent-Tier Scaling:**
- Scoring on Blue Blood defense: +20% momentum gain
- Scoring on G5 defense: -20% momentum gain

### Integration with Existing Chaos Events
**Full integration** - existing chaos events (fumbles, pick-6s, etc.) now trigger momentum shifts as part of the unified system.

---

## 3. Critical Decision Moments

### Frequency
**4-5 moments per playoff game** - roughly one per quarter plus key situations.

### Decision Types

#### 3.1 Fourth Down Decisions
**Risk tiers within each option:**

**Go For It:**
- Safe run (short yardage play, ~70% conversion)
- Standard play (balanced, ~55% conversion)
- Aggressive deep shot (~35% conversion, big gain if successful)

**Punt:**
- Traditional punt (reliable distance)
- Rugby style (more hang time, worse coverage)
- Fake punt option (high risk/reward)

**Field Goal:**
- Standard kick
- Fake FG (very high risk/reward)

#### 3.2 Two-Minute Drill
**Time pressure mechanic:**
- Progress bar shrinking (not numeric countdown)
- If player doesn't choose before bar depletes, AI picks conservative option
- **Brief notification** when defaulting: "Defaulting to safe play..."

Options:
- Aggressive (deep shots, sideline throws)
- Balanced
- Conservative (clock management, safe completions)
- Spike the ball (stop clock)

#### 3.3 Timeout Strategy
**AI-prompted only** - game prompts "Call timeout?" at strategic moments:
- Opponent driving in final 2 minutes
- Before crucial 4th down
- To ice the kicker
- After a big play (either side)

#### 3.4 Injury Decisions
**Full transparency shown:**
- Exact injury type (e.g., "Mild ankle sprain")
- Aggravation risk percentage (e.g., "30% chance of worsening")
- Potential miss time if aggravated

Options:
- Keep player in (risk aggravation)
- Pull player (safe, but lose their production)

**Season-long consequences (variable by severity):**
| Severity | If Aggravated |
|----------|---------------|
| Minor | Miss 1 game |
| Moderate | Miss 2-3 games |
| Serious | Miss 3-4 games |
| Catastrophic (rare, ~5%) | Season-ending or career-ending |

---

## 4. Halftime Adjustments

Exists **alongside** pre-game plans (not replacing them). Pre-game sets base strategy, halftime adjusts.

### Options

| Adjustment | Effect |
|------------|--------|
| **Stay the Course** | No changes. Continue with pre-game plan. |
| **Air It Out** | +pass attempts, +deep shot chance, +turnover risk |
| **Ground & Pound** | +run attempts, better clock control, lower ceiling |
| **Trick Plays** | **Momentum multiplier**: If you score, 2x momentum gain. If you fail/turnover, 2x momentum loss. High variance. |

**Note:** Adjustments are pure game context - any team can pick any option regardless of roster composition.

---

## 5. Blowout Handling

If player is down **28+ points**, offer skip option:
- Popup: "This one's getting away from you. Skip to final?"
- Player can choose to continue (maybe mount comeback) or skip

---

## 6. Game UI - Stadium View

### Visual Layout
Stylized "broadcast" look:
- Scoreboard at top (team names, score, quarter, time)
- Momentum bar below scoreboard
- Field graphic in center (stylized, not full simulation)
- Decision overlays appear on field when needed
- Text commentary in "ticker" style at bottom

### Audio Elements
**On by default** (option to disable in settings):
- Crowd roar after big plays
- Whistle sounds
- Stadium ambiance
- Intensifies with momentum swings

---

## 7. Bowl Games

### Eligibility
- **6+ wins** = Bowl eligible
- **5 or fewer wins** = Season ends (no postseason)

### Bowl Tiers & Selection

**Conference tie-ins** determine bowl placement:

| Tier | Wins Required | Bowl Examples |
|------|---------------|---------------|
| NY6 (non-CFP) | 10+ wins | Major bowls for top non-playoff teams |
| Mid-Tier | 8-9 wins | Regional/conference tie-in bowls |
| Lower-Tier | 6-7 wins | Smaller bowls |

### Fictional Bowl Names (with Generic Sponsors)
Poking fun at real bowl sponsorships:

**NY6 Equivalents:**
- The Insurance Classic
- The Auto Dealers Bowl
- The Pharmaceutical Fiesta
- The Credit Union Bowl
- The Mattress Firm Invitational

**Mid-Tier:**
- The Tire Center Bowl
- The Regional Bank Classic
- The Fast Food Bowl

**Lower-Tier:**
- The Local Car Dealer Bowl
- The Furniture Store Classic
- The Strip Mall Invitational

### Bowl Timing
**Bowls happen during playoffs** (realistic timing) - non-playoff teams play their bowl while CFP rounds are ongoing.

### If Player Misses Playoff
- Bowl game uses **regular simulation** (not enhanced mode)
- CFP **auto-sims in background** using realistic upset logic (same simulation as player games)
- After player's bowl, show: "National Champion: [Team]" summary

---

## 8. Championship Celebration

**Multi-screen sequence:**

1. **Trophy Presentation**
   - Trophy graphic with confetti animation
   - "NATIONAL CHAMPIONS" headline
   - Final score display

2. **Confetti/Celebration**
   - Full-screen celebration animation
   - Team name prominently displayed

3. **Player of the Game**
   - Highlight top performer
   - Key stats from the game

4. **Legacy Update**
   - Dynasty milestone update
   - Where this ranks in coaching history
   - Total championships count

---

## 9. Playoff Legacy Tracking

### Data to Track
- Total playoff appearances
- Playoff wins / losses
- Final Four appearances
- Championship game appearances
- Championships won
- Biggest playoff wins (margin)
- Closest losses (heartbreakers)
- Perfect playoff runs (undefeated through bracket)

### UI Location
- **TEAM tab**: Section showing team's playoff history
- **Coach modal** (click on coach name/success bar): Full coaching legacy stats

---

## 10. Technical Notes

### State Additions Needed
```javascript
// Enhanced game mode state
const [enhancedModeEnabled, setEnhancedModeEnabled] = useState(false); // Toggle for any game
const [gameMomentum, setGameMomentum] = useState(50);
const [momentumHistory, setMomentumHistory] = useState([]); // For animation
const [currentDecision, setCurrentDecision] = useState(null);
const [decisionTimer, setDecisionTimer] = useState(null);
const [gameInjuries, setGameInjuries] = useState([]); // Injuries during current game
const [halftimeAdjustment, setHalftimeAdjustment] = useState(null);

// Bowl game state
const [bowlAssignment, setBowlAssignment] = useState(null); // Player's bowl if not in CFP
const [bowlResults, setBowlResults] = useState([]); // All bowl game results

// Legacy tracking
const [playoffHistory, setPlayoffHistory] = useState({
  appearances: 0,
  wins: 0,
  losses: 0,
  championships: 0,
  finalFours: 0,
  championshipAppearances: 0,
  biggestWin: null,
  closestLoss: null
});
```

### Sound System
- Use Web Audio API or Howler.js
- Preload sounds during game load
- Global mute toggle in options
- Sounds: crowd_roar.mp3, whistle.mp3, td_horn.mp3, tension_music.mp3

### Performance Considerations
- Momentum bar animation: Use CSS transitions, not JS animation loops
- Decision modals: Lazy load, don't render until needed
- Sound preloading: Load during "loading game" phase

---

## 11. Implementation Priority

1. **Momentum system** (core mechanic everything builds on)
2. **Stadium view UI** (visual foundation)
3. **Critical decisions** (4th down, 2-min drill)
4. **Halftime adjustments**
5. **Injury decisions**
6. **Sound effects**
7. **Bowl game system**
8. **Legacy tracking**
9. **Championship celebration sequence**

---

## 12. Open Questions / Future Considerations

- Should momentum affect AI decision-making? (e.g., opponent more likely to go for it when momentum is against them)
- Should there be a "momentum boost" consumable (like calling a team meeting timeout)?
- Dynasty mode: Should championships/legacy affect recruiting?
