import PropTypes from 'prop-types';
import React from 'react';
export interface SlideDownTransitionProps {
    in: boolean;
    innerClassName?: string;
    dropUp?: boolean;
    onExit?: () => void;
    onExited?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    className?: string;
}
declare class SlideDownTransition extends React.Component<SlideDownTransitionProps> {
    static propTypes: {
        in: PropTypes.Validator<boolean>;
        innerClassName: PropTypes.Requireable<string>;
        dropUp: PropTypes.Requireable<boolean>;
        onExit: PropTypes.Requireable<(...args: any[]) => any>;
        onExited: PropTypes.Requireable<(...args: any[]) => any>;
        onEntering: PropTypes.Requireable<(...args: any[]) => any>;
        onEntered: PropTypes.Requireable<(...args: any[]) => any>;
    };
    getHeight(container: HTMLElement): number;
    setContainerHeight: (elem: HTMLElement) => void;
    clearContainerHeight: (elem: HTMLElement) => void;
    handleEntered: (elem: HTMLElement) => void;
    handleEntering: () => void;
    handleExit: (elem: HTMLElement) => void;
    handleExited: (elem: HTMLElement) => void;
    handleTransitionEnd: (el: HTMLElement, done: () => void) => void;
    render(): JSX.Element;
}
export default SlideDownTransition;
//# sourceMappingURL=SlideDownTransition.d.ts.map