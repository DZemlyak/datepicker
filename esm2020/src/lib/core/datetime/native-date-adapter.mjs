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
    long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
};
/** The default date names to use if Intl API is not available. */
const DEFAULT_DATE_NAMES = range(31, (i) => String(i + 1));
/** The default hour names to use if Intl API is not available. */
const DEFAULT_HOUR_NAMES = range(24, (i) => (i === 0 ? '00' : String(i)));
/** The default minute names to use if Intl API is not available. */
const DEFAULT_MINUTE_NAMES = range(60, String);
/** The default day of the week names to use if Intl API is not available. */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
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
            const dtf = new Intl.DateTimeFormat(this.locale, {
                month: style,
                timeZone: 'utc',
            });
            return range(12, (i) => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                day: 'numeric',
                timeZone: 'utc',
            });
            return range(31, (i) => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
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
            const dtf = new Intl.DateTimeFormat(this.locale, {
                weekday: style,
                timeZone: 'utc',
            });
            return range(7, (i) => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                timeZone: 'utc',
            });
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
        if (result.getMonth() != month && isDevMode()) {
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
            if (this._clampDate &&
                (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
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
        if (this.getMonth(newDate) !=
            (((this.getMonth(date) + months) % 12) + 12) % 12) {
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
            this._2digit(date.getUTCDate()),
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
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter, deps: [{ token: MAT_DATE_LOCALE, optional: true }, { token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ NativeDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NativeDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DATE_LOCALE]
                }] }, { type: i1.Platform }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvZGF0ZXBpY2tlci9zcmMvbGliL2NvcmUvZGF0ZXRpbWUvbmF0aXZlLWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFN0MsNkRBQTZEO0FBQzdELGlEQUFpRDtBQUNqRCxJQUFJLGlCQUEwQixDQUFDO0FBRS9CLDZGQUE2RjtBQUM3Riw4RkFBOEY7QUFDOUYscURBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFDckQsSUFBSTtJQUNGLGlCQUFpQixHQUFHLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQztDQUNoRDtBQUFDLE1BQU07SUFDTixpQkFBaUIsR0FBRyxLQUFLLENBQUM7Q0FDM0I7QUFFRCxtRUFBbUU7QUFDbkUsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixJQUFJLEVBQUU7UUFDSixTQUFTO1FBQ1QsVUFBVTtRQUNWLE9BQU87UUFDUCxPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFdBQVc7UUFDWCxTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNM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LEVBQUUsRUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQ3ZCLENBQUM7UUFDRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7b0pBbmFVLGlCQUFpQixrQkFrQk4sZUFBZTt3SkFsQjFCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVOzswQkFtQk4sUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vZGF0ZS1hZGFwdGVyJztcblxuLy8gVE9ETyhtbWFsZXJiYSk6IFJlbW92ZSB3aGVuIHdlIG5vIGxvbmdlciBzdXBwb3J0IHNhZmFyaSA5LlxuLyoqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEludGwgQVBJLiAqL1xubGV0IFNVUFBPUlRTX0lOVExfQVBJOiBib29sZWFuO1xuXG4vLyBXZSBuZWVkIGEgdHJ5L2NhdGNoIGFyb3VuZCB0aGUgcmVmZXJlbmNlIHRvIGBJbnRsYCwgYmVjYXVzZSBhY2Nlc3NpbmcgaXQgaW4gc29tZSBjYXNlcyBjYW5cbi8vIGNhdXNlIElFIHRvIHRocm93LiBUaGVzZSBjYXNlcyBhcmUgdGllZCB0byBwYXJ0aWN1bGFyIHZlcnNpb25zIG9mIFdpbmRvd3MgYW5kIGNhbiBoYXBwZW4gaWZcbi8vIHRoZSBjb25zdW1lciBpcyBwcm92aWRpbmcgYSBwb2x5ZmlsbGVkIGBNYXBgLiBTZWU6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0NoYWtyYUNvcmUvaXNzdWVzLzMxODlcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE1Njg3XG50cnkge1xuICBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9ICd1bmRlZmluZWQnO1xufSBjYXRjaCB7XG4gIFNVUFBPUlRTX0lOVExfQVBJID0gZmFsc2U7XG59XG5cbi8qKiBUaGUgZGVmYXVsdCBtb250aCBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfTU9OVEhfTkFNRVMgPSB7XG4gIGxvbmc6IFtcbiAgICAnSmFudWFyeScsXG4gICAgJ0ZlYnJ1YXJ5JyxcbiAgICAnTWFyY2gnLFxuICAgICdBcHJpbCcsXG4gICAgJ01heScsXG4gICAgJ0p1bmUnLFxuICAgICdKdWx5JyxcbiAgICAnQXVndXN0JyxcbiAgICAnU2VwdGVtYmVyJyxcbiAgICAnT2N0b2JlcicsXG4gICAgJ05vdmVtYmVyJyxcbiAgICAnRGVjZW1iZXInLFxuICBdLFxuICBzaG9ydDogW1xuICAgICdKYW4nLFxuICAgICdGZWInLFxuICAgICdNYXInLFxuICAgICdBcHInLFxuICAgICdNYXknLFxuICAgICdKdW4nLFxuICAgICdKdWwnLFxuICAgICdBdWcnLFxuICAgICdTZXAnLFxuICAgICdPY3QnLFxuICAgICdOb3YnLFxuICAgICdEZWMnLFxuICBdLFxuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXSxcbn07XG5cbi8qKiBUaGUgZGVmYXVsdCBkYXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9EQVRFX05BTUVTID0gcmFuZ2UoMzEsIChpKSA9PiBTdHJpbmcoaSArIDEpKTtcblxuLyoqIFRoZSBkZWZhdWx0IGhvdXIgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0hPVVJfTkFNRVMgPSByYW5nZSgyNCwgKGkpID0+IChpID09PSAwID8gJzAwJyA6IFN0cmluZyhpKSkpO1xuXG4vKiogVGhlIGRlZmF1bHQgbWludXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9NSU5VVEVfTkFNRVMgPSByYW5nZSg2MCwgU3RyaW5nKTtcblxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVMgPSB7XG4gIGxvbmc6IFtcbiAgICAnU3VuZGF5JyxcbiAgICAnTW9uZGF5JyxcbiAgICAnVHVlc2RheScsXG4gICAgJ1dlZG5lc2RheScsXG4gICAgJ1RodXJzZGF5JyxcbiAgICAnRnJpZGF5JyxcbiAgICAnU2F0dXJkYXknLFxuICBdLFxuICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbn07XG5cbi8qKlxuICogTWF0Y2hlcyBzdHJpbmdzIHRoYXQgaGF2ZSB0aGUgZm9ybSBvZiBhIHZhbGlkIFJGQyAzMzM5IHN0cmluZ1xuICogKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KS4gTm90ZSB0aGF0IHRoZSBzdHJpbmcgbWF5IG5vdCBhY3R1YWxseSBiZSBhIHZhbGlkIGRhdGVcbiAqIGJlY2F1c2UgdGhlIHJlZ2V4IHdpbGwgbWF0Y2ggc3RyaW5ncyBhbiB3aXRoIG91dCBvZiBib3VuZHMgbW9udGgsIGRhdGUsIGV0Yy5cbiAqL1xuY29uc3QgSVNPXzg2MDFfUkVHRVggPVxuICAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9KD86VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86XFwuXFxkKyk/KD86WnwoPzooPzpcXCt8LSlcXGR7Mn06XFxkezJ9KSk/KT8kLztcblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICB9XG4gIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuLyoqIEFkYXB0cyB0aGUgbmF0aXZlIEpTIERhdGUgZm9yIHVzZSB3aXRoIGNkay1iYXNlZCBjb21wb25lbnRzIHRoYXQgd29yayB3aXRoIGRhdGVzLiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xuICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9jbGFtcERhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cbiAgICogV2l0aG91dCB0aGlzIGBJbnRsLkRhdGVUaW1lRm9ybWF0YCBzb21ldGltZXMgY2hvb3NlcyB0aGUgd3JvbmcgdGltZVpvbmUsIHdoaWNoIGNhbiB0aHJvdyBvZmZcbiAgICogdGhlIHJlc3VsdC4gKGUuZy4gaW4gdGhlIGVuLVVTIGxvY2FsZSBgbmV3IERhdGUoMTgwMCwgNywgMTQpLnRvTG9jYWxlRGF0ZVN0cmluZygpYFxuICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cbiAgICpcbiAgICogVE9ETyhtbWFsZXJiYSk6IGRyb3AgdGhpcyB2YXJpYWJsZS4gSXQncyBub3QgYmVpbmcgdXNlZCBpbiB0aGUgY29kZSByaWdodCBub3cuIFdlJ3JlIG5vd1xuICAgKiBnZXR0aW5nIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBEYXRlIG9iamVjdCBmcm9tIGl0cyB1dGMgcmVwcmVzZW50YXRpb24uIFdlJ3JlIGtlZXBpbmdcbiAgICogaXQgaGVyZSBmb3Igc29tZXRpbWUsIGp1c3QgZm9yIHByZWNhdXRpb24sIGluIGNhc2Ugd2UgZGVjaWRlIHRvIHJldmVydCBzb21lIG9mIHRoZXNlIGNoYW5nZXNcbiAgICogdGhvdWdoLlxuICAgKi9cbiAgdXNlVXRjRm9yRGlzcGxheTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9MT0NBTEUpIG1hdERhdGVMb2NhbGU6IHN0cmluZyxcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICBzdXBlci5zZXRMb2NhbGUobWF0RGF0ZUxvY2FsZSk7XG5cbiAgICAvLyBJRSBkb2VzIGl0cyBvd24gdGltZSB6b25lIGNvcnJlY3Rpb24sIHNvIHdlIGRpc2FibGUgdGhpcyBvbiBJRS5cbiAgICB0aGlzLnVzZVV0Y0ZvckRpc3BsYXkgPSAhcGxhdGZvcm0uVFJJREVOVDtcbiAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XG4gIH1cblxuICBnZXRZZWFyKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBnZXRNb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9XG5cbiAgZ2V0RGF0ZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG4gIH1cblxuICBnZXRIb3VycyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9XG5cbiAgc2V0SG91cnMoZGF0ZTogRGF0ZSwgdmFsdWU6IG51bWJlcik6IERhdGUge1xuICAgIGNvbnN0IGNsb25lID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICBjbG9uZS5zZXRIb3Vycyh2YWx1ZSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZ2V0TWludXRlcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIH1cblxuICBzZXRNaW51dGVzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIpOiBEYXRlIHtcbiAgICBjb25zdCBjbG9uZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgY2xvbmUuc2V0TWludXRlcyh2YWx1ZSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZ2V0U2Vjb25kcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH1cblxuICBzZXRTZWNvbmRzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIG1zPzogbnVtYmVyKTogRGF0ZSB7XG4gICAgY29uc3QgY2xvbmUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgIGNsb25lLnNldFNlY29uZHModmFsdWUsIG1zKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gIH1cblxuICBnZXREYXlPZldlZWsoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7XG4gIH1cblxuICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge1xuICAgICAgICBtb250aDogc3R5bGUsXG4gICAgICAgIHRpbWVab25lOiAndXRjJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJhbmdlKDEyLCAoaSkgPT5cbiAgICAgICAgdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgaSwgMSkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBERUZBVUxUX01PTlRIX05BTUVTW3N0eWxlXTtcbiAgfVxuXG4gIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwge1xuICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmFuZ2UoMzEsIChpKSA9PlxuICAgICAgICB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICB0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBERUZBVUxUX0RBVEVfTkFNRVM7XG4gIH1cblxuICBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBERUZBVUxUX0hPVVJfTkFNRVM7XG4gIH1cblxuICBnZXRNaW51dGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIERFRkFVTFRfTUlOVVRFX05BTUVTO1xuICB9XG5cbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgIHdlZWtkYXk6IHN0eWxlLFxuICAgICAgICB0aW1lWm9uZTogJ3V0YycsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByYW5nZSg3LCAoaSkgPT5cbiAgICAgICAgdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gIH1cblxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgdGltZVpvbmU6ICd1dGMnLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgZGF0ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKHRoaXMuZ2V0WWVhcihkYXRlKSk7XG4gIH1cblxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIC8vIFdlIGNhbid0IHRlbGwgdXNpbmcgbmF0aXZlIEpTIERhdGUgd2hhdCB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrIGlzLCB3ZSBkZWZhdWx0IHRvIFN1bmRheS5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldE51bURheXNJbk1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldERhdGUoXG4gICAgICB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyAxLFxuICAgICAgICAwXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGNsb25lKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgY3JlYXRlRGF0ZShcbiAgICB5ZWFyOiBudW1iZXIsXG4gICAgbW9udGg6IG51bWJlcixcbiAgICBkYXRlOiBudW1iZXIsXG4gICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgbWludXRlczogbnVtYmVyID0gMCxcbiAgICBzZWNvbmRzOiBudW1iZXIgPSAwLFxuICAgIG1zOiBudW1iZXIgPSAwXG4gICk6IERhdGUge1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgLy8gQ2hlY2sgZm9yIGludmFsaWQgbW9udGggYW5kIGRhdGUgKGV4Y2VwdCB1cHBlciBib3VuZCBvbiBkYXRlIHdoaWNoIHdlIGhhdmUgdG8gY2hlY2sgYWZ0ZXJcbiAgICAgIC8vIGNyZWF0aW5nIHRoZSBEYXRlKS5cbiAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgeWVhcixcbiAgICAgIG1vbnRoLFxuICAgICAgZGF0ZSxcbiAgICAgIGhvdXJzLFxuICAgICAgbWludXRlcyxcbiAgICAgIHNlY29uZHMsXG4gICAgICBtc1xuICAgICk7XG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XG4gICAgaWYgKHJlc3VsdC5nZXRNb250aCgpICE9IG1vbnRoICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdG9kYXkoKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gIH1cblxuICBwYXJzZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xuICAgIC8vIFdlIGhhdmUgbm8gd2F5IHVzaW5nIHRoZSBuYXRpdmUgSlMgRGF0ZSB0byBzZXQgdGhlIHBhcnNlIGZvcm1hdCBvciBsb2NhbGUsIHNvIHdlIGlnbm9yZSB0aGVzZVxuICAgIC8vIHBhcmFtZXRlcnMuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID8gbmV3IERhdGUoRGF0ZS5wYXJzZSh2YWx1ZSkpIDogbnVsbDtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBPYmplY3QpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignTmF0aXZlRGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgIH1cblxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgLy8gT24gSUUgYW5kIEVkZ2UgdGhlIGkxOG4gQVBJIHdpbGwgdGhyb3cgYSBoYXJkIGVycm9yIHRoYXQgY2FuIGNyYXNoIHRoZSBlbnRpcmUgYXBwXG4gICAgICAvLyBpZiB3ZSBhdHRlbXB0IHRvIGZvcm1hdCBhIGRhdGUgd2hvc2UgeWVhciBpcyBsZXNzIHRoYW4gMSBvciBncmVhdGVyIHRoYW4gOTk5OS5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fY2xhbXBEYXRlICYmXG4gICAgICAgIChkYXRlLmdldEZ1bGxZZWFyKCkgPCAxIHx8IGRhdGUuZ2V0RnVsbFllYXIoKSA+IDk5OTkpXG4gICAgICApIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoTWF0aC5tYXgoMSwgTWF0aC5taW4oOTk5OSwgZGF0ZS5nZXRGdWxsWWVhcigpKSkpO1xuICAgICAgfVxuXG4gICAgICBkaXNwbGF5Rm9ybWF0ID0geyAuLi5kaXNwbGF5Rm9ybWF0LCB0aW1lWm9uZTogJ3V0YycgfTtcblxuICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIGRpc3BsYXlGb3JtYXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBEYXRlLCB5ZWFyczogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkQ2FsZW5kYXJNb250aHMoZGF0ZSwgeWVhcnMgKiAxMik7XG4gIH1cblxuICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBEYXRlLCBtb250aHM6IG51bWJlcik6IERhdGUge1xuICAgIGxldCBuZXdEYXRlID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyBtb250aHMsXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxuICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxuICAgICAgdGhpcy5nZXRTZWNvbmRzKGRhdGUpXG4gICAgKTtcblxuICAgIC8vIEl0J3MgcG9zc2libGUgdG8gd2luZCB1cCBpbiB0aGUgd3JvbmcgbW9udGggaWYgdGhlIG9yaWdpbmFsIG1vbnRoIGhhcyBtb3JlIGRheXMgdGhhbiB0aGUgbmV3XG4gICAgLy8gbW9udGguIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIGdvIHRvIHRoZSBsYXN0IGRheSBvZiB0aGUgZGVzaXJlZCBtb250aC5cbiAgICAvLyBOb3RlOiB0aGUgYWRkaXRpb25hbCArIDEyICUgMTIgZW5zdXJlcyB3ZSBlbmQgdXAgd2l0aCBhIHBvc2l0aXZlIG51bWJlciwgc2luY2UgSlMgJSBkb2Vzbid0XG4gICAgLy8gZ3VhcmFudGVlIHRoaXMuXG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXRNb250aChuZXdEYXRlKSAhPVxuICAgICAgKCgodGhpcy5nZXRNb250aChkYXRlKSArIG1vbnRocykgJSAxMikgKyAxMikgJSAxMlxuICAgICkge1xuICAgICAgbmV3RGF0ZSA9IHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICAgIHRoaXMuZ2V0WWVhcihuZXdEYXRlKSxcbiAgICAgICAgdGhpcy5nZXRNb250aChuZXdEYXRlKSxcbiAgICAgICAgMFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0ZTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSkgKyBkYXlzLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKVxuICAgICk7XG4gIH1cblxuICBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IERhdGUsIGhvdXJzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpICsgaG91cnMsXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksXG4gICAgICB0aGlzLmdldFNlY29uZHMoZGF0ZSlcbiAgICApO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJNaW51dGVzKGRhdGU6IERhdGUsIG1pbnV0ZXM6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSkgKyBtaW51dGVzLFxuICAgICAgdGhpcy5nZXRTZWNvbmRzKGRhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyU2Vjb25kcyhkYXRlOiBEYXRlLCBzZWNvbmRzOiBudW1iZXIsIG1zPzogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSArIHNlY29uZHMsXG4gICAgICB0aGlzLmdldE1pbGxpc2Vjb25kcyhkYXRlKSArIG1zXG4gICAgKTtcbiAgfVxuXG4gIHRvSXNvODYwMShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLFxuICAgICAgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDRGF0ZSgpKSxcbiAgICBdLmpvaW4oJy0nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIERhdGUgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcbiAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgaW50byB2YWxpZCBEYXRlcyBhbmQgZW1wdHkgc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhblxuICAgKiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAqL1xuICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogRGF0ZSB8IG51bGwge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gVGhlIGBEYXRlYCBjb25zdHJ1Y3RvciBhY2NlcHRzIGZvcm1hdHMgb3RoZXIgdGhhbiBJU08gODYwMSwgc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlXG4gICAgICAvLyBzdHJpbmcgaXMgdGhlIHJpZ2h0IGZvcm1hdCBmaXJzdC5cbiAgICAgIGlmIChJU09fODYwMV9SRUdFWC50ZXN0KHZhbHVlKSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gIH1cblxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSkge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlO1xuICB9XG5cbiAgaXNWYWxpZChkYXRlOiBEYXRlKSB7XG4gICAgcmV0dXJuICFpc05hTihkYXRlLmdldFRpbWUoKSk7XG4gIH1cblxuICBpbnZhbGlkKCk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgYSBkYXRlIGJ1dCBhbGxvd3MgdGhlIG1vbnRoIGFuZCBkYXRlIHRvIG92ZXJmbG93LiAqL1xuICBwcml2YXRlIF9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgIHllYXI6IG51bWJlcixcbiAgICBtb250aDogbnVtYmVyLFxuICAgIGRhdGU6IG51bWJlcixcbiAgICBob3VyczogbnVtYmVyID0gMCxcbiAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgIHNlY29uZHM6IG51bWJlciA9IDAsXG4gICAgbXM6IG51bWJlciA9IDBcbiAgKSB7XG4gICAgLy8gUGFzc2luZyB0aGUgeWVhciB0byB0aGUgY29uc3RydWN0b3IgY2F1c2VzIHllYXIgbnVtYmVycyA8MTAwIHRvIGJlIGNvbnZlcnRlZCB0byAxOXh4LlxuICAgIC8vIFRvIHdvcmsgYXJvdW5kIHRoaXMgd2UgdXNlIGBzZXRGdWxsWWVhcmAgYW5kIGBzZXRIb3Vyc2AgaW5zdGVhZC5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICBkLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgICBkLnNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtcyk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cblxuICAvKipcbiAgICogUGFkcyBhIG51bWJlciB0byBtYWtlIGl0IHR3byBkaWdpdHMuXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgdG8gcGFkLlxuICAgKiBAcmV0dXJucyBUaGUgcGFkZGVkIG51bWJlci5cbiAgICovXG4gIHByaXZhdGUgXzJkaWdpdChuOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKCcwMCcgKyBuKS5zbGljZSgtMik7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXAgb3V0IHVuaWNvZGUgTFRSIGFuZCBSVEwgY2hhcmFjdGVycy4gRWRnZSBhbmQgSUUgaW5zZXJ0IHRoZXNlIGludG8gZm9ybWF0dGVkIGRhdGVzIHdoaWxlXG4gICAqIG90aGVyIGJyb3dzZXJzIGRvIG5vdC4gV2UgcmVtb3ZlIHRoZW0gdG8gbWFrZSBvdXRwdXQgY29uc2lzdGVudCBhbmQgYmVjYXVzZSB0aGV5IGludGVyZmVyZSB3aXRoXG4gICAqIGRhdGUgcGFyc2luZy5cbiAgICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHN0cmlwIGRpcmVjdGlvbiBjaGFyYWN0ZXJzIGZyb20uXG4gICAqIEByZXR1cm5zIFRoZSBzdHJpcHBlZCBzdHJpbmcuXG4gICAqL1xuICBwcml2YXRlIF9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjb252ZXJ0aW5nIERhdGUgb2JqZWN0IHRvIHN0cmluZywgamF2YXNjcmlwdCBidWlsdC1pbiBmdW5jdGlvbnMgbWF5IHJldHVybiB3cm9uZ1xuICAgKiByZXN1bHRzIGJlY2F1c2UgaXQgYXBwbGllcyBpdHMgaW50ZXJuYWwgRFNUIHJ1bGVzLiBUaGUgRFNUIHJ1bGVzIGFyb3VuZCB0aGUgd29ybGQgY2hhbmdlXG4gICAqIHZlcnkgZnJlcXVlbnRseSwgYW5kIHRoZSBjdXJyZW50IHZhbGlkIHJ1bGUgaXMgbm90IGFsd2F5cyB2YWxpZCBpbiBwcmV2aW91cyB5ZWFycyB0aG91Z2guXG4gICAqIFdlIHdvcmsgYXJvdW5kIHRoaXMgcHJvYmxlbSBidWlsZGluZyBhIG5ldyBEYXRlIG9iamVjdCB3aGljaCBoYXMgaXRzIGludGVybmFsIFVUQ1xuICAgKiByZXByZXNlbnRhdGlvbiB3aXRoIHRoZSBsb2NhbCBkYXRlIGFuZCB0aW1lLlxuICAgKiBAcGFyYW0gZHRmIEludGwuRGF0ZVRpbWVGb3JtYXQgb2JqZWN0LCBjb250YWluZyB0aGUgZGVzaXJlZCBzdHJpbmcgZm9ybWF0LiBJdCBtdXN0IGhhdmVcbiAgICogICAgdGltZVpvbmUgc2V0IHRvICd1dGMnIHRvIHdvcmsgZmluZS5cbiAgICogQHBhcmFtIGRhdGUgRGF0ZSBmcm9tIHdoaWNoIHdlIHdhbnQgdG8gZ2V0IHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gYWNjb3JkaW5nIHRvIGR0ZlxuICAgKiBAcmV0dXJucyBBIERhdGUgb2JqZWN0IHdpdGggaXRzIFVUQyByZXByZXNlbnRhdGlvbiBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGRhdGUgaW5mb1xuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybWF0KGR0ZjogSW50bC5EYXRlVGltZUZvcm1hdCwgZGF0ZTogRGF0ZSkge1xuICAgIC8vIFBhc3NpbmcgdGhlIHllYXIgdG8gdGhlIGNvbnN0cnVjdG9yIGNhdXNlcyB5ZWFyIG51bWJlcnMgPDEwMCB0byBiZSBjb252ZXJ0ZWQgdG8gMTl4eC5cbiAgICAvLyBUbyB3b3JrIGFyb3VuZCB0aGlzIHdlIHVzZSBgc2V0VVRDRnVsbFllYXJgIGFuZCBgc2V0VVRDSG91cnNgIGluc3RlYWQuXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKCk7XG4gICAgZC5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuICAgIGQuc2V0VVRDSG91cnMoXG4gICAgICBkYXRlLmdldEhvdXJzKCksXG4gICAgICBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgICAgIGRhdGUuZ2V0U2Vjb25kcygpLFxuICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgICk7XG4gICAgcmV0dXJuIGR0Zi5mb3JtYXQoZCk7XG4gIH1cbn1cbiJdfQ==