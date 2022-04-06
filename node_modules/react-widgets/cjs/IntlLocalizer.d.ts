import { DateLocalizer, DateTimePart, NumberLocalizer } from './Localization';
declare type UserDateFormat = Intl.DateTimeFormatOptions | ((date: Date, culture?: string) => string);
/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */
declare class IntlDateLocalizer implements DateLocalizer<Intl.DateTimeFormatOptions> {
    culture?: string;
    firstOfWeek: () => number;
    date: (date: Date, format?: UserDateFormat) => string;
    time: (date: Date, format?: UserDateFormat) => string;
    datetime: (date: Date, format?: UserDateFormat) => string;
    header: (date: Date, format?: UserDateFormat) => string;
    footer: (date: Date, format?: UserDateFormat) => string;
    weekday: (date: Date, format?: UserDateFormat) => string;
    dayOfMonth: (date: Date, format?: UserDateFormat) => string;
    month: (date: Date, format?: UserDateFormat) => string;
    year: (date: Date, format?: UserDateFormat) => string;
    decade: (date: Date, format?: UserDateFormat) => string;
    century: (date: Date, format?: UserDateFormat) => string;
    constructor({ culture, firstOfWeek, }?: {
        culture?: string;
        firstOfWeek?: number;
    });
    toFormattedParts(date: Date, format?: Intl.DateTimeFormatOptions): DateTimePart[];
    parse(value: string): Date | null;
}
declare type UserNumberFormat = Intl.NumberFormatOptions | ((num: number, culture?: string) => string);
/**
 * A number localization strategy based on `Intl.NumberFormat`.
 */
declare class IntlNumberLocalizer implements NumberLocalizer<Intl.NumberFormatOptions> {
    culture?: string;
    decimalCharacter: () => string;
    format: (num: number, format?: UserNumberFormat) => string;
    constructor({ culture }?: {
        culture?: undefined;
    });
    parse(value: string): number;
}
export { IntlDateLocalizer as DateLocalizer, IntlNumberLocalizer as NumberLocalizer, };
//# sourceMappingURL=IntlLocalizer.d.ts.map