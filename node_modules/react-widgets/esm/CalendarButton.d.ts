import * as React from 'react';
import { ReactNode } from 'react';
export interface Props extends React.HTMLProps<HTMLButtonElement> {
    label?: string;
    icon?: ReactNode;
    busy?: boolean;
    spinner?: ReactNode;
    children?: ReactNode;
}
declare function CalendarButton({ className, ...props }: Props): JSX.Element;
export default CalendarButton;
//# sourceMappingURL=CalendarButton.d.ts.map