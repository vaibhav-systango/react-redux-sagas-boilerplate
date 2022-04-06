/// <reference types="react" />
import { FocusManagerOptions } from '@restart/hooks/useFocusManager';
interface Props {
    disabled?: boolean;
    onBlur?: React.FocusEventHandler;
    onFocus?: React.FocusEventHandler;
}
export default function useFocusManager(ref: React.RefObject<Element>, props?: Props, opts?: Omit<FocusManagerOptions, 'onChange' | 'isDisabled'>): readonly [import("@restart/hooks/useFocusManager").FocusController, boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>];
export {};
//# sourceMappingURL=useFocusManager.d.ts.map