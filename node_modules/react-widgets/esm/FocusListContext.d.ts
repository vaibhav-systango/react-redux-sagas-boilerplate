import React from 'react';
import { TextAccessorFn } from './Accessors';
declare type FocusListContext = {
    focusedItem: any | undefined;
    activeId?: string;
    map: WeakMap<HTMLElement, any>;
};
export declare const FocusListContext: React.Context<FocusListContext | null>;
export interface FocusProps {
    children: any;
    textAccessor: TextAccessorFn;
}
export interface FocusList<TDataItem = unknown> {
    size(): number;
    focus: (el: HTMLElement | null | undefined) => void;
    first: () => HTMLElement | undefined;
    last: () => HTMLElement | undefined;
    prev(opts?: FocusOptions): HTMLElement | undefined;
    next(opts?: FocusOptions): HTMLElement | undefined;
    hasFocused: () => boolean;
    getFocused: () => TDataItem | undefined;
    toDataItem: (el: HTMLElement) => TDataItem | undefined;
    context: FocusListContext;
    get(): [HTMLElement[], HTMLElement | undefined];
}
interface FocusOptions {
    behavior?: 'clear' | 'stop' | 'loop';
}
interface FocusListOptions<TDataItem> {
    scope: React.MutableRefObject<HTMLElement | null>;
    anchorItem?: TDataItem;
    focusFirstItem?: boolean;
    scopeSelector?: string;
    activeId?: string;
}
export declare function useListOption<TDataItem, T extends HTMLElement>(dataItem: TDataItem): readonly [React.RefObject<T>, boolean, string | undefined];
export declare const useFocusList: <TDataItem>({ scope: listRef, anchorItem, focusFirstItem, scopeSelector, activeId, }: FocusListOptions<TDataItem>) => FocusList<TDataItem>;
export {};
//# sourceMappingURL=FocusListContext.d.ts.map