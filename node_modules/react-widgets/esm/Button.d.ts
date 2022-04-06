import * as React from 'react';
import { ReactNode } from 'react';
export interface Props extends React.HTMLProps<HTMLButtonElement> {
    label?: string;
    icon?: ReactNode;
    busy?: boolean;
    spinner?: ReactNode;
    children?: ReactNode;
}
declare function Button({ className, disabled, label, icon, busy, children, spinner, ...props }: Props): JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map