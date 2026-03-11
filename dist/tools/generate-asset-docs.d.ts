import { z } from 'zod';
export declare const generateAssetDocsSchema: z.ZodObject<{
    interviewAnswers: z.ZodString;
}, "strip", z.ZodTypeAny, {
    interviewAnswers: string;
}, {
    interviewAnswers: string;
}>;
export type GenerateAssetDocsInput = z.infer<typeof generateAssetDocsSchema>;
export declare function runGenerateAssetDocs(input: GenerateAssetDocsInput): Promise<string>;
//# sourceMappingURL=generate-asset-docs.d.ts.map