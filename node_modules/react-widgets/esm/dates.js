import * as dateMath from 'date-arithmetic';
export let isNullOrInvalid = dte => dte == null || isNaN(+dte);
let dates = Object.assign({}, dateMath, {
  merge(date, time, defaultDate) {
    if (isNullOrInvalid(time) && isNullOrInvalid(date) == null) return null;
    if (isNullOrInvalid(time)) time = defaultDate || new Date();
    if (isNullOrInvalid(date)) date = defaultDate || new Date();
    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  }

});
export default dates;