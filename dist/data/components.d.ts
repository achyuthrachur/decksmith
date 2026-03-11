export type ComponentEntry = {
    name: string;
    source: 'reactbits' | '21stdev' | 'framer-motion' | 'animejs';
    slug: string;
    installCmd?: string;
    bestFor: string;
};
export declare const reactbitsComponents: ComponentEntry[];
export declare const twentyFirstDevComponents: ComponentEntry[];
export declare const allComponents: ComponentEntry[];
export declare function renderComponentTable(): string;
//# sourceMappingURL=components.d.ts.map