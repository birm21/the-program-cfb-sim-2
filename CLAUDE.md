# CFB Dynasty Simulator - Claude Context

## First Steps Every Session
1. Read `/Notes for Claude/SESSION_LOG.md` for recent changes and context
2. Check current todo list state
3. Review any active plan files

## Project Quick Reference

| Item | Location |
|------|----------|
| Main app code | `src/App.jsx` (~13,000 lines) |
| Game mechanics docs | `INSIDE_THE_PROGRAM.md` |
| Session notes | `/Notes for Claude/SESSION_LOG.md` |
| Dev server | `npm run dev` (port 3000) |

## Key Architecture Notes
- Single-file React app (App.jsx contains everything)
- Vite + Tailwind CSS
- No backend - all state in React useState hooks
- Game saves to localStorage

## Before Ending a Session
Update `/Notes for Claude/SESSION_LOG.md` with:
- Changes made
- Bugs found
- Design decisions
- Updated line references if needed
