import * as dateMath from 'date-arithmetic';
export declare let isNullOrInvalid: (dte: Date | null | undefined) => boolean;
declare let dates: typeof dateMath & {
    merge(date?: Date | null | undefined, time?: Date | null | undefined, defaultDate?: Date | undefined): Date | null;
};
export default dates;
//# sourceMappingURL=dates.d.ts.map