import { z } from 'zod';
export declare const qualityCheckSchema: z.ZodObject<{
    projectPath: z.ZodString;
}, "strip", z.ZodTypeAny, {
    projectPath: string;
}, {
    projectPath: string;
}>;
export type QualityCheckInput = z.infer<typeof qualityCheckSchema>;
export declare function runQualityCheck(input: QualityCheckInput): Promise<string>;
//# sourceMappingURL=quality-check.d.ts.map