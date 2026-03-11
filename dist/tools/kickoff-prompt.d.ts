import { z } from 'zod';
export declare const kickoffPromptSchema: z.ZodObject<{
    mode: z.ZodEnum<["full", "content_only", "visual_only"]>;
    agent: z.ZodDefault<z.ZodEnum<["claude-code", "codex", "cursor", "generic"]>>;
}, "strip", z.ZodTypeAny, {
    agent: "claude-code" | "codex" | "cursor" | "generic";
    mode: "full" | "content_only" | "visual_only";
}, {
    mode: "full" | "content_only" | "visual_only";
    agent?: "claude-code" | "codex" | "cursor" | "generic" | undefined;
}>;
export type KickoffPromptInput = z.infer<typeof kickoffPromptSchema>;
export declare function runKickoffPrompt(input: KickoffPromptInput): Promise<string>;
//# sourceMappingURL=kickoff-prompt.d.ts.map