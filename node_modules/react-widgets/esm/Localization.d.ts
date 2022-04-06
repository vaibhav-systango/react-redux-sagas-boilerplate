import React from 'react';
import { ProcessedMessages, UserProvidedMessages } from './messages';
export declare type DateTimePartType = 'day' | 'dayPeriod' | 'era' | 'hour' | 'literal' | 'minute' | 'month' | 'second' | 'weekday' | 'year' | 'millisecond';
export declare type DateTimePart = {
    type: DateTimePartType;
    value: string;
};
export declare type RequiredDateMethods = 'date' | 'time' | 'datetime' | 'header' | 'weekday' | 'dayOfMonth' | 'month' | 'year' | 'decade' | 'century';
export declare type DateLocalizer<TD> = {
    parse(dateString: string, format?: TD): Date | null;
    firstOfWeek(): number;
} & {
    [Key in RequiredDateMethods]: (date: Date, format?: TD) => string;
};
export interface NumberLocalizer<TN> {
    parse(numberString: string, format?: TN): number | null;
    decimalCharacter(): string;
    format(value: number, format?: TN): string;
}
export interface Localizer<TD = unknown, TN = unknown> {
    formatOverrides: FormatterOverrides<TD, TN>;
    messages: ProcessedMessages;
    formatDate(value: Date, formatter: RequiredDateMethods, userFormat?: TD): string;
    formatNumber(value: number, userFormat?: TN): string;
    parseDate(dateString: string, format?: TD): Date | null;
    parseNumber(numberString: string, format?: TN): number | null;
    firstOfWeek(): number;
    decimalCharacter(): string;
}
export declare type DateFormats<TFormat> = {
    [Key in RequiredDateMethods]?: TFormat;
};
export declare type FormatterOverrides<TD, TN> = DateFormats<TD> & {
    number?: TN;
};
declare type ProviderProps = {
    date?: DateLocalizer<any>;
    number?: NumberLocalizer<any>;
    messages?: UserProvidedMessages;
    children?: React.ReactNode;
};
declare const Localization: {
    ({ date, number, messages, children, }: ProviderProps): JSX.Element;
    useLocalizer: (messages?: Partial<import("./messages").Messages> | undefined, formats?: FormatterOverrides<any, any> | undefined) => Localizer<unknown, unknown>;
};
export declare const useLocalizer: (messages?: Partial<import("./messages").Messages> | undefined, formats?: FormatterOverrides<any, any> | undefined) => Localizer<unknown, unknown>;
export default Localization;
//# sourceMappingURL=Localization.d.ts.map