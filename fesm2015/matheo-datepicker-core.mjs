import * as i1 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i0 from '@angular/core';
import { isDevMode, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter as DateAdapter$1, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Adapts type `D` to be usable as a date by cdk-based components that work with dates. */
class DateAdapter {
    constructor() {
        this._localeChanges = new Subject();
        /** A stream that emits when the locale changes. */
        this.localeChanges = this._localeChanges;
    }
    /**
     * Given a potential date object, returns that same date object if it is
     * a valid date, or `null` if it's not a valid date.
     * @param obj The object to check.
     * @returns A date or `null`.
     */
    getValidDateOrNull(obj) {
        return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
    }
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of its `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value) {
        if (value == null || this.isDateInstance(value) && this.isValid(value)) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @param unit Unit deep of the comparision.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second, unit = 'minute') {
        let d1 = this.getYear(first).toString();
        let d2 = this.getYear(second).toString();
        if (['y', 'year', 'years'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getMonth(first).toString().padStart(2, '0');
        d2 += this.getMonth(second).toString().padStart(2, '0');
        if (['M', 'month', 'months'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getDate(first).toString().padStart(2, '0');
        d2 += this.getDate(second).toString().padStart(2, '0');
        if (['d', 'day', 'days'].includes(unit)) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getHours(first).toString().padStart(2, '0');
        d2 += this.getHours(second).toString().padStart(2, '0');
        if (['h', 'hour', 'hours'].indexOf(unit) >= 0) {
            return Number(d1) - Number(d2);
        }
        d1 += this.getMinutes(first).toString().padStart(2, '0');
        d2 += this.getMinutes(second).toString().padStart(2, '0');
        return Number(d1) - Number(d2);
    }
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second, unit = 'minute') {
        if (first && second) {
            let firstValid = this.isValid(first);
            let secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDate(first, second, unit);
            }
            return firstValid == secondValid;
        }
        return first == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max, unit = 'minute') {
        if (min && this.compareDate(date, min, unit) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max, unit) > 0) {
            return max;
        }
        return date;
    }
}

// TODO(mmalerba): Remove when we no longer support safari 9.
/** Whether the browser supports the Intl API. */
let SUPPORTS_INTL_API;
// We need a try/catch around the reference to `Intl`, because accessing it in some cases can
// cause IE to throw. These cases are tied to particular versions of Windows and can happen if
// the consumer is providing a polyfilled `Map`. See:
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687
try {
    SUPPORTS_INTL_API = typeof Intl != 'undefined';
}
catch (_a) {
    SUPPORTS_INTL_API = false;
}
/** The default month names to use if Intl API is not available. */
const DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));
/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, i => i === 0 ? '00' : String(i));
/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, String);
/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */
class NativeDateAdapter extends DateAdapter {
    constructor(matDateLocale, platform) {
        super();
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         *
         * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
         * getting the string representation of a Date object from its utc representation. We're keeping
         * it here for sometime, just for precaution, in case we decide to revert some of these changes
         * though.
         */
        this.useUtcForDisplay = true;
        super.setLocale(matDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth();
    }
    getDate(date) {
        return date.getDate();
    }
    getHours(date) {
        return date.getHours();
    }
    setHours(date, value) {
        const clone = this.clone(date);
        clone.setHours(value);
        return clone;
    }
    getMinutes(date) {
        return date.getMinutes();
    }
    setMinutes(date, value) {
        const clone = this.clone(date);
        clone.setMinutes(value);
        return clone;
    }
    getSeconds(date) {
        return date.getSeconds();
    }
    setSeconds(date, value, ms) {
        const clone = this.clone(date);
        clone.setSeconds(value, ms);
        return clone;
    }
    getMilliseconds(date) {
        return date.getMilliseconds();
    }
    getDayOfWeek(date) {
        return date.getDay();
    }
    getMonthNames(style) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
            return range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
            return range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DATE_NAMES;
    }
    getHourNames() {
        return DEFAULT_HOUR_NAMES;
    }
    getMinuteNames() {
        return DEFAULT_MINUTE_NAMES;
    }
    getDayOfWeekNames(style) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
            return range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    clone(date) {
        return new Date(date.getTime());
    }
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        if (isDevMode()) {
            // Check for invalid month and date (except upper bound on date which we have to check after
            // creating the Date).
            if (month < 0 || month > 11) {
                throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
            }
            if (date < 1) {
                throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
            }
        }
        let result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds, ms);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() != month && (isDevMode())) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    today() {
        return new Date();
    }
    parse(value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value == 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            // On IE and Edge the i18n API will throw a hard error that can crash the entire app
            // if we attempt to format a date whose year is less than 1 or greater than 9999.
            if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = Object.assign(Object.assign({}, displayFormat), { timeZone: 'utc' });
            const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    addCalendarMonths(date, months) {
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    }
    addCalendarHours(date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date));
    }
    addCalendarMinutes(date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date));
    }
    addCalendarSeconds(date, seconds, ms) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date) + seconds, this.getMilliseconds(date) + ms);
    }
    toIso8601(date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                let date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    isValid(date) {
        return !isNaN(date.getTime());
    }
    invalid() {
        return new Date(NaN);
    }
    /** Creates a date but allows the month and date to overflow. */
    _createDateWithOverflow(year, month, date, hours = 0, minutes = 0, seconds = 0, ms = 0) {
        // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
        // To work around this we use `setFullYear` and `setHours` instead.
        const d = new Date();
        d.setFullYear(year, month, date);
        d.setHours(hours, minutes, seconds, ms);
        return d;
    }
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    _format(dtf, date) {
        // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
        // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
        const d = new Date();
        d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return dtf.format(d);
    }
}
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter, deps: [{ token: MAT_DATE_LOCALE, optional: true }, { token: i1.Platform }], target: i0.????FactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MAT_DATE_LOCALE]
                    }] }, { type: i1.Platform }];
    } });

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: null,
        datetimeInput: null,
        timeInput: null,
        monthInput: null,
        yearInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        datetimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        },
        timeInput: { hour: 'numeric', minute: 'numeric' },
        monthInput: { month: 'short', year: 'numeric' },
        yearInput: { year: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthLabel: { month: 'short' },
        monthDayLabel: { month: 'short', day: 'numeric' },
        monthDayA11yLabel: { month: 'long', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
        timeLabel: { hours: 'numeric', minutes: 'numeric' },
    }
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class NativeDateModule {
}
/** @nocollapse */ /** @nocollapse */ NativeDateModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ NativeDateModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, imports: [PlatformModule] });
/** @nocollapse */ /** @nocollapse */ NativeDateModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: DateAdapter$1, useClass: NativeDateAdapter },
    ], imports: [[PlatformModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PlatformModule],
                    providers: [
                        { provide: DateAdapter, useClass: NativeDateAdapter },
                        { provide: DateAdapter$1, useClass: NativeDateAdapter },
                    ],
                }]
        }] });
class MatNativeDateModule {
}
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, deps: [], target: i0.????FactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, imports: [NativeDateModule] });
/** @nocollapse */ /** @nocollapse */ MatNativeDateModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }], imports: [[NativeDateModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MatNativeDateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DateAdapter, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter, NativeDateModule };
//# sourceMappingURL=matheo-datepicker-core.mjs.map
