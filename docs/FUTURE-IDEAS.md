# Future Ideas — decksmith

---

## Image Sources

### Splash (https://unsplash.com/developers)
- Free, high-quality stock photography via API
- Use as the default image source in `deck_generate_asset_docs` — instead of
  (or alongside) generating Midjourney/DALL-E prompts, the tool could:
  1. Suggest Unsplash search queries per slide ("bank operations", "data network", etc.)
  2. Optionally auto-fetch and embed a top result directly via the Unsplash API
- Unsplash API: free tier, 50 req/hour, no key needed for demo use
- `deck_scaffold` could include an `unsplash.ts` helper in `/src/lib/`
- IMAGE-PROMPTS.md would have both: a generation prompt AND an Unsplash search
  query fallback per image

### GitHub Copilot API for Image Generation
- Microsoft 365 + Copilot access may include image generation (DALL-E 3 backend)
- Relevant endpoint: Azure OpenAI / Copilot image generation API
  (check via Microsoft Graph or Azure OpenAI resource in M365 tenant)
- Would allow image generation without a separate Midjourney/OpenAI key —
  uses the existing Crowe M365 license
- Wire into `deck_generate_asset_docs`: add a `generate_images` flag that
  calls the Copilot image API with the prompt and saves results to `/public/images/`
- If using the Microsoft 365 MCP (already connected), could potentially trigger
  image generation from within the MCP tool call chain

---

## Integration Plan (when ready)

1. Add `image_source` param to `deck_generate_asset_docs`:
   `"prompt_only" | "unsplash" | "copilot_generate"`

2. For `unsplash`:
   - Add `unsplash_query` field alongside each image prompt in IMAGE-PROMPTS.md
   - Optional: `deck_fetch_images` tool that calls Unsplash API and drops
     results into `/public/images/` automatically

3. For `copilot_generate`:
   - Confirm available endpoint in Achyuth's M365 tenant
   - Add `deck_generate_images` tool to decksmith MCP:
     takes the IMAGE-PROMPTS array, calls Copilot/Azure OpenAI images API,
     saves to `/public/images/`, returns filenames
   - Zero new API keys needed if it runs under existing M365 auth

---

*Added: March 2026*
