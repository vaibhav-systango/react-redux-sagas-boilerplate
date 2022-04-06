import dates from './dates';
// assumes both are supported or none
let supportStyles = false;
new Intl.DateTimeFormat(undefined, {
  // @ts-ignore
  get dateStyle() {
    supportStyles = true;
  }

});
const dateShort = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
};
const timeShort = {
  hour: 'numeric',
  minute: 'numeric'
};

const getFormatter = (culture, options) => Intl.DateTimeFormat(culture, options).format;
/**
 * A `react-widgets` Localizer using native `Intl` APIs.
 *
 */


class IntlDateLocalizer {
  constructor({
    culture = undefined,
    firstOfWeek = 0
  } = {}) {
    this.culture = culture;

    this.firstOfWeek = () => firstOfWeek;

    function normalizeFormat(date, format) {
      return typeof format === 'function' ? format(date, culture) : date.toLocaleString(culture, format);
    }

    const formats = {
      date: getFormatter(culture, // @ts-ignore
      supportStyles ? {
        dateStyle: 'short'
      } : dateShort),
      time: getFormatter(culture, // @ts-ignore
      supportStyles ? {
        timeStyle: 'short'
      } : timeShort),
      datetime: getFormatter(culture, // @ts-ignore
      supportStyles ? {
        dateStyle: 'short',
        timeStyle: 'short'
      } : Object.assign({}, dateShort, timeShort)),
      header: getFormatter(culture, {
        month: 'short',
        year: 'numeric'
      }),
      weekday: getFormatter(culture, {
        weekday: 'narrow'
      }),
      dayOfMonth: getFormatter(culture, {
        day: '2-digit'
      }),
      month: getFormatter(culture, {
        month: 'short'
      }),
      year: getFormatter(culture, {
        year: 'numeric'
      }),
      decade: date => `${this.year(date)} - ${this.year(dates.endOf(date, 'decade'))}`,
      century: date => `${this.year(date)} - ${this.year(dates.endOf(date, 'century'))}`
    };
    Object.keys(formats).forEach(key => {
      this[key] = (date, format) => format ? normalizeFormat(date, format) : formats[key](date);
    });
  }

  toFormattedParts(date, format = {
    dateStyle: 'short',
    timeStyle: 'short'
  }) {
    return Intl.DateTimeFormat(this.culture, format).formatToParts(date).filter(p => p.type !== 'timeZoneName');
  }

  parse(value) {
    const date = new Date(value);
    return isNaN(+date) ? null : date;
  }

}

/**
 * A number localization strategy based on `Intl.NumberFormat`.
 */
class IntlNumberLocalizer {
  constructor({
    culture = undefined
  } = {}) {
    var _$toLocaleString$m;

    this.culture = culture;
    const decimal = 'formatToParts' in Intl.NumberFormat(culture) ? Intl.NumberFormat(culture).formatToParts(1.1)[1].value : ((_$toLocaleString$m = 1.1.toLocaleString(culture).match(/[^\d]/)) == null ? void 0 : _$toLocaleString$m[0]) || '.';
    const formatter = Intl.NumberFormat(culture).format;

    this.decimalCharacter = () => decimal;

    this.format = (num, format) => {
      if (format) {
        return typeof format === 'function' ? format(num, culture) : num.toLocaleString(culture, format);
      }

      return formatter(num);
    };
  }

  parse(value) {
    return parseFloat(value.replace(this.decimalCharacter(), '.'));
  }

}

export { IntlDateLocalizer as DateLocalizer, IntlNumberLocalizer as NumberLocalizer };