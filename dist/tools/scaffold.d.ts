import { z } from 'zod';
export declare const scaffoldSchema: z.ZodObject<{
    projectPath: z.ZodString;
    deckTitle: z.ZodString;
    client: z.ZodOptional<z.ZodString>;
    theme: z.ZodDefault<z.ZodEnum<["dark", "light"]>>;
    agent: z.ZodDefault<z.ZodEnum<["claude-code", "codex", "cursor", "generic"]>>;
}, "strip", z.ZodTypeAny, {
    projectPath: string;
    deckTitle: string;
    theme: "dark" | "light";
    agent: "claude-code" | "codex" | "cursor" | "generic";
    client?: string | undefined;
}, {
    projectPath: string;
    deckTitle: string;
    client?: string | undefined;
    theme?: "dark" | "light" | undefined;
    agent?: "claude-code" | "codex" | "cursor" | "generic" | undefined;
}>;
export type ScaffoldInput = z.infer<typeof scaffoldSchema>;
export declare function runScaffold(input: ScaffoldInput): Promise<string>;
//# sourceMappingURL=scaffold.d.ts.map