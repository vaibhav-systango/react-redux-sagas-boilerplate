import React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
export interface StaticContainerProps {
    children: React.ReactNode;
    shouldUpdate?: boolean;
}
export declare const StaticContainer: React.MemoExoticComponent<({ children }: StaticContainerProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export interface PopupProps {
    className?: string;
    open?: boolean;
    dropUp?: boolean;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    onExiting?: () => void;
    transition?: React.ComponentType<TransitionProps>;
    role?: string;
    id?: string;
    children: React.ReactNode;
    [prop: string]: unknown;
}
declare const Popup: React.ForwardRefExoticComponent<Pick<PopupProps, keyof PopupProps> & React.RefAttributes<HTMLDivElement>>;
export default Popup;
//# sourceMappingURL=Popup.d.ts.map