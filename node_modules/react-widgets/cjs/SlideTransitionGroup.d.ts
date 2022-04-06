import PropTypes from 'prop-types';
import React from 'react';
interface SlideTransitionGroupProps {
    onTransitionEnd: (node: ChildNode, hadFocus: boolean | null) => void;
    direction: 'left' | 'right' | 'top' | 'bottom';
}
interface SlideTransitionGroupState {
    prevClasses: string;
    currentClasses: string;
}
declare class SlideTransitionGroup extends React.Component<SlideTransitionGroupProps, SlideTransitionGroupState> {
    static defaultProps: {
        direction: string;
    };
    static propTypes: {
        direction: PropTypes.Requireable<string>;
        onTransitionEnd: PropTypes.Requireable<(...args: any[]) => any>;
    };
    isTransitioning?: boolean;
    container: React.RefObject<HTMLDivElement>;
    current: React.ReactElement;
    flush?: boolean;
    prev?: React.ReactElement | null;
    constructor(args: SlideTransitionGroupProps);
    componentDidUpdate(): void;
    handleTransitionEnd: (hadFocus: boolean | null) => void;
    render(): JSX.Element;
}
export default SlideTransitionGroup;
//# sourceMappingURL=SlideTransitionGroup.d.ts.map