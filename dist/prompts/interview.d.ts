import { z } from 'zod';
export declare const interviewSchema: z.ZodObject<{
    mode: z.ZodEnum<["full", "content_only", "visual_only"]>;
}, "strip", z.ZodTypeAny, {
    mode: "full" | "content_only" | "visual_only";
}, {
    mode: "full" | "content_only" | "visual_only";
}>;
export type InterviewInput = z.infer<typeof interviewSchema>;
export declare function getInterviewPrompt(input: InterviewInput): string;
//# sourceMappingURL=interview.d.ts.map