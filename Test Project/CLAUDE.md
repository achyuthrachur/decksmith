# CLAUDE.md — Crowe AI Strategy → Figma Slides
> Keep sessions scoped. Read HANDOFF.md first if it exists.

## MISSION
Migrate `Crowe-AI-Strategy-Presentation (Revised-v14).html` (13 slides) into Figma Slides via figma-slides MCP.

## BEFORE YOU START
1. Confirm figma-slides plugin is running inside Figma deck — if not, STOP and tell user
2. Figma deck: `https://www.figma.com/deck/xxPEvprXhbVJjszWx29sc8/`
3. Load branding skill: `C:\Users\RachurA\AI Coding Projects\.claude\skills\branding\SKILL.md`

## KEY FILES
| File | Purpose |
|------|---------|
| `Crowe-AI-Strategy-Presentation (Revised-v14).html` | Content source — 13 slides |
| `CONTENT-LAYER.md` | Structured content outline |
| `ANIMATION-SPEC.md` | Full animation + transition map — read before building |
| `crowe-logo-white.svg` | Logo asset — always use this, never generate |
| `Image 1-5.png` + `New Images/*.jpg` | Slide photography |

## WORK RULES
- Build ONE slide fully before moving to the next
- Load fonts before use (`loadFont("Arial", "Bold")` as fallback if Helvetica Now unavailable)
- Write HANDOFF.md after every 3 slides
- If plugin disconnects, stop and tell user to re-run it
