/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, Optional, isDevMode } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from './date-adapter';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
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
catch {
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
export class NativeDateAdapter extends DateAdapter {
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
            displayFormat = { ...displayFormat, timeZone: 'utc' };
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
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.ɵfac = function NativeDateAdapter_Factory(t) { return new (t || NativeDateAdapter)(i0.ɵɵinject(MAT_DATE_LOCALE, 8), i0.ɵɵinject(i1.Platform)); };
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: NativeDateAdapter, factory: NativeDateAdapter.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NativeDateAdapter, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAT_DATE_LOCALE]
            }] }, { type: i1.Platform }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9jb3JlL2RhdGV0aW1lL25hdGl2ZS1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTNDLDZEQUE2RDtBQUM3RCxpREFBaUQ7QUFDakQsSUFBSSxpQkFBMEIsQ0FBQztBQUUvQiw2RkFBNkY7QUFDN0YsOEZBQThGO0FBQzlGLHFEQUFxRDtBQUNyRCxzREFBc0Q7QUFDdEQscURBQXFEO0FBQ3JELElBQUk7SUFDRixpQkFBaUIsR0FBRyxPQUFPLElBQUksSUFBSSxXQUFXLENBQUM7Q0FDaEQ7QUFBQyxNQUFNO0lBQ04saUJBQWlCLEdBQUcsS0FBSyxDQUFDO0NBQzNCO0FBRUQsbUVBQW1FO0FBQ25FLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXO1FBQ3JGLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVTtLQUNsQztJQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxL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QzdGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDOzt3SEE3V1UsaUJBQWlCLGNBaUJJLGVBQWU7eUhBakJwQyxpQkFBaUIsV0FBakIsaUJBQWlCO3VGQUFqQixpQkFBaUI7Y0FEN0IsVUFBVTs7c0JBa0JJLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01BVF9EQVRFX0xPQ0FMRX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7RGF0ZUFkYXB0ZXJ9IGZyb20gJy4vZGF0ZS1hZGFwdGVyJztcclxuXHJcbi8vIFRPRE8obW1hbGVyYmEpOiBSZW1vdmUgd2hlbiB3ZSBubyBsb25nZXIgc3VwcG9ydCBzYWZhcmkgOS5cclxuLyoqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEludGwgQVBJLiAqL1xyXG5sZXQgU1VQUE9SVFNfSU5UTF9BUEk6IGJvb2xlYW47XHJcblxyXG4vLyBXZSBuZWVkIGEgdHJ5L2NhdGNoIGFyb3VuZCB0aGUgcmVmZXJlbmNlIHRvIGBJbnRsYCwgYmVjYXVzZSBhY2Nlc3NpbmcgaXQgaW4gc29tZSBjYXNlcyBjYW5cclxuLy8gY2F1c2UgSUUgdG8gdGhyb3cuIFRoZXNlIGNhc2VzIGFyZSB0aWVkIHRvIHBhcnRpY3VsYXIgdmVyc2lvbnMgb2YgV2luZG93cyBhbmQgY2FuIGhhcHBlbiBpZlxyXG4vLyB0aGUgY29uc3VtZXIgaXMgcHJvdmlkaW5nIGEgcG9seWZpbGxlZCBgTWFwYC4gU2VlOlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0NoYWtyYUNvcmUvaXNzdWVzLzMxODlcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTU2ODdcclxudHJ5IHtcclxuICBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9ICd1bmRlZmluZWQnO1xyXG59IGNhdGNoIHtcclxuICBTVVBQT1JUU19JTlRMX0FQSSA9IGZhbHNlO1xyXG59XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfTU9OVEhfTkFNRVMgPSB7XHJcbiAgJ2xvbmcnOiBbXHJcbiAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLFxyXG4gICAgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXHJcbiAgXSxcclxuICAnc2hvcnQnOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXHJcbiAgJ25hcnJvdyc6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXVxyXG59O1xyXG5cclxuXHJcbi8qKiBUaGUgZGVmYXVsdCBkYXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX0RBVEVfTkFNRVMgPSByYW5nZSgzMSwgaSA9PiBTdHJpbmcoaSArIDEpKTtcclxuXHJcbi8qKiBUaGUgZGVmYXVsdCBob3VyIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX0hPVVJfTkFNRVMgPSByYW5nZSgyNCwgaSA9PiBpID09PSAwID8gJzAwJyA6IFN0cmluZyhpKSk7XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgbWludXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX01JTlVURV9OQU1FUyA9IHJhbmdlKDYwLCBTdHJpbmcpO1xyXG5cclxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FUyA9IHtcclxuICAnbG9uZyc6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcclxuICAnc2hvcnQnOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxyXG4gICduYXJyb3cnOiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNYXRjaGVzIHN0cmluZ3MgdGhhdCBoYXZlIHRoZSBmb3JtIG9mIGEgdmFsaWQgUkZDIDMzMzkgc3RyaW5nXHJcbiAqIChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSkuIE5vdGUgdGhhdCB0aGUgc3RyaW5nIG1heSBub3QgYWN0dWFsbHkgYmUgYSB2YWxpZCBkYXRlXHJcbiAqIGJlY2F1c2UgdGhlIHJlZ2V4IHdpbGwgbWF0Y2ggc3RyaW5ncyBhbiB3aXRoIG91dCBvZiBib3VuZHMgbW9udGgsIGRhdGUsIGV0Yy5cclxuICovXHJcbmNvbnN0IElTT184NjAxX1JFR0VYID1cclxuICAgIC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0oPzpUXFxkezJ9OlxcZHsyfTpcXGR7Mn0oPzpcXC5cXGQrKT8oPzpafCg/Oig/OlxcK3wtKVxcZHsyfTpcXGR7Mn0pKT8pPyQvO1xyXG5cclxuXHJcbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cclxuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcclxuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWVzQXJyYXk7XHJcbn1cclxuXHJcbi8qKiBBZGFwdHMgdGhlIG5hdGl2ZSBKUyBEYXRlIGZvciB1c2Ugd2l0aCBjZGstYmFzZWQgY29tcG9uZW50cyB0aGF0IHdvcmsgd2l0aCBkYXRlcy4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxEYXRlPiB7XHJcbiAgLyoqIFdoZXRoZXIgdG8gY2xhbXAgdGhlIGRhdGUgYmV0d2VlbiAxIGFuZCA5OTk5IHRvIGF2b2lkIElFIGFuZCBFZGdlIGVycm9ycy4gKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF9jbGFtcERhdGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cclxuICAgKiBXaXRob3V0IHRoaXMgYEludGwuRGF0ZVRpbWVGb3JtYXRgIHNvbWV0aW1lcyBjaG9vc2VzIHRoZSB3cm9uZyB0aW1lWm9uZSwgd2hpY2ggY2FuIHRocm93IG9mZlxyXG4gICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcclxuICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cclxuICAgKlxyXG4gICAqIFRPRE8obW1hbGVyYmEpOiBkcm9wIHRoaXMgdmFyaWFibGUuIEl0J3Mgbm90IGJlaW5nIHVzZWQgaW4gdGhlIGNvZGUgcmlnaHQgbm93LiBXZSdyZSBub3dcclxuICAgKiBnZXR0aW5nIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBEYXRlIG9iamVjdCBmcm9tIGl0cyB1dGMgcmVwcmVzZW50YXRpb24uIFdlJ3JlIGtlZXBpbmdcclxuICAgKiBpdCBoZXJlIGZvciBzb21ldGltZSwganVzdCBmb3IgcHJlY2F1dGlvbiwgaW4gY2FzZSB3ZSBkZWNpZGUgdG8gcmV2ZXJ0IHNvbWUgb2YgdGhlc2UgY2hhbmdlc1xyXG4gICAqIHRob3VnaC5cclxuICAgKi9cclxuICB1c2VVdGNGb3JEaXNwbGF5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9MT0NBTEUpIG1hdERhdGVMb2NhbGU6IHN0cmluZywgcGxhdGZvcm06IFBsYXRmb3JtKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0TG9jYWxlKG1hdERhdGVMb2NhbGUpO1xyXG5cclxuICAgIC8vIElFIGRvZXMgaXRzIG93biB0aW1lIHpvbmUgY29ycmVjdGlvbiwgc28gd2UgZGlzYWJsZSB0aGlzIG9uIElFLlxyXG4gICAgdGhpcy51c2VVdGNGb3JEaXNwbGF5ID0gIXBsYXRmb3JtLlRSSURFTlQ7XHJcbiAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcclxuICB9XHJcblxyXG4gIGdldERhdGUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VycyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VycyhkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XHJcbiAgICBjbG9uZS5zZXRIb3Vycyh2YWx1ZSk7XHJcbiAgICByZXR1cm4gY2xvbmU7XHJcbiAgfVxyXG5cclxuICBnZXRNaW51dGVzKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xyXG4gIH1cclxuXHJcbiAgc2V0TWludXRlcyhkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XHJcbiAgICBjbG9uZS5zZXRNaW51dGVzKHZhbHVlKTtcclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcblxyXG4gIGdldFNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWNvbmRzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIG1zPzogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XHJcbiAgICBjbG9uZS5zZXRTZWNvbmRzKHZhbHVlLCBtcyk7XHJcbiAgICByZXR1cm4gY2xvbmU7XHJcbiAgfVxyXG5cclxuICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcclxuICB9XHJcblxyXG4gIGdldERheU9mV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldERheSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xyXG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7bW9udGg6IHN0eWxlLCB0aW1lWm9uZTogJ3V0Yyd9KTtcclxuICAgICAgcmV0dXJuIHJhbmdlKDEyLCBpID0+XHJcbiAgICAgICAgICB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCBpLCAxKSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBERUZBVUxUX01PTlRIX05BTUVTW3N0eWxlXTtcclxuICB9XHJcblxyXG4gIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XHJcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcclxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtkYXk6ICdudW1lcmljJywgdGltZVpvbmU6ICd1dGMnfSk7XHJcbiAgICAgIHJldHVybiByYW5nZSgzMSwgaSA9PiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcclxuICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIDAsIGkgKyAxKSkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBERUZBVUxUX0RBVEVfTkFNRVM7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIERFRkFVTFRfSE9VUl9OQU1FUztcclxuICB9XHJcblxyXG4gIGdldE1pbnV0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiBERUZBVUxUX01JTlVURV9OQU1FUztcclxuICB9XHJcblxyXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XHJcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcclxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHt3ZWVrZGF5OiBzdHlsZSwgdGltZVpvbmU6ICd1dGMnfSk7XHJcbiAgICAgIHJldHVybiByYW5nZSg3LCBpID0+IHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxyXG4gICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVNbc3R5bGVdO1xyXG4gIH1cclxuXHJcbiAgZ2V0WWVhck5hbWUoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcclxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHt5ZWFyOiAnbnVtZXJpYycsIHRpbWVab25lOiAndXRjJ30pO1xyXG4gICAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgZGF0ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLmdldFllYXIoZGF0ZSkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcclxuICAgIC8vIFdlIGNhbid0IHRlbGwgdXNpbmcgbmF0aXZlIEpTIERhdGUgd2hhdCB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIGlzLCB3ZSBkZWZhdWx0IHRvIFN1bmRheS5cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREYXRlKHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXHJcbiAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLCB0aGlzLmdldE1vbnRoKGRhdGUpICsgMSwgMCkpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoZGF0ZTogRGF0ZSk6IERhdGUge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURhdGUoXHJcbiAgICB5ZWFyOiBudW1iZXIsXHJcbiAgICBtb250aDogbnVtYmVyLFxyXG4gICAgZGF0ZTogbnVtYmVyLFxyXG4gICAgaG91cnM6IG51bWJlciA9IDAsXHJcbiAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxyXG4gICAgc2Vjb25kczogbnVtYmVyID0gMCxcclxuICAgIG1zOiBudW1iZXIgPSAwLFxyXG4gICk6IERhdGUge1xyXG4gICAgaWYgKGlzRGV2TW9kZSgpKSB7XHJcbiAgICAgIC8vIENoZWNrIGZvciBpbnZhbGlkIG1vbnRoIGFuZCBkYXRlIChleGNlcHQgdXBwZXIgYm91bmQgb24gZGF0ZSB3aGljaCB3ZSBoYXZlIHRvIGNoZWNrIGFmdGVyXHJcbiAgICAgIC8vIGNyZWF0aW5nIHRoZSBEYXRlKS5cclxuICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGUgPCAxKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyh5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1zKTtcclxuICAgIC8vIENoZWNrIHRoYXQgdGhlIGRhdGUgd2Fzbid0IGFib3ZlIHRoZSB1cHBlciBib3VuZCBmb3IgdGhlIG1vbnRoLCBjYXVzaW5nIHRoZSBtb250aCB0byBvdmVyZmxvd1xyXG4gICAgaWYgKHJlc3VsdC5nZXRNb250aCgpICE9IG1vbnRoICYmIChpc0Rldk1vZGUoKSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHRvZGF5KCk6IERhdGUge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKCk7XHJcbiAgfVxyXG5cclxuICBwYXJzZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xyXG4gICAgLy8gV2UgaGF2ZSBubyB3YXkgdXNpbmcgdGhlIG5hdGl2ZSBKUyBEYXRlIHRvIHNldCB0aGUgcGFyc2UgZm9ybWF0IG9yIGxvY2FsZSwgc28gd2UgaWdub3JlIHRoZXNlXHJcbiAgICAvLyBwYXJhbWV0ZXJzLlxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gbmV3IERhdGUoRGF0ZS5wYXJzZSh2YWx1ZSkpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBPYmplY3QpOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ05hdGl2ZURhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcclxuICAgICAgLy8gT24gSUUgYW5kIEVkZ2UgdGhlIGkxOG4gQVBJIHdpbGwgdGhyb3cgYSBoYXJkIGVycm9yIHRoYXQgY2FuIGNyYXNoIHRoZSBlbnRpcmUgYXBwXHJcbiAgICAgIC8vIGlmIHdlIGF0dGVtcHQgdG8gZm9ybWF0IGEgZGF0ZSB3aG9zZSB5ZWFyIGlzIGxlc3MgdGhhbiAxIG9yIGdyZWF0ZXIgdGhhbiA5OTk5LlxyXG4gICAgICBpZiAodGhpcy5fY2xhbXBEYXRlICYmIChkYXRlLmdldEZ1bGxZZWFyKCkgPCAxIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSA+IDk5OTkpKSB7XHJcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XHJcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihNYXRoLm1heCgxLCBNYXRoLm1pbig5OTk5LCBkYXRlLmdldEZ1bGxZZWFyKCkpKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRpc3BsYXlGb3JtYXQgPSB7Li4uZGlzcGxheUZvcm1hdCwgdGltZVpvbmU6ICd1dGMnfTtcclxuXHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCBkaXNwbGF5Rm9ybWF0KTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhkYXRlLnRvRGF0ZVN0cmluZygpKTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRGF0ZSwgeWVhcnM6IG51bWJlcik6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkQ2FsZW5kYXJNb250aHMoZGF0ZSwgeWVhcnMgKiAxMik7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBEYXRlLCBtb250aHM6IG51bWJlcik6IERhdGUge1xyXG4gICAgbGV0IG5ld0RhdGUgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxyXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyBtb250aHMsXHJcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcclxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSksXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEl0J3MgcG9zc2libGUgdG8gd2luZCB1cCBpbiB0aGUgd3JvbmcgbW9udGggaWYgdGhlIG9yaWdpbmFsIG1vbnRoIGhhcyBtb3JlIGRheXMgdGhhbiB0aGUgbmV3XHJcbiAgICAvLyBtb250aC4gSW4gdGhpcyBjYXNlIHdlIHdhbnQgdG8gZ28gdG8gdGhlIGxhc3QgZGF5IG9mIHRoZSBkZXNpcmVkIG1vbnRoLlxyXG4gICAgLy8gTm90ZTogdGhlIGFkZGl0aW9uYWwgKyAxMiAlIDEyIGVuc3VyZXMgd2UgZW5kIHVwIHdpdGggYSBwb3NpdGl2ZSBudW1iZXIsIHNpbmNlIEpTICUgZG9lc24ndFxyXG4gICAgLy8gZ3VhcmFudGVlIHRoaXMuXHJcbiAgICBpZiAodGhpcy5nZXRNb250aChuZXdEYXRlKSAhPSAoKHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyBtb250aHMpICUgMTIgKyAxMikgJSAxMikge1xyXG4gICAgICBuZXdEYXRlID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyh0aGlzLmdldFllYXIobmV3RGF0ZSksIHRoaXMuZ2V0TW9udGgobmV3RGF0ZSksIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXdEYXRlO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXHJcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcclxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpICsgZGF5cyxcclxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJIb3VycyhkYXRlOiBEYXRlLCBob3VyczogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSkgKyBob3VycyxcclxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJNaW51dGVzKGRhdGU6IERhdGUsIG1pbnV0ZXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXHJcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcclxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSkgKyBtaW51dGVzLFxyXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJTZWNvbmRzKGRhdGU6IERhdGUsIHNlY29uZHM6IG51bWJlciwgbXM/OiBudW1iZXIpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxyXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcclxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSkgKyBzZWNvbmRzLFxyXG4gICAgICB0aGlzLmdldE1pbGxpc2Vjb25kcyhkYXRlKSArIG1zLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvSXNvODYwMShkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcclxuICAgICAgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLFxyXG4gICAgICB0aGlzLl8yZGlnaXQoZGF0ZS5nZXRVVENEYXRlKCkpXHJcbiAgICBdLmpvaW4oJy0nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgRGF0ZSBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xyXG4gICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGludG8gdmFsaWQgRGF0ZXMgYW5kIGVtcHR5IHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW5cclxuICAgKiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXHJcbiAgICovXHJcbiAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IERhdGUgfCBudWxsIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICAvLyBUaGUgYERhdGVgIGNvbnN0cnVjdG9yIGFjY2VwdHMgZm9ybWF0cyBvdGhlciB0aGFuIElTTyA4NjAxLCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGVcclxuICAgICAgLy8gc3RyaW5nIGlzIHRoZSByaWdodCBmb3JtYXQgZmlyc3QuXHJcbiAgICAgIGlmIChJU09fODYwMV9SRUdFWC50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcclxuICAgICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KSB7XHJcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRGF0ZTtcclxuICB9XHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogRGF0ZSkge1xyXG4gICAgcmV0dXJuICFpc05hTihkYXRlLmdldFRpbWUoKSk7XHJcbiAgfVxyXG5cclxuICBpbnZhbGlkKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlcyBhIGRhdGUgYnV0IGFsbG93cyB0aGUgbW9udGggYW5kIGRhdGUgdG8gb3ZlcmZsb3cuICovXHJcbiAgcHJpdmF0ZSBfY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgIHllYXI6IG51bWJlcixcclxuICAgIG1vbnRoOiBudW1iZXIsXHJcbiAgICBkYXRlOiBudW1iZXIsXHJcbiAgICBob3VyczogbnVtYmVyID0gMCxcclxuICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXHJcbiAgICBzZWNvbmRzOiBudW1iZXIgPSAwLFxyXG4gICAgbXM6IG51bWJlciA9IDAsXHJcbiAgKSB7XHJcbiAgICAvLyBQYXNzaW5nIHRoZSB5ZWFyIHRvIHRoZSBjb25zdHJ1Y3RvciBjYXVzZXMgeWVhciBudW1iZXJzIDwxMDAgdG8gYmUgY29udmVydGVkIHRvIDE5eHguXHJcbiAgICAvLyBUbyB3b3JrIGFyb3VuZCB0aGlzIHdlIHVzZSBgc2V0RnVsbFllYXJgIGFuZCBgc2V0SG91cnNgIGluc3RlYWQuXHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIGRhdGUpO1xyXG4gICAgZC5zZXRIb3Vycyhob3VycywgbWludXRlcywgc2Vjb25kcywgbXMpO1xyXG4gICAgcmV0dXJuIGQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYWRzIGEgbnVtYmVyIHRvIG1ha2UgaXQgdHdvIGRpZ2l0cy5cclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIHRvIHBhZC5cclxuICAgKiBAcmV0dXJucyBUaGUgcGFkZGVkIG51bWJlci5cclxuICAgKi9cclxuICBwcml2YXRlIF8yZGlnaXQobjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBuKS5zbGljZSgtMik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdHJpcCBvdXQgdW5pY29kZSBMVFIgYW5kIFJUTCBjaGFyYWN0ZXJzLiBFZGdlIGFuZCBJRSBpbnNlcnQgdGhlc2UgaW50byBmb3JtYXR0ZWQgZGF0ZXMgd2hpbGVcclxuICAgKiBvdGhlciBicm93c2VycyBkbyBub3QuIFdlIHJlbW92ZSB0aGVtIHRvIG1ha2Ugb3V0cHV0IGNvbnNpc3RlbnQgYW5kIGJlY2F1c2UgdGhleSBpbnRlcmZlcmUgd2l0aFxyXG4gICAqIGRhdGUgcGFyc2luZy5cclxuICAgKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gc3RyaXAgZGlyZWN0aW9uIGNoYXJhY3RlcnMgZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgc3RyaXBwZWQgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHUyMDBlXFx1MjAwZl0vZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBjb252ZXJ0aW5nIERhdGUgb2JqZWN0IHRvIHN0cmluZywgamF2YXNjcmlwdCBidWlsdC1pbiBmdW5jdGlvbnMgbWF5IHJldHVybiB3cm9uZ1xyXG4gICAqIHJlc3VsdHMgYmVjYXVzZSBpdCBhcHBsaWVzIGl0cyBpbnRlcm5hbCBEU1QgcnVsZXMuIFRoZSBEU1QgcnVsZXMgYXJvdW5kIHRoZSB3b3JsZCBjaGFuZ2VcclxuICAgKiB2ZXJ5IGZyZXF1ZW50bHksIGFuZCB0aGUgY3VycmVudCB2YWxpZCBydWxlIGlzIG5vdCBhbHdheXMgdmFsaWQgaW4gcHJldmlvdXMgeWVhcnMgdGhvdWdoLlxyXG4gICAqIFdlIHdvcmsgYXJvdW5kIHRoaXMgcHJvYmxlbSBidWlsZGluZyBhIG5ldyBEYXRlIG9iamVjdCB3aGljaCBoYXMgaXRzIGludGVybmFsIFVUQ1xyXG4gICAqIHJlcHJlc2VudGF0aW9uIHdpdGggdGhlIGxvY2FsIGRhdGUgYW5kIHRpbWUuXHJcbiAgICogQHBhcmFtIGR0ZiBJbnRsLkRhdGVUaW1lRm9ybWF0IG9iamVjdCwgY29udGFpbmcgdGhlIGRlc2lyZWQgc3RyaW5nIGZvcm1hdC4gSXQgbXVzdCBoYXZlXHJcbiAgICogICAgdGltZVpvbmUgc2V0IHRvICd1dGMnIHRvIHdvcmsgZmluZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIGZyb20gd2hpY2ggd2Ugd2FudCB0byBnZXQgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBhY2NvcmRpbmcgdG8gZHRmXHJcbiAgICogQHJldHVybnMgQSBEYXRlIG9iamVjdCB3aXRoIGl0cyBVVEMgcmVwcmVzZW50YXRpb24gYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBkYXRlIGluZm9cclxuICAgKi9cclxuICBwcml2YXRlIF9mb3JtYXQoZHRmOiBJbnRsLkRhdGVUaW1lRm9ybWF0LCBkYXRlOiBEYXRlKSB7XHJcbiAgICAvLyBQYXNzaW5nIHRoZSB5ZWFyIHRvIHRoZSBjb25zdHJ1Y3RvciBjYXVzZXMgeWVhciBudW1iZXJzIDwxMDAgdG8gYmUgY29udmVydGVkIHRvIDE5eHguXHJcbiAgICAvLyBUbyB3b3JrIGFyb3VuZCB0aGlzIHdlIHVzZSBgc2V0VVRDRnVsbFllYXJgIGFuZCBgc2V0VVRDSG91cnNgIGluc3RlYWQuXHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIGQuc2V0VVRDSG91cnMoZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCksIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpO1xyXG4gICAgcmV0dXJuIGR0Zi5mb3JtYXQoZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==