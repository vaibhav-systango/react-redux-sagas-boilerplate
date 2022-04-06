import * as React from 'react';
import { ReactNode } from 'react';
export interface Props extends React.HTMLProps<HTMLSpanElement> {
    icon?: ReactNode;
    spinner?: ReactNode;
    visible?: boolean;
    busy?: boolean;
}
declare const DropdownCaret: ({ className, busy, visible, icon, spinner, ...props }: Props) => JSX.Element;
export default DropdownCaret;
//# sourceMappingURL=PickerCaret.d.ts.map