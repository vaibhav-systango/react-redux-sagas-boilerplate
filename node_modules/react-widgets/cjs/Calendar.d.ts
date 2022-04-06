/// <reference types="react" />
import PropTypes from 'prop-types';
import { DateFormats } from './Localization';
import { RenderDayProp } from './Month';
import SlideTransitionGroup from './SlideTransitionGroup';
import { WidgetHTMLProps, WidgetProps, InferFormat } from './shared';
declare type Direction = 'DOWN' | 'UP' | 'LEFT' | 'RIGHT';
declare type SlideDirection = 'bottom' | 'top' | 'left' | 'right';
declare type View = 'month' | 'year' | 'decade' | 'century';
export interface CalendarProps<TLocalizer = unknown> extends WidgetHTMLProps, WidgetProps {
    bordered?: boolean;
    views?: View[];
    disabled?: boolean;
    readOnly?: boolean;
    value?: Date | null;
    defaultValue?: Date;
    onChange?: (nextValue: Date) => void;
    min?: Date;
    max?: Date;
    view?: View;
    defaultView?: View;
    onViewChange?: (nextView: View) => void;
    currentDate?: Date;
    defaultCurrentDate?: Date;
    onCurrentDateChange?: (nextDate: Date) => void;
    onNavigate?: (date: Date, slideDirection: SlideDirection, nextView: View) => void;
    renderDay?: RenderDayProp;
    formats?: DateFormats<InferFormat<TLocalizer>>;
    messages?: {
        moveBack?: string;
        moveForward?: string;
        moveToday?: string;
    };
}
/**
 * @public
 */
declare function Calendar({ id, autoFocus, bordered, views, tabIndex, disabled, readOnly, className, value, defaultValue, onChange, currentDate: pCurrentDate, defaultCurrentDate, onCurrentDateChange, min, max, view, defaultView, onViewChange, onKeyDown, onNavigate, renderDay, messages, formats, ...elementProps }: CalendarProps): JSX.Element;
declare namespace Calendar {
    var displayName: string;
    var propTypes: {
        /**
         * @example ['disabled', ['new Date()']]
         */
        disabled: PropTypes.Requireable<boolean>;
        /**
         * @example ['readOnly', ['new Date()']]
         */
        readOnly: PropTypes.Requireable<boolean>;
        /**
         * @example ['onChangePicker', [ ['new Date()'] ]]
         */
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * The selected Date.
         *
         * ```tsx live
         * import { Calendar } from 'react-widgets';
         *
         * <Calendar value={new Date()} />
         * ```
         * @example false
         */
        value: PropTypes.Requireable<Date>;
        /**
         * The minimum date that the Calendar can navigate from.
         *
         * @example ['prop', ['min', 'new Date()']]
         */
        min: PropTypes.Requireable<Date>;
        /**
         * The maximum date that the Calendar can navigate to.
         *
         * @example ['prop', ['max', 'new Date()']]
         */
        max: PropTypes.Requireable<Date>;
        /**
         * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
         */
        currentDate: PropTypes.Requireable<Date>;
        /**
         * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
         */
        onCurrentDateChange: PropTypes.Requireable<(...args: any[]) => any>;
        /** Specify the navigate into the past header icon */
        navigatePrevIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /** Specify the navigate into the future header icon */
        navigateNextIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
         *
         * @type {("month"|"year"|"decade"|"century")}
         * @controllable onViewChange
         */
        view(props: any, ...args: any[]): Error | null;
        /**
         * Defines a list of views the Calendar can traverse through, starting with the
         * first in the list to the last.
         *
         * @type array<"month"|"year"|"decade"|"century">
         */
        views: PropTypes.Requireable<(View | null | undefined)[]>;
        /**
         * A callback fired when the `view` changes.
         *
         * @controllable view
         */
        onViewChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Callback fired when the Calendar navigates between views, or forward and backwards in time.
         *
         * @type function(date: ?Date, direction: string, view: string)
         */
        onNavigate: PropTypes.Requireable<(...args: any[]) => any>;
        culture: PropTypes.Requireable<string>;
        autoFocus: PropTypes.Requireable<boolean>;
        /**
         * Show or hide the Calendar footer.
         *
         * @example ['prop', ['footer', true]]
         */
        footer: PropTypes.Requireable<boolean>;
        /**
         * Provide a custom component to render the days of the month. The Component is provided the following props
         *
         * - `date`: a `Date` object for the day of the month to render
         * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
         */
        renderDay: PropTypes.Requireable<(...args: any[]) => any>;
        formats: PropTypes.Requireable<PropTypes.InferProps<{
            /**
             * A formatter for the header button of the month view.
             *
             * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
             */
            header: PropTypes.Requireable<any>;
            /**
             * A formatter for the Calendar footer, formats today's Date as a string.
             *
             * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
             */
            footer: PropTypes.Requireable<any>;
            /**
             * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
             *
             * @example ['prop', { day: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
             */
            day: PropTypes.Requireable<any>;
            /**
             * A formatter for day of the month
             *
             * @example ['prop', { date: "dt => String(dt.getDate())" }]
             */
            date: PropTypes.Requireable<any>;
            /**
             * A formatter for month name.
             *
             * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
             */
            month: PropTypes.Requireable<any>;
            /**
             * A formatter for month name.
             *
             * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
             */
            year: PropTypes.Requireable<any>;
            /**
             * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
             */
            decade: PropTypes.Requireable<any>;
            /**
             * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
             */
            century: PropTypes.Requireable<any>;
        }>>;
        messages: PropTypes.Requireable<PropTypes.InferProps<{
            moveBack: PropTypes.Requireable<string>;
            moveForward: PropTypes.Requireable<string>;
        }>>;
        onKeyDown: PropTypes.Requireable<(...args: any[]) => any>;
        /** @ignore */
        tabIndex: PropTypes.Requireable<any>;
    };
    var Transition: typeof SlideTransitionGroup;
    var move: (date: Date, min: Date, max: Date, view: View, direction: Direction) => Date;
}
export default Calendar;
//# sourceMappingURL=Calendar.d.ts.map