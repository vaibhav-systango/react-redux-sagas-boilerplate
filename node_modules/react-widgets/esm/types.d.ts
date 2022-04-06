/// <reference types="react" />
export declare type DataItem = unknown;
export declare type Value = unknown;
export declare type RenderProp<TArg> = (arg: TArg) => React.ReactNode;
export interface WidgetHandle {
    focus(opts?: FocusOptions): void;
}
export declare type SearchMetadata = {
    action: 'clear' | 'input';
    lastSearchTerm?: string;
    originalEvent?: React.SyntheticEvent;
};
//# sourceMappingURL=types.d.ts.map