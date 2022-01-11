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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2NvcmUvZGF0ZXRpbWUvbmF0aXZlLWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFFM0MsNkRBQTZEO0FBQzdELGlEQUFpRDtBQUNqRCxJQUFJLGlCQUEwQixDQUFDO0FBRS9CLDZGQUE2RjtBQUM3Riw4RkFBOEY7QUFDOUYscURBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFDckQsSUFBSTtJQUNGLGlCQUFpQixHQUFHLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQztDQUNoRDtBQUFDLE1BQU07SUFDTixpQkFBaUIsR0FBRyxLQUFLLENBQUM7Q0FDM0I7QUFFRCxtRUFBbUU7QUFDbkUsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixNQUFNLEVBQUU7UUFDTixTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVc7UUFDckYsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVO0tBQ2xDO0lBQ0QsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVB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RSxDQUFDLENBQUM7UUFDN0YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7O3dIQTdXVSxpQkFBaUIsY0FpQkksZUFBZTt5SEFqQnBDLGlCQUFpQixXQUFqQixpQkFBaUI7dUZBQWpCLGlCQUFpQjtjQUQ3QixVQUFVOztzQkFrQkksUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TUFUX0RBVEVfTE9DQUxFfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHtEYXRlQWRhcHRlcn0gZnJvbSAnLi9kYXRlLWFkYXB0ZXInO1xyXG5cclxuLy8gVE9ETyhtbWFsZXJiYSk6IFJlbW92ZSB3aGVuIHdlIG5vIGxvbmdlciBzdXBwb3J0IHNhZmFyaSA5LlxyXG4vKiogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgSW50bCBBUEkuICovXHJcbmxldCBTVVBQT1JUU19JTlRMX0FQSTogYm9vbGVhbjtcclxuXHJcbi8vIFdlIG5lZWQgYSB0cnkvY2F0Y2ggYXJvdW5kIHRoZSByZWZlcmVuY2UgdG8gYEludGxgLCBiZWNhdXNlIGFjY2Vzc2luZyBpdCBpbiBzb21lIGNhc2VzIGNhblxyXG4vLyBjYXVzZSBJRSB0byB0aHJvdy4gVGhlc2UgY2FzZXMgYXJlIHRpZWQgdG8gcGFydGljdWxhciB2ZXJzaW9ucyBvZiBXaW5kb3dzIGFuZCBjYW4gaGFwcGVuIGlmXHJcbi8vIHRoZSBjb25zdW1lciBpcyBwcm92aWRpbmcgYSBwb2x5ZmlsbGVkIGBNYXBgLiBTZWU6XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvQ2hha3JhQ29yZS9pc3N1ZXMvMzE4OVxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNTY4N1xyXG50cnkge1xyXG4gIFNVUFBPUlRTX0lOVExfQVBJID0gdHlwZW9mIEludGwgIT0gJ3VuZGVmaW5lZCc7XHJcbn0gY2F0Y2gge1xyXG4gIFNVUFBPUlRTX0lOVExfQVBJID0gZmFsc2U7XHJcbn1cclxuXHJcbi8qKiBUaGUgZGVmYXVsdCBtb250aCBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9NT05USF9OQU1FUyA9IHtcclxuICAnbG9uZyc6IFtcclxuICAgICdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsXHJcbiAgICAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlcidcclxuICBdLFxyXG4gICdzaG9ydCc6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcclxuICAnbmFycm93JzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddXHJcbn07XHJcblxyXG5cclxuLyoqIFRoZSBkZWZhdWx0IGRhdGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfREFURV9OQU1FUyA9IHJhbmdlKDMxLCBpID0+IFN0cmluZyhpICsgMSkpO1xyXG5cclxuLyoqIFRoZSBkZWZhdWx0IGhvdXIgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfSE9VUl9OQU1FUyA9IHJhbmdlKDI0LCBpID0+IGkgPT09IDAgPyAnMDAnIDogU3RyaW5nKGkpKTtcclxuXHJcbi8qKiBUaGUgZGVmYXVsdCBtaW51dGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXHJcbmNvbnN0IERFRkFVTFRfTUlOVVRFX05BTUVTID0gcmFuZ2UoNjAsIFN0cmluZyk7XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgZGF5IG9mIHRoZSB3ZWVrIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX0RBWV9PRl9XRUVLX05BTUVTID0ge1xyXG4gICdsb25nJzogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddLFxyXG4gICdzaG9ydCc6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXHJcbiAgJ25hcnJvdyc6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hdGNoZXMgc3RyaW5ncyB0aGF0IGhhdmUgdGhlIGZvcm0gb2YgYSB2YWxpZCBSRkMgMzMzOSBzdHJpbmdcclxuICogKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KS4gTm90ZSB0aGF0IHRoZSBzdHJpbmcgbWF5IG5vdCBhY3R1YWxseSBiZSBhIHZhbGlkIGRhdGVcclxuICogYmVjYXVzZSB0aGUgcmVnZXggd2lsbCBtYXRjaCBzdHJpbmdzIGFuIHdpdGggb3V0IG9mIGJvdW5kcyBtb250aCwgZGF0ZSwgZXRjLlxyXG4gKi9cclxuY29uc3QgSVNPXzg2MDFfUkVHRVggPVxyXG4gICAgL15cXGR7NH0tXFxkezJ9LVxcZHsyfSg/OlRcXGR7Mn06XFxkezJ9OlxcZHsyfSg/OlxcLlxcZCspPyg/Olp8KD86KD86XFwrfC0pXFxkezJ9OlxcZHsyfSkpPyk/JC87XHJcblxyXG5cclxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xyXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xyXG4gIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZXNBcnJheTtcclxufVxyXG5cclxuLyoqIEFkYXB0cyB0aGUgbmF0aXZlIEpTIERhdGUgZm9yIHVzZSB3aXRoIGNkay1iYXNlZCBjb21wb25lbnRzIHRoYXQgd29yayB3aXRoIGRhdGVzLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOYXRpdmVEYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPERhdGU+IHtcclxuICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgX2NsYW1wRGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byB1c2UgYHRpbWVab25lOiAndXRjJ2Agd2l0aCBgSW50bC5EYXRlVGltZUZvcm1hdGAgd2hlbiBmb3JtYXR0aW5nIGRhdGVzLlxyXG4gICAqIFdpdGhvdXQgdGhpcyBgSW50bC5EYXRlVGltZUZvcm1hdGAgc29tZXRpbWVzIGNob29zZXMgdGhlIHdyb25nIHRpbWVab25lLCB3aGljaCBjYW4gdGhyb3cgb2ZmXHJcbiAgICogdGhlIHJlc3VsdC4gKGUuZy4gaW4gdGhlIGVuLVVTIGxvY2FsZSBgbmV3IERhdGUoMTgwMCwgNywgMTQpLnRvTG9jYWxlRGF0ZVN0cmluZygpYFxyXG4gICAqIHdpbGwgcHJvZHVjZSBgJzgvMTMvMTgwMCdgLlxyXG4gICAqXHJcbiAgICogVE9ETyhtbWFsZXJiYSk6IGRyb3AgdGhpcyB2YXJpYWJsZS4gSXQncyBub3QgYmVpbmcgdXNlZCBpbiB0aGUgY29kZSByaWdodCBub3cuIFdlJ3JlIG5vd1xyXG4gICAqIGdldHRpbmcgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIERhdGUgb2JqZWN0IGZyb20gaXRzIHV0YyByZXByZXNlbnRhdGlvbi4gV2UncmUga2VlcGluZ1xyXG4gICAqIGl0IGhlcmUgZm9yIHNvbWV0aW1lLCBqdXN0IGZvciBwcmVjYXV0aW9uLCBpbiBjYXNlIHdlIGRlY2lkZSB0byByZXZlcnQgc29tZSBvZiB0aGVzZSBjaGFuZ2VzXHJcbiAgICogdGhvdWdoLlxyXG4gICAqL1xyXG4gIHVzZVV0Y0ZvckRpc3BsYXk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFX0xPQ0FMRSkgbWF0RGF0ZUxvY2FsZTogc3RyaW5nLCBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRMb2NhbGUobWF0RGF0ZUxvY2FsZSk7XHJcblxyXG4gICAgLy8gSUUgZG9lcyBpdHMgb3duIHRpbWUgem9uZSBjb3JyZWN0aW9uLCBzbyB3ZSBkaXNhYmxlIHRoaXMgb24gSUUuXHJcbiAgICB0aGlzLnVzZVV0Y0ZvckRpc3BsYXkgPSAhcGxhdGZvcm0uVFJJREVOVDtcclxuICAgIHRoaXMuX2NsYW1wRGF0ZSA9IHBsYXRmb3JtLlRSSURFTlQgfHwgcGxhdGZvcm0uRURHRTtcclxuICB9XHJcblxyXG4gIGdldFllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldERhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldEhvdXJzKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXJzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgIGNsb25lLnNldEhvdXJzKHZhbHVlKTtcclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcblxyXG4gIGdldE1pbnV0ZXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRNaW51dGVzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgIGNsb25lLnNldE1pbnV0ZXModmFsdWUpO1xyXG4gICAgcmV0dXJuIGNsb25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2Vjb25kcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcclxuICB9XHJcblxyXG4gIHNldFNlY29uZHMoZGF0ZTogRGF0ZSwgdmFsdWU6IG51bWJlciwgbXM/OiBudW1iZXIpOiBEYXRlIHtcclxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgIGNsb25lLnNldFNlY29uZHModmFsdWUsIG1zKTtcclxuICAgIHJldHVybiBjbG9uZTtcclxuICB9XHJcblxyXG4gIGdldE1pbGxpc2Vjb25kcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5T2ZXZWVrKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7XHJcbiAgfVxyXG5cclxuICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XHJcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcclxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHttb250aDogc3R5bGUsIHRpbWVab25lOiAndXRjJ30pO1xyXG4gICAgICByZXR1cm4gcmFuZ2UoMTIsIGkgPT5cclxuICAgICAgICAgIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIGksIDEpKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERFRkFVTFRfTU9OVEhfTkFNRVNbc3R5bGVdO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge2RheTogJ251bWVyaWMnLCB0aW1lWm9uZTogJ3V0Yyd9KTtcclxuICAgICAgcmV0dXJuIHJhbmdlKDMxLCBpID0+IHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxyXG4gICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcclxuICB9XHJcblxyXG4gIGdldEhvdXJOYW1lcygpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gREVGQVVMVF9IT1VSX05BTUVTO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWludXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIERFRkFVTFRfTUlOVVRFX05BTUVTO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge3dlZWtkYXk6IHN0eWxlLCB0aW1lWm9uZTogJ3V0Yyd9KTtcclxuICAgICAgcmV0dXJuIHJhbmdlKDcsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXHJcbiAgICAgICAgICB0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge3llYXI6ICdudW1lcmljJywgdGltZVpvbmU6ICd1dGMnfSk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMuZ2V0WWVhcihkYXRlKSk7XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xyXG4gICAgLy8gV2UgY2FuJ3QgdGVsbCB1c2luZyBuYXRpdmUgSlMgRGF0ZSB3aGF0IHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgaXMsIHdlIGRlZmF1bHQgdG8gU3VuZGF5LlxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmdldERhdGUodGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgICB0aGlzLmdldFllYXIoZGF0ZSksIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyAxLCAwKSk7XHJcbiAgfVxyXG5cclxuICBjbG9uZShkYXRlOiBEYXRlKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGF0ZShcclxuICAgIHllYXI6IG51bWJlcixcclxuICAgIG1vbnRoOiBudW1iZXIsXHJcbiAgICBkYXRlOiBudW1iZXIsXHJcbiAgICBob3VyczogbnVtYmVyID0gMCxcclxuICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXHJcbiAgICBzZWNvbmRzOiBudW1iZXIgPSAwLFxyXG4gICAgbXM6IG51bWJlciA9IDAsXHJcbiAgKTogRGF0ZSB7XHJcbiAgICBpZiAoaXNEZXZNb2RlKCkpIHtcclxuICAgICAgLy8gQ2hlY2sgZm9yIGludmFsaWQgbW9udGggYW5kIGRhdGUgKGV4Y2VwdCB1cHBlciBib3VuZCBvbiBkYXRlIHdoaWNoIHdlIGhhdmUgdG8gY2hlY2sgYWZ0ZXJcclxuICAgICAgLy8gY3JlYXRpbmcgdGhlIERhdGUpLlxyXG4gICAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0ZSA8IDEpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbXMpO1xyXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XHJcbiAgICBpZiAocmVzdWx0LmdldE1vbnRoKCkgIT0gbW9udGggJiYgKGlzRGV2TW9kZSgpKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgdG9kYXkoKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIHBhcnNlKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICAvLyBXZSBoYXZlIG5vIHdheSB1c2luZyB0aGUgbmF0aXZlIEpTIERhdGUgdG8gc2V0IHRoZSBwYXJzZSBmb3JtYXQgb3IgbG9jYWxlLCBzbyB3ZSBpZ25vcmUgdGhlc2VcclxuICAgIC8vIHBhcmFtZXRlcnMuXHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUgPyBuZXcgRGF0ZShEYXRlLnBhcnNlKHZhbHVlKSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcignTmF0aXZlRGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICAvLyBPbiBJRSBhbmQgRWRnZSB0aGUgaTE4biBBUEkgd2lsbCB0aHJvdyBhIGhhcmQgZXJyb3IgdGhhdCBjYW4gY3Jhc2ggdGhlIGVudGlyZSBhcHBcclxuICAgICAgLy8gaWYgd2UgYXR0ZW1wdCB0byBmb3JtYXQgYSBkYXRlIHdob3NlIHllYXIgaXMgbGVzcyB0aGFuIDEgb3IgZ3JlYXRlciB0aGFuIDk5OTkuXHJcbiAgICAgIGlmICh0aGlzLl9jbGFtcERhdGUgJiYgKGRhdGUuZ2V0RnVsbFllYXIoKSA8IDEgfHwgZGF0ZS5nZXRGdWxsWWVhcigpID4gOTk5OSkpIHtcclxuICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKE1hdGgubWF4KDEsIE1hdGgubWluKDk5OTksIGRhdGUuZ2V0RnVsbFllYXIoKSkpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGlzcGxheUZvcm1hdCA9IHsuLi5kaXNwbGF5Rm9ybWF0LCB0aW1lWm9uZTogJ3V0Yyd9O1xyXG5cclxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIGRpc3BsYXlGb3JtYXQpO1xyXG4gICAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgZGF0ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGRhdGUudG9EYXRlU3RyaW5nKCkpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBEYXRlLCB5ZWFyczogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRDYWxlbmRhck1vbnRocyhkYXRlLCB5ZWFycyAqIDEyKTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IERhdGUsIG1vbnRoczogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICBsZXQgbmV3RGF0ZSA9IHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXHJcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSArIG1vbnRocyxcclxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcclxuICAgICk7XHJcblxyXG4gICAgLy8gSXQncyBwb3NzaWJsZSB0byB3aW5kIHVwIGluIHRoZSB3cm9uZyBtb250aCBpZiB0aGUgb3JpZ2luYWwgbW9udGggaGFzIG1vcmUgZGF5cyB0aGFuIHRoZSBuZXdcclxuICAgIC8vIG1vbnRoLiBJbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBnbyB0byB0aGUgbGFzdCBkYXkgb2YgdGhlIGRlc2lyZWQgbW9udGguXHJcbiAgICAvLyBOb3RlOiB0aGUgYWRkaXRpb25hbCArIDEyICUgMTIgZW5zdXJlcyB3ZSBlbmQgdXAgd2l0aCBhIHBvc2l0aXZlIG51bWJlciwgc2luY2UgSlMgJSBkb2Vzbid0XHJcbiAgICAvLyBndWFyYW50ZWUgdGhpcy5cclxuICAgIGlmICh0aGlzLmdldE1vbnRoKG5ld0RhdGUpICE9ICgodGhpcy5nZXRNb250aChkYXRlKSArIG1vbnRocykgJSAxMiArIDEyKSAlIDEyKSB7XHJcbiAgICAgIG5ld0RhdGUgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHRoaXMuZ2V0WWVhcihuZXdEYXRlKSwgdGhpcy5nZXRNb250aChuZXdEYXRlKSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0RhdGU7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckRheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSkgKyBkYXlzLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IERhdGUsIGhvdXJzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxyXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcclxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSArIGhvdXJzLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhck1pbnV0ZXMoZGF0ZTogRGF0ZSwgbWludXRlczogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSArIG1pbnV0ZXMsXHJcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhclNlY29uZHMoZGF0ZTogRGF0ZSwgc2Vjb25kczogbnVtYmVyLCBtcz86IG51bWJlcik6IERhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXHJcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcclxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSArIHNlY29uZHMsXHJcbiAgICAgIHRoaXMuZ2V0TWlsbGlzZWNvbmRzKGRhdGUpICsgbXMsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdG9Jc284NjAxKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxyXG4gICAgICB0aGlzLl8yZGlnaXQoZGF0ZS5nZXRVVENNb250aCgpICsgMSksXHJcbiAgICAgIHRoaXMuXzJkaWdpdChkYXRlLmdldFVUQ0RhdGUoKSlcclxuICAgIF0uam9pbignLScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgZ2l2ZW4gYSB2YWxpZCBEYXRlIG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXHJcbiAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgaW50byB2YWxpZCBEYXRlcyBhbmQgZW1wdHkgc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhblxyXG4gICAqIGludmFsaWQgZGF0ZSBmb3IgYWxsIG90aGVyIHZhbHVlcy5cclxuICAgKi9cclxuICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRoZSBgRGF0ZWAgY29uc3RydWN0b3IgYWNjZXB0cyBmb3JtYXRzIG90aGVyIHRoYW4gSVNPIDg2MDEsIHNvIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZVxyXG4gICAgICAvLyBzdHJpbmcgaXMgdGhlIHJpZ2h0IGZvcm1hdCBmaXJzdC5cclxuICAgICAgaWYgKElTT184NjAxX1JFR0VYLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpIHtcclxuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChkYXRlOiBEYXRlKSB7XHJcbiAgICByZXR1cm4gIWlzTmFOKGRhdGUuZ2V0VGltZSgpKTtcclxuICB9XHJcblxyXG4gIGludmFsaWQoKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGVzIGEgZGF0ZSBidXQgYWxsb3dzIHRoZSBtb250aCBhbmQgZGF0ZSB0byBvdmVyZmxvdy4gKi9cclxuICBwcml2YXRlIF9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxyXG4gICAgeWVhcjogbnVtYmVyLFxyXG4gICAgbW9udGg6IG51bWJlcixcclxuICAgIGRhdGU6IG51bWJlcixcclxuICAgIGhvdXJzOiBudW1iZXIgPSAwLFxyXG4gICAgbWludXRlczogbnVtYmVyID0gMCxcclxuICAgIHNlY29uZHM6IG51bWJlciA9IDAsXHJcbiAgICBtczogbnVtYmVyID0gMCxcclxuICApIHtcclxuICAgIC8vIFBhc3NpbmcgdGhlIHllYXIgdG8gdGhlIGNvbnN0cnVjdG9yIGNhdXNlcyB5ZWFyIG51bWJlcnMgPDEwMCB0byBiZSBjb252ZXJ0ZWQgdG8gMTl4eC5cclxuICAgIC8vIFRvIHdvcmsgYXJvdW5kIHRoaXMgd2UgdXNlIGBzZXRGdWxsWWVhcmAgYW5kIGBzZXRIb3Vyc2AgaW5zdGVhZC5cclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF0ZSk7XHJcbiAgICBkLnNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtcyk7XHJcbiAgICByZXR1cm4gZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhZHMgYSBudW1iZXIgdG8gbWFrZSBpdCB0d28gZGlnaXRzLlxyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgdG8gcGFkLlxyXG4gICAqIEByZXR1cm5zIFRoZSBwYWRkZWQgbnVtYmVyLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgXzJkaWdpdChuOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoJzAwJyArIG4pLnNsaWNlKC0yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0cmlwIG91dCB1bmljb2RlIExUUiBhbmQgUlRMIGNoYXJhY3RlcnMuIEVkZ2UgYW5kIElFIGluc2VydCB0aGVzZSBpbnRvIGZvcm1hdHRlZCBkYXRlcyB3aGlsZVxyXG4gICAqIG90aGVyIGJyb3dzZXJzIGRvIG5vdC4gV2UgcmVtb3ZlIHRoZW0gdG8gbWFrZSBvdXRwdXQgY29uc2lzdGVudCBhbmQgYmVjYXVzZSB0aGV5IGludGVyZmVyZSB3aXRoXHJcbiAgICogZGF0ZSBwYXJzaW5nLlxyXG4gICAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBzdHJpcCBkaXJlY3Rpb24gY2hhcmFjdGVycyBmcm9tLlxyXG4gICAqIEByZXR1cm5zIFRoZSBzdHJpcHBlZCBzdHJpbmcuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoc3RyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGNvbnZlcnRpbmcgRGF0ZSBvYmplY3QgdG8gc3RyaW5nLCBqYXZhc2NyaXB0IGJ1aWx0LWluIGZ1bmN0aW9ucyBtYXkgcmV0dXJuIHdyb25nXHJcbiAgICogcmVzdWx0cyBiZWNhdXNlIGl0IGFwcGxpZXMgaXRzIGludGVybmFsIERTVCBydWxlcy4gVGhlIERTVCBydWxlcyBhcm91bmQgdGhlIHdvcmxkIGNoYW5nZVxyXG4gICAqIHZlcnkgZnJlcXVlbnRseSwgYW5kIHRoZSBjdXJyZW50IHZhbGlkIHJ1bGUgaXMgbm90IGFsd2F5cyB2YWxpZCBpbiBwcmV2aW91cyB5ZWFycyB0aG91Z2guXHJcbiAgICogV2Ugd29yayBhcm91bmQgdGhpcyBwcm9ibGVtIGJ1aWxkaW5nIGEgbmV3IERhdGUgb2JqZWN0IHdoaWNoIGhhcyBpdHMgaW50ZXJuYWwgVVRDXHJcbiAgICogcmVwcmVzZW50YXRpb24gd2l0aCB0aGUgbG9jYWwgZGF0ZSBhbmQgdGltZS5cclxuICAgKiBAcGFyYW0gZHRmIEludGwuRGF0ZVRpbWVGb3JtYXQgb2JqZWN0LCBjb250YWluZyB0aGUgZGVzaXJlZCBzdHJpbmcgZm9ybWF0LiBJdCBtdXN0IGhhdmVcclxuICAgKiAgICB0aW1lWm9uZSBzZXQgdG8gJ3V0YycgdG8gd29yayBmaW5lLlxyXG4gICAqIEBwYXJhbSBkYXRlIERhdGUgZnJvbSB3aGljaCB3ZSB3YW50IHRvIGdldCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGFjY29yZGluZyB0byBkdGZcclxuICAgKiBAcmV0dXJucyBBIERhdGUgb2JqZWN0IHdpdGggaXRzIFVUQyByZXByZXNlbnRhdGlvbiBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGRhdGUgaW5mb1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Zvcm1hdChkdGY6IEludGwuRGF0ZVRpbWVGb3JtYXQsIGRhdGU6IERhdGUpIHtcclxuICAgIC8vIFBhc3NpbmcgdGhlIHllYXIgdG8gdGhlIGNvbnN0cnVjdG9yIGNhdXNlcyB5ZWFyIG51bWJlcnMgPDEwMCB0byBiZSBjb252ZXJ0ZWQgdG8gMTl4eC5cclxuICAgIC8vIFRvIHdvcmsgYXJvdW5kIHRoaXMgd2UgdXNlIGBzZXRVVENGdWxsWWVhcmAgYW5kIGBzZXRVVENIb3Vyc2AgaW5zdGVhZC5cclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgZC5zZXRVVENIb3VycyhkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSk7XHJcbiAgICByZXR1cm4gZHRmLmZvcm1hdChkKTtcclxuICB9XHJcbn1cclxuIl19