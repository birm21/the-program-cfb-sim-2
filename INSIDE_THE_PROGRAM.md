# Inside The Program - Game Mechanics & Odds

This document outlines the mechanics, probabilities, and systems that drive the game.

---

## Table of Contents
1. [At-Risk Recruit Interventions](#at-risk-recruit-interventions)
2. [Recruiting System](#recruiting-system)
3. [Commitment & Flipping](#commitment--flipping)
   - [Instant Commits](#instant-commits)
   - [Commitment System (Parity)](#commitment-system-parity-between-user-and-ai)
   - [Flip Multiplier](#flip-multiplier)
   - [Flip Offers](#flip-offers)
   - [Decommitments](#decommitments)
   - [Commitment Status](#commitment-status)
4. [Signing Periods](#signing-periods)
5. [Roster Turnover & Transfer Portal](#roster-turnover--transfer-portal)
6. [AI Recruiting Behavior](#ai-recruiting-behavior)
7. [New Season Transition](#new-season-transition)
8. [Game Simulation](#game-simulation)
9. [In-Game Chaos Events](#in-game-chaos-events)
10. [Coaching Chaos Events](#coaching-chaos-events)
11. [NIL System](#nil-system)

---

## At-Risk Recruit Interventions

When a committed recruit has higher interest from an AI school than your school, they become "at-risk" and won't auto-sign during ESP. You'll be presented with intervention options.

### Intervention Options

| Option | Success Rate | Cost | Risk Level | Consequence |
|--------|-------------|------|------------|-------------|
| Let It Ride | NSD Algorithm | Free | Medium | Goes to National Signing Day - may flip |
| Increase NIL | 85% | +50% NIL | Low | Just costs more budget |
| Promise Starting Role | 75% | Free | Medium | If not starting by Week 4: -20 morale, 50% transfer risk |
| Booster "Assistance" | 95% | Free | Low-High* | 5% base annual NCAA investigation chance |
| Call the Bagman | 99% | Free | Medium-Extreme* | 2% base annual MAJOR violation chance |

*Risk increases with more deals

### NCAA Scrutiny Multiplier

The more deals you make, the more the NCAA watches your program:

| Deals on Books | Scrutiny Multiplier | Booster Risk | Bagman Risk |
|----------------|---------------------|--------------|-------------|
| 0 (first deal) | 1.0x | 5.0% | 2.0% |
| 1 prior deal | 1.5x | 7.5% | 3.0% |
| 2 prior deals | 2.0x | 10.0% | 4.0% |
| 3 prior deals | 2.5x | 12.5% | 5.0% |
| 4 prior deals | 3.0x | 15.0% | 6.0% |
| 5+ prior deals | 3.5x+ | 17.5%+ | 7.0%+ |

Formula: `Adjusted Chance = Base Chance × (1 + (Total Deals - 1) × 0.5)`

### Violation Consequences

**Booster "Assistance" (if caught):**
- 3-week recruiting penalty (-20% interest)

**Bagman Deal (if caught - MAJOR VIOLATION):**
- 3-year postseason ban
- 20 scholarship reductions over 4 years
- 3-year recruiting penalty (-30% interest)
- Show-cause penalty for head coach

Violations are checked **once per year** during the NCAA Annual Compliance Review (when transitioning to the new year/Transfer Portal Open).

---

## Recruiting System

### Interest Gain Modifiers

**Star Difficulty (affects interest gain per action):**
| Stars | Multiplier | Effect |
|-------|------------|--------|
| 5-star | 0.5x | Hardest to recruit |
| 4-star | 0.7x | Difficult |
| 3-star | 1.0x | Normal |
| 2-star | 1.3x | Easier |

**Diminishing Returns (based on current interest):**
| Interest Level | Multiplier |
|----------------|------------|
| 0-29% | 1.0x (full effect) |
| 30-49% | 0.8x |
| 50-69% | 0.6x |
| 70-84% | 0.4x |
| 85%+ | 0.2x (very hard to max out) |

**School Tier Bonus:**
| Tier | Multiplier |
|------|------------|
| Blue Blood | 1.2x |
| Power 4 | 1.0x |
| Group of 5 | 0.8x |

### Recruiting Action Costs

Base costs are multiplied by star rating:
| Stars | Cost Multiplier |
|-------|-----------------|
| 5-star | 3.0x |
| 4-star | 2.0x |
| 3-star | 1.0x |
| 2-star | 0.5x |

### Weekly Recruiting Points

| School Tier | Off-Season | In-Season (Reduced) |
|-------------|------------|---------------------|
| Blue Blood | 600 | 300 |
| Power 4 | 400 | 200 |
| Group of 5 | 200 | 100 |

**Recruiting Open Periods:**
- The Off-Season (full points)
- Regular Season (reduced points)
- Conference Championships (reduced points)
- The Playoffs (reduced points)
- Early Signing Period (full points)
- Transfer Portal Open (full points)
- National Signing Day (full points)

---

## Commitment & Flipping

### Instant Commits

Some recruits will commit immediately when their **dream school** offers them a scholarship. This typically happens in Week 1 of recruiting and bypasses normal interest building.

**Base Instant Commit Rates (Dream Schools Only):**

| Star Rating | Base Chance | Philosophy |
|-------------|-------------|------------|
| 5-star | 1.5% | "I'm the prize, they need me" - pickiest, take their time |
| 4-star | 3% | Knows value but can be swayed |
| 3-star | 5% | Excited by big offers |
| 2-star | 8% | Jump at Blue Blood attention |

*Note: Higher-star recruits are LESS likely to instant commit because they have more options.*

**Instant Commit Multipliers (MULTIPLICATIVE, not additive):**

All modifiers multiply the base rate instead of adding to it. This prevents runaway stacking.

| Modifier | Multiplier | Description |
|----------|------------|-------------|
| In-State | ×1.5 | Hometown kid staying home |
| Regional | ×1.25 | Neighboring state (e.g., TX recruit to OK) |
| Blue Blood Offering | ×1.4 | Prestige factor |
| Tier Above Player | ×1.3 | "Wow, THEY want ME?" |
| Legacy Trait | ×1.6 | Family connection to the school |
| Close to Home Trait | ×1.3 | Values staying near family |
| Championship Focused + BB | ×1.2 | Trait + Blue Blood match |
| Development Focused + BB | ×1.2 | Trait + Blue Blood NFL factory |
| Position Boost Match | ×1.25 | WRU, QBU, etc. for matching position |

**School Tier Gate (KEY RESTRICTION):**

This prevents G5 and low P4 schools from getting unrealistic instant commits.

| School Tier | Multiplier | Effect |
|-------------|------------|--------|
| Blue Blood | ×1.0 | Full rate |
| Top P4 (budget >$30M) | ×0.5 | Half rate |
| Regular P4 (budget <$30M) | ×0.25 | Quarter rate |
| Group of 5 | ×0.05 | Nearly impossible |

**Early Season Penalty:**

Prevents Week 1 chaos - recruits don't commit instantly at first contact.

| Off-Season Week | Multiplier | Effect |
|-----------------|------------|--------|
| Week 1-2 | ×0.5 | 50% reduction |
| Week 3-4 | ×0.75 | 25% reduction |
| Week 5+ | ×1.0 | Full rate |

**Position Depth Penalty:**

| Existing Commits at Position | Divisor |
|------------------------------|---------|
| 1 commit | ÷1.5 |
| 2 commits | ÷2.0 |
| 3+ commits | ÷2.5 |

**Blocking Conditions (No Instant Commit):**
- "Playing Time Focused" trait + existing commit at position = **0% chance**
- Recruit previously asked to wait = **0% chance**
- Recruit dropped the school = **0% chance**

**Maximum Cap:** 20% (even with all modifiers)

**Example Calculation (Blue Blood, 4-star, in-state, Week 1):**
```
4-star base:              3%
× In-state:               ×1.5 = 4.5%
× Blue Blood prestige:    ×1.4 = 6.3%
× School tier above:      ×1.3 = 8.2%
× Championship trait:     ×1.2 = 9.8%
× Early season (Week 1):  ×0.5 = 4.9%
× Blue Blood gate:        ×1.0 = 4.9%
─────────────────────────────────────
FINAL:                    ~5% instant commit chance
```

**Same recruit for a Group of 5 school:**
```
Same calculation:         ~9.8%
× G5 tier gate:           ×0.05 = 0.49%
× Early season (Week 1):  ×0.5 = 0.25%
─────────────────────────────────────
FINAL:                    ~0.25% instant commit chance
```

### User Choice: Accept or Ask to Wait

When an instant commit triggers, USER is presented with a choice:

**ACCEPT:** Recruit commits immediately at market value NIL.

**ASK TO WAIT:** Recruit may accept or drop the school based on traits.

**"Ask to Wait" Outcome Calculation:**

| Factor | Modifier | Description |
|--------|----------|-------------|
| Base chance | 50% | Starting point |
| Legacy trait | +30% | Family connection, they'll wait |
| Close to Home | +20% | Really wants to stay |
| Development Focused | +20% | Patient, trusts the process |
| Championship Focused | +10% | Trusts the program's plan |
| NIL-Driven | -20% | Impatient, wants money now |
| Playing Time Focused | -30% | Assumes there's competition |
| Per other dream school | -10% | More options = less patience |

**Outcomes:**
- **OK with waiting:** Interest drops 10%, stays on board, won't instant commit again
- **NOT OK (drops school):** Removes your school from consideration entirely, interest goes to 0

**Instant Commit Behavior:**
- Only triggers for dream schools
- Bypasses NIL negotiation (commits at market value)
- Applies to both USER and AI schools
- AI instant commits happen during Week 1 initialization
  - **AI only checks the #1 dream school** (not all dream schools) to limit volume
- USER instant commits trigger when offering a scholarship
- User has choice to accept or defer

**Narrative Headlines:**
Instant commits generate newspaper-style headlines based on the primary trigger:
- Legacy: "Following in Father's Footsteps", "Family Tradition Continues"
- Hometown: "Hometown Hero Stays Home", "Local Star Commits"
- Position U: "Pipeline Continues", "Following the Pros"
- Blue Blood: "Dream Becomes Reality", "Couldn't Say No"

---

### Commitment System (Parity Between USER and AI)

Both USER and AI schools use the **same commit mechanics**. There are two paths to commitment:

#### Path 1: Auto-Commit (90%+ AND 25%+ Lead)
If a school has **90%+ interest** AND a **25+ point lead** over the next closest school, the recruit commits automatically. This applies equally to USER and AI schools.

#### Path 2: Random Commit (80%+ Interest)

| Stars | Base Chance | Notes |
|-------|-------------|-------|
| 5-star | 15% | Very selective, always negotiate NIL |
| 4-star | 30% | Selective, almost always negotiate NIL |
| 3-star | 75% | Commit more readily |
| 2-star | 75% | Commit more readily |

**Trailing Penalty (applies to both USER and AI):**
If the opposing school has higher interest, commit chance is reduced:
| Opponent Lead | Modifier |
|---------------|----------|
| 1-9% ahead | 0.75x |
| 10-19% ahead | 0.5x |
| 20%+ ahead | 0.25x |

If committing despite opponent lead, recruit demands NIL premium: +2% per point of deficit.

#### NIL Negotiation Requirements
In modern CFB, high-star recruits almost always require NIL negotiations:
| Stars | Skip NIL Chance (Dream School + In-State Only) |
|-------|------------------------------------------------|
| 5-star | 0% (ALWAYS negotiate NIL) |
| 4-star | 5% (very rare exception) |
| 3-star | 30% |
| 2-star | 50% |

### Flip Multiplier

When a recruit commits, a flip multiplier is assigned based on commitment interest:

| Commitment Interest | Flip Multiplier | Flip Difficulty |
|--------------------|-----------------|-----------------|
| 100% | 0.3x | Very hard to flip |
| 90-99% | 0.5x | Hard |
| 80-89% | 0.7x | Moderate |
| 70-79% | 1.0x | Normal |
| Below 70% | 1.2x | Easier to flip |

**Additional Modifiers:**
- In-state recruit: 0.5x flip chance (loyalty)
- Committed to Blue Blood: 0.5x flip chance
- Committed to Power 4: 0.75x flip chance

### Flip Offers

When a recruit commits to another school, you can make a flip offer. Click "MAKE OFFER" on any recruit showing "FLIP ATTEMPT" status.

**Flip Attempt Costs (Recruiting Points):**

| Star Rating | Point Cost |
|-------------|------------|
| 5-Star | 200 pts |
| 4-Star | 150 pts |
| 3-Star | 100 pts |
| 2-Star | 75 pts |

**Flip Attempt Restrictions:**
- **Once per week** per recruit - cannot retry in the same week
- **Blocks all other actions** on that recruit for the week
- Cost is deducted regardless of success or failure
- Resets at the start of each new week

**Flip Offer Options:**

| Option | Base Success | NIL Cost | Risk |
|--------|--------------|----------|------|
| Standard Offer | 15% | Market Value | None |
| Premium Package | 35% | 1.5x Market | None |
| Booster "Special" | 60% | Market Value | 5% annual violation |
| Bagman Special | 85% | Market Value | 2% MAJOR violation |

**Success Rate Modifiers:**
- Committed to Blue Blood: -50%
- Committed to Power 4: -25%
- Development Focused trait: -30%
- Your interest below 40%: -30%
- In-state for their school: -50%
- Your interest 70%+: +30%
- You're a Blue Blood: +20%
- You're Group of 5: -30%

*Note: Booster/Bagman deals add to your scrutiny multiplier (same as At-Risk Interventions)*

### Decommitments

A committed recruit will decommit if ANY of the following conditions occur:

| Condition | Trigger |
|-----------|---------|
| Interest Below 70% | Losing games causes interest to drop |
| No NIL Agreement | Commit without finalized NIL deal |
| NIL Deal is $0 | Invalid NIL contract |

**Common Causes of Decommitments:**
- Consecutive losses (-5% per additional loss)
- Bad losses when favored by 10+ (-8%)
- Blowout losses (-12%)
- Rivalry losses (-15%)
- Team collapse event (-15%)

When a decommitment occurs, you'll receive a notification explaining which recruit(s) backed out and why.

### Commitment Status

Recruits have two distinct commitment states that determine their relationship with your program:

| Status | Badge | Meaning | Can Flip? | Roster Impact |
|--------|-------|---------|-----------|---------------|
| **Verbal Commit** | "✓ COMMITTED" | Pledge to attend, not binding | Yes | Not yet on roster |
| **Signed** | "✅ SIGNED" | Binding letter of intent | No | Joins roster at season transition |

**Key Differences:**
- **Verbal commits** (`verbalCommit: true`) can still be flipped by other schools, may show "SIGNING DAY" tag if at-risk
- **Signed recruits** (`signedCommit: true`) are locked in - no more flip attempts, automatically join roster when new season begins
- The "SIGNING DAY" tag only appears on verbal commits who haven't yet signed during signing periods

**Roster Transition:**
When you advance to the next season after the final signing period:
- All `signedCommit: true` recruits become Freshmen on your roster
- All `signedCommit: true` transfers join your roster (keeping their year)
- Unsigned verbal commits remain in the recruiting pool

---

## Signing Periods

### Early Signing Period (ESP)

**Auto-Sign Probability (for non-at-risk commits):**
| Stars | Sign Chance |
|-------|-------------|
| 5-star | 95% |
| 4-star | 80% |
| 3-star | 65% |
| 2-star | 20% |

**Special Cases:**
- 100% interest + in-state = 100% sign rate
- At-risk commits (AI > user interest) → Signing Day Decision

### National Signing Day (NSD) Algorithm

For Signing Day Decisions, a weighted algorithm determines the winner:

| Factor | Weight | Description |
|--------|--------|-------------|
| Interest | 50% | (interest / 100) × 50 |
| NIL Offer | 30% | (NIL / asking price) × 30, capped at 30 |
| Dream School | 15% | +15 if dream school |
| Commitment Loyalty | 10% | +10 for at-risk commits (to stay) |
| Random | 5% | 0-5 random points |

Highest total score wins the recruit.

---

## Roster Turnover & Transfer Portal

### When Roster Turnover Happens

Roster turnover occurs **only when entering the Transfer Portal Open period** (January). Teams keep their full roster during:
- Regular Season
- Conference Championships
- The Playoffs

This ensures playoff teams compete with their complete squad until the season is over.

### Player Departures by Class

| Year | Condition | Outcome |
|------|-----------|---------|
| **5th Year (5Y)** | Always | Stays on roster (never enters portal) |
| **Senior (SR)** | 75+ OVR | Leaves for professional football |
| **Senior (SR)** | 70-74 OVR | User decision: Offer 5th year OR enters portal |
| **Senior (SR)** | Below 70 OVR | Retires from football |
| **Junior (JR)** | 93+ OVR | User decision: Pay 3x market value OR declares for NFL |
| **Junior (JR)** | 70-79 OVR, non-starter | 50% chance enters portal |
| **Sophomore (SO)** | Starter, NIL 25%+ under value | User decision: Increase NIL OR enters portal |
| **Sophomore (SO)** | Non-starter, low satisfaction | Enters portal |
| **Freshman (FR)** | Very low satisfaction (<30) | Enters portal |
| **Freshman (FR)** | Low satisfaction (31-59) | User decision: NIL increase request |

### Transfer Portal Decisions

When roster turnover occurs, you may be presented with decisions for players who haven't automatically left or stayed. These players remain on your roster until you decide:

- **Offer 5th Year** - Senior stays as 5Y player
- **Pay to Retain** - Junior/Sophomore/Freshman stays with increased NIL
- **Decline** - Player enters transfer portal (frees NIL budget)
- **Let Him Go** - Player declares for NFL Draft

Players entering the portal become available as transfer recruits that any school (including you) can recruit.

### AI School Portal Entries

When the Transfer Portal opens, AI schools also lose players to the portal:

| Year | Condition | Portal Chance |
|------|-----------|---------------|
| Junior (JR) | Non-starter, 70-79 OVR | 50% |
| Sophomore (SO) | Non-starter | 40% |
| Freshman (FR) | Non-starter | 25% |

These players become available for you to recruit through the Transfer Portal Recruiting section.

---

## AI Recruiting Behavior

AI schools actively recruit throughout the season using the **same commit mechanics as USER**.

### AI Recruiting Actions
- **Dream Schools**: 3-4 actions per week (very aggressive)
- **Other Schools**: 2-3 actions per week
- **Activity Rate**: 95% chance to recruit each week

### AI Recruiting System (Full Parity with USER)

AI schools use the **exact same recruiting system** as USER - same actions, costs, budgets, and limits.

**Same Actions Available:**
| Action | Cost | Gain | Limit |
|--------|------|------|-------|
| Social Media | 5 | 5 | Once/week |
| Call | 10 | 10 | Once/week |
| School Visit | 15 | 12 | Once/month |
| Campus Visit | 25 | 20 | Once/month |
| Official Visit | 50 | 30 | Once/recruit (75%+ required) |

**Same Weekly Budget:**
- Blue Blood: 600 points
- Power 4: 400 points
- Group of 5: 200 points

**Same Cost Multipliers:** 5-star 3.0x, 4-star 2.0x, 3-star 1.0x, 2-star 0.5x

**Same Diminishing Returns:** 1.0x → 0.8x → 0.6x → 0.4x → 0.2x

**Budget Allocation per Recruit:**
- Dream schools allocate 40-60% of weekly budget to priority recruits
- Other schools allocate 20-40% (spreading across multiple recruits)

### AI Commit Logic
AI schools use the **exact same commit system** as USER:

1. **Auto-Commit**: 90%+ interest AND 25%+ lead over next closest → guaranteed commit
2. **Random Commit**: 80%+ interest → star-based chance (15%/30%/75%)
   - Subject to same trailing penalty if USER leads

### AI Commit Maintenance
AI schools continue recruiting their own commits using the same budget/action system (15% of weekly budget allocated to maintaining commits). This prevents stagnant interest after early commits.

---

## New Season Transition

After completing The Off-Season (16 weeks of recruiting), you'll see the **"🏈 ADVANCE TO NEXT SEASON"** button. Clicking this triggers the full season transition.

### What Happens at Season Transition

1. **Player Aging**
   - FR → SO → JR → SR → Graduates
   - 5th Year players graduate
   - Players receive small rating boosts based on experience

2. **Roster Updates**
   - Signed recruits become Freshmen on your roster
   - Signed transfers join your roster (keeping their class year)
   - All AI rosters update similarly

3. **Rating Progression**
   | Year | Rating Boost |
   |------|-------------|
   | Freshman → Sophomore | +1-3 |
   | Sophomore → Junior | +1-2 |
   | Junior → Senior | +0-1 |

4. **New Recruiting Class**
   - ~1800 fresh recruits generated
   - Includes 5-star through 2-star players
   - All previous unsigned recruits are removed

5. **Schedule Generation**
   - New 12-game schedule created
   - Includes conference games and non-conference matchups
   - Rivalry games preserved

6. **Budget Adjustment**
   - 10+ wins: +10% budget increase
   - 8-9 wins: +5% budget increase
   - Below 8 wins: No change

### Season Calendar Cycle
1. **The Off-Season** (March - June): 16 weeks of recruiting
2. **Training Camp** (July): Prepare for season
3. **Regular Season** (August - October): 12-game schedule
4. **Early Signing Period** (December): Sign committed recruits
5. **Conference Championships** (December): Championship week
6. **The Playoffs** (December - January): Postseason play
7. **Transfer Portal Open** (January): Roster turnover
8. **National Signing Day** (February): Final signing period
9. Return to **The Off-Season** → New Season begins

---

## Game Simulation

### Team Rating Calculation

| Unit | Weight |
|------|--------|
| QB Rating | 25% |
| RB Rating | 15% |
| WR Rating | 15% |
| TE Rating | 5% |
| OL Rating (OT, OG, C) | 20% |
| Defense Rating | 20% |

### Contextual Modifiers

| Modifier | Value |
|----------|-------|
| Home Field | +3 |
| Road Game | -3 |
| Rivalry (underdog) | +5 |
| Win Streak (per game) | +1 (max +3) |
| Lose Streak (per game) | -1 (max -3) |
| Bye Week | +2 |

### Upset Probability

| Point Spread | Base Upset Chance |
|--------------|-------------------|
| +20 (big underdog) | 2% |
| +15 | 10% |
| +10 | 20% |
| +7 | 30% |
| +5 | 35% |
| +3 | 40% |
| Even | 50% |

**Modifiers:**
- Rivalry game: +15% upset chance
- Home underdog: +8% upset chance

### Score Distribution

| Type | Chance | Margin Range |
|------|--------|--------------|
| Blowout | 18% | 21-35 points |
| Moderate | 37% | 8-20 points |
| Close | 45% | 0-7 points |

### In-Game Chaos Events

Random events that can occur during games, adding unpredictability:

| Event | Chance | Effect | Type |
|-------|--------|--------|------|
| Pick Six | 8% | +7 point swing | Defense |
| Scoop & Score | 5% | +7 point swing | Defense |
| Blocked Kick | 4% | +3 point swing | Special Teams |
| Kick Return TD | 3% | +7 point swing | Special Teams |
| Punt Return TD | 2% | +7 point swing | Special Teams |
| Controversial Call | 2% | +4 point swing | Random |
| Career Game | 5% | +10 point bonus | Player |
| Miracle Play | 1% | +7 point swing, +30% recruiting | Special |
| Complete Collapse | 2% | Momentum shift, -15% recruiting | Momentum |

**Weather Impact:**
- Rain/Snow increases turnover event chances by 50% (Pick Six, Scoop & Score)

**Complete Collapse:**
When a team suffers a "Complete Collapse," it represents a catastrophic breakdown across all three phases. This is rare (2%) but devastating when it happens - especially for programs expected to win. Blue Blood programs historically win ~70% of their games, with most losses coming to other elite teams. A collapse against a weaker opponent is newsworthy and costs recruiting momentum.

---

## Coaching Chaos Events

Checked after each game:

| Event | Chance | Consequence |
|-------|--------|-------------|
| Recruiting Violation | 2% | 3-week penalty, -20% interest |
| Impermissible Benefits | 1% | Random targeted recruit removed |
| Inappropriate Relationship | 0.05% | Immediate termination |
| NFL Job Offer | 10%* | Stay: -15% interest / Leave: End dynasty |

*Only if coach success rating > 90%

### Broken Promise Consequences (Week 4+)

If you promised a recruit a starting role and they're not starting by Week 4:
- -20 Team Morale
- 50% chance player enters transfer portal

---

## NIL System

### Market Value Calculation

Based on star rating and position scarcity:
| Stars | Base Value |
|-------|------------|
| 5-star | $800K - $1.5M |
| 4-star | $400K - $800K |
| 3-star | $150K - $400K |
| 2-star | $50K - $150K |

### Asking Price

- Minimum: Market Value
- 5-stars: Never below market value
- Premium added for high-demand positions (QB, EDGE)

### NIL Negotiation

**Initial Phase:**
- Offer market value → recruit accepts
- Counter → moves to counter phase

**Counter Phase:**
- Slider from market value to asking price
- Acceptance chance = (offer / asking price) × 100%

**Walk-Away Risk:**
- If counter < 15% of asking price: 80% chance recruit walks away entirely

### Flip Multiplier from NIL

NIL generosity affects flip resistance:
| Offer vs Asking | Flip Modifier |
|-----------------|---------------|
| At or above asking | 0.5x (very loyal) |
| 75-99% of asking | 0.7x |
| 50-74% of asking | 1.0x |
| Below 50% of asking | 1.3x (easy to flip) |

---

## Recruiting Impact from Games

### Win Bonuses

| Condition | Interest Boost |
|-----------|----------------|
| Any Win | +1% |
| Conference Win | +1% |
| Ranked Win | +2% |
| Rivalry Win | +4% |
| Top 10 Win | +6% |
| Upset Win | +10% |

### Loss Penalties

| Condition | Interest Penalty |
|-----------|------------------|
| Any Loss | -3% |
| Bad Loss (favored by 10+) | -8% |
| Blowout Loss | -12% |
| Rivalry Loss | -15% |
| Each Consecutive Loss | -5% additional |

---

*Last Updated: January 2026*
