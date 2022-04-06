import { GroupBy } from './List';
export declare function toItemArray<TDataItem>(a?: readonly TDataItem[] | boolean): readonly TDataItem[];
export declare const makeArray: <T>(obj: T | readonly T[] | null | undefined, excludeNull?: boolean) => T[];
export declare const has: <T>(o: T, key: string) => boolean;
export declare function chunk<T>(array: readonly T[], chunkSize: number): Array<T[]>;
export declare function groupBySortedKeys<TData>(groupBy: GroupBy<TData>, data: readonly TData[], _keys?: unknown[]): [unknown, TData[]][];
//# sourceMappingURL=_.d.ts.map