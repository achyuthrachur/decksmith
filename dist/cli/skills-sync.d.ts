export declare function syncSkills(options: {
    target: 'claude' | 'codex';
    skillName?: string;
    dest?: string;
    force?: boolean;
    dryRun?: boolean;
    ref?: string;
}): Promise<void>;
export declare function listSkills(options: {
    mode: 'remote' | 'claude' | 'codex';
}): Promise<void>;
export declare function handleSkillsCommand(args: string[]): Promise<void>;
//# sourceMappingURL=skills-sync.d.ts.map