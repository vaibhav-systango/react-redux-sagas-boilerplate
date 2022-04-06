import React from 'react';
import { Localizer } from './Localization';
interface Props {
    label: string;
    labelId?: string;
    upDisabled: boolean;
    prevDisabled: boolean;
    todayDisabled: boolean;
    nextDisabled: boolean;
    onViewChange: () => void;
    onMoveLeft: () => void;
    onMoveToday: () => void;
    onMoveRight: () => void;
    navigatePrevIcon?: React.ReactNode;
    navigateNextIcon?: React.ReactNode;
    localizer: Localizer;
    isRtl?: boolean;
}
declare function CalendarHeader({ localizer, label, labelId, onMoveRight, onMoveToday, onMoveLeft, onViewChange, prevDisabled, todayDisabled, upDisabled, nextDisabled, navigatePrevIcon, navigateNextIcon, }: Props): JSX.Element;
export default CalendarHeader;
//# sourceMappingURL=CalendarHeader.d.ts.map