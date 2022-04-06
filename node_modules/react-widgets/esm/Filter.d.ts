import { TextAccessor } from './Accessors';
export declare const presets: {
    eq: (a: any, b: any) => boolean;
    contains: (a: string, b: string) => boolean;
    startsWith: (a: string, b: string) => boolean;
};
export declare type FilterFunction<TDataItem> = (item: TDataItem, searchTerm: string, idx?: number) => boolean;
export declare type FilterPreset = keyof typeof presets;
export declare type Filter<TDataItem> = boolean | FilterPreset | FilterFunction<TDataItem> | null;
export declare function useFilteredData<TDataItem>(data: readonly TDataItem[], filterer: Filter<TDataItem>, searchTerm?: string, textAccessor?: TextAccessor): readonly TDataItem[];
//# sourceMappingURL=Filter.d.ts.map