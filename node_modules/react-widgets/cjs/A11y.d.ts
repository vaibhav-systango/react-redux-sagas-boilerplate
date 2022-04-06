import { RefObject } from 'react';
/**
 * Do a "hard" set on the aria, so that it's always announced
 * even if the id hasn't changed, this saves us from having to have a different id
 * per item.
 */
export declare const setActiveDescendant: (ref: Element | null, activeId: string) => void;
export declare const useActiveDescendant: (ref: RefObject<Element>, id: string, visible: boolean | null | undefined, deps: any[]) => void;
//# sourceMappingURL=A11y.d.ts.map