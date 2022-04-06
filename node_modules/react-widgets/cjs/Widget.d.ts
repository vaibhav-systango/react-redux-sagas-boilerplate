import React from 'react';
export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    focused?: boolean;
    open?: boolean;
    dropUp?: boolean;
    autofilling?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}
export declare function useWidgetProps(props: WidgetProps): {
    tabIndex: number;
    'data-intent': string;
    className: string;
};
declare const Widget: React.ForwardRefExoticComponent<WidgetProps & React.RefAttributes<HTMLDivElement>>;
export default Widget;
//# sourceMappingURL=Widget.d.ts.map